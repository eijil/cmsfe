/// <reference types="../globals.d.ts" />
export type ICallback = (response?: any) => void
export interface WebviewParams {
  callback?: ICallback
  param?: Array<Array<any>>
}

export class IWebView {
  [key: string]: any
}
