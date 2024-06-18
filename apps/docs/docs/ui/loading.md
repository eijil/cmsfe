---
group: "通用组件"
---


## 使用

``` jsx
/**
 * title: Basic
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




``` jsx
/**
 * title: With Size
 * defaultShowCode: true
 * description: 尺寸类型 'xs' | 'sm' | 'md' | 'lg'
 */
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



``` tsx
/**
 * title: color
 * defaultShowCode: true
 * 
 */
import React from 'react'
import { Loading } from '@cmsfe/ui'

export default () => {
  return (
    <div className='flex space-x-2'> 
      <Loading color='#0ea5e9'/>
      <Loading color='#15803d'/>
    </div>
  );
};
```



``` jsx
/**
 * title: 遮罩
 * defaultShowCode: true
 * iframe: true
 */

import React from 'react'
import { Loading } from '@cmsfe/ui'

export default () => {
  return (
    <div className=''> 
      body
      <Loading color='#0ea5e9' size='lg' fixed={{
        zIndex: 1000,
        opacity: 0.5
      }}/>
     
    </div>
  );
};
```

## 设置



## APIs

<API id="Loading"></API>



