import React from 'react';
import { Button } from '@cmsfe/ui';

export default () => (
  <div className="flex space-x-2">
    <Button>Default</Button>
    <Button type="primary" className="primary">
      Primary
    </Button>
    <Button type="secondary">Secondary</Button>
    <Button type="accent">Accent</Button>
    <Button type="neutral">Neutral</Button>
    <Button type="ghost">Ghost</Button>
    <Button type="link">Link</Button>
  </div>
);
