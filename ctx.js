;(function(root){
 
let is={}
is.string = function(obj){return toString.call(obj) === '[object String]'}
is.color=(d)=>{
 if(!is.string(d))return false;
 return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(d)
}
is.transparent=(d)=>{
 if(!is.string(d))return false;
 return /^transparent$/.test(d)
}

////
var pens={};//pens is share
function topen(name,fillflg){
 name=name.trim()
 //console.log(name,is.color(name))
 let p={
 strokeStyle:"transparent"
 ,fillStyle:"transparent"
 ,font:"16px 'Almendra SC',monospace"
 ,textAlign:"left"
 ,textBaseline:"top"
 }
 if(is.color(name))return p[(fillflg)?"fillStyle":"strokeStyle"]=name,p //
 //else
 let ary=pens[name]
 p[(fillflg)?"fillStyle":"strokeStyle"]=ary[0]
 p.font=ary[1]
 return p;
}

///////////////////////
function entry(w,h,query){
 let canvas=(query)?document.querySelector(query):document.createElement('canvas')
 canvas.width=w,canvas.height=h
 let o=canvas.getContext('2d')
 
//////////////////////
o._img=function(src,x0,y0,pen,anim){
 let ctx=this//o;
 let d=new Image(); d.src=src;
 let w=d.nativeWidth,h=d.nativeHeight
 ctx.drawImage(d,0,0,w,h,x0,y0,w,h)
 ;
 return ctx.needflip=1,ctx.restore(),ctx;
}

o._txt=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 Object.assign(ctx,pen) //penset
 ctx.fillText(obj,x0,y0) //native
 ;
 return ctx.needflip=1,ctx.restore(),ctx;
}
o._box=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 Object.assign(ctx,pen) //penset
 is.transparent(pen.fillStyle)?ctx.strokeRect(x0,y0,obj[0],obj[1]):ctx.fillRect(x0,y0,obj[0],obj[1])
 //ctx.fillRect(x0,y0,obj[0],obj[1]) //native
 //Object.assign(ctx,fn.clone(o._pen)) //penback
 ;
 return ctx.needflip=1,ctx.restore(),ctx;
}
o._poly=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 Object.assign(ctx,pen) //penset
 ctx.beginPath();
 ctx.moveTo(obj[0],obj[1]);
 for(i=2;i<obj.length;i+=2)
  ctx.lineTo(obj[i],obj[i+1]);
 
 ctx.closePath();
 if(!is.transparent(pen.fillStyle)) ctx.fill()
 if(!is.transparent(pen.strokeStyle)) ctx.stroke()
 //Object.assign(ctx,fn.clone(o._pen)) //penback  ?????
 ;
 return ctx.needflip=1,ctx.restore(),ctx;
}
;
/*
//dmg("-9",0,0,"#f26",15)//y=(i*i)/2 //(15).toString(16)
o.dmg=(obj,x0,y0,pen,anim)=>{
 let time=anim||15
 let ary=Array.from({length:time}).map((d,i)=>{
  let p={strokeStyle:"#000000",fillStyle:"#f26",font:"24px 'Almendra SC', serif",textAlign:"left",textBaseline:"top"}
  ;
  p.fillStyle=p.fillStyle+(i).toString(16)
  return o.txt.bind(null,obj,x0,y0-((time-i)*(time-i) )/3,p,anim)
 })
 o.anim.push(ary)
 return o;
}
;
*/
o.img=function(src,x0,y0,pen,anim){
 let ctx=this
 ;
 return ctx.img(src,x0,y0,pen,anim)
}
;
o.txt=function(obj,x0,y0,pen,anim){
 let ctx=this 
 return ctx.txtl(obj,x0,y0,pen,anim)
}
o.txtl=function(obj,x0,y0,pen,anim){
 let ctx=this//o 
 let d=topen(pen,'fill')//fn.clone(o._pen)
 return ctx._txt(obj,x0,y0,Object.assign(d, {textAlign:"left"}),anim)
}
o.txtr=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 
 let d=topen(pen,'fill')//fn.clone(o._pen)
 return ctx._txt(obj,x0,y0,Object.assign(d, {textAlign:"right"}),anim)
}
o.txtc=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 
 let d=topen(pen,'fill')//fn.clone(o._pen)
 return ctx._txt(obj,x0,y0,Object.assign(d, {textAlign:"center"}),anim)
}

o.full=function(){
 let ctx=this//o
 
 let w=ctx.canvas.width,h=ctx.canvas.height
 return ctx.box([w,h],0,0,"#000000")
}

o.box=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 
 let d=topen(pen,'fill')//fn.clone(o._pen)
 return ctx._box(obj,x0,y0,d,anim)
}
o.boxb=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 
 let d=topen(pen)//fn.clone(o._pen)
 return ctx._box(obj,x0,y0,d,anim)
}

o.poly=function(obj,x0,y0,pen,anim){
 let ctx=this//o

 let d=topen(pen,'fill')//fn.clone(o._pen)
 return ctx._poly(obj,x0,y0,d,anim)
}
o.polyb=function(obj,x0,y0,pen,anim){
 let ctx=this//o
 
 let d=topen(pen)//fn.clone(o._pen)
 return ctx._poly(obj,x0,y0,d,anim)
}


//o.img
//o.txt
//o.txtl
//o.txtr
//o.txtc
//o.box
//o.boxb
//o.full
//o.poly
//o.polyb
//inpd.set(640,480)
//
 
 ////////////////////////////////////////////
 o.pen=function(str){
  let ctx=this
  
  let a=str.split(',').slice(1),name=a[0];
  pens[name]=a
  return ctx;
 }
 o.ex=function(str){
  let ctx=this
  
  let f=(d)=>d.trim().match(/(\[.+\])|([^,]+)/g).map(d=>/\[/.test(d)?eval(d):d);
  str.trim().split('\n').map(d=>{
   let a=f(d),cmd=a[0]
   ;
   if(ctx[cmd])return ctx[cmd].apply(ctx,a.slice(1))
  })
  return o;
 }
 o.ef=function(str){}
 o.put=function(...ary){
  let ctx=this
  let w=ctx.canvas.width,h=ctx.canvas.height
  ary.map(d=>ctx.putImageData(d.getImageData(0,0,w,h) ,0,0) )
  return ctx;
 }
 o.pick=function pick(x,y,rgbaflg) {
  let ctx=this;
  let f=(d)=>('00'+d).slice(-2)
  var data = ctx.getImageData(x, y, 1, 1).data
  var hexa =`#${f(data[0].toString(16))}${f(data[1].toString(16))}${f(data[2].toString(16))}${f(data[3].toString(16))}`
  if(!rgbaflg)return hexa
  var rgba = `rgba(${data[0]},${data[1]},${data[2]},${(data[3] / 255)} )`;
  return rgba;
}
;
  
 
 /////////////////////
 return o
} 
////////////////////////////////////////////
root.ctx=entry;
 
})(this);
