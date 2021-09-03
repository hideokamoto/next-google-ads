import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { GoogleAdsense } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GoogleAdsense client="sss" slot="aaa" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
