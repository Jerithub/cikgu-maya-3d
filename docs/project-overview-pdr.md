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

### Phase 3: AI Integration (IN PROGRESS 🔄)
**Status**: In Progress - Basic echo response implemented

**FR-3.1 Backend Connection**
- [ ] Set up API client for AI service
- [ ] Implement streaming responses
- [ ] Handle loading and error states

**FR-3.2 Response Generation**
- [ ] Send user message to AI backend
- [ ] Parse AI response for emotion markers
- [ ] Extract animation cues from response
- [ ] Display text in chat panel

**FR-3.3 Audio Synchronization**
- [ ] Text-to-speech integration
- [ ] Sync jaw movement to audio amplitude
- [ ] Handle audio playback controls (mute/pause)

### Phase 4: Polish & Enhancement (PLANNED)
**Status**: Pending

**FR-4.1 Enhanced Animations**
- [x] Add pointing gesture (completed in Phase 1.5)
- [ ] Implement hand gestures for emphasis
- [ ] Add walking animation (future scene exploration)

**FR-4.2 UI Improvements**
- [ ] Add settings panel
- [ ] Theme customization
- [ ] Animation controls (manual trigger)
- [ ] Export chat history

**FR-4.3 Performance**
- [ ] Optimize 3D rendering
- [ ] Lazy load heavy assets
- [ ] Implement code splitting
- [ ] Add analytics/monitoring

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

### Q1 2025: Foundation
- ✅ Phase 1 complete (2025-12-27)
- ✅ Phase 1.5: 3D Scene complete (2025-12-27)
- ✅ Phase 2: Chat interface complete (2025-12-27)
- 🔄 Phase 3: AI integration (in progress)

### Q2 2025: Enhancement
- 📅 Phase 4: Polish & enhancements (March-April 2025)
- 📅 User testing and iteration (May 2025)
- 📅 Beta launch (June 2025)

### Q3-Q4 2025: Scale
- 📅 Public launch (July 2025)
- 📅 Feature expansion based on feedback
- 📅 Performance optimization
- 📅 Mobile app consideration

## Open Questions

1. **AI Backend**: Which AI service to use? (OpenAI, Anthropic, local models?)
2. **Voice Integration**: TTS provider selection and cost implications
3. **Data Privacy**: Chat data storage and retention policies
4. **Localization**: Multi-language support requirements
5. **Monetization**: Business model (freemium, subscription, educational licensing?)

## Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-12-27 | 0.0.2 | Phase 3 completion: Chat interface with 7 new components (ChatPanel, ChatHeader, MessageList, MessageBubble, ChatInput, SuggestedPrompts, TypingIndicator), StatusBadge, lucide-react integration, echo responses | docs-manager |
| 2025-12-27 | 0.0.1 | Phase 1.5 completion: Scene.tsx, Viewport3D.tsx, pointing animation, audio sync, path aliases, code splitting | docs-manager |
| 2025-12-27 | 0.0.0 | Initial PDR creation, Phase 1 completion | docs-manager |
