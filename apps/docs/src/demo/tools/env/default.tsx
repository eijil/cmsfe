import React from 'react';
import { getEnv } from '@cmsfe/tools/env';
import JsonView from '@uiw/react-json-view';

export default () => {
  const env = getEnv();
  return <JsonView value={env} displayDataTypes={false} collapsed={2} />;
};
