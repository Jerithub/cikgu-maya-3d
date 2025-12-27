# System Architecture

**Last Updated:** 2025-12-27 (Phase 3 Chat Interface)
**Project:** Cikgu Maya 3D
**Version:** 0.0.2

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Component Architecture](#component-architecture)
4. [State Management](#state-management)
5. [3D Rendering Pipeline](#3d-rendering-pipeline)
6. [Data Flow](#data-flow)
7. [Module Dependencies](#module-dependencies)
8. [Performance Considerations](#performance-considerations)

## Architecture Overview

Cikgu Maya 3D follows a **client-side SPA (Single Page Application)** architecture with React as the UI framework and Three.js for 3D rendering. The application is built with **Vite** for fast development and optimized production builds.

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┐         ┌─────────────────┐             │
│  │   React UI     │         │  3D Viewport    │             │
│  │  (Chat Panel)  │◄────────┤  (Three.js)     │             │
│  │                │  State  │                 │             │
│  └────────┬───────┘         │  MayaCharacter  │             │
│           │                 └─────────────────┘             │
│           │                                                    │
│           ▼                                                    │
│  ┌────────────────┐                                           │
│  │ Zustand Store  │                                           │
│  │ (State Mgmt)   │                                           │
│  └────────┬───────┘                                           │
│           │                                                    │
│           ▼                                                    │
│  ┌────────────────┐                                           │
│  │  AI Backend    │ (Future)                                  │
│  │  (HTTP API)    │                                           │
│  └────────────────┘                                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
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

### State Management
- **Zustand 5.0** - Lightweight state management
  - No boilerplate or providers
  - TypeScript-first design
  - Immutable update patterns

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
  - PostCSS integration
  - JIT (Just-In-Time) compiler
  - Design system tokens

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
│   │       └── MayaCharacter
│   │           ├── Head Group
│   │           │   ├── Head Mesh
│   │           │   ├── Hair Mesh
│   │           │   ├── Eyes (Left/Right)
│   │           │   ├── Nose
│   │           │   └── Jaw (animated for talking)
│   │           ├── Body Mesh
│   │           ├── Left Arm Group
│   │           │   ├── Arm Mesh
│   │           │   └── Hand Mesh
│   │           └── Right Arm Group
│   │               ├── Arm Mesh (animated for wave/pointing/thinking)
│   │               └── Hand Mesh
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
  - Connects MayaCharacter to chatStore for animation
- **Dependencies**: MayaCharacter, useChatStore, @react-three/fiber, @react-three/drei

#### **MayaCharacter.tsx**
- **Role**: 3D character with animations
- **Responsibilities**:
  - Procedural character construction
  - Animation state management (idle, talking, wave, nod, thinking, pointing)
  - Blinking effect (every 3-5 seconds)
  - Breathing animation (always active)
  - Audio amplitude sync for talking animation
- **Dependencies**: Three.js, @react-three/fiber
- **Props**: `animation?: AnimationState`, `audioAmplitude?: number`
- **Exports**: `AnimationState` type (union of 6 animations)

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

### Three.js Scene Graph

```
Scene (Implicit in R3F)
└── Canvas
    └── characterRef (Group)
        ├── headGroupRef (Group)
        │   ├── Head Mesh (Sphere)
        │   ├── Hair Mesh (Partial Sphere)
        │   ├── Left Eye (Sphere)
        │   ├── Left Pupil (Sphere, animated blink)
        │   ├── Right Eye (Sphere)
        │   ├── Right Pupil (Sphere, animated blink)
        │   ├── Nose (Sphere)
        │   └── jawRef (Torus, animated)
        ├── Body Mesh (Capsule)
        ├── Left Arm Group (Rotated)
        │   ├── Arm Mesh (Cylinder)
        │   └── Hand Mesh (Sphere)
        ├── Right Arm Group (Rotated)
        │   ├── Arm Mesh (Cylinder, animated)
        │   └── Hand Mesh (Sphere)
        └── Ground Plane (Plane, receives shadow)
```

### Animation System

**Frame Loop** (`useFrame` hook):
```
For each frame (60 FPS target):
  1. Get elapsed time from clock
  2. Apply breathing animation (characterRef.position.y) - ALWAYS ACTIVE
  3. Apply idle head sway (headGroupRef.rotation) - ALWAYS ACTIVE
  4. Switch(animation):
     - 'idle': Reset all body parts to neutral pose
     - 'talking': Animate jaw (jawRef.rotation.x) based on audioAmplitude or simulated wave
     - 'pointing': Extend right arm forward and up (z: -1.8rad, x: -0.5rad)
     - 'wave': Oscillate right arm (z: -2.5rad, x: wave motion at 10rad/s)
     - 'nod': Animate head nod (rotation.x at 15rad/s)
     - 'thinking': Hand to chin pose + head tilt (z: 0.15rad)
  5. Update all transforms using THREE.MathUtils.lerp for smoothness
```

**Blinking System** (`useEffect` hook):
```
Every 3-5 seconds (randomized):
  1. Trigger left eye blink (scale.y = 0.1 for 150ms)
  2. After 50ms, trigger right eye blink
  3. Reset to normal (scale.y = 1.0)
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

### Phase 1: Current Flow (Static)

```
┌─────────────┐
│   Initial   │
│    Load     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ React Mount │
│ (main.tsx)  │
└──────┬──────┘
       │
       ├──► App.tsx renders
       │
       ├──► useChatStore initializes (default state)
       │    - messages: []
       │    - currentAnimation: 'idle'
       │
       ├──► Layout renders
       │    - Viewport3D (50% width)
       │    - ChatPanel (50% width)
       │
       └───► MayaCharacter renders
            - Receives animation='idle' from store
            - Starts animation loop (useFrame)
            - Starts blinking (useEffect)
```

### Phase 2+: Future Flow (Interactive)

```
┌──────────────┐
│ User Types   │
│   Message    │
└──────┬───────┘
       │
       ▼
┌──────────────┐        ┌──────────────┐
│ Chat Input   │───────►│ addMessage() │
│  Component   │        │   (Action)   │
└──────────────┘        └──────┬───────┘
                               │
                               ▼
                        ┌──────────────┐
                        │ Store Update │
                        │              │
                        │ - messages++ │
                        │ - isTyping=  │
                        │    true      │
                        └──────┬───────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                              ▼
         ┌─────────────┐              ┌─────────────┐
         │ Chat Panel  │              │ Maya Char   │
         │ Re-renders  │              │ Animation   │
         │             │              │ Unchanged   │
         └─────────────┘              └─────────────┘
                │
                ▼
         ┌──────────────┐
         │ Send to API  │ (Future)
         └──────┬───────┘
                │
                ▼
         ┌──────────────┐
         │ AI Response  │
         └──────┬───────┘
                │
                ▼
         ┌──────────────┐
         │ setAnimation │
         │ setEmotion   │
         └──────┬───────┘
                │
                ▼
         ┌──────────────┐
         │ Maya Char    │
         │ Animation    │
         │ Changes      │
         └──────────────┘
```

## Module Dependencies

### Dependency Graph (Phase 3)

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
       │         │    └─► useChatStore
       │         ├─► MessageList
       │         │    ├─► MessageBubble
       │         │    ├─► TypingIndicator
       │         │    └─► useChatStore
       │         ├─► SuggestedPrompts
       │         └─► ChatInput
       │              └─► lucide-react (Send icon)
       └─► index.css
            └─► Tailwind directives

chatStore.ts
  ├─► message.ts (types)
  └─► zustand

message.ts (types)
  └─► No dependencies

lucide-react
  └─► Icons (Send, Settings)
```

### Import Rules

**RULE**: Follow dependency inversion principle
- UI components should not import from other UI components directly
- Shared types should be in `types/` directory
- Store should not import components (one-way data flow)
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

**Current Status**: Phase 1.5 (Code splitting configured)
- React Vendor: React + ReactDOM (~42KB gzipped)
- Three Vendor: three + @react-three/fiber + @react-three/drei (~600KB gzipped)
- State Vendor: zustand (~1KB gzipped)
- **Total**: ~643KB gzipped (split into 3 chunks)

**Implemented Optimizations**:
- Manual chunks configured in vite.config.ts
- Vendor separation (react, three, state)
- Path aliases for clean imports

**Future Optimizations**:
- Code splitting for chat panel (lazy load)
- Dynamic imports for 3D assets
- Tree shaking for unused Three.js modules

### Performance Targets

| Metric | Target | Phase 1.5 Status |
|--------|--------|------------------|
| Initial Load | < 3s | ✅ ~1.5s (local) |
| 3D FPS | 60 FPS | ✅ 60 FPS (tested) |
| Re-render Time | < 16ms | ✅ < 5ms (simple) |
| Bundle Size | < 1MB | ✅ ~643KB (split) |

---

## Architecture Principles

1. **Separation of Concerns**: UI, state, and 3D rendering are separate
2. **Unidirectional Data Flow**: State → UI, never UI → State directly
3. **Declarative over Imperative**: R3F components over raw Three.js
4. **Type Safety**: TypeScript strict mode, no `any` types
5. **Performance-First**: Selectors, memoization, material reuse

## Future Architectural Changes

### Phase 2: Chat System
- Message list virtualization (react-window)
- Message pagination for long conversations
- Input debouncing for validation

### Phase 3: AI Integration
- API client abstraction (axios/fetch wrapper)
- Request/response interceptors
- Streaming response handling
- Error boundary for API failures

### Phase 4: Advanced Features
- Web Audio API for TTS
- Web Speech API for voice input
- IndexedDB for chat history persistence
- Service Worker for offline support
