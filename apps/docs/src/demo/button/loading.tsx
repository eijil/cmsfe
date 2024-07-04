import React from 'react';
import { Button, Loading } from '@cmsfe/ui';

export default () => (
  <div className="flex">
    <Button type="primary">
      <Loading size="xs" color="#FFFFFF" />
      loading
    </Button>
  </div>
);
