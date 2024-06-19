import { ReportSDK } from '@cmsfe/tools';

const reportSDK = ReportSDK.getInstance({
  version: '1.0.0',
  channelId: 'test',
  appId: 'test',
});

export { reportSDK };