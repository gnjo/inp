/*history
v0.1 make
v1.0 seln demo https://codepen.io/gnjo/pen/jOPBVNj
*/
const CR="\n";
var vlib={}
;(function(root){
 var fps=60,ms=50,count=0,callary=[],running=false,stopflg=false,cl=void 0
 ;
 function loop() {
  callary.map(f=>f(count))
  if(stopflg)return clearTimeout(cl)
  return cl=setTimeout(()=>{return ++count,requestAnimationFrame(loop)},ms)
 }
 function entry(_fps,_caller){
  if(_caller) callary.push(_caller)
  if(running)return console.log('already running')
  return fps=_fps||60,ms=1000/fps,loop()
 }
 function getcount(){return count}
 function fpsclear(debugmes){return stopflg=true,console.log(debugmes,'fpsclear')}
 ;
 root.fps=entry
 root.fpsclear=fpsclear
 root.getcount=getcount
})(this); 

;(function(root){ 
  var keys={}
function keyconfig(str){
 //$keyconf={37:'<',39:'>',38:'^',40:'v',70:'A',68:'B',65:'X',83:'Y',82:'R',69:'L'}
 let t="^,<,v,>,A,B,X,Y,L,R".split(',')
 ,k=str.split(',').map(d=>(d.length>1)?d:d.toUpperCase().charCodeAt(0))
  k.map((d,i)=>{ keys[d]=t[i] })
 return keys
}
function keycall(caller){
 let el=document.documentElement,del=()=>{el.onkeydown=void 0}
 //caller(k,del) //if use end, need the del()
 el.onkeydown=function(ev){ if(keys[ev.which])caller(keys[ev.which],del) }
}
/*keycall((k,del)=>{
 fn.q('pre').textContent=k
 if(k==='X')del();
})*/
 keyconfig('w,a,s,d,j,k,i,l,u,o');//initialize
 root.keyconfig=keyconfig
 root.keycall=keycall
})(this); 
/////////////////////////////////////////
;(function(root){
  //MRK JMP FNC EVM EVL  
 let ma={
  group:/#.*|{.*}>>>(#.*|{.*}|\d.*)|([\w\d].*)>.*|{{{([\s\S]*?)}}}|\$.*=.*/g
  ,trim:/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm
  ,types:'MRK,JMP,EVM,FNC,EVL,CMM'.split(',')
  ,MRK:/^#.*/
  ,JMP:/^{.*}>>>(#.*|{.*}|\d.*)/ //jump
  ,EVL:/^\$.*=.*/ //eval javascript
  ,EVM:/^{{{([\s\S]*?)}}}/ //eval message
  ,FNC:/^([\w\d].*)>.*/
  ,CMM:/^.*/
 }
 function lexs(text,offset){
  let oi=offset||0,jumps={}
  let lists=text.replace(ma.trim,'').replace(ma.trim2,'').match(ma.group)  //v1.5 %{{{}}} cut
  .map((d,i)=>{
   let type='CMM';
   for(type of ma.types)
    if(ma[type].test(d))break;
   if(type==='MRK') jumps[d]=i+oi
   return {str:d,type:type,line:i+oi}
  })
  return {jumps:jumps,lists:lists}
 }
 ;
 root.lexs=lexs
})(this);
/////////////////////////////////////////
;(function(root){
 let lexs=root.lexs
 function entry(){
  let o={}
  o.lists=[], o.jumps={}, o.line=0, o.block=0, o.end=0, o.lexs=lexs
  ;
  o.add=(text)=>{
   let x=o.lexs(text,o.lists.length)
   o.lists=o.lists.concat(x.lists)
   o.jumps=Object.assign(o.jumps,x.jumps)
   return o;
  }
  ;
  o.get=()=>{
   let s=o.block?void 0:o.lists[o.line]
   if(s) o.block=1;
   return s;
  }
  o.next=(d)=>{
   ;(d!=null)?o.line=d:o.line++;
   o.end=(o.lists.length-1<o.line)?1:0;
   return o.block=0
  }
  o.reload=(_list)=>{
   return o.block=1,o.line=999999,o.lists=_list||[],o.line=0,o.block=0;
  }
  o.isend=()=>{return o.end}
  o.isEnd=o.isend
  return o;
 }
 root.reader=entry;
})(this);
;(function(root){
 //comment trim 
 function _c(d){return d.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,'')}
 //eval
 //special
 function f(a){return a.replace(/\$[\$\w]+/g,d=>`inp.v["${d}"]`)}
 function _(obj){return Function(`return (${f(obj)}) `)()}
 //message rep
 function _m(obj){return obj.replace(/{(.*?)}/g,(d,dd)=>{return _(dd)}) }
 //trim { and }
 function _t(obj){return obj.replace(/{|}/g,'')}
 function _t2(obj){return obj.replace(/{{{|}}}/g,'').trim()}
 root._c=_c
 root._=_
 root._m=_m
 root._t=_t
 root._t2=_t2 
})(this);
//////////////////////////////////////////////
;(function(root){
  //MRK JMP FNC EVM EVL 
 let vlib=root.vlib 
 vlib.CMM=(str,o)=>{return o.next()}
 vlib.EVL=(str,o)=>{return o.v['$$$'] = _(_t(str)),o.next()}
 vlib.EVM=(str,o)=>{return o.v['$$$'] =_m(_t2(str)),o.next()}
 vlib.JMP=(str,o)=>{
  let a=str.split('>>>'),addr=_m(a[1]),i=/^\d+$/.test(addr)?parseInt(i):o.search(addr)
  //console.log(a)
  if(o.v['$MRK']!=addr)o.setjumpback() //v0.9
  let flg = _(_t(a[0]));
  //$$$ =flg;
  //console.log('!jump!',i)
  if(!flg || i==void 0)return o.next()
  else return o.v['$JMP']=i,o.next(i)
 }
 vlib.MRK=(str,o)=>{
  o.v['$$$'] = o.line////////
  o.v['$MRK'] =str;//v0.9
  let n=o.v['$$f'][str]
  if(n||n===0) o.v['$$f'][str]=n+1
  return o.next();
 }
 vlib.FNC=(str,o)=>{
  let a=str.split('>'),cmd=a[0],_str=a[1]
  if(!vlib[cmd])return vlib.CMM(str,o),console.log('vlib cmd not found',cmd)
  //
  if(o.v['$'+cmd]===undefined) o.v['$'+cmd]=void 0 //create valiable
  return vlib[cmd](_str,o) //call next() is top function
 }
 root.vlib=vlib
})(this);
//////////////////////////////////
;(function(root){
  let vlib=root.vlib
  vlib.k=(str,o)=>{
  o.v['$k']=void 0
  keycall((k,del)=>{ if(k) o.v['$k']=k,del(),o.next(); })
  return;
 } 
 root.vlib=vlib
})(this);
//////////////////////////////////  
;(function(root){
 let vlib=root.vlib,fps=root.fps
 function entry(text,userlib,caller){
  let o=reader();
  o.keyset='w,a,s,d,j,k,i,l,u,o'
  o._fps=60
  o.v={}
  o.dummy=(o,k,v)=>{return}
  o.caller=caller||o.dummy
  o.cmds=Object.assign(vlib,userlib)
  o.jumpback=0
  o.setjumpback=()=>{return o.jumpback=o.line+1}  //v0.9
  o.search=(d)=>{return (d==='###')?o.jumpback:o.jumps[d]}
  o.makefootstep=()=>{
   //v1.0 if footstep input like a save, $$f is exist.   
   if(!o.v['$$f']) o.v['$$f']={},Object.keys(o.jumps).map(k=>o.v['$$f'][k]=0);
  }
  o.cmd=(list)=>{//{str,type,line}
   return (o.cmds[list.type]||o.cmds['CMM'])(list.str,o)
  }
  o.lop=()=>{
   if(o.isend())return console.log('endline') /////
   //$$l=o.line //v0.9
   let list=o.get();
   if(list) o.v['$$l']=o.line,o.cmd(list);
   //if(list&&debugflg)console.log(list)
  }
  o.run=()=>{
   let isstring = function(obj){return toString.call(obj) === '[object String]'}
   isstring(text)?o.add(text):text.map(d=>o.add(d))//v1.0 multi text
   o.makefootstep()//v1.0
   //if(debugflg)console.log(o.lists)
   o.v=new Proxy({},{ set:(o,k,v)=>{return o.caller(o,k,v),o[k]=v } })   
   fps(_fps,o.lop)
   return o;
  }
  ;
  return o.run();
 }
 root.inp=entry;
})(this);
