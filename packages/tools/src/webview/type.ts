/// <reference types="../globals.d.ts" />

interface ICallParam {
  getUserInfo: {
   [key: string]: any
    uid: string
  }
}
interface ICallbackParams {
  getUserInfo: {
    [key: string]: any
    uid: string
  }
}
export type Action = keyof ICallParam

export type CallBack = (res: CallBackResult) => void

export type ICallBackParam = {
  callback?: CallBack
}

export type NavtiveCallParam<T extends Action> = T extends keyof ICallParam
  ? ICallParam[T] & ICallBackParam
  : ICallBackParam

export type CallBackResult = {
  code: number
  name: Action
  message: string
  id: string
  data: ICallbackParams[Action]
}
