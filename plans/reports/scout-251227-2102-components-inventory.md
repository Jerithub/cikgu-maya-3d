# Components Inventory Report

**Date:** 2025-12-27  
**Directory:** src/components  
**Purpose:** Documentation update - complete component catalog

---

## Directory Structure

```
src/components/
├── 3d/
│   ├── Scene.tsx
│   ├── Viewport3D.tsx
│   └── MayaCharacter.tsx
├── chat/
│   ├── ChatPanel.tsx
│   ├── ChatHeader.tsx
│   ├── MessageList.tsx
│   ├── MessageBubble.tsx
│   ├── ChatInput.tsx
│   ├── TypingIndicator.tsx
│   └── SuggestedPrompts.tsx
├── layout/
│   └── Layout.tsx
├── ui/
│   └── StatusBadge.tsx
└── voice/
    └── (empty - placeholder for future)
```

**Total Components:** 12 files across 5 directories

---

## Component Files and Details

### Layout Component

**D:\Projects\cikgu-maya-3d\src\components\layout\Layout.tsx**  
- Props: `children: [ReactNode, ReactNode]` (tuple of [viewport, chat])
- Splits screen 50/50 viewport (left) and chat panel (right)
- Responsive: stacks vertically on mobile, horizontal on desktop
- Enforces exactly 2 children pattern via TypeScript

### 3D Components

**D:\Projects\cikgu-maya-3d\src\components\3d\Viewport3D.tsx**  
- No props
- Container wrapper for Scene component
- Full-height positioning container

**D:\Projects\cikgu-maya-3d\src\components\3d\Scene.tsx**  
- No props (uses Zustand store)
- State: `animation`, `isSpeaking` from chatStore
- R3F Canvas with shadows, antialiasing, alpha
- 3-point lighting: ambient + directional + point lights
- Environment map (city preset)
- MayaCharacter, ground plane, OrbitControls
- Camera: position [0, 1.5, 4], FOV 50, distance 2-6

**D:\Projects\cikgu-maya-3d\src\components\3d\MayaCharacter.tsx**  
- Exports: `AnimationState` type, `MayaCharacterProps` interface
- Props: `animation?: AnimationState`, `audioAmplitude?: number`
- Character: head (with blinking eyes, jaw), body, two arms
- Animations: idle (breathing), talking (jaw sync), wave, nod, thinking, pointing
- Materials: skin #f4c2a8, clothing #4a90e2, hair #2c1810
- ~360 lines of procedural mesh + animation code

### Chat Components

**D:\Projects\cikgu-maya-3d\src\components\chat\ChatPanel.tsx**  
- No props (internal state + store)
- State: `suggestedPrompts` array
- Orchestrates: ChatHeader, MessageList, SuggestedPrompts, ChatInput
- Handlers: `handleSendMessage`, `handleSelectPrompt`
- Current: Echo responses with 1s delay (TODO: Phase 4 MockResponseEngine)

**D:\Projects\cikgu-maya-3d\src\components\chat\ChatHeader.tsx**  
- State from store: `isTyping`, `isSpeaking`, `voiceEnabled`, `toggleVoice`
- UI: Avatar with emoji, "Cikgu Maya" heading, StatusBadge
- Controls: Voice toggle (Volume2/VolumeX icons), Settings button
- Status logic: speaking > thinking > ready

**D:\Projects\cikgu-maya-3d\src\components\chat\MessageList.tsx**  
- State from store: `messages`, `isTyping`
- Ref: `scrollRef` for auto-scroll
- Features: Auto-scroll, welcome state, MessageBubble array, TypingIndicator
- Welcome: Wave emoji circle + heading + subtitle

**D:\Projects\cikgu-maya-3d\src\components\chat\MessageBubble.tsx**  
- Props: `message: Message` (from @/types/message)
- Styling: User (primary, right), Assistant (gray, left)
- Max width 80%, preserves whitespace, timestamp display
- Expected Message type has: id, role, content, timestamp, emotion?, animation?

**D:\Projects\cikgu-maya-3d\src\components\chat\ChatInput.tsx**  
- Props: `onSend: (message: string) => void`, `disabled?: boolean`
- State: `input` string
- Constants: MAX_CHARACTERS = 500
- Features: Character counter (warns 90%, error 100%), Enter to send, Shift+Enter newline
- Validation: Trims whitespace, enforces max length

