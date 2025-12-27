# Code Standards & Conventions

**Last Updated:** 2025-12-27 (Phase 3 Chat Interface)
**Project:** Cikgu Maya 3D

## Table of Contents
1. [TypeScript Standards](#typescript-standards)
2. [React Component Standards](#react-component-standards)
3. [3D Graphics Standards](#3d-graphics-standards)
4. [State Management Standards](#state-management-standards)
5. [Styling Standards](#styling-standards)
6. [File Organization](#file-organization)
7. [Naming Conventions](#naming-conventions)
8. [Code Quality](#code-quality)

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

## Enforcement

These standards are **MANDATORY** for all contributions. Code reviews will check compliance with these standards. Exceptions require team discussion and documentation.
