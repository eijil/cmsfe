import React from 'react';
import { Button } from '@cmsfe/ui';

export default () => (
  <div className="flex space-x-2 items-center">
    <Button size="lg">Large</Button>
    <Button>Normal</Button>
    <Button size="sm">Small</Button>
    <Button size="xs">Tiny</Button>
  </div>
);
