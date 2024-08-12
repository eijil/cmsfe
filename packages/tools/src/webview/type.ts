/// <reference types="../globals.d.ts" />

// 入参
export interface ICallParam {
  closePage: {
    [key: string]: any
  }
  getUserInfo: {
    [key: string]: any
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

  jumpPlayer: {
    [key: string]: any
  }
  /** 跳转一级页面 */
  switchToPrimaryTab: {
    tabName: string
  }
  /** 跳转二级页面 */
  pushToSecondaryPage: {
    pageName: string
  }

  /** 跳转播放器 */
  navigateToPlayer: {
    bookId: string
    bookType: number
    chapterId: string
    shelfId: string
  }
  openInBrowser: {
    url: string
    isInApp: 1 | 0
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
    payParams?: {
      productId?: string
      gid?: string
      price?: string
      orderSrc?: string
      bookId?: string
      tBookId?: string
      source?: string
    }
  }
  watchAd: {
    eventId: string
  }
}

// 回调参数
export interface ICallbackParams {
  getUserInfo: {
    [key: string]: any
  }
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
  jumpPlayer: {
    [key: string]: any
  }
  navigateToPlayer: {
    [key: string]: any
  }
  switchToPrimaryTab: {
    [key: string]: any
  }
  pushToSecondaryPage: {
    pageName: string
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
  }
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
