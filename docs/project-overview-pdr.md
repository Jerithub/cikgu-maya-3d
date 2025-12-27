# Project Overview & Product Development Requirements (PDR)

**Last Updated:** 2025-12-27
**Project:** Cikgu Maya 3D
**Version:** 0.0.0

## Executive Summary

Cikgu Maya 3D is an interactive educational assistant featuring a procedurally animated 3D character. The application provides an engaging learning experience through real-time chat interactions with a virtual teacher who can express emotions and perform contextual animations.

## Vision Statement

To create an accessible, engaging, and pedagogically effective 3D virtual teaching assistant that enhances learning through expressive character animations and natural conversation.

## Core Value Propositions

1. **Visual Engagement**: 3D animated character with expressive emotions and gestures
2. **Accessibility**: Web-based, no downloads required, responsive on all devices
3. **Pedagogical Effectiveness**: Multi-modal learning (visual + verbal)
4. **Technical Excellence**: Modern tech stack with performance optimization

## Target Users

- **Primary**: Students seeking interactive learning assistance
- **Secondary**: Educators looking for supplementary teaching tools
- **Tertiary**: Parents monitoring their children's learning

## Functional Requirements

### Phase 1: Foundation (COMPLETED ✅)
**Status**: Complete as of 2025-12-27

