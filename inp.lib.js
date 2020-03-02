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

;(function(root){
 let lib=root.vlib

 lib.m=(str,o)=>{
  let a=str.split(',').map(d=>_m(d))
  ,list =a[0]
  ,head=a[1]||'　'
  ,body='　'
  ,foot='　'
  ;
  body=list.split('\n')
  let ary=list.split('\n'),stock=[],one
  one=ary.shift()
  stock.push(one)
  body=stock.slice(-3).join('\n')||''
  o.v['$m']={head:head,foot:foot,body:body}
  //console.log('m',body)
  keycall((k,del)=>{
   one=ary.shift()
   if(one===void 0)return del(),o.next();
   stock.push(one)
   body=stock.slice(-3).join('\n')
  //console.log('m',body)    
   o.v['$m']={head:head,foot:foot,body:body}  
  })
 }
 
 lib.mc=(str,o)=>{
  let a=str.split(',').map(d=>_m(d))
  ,list =a[0]
  ,head=a[1]||'　'
  ,body='　'
  ,foot='　'
  ;
  body=list.split('\n')
  let ary=list.split('\n'),stock=[],one
  one=ary.shift()
  stock.push(one)
  body=stock.slice(-1).join('\n')||''
//console.log('mc',body)   
  o.v['$mc']={head:head,foot:foot,body:body}
  keycall((k,del)=>{
   one=ary.shift()
   if(one===void 0)return del(),o.next();
   stock.push(one)
   body=stock.slice(-1).join('\n')
//console.log('mc',body)    
   o.v['$mc']={head:head,foot:foot,body:body}  
  })
 }
 
 
 lib.slot=(str,o)=>{
  let a=str.split(',').map(d=>_m(d))
  ,list =a[0]
  ,head=a[1]||'　'
  ,body='　'
  ,foot='　'
  ;
  let ary=list.split('\n'),max=ary.length,count=max,mark='＊',sp='　'
  ,cl
  ,calc=(count)=>{
   let v=(ary[count+1]+'|||').split(/[|｜]/).slice(0,3)
   let f=(d)=>d.split(/[|｜]/).shift()
   body=ary.slice(count,count+3).map(f).map((d,i)=>(i===1)?mark+d:sp+d).join('\n')
//console.log('slot',body)    
   return {head:head,foot:v[2],body:body,n:(count+1)%max,value:ary[count+1],v:v}  
  }
  ary=ary.concat(ary)
  cl=setInterval(()=>{return count=(++count)%max,o.v['$slot']=calc(count)},40)
  keycall((k,del)=>{if(k==='A')return clearInterval(cl),del(),o.next()})
 }
 lib.show=(str,o)=>{return o.v['$show']=_m(str),o.next()}
 lib.hide=(str,o)=>{return o.v['$hide']=_m(str),o.next()}
 lib.yon=(str,o)=>{
  let a=str.split(',').map(d=>_m(d))
  ,list ='はい\nいいえ'
  ,head=a[0]||'　',body='　',foot='　'
  ,max=2
  ,count=/y/i.test(a[1])?0:1
  ,ary=list.split('\n')
  ,mark='＊',sp='　'
  ,calc=(count)=>{
   let v=(ary[count]+'|||').split(/[|｜]/).slice(0,3)
   let f=(d)=>d.split(/[|｜]/).shift()  
   if(count===0)body=sp+'\n'+mark+f(ary[count])+'\n'+sp+f(ary[count+1])
   if(count===max-1)body=sp+f(ary[count-1])+'\n'+mark+f(ary[count])+'\n'+sp
   //console.log(count,body)
   return {head:head,foot:v[2],body:body,n:count===0?'y':'n',value:ary[count],v:v}
  }
  ;
  o.v['$yon']=calc(count)
  keycall((k,del)=>{
   if(k==='A')return o.v['$yon']=calc(count),del(),o.next()
   if(k==='B')return count=1,o.v['$yon']=calc(count)
   if(k==='^')return count=Math.max(--count,0),o.v['$yon']=calc(count)
   if(k==='v')return count=(++count)%max,o.v['$yon']=calc(count)  
  })
 }
 lib.sel=(str,o)=>{
  let a=str.split(',').map(d=>_m(d))
  ,list =a[0]
  ,head=a[1]||'　',body='　',foot='　'
  ,count=/^\d/.test(a[2])?parseInt(a[2]):0
  ,ary=list.split('\n')
  ,max=ary.length 
  ,mark='＊',sp='　'
  ,calc=(count)=>{
   let v=(ary[count]+'|||').split(/[|｜]/).slice(0,3)
   let f=(d)=>d.split(/[|｜]/).shift()
   if(count===0)body=sp+'\n'+mark+f(ary[count])+'\n'+sp+f(ary[count+1])
   else if(count===max-1)body=sp+f(ary[count-1])+'\n'+mark+f(ary[count])+'\n'+sp
   else body=sp+f(ary[count-1])+'\n'+mark+f(ary[count])+'\n'+sp+f(ary[count+1])//
   let page=('00'+(count+1)).slice(-2)+'/'+('00'+max).slice(-2)
   let h=fn.ostr(fn.rpad(head,30,'　'),fn.s2b(page) )
//console.log('sel',body)   
   return {head:h,foot:v[2],body:body,n:count,value:ary[count],v:v,page:page}
  }
  o.v['$sel']=calc(count)

  keycall((k,del)=>{
   if(k==='A')return o.v['$sel']=calc(count),del(),o.next()///
   //if(k==='B') count=1
   if(k==='^')return count=Math.max(--count,0),o.v['$sel']=calc(count)
   if(k==='v')return count=Math.min(++count,max-1),o.v['$sel']=calc(count)   
  })
 }

lib.sel3=(str,o)=>{
  let a=str.split(',').map(d=>_m(d))
  ,list =a[0]
  ,head=a[1]||'　',body='　',foot='　'
  ,count=/^\d/.test(a[2])?parseInt(a[2]):0
  ,pn=a[3]||9
  ,ary=list.split('\n')
  ,max=ary.length 
  ,mark='＊',sp='　'
  ,emp=fn.rpad('',pn,sp)
  ,calc=(count)=>{
   let v=(ary[count]+'|||').split(/[|｜]/).slice(0,3)
   let f=(d)=>{
    if(d===void 0)return emp 
    return fn.rpad(d.split(/[|｜]/).shift(),pn,sp)
   }
   let pos=count%3-1//0=l,1=c,2=r
   let a=Array.from({length:9}).map(d=>sp+emp)
   let b=a.concat(ary.map(f).map((d,i)=>(i===count)?mark+d:sp+d)).concat(a)
   let s=fn.arraychunk(b,3)
   let line=~~((count+9)/3)
   body= s[line-1].join('')+'\n'+s[line].join('')+'\n'+s[line+1].join('')
   
   let page=('00'+(count+1)).slice(-2)+'/'+('00'+max).slice(-2)
   let h=fn.ostr(fn.rpad(head,30,'　'),fn.s2b(page) )
//console.log('sel',body)   
   return {head:h,foot:v[2],body:body,n:count,value:ary[count],v:v,page:page}
  }
  o.v['$sel3']=calc(count)

  keycall((k,del)=>{
   if(k==='A')return o.v['$sel']=calc(count),del(),o.next()///
   //if(k==='B') count=1
   if(k==='^')return count=Math.max(count-3,0),o.v['$sel3']=calc(count)
   if(k==='<')return count=Math.max(--count,0),o.v['$sel3']=calc(count)
   if(k==='>')return count=Math.min(++count,max-1),o.v['$sel3']=calc(count)   
   if(k==='v')return count=Math.min(count+3,max-1),o.v['$sel3']=calc(count)   
  })
 }
;
 
 root.vlib=lib
})(this);

