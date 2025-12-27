# Configuration Files Analysis

**Report Date:** 2025-12-27  
**Scout ID:** aa78518  
**Analyzed Files:** 9 config files

---

## 1. Dependencies & Versions

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.3.1 | UI framework |
| react-dom | ^18.3.1 | React DOM renderer |
| three | ^0.170.0 | 3D graphics library |
| @react-three/fiber | ^8.17.10 | React renderer for Three.js |
| @react-three/drei | ^9.117.3 | Three.js helpers for React |
| zustand | ^5.0.9 | State management |
| lucide-react | ^0.562.0 | Icon library |
| @tailwindcss/postcss | ^4.1.18 | Tailwind PostCSS plugin |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0.5 | Build tool/dev server |
| typescript | ^5.7.2 | TypeScript compiler |
| @vitejs/plugin-react | ^4.3.4 | React plugin for Vite |
| tailwindcss | ^4.1.18 | Utility-first CSS |
| postcss | ^8.5.6 | CSS transformer |
| autoprefixer | ^10.4.23 | Vendor prefix utility |
| @types/react | ^18.3.12 | React TypeScript types |
| @types/react-dom | ^18.3.1 | React DOM types |
| @types/three | ^0.170.0 | Three.js types |

---

## 2. Build Configuration (vite.config.ts)

**Build Tool:** Vite 6.0.5  
**Plugin:** @vitejs/plugin-react

### Path Aliases
- `@` → `./src`

### Manual Chunks Strategy
```
react-vendor: [react, react-dom]
three-vendor: [three, @react-three/fiber, @react-three/drei]
state-vendor: [zustand]
```

### Build Process
```bash
npm run build  # tsc && vite build
```

---

## 3. TypeScript Configuration

**Target:** ES2020  
**Module:** ESNext  
**JSX:** react-jsx (new JSX transform)

### Key Compiler Options
- `strict: true` - Strict mode enabled
- `moduleResolution: bundler` - Modern bundler resolution
- `skipLibCheck: true` - Skip .d.ts checking
- `noUnusedLocals: true` - Catch unused variables
- `noUnusedParameters: true` - Catch unused params
- `noFallthroughCasesInSwitch: true` - Switch safety
- `noUncheckedSideEffectImports: true` - Import safety

### Path Mapping
```json
"@/*": ["./src/*"]
```

**Include:** Only `src/` directory

---

## 4. Tailwind Theme Extensions

### Color Palette
```javascript
// Primary Blue
maya-primary: #4A90E2
maya-primary-light: #7CB3F5
maya-primary-dark: #2E6AB8

// Secondary Green
maya-secondary: #50C878
maya-secondary-light: #7FDA9A
maya-secondary-dark: #3AA05A

// Accent Pink
maya-accent: #FF6B9D

// Neutrals
maya-bg-light: #F8FAFC
maya-bg-gray: #F1F5F9
maya-text-primary: #1E293B
maya-text-secondary: #64748B
maya-text-muted: #94A3B8

// Semantic
maya-success: #10B981
maya-warning: #F59E0B
maya-error: #EF4444
maya-info: #3B82F6
```

### Font Families
```javascript
sans: ['Inter', 'system-ui', 'sans-serif']
heading: ['Poppins', 'Inter', 'sans-serif']
```

### Content Sources
- `./index.html`
- `./src/**/*.{js,ts,jsx,tsx}`

---

## 5. Deployment Setup

### Docker Configuration
**Base Images:** 
- Builder: `node:20-alpine`
- Production: `nginx:alpine`

**Build Stages:**
1. Build stage: `npm ci && npm run build`
2. Production: Serve `/dist` via nginx

**Port:** 80

### Nginx Configuration
- Root: `/usr/share/nginx/html`
- SPA routing: `try_files` fallback to `/index.html`
- Asset caching: 1 year, immutable
- Gzip: Enabled for text/css/js/json/xml

### Railway Deployment
**Docker Context:** `.`  
**Dockerfile:** `./Dockerfile`  
**Start Command:** `npm run preview`  
**Healthcheck:** `/`

---

## File Locations

| File | Path |
|------|------|
| Package config | `D:\Projects\cikgu-maya-3d\package.json` |
| Vite config | `D:\Projects\cikgu-maya-3d\vite.config.ts` |
| TypeScript config | `D:\Projects\cikgu-maya-3d\tsconfig.json` |
| Tailwind config | `D:\Projects\cikgu-maya-3d\tailwind.config.js` |
| PostCSS config | `D:\Projects\cikgu-maya-3d\postcss.config.js` |
| HTML entry | `D:\Projects\cikgu-maya-3d\index.html` |
| Dockerfile | `D:\Projects\cikgu-maya-3d\Dockerfile` |
| Nginx config | `D:\Projects\cikgu-maya-3d\nginx.conf` |
| Railway config | `D:\Projects\cikgu-maya-3d\railway.json` |

---

## Unresolved Questions

None. All configuration files successfully read and analyzed.
