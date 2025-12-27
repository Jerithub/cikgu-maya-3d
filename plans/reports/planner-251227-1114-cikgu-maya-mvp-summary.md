# Cikgu Maya 3D MVP - Implementation Plan Summary

**Plan:** `plans/251227-1114-cikgu-maya-3d-mvp/plan.md`
**Created:** 27 Dec 2025, 11:14 AM
**Timeline:** 3-5 days (Quick MVP)

---

## Key Decisions

✅ **Keep geometric character** - Existing MayaCharacter.tsx (lightweight, functional)
✅ **Web Speech API only** - Zero config, instant TTS
✅ **Basic keyword matching** - 7 response categories, demo-ready
✅ **Zustand state management** - Lightweight, simple
✅ **Tailwind CSS** - Rapid UI development

---

## Architecture Overview

### Component Structure
```
App → Layout
  ├── Viewport3D → Scene → MayaCharacter (existing, enhanced)
  └── ChatPanel
      ├── ChatHeader (branding, status)
      ├── MessageList (scrollable history)
      ├── ChatInput (text + voice controls)
      └── SuggestedPrompts (quick actions)
```

### State Management (Zustand)
- Messages array (user/assistant)
- Character state (emotion, animation)
- Voice state (enabled, speaking)
- Actions (addMessage, speak, setAnimation)

### Response Engine
- 7 categories: greetings, student_queries, at_risk, class_overview, parent_meeting, encouragement, default
- Keyword matching algorithm
- 3-5 responses per category
- Emotion + animation mapping
- Follow-up prompts

---

## Development Phases

### Phase 1: Foundation (Day 1)
- Install Zustand, Tailwind
- Create directory structure
- Setup Zustand store
- Build Layout component

### Phase 2: 3D Scene (Day 1-2)
- Create Scene.tsx wrapper
- Enhance MayaCharacter:
  - Add `pointing` animation
  - Sync jaw with audio amplitude
- Add OrbitControls
- Test all 6 animations

### Phase 3: Chat Interface (Day 2)
- Build all chat components
- MessageBubble (user/assistant)
- ChatInput with controls
- SuggestedPrompts chips
- TypingIndicator

### Phase 4: Mock AI Engine (Day 2-3)
- Create mockResponses.ts database
- Build responseEngine.ts (keyword matching)
- Create useChat.ts hook
- Integrate with UI
- Test all response categories

### Phase 5: Voice Integration (Day 3)
- WebSpeechProvider wrapper
- Integrate TTS into Zustand
- Auto-play on assistant response
- Sync talking animation
- Voice enable/disable toggle

### Phase 6: Polish & UX (Day 4)
- Implement Tailwind design system
- Smooth transitions
- Keyboard shortcuts
- Mobile responsiveness
- Error handling
- Accessibility

### Phase 7: Testing & Deployment (Day 5)
- Production build
- Performance optimization
- Railway deployment
- Create README

---

## Technical Stack

**Core:**
- React 18 + TypeScript
- Three.js + React Three Fiber + Drei
- Zustand (state)
- Tailwind CSS (styling)
- Web Speech API (TTS)
- Vite (build)

**New Dependencies:**
```bash
npm install zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## File Structure (New Components)

```
src/
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx (new)
│   │   └── Viewport3D.tsx (new)
│   ├── chat/
│   │   ├── ChatPanel.tsx (new)
│   │   ├── ChatHeader.tsx (new)
│   │   ├── MessageList.tsx (new)
│   │   ├── MessageBubble.tsx (new)
│   │   ├── ChatInput.tsx (new)
│   │   ├── SuggestedPrompts.tsx (new)
│   │   └── TypingIndicator.tsx (new)
│   ├── layout/
│   │   └── Layout.tsx (new)
│   └── ui/
│       └── StatusBadge.tsx (new)
├── lib/
│   ├── ai/
│   │   ├── mockResponses.ts (new)
│   │   ├── responseEngine.ts (new)
│   │   └── responseProvider.ts (new)
│   ├── animations/
│   │   └── animationConfig.ts (new)
│   └── voice/
│       └── webSpeechProvider.ts (new)
├── hooks/
│   └── useChat.ts (new)
├── store/
│   └── chatStore.ts (new)
└── types/
    ├── message.ts (new)
    ├── animation.ts (new)
    └── voice.ts (new)
```

---

## Response Categories

1. **Greetings** → wave animation, happy emotion
2. **Student queries** → thinking animation, neutral emotion
3. **At-risk students** → pointing animation, concerned emotion
4. **Class overview** → nod animation, neutral emotion
5. **Parent meeting** → thinking animation, neutral emotion
6. **Encouragement** → nod animation, encouraging emotion
7. **Default** → thinking animation, neutral emotion

---

## Success Metrics

MVP must achieve:
- ✅ 3D character loads < 3 seconds
- ✅ All 6 animations work smoothly
- ✅ Voice auto-plays with natural speech
- ✅ Chat responses feel warm/helpful
- ✅ Works on desktop Chrome, Firefox, Safari
- ✅ Deployed to Railway

---

## Next Action

Begin **Phase 1: Foundation**

```bash
# Install dependencies
npm install zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Create directory structure
mkdir -p src/{components/{3d,chat,layout,ui,voice},lib/{ai,animations,voice},hooks,store,types}

# Create chatStore.ts (see plan Section 2.1)
# Create Layout.tsx
# Configure Tailwind
```

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Web Speech API unavailable | Detect support, disable gracefully |
| Performance on low-end devices | Optimize 3D, disable shadows on mobile |
| Robotic responses | Diverse responses, Cikgu Maya persona |
| Animation sync issues | Extensive testing, timed fallbacks |

---

## Future Enhancements

After MVP:
- Google Cloud TTS (better voice quality)
- Real Claude API integration
- Context-aware conversations
- Mobile PWA
- Realistic 3D model
- Malay language support
- Analytics dashboard

---

**Plan Status:** Ready for implementation
**Estimated Duration:** 3-5 days
**Deployment Target:** Railway
