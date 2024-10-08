---
group: "通用组件"
description: '加载提示组件'
apiHeader: 
  pkg: "@cmsfe/ui"

---

# Toast

## 使用

:::warning
使用`toast`之前必须确保App内已经引入`<Toaster/>`组件,通常可以写在`layout`层
:::


``` ts
import { toast, Toaster } from '@cmsfe/ui/toast'

toast('Hello World', {
  duration: 4000,
  position: 'top-center',

  // Styling
  style: {},
  className: '',

  // Custom Icon
  icon: '👏',

  // Change colors of success/error/loading icon
  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },

  // Aria
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
});

``` 



## DEMO

### Basic
``` tsx
/**
 * defaultShowCode: true
 */

import React from 'react'
import  {toast, Toaster } from '@cmsfe/ui'
const notify = () => {
  toast('Here is your toast.')
};

export default () => {
  return (
    <div>
      <button className='btn' onClick={notify}>Make me a toast</button>
      <Toaster/>
    </div>
  );
};
```

### CustomStyle

``` tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import  {toast, Toaster } from '@cmsfe/ui'
const notify = () => toast.success('Successfully toasted!', {
  style:{
     background: '#000',
     top: '100px',
     color:'#fff'
  }
});

export default () => {
  return (
    <div>
      <button className='btn' onClick={notify}>Make me a toast</button>
      {/* <Toaster /> */}
    </div>
  );
};
```

### Success

``` tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import  {toast, Toaster ,ToastBar} from '@cmsfe/ui'

export default () => {
  return (
    <div>
      <button className='btn' onClick={()=>{
        toast.success('Successfully toasted!',{
          
        })
        }}>Make me a toast</button>
     {/* <Toaster /> */}
    </div>
  );
};
```

