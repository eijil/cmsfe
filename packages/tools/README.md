# `@cmsfe/tools`

## 安装

```
pnpm install @cmsfefe/tools

```

## getEnv

``` js
import { getEnv } from '@cmsfefe/tools/env'
```

导入 `getEnv` 函数，并传入用户代理字符串来获取环境信息。

### getEnv(userAgent?: string) => object

| 参数          | 类型       | 必选 | 描述                                   |
|-------------|----------|----|--------------------------------------|
| `userAgent` | `string` | 否  | 一个字符串，表示用户代理。如果未提供，则使用当前浏览器的用户代理字符串。 |

#### 返回值

| 返回值属性       | 类型            | 描述                          |
|-------------|---------------|-----------------------------|
| `uaParser`  | `UAParser` 实例 | `UAParser` 实例，包含解析后的详细信息。   |
| `isMobile`  | `boolean`     | 布尔值，表示是否为移动设备。              |
| `isFB`      | `boolean`     | 布尔值，表示是否为 Facebook WebView。 |
| `isAndroid` | `boolean`     | 布尔值，表示是否为 Android 设备。       |
| `isIOS`     | `boolean`     | 布尔值，表示是否为 iOS 设备。           |

### 示例代码

```javascript
'use strict';

// 示例用户代理字符串
const userAgent = 'Mozilla/5.0 (Linux; Android 10; SM-G973F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.96 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/246.0.0.49.121;]';

// 获取环境信息
const env = getEnv(userAgent);

console.log(env);
```
