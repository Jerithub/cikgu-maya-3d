# Codebase Summary

**Last Updated:** 2025-12-29
**Version:** 1.1.0
**Status:** MVP COMPLETE with VRM Integration - All 7 Phases

## Project Overview

Cikgu Maya 3D is an interactive educational assistant featuring a **VRM-based 3D animated character** using @pixiv/three-vrm, with voice integration and mock AI responses. Built with React Three Fiber, Zustand state management, Web Speech API, and Tailwind CSS.

## Technology Stack

### Core Framework
- **React 18.3.1** - UI framework
- **TypeScript 5.7.2** - Type safety
- **Vite 6.0.5** - Build tool and dev server

### 3D Graphics
- **Three.js 0.170.0** - 3D rendering engine
- **@react-three/fiber 8.17.10** - React renderer for Three.js
- **@react-three/drei 9.117.3** - Useful helpers for R3F
- **@pixiv/three-vrm 3.4.4** - VRM model loading and bone animation (NEW)

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
│   │   │   ├── VRMCharacter.tsx     # VRM model loader with bone animations (NEW)
│   │   │   ├── MayaCharacter.tsx    # Procedural character (UNUSED - fallback)
│   │   │   ├── Scene.tsx            # Three.js Canvas with lighting & controls
│   │   │   └── Viewport3D.tsx       # Scene wrapper component
│   │   ├── chat/
│   │   │   ├── ChatPanel.tsx        # Main chat interface container
│   │   │   ├── ChatHeader.tsx       # Header with voice toggle & status
│   │   │   ├── MessageList.tsx      # Scrollable message container
│   │   │   ├── MessageBubble.tsx    # Individual message display
│   │   │   ├── ChatInput.tsx        # Message input with validation
│   │   │   ├── SuggestedPrompts.tsx # Quick action prompt chips
│   │   │   └── TypingIndicator.tsx  # Animated typing indicator
│   │   ├── layout/
│   │   │   └── Layout.tsx           # Responsive split layout
│   │   └── ui/
│   │       └── StatusBadge.tsx      # Visual status indicator (3 states)
│   ├── hooks/
│   │   └── useChat.ts               # Orchestrates AI flow, animations, TTS
│   ├── lib/
│   │   └── ai/
│   │       ├── responseEngine.ts    # MockResponseEngine class
│   │       └── mockResponses.ts     # 7 response categories, Malaysian context
│   ├── store/
│   │   └── chatStore.ts             # Zustand store (messages, voice, animations)
│   ├── types/
│   │   └── message.ts               # TypeScript interfaces
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Global styles with Tailwind
│   └── vite-env.d.ts                # Vite TypeScript declarations
├── docs/                            # Documentation
├── plans/                           # Project plans
├── public/                          # Static assets (NEW)
│   └── Maya.vrm                     # VRM character file (~15MB)
├── index.html                       # HTML entry point
├── package.json                     # Dependencies
├── Dockerfile                       # Multi-stage build (node → nginx)
├── nginx.conf                       # SPA routing, gzip, asset caching
├── railway.json                     # Railway deployment config
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
- **Character Integration**: VRMCharacter (NEW) with animation and audio amplitude sync

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

### VRMCharacter (src/components/3d/VRMCharacter.tsx) - NEW
VRM-based 3D character with bone-based animations:
- **VRM Loading**: GLTFLoader with VRMLoaderPlugin (@pixiv/three-vrm v3.4.4)
- **Model File**: Loads `/Maya.vrm` from public folder (~15MB VRoid Studio model)
- **6 Animation States**: idle, talking, wave, nod, thinking, pointing
- **Bone-Based Animation**: Uses VRM humanoid bones
  - `head` - Head rotation for nod, thinking, idle sway
  - `jaw` - Jaw rotation for talking animation
  - `rightUpperArm` - Upper arm rotation for wave, pointing, thinking
  - `rightLowerArm` - Lower arm rotation for wave, pointing, thinking
  - `chest` - Chest rotation for breathing animation
- **Bone Caching**: References cached on load for performance
- **VRM Update**: Calls `vrm.update(delta)` every frame
- **Error Handling**: Graceful fallback on load failure

**Animation States:**
- `idle` - Breathing (chest) + subtle head sway
- `talking` - Jaw movement synced to audioAmplitude or simulated wave
- `pointing` - Right arm extended forward (upperArm: z=-1.5, x=-0.3, lowerArm: x=-1.5)
- `wave` - Right arm wave gesture (upperArm: z=-2.0, lowerArm oscillating)
- `nod` - Head nodding (rotation.x oscillating at 15rad/s)
- `thinking` - Hand to chin pose (upperArm: z=-0.8, x=-1.2, lowerArm: x=-1.0, head: z=0.15)