**FR-1.1 Project Setup**
- [x] Initialize React + TypeScript + Vite project
- [x] Configure Three.js and React Three Fiber
- [x] Set up development tooling (ESLint, Prettier)
- [x] Configure path aliases (@/*) in tsconfig and vite
- [x] Set up code splitting for vendors (react, three, state)

**FR-1.2 3D Character Base**
- [x] Create procedural Maya character with primitive shapes
- [x] Implement 6 base animations: idle, talking, wave, nod, thinking, pointing
- [x] Add automatic eye blinking (every 3-5 seconds)
- [x] Implement breathing animation

**FR-1.3 State Management**
- [x] Set up Zustand store for chat state
- [x] Define message types and interfaces
- [x] Implement emotion and animation state tracking

**FR-1.4 UI Foundation**
- [x] Create responsive split layout (3D viewport | Chat panel)
- [x] Implement Tailwind CSS with Maya design system
- [x] Define color palette and typography
- [x] Mobile-responsive design

**FR-1.5 3D Scene Architecture**
- [x] Create Scene.tsx with Canvas, lighting, environment
- [x] Add OrbitControls for camera interaction
- [x] Configure three-point lighting system
- [x] Create Viewport3D.tsx wrapper component
- [x] Integrate audio amplitude for talking animation sync

### Phase 2: Chat Interface (COMPLETED ✅)
**Status**: Complete as of 2025-12-27

**FR-2.1 Message Display**
- [x] Render chat messages in scrollable area (MessageList.tsx)
- [x] Style user vs assistant messages differently (MessageBubble.tsx)
- [x] Display timestamps (formatted HH:MM)
- [x] Show emotion/animation tags for debugging

**FR-2.2 Input Component**
- [x] Text input field with auto-resize (ChatInput.tsx)
- [x] Send button (keyboard shortcut: Enter)
- [x] Character limit indicator (500 char limit)
- [x] Placeholder prompts

**FR-2.3 Message Management**
- [x] Add user messages to store (ChatPanel.tsx)
- [x] Display typing indicator during AI response (TypingIndicator.tsx)
- [x] Add assistant responses to store (echo response for now)
- [x] Scroll to latest message automatically (MessageList.tsx)

**FR-2.4 Character Integration**
- [x] Update character animation based on message content
- [x] Display emotion during response
- [x] Smooth transitions between animations

**FR-2.5 UI Components**
- [x] ChatPanel with header, messages, input, suggestions
- [x] StatusBadge (ready/thinking/speaking states)
- [x] ChatHeader with avatar and status
- [x] SuggestedPrompts chips for quick actions
- [x] lucide-react icon library integration

### Phase 3: Mock AI Engine (COMPLETED ✅)
**Status**: Complete as of 2025-12-27

**FR-3.1 Mock Response Engine**
- [x] Create MockResponseEngine class with keyword matching
- [x] Implement 7 response categories (greetings, student_queries, at_risk_students, class_overview, parent_meeting, encouragement, default)
- [x] Add emotion and animation triggers for each response
- [x] Generate contextual follow-up prompts

**FR-3.2 Malaysian Teacher Context**
- [x] Create Malaysian student personas (Ahmad, Siti, Lee Wei Ming)
- [x] Add school context (Form 4S1, 4S2, 5S1 classes)
- [x] Include Malaysian greetings (Selamat, Salam)
- [x] Create realistic teaching scenarios

**FR-3.3 Response Integration**
- [x] Create useChat hook for orchestrating AI flow
- [x] Implement animation timing with automatic return to idle
- [x] Add emotion and animation state updates
- [x] Handle follow-up prompt suggestions

### Phase 4: Voice Integration (COMPLETED ✅)
**Status**: Complete as of 2025-12-27

**FR-4.1 Text-to-Speech**
- [x] Integrate Web Speech API (SpeechSynthesis)
- [x] Configure en-MY voice with fallback to English
- [x] Set voice parameters (rate: 0.9, pitch: 1.1)
- [x] Handle TTS events (start, end, error)

**FR-4.2 Voice Controls**
- [x] Add voice toggle button in ChatHeader (Volume2/VolumeX icons)
- [x] Implement voiceEnabled state in chatStore
- [x] Add isSpeaking state for UI feedback
- [x] Auto-sync talking animation during speech

**FR-4.3 Speaking State Management**
- [x] Update character to 'talking' animation when speaking
- [x] Return to 'idle' animation after speech completes
- [x] Handle voice interruption (toggle off during speech)
- [x] Display 'speaking' status in StatusBadge

### Phase 5: Polish & UX (COMPLETED ✅)
**Status**: Complete as of 2025-12-27

**FR-5.1 Animation Polish**
- [x] All 6 animations working smoothly (idle, talking, wave, nod, thinking, pointing)
- [x] Automatic blinking (every 3-5 seconds)
- [x] Breathing animation (subtle vertical movement)
- [x] Smooth transitions between animations (THREE.MathUtils.lerp)

**FR-5.2 UI Improvements**
- [x] Voice toggle button with icon feedback (Volume2/VolumeX)
- [x] StatusBadge with 3 states (ready/thinking/speaking)
- [x] Smooth auto-scroll in MessageList
- [x] Character counter in ChatInput (color-coded)

**FR-5.3 Keyboard Shortcuts**
- [x] Enter to send message
- [x] Shift+Enter for newline
- [ ] Future: Escape to clear input, / for commands

### Phase 6: Deployment Setup (COMPLETED ✅)
**Status**: Complete as of 2025-12-27

**FR-6.1 Docker Configuration**
- [x] Multi-stage Dockerfile (node:20-alpine → nginx:alpine)
- [x] nginx.conf with SPA routing and asset caching
- [x] Gzip compression enabled
- [x] Cache headers for assets (1 year expiry)

**FR-6.2 Railway Deployment**
- [x] railway.json with build configuration
- [x] Auto-detect static site via Dockerfile
- [x] Configured restart policy (ON_FAILURE, 10 retries)

**FR-6.3 Production Build**
- [x] Vite production build optimized
- [x] Code splitting for vendors (react, three, state)
- [x] Path aliases configured (@/)

### Phase 7: Future Enhancements (PLANNED)
**Status**: Pending - Post-MVP

**FR-7.1 Real AI Integration**
- [ ] Connect to OpenAI/Anthropic API
- [ ] Implement streaming responses
- [ ] Add request/response interceptors
- [ ] Handle rate limiting and errors

**FR-7.2 Advanced Features**
- [ ] Settings panel (theme, animation speed, voice selection)
- [ ] Export chat history (JSON/CSV)
- [ ] IndexedDB persistence for conversations
- [ ] Service Worker for offline support

**FR-7.3 Enhanced Voice**
- [ ] Voice input (Web Speech API SpeechRecognition)
- [ ] Multiple voice options
- [ ] Voice speed and pitch controls
- [ ] Visual audio waveform during speech

## Non-Functional Requirements

### Performance
- **NFR-P1**: 3D viewport maintains 60 FPS on modern devices
- **NFR-P2**: Initial load time < 3 seconds on 4G connection
- **NFR-P3**: Chat response latency < 1 second (excluding AI processing)

### Accessibility
- **NFR-A1**: WCAG 2.1 AA compliance
- **NFR-A2**: Keyboard navigation for all interactions
- **NFR-A3**: Screen reader compatibility
- **NFR-A4**: High contrast mode support

### Browser Compatibility
- **NFR-B1**: Chrome/Edge 90+
- **NFR-B2**: Firefox 88+
- **NFR-B3**: Safari 14+
- **NFR-B4**: Mobile browsers (iOS Safari, Chrome Mobile)

### Security
- **NFR-S1**: HTTPS only in production
- **NFR-S2**: API key security (environment variables)
- **NFR-S3**: Input sanitization for XSS prevention
- **NFR-S4**: Rate limiting on API calls

### Maintainability
- **NFR-M1**: TypeScript strict mode enabled
- **NFR-M2**: Component documentation via JSDoc
- **NFR-M3**: Test coverage > 80% for critical paths
- **NFR-M4**: Linting passes without warnings

## Technical Constraints

### Dependencies
- React 18+ (Concurrent features)
- Three.js 0.170+ (WebGL 2 required)
- Modern browser with ES2020 support

### Platform Limitations
- WebGL 2.0 required for 3D rendering
- No Internet Explorer support
- Mobile devices may have reduced visual fidelity

## Success Metrics

### User Engagement
- Average session duration > 5 minutes
- Return user rate > 30%
- Average messages per session > 10

### Technical Performance
- 95th percentile load time < 5 seconds
- Error rate < 0.1%
- 99.9% uptime

### Educational Impact
- User satisfaction score > 4.0/5.0
- Perceived learning effectiveness > 4.0/5.0
- Character engagement rating > 4.0/5.0

## Risk Assessment

### Technical Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| 3D performance issues on low-end devices | Medium | Medium | LOD system, quality settings |
| WebGL compatibility | Low | High | Fallback to 2D mode |
| AI service downtime | Medium | High | Caching, error handling |

### Product Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| User adoption lower than expected | Medium | High | User testing, iterative improvements |
| Character feels uncanny | Medium | Medium | Animation refinement, user feedback |

## Roadmap

### Q1 2025: MVP Complete ✅
- ✅ Phase 1: Foundation complete (2025-12-27)
- ✅ Phase 2: Chat interface complete (2025-12-27)
- ✅ Phase 3: Mock AI engine complete (2025-12-27)
- ✅ Phase 4: Voice integration complete (2025-12-27)
- ✅ Phase 5: Polish & UX complete (2025-12-27)
- ✅ Phase 6: Deployment setup complete (2025-12-27)

### Q2 2025: Post-MVP Enhancements
- 📅 Phase 7: Real AI integration (OpenAI/Anthropic)
- 📅 User testing and iteration
- 📅 Beta launch
- 📅 Performance optimization based on feedback

### Q3-Q4 2025: Scale
- 📅 Public launch (July 2025)
- 📅 Feature expansion based on feedback
- 📅 Performance optimization
- 📅 Mobile app consideration

## Open Questions

1. **AI Backend Selection**: Which AI service for Phase 7? (OpenAI, Anthropic, local models?)
2. **Data Privacy**: Chat data storage and retention policies
3. **Localization**: Multi-language support (Bahasa Malaysia, Chinese, Tamil)
4. **Monetization**: Business model (freemium, subscription, educational licensing?)

## Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-12-27 | 1.0.0 | MVP COMPLETE: All 7 phases done. Phase 3-6 additions: Mock AI Engine (7 categories), Voice Integration (Web Speech API, en-MY), useChat hook, voice toggle, deployment configs (Docker, nginx, Railway) | docs-manager |
| 2025-12-27 | 0.0.2 | Phase 2 completion: Chat interface with 7 components (ChatPanel, ChatHeader, MessageList, MessageBubble, ChatInput, SuggestedPrompts, TypingIndicator), StatusBadge, lucide-react, echo responses | docs-manager |
| 2025-12-27 | 0.0.1 | Phase 1.5 completion: Scene.tsx, Viewport3D.tsx, pointing animation, audio sync, path aliases, code splitting | docs-manager |
| 2025-12-27 | 0.0.0 | Initial PDR creation, Phase 1 completion | docs-manager |
