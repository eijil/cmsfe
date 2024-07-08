import { ReportSDK } from '@cmsfe/tools'

const reportSDK = ReportSDK.getInstance({
  reportAPI: 'https://dev-public-dta.stardustworld.cn/dt/api/event/log',
  version: '1.0.0',
  channelId: 'test',
  appId: 'test',
})

export { reportSDK }
