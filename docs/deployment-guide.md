# Deployment Guide - Cikgu Maya 3D

**Last Updated:** 2025-12-29
**Project:** Cikgu Maya 3D
**Version:** 1.1.0

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
# IMPORTANT: Include public/ folder contents (Maya.vrm)
```

---

## Local Production Build

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173`

**Note**: VRM file (`public/Maya.vrm`) is served from the public folder.

---

## Environment Variables

No required environment variables for MVP. Future:

```env
VITE_AI_PROVIDER=mock
VITE_GOOGLE_TTS_API_KEY=xxx
```

---

## Performance Notes

- **Build size**: ~1.2MB JS (gzipped: ~350KB, UPDATED with VRM library)
- **VRM Asset**: ~15MB (public/Maya.vrm, loaded separately via HTTP)
- **Initial load**: <3s on 4G (excluding VRM file)
- **VRM Load Time**: ~5-10s on 4G (first time, then cached)
- **3D viewport**: 60 FPS on modern devices

---

## Asset Deployment

### Public Folder Assets

The application serves static assets from the `public/` folder:

```
public/
└── Maya.vrm    (~15MB VRM character model)
```

**Deployment Notes**:
- VRM file must be included in deployment
- File is loaded via HTTP at runtime: `loader.load('/Maya.vrm', ...)`
- Browser caching applies after first load
- Consider CDN for VRM file in production

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Voice not working | Browser doesn't support Web Speech API (use Chrome/Edge/Safari) |
| 3D not loading | Check browser supports WebGL |
| VRM file not found | Ensure public/Maya.vrm is deployed and accessible |
| Deploy fails | Verify Dockerfile and nginx.conf are present |
| Slow initial load | VRM file is ~15MB, consider CDN or compression |