'use client'
import { IWebView, WebviewParams, ICallback } from './type'


let i = 0



const UID_PREFIX = Date.now().toString()
class WebView extends IWebView {
  // 回调函数存储池
  private nativeCallback: Map<any, ICallback> = new Map()

  public constructor() {
    super()
    // 挂在回调函数
     window.nativeCallback = (res?: any) => {
      this.handleCallback(res)
    }
  }

  /** * 直接调用api  */
  public exec = (name: string, params?: WebviewParams) => {
    return this.addApi(name)[name](params)
  }

  /** 增加一项新的Api */
  public addApi = (name: string) => {
    
    if (!this[name]) {
      this[name] = (params: WebviewParams) => {
        // todo 通用参数在此处理
        return this.run(name, params)
      }
      console.log(this)
    }
    return this
  }

  /**
   * 新增回调
   * */
  public addCallback = (name: string | number, callback: ICallback) => {
    this.nativeCallback.set(name, callback)
  }

  private getTrigger = (name: string): string => {
    return (name || 'fn') + `${UID_PREFIX}-${i++}`
  }

  /** 调用接口 */
  private run = (apiName: string, params: WebviewParams = {}) => {
    const { callback, param = [] } = params
    const _param = param
    // 回调处理
    if (typeof callback === 'function') {
      const trigger = this.getTrigger(apiName)
      this.addCallback(trigger, callback)
      _param.unshift(['trigger', trigger])
    }

    console.log(_param)
    this.iosMessage(apiName, _param)
    this.androidMessage(apiName, _param)

    if (window.webkit) {
      // ios处理
      this.iosMessage(apiName, _param)
    } else if (window?.Android) {
      // 安卓
      this.androidMessage(apiName, _param)
    } else {
      // web端, 暂时不处理
    }
    return false
  }

  /** IOS通信 */
  private iosMessage = (apiName: string, params: any[] = []) => {
    const kit = window.webkit
    const parma: { [key: string]: any } = {}
    params.forEach((item) => {
      parma[item[0]] = item[1]
    })
    console.log('ios', parma)
    // 由于ISO不会抛出错误需要手动抛出
    if (!kit?.messageHandlers?.[apiName]?.postMessage) {
      //throw new Error('版本过低')
    }
    kit?.messageHandlers?.[apiName]?.postMessage?.(parma)
  }

  /** android通信 */
  private androidMessage = (apiName: string, params: any[]) => {
    const isPrama = !!params.length
    if (isPrama) {
      const para = params.map((item) => {
        const [key, val] = item
        return val
      })
      console.log('android', para)
      return window?.Android?.[apiName](...para)
    }
    return window?.Android?.[apiName]()
  }
  /** 增强回调 */
  private handleCallback = (res: any) => {
    // todo 返回待完善
    let param = res
    if (typeof res === 'string') {
      // 安卓的回调数据
      try {
        param = JSON.parse(res)
      } catch (error) {
        param = res
      }
    }
    const { trigger, ...otehr } = param
    this.nativeCallback.get(trigger)?.(otehr)
  }
}

const webview = new WebView()
// 空的执行回调

webview.addCallback('reload', () => window.location.reload())

/**
 * 如果登录挂载isApp = true 到 window对象上
 * 目前通过和客户端通信来检查是否在app内，主流做法通常是客户端在ua中插入特定信息
 * 客户端说以前的ua有在用，不敢往里面加信息
 * @returns Promise<boolean>
 */

async function checkIsApp(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!window.webkit && !window.Android) {
      resolve(false)
    }

    try {
      webview.exec('getUserInfo', {
        callback: (res) => {
          console.log('checkIsApp', res)
          resolve(true)
        },
      })
    } catch (e) {
      console.log('checkIsApp', e)
      resolve(false)
    }
  })
}

export { checkIsApp }
export default webview