**Key Refs:**
- `vrmRef` - VRM instance
- `headBoneRef`, `jawBoneRef`, `rightUpperArmRef`, `rightLowerArmRef`, `chestBoneRef` - Cached bones

### MayaCharacter (src/components/3d/MayaCharacter.tsx) - UNUSED
Procedural character with primitive shapes - kept as fallback but not used:
- **Status**: Component exists but not imported in Scene.tsx
- **6 Animation States**: idle, talking, wave, nod, thinking, pointing
- **Procedural Animation**: Uses Three.js useFrame hook for smooth animations
- **Automatic Blinking**: Random eye blinks every 3-5 seconds
- **Breathing Effect**: Subtle vertical movement
- **Audio Sync**: Jaw movement synced to audio amplitude during talking
- **Modular Materials**: Reusable skin, clothing, and dark materials

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
Header with avatar, status, and voice toggle:
- **Branding**: Gradient avatar (maya-primary to maya-secondary) + "Cikgu Maya" name
- **Status Display**: StatusBadge showing ready/thinking/speaking based on isTyping and isSpeaking
- **Voice Toggle**: Volume2/VolumeX icon button to enable/disable TTS
- **Settings Button**: Placeholder for future settings (lucide-react Settings icon)
- **Dependencies**: StatusBadge, useChatStore, lucide-react (Volume2, VolumeX, Settings)

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
- **currentAnimation**: Character animation state (idle, talking, wave, nod, thinking, pointing)
- **voiceEnabled**: Boolean for TTS toggle
- **isSpeaking**: Boolean for TTS in progress

**Actions:**
- `addMessage(message)` - Add new message with auto-generated id and timestamp
- `setTyping(boolean)` - Set typing state
- `setEmotion(emotion)` - Update character emotion
- `setAnimation(animation)` - Update character animation
- `toggleVoice()` - Toggle TTS on/off, stops speaking if disabling
- `speak(text)` - Text-to-speech using Web Speech API (en-MY)
- `stopSpeaking()` - Cancel current TTS utterance
- `clearMessages()` - Clear all messages

**Voice Implementation Details:**
- Uses `window.speechSynthesis` API
- Tries en-MY voice first, falls back to any English voice
- Configured: rate=0.9, pitch=1.1, lang='en-MY'
- Auto-syncs animation: onstart→talking, onend→idle
- Stops immediately if voice toggled off during speech

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

## Custom Hooks

### useChat (src/hooks/useChat.ts)
Orchestrates the complete AI chat flow:
1. **Message Handling**: Add user message to store
2. **Typing State**: Show typing indicator (500-1000ms simulated delay)
3. **AI Response**: Call MockResponseEngine.getResponse()
4. **Character State**: Update emotion and animation
5. **TTS**: Speak response if voice enabled
6. **Animation Reset**: Return to idle after animation duration (except talking)

**Animation Durations:**
- idle: 0ms, talking: 0ms (self-managed)
- wave: 2000ms, nod: 1500ms, thinking: 3000ms, pointing: 2000ms

**Returns:**
- `messages`: Current messages array
- `isTyping`: Typing state boolean
- `sendMessage(content)`: Async function to send message

## AI Engine

### MockResponseEngine (src/lib/ai/responseEngine.ts)
Keyword-based response engine with 7 categories:
- **Method**: `getResponse(userMessage)` → `{ text, emotion, animation, followUpPrompts }`
- **Pattern**: Normalizes message, checks triggers, selects random response
- **Fallback**: Default category if no triggers match

### Response Database (src/lib/ai/mockResponses.ts)
**7 Response Categories:**
1. **greetings**: Triggers ["hello", "hi", "selamat", "salam"] → happy/wave
2. **student_queries**: Triggers ["student", "ahmad", "performance", "grade"] → neutral/thinking
3. **at_risk_students**: Triggers ["risk", "attention", "concern"] → concerned/pointing
4. **class_overview**: Triggers ["class", "form", "4s1", "4s2"] → neutral/nod
5. **parent_meeting**: Triggers ["parent", "meeting", "prepare"] → neutral/thinking
6. **encouragement**: Triggers ["thank", "thanks", "great"] → encouraging/nod
7. **default**: Fallback → neutral/thinking

**Malaysian Context:**
- Student personas: Ahmad bin Hassan, Siti Aminah, Lee Wei Ming
- Classes: Form 4S1, 4S2, 5S1
- Greetings: "Selamat pagi!", "Salam"
- Scenarios: Attendance issues, grade drops, homework completion

## Deployment

