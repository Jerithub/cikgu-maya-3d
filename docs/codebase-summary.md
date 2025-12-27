# Codebase Summary

**Last Updated:** 2025-12-27
**Version:** 0.0.2
**Status:** Phase 3 - Chat Interface Complete

## Project Overview

Cikgu Maya 3D is an interactive educational assistant featuring a 3D animated character built with React Three Fiber, Zustand state management, and Tailwind CSS.

## Technology Stack

### Core Framework
- **React 18.3.1** - UI framework
- **TypeScript 5.7.2** - Type safety
- **Vite 6.0.5** - Build tool and dev server

### 3D Graphics
- **Three.js 0.170.0** - 3D rendering engine
- **@react-three/fiber 8.17.10** - React renderer for Three.js
- **@react-three/drei 9.117.3** - Useful helpers for R3F

### State Management
- **Zustand 5.0.9** - Lightweight state management

### Styling
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **@tailwindcss/postcss 4.1.18** - PostCSS integration for Tailwind v4
- **PostCSS 8.5.6** - CSS transformation

### Icons
- **lucide-react 0.562.0** - Icon library (Send, Settings)

## Project Structure

```
cikgu-maya-3d/
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── MayaCharacter.tsx    # 3D character component with 6 animations
│   │   │   ├── Scene.tsx            # Three.js Canvas with lighting & controls
│   │   │   └── Viewport3D.tsx       # Scene wrapper component
│   │   ├── chat/
│   │   │   ├── ChatPanel.tsx        # Main chat interface container
│   │   │   ├── ChatHeader.tsx       # Header with avatar and status
│   │   │   ├── MessageList.tsx      # Scrollable message container
│   │   │   ├── MessageBubble.tsx    # Individual message display
│   │   │   ├── ChatInput.tsx        # Message input with validation
│   │   │   ├── SuggestedPrompts.tsx # Quick action prompt chips
│   │   │   └── TypingIndicator.tsx  # Animated typing indicator
│   │   ├── layout/
│   │   │   └── Layout.tsx           # Responsive split layout
│   │   └── ui/
│   │       └── StatusBadge.tsx      # Visual status indicator
│   ├── store/
│   │   └── chatStore.ts             # Zustand store for chat state
│   ├── types/
│   │   └── message.ts               # TypeScript interfaces (includes 'pointing')
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Global styles with Tailwind
│   └── vite-env.d.ts                # Vite TypeScript declarations
├── docs/                            # Documentation
├── plans/                           # Project plans
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript config with path aliases
└── vite.config.ts                   # Vite config with code splitting
```

## Core Components

### Scene (src/components/3d/Scene.tsx)
Three.js Canvas wrapper with complete 3D environment:
- **Canvas Setup**: R3F Canvas with shadows, antialiasing, alpha transparency
- **Three-Point Lighting**: Ambient (0.6), Directional with shadows (1.0), Point (0.4)
- **Environment**: City preset for realistic reflections
- **OrbitControls**: Camera interaction with constrained polar angles and distance
- **Ground Plane**: Shadow-receiving surface
- **Character Integration**: MayaCharacter with animation and audio amplitude sync

**Configuration:**
- Camera position: [0, 1.5, 4], FOV: 50
- Shadow map size: 1024x1024
- Min/max distance: 2-6 units
- Target: [0, 1.2, 0]

### Viewport3D (src/components/3d/Viewport3D.tsx)
Scene wrapper component:
- **Responsibility**: Clean separation of Scene from layout
- **Styling**: Full width/height container
- **Pattern**: Wrapper component for future extensibility

### MayaCharacter (src/components/3d/MayaCharacter.tsx)
3D animated character with the following features:
- **6 Animation States**: idle, talking, wave, nod, thinking, pointing
- **Procedural Animation**: Uses Three.js useFrame hook for smooth animations
- **Automatic Blinking**: Random eye blinks every 3-5 seconds
- **Breathing Effect**: Subtle vertical movement
- **Audio Sync**: Jaw movement synced to audio amplitude during talking
- **Modular Materials**: Reusable skin, clothing, and dark materials