**D:\Projects\cikgu-maya-3d\src\components\chat\TypingIndicator.tsx**  
- No props
- Visual: Three bouncing dots with staggered animation delays
- Text: "Maya is typing..."
- Left-aligned assistant style

**D:\Projects\cikgu-maya-3d\src\components\chat\SuggestedPrompts.tsx**  
- Props: `prompts: string[]`, `onSelectPrompt: (prompt: string) => void`
- Behavior: Returns null if no prompts
- UI: "Suggested:" label + horizontal scrollable pill buttons
- Default prompts in ChatPanel: "Who needs my attention?", "How is Form 4S1 doing?", "Show at-risk students"

### UI Components

**D:\Projects\cikgu-maya-3d\src\components\ui\StatusBadge.tsx**  
- Props: `status: 'ready' | 'thinking' | 'speaking'`
- Status config: ready (green), thinking (yellow pulse), speaking (blue pulse)
- Visual: Pill-shaped, colored dot (2x2) + label, white text

### Voice Components (Placeholder)

**D:\Projects\cikgu-maya-3d\src\components\voice\**  
- Empty directory - placeholder for future voice features

---

## Component Hierarchy

```
App (not in components/)
└── Layout
    ├── Viewport3D
    │   └── Scene
    │       ├── Lighting (ambient, directional, point)
    │       ├── Environment
    │       ├── MayaCharacter
    │       ├── Ground
    │       └── OrbitControls
    └── ChatPanel
        ├── ChatHeader
        │   ├── StatusBadge
        │   └── Controls (voice, settings)
        ├── MessageList
        │   ├── Welcome State (conditional)
        │   ├── MessageBubble[] (mapped)
        │   └── TypingIndicator (conditional)
        ├── SuggestedPrompts (conditional)
        └── ChatInput
```

---

## Key Interfaces Summary

| Component | Interface/Type | File |
|-----------|---------------|------|
| MayaCharacter | AnimationState | 3d/MayaCharacter.tsx |
| MayaCharacter | MayaCharacterProps | 3d/MayaCharacter.tsx |
| Layout | LayoutProps | layout/Layout.tsx |
| StatusBadge | Status | ui/StatusBadge.tsx |
| StatusBadge | StatusBadgeProps | ui/StatusBadge.tsx |
| MessageBubble | MessageBubbleProps | chat/MessageBubble.tsx |
| ChatInput | ChatInputProps | chat/ChatInput.tsx |
| SuggestedPrompts | SuggestedPromptsProps | chat/SuggestedPrompts.tsx |

---

## Store Dependencies

**Zustand Store:** src/store/chatStore.ts

**State Used by Components:**
- `messages` - MessageList
- `isTyping` - ChatHeader, MessageList
- `isSpeaking` - ChatHeader
- `voiceEnabled` - ChatHeader
- `currentAnimation` - Scene, MayaCharacter
- `addMessage()` - ChatPanel
- `setTyping()` - ChatPanel
- `toggleVoice()` - ChatHeader

---

## External Dependencies

| Package | Components Using It |
|---------|---------------------|
| @react-three/fiber | Scene, MayaCharacter |
| @react-three/drei | Scene |
| three | MayaCharacter |
| lucide-react | ChatHeader, ChatInput |
| zustand | ChatPanel, ChatHeader, MessageList, Scene |

---

## Component Patterns

1. **Container/Presentational Split:** Containers (ChatPanel, Scene, Layout) vs Presentational (most chat components)
2. **Composition Over Props:** ChatPanel composes children, Layout expects tuple of children
3. **State Management:** Zustand for global state, useState for local component state
4. **Type Safety:** All props have TypeScript interfaces, exported types where reusable
5. **Styling:** Tailwind utility classes, custom CSS variables (maya-primary, maya-bg-gray, etc.), responsive design (mobile-first)

---

## Unresolved Questions

None identified - component structure is clear and self-documenting.

---

**Report Generated:** 2025-12-27  
**Scout ID:** aeb8f8a