### Docker (Dockerfile)
Multi-stage build:
1. **Builder stage**: node:20-alpine → npm ci → npm run build
2. **Production stage**: nginx:alpine → copy dist, nginx.conf
3. **Result**: Static files served by nginx

### nginx (nginx.conf)
- SPA routing: `try_files $uri $uri/ /index.html`
- Asset caching: `/assets/` cached 1 year, immutable
- Gzip compression: text/plain, text/css, application/json, application/javascript

### Railway (railway.json)
- Builder: NIXPACKS (auto-detect Dockerfile)
- Restart policy: ON_FAILURE, max 10 retries
- Deploy: Push to GitHub → Railway auto-builds → `*.railway.app` URL

## MVP Deliverables (All Completed)

### Phase 1: Foundation ✅
- React + TypeScript + Vite project
- Three.js + React Three Fiber setup
- **@pixiv/three-vrm v3.4.4 for VRM support (NEW)**
- Zustand store for state management
- Tailwind CSS with Maya design system
- Responsive split layout (Layout.tsx)
- 3D scene with lighting, environment, controls (Scene.tsx, Viewport3D.tsx)
- **VRMCharacter with bone-based animations (NEW)**
- MayaCharacter.tsx kept as fallback (UNUSED)
- **public/Maya.vrm (~15MB VRoid Studio model) (NEW)**
- Code splitting configured
- Path aliases (@/) configured

### Phase 2: Chat Interface ✅
- ChatPanel.tsx (orchestrates chat components)
- ChatHeader.tsx (avatar, name, status, voice toggle)
- MessageList.tsx (auto-scroll, welcome message)
- MessageBubble.tsx (user/assistant styling, timestamps)
- ChatInput.tsx (500 char limit, Enter/Shift+Enter, validation)
- SuggestedPrompts.tsx (clickable prompt chips)
- TypingIndicator.tsx (animated bouncing dots)
- StatusBadge.tsx (ready/thinking/speaking states)
- lucide-react icons (Send, Settings, Volume2, VolumeX)

### Phase 3: Mock AI Engine ✅
- MockResponseEngine class (responseEngine.ts)
- 7 response categories with keyword matching
- Malaysian teacher context (students, classes, scenarios)
- useChat hook (orchestrates AI + animations + TTS)
- Emotion and animation triggers
- Follow-up prompt suggestions
- Animation timing with auto-reset

### Phase 4: Voice Integration ✅
- Web Speech API (SpeechSynthesis) in chatStore
- en-MY voice with fallback to English
- Voice toggle button (Volume2/VolumeX icons)
- voiceEnabled and isSpeaking state
- Auto-sync talking animation during speech
- Voice interruption handling (toggle off during speech)

### Phase 5: Polish & UX ✅
- All 6 animations smooth (idle, talking, wave, nod, thinking, pointing)
- Automatic blinking (every 3-5 seconds)
- Breathing animation (subtle vertical movement)
- Smooth transitions (THREE.MathUtils.lerp)
- StatusBadge with 3 states
- Auto-scroll in MessageList
- Color-coded character counter in ChatInput

### Phase 6: Deployment Setup ✅
- Multi-stage Dockerfile (node → nginx)
- nginx.conf with SPA routing and caching
- railway.json for Railway deployment
- Production build optimized
- Gzip compression configured

## Known Implementation Gaps

**Note**: The following components exist but are not fully integrated:
- **ChatPanel.tsx**: Still uses echo response pattern instead of useChat hook
- **useChat hook**: Exists but not imported in ChatPanel
- **Mock AI**: Fully implemented in lib/ai/ but not connected to UI

**To Complete Integration**:
1. Import and use `useChat()` hook in ChatPanel.tsx
2. Replace echo response with `await sendMessage(content)`
3. Update suggested prompts with returned followUpPrompts

## VRM Implementation Notes (NEW)

**Key Points**:
- VRM file location: `public/Maya.vrm` (~15MB)
- Uses GLTFLoader with VRMLoaderPlugin from @pixiv/three-vrm v3.4.4
- VRoid models face backward by default, rotated with `vrm.scene.rotation.y = Math.PI`
- AnimationState interface unchanged - drop-in replacement for procedural character
- All 6 animations (idle, talking, wave, nod, thinking, pointing) work identically
- Bone references cached on load for performance
- `vrm.update(delta)` must be called every frame for animation to work

## Future Enhancements (Phase 7+)

- Real AI integration (OpenAI, Anthropic, local models)
- Streaming responses
- Voice input (Web Speech API SpeechRecognition)
- Settings panel (theme, animation speed, voice selection)
- Export chat history (JSON/CSV)
- IndexedDB persistence
- Service Worker for offline support
- Multi-language support (Bahasa Malaysia, Chinese, Tamil)
