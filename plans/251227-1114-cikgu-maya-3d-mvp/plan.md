# Cikgu Maya 3D Interactive Assistant - Implementation Plan

**Plan ID:** 251227-1114-cikgu-maya-3d-mvp
**Created:** 27 Dec 2025
**Last Updated:** 27 Dec 2025
**Timeline:** 3-5 days (Quick MVP)
**Status:** In Progress (Phase 3 Complete - 43% Complete)
**Current Phase:** Phase 4 - Mock AI Engine

---

## Executive Summary

Build standalone React web app with 3D character (existing geometric), voice output (Web Speech API), interactive chat, and mock AI responses. Optimized for quick MVP delivery while maintaining production code quality.

**Key Decisions:**
- ✅ Keep existing geometric MayaCharacter (lightweight, functional)
- ✅ Web Speech API only (zero config, instant)
- ✅ Basic keyword matching (5-7 categories, demo-ready)
- ✅ 3-5 day MVP timeline (core features, Railway deploy)

---

## 1. Component Architecture

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│  ┌──────────────────┐  ┌───────────────────────────────┐   │
│  │   3D Viewport    │  │      Chat Panel               │   │
│  │   (50% width)    │  │      (50% width)              │   │
│  │                  │  │                                │   │
│  │  ┌────────────┐  │  │  ┌──────────────────────────┐ │   │
│  │  │   Scene    │  │  │  │   Header                 │ │   │
│  │  │  (Canvas)  │  │  │  └──────────────────────────┘ │   │
│  │  │            │  │  │  ┌──────────────────────────┐ │   │
│  │  │  Maya      │  │  │  │   MessageList            │ │   │
│  │  │  Character │  │  │  │   (scrollable)           │ │   │
│  │  │            │  │  │  │   - User bubbles         │ │   │
│  │  │  Camera    │  │  │  │   - Assistant bubbles    │ │   │
│  │  │  Controls  │  │  │  │   - Typing indicator     │ │   │
│  │  └────────────┘  │  │  └──────────────────────────┘ │   │
│  │                  │  │  ┌──────────────────────────┐ │   │
│  └──────────────────┘  │  │   ChatInput              │ │   │
│                        │  │   - Text field           │ │   │
│                        │  │   - Send button          │ │   │
│                        │  │   - Voice controls       │ │   │
│                        │  └──────────────────────────┘ │   │
│                        │  ┌──────────────────────────┐ │   │
│                        │  │   SuggestedPrompts       │ │   │
│                        │  └──────────────────────────┘ │   │
│                        └───────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Tree

```
App
├── Layout (split screen)
│   ├── Viewport3D
│   │   └── Scene
│   │       ├── MayaCharacter (existing, enhanced)
│   │       ├── Lighting
│   │       ├── Environment
│   │       └── CameraControls (OrbitControls)
│   │
│   └── ChatPanel
│       ├── ChatHeader
│       │   ├── Avatar
│       │   ├── StatusBadge (ready/thinking/speaking)
│       │   └── SettingsButton
│       │
│       ├── MessageList
│       │   ├── MessageBubble (user)
│       │   ├── MessageBubble (assistant)
│       │   └── TypingIndicator
│       │
│       ├── ChatInput
│       │   ├── TextArea
│       │   ├── SendButton
│       │   └── VoiceControls (play/stop/replay)
│       │
│       └── SuggestedPrompts
│           └── PromptChip[]
│
└── VoiceController (hidden, manages TTS)
```

### 1.3 New Components to Create

| Component | Location | Purpose |
|-----------|----------|---------|
| `Layout.tsx` | `src/components/layout/` | Split screen container |
| `Viewport3D.tsx` | `src/components/3d/` | Canvas wrapper with controls |
| `Scene.tsx` | `src/components/3d/` | Three.js scene setup |
| `ChatPanel.tsx` | `src/components/chat/` | Right panel container |
| `ChatHeader.tsx` | `src/components/chat/` | Title, status, settings |
| `MessageList.tsx` | `src/components/chat/` | Message history scroll |
| `MessageBubble.tsx` | `src/components/chat/` | Single message UI |
| `ChatInput.tsx` | `src/components/chat/` | User input field |
| `SuggestedPrompts.tsx` | `src/components/chat/` | Quick action chips |
| `TypingIndicator.tsx` | `src/components/chat/` | "Maya is typing..." |
| `VoiceController.tsx` | `src/components/voice/` | TTS manager |
| `StatusBadge.tsx` | `src/components/ui/` | Status indicator |

