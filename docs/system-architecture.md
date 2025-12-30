# System Architecture

**Last Updated:** 2025-12-29 (VRM Integration Complete)
**Project:** Cikgu Maya 3D
**Version:** 1.1.0

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Component Architecture](#component-architecture)
4. [State Management](#state-management)
5. [3D Rendering Pipeline](#3d-rendering-pipeline)
6. [VRM Animation System](#vrm-animation-system)
7. [Data Flow](#data-flow)
8. [Module Dependencies](#module-dependencies)
9. [Performance Considerations](#performance-considerations)

## Architecture Overview

Cikgu Maya 3D follows a **client-side SPA (Single Page Application)** architecture with React as the UI framework and Three.js for 3D rendering. The application includes **VRM-based character rendering**, **mock AI responses**, **Web Speech API for TTS**, and is built with **Vite** for fast development and optimized production builds.

```
┌──────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌────────────────┐         ┌─────────────────┐                  │
│  │   React UI     │         │  3D Viewport    │                  │
│  │  (Chat Panel)  │◄────────┤  (Three.js)     │                  │
│  │                │  State  │                 │                  │
│  └────────┬───────┘         │  VRMCharacter   │                  │
│           │                 │  (Maya.vrm)     │                  │
│           │                 └─────────────────┘                  │
│           │                                                          │
│           ▼                                                          │
│  ┌────────────────┐                                                 │
│  │ Zustand Store  │                                                 │
│  │ (State Mgmt)   │                                                 │
│  │ - messages     │                                                 │
│  │ - voice state  │                                                 │
│  │ - animations   │                                                 │
│  └────────┬───────┘                                                 │
│           │                                                          │
│           ├─────────────────────────────┐                          │
│           ▼                             ▼                          │
│  ┌────────────────┐          ┌─────────────────┐                   │
│  │ Mock AI Engine │          │ Web Speech API  │                   │
│  │ (7 categories) │          │  (TTS en-MY)    │                   │
│  └────────────────┘          └─────────────────┘                   │
│                                                                    │
│  ┌────────────────┐                                                 │
│  │ useChat Hook   │  (Orchestrates flow)                          │
│  │ - AI response  │────────► Store update ────────► TTS speak       │
│  │ - Animations   │          └──────────────────────────────────┘   │
│  │ - Timing       │                                                 │
│  └────────────────┘                                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend Layer
- **React 18.3** - Component-based UI framework
  - Concurrent features (Suspense, Transitions)
  - Strict mode for development checks
- **TypeScript 5.7** - Static typing and compilation
- **Vite 6.0** - Build tool and dev server
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - ES module support

### 3D Graphics Layer
- **Three.js 0.170** - WebGL rendering engine
  - Scene graph management
  - Material and geometry system
  - Animation loop handling
- **@react-three/fiber 8.17** - React renderer for Three.js
  - Declarative 3D components
  - React hooks for 3D (useFrame, useThree)
  - Reconciler for React-to-Three.js bridge
- **@react-three/drei 9.117** - Helper components
  - Pre-built abstractions (lights, controls, loaders)
  - Performance optimizations
- **@pixiv/three-vrm 3.4.4** - VRM model loader (NEW)
  - GLTFLoader plugin for VRM format
  - VRoid Studio model support
  - Bone-based humanoid animation
  - VRMUtils for optimization

### State Management
- **Zustand 5.0** - Lightweight state management
  - No boilerplate or providers
  - TypeScript-first design
  - Immutable update patterns
  - Voice state management (voiceEnabled, isSpeaking)

### Voice Integration
- **Web Speech API** - Browser-native TTS
  - SpeechSynthesis interface
  - en-MY locale with fallback
  - Event handling (start, end, error)
  - Sync with character animations

### AI Engine
- **MockResponseEngine** - Keyword-based response system
  - 7 response categories
  - Malaysian teacher context
  - Emotion and animation triggers
  - Follow-up prompt suggestions

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
  - PostCSS integration
  - JIT (Just-In-Time) compiler
  - Design system tokens (Maya colors)

## Component Architecture

### Component Tree

```
App
├── Layout
│   ├── Viewport3D
│   │   └── Scene (Canvas)
│   │       ├── Lights (ambient, directional, point)
│   │       ├── Environment (city preset)
│   │       ├── OrbitControls
│   │       ├── Ground Plane
│   │       └── VRMCharacter (NEW - loads /Maya.vrm)
│   │           └── VRM Humanoid Bones
│   │               ├── head (nod, thinking, idle sway)
│   │               ├── jaw (talking)
│   │               ├── rightUpperArm (wave, pointing, thinking)
│   │               ├── rightLowerArm (wave, pointing, thinking)
│   │               └── chest (breathing)
│   └── ChatPanel
│       ├── ChatHeader
│       │   ├── Avatar (gradient circle)
│       │   ├── Name (Cikgu Maya)
│       │   ├── StatusBadge (ready/thinking/speaking)
│       │   └── Settings Button
│       ├── MessageList
│       │   ├── Welcome Message (when empty)
│       │   ├── MessageBubble[] (user/assistant)
│       │   └── TypingIndicator
│       ├── SuggestedPrompts
│       │   └── Prompt Chips[]
│       └── ChatInput
│           ├── Character Counter
│           ├── Text Area (with Enter/Shift+Enter)
│           ├── Send Button
│           └── Helper Text
```

### Component Responsibilities

#### **App.tsx**
- **Role**: Root application component
- **Responsibilities**:
  - Orchestrates Viewport3D and ChatPanel
  - Provides Layout wrapper
  - Defines Viewport3D and ChatPanel as inline components
- **Dependencies**: Layout, Scene (via Viewport3D)

#### **Layout.tsx**
- **Role**: Responsive layout container
- **Responsibilities**:
  - Splits screen into 3D viewport and chat panel
  - Handles responsive behavior (mobile/desktop)
  - Applies Tailwind layout utilities
- **Dependencies**: None (presentational)

#### **Viewport3D**
- **Role**: Scene wrapper component
- **Responsibilities**:
  - Wraps Scene component
  - Provides clean separation between Scene and Layout
  - Applies full-width/full-height styling
- **Dependencies**: Scene

#### **Scene.tsx**
- **Role**: Three.js Canvas with 3D environment
- **Responsibilities**:
  - Initializes Canvas with shadows, antialiasing, alpha
  - Sets up 3-point lighting (ambient, directional, point)
  - Adds Environment preset (city) for reflections
  - Configures OrbitControls (distance/polar angle limits)
  - Renders ground plane with shadow receiving
  - Connects VRMCharacter to chatStore for animation (UPDATED)
- **Dependencies**: VRMCharacter (NEW), useChatStore, @react-three/fiber, @react-three/drei

#### **VRMCharacter.tsx** - NEW
- **Role**: VRM-based 3D character with bone-based animations
- **Responsibilities**:
  - Load VRM model from public/Maya.vrm (~15MB)
  - Cache bone references (head, jaw, rightUpperArm, rightLowerArm, chest)
  - Animation state management via bone rotation (idle, talking, wave, nod, thinking, pointing)
  - Breathing animation (via chest bone, always active)
  - Call vrm.update(delta) every frame
  - Error handling and graceful fallback
- **Dependencies**: Three.js, @react-three/fiber, @pixiv/three-vrm, GLTFLoader
- **Props**: `animation?: AnimationState`, `audioAmplitude?: number`
- **Exports**: `AnimationState` type (union of 6 animations)

#### **MayaCharacter.tsx** - UNUSED
- **Role**: Procedural 3D character with animations (kept as fallback)
- **Status**: Component exists but not imported in Scene.tsx
- **Responsibilities**: (same as before, procedural construction)

#### **ChatPanel**
- **Role**: Main chat interface container
- **Responsibilities**:
  - Orchestrates all chat components
  - Manages suggested prompts state
  - Handles send message flow (user message -> typing -> echo response)
  - Integrates with chatStore for state management
- **Dependencies**: ChatHeader, MessageList, ChatInput, SuggestedPrompts, useChatStore

#### **ChatHeader**
- **Role**: Header with avatar and status
- **Responsibilities**:
  - Displays Cikgu Maya branding (gradient avatar + name)
  - Shows current status (ready/thinking/speaking) via StatusBadge
  - Settings button (placeholder for future settings)
- **Dependencies**: StatusBadge, useChatStore

#### **StatusBadge** (UI Component)
- **Role**: Visual status indicator
- **States**: ready (green), thinking (yellow), speaking (blue)
- **Props**: `status: 'ready' | 'thinking' | 'speaking'`
- **Features**: Animated dot pulse for thinking/speaking states

#### **MessageList**
- **Role**: Scrollable message container
- **Responsibilities**:
  - Renders all messages from chatStore
  - Auto-scrolls to bottom on new messages/typing state changes
  - Shows welcome message when empty
  - Displays TypingIndicator when isTyping is true
- **Dependencies**: MessageBubble, TypingIndicator, useChatStore

#### **MessageBubble**
- **Role**: Individual message display
- **Responsibilities**:
  - Different styling for user vs assistant messages
  - Displays message content with whitespace preservation
  - Shows formatted timestamp (HH:MM)
  - Rounded corners with asymmetric styling (user: rounded-br-sm, assistant: rounded-bl-sm)
- **Props**: `message: Message`

#### **ChatInput**
- **Role**: Message input with validation
- **Responsibilities**:
  - Text input with 500 character limit
  - Character counter with color coding (normal > near-limit > at-limit)
  - Send button with disabled states
  - Keyboard handling (Enter to send, Shift+Enter for newline)
  - Input validation (trim whitespace)
- **Props**: `onSend: (message: string) => void`, `disabled?: boolean`
- **Features**: Auto-resize textarea (48-120px), focus ring on input

#### **SuggestedPrompts**
- **Role**: Quick action prompt chips
- **Responsibilities**:
  - Displays clickable prompt chips
  - Hides when no prompts available
  - Hover effects (border color change)
- **Props**: `prompts: string[]`, `onSelectPrompt: (prompt: string) => void`
- **Default Prompts**: "Who needs my attention?", "How is Form 4S1 doing?", "Show at-risk students"

#### **TypingIndicator**
- **Role**: Animated typing indicator
- **Responsibilities**:
  - Three bouncing dots with staggered animation delays
  - "Maya is typing..." text label
  - Matches assistant message styling (gray background)

## State Management

### Zustand Store Architecture

```
┌──────────────────────────────────────────────┐
│           ChatStore (Zustand)                │
├──────────────────────────────────────────────┤
│ State:                                        │
│  - messages: Message[]                        │
│  - isTyping: boolean                          │
│  - currentEmotion: EmotionType                │
│  - currentAnimation: AnimationType (6 states) │
├──────────────────────────────────────────────┤
│ Actions:                                      │
│  - addMessage(message)                        │
│  - setTyping(boolean)                         │
│  - setEmotion(emotion)                        │
│  - setAnimation(animation)                    │
│  - clearMessages()                            │
└──────────────────────────────────────────────┘
         │              │              │
         ▼              ▼              ▼
    ┌─────────┐  ┌──────────┐  ┌─────────────┐
    │ Chat UI │  │ 3D Char  │  │ Future API  │
    └─────────┘  └──────────┘  └─────────────┘
```

### State Flow

1. **User Action** (e.g., sends message)
2. **Action Dispatched** (e.g., `addMessage()`)
3. **State Updated** (store creates new state immutably)
4. **Subscribers Re-render** (components using selector)
5. **Side Effects** (3D animation updates via useFrame)

### Store Selectors

```typescript
// Component-level selectors for performance
const messages = useChatStore((state) => state.messages)
const currentAnimation = useChatStore((state) => state.currentAnimation)
```

## 3D Rendering Pipeline

### Three.js Scene Graph (VRM-based)

```
Scene (Implicit in R3F)
└── Canvas
    └── vrmRef.scene (VRM Scene, rotated y = Math.PI)
        └── VRM Humanoid Bones
            ├── headBoneRef (Object3D)
            │   └── Rotation: nod (x), thinking (z), idle sway (x, y)
            ├── jawBoneRef (Object3D)
            │   └── Rotation: talking (x - jaw open/close)
            ├── rightUpperArmRef (Object3D)
            │   └── Rotation: wave (z), pointing (z, x), thinking (z, x)
            ├── rightLowerArmRef (Object3D)
            │   └── Rotation: wave (z oscillating), pointing (x), thinking (x)
            ├── chestBoneRef (Object3D)
            │   └── Rotation: breathing (z oscillating)
            └── (Other VRM nodes: mesh, materials, etc.)
```

### VRM Animation System (NEW)

**Frame Loop** (`useFrame` hook):
```
For each frame (60 FPS target):
  1. Check if vrmRef.current exists and vrmLoaded === true
  2. Get elapsed time from clock
  3. Apply breathing animation (chestBoneRef.rotation.z) - ALWAYS ACTIVE
  4. Apply idle head sway (headBoneRef.rotation.y, .x) - ALWAYS ACTIVE
  5. Switch(animation):
     - 'idle': Reset all bones to neutral pose via lerp
     - 'talking': Animate jaw (jawBoneRef.rotation.x) based on audioAmplitude or simulated wave
     - 'pointing': Extend right arm (rightUpperArm: z=-1.5, x=-0.3, rightLowerArm: x=-1.5)
     - 'wave': Raise right arm (rightUpperArm: z=-2.0), oscillate lowerArm (z wave motion at 10rad/s)
     - 'nod': Animate head nod (headBoneRef.rotation.x oscillating at 15rad/s)
     - 'thinking': Hand to chin pose (rightUpperArm: z=-0.8, x=-1.2, rightLowerArm: x=-1.0, head: z=0.15)
  6. Update all bone rotations using THREE.MathUtils.lerp for smoothness
  7. CRITICAL: Call vrm.update(delta) for VRM internal animation processing
```

**Bone Caching** (on VRM load):
```
1. Load VRM using GLTFLoader + VRMLoaderPlugin
2. Extract VRM from gltf.userData.vrm
3. Call VRMUtils.removeUnnecessaryVertices() and VRMUtils.removeUnnecessaryJoints()
4. Set vrm.scene.rotation.y = Math.PI (VRoid models face backward)
5. Cache bone references using vrm.humanoid.getNormalizedBoneNode():
   - headBoneRef = getNormalizedBoneNode('head')
   - jawBoneRef = getNormalizedBoneNode('jaw')
   - rightUpperArmRef = getNormalizedBoneNode('rightUpperArm')
   - rightLowerArmRef = getNormalizedBoneNode('rightLowerArm')
   - chestBoneRef = getNormalizedBoneNode('chest')
6. Set vrmLoaded = true
```

### Lighting Setup

**Three-Point Lighting**:
- **Key Light**: DirectionalLight (intensity 1.0, position [5, 5, 5])
  - Casts shadows, provides main illumination
  - Shadow map size: 1024x1024
- **Fill Light**: AmbientLight (intensity 0.6)
  - Soft fill for shadowed areas
- **Rim Light**: PointLight (intensity 0.4, position [-3, 3, -3])
  - Backlight for depth and separation
- **Environment**: City preset for realistic reflections (background disabled)

### Camera Setup

```typescript
camera={{
  position: [0, 1.5, 4],  // Slightly above and in front
  fov: 50,                // Natural field of view
}}
```

## Data Flow

### MVP Flow: User Message → AI Response → TTS → Animation

```
┌──────────────────┐
│ User Types       │
│ "Hello"          │
└─────────┬────────┘
          │
          ▼
┌──────────────────┐        ┌──────────────────────┐
│ ChatPanel        │────────► addMessage()         │
│ handleSendMessage│        │ (Store Action)        │
└──────────────────┘        └──────────┬───────────┘
                                      │
                                      ▼
                            ┌──────────────────────┐
                            │ Store Update         │
                            │ - messages: [user]   │
                            │ - isTyping: true     │
                            └──────────┬───────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
          ┌─────────────────┐                   ┌─────────────────┐
          │ MessageList     │                   │ MayaCharacter   │
          │ Shows user msg  │                   │ Animation: idle │
          │ + TypingIndicator│                  │ (unchanged)     │
          └─────────────────┘                   └─────────────────┘
                    │
                    ▼
          ┌──────────────────────────────────────────────────┐
          │ useChat.sendMessage() (Hook orchestrates flow)   │
          └────────────────────┬─────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
          ┌───────────────┐      ┌──────────────────┐
          │ Simulate      │      │ Mock AI Engine   │
          │ Thinking Delay│      │ getResponse()    │
          │ (500-1000ms)  │      │ - Keyword match  │
          └───────┬───────┘      │ - Select emotion │
                  │              │ - Select anim    │
                  │              │ - Follow-up     │
                  │              └────────┬─────────┘
                  │                       │
                  └───────────┬───────────┘
                              ▼
                    ┌──────────────────────┐
                    │ Store Updates        │
                    │ - addMessage(assistant)│
                    │ - setEmotion(happy)   │
                    │ - setAnimation(wave)  │
                    │ - isTyping: false     │
                    └──────────┬───────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
  ┌─────────────────┐                   ┌─────────────────┐
  │ MessageList     │                   │ MayaCharacter   │
  │ Shows assistant │                   │ Animation: wave │
  │ response        │                   │ (auto-idle 2s)  │
  └─────────────────┘                   └─────────────────┘
            │
            ▼
  ┌──────────────────────────────────────────────────┐
  │ store.speak(responseText)                        │
  │ - Check voiceEnabled                             │
  │ - Create SpeechSynthesisUtterance                │
  │ - Set voice (en-MY or en-*)                      │
  │ - onstart: isSpeaking=true, anim='talking'       │
  │ - Speak text                                     │
  │ - onend: isSpeaking=false, anim='idle'           │
  └────────────────────┬─────────────────────────────┘
                       │
                       ▼
            ┌─────────────────────┐
            │ Audio plays         │
            │ Jaw animates        │
            │ Status: 'speaking'  │
            └─────────────────────┘
```

### Voice Toggle Flow

```
┌──────────────┐
│ User clicks  │
│ Voice toggle │
└──────┬───────┘
       │
       ▼
┌──────────────┐        ┌──────────────────┐
│ ChatHeader   │────────► toggleVoice()    │
│ Voice button │        │ (Store Action)   │
└──────────────┘        └────────┬─────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │ voiceEnabled =   │
                       │ !voiceEnabled    │
                       └────────┬─────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
          ┌─────────────────┐     ┌─────────────────┐
          │ Disabling       │     │ Enabling        │
          │ - Cancel TTS    │     │ - Future speech │
          │ - isSpeaking=false│    │   will work     │
          │ - anim='idle'   │     │                 │
          └─────────────────┘     └─────────────────┘
```

## Module Dependencies

### Dependency Graph (MVP Complete)

```
index.html
  └─► main.tsx
       ├─► App.tsx
       │    ├─► Layout.tsx
       │    ├─► Viewport3D
       │    │    └─► Scene.tsx
       │    │         ├─► Canvas (R3F)
       │    │         ├─► OrbitControls, Environment (drei)
       │    │         └─► MayaCharacter.tsx
       │    │              └─► @react-three/fiber (useFrame)
       │    └─► ChatPanel
       │         ├─► ChatHeader
       │         │    ├─► StatusBadge
       │         │    ├─► useChatStore (voiceEnabled, isSpeaking, toggleVoice)
       │         │    └─► lucide-react (Volume2, VolumeX, Settings)
       │         ├─► MessageList
       │         │    ├─► MessageBubble
       │         │    ├─► TypingIndicator
       │         │    └─► useChatStore (messages, isTyping)
       │         ├─► SuggestedPrompts
       │         └─► ChatInput
       │              └─► lucide-react (Send icon)
       └─► index.css
            └─► Tailwind directives

chatStore.ts
  ├─► message.ts (types)
  ├─► zustand
  └─► Web Speech API (window.speechSynthesis)

useChat.ts (Hook)
  ├─► chatStore
  ├─► responseEngine.ts
  └─► message.ts (types)

responseEngine.ts
  ├─► mockResponses.ts
  └─► message.ts (types)

mockResponses.ts
  └─► message.ts (types)

message.ts (types)
  └─► No dependencies

lucide-react
  └─► Icons (Send, Settings, Volume2, VolumeX)
```

### Import Rules

**RULE**: Follow dependency inversion principle
- UI components should not import from other UI components directly
- Shared types should be in `types/` directory
- Store should not import components (one-way data flow)
- AI engine should be independent (no UI imports)
- Use path aliases (`@/`) for clean imports (configured in tsconfig and vite)

## Performance Considerations

### Rendering Optimization

**1. Selective Re-renders**
```typescript
// ✅ GOOD: Selector prevents re-render on unrelated state changes
const animation = useChatStore((state) => state.currentAnimation)

// ❌ BAD: Entire store causes re-render on any change
const store = useChatStore()
```

**2. Material Reuse**
```typescript
// Materials defined once, reused across meshes
const skinMaterial = <meshStandardMaterial color="#f4c2a8" />
```

**3. Animation Optimization**
```typescript
// THREE.MathUtils.lerp for smooth interpolation (GPU-accelerated)
ref.current.rotation.x = THREE.MathUtils.lerp(
  ref.current.rotation.x,
  targetValue,
  0.1  // Smoothness factor
)
```

### Memory Management

**1. Cleanup Effects**
```typescript
useEffect(() => {
  const interval = setInterval(blink, 3000)
  return () => clearInterval(interval) // Cleanup
}, [])
```

**2. Ref Cleanup**
```typescript
// R3F automatically cleans up refs on unmount
// No manual dispose needed for standard geometries/materials
```

### Bundle Size Optimization

**Current Status**: MVP Complete with VRM Integration
- React Vendor: React + ReactDOM (~42KB gzipped)
- Three Vendor: three + @react-three/fiber + @react-three/drei + @pixiv/three-vrm (~650KB gzipped, UPDATED)
- State Vendor: zustand (~1KB gzipped)
- Icons: lucide-react (~3KB gzipped, tree-shakeable)
- Assets: public/Maya.vrm (~15MB, loaded separately via HTTP)
- **Total JS**: ~696KB gzipped (split into 3 chunks, UPDATED)

**Implemented Optimizations**:
- Manual chunks configured in vite.config.ts
- Vendor separation (react, three, state)
- Path aliases for clean imports
- lucide-react tree-shaking (only imported icons bundled)

**Future Optimizations**:
- Code splitting for chat panel (lazy load)
- Dynamic imports for 3D assets
- Tree shaking for unused Three.js modules
- Service Worker for asset caching

### Performance Targets

| Metric | Target | MVP Status |
|--------|--------|------------|
| Initial Load | < 3s | ✅ ~1.5s (local) |
| 3D FPS | 60 FPS | ✅ 60 FPS (tested) |
| Re-render Time | < 16ms | ✅ < 5ms (simple) |
| Bundle Size | < 1MB | ✅ ~646KB (split) |
| TTS Latency | < 100ms | ✅ Web Speech API (native) |

---

## Architecture Principles

1. **Separation of Concerns**: UI, state, 3D rendering, AI logic, and voice are separate
2. **Unidirectional Data Flow**: State → UI, never UI → State directly
3. **Declarative over Imperative**: R3F components over raw Three.js
4. **Type Safety**: TypeScript strict mode, no `any` types
5. **Performance-First**: Selectors, memoization, material reuse
6. **Browser-Native APIs**: Web Speech API for TTS (no external services)

## Deployment Architecture

### Docker + nginx + Railway

```
┌─────────────────────────────────────────────────┐
│ Railway Cloud (PaaS)                            │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │ nginx:alpine Container                    │  │
│  │ - Port 80 exposed                         │  │
│  │ - Serves /usr/share/nginx/html            │  │
│  │ - SPA routing (try_files)                 │  │
│  │ - Gzip compression                        │  │
│  │ - Asset caching (1 year)                  │  │
│  └───────────────────────────────────────────┘  │
│            ▲                                    │
│            │ Built from                         │
│  ┌─────────┴─────────────────────────────────┐  │
│  │ node:20-alpine Builder (ephemeral)       │  │
│  │ - npm ci (clean install)                 │  │
│  │ - npm run build (tsc + vite)             │  │
│  │ - Outputs /app/dist                       │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │ Auto-detect via railway.json              │  │
│  │ - Builder: NIXPACKS                       │  │
│  │ - Restart: ON_FAILURE (max 10)            │  │
│  │ - Deploy: Git push → auto-build → URL     │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Build Flow

```
Developer
    │
    │ git push
    ▼
Railway GitHub Integration
    │
    │ Detect Dockerfile
    ▼
Build Phase (node:20-alpine)
    ├─ npm ci (install dependencies)
    ├─ npm run build (TypeScript compile + Vite bundle)
    └─ Output: /app/dist/
        ├─ index.html
        ├─ assets/index-[hash].js
        └─ assets/index-[hash].css
    │
    ▼
Deploy Phase (nginx:alpine)
    ├─ COPY /app/dist → /usr/share/nginx/html
    ├─ COPY nginx.conf → /etc/nginx/conf.d/default.conf
    ├─ EXPOSE 80
    └─ CMD nginx -g daemon off
    │
    ▼
Running Container
    ├─ nginx listens on :80
    ├─ Railway provides *.railway.app URL
    └─ Automatic HTTPS (Let's Encrypt)
```

## Future Architectural Changes

### Phase 7+: Real AI Integration
- API client abstraction (axios/fetch wrapper)
- Request/response interceptors
- Streaming response handling
- Error boundary for API failures
- Replace MockResponseEngine with real AI service

### Advanced Voice Features
- Web Speech API SpeechRecognition for voice input
- Voice settings panel (rate, pitch, voice selection)
- Visual audio waveform during speech
- Voice command processing

### Data Persistence
- IndexedDB for chat history storage
- Export/import chat history (JSON/CSV)
- User preferences persistence
- Offline support with Service Worker
