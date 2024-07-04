---
title: 'ReportSDK'
description: '埋点上报SDK'
apiHeader:
  pkg: '@cmsfe/tools'
---

## 初始化

构造`ReportSDK`实例，在项目初始化时执行一次并导出后续使用

```ts
import {ReportSDK} from '@cmsfe/tools';

//初始化参数类型
interface Param {
  version: string
  channelId: string
  appId: string
  packageName?: string
}

const reportSDK = ReportSDK.getInstance({
  version: '1.0.0',
  channelId: 'WEB',
  appId: 'appId'
});

export {reportSDK};
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
function eventReport(param: IParam): void;
```

### installReport

应用安装激活上报

```js
  function installReport(): void;
```

### pageEnter
加载页面上报

```js
interface IParam {
  // 路由地址
  path: string,
  // 上一个路由地址
  prePath: string,
  // url
  url: string,

}
function pageEnter(parm:IParam): void;


```

### errorLog
错误上报

## DEMO

<code src="../../src/demo/tools/report_sdk/default.tsx" defaultShowCode ></code>