---

## 2. State Management Strategy

### 2.1 Zustand Store Architecture

```typescript
// src/store/chatStore.ts
import { create } from 'zustand'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  emotion?: 'neutral' | 'happy' | 'concerned' | 'thinking' | 'encouraging'
  animation?: 'idle' | 'talking' | 'wave' | 'nod' | 'thinking'
}

interface ChatState {
  // Message state
  messages: Message[]
  isTyping: boolean

  // Character state
  currentEmotion: 'neutral' | 'happy' | 'concerned' | 'thinking' | 'encouraging'
  currentAnimation: 'idle' | 'talking' | 'wave' | 'nod' | 'thinking'

  // Voice state
  voiceEnabled: boolean
  isSpeaking: boolean
  currentUtterance: SpeechSynthesisUtterance | null

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (isTyping: boolean) => void
  setEmotion: (emotion: Message['emotion']) => void
  setAnimation: (animation: Message['animation']) => void
  toggleVoice: () => void
  speak: (text: string) => void
  stopSpeaking: () => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isTyping: false,
  currentEmotion: 'neutral',
  currentAnimation: 'idle',
  voiceEnabled: true,
  isSpeaking: false,
  currentUtterance: null,

  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }]
  })),

  setTyping: (isTyping) => set({ isTyping }),
  setEmotion: (emotion) => set({ currentEmotion: emotion }),
  setAnimation: (animation) => set({ currentAnimation: animation }),
  toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),

  speak: (text) => {
    const { voiceEnabled, stopSpeaking } = get()
    if (!voiceEnabled) return

    stopSpeaking()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.lang = 'en-MY'

    utterance.onstart = () => set({ isSpeaking: true, currentAnimation: 'talking' })
    utterance.onend = () => set({ isSpeaking: false, currentAnimation: 'idle' })
    utterance.onerror = () => set({ isSpeaking: false, currentAnimation: 'idle' })

    set({ currentUtterance: utterance })
    window.speechSynthesis.speak(utterance)
  },

  stopSpeaking: () => {
    window.speechSynthesis.cancel()
    set({ isSpeaking: false, currentUtterance: null, currentAnimation: 'idle' })
  },

  clearMessages: () => set({ messages: [] })
}))
```

### 2.2 Local State (Component-Specific)

- **ChatInput**: Input value, character count
- **MessageList**: Scroll position, auto-scroll flag
- **MayaCharacter**: Animation timings, blinking state (existing)

---

## 3. 3D Scene Setup

### 3.1 Scene Component

```typescript
// src/components/3d/Scene.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { MayaCharacter } from './MayaCharacter'
import { useChatStore } from '@/store/chatStore'

export function Scene() {
  const animation = useChatStore(state => state.currentAnimation)
  const audioAmplitude = useChatStore(state => state.isSpeaking ? 0.5 : 0)

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 3, -3]} intensity={0.4} />

      {/* Environment */}
      <Environment preset="city" background={false} />

      {/* Character */}
      <MayaCharacter
        animation={animation}
        audioAmplitude={audioAmplitude}
      />

      {/* Ground */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e0e7ff" />
      </mesh>

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1.2, 0]}
      />
    </Canvas>
  )
}
```

### 3.2 Enhanced MayaCharacter

**Modifications to existing `MayaCharacter.tsx`:**

1. **Add pointing animation:**
```typescript
case 'pointing': {
  const armRight = armRightRef.current
  if (armRight) {
    // Point forward gesture
    armRight.rotation.z = THREE.MathUtils.lerp(armRight.rotation.z, -1.8, 0.1)
    armRight.rotation.x = THREE.MathUtils.lerp(armRight.rotation.x, -0.5, 0.1)
    armRight.position.y = THREE.MathUtils.lerp(armRight.position.y, 1.3, 0.1)
  }
  break
}
```

2. **Sync talking animation with audio amplitude:**
```typescript
case 'talking': {
  if (jawRef.current) {
    // Use audioAmplitude if provided, otherwise simulate
    const jawOpen = audioAmplitude > 0
      ? audioAmplitude * 0.4
      : ((Math.sin(time * 10) + 1) / 2) * 0.3

    jawRef.current.rotation.x = THREE.MathUtils.lerp(
      jawRef.current.rotation.x,
      jawOpen,
      0.3
    )
  }
  break
}
```

3. **Add facial expression support (future):**
```typescript
// Update eye materials based on emotion
// Update mouth curve based on emotion
```

