# inp
minimal input engine
```

let text=`

$xyz // inp.v['$xyz']
k>

{$k==='A'}>>>#xyz

`;

let inp=inp(text,usrlib,caller)
inp.caller=()=>{return}
inp.v=new Proxy(inp.v,{ set:(o,k,v)=>{return inp.caller(o,k,v),o[k]=v } })


```
```
"$k==='A'||$k==='B'".replace(/\$[\$\w]+/g,d=>`inp.v["${d}"]`)
```
