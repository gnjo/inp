/*

*/
//need vlib
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


;(function(root){
  let vlib=root.vlib
  vlib.k=(str,o)=>{
  o.v['$k']=void 0
  keycall((k,del)=>{ if(k) o.v['$k']=k,del(),o.next(); })
  return;
 }
 vlib.wait=(str,o)=>{ 
 setTimeout(()=>{o.next()},o.v['$wait']=parseInt(str))
 } 
 root.vlib=vlib
})(this);



