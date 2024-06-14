---
nav: Tools
title: getEnv

---

# getEnv

``` js
import { getEnv } from '@cmsfe/tools/env'
```

``` jsx
import React from 'react'
import  { getEnv } from '@cmsfe/tools/env'

export default () => {
  return (
    <div>
      {JSON.stringify(getEnv())}
    </div>
  );
};
```

### getEnv(ua?: string) => object

| 参数   | 类型       | 必选 | 描述                                   |
|------|----------|----|--------------------------------------|
| `ua` | `string` | 否  | 一个字符串，表示用户代理。如果未提供，则使用当前浏览器的用户代理字符串。 |

#### 返回值

| 返回值属性       | 类型            | 描述                          |
|-------------|---------------|-----------------------------|
| `uaParser`  | `UAParser` 实例 | `UAParser` 实例，包含解析后的详细信息。   |
| `isMobile`  | `boolean`     | 布尔值，表示是否为移动设备。              |
| `isFB`      | `boolean`     | 布尔值，表示是否为 Facebook WebView。 |
| `isAndroid` | `boolean`     | 布尔值，表示是否为 Android 设备。       |
| `isIOS`     | `boolean`     | 布尔值，表示是否为 iOS 设备。           |

