---
group: "通用组件"

description: '加载提示组件'
apiHeader: 
  pkg: "@cmsfe/ui"
---


## 使用


### Basic

``` jsx
/**
 * 
 * defaultShowCode: true
 */
import React from 'react'
import { Loading } from '@cmsfe/ui'


export default () => {
  return (
    <Loading />
  );
};
```


### Size

可选尺寸类型: `xs`  `sm`  `md` `lg`

``` jsx

import React from 'react'
import { Loading } from '@cmsfe/ui'


export default () => {
  return (
    <div className='flex space-x-2'> 
      <Loading size='xs' />
      <Loading size='sm' />
      <Loading size='md' />
      <Loading size='lg' />
     
    </div>
  );
};
```

### Color

``` tsx

import React from 'react'
import { Loading } from '@cmsfe/ui'

export default () => {
  return (
    <div className='flex space-x-2'> 
      <Loading className='text-blue-300' />
      <Loading className='text-red-500' />
      <Loading style={{color: "#000"}} />
    </div>
  );
};
```

### 遮罩

``` jsx
/**
 *
 * 
 * transform: true
 *
 */

import React from 'react'
import { Loading } from '@cmsfe/ui'

export default () => {
  return (
    <div className='h-40'> 
      body
      <Loading size='lg' className='text-purple-500'  fixed={{
        zIndex: 1000,
        opacity: 0.5
      }}/>
     
    </div>
  );
};
```

## 设置



## APIs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 尺寸 | string | 'md' |
| fixed | 遮罩 | object | - |
| className | class | string | - |
| style | style | object | - |





