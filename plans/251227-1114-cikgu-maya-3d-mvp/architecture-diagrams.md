# Cikgu Maya 3D - Architecture Diagrams

**Plan:** 251227-1114-cikgu-maya-3d-mvp
**Created:** 27 Dec 2025

---

## 1. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    React Application                      │  │
│  │                                                            │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────────┐  │  │
│  │  │   UI Layer   │  │  State Layer │  │  Logic Layer  │  │  │
│  │  │              │  │              │  │               │  │  │
│  │  │  Components  │◄─┤   Zustand    │◄─┤  Response     │  │  │
│  │  │  - 3D Scene  │  │   Store      │  │  Engine       │  │  │
│  │  │  - Chat UI   │  │              │  │               │  │  │
│  │  │  - Voice     │  │              │  │  - Keyword    │  │  │
│  │  │              │  │              │  │    Matching   │  │  │
│  │  └──────────────┘  └──────────────┘  └───────────────┘  │  │
│  │                                                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Browser APIs                                 │  │
│  │  - Three.js (WebGL)                                       │  │
│  │  - Web Speech API (TTS)                                   │  │
│  │  - DOM APIs                                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Data Flow Architecture

```
┌─────────────┐
│    User     │
└──────┬──────┘
       │ types message
       ▼
┌─────────────────────────────────────────────────────────────┐
│                      ChatInput                               │
│  [Text Field]  [Send Button]  [Voice Controls]             │
└───────────────────────┬─────────────────────────────────────┘
                        │ sendMessage()
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    useChat Hook                              │
│  1. Add user message to store                               │
│  2. Show typing indicator                                   │
│  3. Call responseEngine.getResponse()                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                  Response Engine                             │
│  - Keyword matching                                          │
│  - Category selection                                        │
│  - Random response pick                                      │
│  - Return: {text, emotion, animation, followUpPrompts}      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                   useChat Hook                               │
│  4. Add assistant message to store                          │
│  5. Update character state (emotion, animation)             │
│  6. Hide typing indicator                                   │
│  7. Trigger TTS (store.speak())                             │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴─────────────────┐
        ▼                                 ▼
┌────────────────┐              ┌──────────────────┐
│  MessageList   │              │  VoiceController │
│  - Display msg │              │  - Web Speech    │
│  - Auto-scroll │              │  - Play audio    │
└────────────────┘              └────────┬─────────┘
                                         │
                                         ▼
                                ┌────────────────────┐
                                │  MayaCharacter     │
                                │  - Sync talking    │
                                │  - Play animation  │
                                └────────────────────┘
```

---

## 3. State Management (Zustand Store)

```
┌───────────────────────────────────────────────────────────────┐
│                        chatStore                               │
├───────────────────────────────────────────────────────────────┤
│  STATE                                                         │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  messages: Message[]                                     │ │
│  │  isTyping: boolean                                       │ │
│  │  currentEmotion: EmotionType                             │ │
│  │  currentAnimation: AnimationType                         │ │
│  │  voiceEnabled: boolean                                   │ │
│  │  isSpeaking: boolean                                     │ │
│  │  currentUtterance: SpeechSynthesisUtterance | null       │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                                │
│  ACTIONS                                                       │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  addMessage(msg)      → Append to messages[]            │ │
│  │  setTyping(bool)      → Update isTyping                 │ │
│  │  setEmotion(emotion)  → Update currentEmotion           │ │
│  │  setAnimation(anim)   → Update currentAnimation         │ │
│  │  toggleVoice()        → Toggle voiceEnabled             │ │
│  │  speak(text)          → Create utterance, call TTS      │ │
│  │  stopSpeaking()       → Cancel TTS, reset state         │ │
│  │  clearMessages()      → Reset messages[]                │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘

┌────────────────────┐     ┌────────────────────┐
│   Components       │────▶│   Zustand Store    │
│   - ChatPanel      │     │   (Global State)   │
│   - MayaCharacter  │◀────│                    │
│   - VoiceController│     │                    │
└────────────────────┘     └────────────────────┘
```

---

## 4. Component Hierarchy

```
App.tsx
│
└── Layout.tsx (split screen container)
    │
    ├── Viewport3D.tsx (left 50%)
    │   │
    │   └── Canvas (React Three Fiber)
    │       │
    │       └── Scene.tsx
    │           ├── Lighting (ambient, directional, point)
    │           ├── Environment (backdrop)
    │           ├── MayaCharacter.tsx
    │           │   ├── Head Group
    │           │   │   ├── Head mesh
    │           │   │   ├── Eyes (blinking)
    │           │   │   ├── Jaw (talking animation)
    │           │   │   └── Hair
    │           │   ├── Body mesh
    │           │   ├── Left Arm
    │           │   └── Right Arm
    │           ├── Ground plane
    │           └── OrbitControls
    │
    └── ChatPanel.tsx (right 50%)
        │
        ├── ChatHeader.tsx
        │   ├── Avatar icon
        │   ├── Title: "Cikgu Maya"
        │   ├── StatusBadge.tsx (ready/thinking/speaking)
        │   └── Settings button
        │
        ├── MessageList.tsx (scrollable)
        │   ├── MessageBubble.tsx (role: user)
        │   │   ├── Content
        │   │   └── Timestamp
        │   ├── MessageBubble.tsx (role: assistant)
        │   │   ├── Content
        │   │   └── Timestamp
        │   └── TypingIndicator.tsx (when isTyping)
        │
        ├── ChatInput.tsx
        │   ├── TextArea
        │   ├── Send Button
        │   └── VoiceController.tsx
        │       ├── Play button
        │       ├── Stop button
        │       ├── Replay button
        │       └── Voice toggle
        │
        └── SuggestedPrompts.tsx
            ├── PromptChip: "Who needs my attention?"
            ├── PromptChip: "How is Form 4S1?"
            └── PromptChip: "Show at-risk students"
```

