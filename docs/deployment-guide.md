# Deployment Guide - Cikgu Maya 3D

**Last Updated:** 2025-12-27
**Project:** Cikgu Maya 3D
**Version:** 0.0.0

---

## Quick Deploy Options

### 1. Railway (Recommended)

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `cikgu-maya-3d` repository

2. **Configuration**
   - Railway auto-detects static site via Dockerfile
   - Build command: `npm run build`
   - Start command: `npm run preview`

3. **Deploy**
   - Click "Deploy"
   - Railway builds and deploys in ~2-3 minutes
   - Get your `*.railway.app` URL

### 2. Vercel

```bash
npm install -g vercel
vercel --prod
```

### 3. Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### 4. Static Hosting (GitHub Pages, S3, etc.)

```bash
npm run build
# Upload 'dist/' folder to your static host
```

---

## Local Production Build

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173`

---

## Environment Variables

No required environment variables for MVP. Future:

```env
VITE_AI_PROVIDER=mock
VITE_GOOGLE_TTS_API_KEY=xxx
```

---

## Performance Notes

- Build size: ~1.1MB (gzipped: ~300KB)
- Initial load: <3s on 4G
- 3D viewport: 60 FPS on modern devices

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Voice not working | Browser doesn't support Web Speech API (use Chrome/Edge/Safari) |
| 3D not loading | Check browser supports WebGL |
| Deploy fails | Verify Dockerfile and nginx.conf are present |