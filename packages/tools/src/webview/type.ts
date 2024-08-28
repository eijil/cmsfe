/// <reference types="../globals.d.ts" />

// 入参
export interface ICallParam {
  closePage: {
    [key: string]: unknown
  }

  continueWatch: {
    [key: string]: any
  }
  getPermissionStatus: {
    permission: string[]
  }
  updatePermissionStatus: {
    permission: string
  }
  /** 跳转一级页面 */
  switchToPrimaryTab: {
    tabName: 'home' | 'forYou' | 'rewards' | 'profile' | 'library'
  }
  /** 跳转二级页面 */
  pushToSecondaryPage: {
    pageName:
      | 'history'
      | 'myWallet'
      | 'login'
      | 'store'
      | 'rewards'
      | 'myCoupons'
    [key: string]: unknown
  }

  /** 跳转播放器 */
  navigateToPlayer: {
    bookId: string
    bookType?: number
    chapterId?: string
    shelfId?: number
  }
  openInBrowser: {
    url: string
    isInApp: 1 | 0
    title: string
    resourceId: string
    version?: string
  }
  openSystemRoute: {
    url: string
  }

  /**
   * 支付
   */
  purchase: {
    /**
     * 1: apple
     * 2: google
     * 3: paypal
     */
    payType: string
    payParams?: Partial<{
      productId: string
      gid: string
      price: string
      orderSrc: string
      bookId: string
      tBookId: string
      source: string
    }>
  }
  watchAd: {
    eventId: string
  }
  floatingBoxAction: {
    action: 'show' | 'close' | 'click'
  }
  reportEvent: {
    eventName: string
    childEventName: string
    /**
     * json
     */
    properties: Record<string, unknown>
  }
  /**
   * h5获取native用户token
   */
  fetchNativeToken: Record<string, unknown>
  /**
   * h5触发native更新离线包
   */
  checkUpdate: Record<string, unknown>
}

// 回调参数
export interface ICallbackParams {
  continueWatch: {
    [key: string]: any
  }
  getPermissionStatus: {
    result: [
      {
        permission: string
        status: '1' | '2'
      },
    ]
  }
  openSystemRoute: {
    [key: string]: any
  }

  navigateToPlayer: {
    [key: string]: any
  }
  switchToPrimaryTab: {
    tabName: string
    [key: string]: unknown
  }
  pushToSecondaryPage: {
    pageName: string
    [key: string]: unknown
  }

  openInBrowser: {
    [key: string]: any
  }
  /**
   * 支付
   */
  purchase: {
    status: string
  }
  watchAd: {
    eventId: string
  }
  closePage: {
    [key: string]: any
  }
  updatePermissionStatus: {
    permission: string
    status: string
    needUpdate: string
  }
  floatingBoxAction: {
    action: string
  }
  reportEvent: {
    [key: string]: any
  }
  fetchNativeToken: {
    token: string
  }
  checkUpdate: Record<string, unknown>
}

export type Action = keyof ICallParam

export type CallBack<T extends Action> = (res: CallBackResult<T>) => void

export type ICallBackParam<T extends Action> = {
  callback?: CallBack<T>
}
// 入参
export type NativeCallParam<T extends Action> = ICallParam[T] &
  ICallBackParam<T>

export type CallBackResult<T extends Action> = {
  code: number
  name: T
  message: string
  id: string
  data: ICallbackParams[T]
}
