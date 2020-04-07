# inp.draw.js

```
draw cycle

d>txt,aiuewo,10,10,{$pen1},hue,-1 //-1 is infinit
dc> //draw clear, keep clear

```

```
let fn={}
fn.q=(d)=>document.querySelector(d)
fn.getctx(el,w,h)={
 el.width=w,el.height=h;
 return el.getContext('2d');
}
fn.deep=d=>JSON.parse(JSON.stringify(d));
fn.clone=fn.deep
;
let is={}
is.string = function(obj){return toString.call(obj) === '[object String]'}
is.color=(d)=>{
 if(!is.string(d))return false;
 return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(d)
}
is.transparent=(d)=>{
 if(!is.string(d))return false;
 return /^transparent$/.test(d)
}
;
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
 o._ctx.save();//
 ;
 return o
}
;
o._img=(src,x0,y0,pen,anim)=>{
 let d=new Image(); d.src=src;
 let w=d.nativeWidth,h=d.nativeHeight
 ctx.drawImage(d,0,0,w,h,x0,y0,w,h)
 ;
 return o._ctx.restore(),o;
}

o._txt=(obj,x0,y0,pen,anim)=>{
 let ctx=o._ctx
 Object.assign(ctx,pen) //penset
 ctx.fillText(obj,x0,y0) //native
 ;
 return o._ctx.restore(),o;
}
o._box=(obj,x0,y0,pen,anim)=>{
 let ctx=o._ctx
 Object.assign(ctx,pen) //penset
 is.transparent(pen.fillStyle)?ctx.strokeRect(x0,y0,a[0],a[1]):ctx.fillRect(x0,y0,a[0],a[1])
 ctx.fillRect(x0,y0,obj[0],obj[1]) //native
 Object.assign(ctx,fn.clone(o._pen)) //penback
 ;
 return o._ctx.restore(),o;
}
o._poly=(obj,x0,y0,pen,anim)=>{
 let ctx=o._ctx
 Object.assign(ctx,pen) //penset
 ctx.beginPath();
 ctx.moveTo(obj[0],obj[1]);
 for(i=2;i<obj.length;i+=2)
  ctx.lineTo(obj[i],obj[i+1]);
 
 ctx.closePath();
 if(!is.transparent(pen.fillStyle)) ctx.fill()
 if(!is.transparent(pen.strokeStyle)) ctx.stroke()
 Object.assign(ctx,fn.clone(o._pen)) //penback    
 ;
 return o;
}
;
o.img=(src,x0,y0,pen,anim)=>{
 ;
 return o.img(src,x0,y0,pen,anim)
}
;
o.txt=(obj,x0,y0,pen,anim)=>{
 return o.txtl(obj,x0,y0,pen,anim)
}
o.txtl=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"left",fillStyle:pen}),anim)
 ;
 return o._txt(obj,x0,y0,Object.assign(pen||d, {textAlign:"left"}),anim)
}
o.txtr=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"right",fillStyle:pen}),anim)
 ;
 return o._txt(obj,x0,y0,Object.assign(pen||d, {textAlign:"right"}),anim)
}
o.txtc=(obj,x0,y0,pen,anim)=>{
 let d=fn.clone(o._pen)
 if(is.color(pen))return o._txt(obj,x0,y0,Object.assign(d, {textAlign:"center",fillStyle:pen}),anim)
 ;
 return o._txt(obj,x0,y0,Object.assign(pen||d, {textAlign:"center"}),anim)
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

o.poly=(obj,x0,y0,pen,anim)=>{
 return o._poly(obj,x0,y0,pen,anim)
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

```
```
pen.strokeStyle="blue"
pen.fillStyle="blue"
pen.font = "30px 'ＭＳ ゴシック'";
pen.textAlign="left";
pen.textBaseline= "top";
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

dmg("-9",0,0,"#f26",16)//y=(i*i)/2 //(15).toString(16)

$a=[x1,y1,x2,y2...]
poly>{$a},20,30,effect
full>

d>img,{$a},20,30,{$pen1},fade,4
d>txt,aiuewo,0,0,{$pen1},fade,4
d>full

pen={}
pen.strokeStyle="blue"
pen.fillStyle="blue"
pen.font = "30px 'ＭＳ ゴシック'";
pen.textAlign="left";
pen.textBaseline= "top";
```

```
//エフェクトは残像で必ず消える。
//effect
//wipe wipeup
push([effects,count])

```





