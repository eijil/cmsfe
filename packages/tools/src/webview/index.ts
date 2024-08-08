'use client'

import { Action, CallBack, CallBackResult, NavtiveCallParam } from './type'

const CALL_NATIVE = 'webToNative'
const NATIVE_CALLBACK = 'nativeToWeb'

class WebView {
  // 回调函数存储池
  private nativeCallbacks: Map<string, CallBack<any>> = new Map()

  public constructor() {
    if (typeof window === 'undefined') {
      return
    }
    // 注册回调函数
    this.registerCallback()
  }

  private registerCallback<T extends Action>(): void {
    window[NATIVE_CALLBACK] = (res: CallBackResult<T>) => {
      try {
        if (typeof res === 'string') {
          res = JSON.parse(res)
        }
        const { id, name } = res
        this.nativeCallbacks.get(`${id}_${name}`)?.(res)
      } catch (e) {
        console.log(e)
      }
    }
  }

  /** 执行  */
  public exec<T extends Action>(action: T, params?: NavtiveCallParam<T>) {
    const { callback, ...other } = params || {}

    const id = Date.now().toString()

    const _parma = {
      id,
      name: action,
      params: other,
    }

    try {
      this.postMessage(_parma)
    } catch (e) {
      console.log(e)
    }

    if (callback) {
      this.nativeCallbacks.set(`${id}_${action}`, callback)
    }
    return _parma
  }

  /** 调用接口 */
  private postMessage = (message: any) => {
    if (window.webkit) {
      // ios处理
      const param = {
        ...message,
        params: message.params,
      }
      this.iosMessage(param)
    } else if (window?.Android) {
      // 安卓
      this.androidMessage(JSON.stringify(message))
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
