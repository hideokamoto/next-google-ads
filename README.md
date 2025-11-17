# Google Adsense for Next.js

Load Google Adsense script and place the ad code with support for the latest 2024-2025 features.

## 🎯 Features

- ✅ **Auto Ads** - AI-powered automatic ad placement (2024)
- ✅ **Consent Mode v2** - GDPR compliance (required since March 2024)
- ✅ **Ad Intents** - New intent-driven ad format (2024)
- ✅ **Anchor Ads** - Collapsible mobile ads with position control (2024)
- ✅ **In-Article Ads** - Modern content-integrated ads
- ✅ **In-Feed Ads** - Ads for lists and feeds
- ✅ **Multiplex Ads** - Related content ads
- ✅ **Non-Personalized Ads** - Privacy-focused advertising
- ✅ **TypeScript** - Full type safety

## Requirement

You need to use Next.js >=11.0.
Because the library using `next/script` feature.

## Installation

```bash
npm install next-google-ads
```

## 📚 Usage Examples

### Basic Display Ad

```tsx
import GoogleAdsense from 'next-google-ads'

export const BasicAd = () => {
  return (
    <GoogleAdsense
      client="ca-pub-xxxxx"
      slot="99999999"
      responsive="true"
    />
  )
}
```

### 🆕 Auto Ads (2024 Feature)

Auto Ads use AI to automatically place ads on your site for optimal performance.

```tsx
import { AutoAdsScript } from 'next-google-ads'

// Add this to your _app.tsx or layout
export default function App({ Component, pageProps }) {
  return (
    <>
      <AutoAdsScript
        client="ca-pub-xxxxx"
        config={{
          enableAutoAds: true,
          adDensity: 'medium', // 'low' | 'medium' | 'high'
          enableAdIntents: true, // Enable new Ad Intents format
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
```

### 🔒 Consent Mode v2 (GDPR Compliance - Required since March 2024)

```tsx
import { AutoAdsScript } from 'next-google-ads'

export default function App({ Component, pageProps }) {
  return (
    <>
      <AutoAdsScript
        client="ca-pub-xxxxx"
        config={{ enableAutoAds: true }}
        consentMode={{
          ad_storage: 'denied', // or 'granted'
          analytics_storage: 'denied',
          ad_user_data: 'denied', // v2 required
          ad_personalization: 'denied', // v2 required
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
```

### 📱 Anchor Ads (2024 Feature - Mobile Collapsible Ads)

```tsx
import { AnchorAd } from 'next-google-ads'

export const MobileAd = () => {
  return (
    <AnchorAd
      client="ca-pub-xxxxx"
      slot="99999999"
      position="bottom" // 'top' | 'bottom' | 'both'
      collapsible={true} // Users can collapse the ad
    />
  )
}
```

### 📰 In-Article Ads (Modern Content Format)

Perfect for placing ads within your article content.

```tsx
import { InArticleAd } from 'next-google-ads'

export const ArticleContent = () => {
  return (
    <article>
      <p>Your content...</p>

      <InArticleAd
        client="ca-pub-xxxxx"
        slot="99999999"
      />

      <p>More content...</p>
    </article>
  )
}
```

### 📋 In-Feed Ads (Modern List/Feed Format)

Perfect for placing ads in lists, feeds, or card layouts.

```tsx
import { InFeedAd } from 'next-google-ads'

export const FeedList = () => {
  return (
    <div>
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} />

          {/* Show ad after every 5 posts */}
          {index % 5 === 4 && (
            <InFeedAd
              client="ca-pub-xxxxx"
              slot="99999999"
              layoutKey="-fb+5w+4e-db+86" // Get from AdSense
            />
          )}
        </div>
      ))}
    </div>
  )
}
```

### 🔗 Multiplex Ads (Related Content)

Shows related content with ads.

```tsx
import { MultiplexAd } from 'next-google-ads'

export const RelatedContent = () => {
  return (
    <aside>
      <h3>Related Articles</h3>
      <MultiplexAd
        client="ca-pub-xxxxx"
        slot="99999999"
      />
    </aside>
  )
}
```

### 🔐 Non-Personalized Ads (Privacy-Focused)

For privacy-conscious users or GDPR compliance.

```tsx
import GoogleAdsense from 'next-google-ads'

export const PrivacyFriendlyAd = () => {
  return (
    <GoogleAdsense
      client="ca-pub-xxxxx"
      slot="99999999"
      responsive="true"
      npaMode={true} // Non-personalized ads
    />
  )
}
```

