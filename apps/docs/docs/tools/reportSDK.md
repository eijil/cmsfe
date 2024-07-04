---
title: 'ReportSDK'
description: '埋点上报SDK'
apiHeader:
  pkg: '@cmsfe/tools'
---

## 初始化

构造`ReportSDK`实例，在项目初始化时执行一次并导出后续使用

```ts
import { ReportSDK } from '@cmsfe/tools'

//初始化参数类型
interface Param {
  reportAPI: string,
  version: string
  channelId: string
  appId: string
  packageName?: string
}

const reportSDK = ReportSDK.getInstance({
  reportAPI: 'https://api.xxx.com/report',
  version: '1.0.0',
  channelId: 'WEB',
  appId: 'appId'
});

export {reportSDK}
```

## API

### eventReport

通用上报事件

```ts
interface IParam {
  // 事件名
  event_name : string,
  // 子事件
  sub_event_name: string,
  // 其它属性
  properties: object,
}
function eventReport(param: IParamm , key?: string): void
```

#### 参数说明
| 参数名         | 类型      | 描述    | 是否必填 |
|---------------|----------|------- | ---- |
| param         | object   | 入参对像   | 是 |
| param.event_name | string | 事件名型。    |是 |
| param.sub_event_name | string | 子事件为。    |是 |
| param.properties | object  | 其他属性象。       |否 |
| key           | string  | (可选) 传入一个唯一的值，用于控制是否只上报一次，主要用于曝光埋点使用类。 |是 |







### installReport

应用安装激活上报

```ts
  function installReport(): void
```

### pageEnter
加载页面上报

```ts
interface IParam {
  // 路由地址
  path: string,
  // 上一个路由地址
  prePath: string,
  // url
  url: string,

}
function pageEnter(parm:IParam): void


```

### errorLog
错误上报

### DEMO

<code src="../../src/demo/tools/report_sdk/default.tsx" defaultShowCode ></code>

