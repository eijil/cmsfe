export interface IParams {
  reportAPI: string
  version: string
  appId: string
  channelId: string
  packageName?: string
}
export interface IReportParam {
  _event_name: string
  _sub_event_name?: string
  properties: { [key: string]: any }
  [key: string]: any
}

export interface IEventReportParam {
  event_name: string
  sub_event_name: string
  properties: any
  ctime?: number
}

