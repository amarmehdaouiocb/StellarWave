# Premium Typography Setup

This directory contains the self-hosted premium fonts for Stellar Wave.

## Required Font Files

### Display Font: Clash Display (Indian Type Foundry)
A geometric display sans-serif with strong personality.
- Source: https://www.fontshare.com/fonts/clash-display (FREE)

Place the following files here:
```
ClashDisplay-Bold.woff2
ClashDisplay-Semibold.woff2
ClashDisplay-Medium.woff2
```

### Body Font: Cabinet Grotesk (Indian Type Foundry)
A clean, highly readable grotesk for body text.
- Source: https://www.fontshare.com/fonts/cabinet-grotesk (FREE)

Place the following files here:
```
CabinetGrotesk-Regular.woff2
CabinetGrotesk-Medium.woff2
CabinetGrotesk-Bold.woff2
```

## Alternative Fonts (if needed)

### Option A: Satoshi + General Sans
- Satoshi: https://www.fontshare.com/fonts/satoshi
- General Sans: https://www.fontshare.com/fonts/general-sans

### Option B: Switzer + Synonym
- Switzer: https://www.fontshare.com/fonts/switzer
- Synonym: https://www.fontshare.com/fonts/synonym

## How to Install

1. Download fonts from Fontshare (free, no account required)
2. Extract the .woff2 files
3. Place them in this `/public/fonts/` directory
4. The fonts will automatically be loaded by Next.js

## Current Fallback

Until premium fonts are installed, the site uses:
- Display: Outfit (from Google Fonts)
- Body: System fonts

The configuration in `src/lib/fonts.ts` will automatically use the premium fonts once the .woff2 files are present.