---

## 4. Animation System Design

### 4.1 Animation Configuration

```typescript
// src/lib/animations/animationConfig.ts
export type AnimationType = 'idle' | 'talking' | 'wave' | 'nod' | 'thinking' | 'pointing'
export type EmotionType = 'neutral' | 'happy' | 'concerned' | 'thinking' | 'encouraging'

export const ANIMATION_DURATIONS = {
  wave: 2000,      // 2 seconds
  nod: 1500,       // 1.5 seconds
  thinking: 3000,  // 3 seconds
  pointing: 2000   // 2 seconds
} as const

export const EMOTION_TO_EXPRESSION = {
  neutral: { eyeScale: 1.0, mouthCurve: 0.1 },
  happy: { eyeScale: 0.9, mouthCurve: 0.15 },
  concerned: { eyeScale: 1.1, mouthCurve: -0.05 },
  thinking: { eyeScale: 1.0, mouthCurve: 0.0 },
  encouraging: { eyeScale: 0.95, mouthCurve: 0.12 }
} as const
```

### 4.2 Animation Triggers

Animations triggered automatically based on response category:

| Response Category | Animation | Emotion | Duration |
|-------------------|-----------|---------|----------|
| Greetings | wave | happy | 2s |
| Student queries | thinking → idle | neutral | 3s |
| At-risk students | thinking → pointing | concerned | 5s |
| Class info | nod | neutral | 1.5s |
| Encouragement | nod | encouraging | 1.5s |
| Default | idle | neutral | - |

---

## 5. Voice Integration Strategy

### 5.1 Web Speech API Implementation

```typescript
// src/lib/voice/webSpeechProvider.ts
export class WebSpeechProvider {
  private synthesis: SpeechSynthesis

  constructor() {
    this.synthesis = window.speechSynthesis
  }

  speak(text: string, options: VoiceOptions = {}): SpeechSynthesisUtterance {
    const utterance = new SpeechSynthesisUtterance(text)

    utterance.rate = options.rate ?? 0.9
    utterance.pitch = options.pitch ?? 1.1
    utterance.volume = options.volume ?? 1.0
    utterance.lang = options.lang ?? 'en-MY'

    // Try to find Malaysian English voice, fallback to any English
    const voices = this.synthesis.getVoices()
    const malaysianVoice = voices.find(v => v.lang === 'en-MY')
    const englishVoice = voices.find(v => v.lang.startsWith('en-'))

    if (malaysianVoice) {
      utterance.voice = malaysianVoice
    } else if (englishVoice) {
      utterance.voice = englishVoice
    }

    this.synthesis.speak(utterance)
    return utterance
  }

  stop(): void {
    this.synthesis.cancel()
  }

  pause(): void {
    this.synthesis.pause()
  }

  resume(): void {
    this.synthesis.resume()
  }
}

export interface VoiceOptions {
  rate?: number
  pitch?: number
  volume?: number
  lang?: string
}
```

### 5.2 Voice State Management

Integrated into Zustand store (see Section 2.1).

**Key features:**
- Auto-play on assistant response
- Manual replay button
- Stop speaking button
- Voice enable/disable toggle
- Sync talking animation with speech

---

## 6. Response Engine Algorithm

### 6.1 Mock Response Database

