# inp
minimal input engine
```
//pug
script(src="https://gnjo.github.io/inp/ctx.js")
script(src="https://gnjo.github.io/inp/inp.js")
script(src="https://gnjo.github.io/inp/inp.lib.js")
```

## $aaa=1 // inp.v['$aaa']=1
```

let text=`

$xyz // inp.v['$xyz']
k>

{$k==='A'}>>>#xyz

`;

let caller=(o,k,v)=>{}
let userlib={}
inp.run(text,usrlib,caller)
```
## basic command
```
k> //keywait
wait>100 //100ms
m>message,title //message line 3
slot>data,title //loop data keypress is stop
sel>data,title,n //start number is n
yon>title,y  //yes or no, y or n
show>name //flavor
hide>name //flavor
```
## wrap {{{}}}

```
$x=3
{{{
this is string {$x}
}}}

{{{js
//pure js world
let a=10;
let v=inp.v["$x"]+a
console.log(v) //13
}}}

//one line is good
$x=console.log($x) //one line script $x replace inp.v['$x']
```
## wiredry draft
```
map>{$base},{$mask},B01
warp>B01X01Y02N
walk>{$k}
{$walk.addr}>>>{'#'+$walk.addr}

#B01X01Y02N
{$f['#B01X01Y02N']!=2}>>>#B01X01Y02N.second
//first event

#B01X01Y02N.second

{1}>>>###

```








