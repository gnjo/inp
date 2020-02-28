# inp
minimal input engine
```
//pug
script(src="https://gnjo.github.io/inp/inp.js")
script(src="https://gnjo.github.io/inp/inp.lib.js")
```
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
```