```typescript
// src/lib/ai/mockResponses.ts
export interface ResponseTemplate {
  triggers: string[]
  responses: string[]
  emotion: EmotionType
  animation: AnimationType
  followUpPrompts?: string[]
}

export const RESPONSE_DATABASE: Record<string, ResponseTemplate> = {
  greetings: {
    triggers: ['hello', 'hi', 'hey', 'good morning', 'selamat', 'salam'],
    responses: [
      "Selamat pagi! 👋 I'm Cikgu Maya. How can I help you with your students today?",
      "Hello! Great to see you. What would you like to know about your classes?",
      "Hi there! Ready to dive into your student data. Where should we start?"
    ],
    emotion: 'happy',
    animation: 'wave',
    followUpPrompts: [
      "Who needs my attention?",
      "How is Form 4S1 doing?",
      "Show me at-risk students"
    ]
  },

  student_queries: {
    triggers: ['student', 'ahmad', 'performance', 'grade', 'marks', 'how is'],
    responses: [
      "Let me pull up Ahmad's profile. He's currently at 54% overall—just above passing. I notice his grades dropped from 72% to 54% over two months. His attendance has also dipped to 84%, which might be connected. Would you like me to dig deeper?",
      "Looking at this student's data, I see some interesting patterns. Their test scores show they understand the material (68% average), but homework completion is the challenge. Only 2 of last 7 assignments submitted.",
      "This student is showing steady improvement! Up 12% from last month. Attendance is solid at 96%, and they're actively participating in class. Keep encouraging this positive trend."
    ],
    emotion: 'neutral',
    animation: 'thinking',
    followUpPrompts: [
      "Prepare parent meeting brief",
      "Compare to class average",
      "Show attendance pattern"
    ]
  },

  at_risk_students: {
    triggers: ['risk', 'attention', 'concern', 'help', 'struggling', 'failing'],
    responses: [
      "Based on your 3 classes, here are students who need attention:\n\n🔴 HIGH PRIORITY (3 students)\n\n1. **Ahmad bin Hassan** (4S1) - Grade dropped 18% in Math, 5 missing assignments, absent 4 days last week\n\n2. **Siti Aminah** (4S2) - Failing Physics at 38%, attendance at 82%\n\n3. **Lee Wei Ming** (5S1) - Three consecutive declining test scores (75% → 65% → 58%)\n\nWould you like me to analyze any of these students in detail?",
      "I've identified 2 students requiring immediate attention. Both show sudden attendance drops and declining grades. The pattern suggests something might be happening outside school. Let's discuss intervention strategies.",
      "Good news—your at-risk list is short this week. Only 1 student needs close monitoring, and 2 others improved significantly. You're making a real difference!"
    ],
    emotion: 'concerned',
    animation: 'pointing',
    followUpPrompts: [
      "Why is Ahmad struggling?",
      "Prepare intervention plan",
      "Compare to last month"
    ]
  },

  class_overview: {
    triggers: ['class', 'form', '4s1', '4s2', '5s1', 'how are', 'overview'],
    responses: [
      "4S1 is doing well overall! Class average is 72%—7 points above school average. Only 1 student at-risk, 6 students improved 10%+ this month, and assignment completion is at 89%. Whatever you're doing is working!",
      "Let me break down your classes:\n\n• **4S1**: Strong (avg 72%) - 1 at-risk\n• **4S2**: Moderate (avg 65%) - 3 at-risk\n• **5S1**: Excellent (avg 78%) - 0 at-risk\n\nOverall, you're reaching most students effectively. The 4 at-risk students need targeted support.",
      "Your Form 5 class is performing excellently as they prepare for SPM. Average is 78%, and all students are on track for passing grades. Form 4 needs a bit more attention, especially in certain topics."
    ],
    emotion: 'neutral',
    animation: 'nod',
    followUpPrompts: [
      "Show struggling topics",
      "Compare to school average",
      "Monthly trend analysis"
    ]
  },

  parent_meeting: {
    triggers: ['parent', 'meeting', 'prepare', 'brief', 'talk', 'discuss'],
    responses: [
      "I'll prepare a comprehensive brief for Ahmad's parent meeting:\n\n**START WITH POSITIVES:**\n• Participates actively when present\n• Test scores show understanding (68% avg)\n• Good behavior, no discipline issues\n\n**CONCERNS:**\n• 6 absences in last 4 weeks\n• 5 missing homework assignments\n• Grade decline 72% → 54%\n\n**KEY POINT:**\n'Ahmad understands Mathematics—test performance proves it. The challenge is completing work outside school. Let's discuss if there's something affecting his homework time.'\n\nWant me to suggest questions to ask parents?",
      "Here's your meeting brief ready. I've highlighted what's working, the specific concerns with data, and recommended partnership approaches. I can also draft a follow-up email template if you'd like."
    ],
    emotion: 'neutral',
    animation: 'thinking',
    followUpPrompts: [
      "Draft follow-up email",
      "Suggest intervention strategies",
      "Show full student history"
    ]
  },

  encouragement: {
    triggers: ['thank', 'thanks', 'great', 'good job', 'appreciate'],
    responses: [
      "You're very welcome! You're doing important work supporting your students. I'm here whenever you need insights or just want to talk through challenges.",
      "I'm glad I could help! Remember, you know your students best—I'm just here to highlight patterns. Your expertise makes the real difference.",
      "Happy to assist! Teaching is tough work, and you're making a real impact. Let me know what else you need."
    ],
    emotion: 'encouraging',
    animation: 'nod',
    followUpPrompts: []
  },

  default: {
    triggers: [],
    responses: [
      "I can help you with student insights, class performance, and parent meeting preparation. What would you like to explore?",
      "I'm not sure I understand that question. I can assist with:\n• Student performance analysis\n• At-risk identification\n• Class overviews\n• Parent meeting briefs\n\nWhat would you like to know?",
      "Could you rephrase that? I'm best at discussing specific students, classes, or preparing for parent meetings."
    ],
    emotion: 'neutral',
    animation: 'thinking',
    followUpPrompts: [
      "Who needs my attention?",
      "How is Form 4S1?",
      "Show at-risk students"
    ]
  }
}
```

