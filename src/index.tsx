import React, { CSSProperties, FC } from 'react';
import Script from 'next/script';

// Consent Mode v2 types (2024 GDPR requirement)
export type ConsentModeV2 = {
  ad_storage?: 'granted' | 'denied';
  analytics_storage?: 'granted' | 'denied';
  ad_user_data?: 'granted' | 'denied';
  ad_personalization?: 'granted' | 'denied';
};

// Auto Ads configuration (2024 feature)
export type AutoAdsConfig = {
  enableAutoAds?: boolean;
  pageExclusions?: string[];
  adDensity?: 'low' | 'medium' | 'high';
  enableAdIntents?: boolean; // New 2024 format
};

// Anchor and Side Rail positioning (2024 feature)
export type AnchorPosition = 'top' | 'bottom' | 'both';
export type SideRailPosition = 'left' | 'right' | 'both';

export type GoogleAdsenseProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: string;
  layout?: string;
  layoutKey?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: string;
  path?: string;
  // Non-personalized ads mode (privacy-focused)
  npaMode?: boolean;
  // Ad test mode
  adTest?: 'on' | 'off';
  // Channel for tracking
  adChannel?: string;
};

// In-Article Ads (modern format)
export type InArticleAdProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: string;
  npaMode?: boolean;
};

// In-Feed Ads (modern format)
export type InFeedAdProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: string;
  layoutKey: string;
  npaMode?: boolean;
};

// Multiplex Ads (modern format)
export type MultiplexAdProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: string;
  format?: 'autorelaxed';
  npaMode?: boolean;
};

// Anchor Ad Props (2024 feature)
export type AnchorAdProps = {
  client: string;
  slot: string;
  position?: AnchorPosition;
  collapsible?: boolean;
  npaMode?: boolean;
};

// Auto Ads Props (2024 major feature)
export type AutoAdsProps = {
  client: string;
  config?: AutoAdsConfig;
  consentMode?: ConsentModeV2;
  npaMode?: boolean;
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
  npaMode = false,
  adTest,
  adChannel,
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
      data-npa-mode={npaMode ? '1' : undefined}
      data-adtest={adTest}
      data-ad-channel={adChannel}
    ></ins>
  );
};

// In-Article Ads Component (Modern format for content)
export const InArticleAd: FC<InArticleAdProps> = ({
  className = '',
  style = { display: 'block', textAlign: 'center' },
  client,
  slot,
  npaMode = false,
}) => {
  return (
    <ins
      className={`${className} adsbygoogle`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="fluid"
      data-ad-layout="in-article"
      data-npa-mode={npaMode ? '1' : undefined}
    ></ins>
  );
};

// In-Feed Ads Component (Modern format for feeds/lists)
export const InFeedAd: FC<InFeedAdProps> = ({
  className = '',
  style = { display: 'block' },
  client,
  slot,
  layoutKey,
  npaMode = false,
}) => {
  return (
    <ins
      className={`${className} adsbygoogle`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="fluid"
      data-ad-layout="in-feed"
      data-ad-layout-key={layoutKey}
      data-npa-mode={npaMode ? '1' : undefined}
    ></ins>
  );
};

// Multiplex Ads Component (Modern format for related content)
export const MultiplexAd: FC<MultiplexAdProps> = ({
  className = '',
  style = { display: 'block' },
  client,
  slot,
  format = 'autorelaxed',
  npaMode = false,
}) => {
  return (
    <ins
      className={`${className} adsbygoogle`}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-npa-mode={npaMode ? '1' : undefined}
    ></ins>
  );
};

// Anchor Ad Component (2024 feature - collapsible mobile ads)
export const AnchorAd: FC<AnchorAdProps> = ({
  client,
  slot,
  position = 'bottom',
  collapsible = true,
  npaMode = false,
}) => {
  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="anchor"
      data-anchor-position={position}
      data-collapsible={collapsible ? 'true' : 'false'}
      data-npa-mode={npaMode ? '1' : undefined}
    ></ins>
  );
};

// Auto Ads Script Component (2024 major feature)
export const AutoAdsScript: FC<AutoAdsProps> = ({
  client,
  config,
  consentMode,
  npaMode = false,
}) => {
  if (!client) return null;

  return (
    <>
      {consentMode && (
        <Script
          id="google-consent-mode-v2"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', ${JSON.stringify(consentMode)});
            `,
          }}
        />
      )}
      <Script
        id="google-adsense-auto"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client={client}
        crossOrigin="anonymous"
        strategy="afterInteractive"
        data-npa-mode={npaMode ? '1' : undefined}
        onLoad={() => {
          if (typeof window !== 'undefined' && config?.enableAutoAds) {
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({
              google_ad_client: client,
              enable_page_level_ads: true,
              ...(config.adDensity && { ad_density: config.adDensity }),
              ...(config.enableAdIntents && { ad_intents: true }),
            });
          }
        }}
      />
    </>
  );
};

export const NextGoogleAdsenseScript: FC<Pick<GoogleAdsenseProps, 'client'> & {
  npaMode?: boolean;
  crossOrigin?: boolean;
}> = ({ client, npaMode = false, crossOrigin = true }) => {
  if (!client) return null;
  return (
    <Script
      id="google-adsense"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      data-ad-client={client}
      crossOrigin={crossOrigin ? 'anonymous' : undefined}
      data-npa-mode={npaMode ? '1' : undefined}
      onLoad={() => {
        if (typeof window !== 'undefined') {
          window.onload = () => {
            ((window as any).adsbygoogle =
              (window as any).adsbygoogle || []).push({});
          };
        }
      }}
    />
  );
};

export const GoogleAdsense: FC<GoogleAdsenseProps> = props => {
  return (
    <>
      <NextGoogleAdsenseScript client={props.client} npaMode={props.npaMode} />
      <GoogleAdsenseWidget {...props} />
    </>
  );
};

export default GoogleAdsense;