---

## 5. Animation State Machine

```
┌────────────────────────────────────────────────────────────┐
│              Animation State Machine                        │
└────────────────────────────────────────────────────────────┘

     ┌──────────┐
     │   IDLE   │ (default state)
     │  - Breathing
     │  - Blinking
     │  - Head sway
     └─────┬────┘
           │
           │ User sends message
           ▼
     ┌──────────┐
     │ THINKING │ (AI processing)
     │  - Hand to chin
     │  - Head tilt
     └─────┬────┘
           │
           │ Response ready
           ▼
  ┌─────────────────────┐
  │  Response Category  │
  └──────────┬──────────┘
             │
    ┌────────┴────────┬────────────┬───────────┬──────────┐
    │                 │            │           │          │
    ▼                 ▼            ▼           ▼          ▼
┌──────┐      ┌──────────┐  ┌──────────┐  ┌──────┐  ┌─────────┐
│ WAVE │      │ THINKING │  │ POINTING │  │ NOD  │  │ TALKING │
│ 2s   │      │    3s    │  │    2s    │  │ 1.5s │  │ dynamic │
└──┬───┘      └────┬─────┘  └────┬─────┘  └──┬───┘  └────┬────┘
   │               │             │            │           │
   │               │             │            │           │
   └───────────────┴─────────────┴────────────┴───────────┘
                           │
                           │ Animation complete
                           ▼
                    ┌──────────┐
                    │   IDLE   │
                    └──────────┘

Notes:
- TALKING animation plays during TTS speech
- Other animations have fixed durations
- After animation complete, return to IDLE
- IDLE always active in background (breathing, blinking)
```

---

## 6. Response Engine Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Message Input                        │
│                   "Who needs my attention?"                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Normalize & Tokenize                            │
│  - Convert to lowercase                                      │
│  - Trim whitespace                                           │
│  - Extract keywords                                          │
│  Result: "who needs my attention"                            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Category Matching (Loop)                        │
│  For each category in RESPONSE_DATABASE:                    │
│    Check if message contains any trigger keywords           │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴─────────────────┐
        │                                 │
        ▼ Match Found                    ▼ No Match
┌────────────────────┐          ┌──────────────────┐
│  Category: at_risk │          │  Try next category
│  Triggers:         │          │  ...             │
│  - risk            │          │  ...             │
│  - attention ✓     │          └──────────────────┘
│  - concern         │                   │
│  - help            │                   │
│  - struggling      │                   ▼
└──────┬─────────────┘          ┌──────────────────┐
       │                        │  All categories  │
       │                        │  checked, no     │
       │                        │  match found     │
       │                        └────────┬─────────┘
       │                                 │
       │                                 ▼
       │                        ┌──────────────────┐
       │                        │  Use DEFAULT     │
       │                        │  category        │
       │                        └────────┬─────────┘
       │                                 │
       └─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Select Random Response                          │
│  responses: [response1, response2, response3]               │
│  Pick random index → response2                              │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Build Response Object                           │
│  {                                                           │
│    text: "Based on your 3 classes, here are students...",  │
│    emotion: 'concerned',                                    │
│    animation: 'pointing',                                   │
│    followUpPrompts: [                                       │
│      "Why is Ahmad struggling?",                            │
│      "Prepare intervention plan",                           │
│      "Compare to last month"                                │
│    ]                                                         │
│  }                                                           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Return to useChat Hook                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Voice Integration Flow

