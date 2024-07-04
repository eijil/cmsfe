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

  return (
    <button className="btn" onClick={handlerReport}>
      点击上报
    </button>
  );
}
