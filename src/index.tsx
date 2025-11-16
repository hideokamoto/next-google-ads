import Script from 'next/script';
import type { CSSProperties, FC } from 'react';

interface WindowWithAdsbygoogle extends Window {
  adsbygoogle?: Array<Record<string, unknown>>;
}

declare const window: WindowWithAdsbygoogle;

export type GoogleAdsenseProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: string;
  responsive?: string;
  path?: string;
};

export const GoogleAdsenseWidget: FC<GoogleAdsenseProps> = ({
  className = '',
  style = {
    display: 'block',
    width: '728px',
    height: '90px',
  },
  format = 'auto',
  layout = '',
  layoutKey = '',
  responsive = 'false',
  client,
  slot,
}) => {
  return (
    <ins
      className={`${className} adsbygoogle`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
};

export const NextGoogleAdsenseScript: FC<
  Pick<GoogleAdsenseProps, 'client'>
> = ({ client }) => {
  if (!client) return null;
  return (
    <Script
      id="google-adsense"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      data-ad-client={client}
      strategy="afterInteractive"
      crossOrigin="anonymous"
      onLoad={() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
          console.error('AdSense error:', err);
        }
      }}
    />
  );
};

export const GoogleAdsense: FC<GoogleAdsenseProps> = props => {
  return (
    <>
      <NextGoogleAdsenseScript {...props} />
      <GoogleAdsenseWidget {...props} />
    </>
  );
};

export default GoogleAdsense;
