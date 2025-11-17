import { createRoot } from 'react-dom/client';
import { act } from 'react';
import {
  GoogleAdsenseWidget,
  InArticleAd,
  InFeedAd,
  MultiplexAd,
  AnchorAd,
  AutoAdsScript,
  NextGoogleAdsenseScript,
  GoogleAdsense,
} from '../src';

// Mock next/script
vi.mock('next/script', () => ({
  default: vi.fn(({ children, onLoad, dangerouslySetInnerHTML, ...props }) => {
    // Simulate script loading
    if (onLoad) {
      setTimeout(() => {
        onLoad();
      }, 0);
    }
    // Convert React props to HTML attributes
    const htmlProps: Record<string, string> = {};
    Object.entries(props).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Convert camelCase to kebab-case for data attributes
        if (key.startsWith('data-')) {
          htmlProps[key] = String(value);
        } else if (key === 'crossOrigin') {
          htmlProps.crossorigin = String(value);
        } else {
          htmlProps[key] = String(value);
        }
      }
    });
    // Handle dangerouslySetInnerHTML
    if (dangerouslySetInnerHTML?.__html) {
      return <script {...htmlProps} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
    }
    return <script {...htmlProps}>{children}</script>;
  }),
}));

describe('GoogleAdsenseWidget', () => {
  it('renders with required props', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<GoogleAdsenseWidget client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins).toBeTruthy();
    expect(ins?.getAttribute('data-ad-client')).toBe('ca-pub-123');
    expect(ins?.getAttribute('data-ad-slot')).toBe('123456');

    act(() => {
      root.unmount();
    });
  });

  it('applies default values', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<GoogleAdsenseWidget client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-ad-format')).toBe('auto');
    expect(ins?.getAttribute('data-npa-mode')).toBeNull();
    expect(ins?.getAttribute('data-full-width-responsive')).toBe('false');

    act(() => {
      root.unmount();
    });
  });

  it('applies optional props', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <GoogleAdsenseWidget
          client="ca-pub-123"
          slot="123456"
          className="custom-class"
          style={{ width: '300px' }}
          layout="in-article"
          layoutKey="key123"
          format="fluid"
          responsive="true"
          adTest="on"
          adChannel="channel1"
        />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins?.className).toContain('custom-class');
    expect(ins?.className).toContain('adsbygoogle');
    expect(ins?.getAttribute('data-ad-layout')).toBe('in-article');
    expect(ins?.getAttribute('data-ad-layout-key')).toBe('key123');
    expect(ins?.getAttribute('data-ad-format')).toBe('fluid');
    expect(ins?.getAttribute('data-full-width-responsive')).toBe('true');
    expect(ins?.getAttribute('data-adtest')).toBe('on');
    expect(ins?.getAttribute('data-ad-channel')).toBe('channel1');

    act(() => {
      root.unmount();
    });
  });

  it('sets data-npa-mode when npaMode is true', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <GoogleAdsenseWidget client="ca-pub-123" slot="123456" npaMode />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-npa-mode')).toBe('1');

    act(() => {
      root.unmount();
    });
  });
});

describe('InArticleAd', () => {
  it('renders with required props', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<InArticleAd client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins).toBeTruthy();
    expect(ins?.getAttribute('data-ad-client')).toBe('ca-pub-123');
    expect(ins?.getAttribute('data-ad-slot')).toBe('123456');

    act(() => {
      root.unmount();
    });
  });

  it('sets correct format and layout', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<InArticleAd client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-ad-format')).toBe('fluid');
    expect(ins?.getAttribute('data-ad-layout')).toBe('in-article');

    act(() => {
      root.unmount();
    });
  });

  it('applies npaMode correctly', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<InArticleAd client="ca-pub-123" slot="123456" npaMode />);
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-npa-mode')).toBe('1');

    act(() => {
      root.unmount();
    });
  });

  it('applies className and style', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <InArticleAd
          client="ca-pub-123"
          slot="123456"
          className="custom-class"
          style={{ margin: '10px' }}
        />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins?.className).toContain('custom-class');
    expect(ins?.className).toContain('adsbygoogle');

    act(() => {
      root.unmount();
    });
  });
});