**Animation States:**
- `idle` - Default state with breathing and head sway
- `talking` - Jaw movement synchronized to audio amplitude (or simulated wave)
- `pointing` - Right arm extended forward and up (-1.8rad z-rotation, -0.5rad x-rotation)
- `wave` - Right arm wave gesture with oscillating motion
- `nod` - Head nodding motion (15rad speed)
- `thinking` - Hand to chin pose with head tilt (0.15rad z-rotation)

**Key Refs:**
- `characterRef` - Main character group (position)
- `headGroupRef` - Head group (rotation)
- `jawRef` - Jaw mesh (talking animation)
- `armLeftRef`, `armRightRef` - Arm meshes (gestures)

### Layout (src/components/layout/Layout.tsx)
Responsive split-screen layout:
- **Desktop**: Side-by-side (50/50 split)
- **Mobile**: Stacked (3D viewport top, chat panel bottom)
- **Flexbox-based**: Uses Tailwind utilities
- **Children Pattern**: Expects exactly 2 children [viewport, chat]

### ChatPanel (src/components/chat/ChatPanel.tsx)
Main chat interface container:
- **Component Orchestration**: Integrates ChatHeader, MessageList, ChatInput, SuggestedPrompts
- **State Management**: Manages suggested prompts (local state)
- **Message Flow**: User message -> add to store -> set typing -> echo response after 1s
- **Placeholder Logic**: Clears suggested prompts after first message
- **Dependencies**: useChatStore, all chat subcomponents

### ChatHeader (src/components/chat/ChatHeader.tsx)
Header with avatar and status:
- **Branding**: Gradient avatar (maya-primary to maya-secondary) + "Cikgu Maya" name
- **Status Display**: StatusBadge showing ready/thinking/speaking based on isTyping state
- **Settings Button**: Placeholder for future settings (lucide-react Settings icon)
- **Dependencies**: StatusBadge, useChatStore

### StatusBadge (src/components/ui/StatusBadge.tsx)
Visual status indicator component:
- **Three States**:
  - ready: Green (bg-maya-success) with static green dot
  - thinking: Yellow (bg-maya-warning) with pulsing yellow dot
  - speaking: Blue (bg-maya-info) with pulsing blue dot (for Phase 5 voice)
- **Props**: `status: 'ready' | 'thinking' | 'speaking'`
- **UI**: Inline-flex with animated dot + label

### MessageList (src/components/chat/MessageList.tsx)
Scrollable message container:
- **Auto-scroll**: Scrolls to bottom on messages/typing changes via useEffect
- **Welcome State**: Shows welcome message with emoji when messages.length === 0
- **Message Rendering**: Maps through messages array with MessageBubble components
- **Typing Indicator**: Shows TypingIndicator when isTyping === true
- **Styling**: Flex-1, overflow-y-auto, smooth scroll behavior
- **Dependencies**: MessageBubble, TypingIndicator, useChatStore

### MessageBubble (src/components/chat/MessageBubble.tsx)
Individual message display:
- **User vs Assistant Styling**:
  - User: Blue background (maya-primary), white text, right-aligned, rounded-br-sm
  - Assistant: Gray background (maya-bg-gray), dark text, left-aligned, rounded-bl-sm
- **Timestamp**: Formatted HH:MM (en-US locale), colored differently for user vs assistant
- **Content**: Whitespace preserved (whitespace-pre-wrap), word break for long messages
- **Max Width**: 80% of container
- **Props**: `message: Message`

### ChatInput (src/components/chat/ChatInput.tsx)
Message input with validation:
- **Character Limit**: 500 characters max
- **Character Counter**: Color-coded (normal: muted, near-limit: warning, at-limit: error)
- **Keyboard Handling**: Enter to send, Shift+Enter for newline
- **Input Validation**: Trims whitespace, disables send if empty or at limit
- **Auto-resize**: Textarea with min 48px, max 120px height
- **Send Button**: Disabled states with color changes (blue enabled, gray disabled)
- **Focus Ring**: Blue ring on focus with 20% opacity
- **Icons**: lucide-react Send icon
- **Helper Text**: "Press Enter to send, Shift + Enter for new line"

