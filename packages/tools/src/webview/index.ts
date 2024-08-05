'use client'

import { Action, CallBack, CallBackResult, NavtiveCallParam } from './type'

const CALL_NATIVE = 'webToNative'
const NATIVE_CALLBACK = 'nativeToWeb'

class WebView {
  // 回调函数存储池
  private nativeCallbacks: Map<Action, CallBack> = new Map()

  public constructor() {
    if (typeof window === 'undefined') {
      return
    }
    // 注册回调函数
    this.registerCallback()
  }

  private registerCallback(): void {
    window[NATIVE_CALLBACK] = (res: CallBackResult) => {
      const { name } = res
      try {
        this.nativeCallbacks.get(name)?.(res)
      } catch (e) {
        console.log(e)
      }
    }
  }

  /** 执行  */
  public exec(action: Action, params?: NavtiveCallParam<Action>) {
    const { callback, ...other } = params || {}
    const _parma = {
      id: Date.now().toString(),
      name: action,
      params: JSON.stringify(other),
    }

    try {
      this.postMessage(_parma)
    } catch (e) {
      console.log(e)
    }

    if (callback) {
      this.nativeCallbacks.set(action, callback)
    }
    return _parma
  }

  /** 调用接口 */
  private postMessage = (params: any) => {
    if (window.webkit) {
      // ios处理
      this.iosMessage(params)
    } else if (window?.Android) {
      // 安卓
      this.androidMessage(params)
    }
  }

  /** IOS通信 */
  private iosMessage = (param: any) => {
    const native = window.webkit?.messageHandlers[CALL_NATIVE]
    // 由于ISO不会抛出错误需要手动抛出
    if (!native) {
      throw new Error('版本过低')
    }

    native.postMessage(param)
  }

  /** android通信 */
  private androidMessage = (param: any) => {
    window?.Android[CALL_NATIVE](param)
  }
}

export default new WebView()
