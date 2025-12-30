# Code Standards & Conventions

**Last Updated:** 2025-12-29 (VRM Integration Complete)
**Project:** Cikgu Maya 3D

## Table of Contents
1. [TypeScript Standards](#typescript-standards)
2. [React Component Standards](#react-component-standards)
3. [3D Graphics Standards](#3d-graphics-standards)
4. [VRM Integration Standards](#vrm-integration-standards)
5. [State Management Standards](#state-management-standards)
6. [Styling Standards](#styling-standards)
7. [File Organization](#file-organization)
8. [Naming Conventions](#naming-conventions)
9. [Code Quality](#code-quality)
10. [Voice Integration Standards](#voice-integration-standards)
11. [AI Integration Standards](#ai-integration-standards)

## TypeScript Standards

### Strict Mode
**RULE**: TypeScript strict mode is **MANDATORY**

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Type Definitions

**RULE**: Define types in dedicated `types/` directory

```typescript
// ✅ GOOD: Separate type file
// src/types/message.ts
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  emotion?: EmotionType
}

export type EmotionType = 'neutral' | 'happy' | 'concerned' | 'thinking'

// ❌ BAD: Inline types in component files
// src/components/Chat.tsx
interface Message {
  id: string
  // ...
}
```

### Type Imports

**RULE**: Use `type` keyword for type-only imports

```typescript
// ✅ GOOD
import type { Message } from '../types/message'
import { useState } from 'react'

// ❌ BAD
import { Message } from '../types/message'
```

### Interface vs Type

**RULE**: Use `interface` for object shapes, `type` for unions/aliases

```typescript
// ✅ GOOD: Interface for object
interface User {
  id: string
  name: string
}

// ✅ GOOD: Type for union
type Role = 'admin' | 'user' | 'guest'

// ✅ GOOD: Type for mapped types
type PartialUser = Partial<User>

// ❌ BAD: Type for simple object
type User = {
  id: string
  name: string
}
```

## React Component Standards

### Component Structure

**RULE**: Use functional components with hooks (no classes)

```typescript
// ✅ GOOD: Functional component
export function MayaCharacter({ animation }: MayaCharacterProps) {
  const ref = useRef<THREE.Group>(null)
  const [state, setState] = useState(false)

  useEffect(() => {
    // effect logic
  }, [])

  return <group ref={ref} />
}

// ❌ BAD: Class component
export class MayaCharacter extends Component<Props, State> {
  // ...
}
```

### Props Definition

**RULE**: Define props interfaces before component, export for reuse

```typescript
// ✅ GOOD: Exported props interface
export interface MayaCharacterProps {
  animation?: AnimationState
  audioAmplitude?: number
}

export function MayaCharacter({ animation = 'idle' }: MayaCharacterProps) {
  // ...
}

// ❌ BAD: Inline props type
export function MayaCharacter({ animation }: { animation: string }) {
  // ...
}
```

### Component Organization

**RULE**: Organize components in logical order

```typescript
export function ComponentName(props: ComponentProps) {
  // 1. Refs
  const ref = useRef<HTMLDivElement>(null)

  // 2. State
  const [state, setState] = useState(false)

  // 3. Hooks (useEffect, useLayoutEffect)
  useEffect(() => { /* ... */ }, [])

  // 4. Derived values / memoized values
  const computedValue = useMemo(() => { /* ... */ }, [deps])

  // 5. Event handlers
  const handleClick = useCallback(() => { /* ... */ }, [deps])

  // 6. Render helpers (sub-components defined here if needed)
  function SubComponent() { /* ... */ }

  // 7. Return JSX
  return <div>...</div>
}
```

### Fragments

**RULE**: Use Fragment shorthand `<>...</>` unless keys needed

```typescript
// ✅ GOOD: Fragment shorthand
export function List({ items }: ListProps) {
  return (
    <>
      <h1>Title</h1>
      {items.map(item => <Item key={item.id} {...item} />)}
    </>
  )
}

// ✅ GOOD: Fragment with key
{items.map(item => (
  <Fragment key={item.id}>
    <Title>{item.name}</Title>
    <Body>{item.content}</Body>
  </Fragment>
))}

// ❌ BAD: Unnecessary wrapper divs
return (
  <div>
    <h1>Title</h1>
    {/* ... */}
  </div>
)
```

## 3D Graphics Standards

### Three.js + React Three Fiber

**RULE**: Use R3F components, avoid imperative Three.js when possible

```typescript
// ✅ GOOD: Declarative R3F components
<mesh ref={ref} position={[0, 0, 0]} castShadow>
  <sphereGeometry args={[0.5, 32, 32]} />
  <meshStandardMaterial color="#4A90E2" />
</mesh>

// ❌ BAD: Imperative Three.js
const geometry = new THREE.SphereGeometry(0.5, 32, 32)
const material = new THREE.MeshStandardMaterial({ color: '#4A90E2' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
```

### Animation Loop

**RULE**: Use `useFrame` hook for animations, avoid external requestAnimationFrame

```typescript
// ✅ GOOD: useFrame hook
useFrame((state) => {
  const time = state.clock.elapsedTime
  if (ref.current) {
    ref.current.position.y = Math.sin(time * 2) * 0.1
  }
})

// ❌ BAD: Manual requestAnimationFrame
useEffect(() => {
  let rafId: number
  const animate = () => {
    // animation logic
    rafId = requestAnimationFrame(animate)
  }
  animate()
  return () => cancelAnimationFrame(rafId)
}, [])
```

### Material Reuse

**RULE**: Create material variables to avoid recreation

```typescript
// ✅ GOOD: Reusable materials
const skinMaterial = (
  <meshStandardMaterial color="#f4c2a8" metalness={0.1} roughness={0.8} />
)

return (
  <group>
    <mesh>{skinMaterial}</mesh>
    <mesh>{skinMaterial}</mesh>
  </group>
)

// ❌ BAD: Duplicate material definitions
<mesh>
  <meshStandardMaterial color="#f4c2a8" metalness={0.1} roughness={0.8} />
</mesh>
<mesh>
  <meshStandardMaterial color="#f4c2a8" metalness={0.1} roughness={0.8} />
</mesh>
```

### Ref Types

**RULE**: Use correct Three.js ref types with null assertion

```typescript
// ✅ GOOD: Properly typed ref
const ref = useRef<THREE.Group>(null!)
const meshRef = useRef<THREE.Mesh>(null!)
const lightRef = useRef<THREE.DirectionalLight>(null!)

// ✅ GOOD: Nullable ref with check
const ref = useRef<THREE.Group>(null | undefined)
if (ref.current) {
  ref.current.position.y = 1
}

// ❌ BAD: Untyped ref
const ref = useRef() // any type
```

## VRM Integration Standards

### VRM Loading

**RULE**: Use GLTFLoader with VRMLoaderPlugin, handle errors gracefully

```typescript
// ✅ GOOD: VRM loading with error handling
const loader = new GLTFLoader()
loader.register((parser: any) => new VRMLoaderPlugin(parser))

loader.load(
  '/Maya.vrm',
  (gltf: GLTF) => {
    const vrm = gltf.userData.vrm as VRM | undefined
    if (!vrm) {
      setError('No VRM data found in file')
      return
    }

    // Clean up previous VRM
    if (vrmRef.current) {
      vrmRef.current.scene.removeFromParent()
    }

    VRMUtils.removeUnnecessaryVertices(gltf.scene)
    VRMUtils.removeUnnecessaryJoints(gltf.scene)

    vrmRef.current = vrm
    vrm.scene.rotation.y = Math.PI // VRoid models face backward
    vrm.scene.position.y = 0

    // Cache bone references
    headBoneRef.current = vrm.humanoid.getNormalizedBoneNode('head')
    jawBoneRef.current = vrm.humanoid.getNormalizedBoneNode('jaw')
    // ...

    setVrmLoaded(true)
  },
  undefined,
  (err: unknown) => {
    console.error('Error loading VRM:', err)
    setError('Failed to load VRM file')
  }
)
```

### VRM Update Loop

**RULE**: Call vrm.update(delta) every frame for animation to work

```typescript
// ✅ GOOD: VRM update in useFrame
useFrame((state, delta) => {
  if (!vrmRef.current || !vrmLoaded) return

  // Apply animations to bones...
  if (headBoneRef.current) {
    headBoneRef.current.rotation.x = Math.sin(time * 15) * 0.25
  }

  // CRITICAL: Update VRM every frame
  vrmRef.current.update(delta)
})
```

### Bone Animation

**RULE**: Cache bone references on load, use lerp for smooth transitions

```typescript
// ✅ GOOD: Cached bone references
const headBoneRef = useRef<THREE.Object3D | null>(null)
const jawBoneRef = useRef<THREE.Object3D | null>(null)

useEffect(() => {
  // ... load VRM
  headBoneRef.current = vrm.humanoid.getNormalizedBoneNode('head')
  jawBoneRef.current = vrm.humanoid.getNormalizedBoneNode('jaw')
}, [])

// Smooth animation with lerp
if (jawBoneRef.current) {
  jawBoneRef.current.rotation.x = THREE.MathUtils.lerp(
    jawBoneRef.current.rotation.x,
    targetRotation,
    0.3
  )
}
```

### VRM File Management

**RULE**: Store VRM files in public/ folder, reference with absolute path

```typescript
// ✅ GOOD: Public folder path
loader.load('/Maya.vrm', onSuccess, onProgress, onError)

// ❌ BAD: Relative path or src import
loader.load('../assets/Maya.vrm', ...) // Won't work in production
import mayaVrm from '../assets/Maya.vrm' // Don't bundle VRM files
```

### Cleanup

**RULE**: Remove VRM from scene on unmount

```typescript
useEffect(() => {
  // Load VRM...

  return () => {
    if (vrmRef.current) {
      vrmRef.current.scene.removeFromParent()
    }
  }
}, [])
```

## State Management Standards

### Zustand Store

**RULE**: Organize store into state, actions, selectors

```typescript
// ✅ GOOD: Well-organized store
interface ChatState {
  // State
  messages: Message[]
  isTyping: boolean

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (isTyping: boolean) => void
}

export const useChatStore = create<ChatState>((set) => ({
  // Initial state
  messages: [],
  isTyping: false,

  // Actions
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }]
  })),
  setTyping: (isTyping) => set({ isTyping })
}))

// ❌ BAD: Disorganized store
export const useStore = create((set) => ({
  messages: [],
  add: (m) => set((s) => ({ messages: [...s.messages, m] }))
}))
```

### Store Selectors

**RULE**: Use selectors for optimal re-render performance

```typescript
// ✅ GOOD: Selector prevents unnecessary re-renders
const messages = useChatStore((state) => state.messages)
const addMessage = useChatStore((state) => state.addMessage)

// ✅ GOOD: Shallow selector for multiple values
const { messages, isTyping } = useChatStore(
  (state) => ({ messages: state.messages, isTyping: state.isTyping }),
  shallow
)

// ❌ BAD: Entire store causes re-render on any change
const state = useChatStore()
```

## Styling Standards

### Tailwind CSS

**RULE**: Use Tailwind utility classes, avoid custom CSS

```typescript
// ✅ GOOD: Tailwind utilities
<div className="flex flex-col lg:flex-row h-screen bg-maya-bg-light">

// ❌ BAD: Inline styles or custom CSS
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
```

### Design Tokens

**RULE**: Use Maya design system colors, not arbitrary values

```typescript
// ✅ GOOD: Design system colors
<button className="bg-maya-primary text-white hover:bg-maya-primary-dark">

// ❌ BAD: Arbitrary colors
<button className="bg-[#4A90E2] text-white hover:bg-[#2E6AB8]">
```

### Responsive Design

**RULE**: Mobile-first approach with Tailwind breakpoints

```typescript
// ✅ GOOD: Mobile-first
<div className="w-full lg:w-1/2"> {/* Full on mobile, 50% on lg */}
<p className="text-sm lg:text-base"> {/* Small on mobile, base on lg */}

// ❌ BAD: Desktop-first
<div className="w-1/2 lg:w-full"> {/* Breaks on small screens */}
```

## File Organization

### Directory Structure

**RULE**: Organize by feature, not by file type

```
src/
├── components/
│   ├── 3d/          # 3D-specific components
│   │   ├── MayaCharacter.tsx
│   │   ├── Scene.tsx
│   │   └── Viewport3D.tsx
│   ├── layout/      # Layout components
│   │   └── Layout.tsx
│   ├── ui/          # Reusable UI components
│   │   └── StatusBadge.tsx
│   └── chat/        # Chat-specific components
│       ├── ChatPanel.tsx
│       ├── ChatHeader.tsx
│       ├── MessageList.tsx
│       ├── MessageBubble.tsx
│       ├── ChatInput.tsx
│       ├── SuggestedPrompts.tsx
│       └── TypingIndicator.tsx
├── store/           # State management
├── types/           # Type definitions
├── utils/           # Utility functions (future)
├── hooks/           # Custom hooks (future)
├── App.tsx          # Root component
└── main.tsx         # Entry point
```

### File Naming

**RULE**: Use PascalCase for components, camelCase for utilities

```
✅ GOOD:
MayaCharacter.tsx
Layout.tsx
chatStore.ts
message.ts
useAnimation.ts

❌ BAD:
mayaCharacter.tsx
layout.tsx
ChatStore.ts
message-types.ts
```

### Index Files

**RULE**: Use index files for cleaner imports (when needed)

```typescript
// components/3d/index.ts
export { MayaCharacter } from './MayaCharacter'

// Usage
import { MayaCharacter } from '@/components/3d'
```

## Naming Conventions

### Components

**RULE**: PascalCase for components

```typescript
// ✅ GOOD
export function MayaCharacter() { }
export const Layout = () => { }

// ❌ BAD
export function mayaCharacter() { }
export const layout = () => { }
```

### Functions/Variables

**RULE**: camelCase for functions and variables

```typescript
// ✅ GOOD
const handleButtonClick = () => { }
const messageCount = messages.length

// ❌ BAD
const HandleButtonClick = () => { }
const message_count = messages.length
```

### Constants

**RULE**: UPPER_SNAKE_CASE for constants

```typescript
// ✅ GOOD
const MAX_MESSAGE_LENGTH = 500
const API_BASE_URL = 'https://api.example.com'

// ❌ BAD
const maxMessageLength = 500
const api_base_url = 'https://api.example.com'
```

### Enums/Types

**RULE**: PascalCase for types, camelCase for enum values

```typescript
// ✅ GOOD: Type alias
type AnimationState = 'idle' | 'talking' | 'wave'

// ✅ GOOD: Enum
enum Emotion {
  neutral = 'neutral',
  happy = 'happy'
}

// ❌ BAD: Inconsistent casing
type animationState = 'idle'
```

## Code Quality

### Linting

**RULE**: Project must pass ESLint without warnings

```bash
npm run lint  # Configure in package.json
```

### Formatting

**RULE**: Use Prettier for consistent formatting

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Comments

**RULE**: JSDoc for exported functions, inline comments for complex logic

```typescript
// ✅ GOOD: JSDoc for exported function
/**
 Adds a new message to the chat store.
 Automatically generates id and timestamp.
 @param message - Message object without id and timestamp
 */
export function addMessage(message: Omit<Message, 'id' | 'timestamp'>) {
  // ...
}

// ✅ GOOD: Inline comment for complex logic
// Calculate wave amplitude for jaw movement
// Range: 0-1 (closed to open)
const wave = (Math.sin(time * 10) + 1) / 2

// ❌ BAD: Obvious comments
// Set the state
setState(true)
```

### Error Handling

**RULE**: Proper error boundaries and try-catch

```typescript
// ✅ GOOD: Error boundary
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>

// ✅ GOOD: Try-catch for async operations
const sendMessage = async () => {
  try {
    await api.sendMessage(message)
  } catch (error) {
    console.error('Failed to send message:', error)
    showErrorToast('Failed to send message')
  }
}
```

---

## Voice Integration Standards

### Web Speech API

**RULE**: Use Web Speech API for TTS, avoid external TTS services

```typescript
// ✅ GOOD: Web Speech API implementation
const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 0.9
  utterance.pitch = 1.1
  utterance.lang = 'en-MY'

  // Try Malaysian English, fallback to any English
  const voices = window.speechSynthesis.getVoices()
  const malaysianVoice = voices.find((v) => v.lang === 'en-MY')
  const englishVoice = voices.find((v) => v.lang.startsWith('en-'))

  if (malaysianVoice) {
    utterance.voice = malaysianVoice
  } else if (englishVoice) {
    utterance.voice = englishVoice
  }

  utterance.onstart = () => set({ isSpeaking: true })
  utterance.onend = () => set({ isSpeaking: false })
  utterance.onerror = () => set({ isSpeaking: false })

  window.speechSynthesis.speak(utterance)
}

// ❌ BAD: External TTS service (adds cost, latency)
const speak = async (text: string) => {
  const response = await fetch('/api/tts', { method: 'POST', body: JSON.stringify({ text }) })
  const audio = await response.blob()
  // Play audio...
}
```

### Voice State Management

**RULE**: Track voice state in Zustand store, sync with animations

```typescript
// ✅ GOOD: Voice state in store
interface ChatState {
  voiceEnabled: boolean
  isSpeaking: boolean

  toggleVoice: () => void
  speak: (text: string) => void
  stopSpeaking: () => void
}

// Sync with character animation
speak: (text) => {
  if (!voiceEnabled) return

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.onstart = () => set({ isSpeaking: true, currentAnimation: 'talking' })
  utterance.onend = () => set({ isSpeaking: false, currentAnimation: 'idle' })
  utterance.onerror = () => set({ isSpeaking: false, currentAnimation: 'idle' })

  window.speechSynthesis.speak(utterance)
}
```

### Voice Toggle UI

**RULE**: Provide clear visual feedback for voice state

```typescript
// ✅ GOOD: Voice toggle with icon feedback
<button
  onClick={toggleVoice}
  className={`p-2 rounded-lg transition-colors ${
    voiceEnabled
      ? 'bg-maya-primary/10 text-maya-primary hover:bg-maya-primary/20'
      : 'bg-maya-bg-gray text-maya-text-muted hover:bg-maya-bg-gray/80'
  }`}
  aria-label={voiceEnabled ? 'Mute voice' : 'Enable voice'}
>
  {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
</button>
```

---

## AI Integration Standards

### Response Engine Pattern

**RULE**: Separate AI logic from UI components

```typescript
// ✅ GOOD: Dedicated response engine class
export class MockResponseEngine {
  getResponse(userMessage: string): {
    text: string
    emotion: EmotionType
    animation: AnimationType
    followUpPrompts: string[]
  } {
    // Logic here...
  }
}

// ❌ BAD: AI logic mixed with component
export function ChatPanel() {
  const handleSend = (msg) => {
    if (msg.includes('hello')) {
      setEmotion('happy')
      setAnimation('wave')
      // ... mixed concerns
    }
  }
}
```

### Custom Hook Pattern

**RULE**: Use custom hooks to orchestrate AI + UI flow

```typescript
// ✅ GOOD: useChat hook orchestrates entire flow
export function useChat() {
  const store = useChatStore()

  const sendMessage = async (content: string) => {
    // 1. Add user message
    store.addMessage({ role: 'user', content })

    // 2. Show typing indicator
    store.setTyping(true)

    // 3. Simulate thinking delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500))

    // 4. Get AI response
    const { text, emotion, animation, followUpPrompts } = responseEngine.getResponse(content)

    // 5. Add assistant message
    store.addMessage({ role: 'assistant', content: text, emotion, animation })

    // 6. Update character state
    store.setEmotion(emotion)
    store.setAnimation(animation)

    // 7. Hide typing indicator
    store.setTyping(false)

    // 8. Speak response
    store.speak(text)

    // 9. Return animation to idle after duration
    if (animation !== 'idle' && animation !== 'talking') {
      setTimeout(() => {
        if (!store.isSpeaking) store.setAnimation('idle')
      }, ANIMATION_DURATIONS[animation] ?? 2000)
    }

    return followUpPrompts
  }

  return { messages: store.messages, isTyping: store.isTyping, sendMessage }
}
```

### Response Database

**RULE**: Use structured response templates with metadata

```typescript
// ✅ GOOD: Structured response database
export interface ResponseTemplate {
  triggers: string[]           // Keywords to match
  responses: string[]          // Random response options
  emotion: EmotionType         // Character emotion
  animation: AnimationType     // Character animation
  followUpPrompts?: string[]   // Suggested next prompts
}

export const RESPONSE_DATABASE: Record<string, ResponseTemplate> = {
  greetings: {
    triggers: ['hello', 'hi', 'selamat'],
    responses: ['Selamat pagi! 👋', 'Hello! Great to see you.'],
    emotion: 'happy',
    animation: 'wave',
    followUpPrompts: ['Who needs my attention?', 'How is Form 4S1?'],
  },
  // ...
}
```

### Animation Timing

**RULE**: Define animation durations, auto-return to idle

```typescript
// ✅ GOOD: Duration constants with auto-reset
const ANIMATION_DURATIONS: Record<AnimationType, number> = {
  idle: 0,
  talking: 0,
  wave: 2000,
  nod: 1500,
  thinking: 3000,
  pointing: 2000,
}

// Auto-reset after animation
if (animation !== 'idle' && animation !== 'talking') {
  const duration = ANIMATION_DURATIONS[animation] ?? 2000
  setTimeout(() => {
    if (!store.isSpeaking) {
      store.setAnimation('idle')
    }
  }, duration)
}
```

---

## Enforcement

These standards are **MANDATORY** for all contributions. Code reviews will check compliance with these standards. Exceptions require team discussion and documentation.