### SuggestedPrompts (src/components/chat/SuggestedPrompts.tsx)
Quick action prompt chips:
- **Conditional Rendering**: Returns null if prompts.length === 0
- **Chip Design**: Full rounded (rounded-full), white background, border
- **Hover Effect**: Border changes to maya-primary, text changes to maya-primary
- **Default Prompts**: "Who needs my attention?", "How is Form 4S1 doing?", "Show at-risk students"
- **Props**: `prompts: string[]`, `onSelectPrompt: (prompt: string) => void`

### TypingIndicator (src/components/chat/TypingIndicator.tsx)
Animated typing indicator:
- **Three Bouncing Dots**: Each with staggered animation delays (-0.3s, -0.15s, 0s)
- **Text Label**: "Maya is typing..." in muted color
- **Styling**: Matches assistant message (gray background, rounded-bl-sm)
- **Animation**: Tailwind animate-bounce with custom delays

### App (src/App.tsx)
Main application component:
- **Layout Wrapper**: Wraps Viewport3D and ChatPanel in responsive split layout
- **Imports**: Viewport3D (3d), ChatPanel (chat), Layout (layout)
- **Pattern**: Clean separation of concerns, each component handles its domain

## State Management

### ChatStore (src/store/chatStore.ts)
Zustand store managing:
- **messages**: Array of chat messages with timestamps
- **isTyping**: Boolean for typing indicator
- **currentEmotion**: Character emotion state (neutral, happy, concerned, thinking, encouraging)
- **currentAnimation**: Character animation state (idle, talking, wave, nod, thinking)

**Actions:**
- `addMessage(message)` - Add new message with auto-generated id and timestamp
- `setTyping(boolean)` - Set typing state
- `setEmotion(emotion)` - Update character emotion
- `setAnimation(animation)` - Update character animation
- `clearMessages()` - Clear all messages

## Type Definitions

### Message (src/types/message.ts)
```typescript
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  emotion?: EmotionType
  animation?: AnimationType
}

type EmotionType = 'neutral' | 'happy' | 'concerned' | 'thinking' | 'encouraging'
type AnimationType = 'idle' | 'talking' | 'wave' | 'nod' | 'thinking' | 'pointing'
```

## Design System

### Maya Color Palette
- **Primary**: #4A90E2 (blue)
- **Secondary**: #50C878 (green)
- **Accent**: #FF6B9D (pink)
- **Background**: #F8FAFC (light gray)
- **Text Primary**: #1E293B (dark slate)
- **Text Secondary**: #64748B (slate)
- **Text Muted**: #94A3B8 (light slate)

### Typography
- **Sans Font**: Inter (system-ui fallback)
- **Heading Font**: Poppins (Inter fallback)

## Development Scripts

```bash
npm run dev     # Start development server (Vite)
npm run build   # Build for production (tsc + vite build)
npm run preview # Preview production build
```

## Phase 3 Deliverables (Completed)

✅ ChatPanel.tsx with header, messages, input, suggestions
✅ ChatHeader.tsx with avatar, name, StatusBadge, settings button
✅ MessageList.tsx with auto-scroll and welcome message
✅ MessageBubble.tsx with user/assistant styling and timestamps
✅ ChatInput.tsx with 500 char limit, validation, keyboard shortcuts
✅ SuggestedPrompts.tsx with clickable prompt chips
✅ TypingIndicator.tsx with animated bouncing dots
✅ StatusBadge.tsx with ready/thinking/speaking states
✅ lucide-react integration (Send, Settings icons)
✅ Echo response flow (user message -> typing -> assistant response)

## Phase 1.5 Deliverables (Completed)

✅ Scene.tsx with Canvas, lighting, environment, OrbitControls
✅ Viewport3D.tsx wrapper component
✅ Pointing animation added (right arm extended forward)
✅ Audio amplitude sync in talking animation
✅ All 6 animations working (idle, talking, wave, nod, thinking, pointing)
✅ Path aliases configured (@/*) in tsconfig and vite
✅ Code splitting configured for vendors (react, three, state)

## Next Steps (Phase 4)

- Implement MockResponseEngine for contextual AI responses
- Add response parsing for emotion and animation markers
- Integrate character animation triggers based on message content
- Add more suggested prompts based on context
- Implement settings panel (theme, animation controls)
- Add export chat history feature
