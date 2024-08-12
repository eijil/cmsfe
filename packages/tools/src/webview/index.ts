'use client'

import { Action, CallBack, CallBackResult, NativeCallParam } from './type'

const CALL_NATIVE = 'webToNative'
const NATIVE_CALLBACK = 'nativeToWeb'

class WebView {
  // 回调函数存储池
  public nativeCallbacks: Map<string, CallBack<any>> = new Map()

  public constructor() {
    if (typeof window === 'undefined') {
      return
    }
    // 注册回调函数
    this.registerCallback()
  }

  private registerCallback(): void {
    window[NATIVE_CALLBACK] = (res: CallBackResult<any>) => {
      try {
        if (typeof res === 'string') {
          res = JSON.parse(res)
        }
        const { id, name } = res
        const action = id ? `${id}_${name}` : name
        this.nativeCallbacks.get(action)?.(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
  /**
   * 初始化回调
   * @param params Record<Action, CallBack<Action>>
   * @returns void
   */
  public init<T extends Action>(params: Record<T, CallBack<T>>) {
    for (const key in params) {
      const callback = params[key]
      if (callback) {
        this.nativeCallbacks.set(key, callback)
      }
    }
  }

  /**
   * 执行
   * @param action 事件名
   * @param params 参数
   * @returns
   */
  public exec<T extends Action>(action: T, params?: NativeCallParam<T>) {
    const { callback, ...other } = params || {}
    const id = Date.now().toString()
    const _parma = {
      id,
      name: action,
      params: other,
    }
    if (callback) {
      this.nativeCallbacks.set(`${id}_${action}`, callback)
    }
    try {
      this.postMessage(_parma)
    } catch (e: any) {
      this.errorCallBack({
        id,
        message: e.toString(),
        name: action,
      })
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
    } else {
      throw new Error('current environment not support')
    }
  }

  /**
   * 错误回调
   * @param param
   */
  private errorCallBack<T extends Action>(
    param: Partial<CallBackResult<T>>
  ): void {
    window[NATIVE_CALLBACK]({
      code: -1,
      id: param.id,
      name: param.name,
      message: param.message,
    })
  }

  /**
   * ios
   * @param param
   */
  private iosMessage = (param: any) => {
    const native = window.webkit?.messageHandlers[CALL_NATIVE]
    // 由于ISO不会抛出错误需要手动抛出
    if (!native) {
      throw new Error('ios version too low')
    }
    native.postMessage(param)
  }

  /**
   * android
   * @param param
   */
  private androidMessage = (param: any) => {
    window?.Android[CALL_NATIVE](param)
  }
}

export default new WebView()
