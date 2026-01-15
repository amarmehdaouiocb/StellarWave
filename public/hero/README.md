# Hero Background Assets

Place your 4K background assets in this folder:

## Required Files

| File | Format | Description |
|------|--------|-------------|
| `hero-poster-4k.webp` | WebP | 4K (3840x2160) poster image - displayed while video loads |
| `hero-bg.webm` | WebM VP9 | 4K looping video (~15-30sec), compressed |
| `hero-bg.mp4` | H.264 MP4 | Fallback video for Safari/older browsers |

## Specifications

### Image (hero-poster-4k.webp)
- Resolution: 3840x2160 (4K)
- Format: WebP (preferred) or JPEG
- Max size: ~500KB
- Content: First frame of video or standalone cosmic/abstract image

### Video (hero-bg.webm / hero-bg.mp4)
- Resolution: 3840x2160 (4K)
- Duration: 15-30 seconds, seamless loop
- Codec: VP9 (WebM) / H.264 (MP4)
- Max file size: ~15MB (WebM), ~20MB (MP4)
- Audio: None (muted autoplay)

## Recommended Content
- Cosmic/space themes
- Abstract flowing gradients
- Particle effects
- Subtle motion (avoid fast movements)
- Dark tones to match Ember Luxe theme

## Fallback Behavior
If videos are not present, the component will:
1. Show only the poster image
2. Apply parallax effect to the static image
3. Still show all overlay effects (gradient, vignette, etc.)
