import React from 'react';
import { getEnv } from '@cmsfe/tools/env';
import JsonView from '@uiw/react-json-view';

export default () => {
  return <JsonView value={getEnv()} displayDataTypes={false} collapsed={2} />;
};
