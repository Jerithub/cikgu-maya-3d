# Cikgu Maya 3D

An interactive educational assistant featuring a **VRM-based 3D character** with voice integration and real-time chat. Built with React Three Fiber, Zustand, and Web Speech API.

## Features

- **VRM Character**: Full 3D character using @pixiv/three-vrm with bone-based animations
- **6 Animation States**: idle, talking, wave, nod, thinking, pointing
- **Voice Integration**: Web Speech API for text-to-speech (en-MY locale)
- **Chat Interface**: Real-time conversation with Malaysian teacher context
- **Responsive Design**: Works on desktop and mobile devices
- **Glassmorphism UI**: Modern translucent design with Tailwind CSS v4

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── 3d/
│   │   ├── VRMCharacter.tsx    # VRM model loader (NEW)
│   │   ├── MayaCharacter.tsx   # Procedural fallback (unused)
│   │   ├── Scene.tsx           # R3F Canvas with lighting
│   │   └── Viewport3D.tsx      # Scene wrapper
│   ├── chat/                   # Chat components (7 files)
│   ├── layout/                 # Layout components
│   └── ui/                     # Reusable UI components
├── hooks/
│   └── useChat.ts              # Chat orchestrator hook
├── store/
│   └── chatStore.ts            # Zustand state management
├── lib/ai/                     # Mock AI engine
└── types/                      # TypeScript definitions
public/
└── Maya.vrm                    # VRM character file (~15MB)
```

## VRM Integration

The project uses **@pixiv/three-vrm v3.4.4** to load and animate VRM models:

- **File**: `public/Maya.vrm` (VRoid Studio model)
- **Bone Animation**: Uses humanoid bones (head, jaw, rightUpperArm, rightLowerArm, chest)
- **Same AnimationState Interface**: Drop-in replacement for procedural character
- **No Breaking Changes**: Chat interface remains unchanged

## Animation System

| State | Description | Bones Used |
|-------|-------------|------------|
| `idle` | Breathing + head sway | chest, head |
| `talking` | Jaw movement synced to TTS | jaw |
| `wave` | Hand wave gesture | rightUpperArm, rightLowerArm |
| `nod` | Head nodding | head |
| `thinking` | Hand to chin + head tilt | rightUpperArm, rightLowerArm, head |
| `pointing` | Arm extended forward | rightUpperArm, rightLowerArm |

## Tech Stack

- **React 18.3** + **TypeScript 5.7**
- **Vite 6.0** for build tooling
- **Three.js 0.170** + **@react-three/fiber 8.17**
- **@pixiv/three-vrm 3.4.4** for VRM support
- **Zustand 5.0** for state management
- **Tailwind CSS 4.1** for styling
- **lucide-react 0.562** for icons

## State Management

Zustand store manages:
- Chat messages with timestamps
- Animation states (6 states)
- Voice controls (enabled/speaking)
- Typing indicators

## Voice Features

- **Web Speech API**: Browser-native TTS
- **en-MY Locale**: Malaysian English with fallback
- **Auto-Sync**: Animation switches to 'talking' during speech
- **Voice Toggle**: Enable/disable in chat header

## Deployment

### Railway (Recommended)
```bash
# Push to GitHub → Railway auto-builds
railway.json configured for static site deployment
```

### Static Hosting
```bash
npm run build
# Upload dist/ folder
```

## Development

- **Path Aliases**: Use `@/` for imports (configured in tsconfig and vite)
- **Code Splitting**: React, Three.js, and state split into separate chunks
- **TypeScript Strict Mode**: Enabled

## Documentation

- [Project Overview & PDR](./docs/project-overview-pdr.md)
- [Codebase Summary](./docs/codebase-summary.md)
- [Code Standards](./docs/code-standards.md)
- [System Architecture](./docs/system-architecture.md)
- [Deployment Guide](./docs/deployment-guide.md)

## License

MIT
