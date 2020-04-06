# inp.draw.js
```
pen.strokeStyle="blue"
pen.fillStyle="blue"
pen.font = "30px 'ＭＳ ゴシック'";
pen.textAlign="left";
pen.textBaseline= "top";
```
```
let fn={}
//fn.q('canvas')
//fn.getctx(el,w,h)
//fn.clone(obj)
let is={}
is.color
is.transparent

let o={}
o._canvas=void 0;
o._ctx=void 0;
o._pen={strokeStyle:"#000000",fillStyle:"#ffffff",font:"16px monospace",textAlign:"left",textBaseline:"top"}
;
o.set=(w,h,pen)=>{
 let canvas=fn.q('canvas')
 if(!canvas) canvas=document.createElement('canvas'),document.body.appendChild(canvas);
 o._canvas=canvas
 o._ctx=fn.getctx(o._canvas,w||640,h||480)
 Object.assign(o._pen,pen)
 Object.assign(o._ctx,fn.clone(o._pen))
 ;
 return o
}
;
o.img
o._txt=(obj,x0,y0,pen,anim)=>{
 let ctx=o._ctx
 Object.assign(ctx,pen) //penset
 ctx.fillText(obj,x0,y0) //native
 Object.assign(ctx,fn.clone(o._pen)) //penback
 ;
 return o;
}

;
o.txt=(obj,x0,y0,pen,anim)=>{
 return o.txtl(obj,x0,y0,pen,anim)
}
o.txtl=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"left",fillStyle:pen}),anim)
 ;
 return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"left"}),anim)
}
o.txtr=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"right",fillStyle:pen}),anim)
 ;
 return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"right"}),anim)
}
o.txtc=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"center",fillStyle:pen}),anim)
 ;
 return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"center"}),anim)
}

o._box=(obj,x0,y0,pen,anim)=>{
 let ctx=o._ctx
 Object.assign(ctx,pen) //penset
 is.transparent(pen.fillStyle)?ctx.strokeRect(x0,y0,a[0],a[1]):ctx.fillRect(x0,y0,a[0],a[1])
 ctx.fillRect(x0,y0,obj[0],obj[1]) //native
 Object.assign(ctx,fn.clone(o._pen)) //penback
 ;
 return o;
}
o.full=()=>{
 let w=o._canvas.width,h=o._canvas.height
 return o.box([w,h],0,0,"#000000")
}

o.box=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._box(obj,x0,y0,Object.assign(d, {strokeStyle:"transparent",fillStyle:pen}),anim)
 ;
 return o._box(obj,x0,y0,Object.assign(pen||d, {strokeStyle:"transparent"}),anim)
}
o.boxb=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._box(obj,x0,y0,Object.assign(d, {strokeStyle:pen,fillStyle:"transparent"}),anim)
 ;
 return o._box(obj,x0,y0,Object.assign(pen||d, {fillStyle:"transparent"}),anim)
}

o.img
//o.txt
//o.txtl
//o.txtr
//o.txtc
//o.box
//o.boxb
//o.full
o.poly

```
```
Draw>{option},x0,y0,penstyle,animation
sDraw>{option},x0,y0,color

set(640,480,pen)
img
txt("aiuewo",0,0,pen,anim)
txtl
txtr
txtc
box([w,h],0,0,pen,anim)
boxb
$a=[x1,y1,x2,y2...]
poly>{$a},20,30,effect
full>

pen={}
pen.strokeStyle="blue"
pen.fillStyle="blue"
pen.font = "30px 'ＭＳ ゴシック'";
pen.textAlign="left";
pen.textBaseline= "top";
```
