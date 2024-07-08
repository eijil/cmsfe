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



### toOneLink



```ts

  webview.exec('toOneLink', {
        param: [['onelink', `${downLoadUrl}`]],
        callback: (res: any) => {
          console.log('[ res ] >', res)
        }
  })

```

### toPurchase

```ts
 webview.exec('toPurchase', {
    param: [
      ['product_id', ''],
      ['gid', ''],
      ['price',''],
      ['from', ''],
      ['_story_id': ''],
      ['t_book_id': '' ],
      ['source': '' ]
    ],
    callback: (res: any) => {
      console.log('[ res ] >', res)
    }
  })

```

### toAppPlayer 

```ts
  webview.exec('toAppPlayer', {
      param: [
        ['bookId', ''],
        ['chapter_id',''],
        ['shelf_id', ''],
        ['jump_type', '']
      ],
      callback: (res: any) => { }
  })
```

### backToApp

```ts
  webview.exec('backToApp')

```

### toShare

```ts
 webview.exec('toShare', {
    param: [
      ['title', ''],
      ['shareUrl', '']
    ],
    callback: (res) => {
      console.log(res)
    }
 })
```

### goToFeedback

```ts

 webview.exec('goToFeedback', {
   param: [
    ['from', '']
   ]
 })
```


## Options

| 参数名         | 类型      | 描述    | 是否必填 |
|---------------|----------|------- | ---- |
| param         | Array   | 传给客户端的数据   | 否 |
| callback      | function   | 客户端回传处理接口   | 否 |


## Demo

```jsx

import React from 'react'
import { webview } from '@cmsfe/tools'

export default function(){

  function getUserInfo(){

    webview.exec('toShare', {
      param: [
        ['title', 'a'],
        ['shareUrl', 'a']
      ],
      callback: (res) => {
        console.log(res)
      }
    })
  }

  return (<button className='btn' onClick={getUserInfo}>test</button>)
}

```

