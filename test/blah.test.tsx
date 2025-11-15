import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleAdsense } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(<GoogleAdsense client="sss" slot="aaa" />);
    root.unmount();
  });
});