### 6.2 Response Engine Logic

```typescript
// src/lib/ai/responseEngine.ts
import { RESPONSE_DATABASE } from './mockResponses'

export class MockResponseEngine {
  getResponse(userMessage: string): {
    text: string
    emotion: EmotionType
    animation: AnimationType
    followUpPrompts: string[]
  } {
    const normalizedMessage = userMessage.toLowerCase().trim()

    // Find matching category
    for (const [category, template] of Object.entries(RESPONSE_DATABASE)) {
      const hasMatch = template.triggers.some(trigger =>
        normalizedMessage.includes(trigger)
      )

      if (hasMatch) {
        return {
          text: this.selectRandomResponse(template.responses),
          emotion: template.emotion,
          animation: template.animation,
          followUpPrompts: template.followUpPrompts ?? []
        }
      }
    }

    // Default fallback
    const defaultTemplate = RESPONSE_DATABASE.default
    return {
      text: this.selectRandomResponse(defaultTemplate.responses),
      emotion: defaultTemplate.emotion,
      animation: defaultTemplate.animation,
      followUpPrompts: defaultTemplate.followUpPrompts ?? []
    }
  }

  private selectRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)]
  }
}
```

### 6.3 Integration Hook

```typescript
// src/hooks/useChat.ts
import { useChatStore } from '@/store/chatStore'
import { MockResponseEngine } from '@/lib/ai/responseEngine'

const responseEngine = new MockResponseEngine()

export function useChat() {
  const store = useChatStore()

  const sendMessage = async (content: string) => {
    // Add user message
    store.addMessage({
      role: 'user',
      content
    })

    // Show typing indicator
    store.setTyping(true)

    // Simulate thinking delay (500-1000ms)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))

    // Get AI response
    const { text, emotion, animation, followUpPrompts } = responseEngine.getResponse(content)

    // Add assistant message
    store.addMessage({
      role: 'assistant',
      content: text,
      emotion,
      animation
    })

    // Update character state
    store.setEmotion(emotion)
    store.setAnimation(animation)

    // Hide typing indicator
    store.setTyping(false)

    // Speak response if voice enabled
    store.speak(text)

    // Return animation to idle after duration
    if (animation !== 'idle' && animation !== 'talking') {
      const duration = ANIMATION_DURATIONS[animation] ?? 2000
      setTimeout(() => {
        if (!store.isSpeaking) {
          store.setAnimation('idle')
        }
      }, duration)
    }

    return followUpPrompts
  }

  return {
    messages: store.messages,
    isTyping: store.isTyping,
    sendMessage
  }
}
```

---

## 7. Development Milestones

### Phase 1: Foundation (Day 1) ✅ **COMPLETED**
**Status:** DONE
**Completion Date:** 2025-12-27
**Goal:** Project setup, dependencies, basic layout