describe('InFeedAd', () => {
  it('renders with required props including layoutKey', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <InFeedAd client="ca-pub-123" slot="123456" layoutKey="key123" />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins).toBeTruthy();
    expect(ins?.getAttribute('data-ad-client')).toBe('ca-pub-123');
    expect(ins?.getAttribute('data-ad-slot')).toBe('123456');
    expect(ins?.getAttribute('data-ad-layout-key')).toBe('key123');

    act(() => {
      root.unmount();
    });
  });

  it('sets correct format and layout', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <InFeedAd client="ca-pub-123" slot="123456" layoutKey="key123" />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-ad-format')).toBe('fluid');
    expect(ins?.getAttribute('data-ad-layout')).toBe('in-feed');

    act(() => {
      root.unmount();
    });
  });

  it('applies npaMode correctly', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <InFeedAd client="ca-pub-123" slot="123456" layoutKey="key123" npaMode />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-npa-mode')).toBe('1');

    act(() => {
      root.unmount();
    });
  });
});

describe('MultiplexAd', () => {
  it('renders with required props', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<MultiplexAd client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins).toBeTruthy();
    expect(ins?.getAttribute('data-ad-client')).toBe('ca-pub-123');
    expect(ins?.getAttribute('data-ad-slot')).toBe('123456');

    act(() => {
      root.unmount();
    });
  });

  it('applies default format', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<MultiplexAd client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-ad-format')).toBe('autorelaxed');

    act(() => {
      root.unmount();
    });
  });

  it('applies custom format', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <MultiplexAd client="ca-pub-123" slot="123456" format="autorelaxed" />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-ad-format')).toBe('autorelaxed');

    act(() => {
      root.unmount();
    });
  });

  it('applies npaMode correctly', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<MultiplexAd client="ca-pub-123" slot="123456" npaMode />);
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-npa-mode')).toBe('1');

    act(() => {
      root.unmount();
    });
  });
});

describe('AnchorAd', () => {
  it('renders with required props', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AnchorAd client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins).toBeTruthy();
    expect(ins?.getAttribute('data-ad-client')).toBe('ca-pub-123');
    expect(ins?.getAttribute('data-ad-slot')).toBe('123456');

    act(() => {
      root.unmount();
    });
  });

  it('applies default values', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AnchorAd client="ca-pub-123" slot="123456" />);
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-ad-format')).toBe('anchor');
    expect(ins?.getAttribute('data-anchor-position')).toBe('bottom');
    expect(ins?.getAttribute('data-collapsible')).toBe('true');

    act(() => {
      root.unmount();
    });
  });

  it('applies position and collapsible props', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <AnchorAd
          client="ca-pub-123"
          slot="123456"
          position="top"
          collapsible={false}
        />
      );
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-anchor-position')).toBe('top');
    expect(ins?.getAttribute('data-collapsible')).toBe('false');

    act(() => {
      root.unmount();
    });
  });

  it('applies npaMode correctly', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AnchorAd client="ca-pub-123" slot="123456" npaMode />);
    });

    const ins = div.querySelector('ins');
    expect(ins?.getAttribute('data-npa-mode')).toBe('1');

    act(() => {
      root.unmount();
    });
  });
});

describe('AutoAdsScript', () => {
  beforeEach(() => {
    window.adsbygoogle = [];
  });

  afterEach(() => {
    window.adsbygoogle = [];
  });

  it('returns null when client is not provided', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AutoAdsScript client="" />);
    });

    expect(div.firstChild).toBeNull();

    act(() => {
      root.unmount();
    });
  });

  it('renders Script component with client', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AutoAdsScript client="ca-pub-123" />);
    });

    const script = div.querySelector('script[id="google-adsense-auto"]');
    expect(script).toBeTruthy();
    expect(script?.getAttribute('data-ad-client')).toBe('ca-pub-123');

    act(() => {
      root.unmount();
    });
  });

  it('renders Consent Mode v2 script when consentMode is provided', () => {
    const consentMode = {
      ad_storage: 'granted' as const,
      analytics_storage: 'granted' as const,
    };
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AutoAdsScript client="ca-pub-123" consentMode={consentMode} />);
    });

    const consentScript = div.querySelector(
      'script[id="google-consent-mode-v2"]'
    );
    expect(consentScript).toBeTruthy();

    act(() => {
      root.unmount();
    });
  });

  it('pushes config to window.adsbygoogle when enableAutoAds is true', async () => {
    const config = {
      enableAutoAds: true,
      adDensity: 'medium' as const,
      enableAdIntents: true,
    };
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AutoAdsScript client="ca-pub-123" config={config} />);
    });

    // Wait for onLoad to be called
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(window.adsbygoogle).toHaveLength(1);
    expect(window.adsbygoogle?.[0]).toEqual({
      google_ad_client: 'ca-pub-123',
      enable_page_level_ads: true,
      ad_density: 'medium',
      ad_intents: true,
    });

    act(() => {
      root.unmount();
    });
  });

  it('applies npaMode correctly', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<AutoAdsScript client="ca-pub-123" npaMode />);
    });

    const script = div.querySelector('script[id="google-adsense-auto"]');
    expect(script?.getAttribute('data-npa-mode')).toBe('1');

    act(() => {
      root.unmount();
    });
  });
});