### 🧪 Test Mode

Test your ads without affecting your account metrics.

```tsx
import GoogleAdsense from 'next-google-ads'

export const TestAd = () => {
  return (
    <GoogleAdsense
      client="ca-pub-xxxxx"
      slot="99999999"
      responsive="true"
      adTest="on" // Enable test mode
    />
  )
}
```

## Load ad.js manually

```tsx
import { NextGoogleAdsenseScript, GoogleAdsenseWidget } from 'next-google-ads'

export const ManualAd = () => {
  return (
    <>
      <NextGoogleAdsenseScript
        client="ca-pub-xxxxx"
        npaMode={false}
        crossOrigin={true}
      />
      <GoogleAdsenseWidget
        client="ca-pub-xxxxx"
        slot="99999999"
        responsive="true"
      />
    </>
  )
}
```

## 📖 API Reference

### Components

- `GoogleAdsense` - Standard display ad (default export)
- `AutoAdsScript` - Auto Ads with AI placement (2024)
- `AnchorAd` - Mobile collapsible ads (2024)
- `InArticleAd` - Article content ads
- `InFeedAd` - List/feed ads
- `MultiplexAd` - Related content ads
- `GoogleAdsenseWidget` - Ad widget only (no script)
- `NextGoogleAdsenseScript` - Script only (no widget)

### Types

- `GoogleAdsenseProps` - Standard ad props
- `AutoAdsProps` - Auto Ads configuration
- `ConsentModeV2` - GDPR consent settings
- `AnchorAdProps` - Anchor ad configuration
- `InArticleAdProps` - In-article ad props
- `InFeedAdProps` - In-feed ad props
- `MultiplexAdProps` - Multiplex ad props

## 🆕 What's New in 2024-2025

### Auto Ads (2024)
AI-powered automatic ad placement that optimizes for revenue and user experience.

### Consent Mode v2 (Required since March 2024)
Enhanced privacy controls for GDPR compliance with new `ad_user_data` and `ad_personalization` signals.

### Ad Intents (2024)
New intent-driven ad format that places contextual ads within your content.

### Anchor Ads (2024)
Collapsible mobile ads with position control (top/bottom/both) for better user experience.

### Enhanced Ad Formats
Support for In-Article, In-Feed, and Multiplex ads for better content integration.

## License

MIT


# [Appendix] TSDX React User Guide

Congrats! You just saved yourself hours of work by bootstrapping this project with TSDX. Let’s get you oriented with what’s here and how to use it.

> This TSDX setup is meant for developing React component libraries (not apps!) that can be published to NPM. If you’re looking to build a React-based app, you should use `create-react-app`, `razzle`, `nextjs`, `gatsby`, or `react-static`.

> If you’re new to TypeScript and React, checkout [this handy cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/)

## Commands

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm install
npm start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `npm run build`.

To run tests, use `npm test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test`.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `npm run size` and visulize it with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/example
  index.html
  index.tsx       # test your component here in a demo app
  package.json
  tsconfig.json
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

#### React Testing Library

We do not set up `react-testing-library` for you yet, we welcome contributions and documentation on this.

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Deploying the Example Playground

The Playground is just a simple [Parcel](https://parceljs.org) app, you can deploy it anywhere you would normally deploy that. Here are some guidelines for **manually** deploying with the Netlify CLI (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

Alternatively, if you already have a git repo connected, you can set up continuous deployment with Netlify:

```bash
netlify init
# build command: npm run build && cd example && npm install && npm run build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).

## Usage with Lerna

When creating a new package with TSDX within a project set up with Lerna, you might encounter a `Cannot resolve dependency` error when trying to run the `example` project. To fix that you will need to make changes to the `package.json` file _inside the `example` directory_.

The problem is that due to the nature of how dependencies are installed in Lerna projects, the aliases in the example project's `package.json` might not point to the right place, as those dependencies might have been installed in the root of your Lerna project.

Change the `alias` to point to where those packages are actually installed. This depends on the directory structure of your Lerna project, so the actual path might be different from the diff below.

```diff
   "alias": {
-    "react": "../node_modules/react",
-    "react-dom": "../node_modules/react-dom"
+    "react": "../../../node_modules/react",
+    "react-dom": "../../../node_modules/react-dom"
   },
```

An alternative to fixing this problem would be to remove aliases altogether and define the dependencies referenced as aliases as dev dependencies instead. [However, that might cause other problems.](https://github.com/palmerhq/tsdx/issues/64)