**Tasks:**
1. ✅ Install dependencies:
   ```bash
   npm install zustand
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. ✅ Create directory structure:
   ```
   src/
   ├── components/
   │   ├── 3d/
   │   ├── chat/
   │   ├── layout/
   │   ├── ui/
   │   └── voice/
   ├── lib/
   │   ├── ai/
   │   ├── animations/
   │   └── voice/
   ├── hooks/
   ├── store/
   ├── types/
   └── styles/
   ```

3. ✅ Configure Tailwind CSS
4. ✅ Create Zustand store (`chatStore.ts`)
5. ✅ Create basic Layout component (split screen)

**Deliverable:** Empty UI with split layout, store configured

---

### Phase 2: 3D Scene (Day 1-2) ✅ **COMPLETED**
**Status:** DONE
**Completion Date:** 2025-12-27
**Goal:** Integrate existing character, setup scene

**Tasks:**
1. ✅ Create `Scene.tsx` component
2. ✅ Create `Viewport3D.tsx` wrapper
3. ✅ Enhance `MayaCharacter.tsx`:
   - ✅ Add `pointing` animation
   - ✅ Add audio amplitude sync
   - ✅ Refine existing animations
4. ✅ Test all animations (idle, talking, wave, nod, thinking, pointing)
5. ✅ Add OrbitControls for camera
6. ✅ Optimize lighting and shadows

**Deliverable:** Working 3D character with all animations

---

### Phase 3: Chat Interface (Day 2) ✅ **COMPLETED**
**Status:** DONE
**Completion Date:** 2025-12-27
**Goal:** Build chat UI components

**Tasks:**
1. ✅ Create `ChatPanel.tsx` container
2. ✅ Create `ChatHeader.tsx`:
   - ✅ Cikgu Maya branding
   - ✅ Status badge (ready/thinking/speaking)
   - ✅ Settings button (voice toggle)
3. ✅ Create `MessageList.tsx`:
   - ✅ Scrollable container
   - ✅ Auto-scroll to bottom
4. ✅ Create `MessageBubble.tsx`:
   - ✅ User bubble (right, blue)
   - ✅ Assistant bubble (left, gray)
   - ✅ Timestamp
5. ✅ Create `ChatInput.tsx`:
   - ✅ Text area
   - ✅ Send button
   - ✅ Character counter
   - ✅ Voice controls
6. ✅ Create `SuggestedPrompts.tsx`:
   - ✅ Prompt chips
   - ✅ Click to send
7. ✅ Create `TypingIndicator.tsx`

**Deliverable:** Complete chat UI (static, no logic yet)

---

### Phase 4: Mock AI Engine (Day 2-3)
**Goal:** Implement response system

**Tasks:**
1. Create `mockResponses.ts` database:
   - 7 categories (greetings, student_queries, at_risk, class_overview, parent_meeting, encouragement, default)
   - 3-5 responses per category
   - Emotion and animation mappings
   - Follow-up prompts
2. Create `responseEngine.ts`:
   - Keyword matching algorithm
   - Random response selection
3. Create `useChat.ts` hook:
   - Send message function
   - Typing indicator logic
   - Animation triggering
4. Integrate with ChatInput and MessageList
5. Test all response categories

**Deliverable:** Working chat with intelligent mock responses

---

### Phase 5: Voice Integration (Day 3)
**Goal:** Add Text-to-Speech

**Tasks:**
1. Create `webSpeechProvider.ts`:
   - Web Speech API wrapper
   - Voice configuration (rate 0.9, pitch 1.1)
   - Malaysian English voice selection
2. Integrate TTS into Zustand store:
   - `speak()` function
   - `stopSpeaking()` function
   - `isSpeaking` state
3. Create `VoiceController.tsx`:
   - Auto-play on assistant response
   - Manual play/stop/replay buttons
4. Sync talking animation with speech:
   - Start talking on speech start
   - Return to idle on speech end
5. Add voice enable/disable toggle
6. Test cross-browser compatibility

**Deliverable:** Working voice output with animation sync

---

### Phase 6: Polish & UX (Day 4)
**Goal:** Professional design, smooth UX

**Tasks:**
1. Implement Tailwind design system:
   - Color palette (blue primary, green secondary)
   - Typography (Inter, Poppins)
   - Spacing, shadows, borders
2. Add smooth transitions:
   - Message fade-in
   - Animation state changes
   - Button hover effects
3. Improve chat UX:
   - Typewriter effect for AI responses (optional)
   - Smooth scroll to bottom
   - Loading states
4. Add keyboard shortcuts:
   - Enter to send
   - Space to play/pause voice
5. Mobile responsiveness:
   - Stack layout on small screens
   - Touch-friendly controls
6. Error handling:
   - Speech API not supported
   - Network errors (future)
7. Accessibility:
   - ARIA labels
   - Keyboard navigation
   - Screen reader support

**Deliverable:** Polished, professional UI

---

### Phase 7: Testing & Deployment (Day 5)
**Goal:** Deploy to Railway

**Tasks:**
1. Create production build:
   ```bash
   npm run build
   ```
2. Test production build locally:
   ```bash
   npm run preview
   ```
3. Performance optimization:
   - Code splitting (React.lazy)
   - Image optimization
   - Bundle size analysis
4. Create `railway.json` config
5. Setup Railway project:
   - Connect GitHub repo
   - Configure build command
   - Set environment variables (if needed)
6. Deploy and test live
7. Create README with:
   - Setup instructions
   - Feature list
   - Tech stack
   - Deployment guide

**Deliverable:** Live demo on Railway

---

## 8. Testing Approach

### 8.1 Manual Testing Checklist

**3D Character:**
- [ ] Character loads within 3 seconds
- [ ] All animations work (idle, talking, wave, nod, thinking, pointing)
- [ ] Smooth transitions between animations
- [ ] Camera controls work (orbit, zoom)
- [ ] Shadows render correctly
- [ ] No visual glitches

**Chat Interface:**
- [ ] Messages display correctly (user/assistant)
- [ ] Typing indicator appears during AI thinking
- [ ] Auto-scroll to bottom works
- [ ] Send button disabled when input empty
- [ ] Suggested prompts clickable
- [ ] Message history persists during session

**Voice System:**
- [ ] Speech auto-plays on assistant response
- [ ] Voice controls work (play, stop, replay)
- [ ] Talking animation syncs with speech
- [ ] Voice toggle persists preference
- [ ] Malaysian English voice selected (if available)
- [ ] Graceful fallback if speech not supported

**Response Engine:**
- [ ] Greetings trigger wave animation
- [ ] Student queries trigger thinking animation
- [ ] At-risk queries trigger concerned emotion
- [ ] Follow-up prompts appear after response
- [ ] Default response for unknown queries
- [ ] Responses feel natural and persona-appropriate

**Cross-Browser:**
- [ ] Chrome (primary)
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### 8.2 Performance Testing

- [ ] Initial load < 3 seconds
- [ ] 60fps animations
- [ ] TTS latency < 1 second
- [ ] Memory usage stable (no leaks)
- [ ] Smooth scrolling in message list

### 8.3 User Testing

**Test Scenarios:**
1. First-time user flow (greeting, suggested prompts)
2. Student query flow (ask about student, get insights)
3. At-risk identification flow (ask who needs attention)
4. Parent meeting prep flow (request brief)
5. Voice interaction flow (enable/disable, replay)

---

## 9. Technical Specifications

### 9.1 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.117.3",
    "three": "^0.170.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/three": "^0.170.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

### 9.2 Environment Variables

```env
# .env.example
VITE_APP_NAME=Cikgu Maya 3D
VITE_VERSION=1.0.0
# Future: VITE_GOOGLE_TTS_API_KEY=
```

### 9.3 Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'state-vendor': ['zustand']
        }
      }
    }
  }
})
```

