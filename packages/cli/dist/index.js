#!/usr/bin/env node
import h from"enquirer";import d from"chalk";import{Command as v}from"commander";import p from"path";import x from"ora";import*as t from"node:fs";import{execSync as l}from"child_process";import n from"chalk";var i={log:e=>console.log(e),info:e=>console.log(n.blue(e)),success:e=>console.log(n.green(e)),warn:e=>console.log(n.yellow(e)),error:e=>console.log(n.red(e))};var b=x({text:"Loading...",color:"yellow"}),a=process.cwd(),f=p.join(a,".cmsfe_config.json"),m=new v().name("deploy").command("deploy").alias("d").description("command [deploy | d] to deploy your project").action(async()=>{await j()});async function w(){t.existsSync(p.join(a,"dist"))||(i.error("\u672A\u627E\u5230dist\u6587\u4EF6\u5939\uFF0C\u8BF7\u5148\u6267\u884Cbuild\u547D\u4EE4"),process.exit(1)),t.existsSync(f)||(i.error("\u672A\u627E\u5230ocmsfeconfig.json\u6587\u4EF6\uFF0C\u8BF7\u5148\u521B\u5EFA"),process.exit(1))}function k(e){try{let o=t.readFileSync(f,"utf8"),s=JSON.parse(o).oss[e];l(`ossutil config -e ${s.endpoint} -i ${s.accessKeyID} -k ${s.accessKeySecret}`,{stdio:"inherit"})}catch(o){console.error(o),process.exit(1)}}async function j(){await w();let{prompt:e}=h,o=await e({type:"input",name:"name",message:"\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0",required:!0}),r=await e({type:"select",name:"env",message:"\u8BF7\u9009\u62E9\u90E8\u7F72\u73AF\u5883",choices:["test","prod"],required:!0}),{env:s}=r,c=await e({type:"confirm",name:"confirm",message:`\u786E\u8BA4\u53D1\u5E03\u8FD9\u4E2A\u9879\u76EE ${d.blue(r.env)}:${d.green(o.name)} \uFF1F`});if(!(c!=null&&c.confirm)){i.warn("\u90E8\u7F72\u5DF2\u53D6\u6D88");return}k(s);let g=p.join(a,"dist/");try{l(`ossutil cp -r ${g}  oss://v-out-dev/images/${o.name}/`,{stdio:"inherit"})}catch(y){console.error(y),process.exit(1)}b.succeed(`\u53D1\u5E03\u6210\u529F
  http://v-out-dev.oss-ap-southeast-1.aliyuncs.com/images/${o.name}`)}import{Command as $}from"commander";var u="1.0.2";function S(){let e=new $().name("cmsfe").description("cmsfe cli").version(u||"0.0.0");e.addCommand(m),e.parse()}S();
//# sourceMappingURL=index.js.map