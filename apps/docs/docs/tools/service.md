---
title: service
apiHeader:
  pkg: '@cmsfe/tools'
group: 'service'
---


## requestWithSign

### usage

```ts
 requestWithSign(api:string, data:Record<string: any>)
```

``` jsx
/**
 *
 * defaultShowCode: true
 *
 */
import React, { useState, useEffect } from 'react';
import { Button } from '@cmsfe/ui';
import { requestWithSign } from '@cmsfe/tools/service';

export default () => {

  return (
    <div>
    <Button type="primary" onClick={()=>{
      const body = { test: 1}
      requestWithSign('/api/xxx', body)
    }}>Request</Button>
    </div>
  );
};
```




## createOrder

## checkOrder
