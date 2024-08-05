'use client'
import { Action, NavtiveCallParam, CallBackResult, CallBack } from './type'

const CALL_NATIVE = 'callNative'
const NATIVE_CALLBACK = 'nativeCallback'

class WebView {
  // 回调函数存储池
  private nativeCallbacks: Map<Action, CallBack> = new Map()

  public constructor() {
    if (typeof window === 'undefined') {
      return
    }
    // 挂在回调函数
    window[NATIVE_CALLBACK] = (res: CallBackResult) => {
      this.handleCallback(res)
    }
  }

  /** 执行  */
  public exec = (action: Action, params?: NavtiveCallParam<Action>) => {
    const _parma = {
      id: Date.now().toString(),
      name: action,
      params,
    }
    console.log('native call =====>', _parma)

    try {
      this.postMessage(_parma)
    } catch (e) {
      console.log(e)
    }

    if (params?.callback) {
      this.nativeCallbacks.set(action, params.callback)
    }
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
    const kit = window.webkit
    const postMessage = kit?.messageHandlers?.[CALL_NATIVE]?.postMessage
    // 由于ISO不会抛出错误需要手动抛出
    if (!postMessage) {
      throw new Error('版本过低')
    }
    postMessage(param)
  }

  /** android通信 */
  private androidMessage = (param: any) => {
    window?.Android?.[CALL_NATIVE](param)
  }
  /** 增强回调 */
  private handleCallback = (res: CallBackResult) => {
    const { name } = res
    this.nativeCallbacks.get(name)?.(res)
  }
}

export default new WebView()
