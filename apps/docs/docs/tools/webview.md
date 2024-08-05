---
title: webview
description: h5和app通信sdk
apiHeader:
  pkg: '@cmsfe/tools'
---


## exec

```ts
webview.exec( [API] , params?:Prams )

```

```ts
type Param = {
...other,
callback?: (res:Res) => void

}
type Res = {
  code: number
  message: string
  data: any
}
```

## API





### getUserInfo

获取用户信息

```ts

webview.exec('getUserInfo', {
  callback: (res)=> {
    console.log('[ res ] >', res)
  }
})

```

### getCredentials 

获取token

```ts
webview.exec('getCredentials', {
  callback: (res)=>{
    console.log('[ res ] >', res)
  }
})

```

### continueWatch

```ts
// 入参
type Params = {
  videoId: string
  callback: (res: Res) => void
}

type Res = {
  code: number,
  message: string,
  data: {

  }
}
// 
webview.exec('continueWatch', params:Params)

```