### 9.4 Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'maya-primary': '#4A90E2',
        'maya-secondary': '#50C878',
        'maya-accent': '#FF6B9D',
        'maya-bg-light': '#F8FAFC',
        'maya-text-primary': '#1E293B',
        'maya-text-secondary': '#64748B'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
```

---

## 10. Integration Points

### 10.1 Future Real AI Integration

**Abstraction Layer:**
```typescript
// src/lib/ai/responseProvider.ts
export interface ResponseProvider {
  getResponse(message: string, context?: ConversationContext): Promise<AIResponse>
}

// Mock implementation (current)
export class MockResponseProvider implements ResponseProvider {
  async getResponse(message: string): Promise<AIResponse> {
    return responseEngine.getResponse(message)
  }
}

// Future Claude implementation
export class ClaudeResponseProvider implements ResponseProvider {
  async getResponse(message: string, context?: ConversationContext): Promise<AIResponse> {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, context })
    })
    return response.json()
  }
}
```

**Configuration:**
```typescript
// src/config/ai.ts
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'mock'

export const responseProvider = AI_PROVIDER === 'claude'
  ? new ClaudeResponseProvider()
  : new MockResponseProvider()
```

### 10.2 Analytics Integration Points

**Future tracking:**
- Message sent events
- Response categories triggered
- Animation played events
- Voice interaction events
- Session duration
- User engagement metrics

---

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Web Speech API not available in browser | High | Detect support, show warning, disable voice features gracefully |
| Performance issues on low-end devices | Medium | Optimize 3D scene, reduce polygon count, disable shadows on mobile |
| Response engine feels robotic | Medium | Write diverse responses, use Cikgu Maya persona, add follow-up prompts |
| Animations don't sync with voice | High | Test extensively, fallback to timed animations if amplitude unavailable |
| Deployment issues on Railway | Low | Test production build locally first, use Railway CLI |

---

## 12. Success Metrics

**MVP Success Criteria:**
- ✅ 3D character loads within 3 seconds
- ✅ All 6 animations work smoothly
- ✅ Voice plays automatically with natural speech
- ✅ Chat responses feel warm and helpful
- ✅ Works on desktop Chrome, Firefox, Safari
- ✅ Deployed and accessible via Railway URL

**Stretch Goals:**
- Typewriter effect for AI responses
- Mobile responsive design
- Multiple voice options
- Context-aware follow-up prompts
- Analytics dashboard

---

## 13. Next Steps After MVP

1. **User Testing:** Get feedback from Malaysian teachers
2. **Voice Upgrade:** Integrate Google Cloud TTS for better quality
3. **Advanced Responses:** Add context awareness, conversation memory
4. **Real AI Integration:** Connect to Claude API with function calling
5. **Mobile App:** Convert to React Native or PWA
6. **Analytics:** Track usage patterns, improve responses
7. **Multilingual:** Add Malay language support
8. **3D Model Upgrade:** Replace geometric character with realistic model

---

## Appendices

### A. File Structure (Complete)

```
cikgu-maya-3d/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── MayaCharacter.tsx (existing, enhanced)
│   │   │   ├── Scene.tsx (new)
│   │   │   └── Viewport3D.tsx (new)
│   │   ├── chat/
│   │   │   ├── ChatPanel.tsx (new)
│   │   │   ├── ChatHeader.tsx (new)
│   │   │   ├── MessageList.tsx (new)
│   │   │   ├── MessageBubble.tsx (new)
│   │   │   ├── ChatInput.tsx (new)
│   │   │   ├── SuggestedPrompts.tsx (new)
│   │   │   └── TypingIndicator.tsx (new)
│   │   ├── layout/
│   │   │   └── Layout.tsx (new)
│   │   ├── ui/
│   │   │   └── StatusBadge.tsx (new)
│   │   └── voice/
│   │       └── VoiceController.tsx (new)
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── mockResponses.ts (new)
│   │   │   ├── responseEngine.ts (new)
│   │   │   └── responseProvider.ts (new, abstraction)
│   │   ├── animations/
│   │   │   └── animationConfig.ts (new)
│   │   └── voice/
│   │       └── webSpeechProvider.ts (new)
│   ├── hooks/
│   │   └── useChat.ts (new)
│   ├── store/
│   │   └── chatStore.ts (new)
│   ├── types/
│   │   ├── message.ts (new)
│   │   ├── animation.ts (new)
│   │   └── voice.ts (new)
│   ├── styles/
│   │   └── globals.css (modified)
│   ├── App.tsx (modified)
│   ├── App.css (existing)
│   ├── index.css (modified for Tailwind)
│   ├── main.tsx (existing)
│   └── vite-env.d.ts (existing)
├── .env.example (new)
├── .gitignore (existing)
├── index.html (existing)
├── package.json (modified)
├── package-lock.json (auto-generated)
├── postcss.config.js (new)
├── railway.json (new)
├── tailwind.config.js (new)
├── tsconfig.json (existing)
└── vite.config.ts (modified)
```

### B. Color Palette Reference

```css
/* Primary Colors */
--maya-primary: #4A90E2;        /* Confident Blue */
--maya-primary-light: #7CB3F5;
--maya-primary-dark: #2E6AB8;