```
┌─────────────────────────────────────────────────────────────┐
│          Assistant Message Added to Store                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
                  ┌──────────┐
                  │ Voice    │ No
                  │ Enabled? ├────► Skip TTS
                  └────┬─────┘
                       │ Yes
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              Create SpeechSynthesisUtterance                 │
│  const utterance = new SpeechSynthesisUtterance(text)       │
│  utterance.rate = 0.9                                       │
│  utterance.pitch = 1.1                                      │
│  utterance.lang = 'en-MY'                                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Select Voice (Browser API)                      │
│  const voices = window.speechSynthesis.getVoices()          │
│  Preference:                                                │
│    1. Malaysian English (en-MY)                             │
│    2. Any English voice (en-*)                              │
│    3. Browser default                                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Setup Event Handlers                            │
│  utterance.onstart  → setIsSpeaking(true)                   │
│                     → setAnimation('talking')               │
│  utterance.onend    → setIsSpeaking(false)                  │
│                     → setAnimation('idle')                  │
│  utterance.onerror  → setIsSpeaking(false)                  │
│                     → setAnimation('idle')                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Start Speech Synthesis                          │
│  window.speechSynthesis.speak(utterance)                    │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┴──────────────┐
        │                              │
        ▼ Speaking                     ▼ User clicks stop
┌─────────────────┐          ┌──────────────────────┐
│  MayaCharacter  │          │  stopSpeaking()      │
│  - Jaw moves    │          │  - Cancel synthesis  │
│  - Talking anim │          │  - Reset state       │
└────────┬────────┘          └──────────┬───────────┘
         │                              │
         │ Speech ends                  │
         └──────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Return to Idle State                            │
│  - Stop talking animation                                   │
│  - Play idle animation                                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Message Lifecycle

```
1. User Action
   ↓
2. ChatInput: sendMessage("Hello")
   ↓
3. useChat Hook
   ├─► Add user message to store
   │   { role: 'user', content: 'Hello', timestamp: now }
   │
   ├─► Set typing indicator: true
   │
   ├─► Simulate thinking delay (500-1000ms)
   │
   ├─► Call responseEngine.getResponse("Hello")
   │   ↓
   │   Response Engine
   │   ├─► Match keywords → greetings category
   │   ├─► Select random response
   │   └─► Return { text, emotion, animation, followUpPrompts }
   │
   ├─► Add assistant message to store
   │   {
   │     role: 'assistant',
   │     content: 'Selamat pagi! 👋...',
   │     emotion: 'happy',
   │     animation: 'wave',
   │     timestamp: now
   │   }
   │
   ├─► Update character state
   │   ├─► setEmotion('happy')
   │   └─► setAnimation('wave')
   │
   ├─► Set typing indicator: false
   │
   ├─► Trigger TTS: speak(text)
   │   ↓
   │   Voice Controller
   │   ├─► Create utterance
   │   ├─► Start speech
   │   └─► Update animation: 'talking'
   │
   └─► After animation duration
       └─► Reset animation: 'idle'

4. UI Updates (React re-render)
   ├─► MessageList: Display new messages
   ├─► MayaCharacter: Play wave animation
   ├─► VoiceController: Speak response
   └─► SuggestedPrompts: Show follow-up prompts
```

---

## 9. Tech Stack Dependencies

```
┌────────────────────────────────────────────────────────────┐
│                    Application Layer                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              React 18 + TypeScript                    │ │
│  │  ┌────────────┐  ┌─────────────┐  ┌───────────────┐ │ │
│  │  │  UI Layer  │  │ State Layer │  │ Logic Layer   │ │ │
│  │  └────────────┘  └─────────────┘  └───────────────┘ │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
┌──────────────┐  ┌─────────────┐  ┌──────────────┐
│   Three.js   │  │   Zustand   │  │  Tailwind    │
│   + R3F      │  │   (State)   │  │   CSS        │
│   + Drei     │  │             │  │  (Styling)   │
└──────────────┘  └─────────────┘  └──────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────┐
│                   Browser APIs                            │
│  - WebGL (for 3D rendering)                              │
│  - Web Speech API (for TTS)                              │
│  - DOM APIs                                              │
└──────────────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────────────────────┐
│                   Build Tools                             │
│  - Vite (dev server, bundling)                           │
│  - TypeScript (compilation)                              │
│  - PostCSS (Tailwind processing)                         │
└──────────────────────────────────────────────────────────┘
```

---

## 10. Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Development                               │
│                                                              │
│  Developer → git push → GitHub Repository                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Webhook trigger
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Railway                                   │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  1. Detect git push                                    │ │
│  │  2. Pull latest code                                  │ │
│  │  3. Run: npm install                                  │ │
│  │  4. Run: npm run build                                │ │
│  │  5. Serve static files from dist/                     │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              Production Server                         │ │
│  │  - Static file serving                                │ │
│  │  - HTTPS enabled                                      │ │
│  │  - CDN caching                                        │ │
│  │  - Custom domain support                              │ │
│  └───────────────────────────────────────────────────────┘ │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTPS
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    End Users                                 │
│  - Desktop browsers (Chrome, Firefox, Safari, Edge)         │
│  - Mobile browsers (iOS Safari, Android Chrome)             │
└─────────────────────────────────────────────────────────────┘

Build Output:
  dist/
  ├── index.html
  ├── assets/
  │   ├── index-[hash].js      (React app bundle)
  │   ├── vendor-[hash].js     (Three.js, dependencies)
  │   └── index-[hash].css     (Tailwind styles)
  └── vite.svg

Railway Configuration (railway.json):
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "healthcheckPath": "/",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

**End of Architecture Diagrams**