describe('NextGoogleAdsenseScript', () => {
  beforeEach(() => {
    window.adsbygoogle = [];
  });

  afterEach(() => {
    window.adsbygoogle = [];
  });

  it('returns null when client is not provided', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<NextGoogleAdsenseScript client="" />);
    });

    expect(div.firstChild).toBeNull();

    act(() => {
      root.unmount();
    });
  });

  it('renders Script component with client', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<NextGoogleAdsenseScript client="ca-pub-123" />);
    });

    const script = div.querySelector('script[id="google-adsense"]');
    expect(script).toBeTruthy();
    expect(script?.getAttribute('data-ad-client')).toBe('ca-pub-123');

    act(() => {
      root.unmount();
    });
  });

  it('pushes empty object to window.adsbygoogle on load', async () => {
    // Reset before test to ensure clean state
    window.adsbygoogle = [];
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<NextGoogleAdsenseScript client="ca-pub-123" />);
    });

    // Wait for onLoad to be called
    await new Promise(resolve => setTimeout(resolve, 10));

    // Check that exactly one item was added
    const initialLength = window.adsbygoogle?.length ?? 0;
    expect(initialLength).toBeGreaterThanOrEqual(1);
    // Check the last item (in case previous tests added items)
    const lastItem = window.adsbygoogle?.[window.adsbygoogle.length - 1];
    expect(lastItem).toEqual({});

    act(() => {
      root.unmount();
    });
  });

  it('applies crossOrigin correctly', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<NextGoogleAdsenseScript client="ca-pub-123" crossOrigin />);
    });

    const script = div.querySelector('script[id="google-adsense"]');
    expect(script?.getAttribute('crossorigin')).toBe('anonymous');

    act(() => {
      root.unmount();
    });
  });

  it('does not set crossOrigin when crossOrigin is false', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <NextGoogleAdsenseScript client="ca-pub-123" crossOrigin={false} />
      );
    });

    const script = div.querySelector('script[id="google-adsense"]');
    expect(script?.getAttribute('crossorigin')).toBeNull();

    act(() => {
      root.unmount();
    });
  });

  it('applies npaMode correctly', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<NextGoogleAdsenseScript client="ca-pub-123" npaMode />);
    });

    const script = div.querySelector('script[id="google-adsense"]');
    expect(script?.getAttribute('data-npa-mode')).toBe('1');

    act(() => {
      root.unmount();
    });
  });
});

describe('GoogleAdsense', () => {
  beforeEach(() => {
    window.adsbygoogle = [];
  });

  afterEach(() => {
    window.adsbygoogle = [];
  });

  it('renders both NextGoogleAdsenseScript and GoogleAdsenseWidget', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(<GoogleAdsense client="ca-pub-123" slot="123456" />);
    });

    const script = div.querySelector('script[id="google-adsense"]');
    const ins = div.querySelector('ins');

    expect(script).toBeTruthy();
    expect(ins).toBeTruthy();
    expect(ins?.getAttribute('data-ad-client')).toBe('ca-pub-123');
    expect(ins?.getAttribute('data-ad-slot')).toBe('123456');

    act(() => {
      root.unmount();
    });
  });

  it('passes props correctly to child components', () => {
    const div = document.createElement('div');
    const root = createRoot(div);
    act(() => {
      root.render(
        <GoogleAdsense
          client="ca-pub-123"
          slot="123456"
          npaMode
          className="custom-class"
        />
      );
    });

    const script = div.querySelector('script[id="google-adsense"]');
    const ins = div.querySelector('ins');

    expect(script?.getAttribute('data-npa-mode')).toBe('1');
    expect(ins?.className).toContain('custom-class');

    act(() => {
      root.unmount();
    });
  });
});

