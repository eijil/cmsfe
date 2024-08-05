---
title: webview
description: h5和app通信sdk
apiHeader:
  pkg: '@cmsfe/tools'
---

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




## Demo

```jsx

import React from 'react'
import { webview } from '@cmsfe/tools'

export default function(){

  function getUserInfo(){

    webview.exec('getUserInfo', {
     
      callback: (res) => {
        console.log(res)
      }
    })
  }

  return (<button className='btn' onClick={getUserInfo}>test</button>)
}

```

