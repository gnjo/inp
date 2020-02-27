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
