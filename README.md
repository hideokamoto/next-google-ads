# next-google-ads

A lightweight Google AdSense component for Next.js with optimized script loading using Next.js's `next/script` feature.

## Features

- 🚀 Optimized script loading with Next.js Script component
- 📦 TypeScript support out of the box
- 🔄 Full ESM and CommonJS support
- 📱 Responsive ad support
- ⚡ Zero runtime dependencies (only peer dependencies)

## Requirements

- Next.js >= 16.0
- React >= 19.0
- Node.js >= 20.19.0

## Migration Guide (v0.x → v1.0.0)

If you're upgrading from v0.x to v1.0.0, please follow these steps:

### 1. Update Your Dependencies

v1.0.0 requires newer versions of Next.js, React, and Node.js:

```bash
# Update Next.js to v16 or later
npm install next@^16.0.0

# Update React to v19 or later
npm install react@^19.0.0 react-dom@^19.0.0

# Ensure Node.js >= 20.19.0
node --version  # Should be >= 20.19.0
```

### 2. Update the Package

```bash
npm install next-google-ads@^1.0.0
```

### 3. Code Changes

**Good news**: The API remains the same! Your existing code should work without changes. However, please verify:

- ✅ Component imports and usage remain unchanged
- ✅ Props interface is identical
- ✅ TypeScript types are compatible

### 4. Breaking Changes

- **Node.js**: Requires Node.js >= 20.19.0 (if you were using an older version)
- **Next.js**: Requires Next.js >= 16.0 (if you were using Next.js < 16)
- **React**: Requires React >= 19.0 (if you were using React < 19)

### 5. Verify Your Setup

After upgrading, test your AdSense components to ensure they're working correctly:

```bash
# Run your development server
npm run dev

# Check for any TypeScript errors
npm run build
```

### Need Help?

If you encounter any issues during migration, please:
- Check the [GitHub Issues](https://github.com/hideokamoto/next-google-ads/issues)
- Review the [full changelog](https://github.com/hideokamoto/next-google-ads/releases/tag/v1.0.0)

## Installation

```bash
npm install next-google-ads
```

or

```bash
yarn add next-google-ads
```

or

```bash
pnpm add next-google-ads
```

## Quick Start

### Basic Usage

The simplest way to use this library is with the default `GoogleAdsense` component, which includes both the script loader and the ad widget:

```jsx
import GoogleAdsense from 'next-google-ads'

export default function MyPage() {
  return (
    <GoogleAdsense
      client="ca-pub-xxxxx"
      slot="99999999"
      responsive="true"
    />
  )
}
```

### Advanced Usage

If you need more control, you can use the individual components:

#### Using GoogleAdsenseWidget only

Use this when you want to load the AdSense script manually or have already loaded it elsewhere:

```jsx
import { GoogleAdsenseWidget } from 'next-google-ads'
import Script from 'next/script'

export default function MyPage() {
  return (
    <>
      <Script
        id="google-adsense"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        data-ad-client="ca-pub-xxxxx"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => {
          try {
            ((window as any).adsbygoogle =
              (window as any).adsbygoogle || []).push({})
          } catch (err) {
            console.error('AdSense error:', err)
          }
        }}
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

#### Using NextGoogleAdsenseScript only

Use this when you want to load the script but render the ad widget yourself:

```jsx
import { NextGoogleAdsenseScript } from 'next-google-ads'

export default function MyPage() {
  return (
    <>
      <NextGoogleAdsenseScript client="ca-pub-xxxxx" />
      {/* Your custom ad widget implementation */}
    </>
  )
}
```

## API Reference

### GoogleAdsense (Default Export)

The main component that includes both script loading and ad widget rendering.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `client` | `string` | Yes | - | Your Google AdSense client ID (e.g., `"ca-pub-xxxxx"`) |
| `slot` | `string` | Yes | - | Your ad slot ID |
| `responsive` | `string` | No | `"false"` | Set to `"true"` for responsive ads |
| `format` | `string` | No | `"auto"` | Ad format |
| `layout` | `string` | No | `""` | Ad layout |
| `layoutKey` | `string` | No | `""` | Ad layout key |
| `className` | `string` | No | `""` | Additional CSS class names |
| `style` | `CSSProperties` | No | `{ display: 'block', width: '728px', height: '90px' }` | Inline styles |

### GoogleAdsenseWidget

Renders only the ad widget (ins element). Use this when you handle script loading separately.

**Props:** Same as `GoogleAdsense` (except script-related props are not used)

### NextGoogleAdsenseScript

Loads only the Google AdSense script. Use this when you want to render the ad widget yourself.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `client` | `string` | Yes | Your Google AdSense client ID |

## Examples

### Responsive Ad

```jsx
import GoogleAdsense from 'next-google-ads'

export default function MyPage() {
  return (
    <GoogleAdsense
      client="ca-pub-xxxxx"
      slot="99999999"
      responsive="true"
    />
  )
}
```

### Fixed Size Ad with Custom Styling

```jsx
import GoogleAdsense from 'next-google-ads'

export default function MyPage() {
  return (
    <GoogleAdsense
      client="ca-pub-xxxxx"
      slot="99999999"
      style={{
        display: 'block',
        width: '300px',
        height: '250px',
      }}
      className="my-ad-container"
    />
  )
}
```

### Multiple Ads on One Page

```jsx
import GoogleAdsense from 'next-google-ads'

export default function MyPage() {
  return (
    <div>
      <GoogleAdsense
        client="ca-pub-xxxxx"
        slot="11111111"
        responsive="true"
      />
      <GoogleAdsense
        client="ca-pub-xxxxx"
        slot="22222222"
        responsive="true"
      />
    </div>
  )
}
```

## Development

### Setup

```bash
npm install
```

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Hidetaka Okamoto

## Repository

https://github.com/hideokamoto/next-google-ads
