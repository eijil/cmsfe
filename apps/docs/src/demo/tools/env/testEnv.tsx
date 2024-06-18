import React from 'react';
import JsonView from '@uiw/react-json-view';


import { getEnv } from '@cmsfe/tools/env';
import {
 
  StoryBook,
  useControls,
  useCreateStore,
} from '@lobehub/ui';

export default () => {
  const store = useCreateStore();

  const options: any = useControls(
    {
      ua: {
        rows: true,
        value: navigator.userAgent,
      },
    },
    { store },
  );

  

  return (
    <StoryBook levaStore={store} noPadding>
      <JsonView
        value={getEnv(options.ua)}
        displayDataTypes={false}
        collapsed={2}
      />
    </StoryBook>
  );
};
