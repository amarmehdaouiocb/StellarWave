# STELLAR WAVE - WORKFLOW DE GÉNÉRATION VIDÉO "SHOWREEL" (15s)

Ce document décrit exactement comment générer le Showreel de fond pour la nouvelle page d'accueil V4 de StellarWave.
Esthétique : Premium, Brutaliste, Tech, Dark Graphite, Neon Lime (E0FF31), Deep Purple (8A2BE2).

---

## ÉTAPE 1 : GÉNÉRATION DES KEYFRAMES (GPT Image 1.5 ou Midjourney v6)

**Pourquoi ?** Pour verrouiller la direction artistique, la lumière et le grain avant d'animer. Il faut que tous les plans aient exactement la même "vibe".
**Format :** 16:9 (ex: 1536x1024)

### Keyframe 1 : Le "Reveal" (Plan Macro)
**Prompt Text-to-Image :**
> Ultra-premium technology agency commercial still. Macro close-up of a sleek, dark graphite server or high-end laptop edge in a pitch-black studio. A very thin, elegant beam of neon lime (hex #E0FF31) light sweeps across the metallic surface, revealing subtle brushed textures. Volumetric lighting, 85mm cinematic lens, extremely shallow depth of field, pure luxury tech aesthetic, clean, no text, no holograms, pure physics.

### Keyframe 2 : L'Interface (Plan UI)
**Prompt Text-to-Image :**
> Ultra-premium technology agency commercial still. A beautiful, minimalist software interface displayed on a premium monitor angled slightly away from camera. The interface is dark mode, featuring brutalist typography, geometric charts, and subtle deep purple (#8A2BE2) and neon lime (#E0FF31) accents on a graphite background. Soft studio overhead key light, no glare, photoreal, Apple-meets-enterprise aesthetic, expensive digital craftsmanship.

### Keyframe 3 : L'Ingénierie (Plan Humain / Matériel)
**Prompt Text-to-Image :**
> Ultra-premium technology agency commercial still. A soft, out-of-focus silhouette of a developer in the background, while the foreground shows a perfectly lit mechanical keyboard and trackpad in dark charcoal. A faint glow from a monitor illuminates the desk. Cinematic commercial photography, moody, quiet luxury, highly controlled lighting, precision engineering, no glowing green matrix code, realistic and sophisticated.

### Keyframe 4 : Le Produit / Mobile (Plan Setup)
**Prompt Text-to-Image :**
> Ultra-premium technology agency commercial still. A sleek smartphone resting on a dark, matte desk next to a laptop. The phone screen displays a minimal, high-end mobile app in dark mode with a single neon lime notification dot. Soft rim light highlighting the edge of the phone. Photoreal, moody studio lighting, 35mm lens, sharp focus on the phone screen, elegant reflections, high-end product photography.

---

## ÉTAPE 2 : ANIMATION DES PLANS (Veo 3.1, Runway Gen-4.5 ou Sora 2 Pro)

**Méthode :** Prenez chaque image générée ci-dessus et utilisez-la comme "Image Prompt" (Image-to-Video) dans l'IA vidéo.

### Plan 1 (Animation depuis Keyframe 1) - 3 secondes
**Prompt Image-to-Video :**
> The exact same premium aesthetic from the reference image. Extreme slow motion. The neon lime light slowly travels across the metallic edge, creating a sharp, elegant reflection. Smooth, buttery camera pan from left to right. No morphing, maintain strict physical realism and material texture.

### Plan 2 (Animation depuis Keyframe 2) - 4 secondes
**Prompt Image-to-Video :**
> The exact same interface and lighting from the reference image. Slow cinematic push-in (zoom forward). The interface data subtly animates—a sleek graph smoothly rises, and a micro-interaction occurs with a neon lime highlight. Very gentle screen parallax. Keep the monitor hardware perfectly rigid, no melting or distortion.

### Plan 3 (Animation depuis Keyframe 3) - 4 secondes
**Prompt Image-to-Video :**
> The exact same lighting and setup from the reference image. A human hand elegantly enters the frame and performs a single, precise, slow swipe on the trackpad. The background glow subtly changes as if the screen content moved. Highly realistic skin movement, cinematic depth of field, slow and deliberate motion.

### Plan 4 (Animation depuis Keyframe 4) - 4 secondes
**Prompt Image-to-Video :**
> The exact same mobile setup from the reference image. Camera slowly arcs around the phone. The phone screen remains perfectly stable while the environment reflections slide smoothly across the glass surface. Quiet luxury, high-end product commercial motion, stable geometry.

---

## ÉTAPE 3 : POST-PRODUCTION (Toi-même ou monteur)
1. Importe les 4 clips dans Premiere Pro, DaVinci Resolve ou CapCut.
2. Ajoute un Sound Design très minimal (des basses sourdes, des petits "clics" mécaniques premium, un bruit de souffle ambiant / "whoosh" très léger).
3. Ne mets pas de musique forte, juste de l'ambiance sonore "Dark Tech".
4. Exporte en MP4 / WebM optimisé.
5. Nous le mettrons en fond de la section `HeroV4` !