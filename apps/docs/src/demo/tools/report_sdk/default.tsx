import React from 'react';

import { reportSDK } from './report';

export default function () {
  const handlerReport = () => {
    reportSDK.eventReport({
      event_name: 's',
      sub_event_name: 's',
      properties: {
        test: 11,
      },
    });
  };
  // 传入key参数，作为唯一表示
  const handlerReportOnce = () => {
    reportSDK.eventReport({
      event_name: 's',
      sub_event_name: 's',
      properties: {
        test: 11,
      },
    }, 'view');
  };

  return (
    <div className="space-x-2">
      <button className="btn" onClick={handlerReport}>
        点击上报
      </button>
      <button className="btn" onClick={handlerReportOnce}>
        只会上报一次
      </button>
    </div>
  );
}