--maya-secondary: #50C878;      /* Encouraging Green */
--maya-secondary-light: #7FDA9A;
--maya-secondary-dark: #3AA05A;

--maya-accent: #FF6B9D;          /* Warm Pink */

/* Neutral Colors */
--maya-bg-light: #F8FAFC;
--maya-bg-gray: #F1F5F9;
--maya-text-primary: #1E293B;
--maya-text-secondary: #64748B;
--maya-text-muted: #94A3B8;

/* Semantic Colors */
--maya-success: #10B981;
--maya-warning: #F59E0B;
--maya-error: #EF4444;
--maya-info: #3B82F6;
```

### C. Typography Scale

```css
/* Font Sizes */
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## Summary

This plan provides a complete roadmap for building the Cikgu Maya 3D Interactive Assistant MVP in 3-5 days. Key decisions prioritize speed while maintaining quality:

**Quick Wins:**
- Reuse existing geometric character (no 3D model sourcing)
- Web Speech API (zero config)
- Basic keyword matching (simple, effective)
- Zustand for lightweight state management
- Tailwind for rapid UI development

**Solid Foundation:**
- Zustand store with clean architecture
- Abstraction layers for future upgrades
- Comprehensive response database
- Professional design system
- Clear component separation

**Next Action:** Begin Phase 1 (Foundation) by installing dependencies and creating directory structure.
