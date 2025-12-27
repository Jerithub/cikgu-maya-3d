# State Management Architecture Report
**Date**: 251227  
**Scope**: src/store & src/hooks  
**Status**: COMPLETE

---

## Files Found

### Store Files
- `D:\Projects\cikgu-maya-3d\src\store\chatStore.ts`

### Hook Files  
- `D:\Projects\cikgu-maya-3d\src\hooks\useChat.ts`

### Related Types
- `D:\Projects\cikgu-maya-3d\src\types\message.ts`

---

## 1. Store: chatStore.ts

### State Interface (ChatState)
```typescript
interface ChatState {
  // Message state
  messages: Message[]
  isTyping: boolean

  // Character state
  currentEmotion: EmotionType
  currentAnimation: AnimationType

  // Voice state
  voiceEnabled: boolean
  isSpeaking: boolean

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (isTyping: boolean) => void
  setEmotion: (emotion: EmotionType) => void
  setAnimation: (animation: AnimationType) => void
  toggleVoice: () => void
  speak: (text: string) => void
  stopSpeaking: () => void
  clearMessages: () => void
}
```

### Actions
| Action | Parameters | Purpose |
|--------|------------|---------|
| `addMessage` | `Omit<Message, 'id' \| 'timestamp'>` | Add msg with auto-generated id/timestamp |
| `setTyping` | `boolean` | Control typing indicator |
| `setEmotion` | `EmotionType` | Update character emotion |
| `setAnimation` | `AnimationType` | Trigger character animation |
| `toggleVoice` | - | Enable/disable speech synthesis |
| `speak` | `string` | Text-to-speech with en-MY voice |
| `stopSpeaking` | - | Cancel current speech |
| `clearMessages` | - | Reset messages array |

### Initial State
- `messages`: empty array
- `isTyping`: false
- `currentEmotion`: 'neutral'
- `currentAnimation`: 'idle'
- `voiceEnabled`: true
- `isSpeaking`: false

### Technology
- Zustand (create store)
- Web Speech API (SpeechSynthesis)

---

## 2. Hook: useChat.ts

### Parameters
None (uses chatStore internally)

### Return Values
```typescript
{
  messages: Message[]
  isTyping: boolean
  sendMessage: (content: string) => Promise<string[] | undefined>
}
```

### Key Function: sendMessage
| Step | Action | Duration |
|------|--------|----------|
| 1 | Add user message to store | immediate |
| 2 | Show typing indicator | immediate |
| 3 | Simulate thinking delay | 500-1000ms |
| 4 | Get AI response (MockResponseEngine) | sync |
| 5 | Add assistant message + emotion/animation | immediate |
| 6 | Hide typing | immediate |
| 7 | Speak response (if voice enabled) | async |
| 8 | Reset animation to idle after duration | 2000-3000ms |

### Animation Durations
| Animation | Duration |
|-----------|----------|
| idle | 0 |
| talking | 0 (self-managed) |
| wave | 2000ms |
| nod | 1500ms |
| thinking | 3000ms |
| pointing | 2000ms |

---

## 3. State Management Architecture

### Pattern
**Zustand + React Hook Layer**

```
┌─────────────────────────────────────────┐
│           useChat Hook                  │
│  (Business logic / orchestration)       │
│  - sendMessage flow                     │
│  - Response handling                    │
│  - Animation timing                     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         chatStore (Zustand)             │
│  (State container + atomic actions)     │
│  - messages array                       │
│  - emotion/animation state              │
│  - voice synthesis                      │
└─────────────────────────────────────────┘
```

### Data Flow
1. User input → `useChat.sendMessage()`
2. Hook calls MockResponseEngine for response
3. Hook calls multiple store actions (`addMessage`, `setEmotion`, `setAnimation`)
4. Store triggers Web Speech API for TTS
5. Components consume via `useChat()` or `useChatStore()`

---

## 4. Purpose Summary

| File | Purpose |
|------|---------|
| `chatStore.ts` | Centralized state for chat, emotions, animations, voice. Atomic actions. Zustand-based. |
| `useChat.ts` | Chat orchestration hook. Handles message flow, AI response integration, timing, animation resets. |
| `message.ts` | Type definitions for Message, EmotionType (5), AnimationType (6). |

---

## Type Definitions (from message.ts)

### EmotionType
- neutral
- happy
- concerned
- thinking
- encouraging

### AnimationType
- idle
- talking
- wave
- nod
- thinking
- pointing

---

## Unresolved Questions
- None
