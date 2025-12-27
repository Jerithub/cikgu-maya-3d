# Cikgu Maya 3D Interactive Assistant - Product Requirements Document

**Version:** 1.0  
**Created:** December 26, 2024  
**Project Type:** Standalone Prototype (Separate from ScholaView)  
**Purpose:** Interactive 3D AI teaching assistant with voice, animations, and chat interface

---

## 📋 Executive Summary

### Project Overview

**Cikgu Maya 3D Prototype** is an immersive, interactive 3D AI assistant that brings the ScholaView teaching assistant to life. This standalone prototype demonstrates advanced UI/UX concepts with:

- **3D Character**: Photorealistic or stylized 3D avatar with animations
- **Voice Output**: Text-to-speech with Malaysian English accent
- **Interactive Chat**: Natural conversation interface with mock AI responses
- **Rich Animations**: Idle, talking, gesturing, and emotional expressions
- **Professional UI**: Education-grade design using UI/UX Pro Max principles

### Why This Matters

This prototype serves multiple purposes:
1. **UX Research**: Test user engagement with 3D AI assistants
2. **Sales Tool**: Demonstrate ScholaView's AI capabilities to prospects
3. **Technical Proof**: Validate 3D + AI integration before main product integration
4. **Marketing Asset**: Create compelling visuals for presentations and demos

### Success Criteria

✅ 3D character loads within 3 seconds  
✅ Voice plays automatically with natural speech patterns  
✅ Chat responses feel warm and helpful (Cikgu Maya persona)  
✅ Animations sync perfectly with speech  
✅ Works on desktop and mobile browsers  
✅ Deployable as standalone GitHub Pages or Railway app  

---

## 🎯 Core Features

### Feature 1: 3D Character System

**Requirements:**
- Photorealistic or stylized 3D character representing Cikgu Maya
- Female Malaysian teacher persona (warm, professional, 30s-40s)
- Customizable appearance (clothing, hair, accessories)
- Optimized for web performance (<10MB model size)

**Technical Approach:**

- **Option A**: AI-Generated 3D Model via Meshy.ai or Rodin (fastest, customizable, production-ready)
- **Option B**: Free Model from Sketchfab/Mixamo (high quality, ready-to-use, huge animation library)
- **Option C**: Geometric Character built in Three.js (fully in ClaudeKit, no dependencies, ultra-lightweight)
- **Option D**: VRM character from VRoid Studio (free desktop app, full customization, Asian aesthetic)

**Recommended**: Option A (AI-Generated) or Option C (Three.js Geometric) for MVP

**Note:** Ready Player Me is no longer accepting new signups as of late 2024.

### Feature 2: Animation System

**Required Animations:**

| Animation | Priority | Description | Duration |
|-----------|----------|-------------|----------|
| **Idle** | P0 | Gentle breathing, blinking, subtle head movement | Loop |
| **Talking** | P0 | Lip sync or jaw movement synchronized with voice | Dynamic |
| **Wave** | P1 | Friendly greeting gesture | 2s |
| **Thinking** | P1 | Hand to chin, looking up | 3s |
| **Pointing** | P2 | Gesture to emphasize key points | 2s |
| **Nodding** | P1 | Agreement or encouragement | 1.5s |
| **Shaking Head** | P2 | Gentle disagreement or correction | 1.5s |

**Facial Expressions:**

| Expression | Trigger | Visual Cues |
|------------|---------|-------------|
| **Neutral** | Default | Soft smile, relaxed eyes |
| **Happy** | Positive responses | Wide smile, crinkled eyes |
| **Concerned** | At-risk student discussions | Furrowed brow, empathetic eyes |
| **Thinking** | Processing query | Eyes looking up/side, slight head tilt |
| **Encouraging** | Motivational responses | Warm smile, open expression |

### Feature 3: Voice System

**Requirements:**
- Natural-sounding female voice
- Malaysian English accent (or neutral Asian English)
- Warm, professional tone
- Speed: 0.9x (slightly slower for clarity)
- Pitch: 1.1x (friendly, approachable)

**Implementation Options:**

| Option | Cost | Quality | Latency | Recommendation |
|--------|------|---------|---------|----------------|
| Web Speech API | Free | ⭐⭐ | Instant | ✅ MVP |
| Google Cloud TTS | Free (1M chars/mo) | ⭐⭐⭐⭐ | ~500ms | ✅ Production |
| ElevenLabs | $5/mo (30k chars) | ⭐⭐⭐⭐⭐ | ~1s | Future |
| OpenAI TTS | $15/1M chars | ⭐⭐⭐⭐⭐ | ~800ms | Future |

**Voice Configuration:**
```javascript
{
  provider: "google_cloud_tts", // or "web_speech_api"
  voice: "en-MY-Standard-A", // Malaysian English Female
  rate: 0.9,
  pitch: 1.1,
  volume: 1.0,
  autoplay: true, // Play immediately after response
  showControls: true // Allow replay/stop
}
```

### Feature 4: Chat Interface

**UI Components:**

1. **3D Viewport** (Left 50%)
   - Full-height 3D canvas
   - Interactive camera controls (orbit, zoom)
   - Clean background (sky gradient or environment map)
   - Character info badge (name, role)

2. **Chat Panel** (Right 50%)
   - Message history (scrollable)
   - User input field
   - Send button
   - Suggested prompt chips
   - Voice control buttons (play, stop, replay)

3. **Header**
   - "Cikgu Maya" branding
   - Status indicator (ready, thinking, speaking)
   - Settings button (voice on/off, animation speed)

4. **Footer**
   - Prototype mode badge
   - Quick info ("Drag to rotate • Scroll to zoom")

**Message Types:**

```typescript
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioUrl?: string; // For voice playback
  emotion?: 'neutral' | 'happy' | 'concerned' | 'thinking';
  animation?: 'wave' | 'nod' | 'thinking' | 'point';
};
```

### Feature 5: Mock AI Response System

**Response Categories:**

The mock AI should intelligently respond based on keyword matching, maintaining Cikgu Maya's persona throughout.

**Response Database:**

```typescript
const RESPONSE_CATEGORIES = {
  greetings: {
    triggers: ['hello', 'hi', 'hey', 'good morning', 'selamat', 'salam'],
    responses: [/* array of warm greetings */],
    emotion: 'happy',
    animation: 'wave'
  },
  student_queries: {
    triggers: ['student', 'ahmad', 'performance', 'grade', 'marks'],
    responses: [/* array of student insights */],
    emotion: 'neutral',
    animation: 'thinking'
  },
  at_risk_students: {
    triggers: ['risk', 'attention', 'concern', 'help', 'struggling'],
    responses: [/* array of supportive guidance */],
    emotion: 'concerned',
    animation: 'point'
  },
  // ... more categories
};
```

**Persona Guidelines:**

Reference: `Schoolytics_AI_Assistant_Persona.md` for full persona specifications.

**Core Principles:**
- ✅ Warm, professional, colleague-like
- ✅ Data-informed, not data-obsessed
- ✅ Supportive, never judgmental
- ✅ Celebrates positives before concerns
- ✅ Respects teacher expertise
- ✅ Appropriately uncertain (no predictions)
- ✅ Malaysian education context (Form 1-5, SPM, PDPA)

### Feature 6: Audio & Sound Effects

**Sound Requirements:**

| Sound Type | Purpose | Format | Size |
|------------|---------|--------|------|
| **Ambient Background** | Soft office/classroom atmosphere | MP3/OGG | <500KB |
| **Message Received** | User sends message | MP3 | <50KB |
| **Typing Sound** | AI is thinking (optional) | MP3 | <30KB |
| **Success Chime** | Positive feedback | MP3 | <40KB |

**Audio Settings:**
- Volume control (0-100%)
- Mute toggle
- Background music on/off
- Sound effects on/off

**Accessibility:**
- All audio optional (user can disable)
- Visual indicators for audio states
- Text transcripts available
- Keyboard shortcuts (Space = play/pause)

---

## 🎨 Design System (UI/UX Pro Max)

### Design Philosophy

**Education-Grade Aesthetics**
- Clean, professional, trustworthy
- Approachable but not childish
- Warm colors, soft gradients
- Ample white space
- Clear typography hierarchy

### Color Palette

**Primary Colors:**
```css
--maya-primary: #4A90E2; /* Confident Blue */
--maya-secondary: #50C878; /* Encouraging Green */
--maya-accent: #FF6B9D; /* Warm Pink */
```

**Neutral Colors:**
```css
--maya-bg-light: #F8FAFC; /* Off-white background */
--maya-bg-gradient-start: #E0F2FE; /* Sky blue */
--maya-bg-gradient-end: #DDD6FE; /* Soft purple */
--maya-text-primary: #1E293B; /* Dark slate */
--maya-text-secondary: #64748B; /* Medium slate */
```

**Semantic Colors:**
```css
--maya-success: #10B981; /* Green */
--maya-warning: #F59E0B; /* Amber */
--maya-error: #EF4444; /* Red */
--maya-info: #3B82F6; /* Blue */
```

### Typography

**Font Stack:**
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Poppins', 'Inter', sans-serif;
--font-mono: 'Fira Code', 'Courier New', monospace;
```

**Type Scale:**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### UI Components Specification

**3D Viewport:**
- Aspect ratio: Flexible (fills container)
- Background: Gradient (`linear-gradient(180deg, #E0F2FE 0%, #DDD6FE 100%)`)
- Border radius: 0 (full viewport)
- Camera FOV: 50°
- Camera distance: 3.5 units from character

**Chat Bubble:**
```css
.message-bubble {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 15px;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-assistant {
  background: #F1F5F9;
  color: #1E293B;
  border-bottom-left-radius: 4px;
}

.message-user {
  background: #4A90E2;
  color: white;
  border-bottom-right-radius: 4px;
}
```

**Input Field:**
```css
.chat-input {
  padding: 12px 16px;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  font-size: 15px;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: #4A90E2;
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}
```

**Suggested Prompt Chips:**
```css
.prompt-chip {
  padding: 8px 16px;
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.prompt-chip:hover {
  background: #EFF6FF;
  border-color: #4A90E2;
  transform: translateY(-2px);
}
```

---

## 🏗️ Technical Architecture

### Technology Stack

**Frontend:**
- React 18.3+ (with TypeScript)
- Three.js + React Three Fiber (@react-three/fiber)
- React Three Drei (@react-three/drei) for helpers
- Tailwind CSS 3.4+ for styling
- Zustand for state management (lightweight)

**3D Assets:**
- GLB/GLTF models (3D character)
- Draco compression for optimization
- Texture compression (KTX2 format)

**Audio:**
- Web Speech API (MVP)
- Google Cloud Text-to-Speech (production)
- Howler.js for sound effects management

**Build & Deploy:**
- Vite (fast dev server, optimized builds)
- GitHub repository
- Railway deployment (or GitHub Pages)

### File Structure

```
cikgu-maya-3d/
├── public/
│   ├── models/
│   │   └── maya-avatar.glb          # 3D character model
│   ├── audio/
│   │   ├── ambient-office.mp3       # Background audio
│   │   ├── message-sent.mp3         # Sound effect
│   │   └── success.mp3              # Success chime
│   └── images/
│       ├── maya-logo.svg            # Branding
│       └── favicon.ico
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── MayaCharacter.tsx    # Main 3D character
│   │   │   ├── Scene.tsx            # Three.js scene setup
│   │   │   ├── Animations.tsx       # Animation controller
│   │   │   └── FacialExpressions.tsx
│   │   ├── chat/
│   │   │   ├── ChatPanel.tsx        # Chat container
│   │   │   ├── MessageList.tsx      # Message history
│   │   │   ├── MessageBubble.tsx    # Single message
│   │   │   ├── ChatInput.tsx        # User input
│   │   │   ├── SuggestedPrompts.tsx # Quick prompts
│   │   │   └── TypingIndicator.tsx
│   │   ├── voice/
│   │   │   ├── VoiceController.tsx  # TTS manager
│   │   │   ├── AudioPlayer.tsx      # Audio playback
│   │   │   └── VoiceSettings.tsx    # Voice config
│   │   └── ui/
│   │       ├── Header.tsx           # App header
│   │       ├── Footer.tsx           # Info footer
│   │       └── SettingsPanel.tsx    # User settings
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── mockResponses.ts     # Response database
│   │   │   ├── responseEngine.ts    # Keyword matching
│   │   │   └── persona.ts           # Cikgu Maya persona
│   │   ├── animations/
│   │   │   ├── animationConfig.ts   # Animation definitions
│   │   │   └── expressionMap.ts     # Emotion → Expression
│   │   └── audio/
│   │       ├── ttsProvider.ts       # TTS abstraction
│   │       └── soundEffects.ts      # Sound management
│   ├── hooks/
│   │   ├── useChat.ts               # Chat state management
│   │   ├── useVoice.ts              # Voice control
│   │   ├── useAnimations.ts         # Animation control
│   │   └── use3DCharacter.ts        # 3D model loading
│   ├── store/
│   │   └── chatStore.ts             # Zustand store
│   ├── types/
│   │   ├── message.ts               # Message types
│   │   ├── animation.ts             # Animation types
│   │   └── voice.ts                 # Voice types
│   ├── styles/
│   │   └── globals.css              # Global styles
│   ├── App.tsx                      # Root component
│   └── main.tsx                     # Entry point
├── .env.example                     # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── README.md
└── railway.json                     # Railway config
```

### State Management

```typescript
// chatStore.ts
interface ChatState {
  messages: Message[];
  isTyping: boolean;
  currentEmotion: Emotion;
  currentAnimation: Animation;
  voiceEnabled: boolean;
  isSpeaking: boolean;
  
  // Actions
  addMessage: (message: Message) => void;
  setTyping: (isTyping: boolean) => void;
  setEmotion: (emotion: Emotion) => void;
  playAnimation: (animation: Animation) => void;
  toggleVoice: () => void;
  speakMessage: (text: string) => void;
  stopSpeaking: () => void;
}
```

### API Abstraction (for future real AI)

```typescript
// ai/responseEngine.ts
interface ResponseEngine {
  getResponse(userMessage: string): Promise<Response>;
}

// Mock implementation (MVP)
class MockResponseEngine implements ResponseEngine {
  async getResponse(userMessage: string): Promise<Response> {
    // Keyword matching logic
    // Returns mock response from database
  }
}

// Real implementation (future)
class ClaudeResponseEngine implements ResponseEngine {
  async getResponse(userMessage: string): Promise<Response> {
    // Call Anthropic API
    // Use function calling for data queries
  }
}
```

---

## 🎭 3D Character Design

### Character Specifications

**Physical Appearance:**
- **Age**: 35-40 years old
- **Ethnicity**: Malaysian (flexible, could be Malay, Chinese, Indian, or mixed)
- **Gender**: Female
- **Height**: Average (5'4" / 163cm)
- **Build**: Average/professional
- **Hair**: Shoulder-length, neat, professional style
- **Clothing**: Business casual (blouse + pants or modest dress)
- **Accessories**: Optional glasses, simple jewelry

**Facial Features:**
- Warm, kind eyes
- Friendly smile (default expression)
- Approachable, trustworthy appearance
- Natural makeup (if any)

**Color Scheme:**
- Clothing: Blue, teal, or green tones (professional, calming)
- Hair: Natural black/dark brown
- Skin: Natural Malaysian skin tones

### 3D Character Creation Options (Detailed)

**IMPORTANT:** Ready Player Me is no longer accepting new signups. Use one of these alternatives instead.

---

#### **Option A: AI-Generated 3D Model** ⭐ RECOMMENDED

**Using Meshy.ai (Free Tier):**

1. **Sign Up:**
   - Go to https://www.meshy.ai/
   - Create free account (200 credits/month)

2. **Create Character:**
   - Select "Text to 3D"
   - Use this prompt:
   ```
   Professional Malaysian female teacher, age 35-40, wearing teal 
   business casual blouse and dark pants, shoulder-length black hair 
   in professional style, warm friendly smile, standing pose with 
   arms relaxed at sides, clean simple style, optimized for web games, 
   low-poly, good topology for rigging, suitable for real-time rendering
   ```
   - Advanced settings:
     * Art Style: Realistic
     * Poly Count: Low (for web performance)
     * Auto-rig: Yes
     * Texture Resolution: 1024x1024

3. **Download:**
   - Wait 2-3 minutes for generation
   - Download as GLB format
   - Model comes auto-rigged and ready to animate

4. **Cost:** FREE (uses ~20 credits, free tier has 200/month)

**Alternative AI Services:**
- **Rodin** (https://hyperhuman.deemos.com/rodin) - Also has free tier
- **Luma AI** (https://lumalabs.ai/genie) - Text/image to 3D

---

#### **Option B: Free Model Libraries** 

**Sketchfab (Huge Selection):**

1. **Search & Filter:**
   - Go to https://sketchfab.com/
   - Search: "female professional character" OR "teacher" OR "business woman"
   - Filters:
     * Downloadable: Yes
     * Price: Free
     * Rigged: Yes
     * Animated: Optional (we'll add our own)
     * Low-poly: Yes
     * Format: GLB/glTF

2. **Check License:**
   - Look for CC-BY (attribution required but free)
   - CC0 (public domain, no attribution needed)
   - Read terms carefully

3. **Download:**
   - Download GLB or GLTF format
   - If FBX, convert using online converter

4. **Attribution:**
   - Add creator credit in your app footer/credits

**Mixamo (Adobe - Completely Free):**

1. **Browse Characters:**
   - Go to https://www.mixamo.com/
   - Browse character library
   - Look for professional female characters

2. **Customize & Download:**
   - Select character
   - Can apply animations directly
   - Download as FBX
   - Convert FBX → GLB using: https://products.aspose.app/3d/conversion/fbx-to-glb

3. **Animations:**
   - Mixamo has 2000+ free animations
   - Download: Talking, Waving, Nodding, Pointing, Idle
   - All compatible with downloaded character

4. **Cost:** 100% FREE

---

#### **Option C: Build in Three.js** ⭐ FULLY IN CLAUDEKIT

**This option requires NO external models - ClaudeKit generates everything!**

**What ClaudeKit Will Create:**
```javascript
// Stylized character built from Three.js primitives
const character = {
  head: SphereGeometry,
  body: CapsuleGeometry,
  arms: CylinderGeometry,
  hands: SphereGeometry,
  // ... with proper proportions, materials, colors
};
```

**Advantages:**
- ✅ No dependencies on external services
- ✅ Ultra-lightweight (<50KB vs 5-10MB)
- ✅ Complete customization control
- ✅ Works everywhere, instantly
- ✅ No licensing concerns
- ✅ ClaudeKit generates 100% of code

**What It Looks Like:**
- Stylized/simplified character (think: Pixar-minimal)
- Clear, recognizable as human teacher
- Professional appearance
- Smooth animations
- Color-coded (teal clothing, skin tones, black hair)

**When to Use:**
- Want zero external dependencies
- Need fastest development time
- Prefer stylized over realistic
- Want complete code control

**Implementation:**
ClaudeKit will generate sophisticated geometric character in `/cook` phase.

---

#### **Option D: VRoid Studio** (Desktop App)

**Free Character Creator:**

1. **Download VRoid Studio:**
   - Windows: https://vroid.com/en/studio
   - Mac: Available on above link
   - 100% free

2. **Create Character:**
   - Launch VRoid Studio
   - Start with female preset
   - Customize:
     * Face: Mature, professional features
     * Hair: Shoulder-length, neat style
     * Eyes: Warm, friendly
     * Clothing: Business casual (built-in options)
     * Colors: Teal/blue tones
   - Time: 15-30 minutes

3. **Export:**
   - Export as VRM file
   - Convert VRM → GLB:
     * Use https://vrm.dev/en/univrm/gltf/how_to_create_glb.html
     * Or use Three.js VRM loader (works with VRM directly)

4. **Advantages:**
   - Full control over appearance
   - Asian/anime aesthetic (fits Malaysian context)
   - High quality output
   - Free animations available

5. **Cost:** FREE

---

### Recommended Workflow by Skill Level

**Total Beginner / Fastest MVP:**
→ **Option C** (Three.js geometric) - ClaudeKit does everything

**Want Realistic Character Quickly:**
→ **Option A** (AI-generated via Meshy.ai) - 5 minutes total

**Want Professional Quality + Animations:**
→ **Option B** (Mixamo) - Characters + 2000 animations free

**Want Full Creative Control:**
→ **Option D** (VRoid Studio) - 30 min creation time

---

### AI Image Reference Generation (Optional)

If you want to generate a reference image first:

**Prompt for Midjourney/DALL-E:**

```
A professional Malaysian female teacher, 35-40 years old, warm and approachable 
appearance, shoulder-length black hair, wearing a teal business casual blouse, 
friendly smile, kind eyes, standing in a relaxed pose, clean white background, 
3D character design, educational setting, professional yet friendly, Pixar-style 
quality, detailed facial features, realistic proportions, suitable for 3D modeling
```

### Animation Rig Requirements

**Required Bones/Joints:**
- Head (for nodding, looking around)
- Jaw (for talking animation)
- Eyes (for blinking, eye direction)
- Neck (for head tilt)
- Spine (for breathing)
- Shoulders, elbows, wrists (for gestures)
- Fingers (for detailed hand gestures)

**Blend Shapes (Morph Targets):**
- Mouth shapes (A, E, I, O, U, M, F, Smile, Frown)
- Eye shapes (Blink, Squint, Wide, Looking)
- Eyebrows (Raised, Furrowed, Neutral)
- Cheeks (Smile muscles)

---

## 🎬 Animation Specifications

### 1. Idle Animation

**Description**: Subtle, natural movements when not actively doing anything.

**Keyframes:**
```
Breathing (Loop: 3s):
- 0.0s: Chest neutral, shoulders neutral
- 0.75s: Chest slightly expanded, shoulders slightly raised
- 1.5s: Chest neutral, shoulders neutral
- 2.25s: Chest slightly contracted
- 3.0s: Return to start

Blinking (Random: 2-5s intervals):
- 0.0s: Eyes open
- 0.1s: Eyes closed
- 0.2s: Eyes open

Head Movement (Loop: 8s):
- 0.0s: Looking forward
- 2.0s: Slight turn left (5°)
- 4.0s: Looking forward
- 6.0s: Slight turn right (5°)
- 8.0s: Return to forward

Weight Shift (Loop: 6s):
- 0.0s: Weight centered
- 1.5s: Slight shift to left
- 3.0s: Weight centered
- 4.5s: Slight shift to right
- 6.0s: Return to center
```

### 2. Talking Animation

**Description**: Synchronized mouth/jaw movement with speech audio.

**Implementation Options:**

**Option A: Simple Jaw Movement (MVP)**
```javascript
// Sync with audio amplitude
function animateTalking(audioAmplitude) {
  const jawRotation = audioAmplitude * 0.3; // Scale amplitude
  character.skeleton.bones.jaw.rotation.z = jawRotation;
}
```

**Option B: Viseme-Based Lip Sync (Advanced)**
```javascript
// Map phonemes to mouth shapes
const visemeMap = {
  'A': { mouth: 'open_wide', jaw: 0.5 },
  'E': { mouth: 'smile', jaw: 0.2 },
  'I': { mouth: 'narrow', jaw: 0.1 },
  'O': { mouth: 'round', jaw: 0.4 },
  'U': { mouth: 'pucker', jaw: 0.3 },
  // ... more phonemes
};
```

**Talking Animation Loop (2s)**
```
Random Pattern (varies with speech):
- Jaw opens/closes at speech cadence
- Subtle head bob every 2-3 words
- Occasional eyebrow raise for emphasis
- Hand gestures every 5-8 seconds
```

### 3. Gesture Animations

**Wave (2s):**
```
0.0s: Right hand at side, neutral
0.3s: Right arm lifts, hand at shoulder height
0.5s-1.0s: Hand waves side to side (3x)
1.2s: Right arm begins to lower
1.5s: Return to neutral
2.0s: Complete return
```

**Thinking (3s):**
```
0.0s: Neutral stance
0.5s: Right hand moves toward face
1.0s: Hand rests on chin, head tilts slightly
2.0s: Head tilts back up
2.5s: Hand returns to side
3.0s: Return to neutral
```

**Pointing (2s):**
```
0.0s: Neutral stance
0.4s: Right arm extends forward
0.6s: Index finger extends, others curl
0.6s-1.4s: Hold pose (pointing)
1.6s: Hand relaxes
1.8s: Arm returns to side
2.0s: Return to neutral
```

**Nodding (1.5s):**
```
0.0s: Head neutral
0.25s: Head tilts down (15°)
0.5s: Head returns to neutral
0.75s: Head tilts down (15°)
1.0s: Head returns to neutral
1.25s: Head tilts down (10°)
1.5s: Return to neutral
```

### 4. Emotional Expressions

**Happy:**
- Wide smile (mouth blend shape)
- Eyes squint slightly (crinkle)
- Eyebrows slightly raised
- Overall "lifted" facial features

**Concerned:**
- Furrowed brow
- Slight frown
- Eyes soften
- Head tilts slightly to side (empathy)

**Thinking:**
- Eyes look up and to the side
- One eyebrow slightly raised
- Mouth neutral or slightly pursed
- Hand may move to chin

**Encouraging:**
- Warm smile
- Open eyes
- Eyebrows relaxed
- May include slight nod

### Animation Triggers

```typescript
// Animation trigger map
const animationTriggers = {
  // Greeting responses
  'hello': 'wave',
  'hi': 'wave',
  'selamat': 'wave',
  
  // Thinking/processing
  'why': 'thinking',
  'how': 'thinking',
  'analyze': 'thinking',
  
  // Positive reinforcement
  'great': 'nod',
  'good': 'nod',
  'thank': 'nod',
  
  // Pointing/emphasis
  'important': 'point',
  'notice': 'point',
  'see': 'point',
};
```

---

## 🎤 Voice System Implementation

### Voice Configuration

```typescript
// voice/ttsProvider.ts
interface TTSConfig {
  provider: 'web_speech' | 'google' | 'elevenlabs' | 'openai';
  voice: string;
  rate: number;      // 0.5 - 2.0
  pitch: number;     // 0.5 - 2.0
  volume: number;    // 0.0 - 1.0
  language: string;  // e.g., 'en-MY'
}

const defaultConfig: TTSConfig = {
  provider: 'web_speech',
  voice: 'default',
  rate: 0.9,
  pitch: 1.1,
  volume: 1.0,
  language: 'en-MY',
};
```

### Provider Implementations

**Web Speech API (MVP):**
```typescript
class WebSpeechProvider implements TTSProvider {
  private synth = window.speechSynthesis;
  
  async speak(text: string, config: TTSConfig): Promise<void> {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = config.language;
    utterance.rate = config.rate;
    utterance.pitch = config.pitch;
    utterance.volume = config.volume;
    
    // Get specific voice if available
    const voices = this.synth.getVoices();
    const voice = voices.find(v => 
      v.lang.startsWith('en-MY') || 
      v.lang.startsWith('en-SG') ||
      v.lang.startsWith('en-GB')
    );
    if (voice) utterance.voice = voice;
    
    return new Promise((resolve, reject) => {
      utterance.onend = () => resolve();
      utterance.onerror = (e) => reject(e);
      this.synth.speak(utterance);
    });
  }
  
  stop(): void {
    this.synth.cancel();
  }
}
```

**Google Cloud TTS (Production):**
```typescript
class GoogleTTSProvider implements TTSProvider {
  private apiKey: string;
  private endpoint = 'https://texttospeech.googleapis.com/v1/text:synthesize';
  
  async speak(text: string, config: TTSConfig): Promise<void> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': this.apiKey,
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: 'en-MY',
          name: 'en-MY-Standard-A', // Malaysian English Female
          ssmlGender: 'FEMALE',
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: config.rate,
          pitch: config.pitch,
          volumeGainDb: 0.0,
        },
      }),
    });
    
    const data = await response.json();
    const audioContent = data.audioContent; // Base64 encoded
    
    // Play audio
    const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
    return new Promise((resolve, reject) => {
      audio.onended = () => resolve();
      audio.onerror = (e) => reject(e);
      audio.play();
    });
  }
}
```

### Speech Synchronization

**Sync talking animation with audio:**

```typescript
// hooks/useVoice.ts
export function useVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext>();
  const analyserRef = useRef<AnalyserNode>();
  
  const speakWithAnimation = async (text: string) => {
    setIsSpeaking(true);
    
    // Set up audio analysis for jaw movement
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
    }
    
    // Speak
    await ttsProvider.speak(text, config);
    
    setIsSpeaking(false);
  };
  
  const getAudioAmplitude = (): number => {
    if (!analyserRef.current) return 0;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    // Calculate average amplitude
    const sum = dataArray.reduce((a, b) => a + b, 0);
    return sum / dataArray.length / 255; // Normalize to 0-1
  };
  
  return { speakWithAnimation, getAudioAmplitude, isSpeaking };
}
```

---

## 💬 Mock AI Response System

### Response Database Structure

```typescript
// lib/ai/mockResponses.ts
export interface ResponseCategory {
  triggers: string[];
  responses: ResponseTemplate[];
  emotion: Emotion;
  animation?: Animation;
  followUpPrompts?: string[];
}

export interface ResponseTemplate {
  content: string;
  variants?: string[]; // Alternative phrasings
  context?: string; // When to use this variant
}

export const RESPONSE_DATABASE: Record<string, ResponseCategory> = {
  // Greetings
  greetings: {
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'selamat', 'salam'],
    emotion: 'happy',
    animation: 'wave',
    responses: [
      {
        content: "Selamat datang! 👋 I'm Cikgu Maya, your teaching assistant. How can I help you today?",
        context: "first_interaction"
      },
      {
        content: "Hello! Good to see you again. What would you like to explore today?",
        context: "returning_user"
      },
      {
        content: "Hi there! Ready to look at some student data together?",
        context: "returning_user"
      }
    ],
    followUpPrompts: [
      "Who needs my attention this week?",
      "Show me class performance",
      "Any at-risk students?"
    ]
  },
  
  // Student Information Queries
  student_info: {
    triggers: ['student', 'ahmad', 'performance', 'grade', 'marks', 'score', 'how is'],
    emotion: 'neutral',
    animation: 'thinking',
    responses: [
      {
        content: "Let me pull up Ahmad's information. Looking at the data, he's currently at about 54% overall - just above passing, but I've noticed a downward trend. His attendance has dropped to 85% over the past month, which might be connected. Would you like me to dig deeper into what changed?",
        context: "specific_student_ahmad"
      },
      {
        content: "I can help you understand that student's performance. Could you tell me their name? That way I can pull up their complete profile for you.",
        context: "generic_student_query"
      },
      {
        content: "Great question! I'm seeing some interesting patterns in that student's data. Their test scores are actually decent - around 68% average - so they understand the material. It's more about homework completion that's affecting their overall grade.",
        context: "understanding_vs_completion"
      }
    ],
    followUpPrompts: [
      "What's causing the decline?",
      "Compare to class average",
      "Prepare parent meeting brief"
    ]
  },
  
  // At-Risk Students
  at_risk: {
    triggers: ['risk', 'at-risk', 'attention', 'concern', 'help', 'struggling', 'failing', 'trouble'],
    emotion: 'concerned',
    animation: 'point',
    responses: [
      {
        content: "I've identified 3 students who might need your attention this week. Let me share what I'm seeing:\n\n1. **Ahmad** - Grades dropped from 72% to 54%, attendance at 85%\n2. **Siti** - Missing 8 assignments across subjects\n3. **Kumar** - Sudden performance dip in Math\n\nRemember, students turn things around all the time - especially with the right support. Would you like me to go deeper into any of them?",
        context: "weekly_at_risk_list"
      },
      {
        content: "Before we get into concerns, I want to highlight something positive - these students all have decent test scores, showing they understand the material. The challenges seem to be more about engagement and completion. That's actually good news because those are things we can work on together.",
        context: "positive_framing"
      },
      {
        content: "I can see a few patterns here that might help explain what's happening. Have you had a chance to chat with any of these students one-on-one? Sometimes a quick check-in reveals things the data can't show. You know your students best.",
        context: "encouraging_teacher_insight"
      }
    ],
    followUpPrompts: [
      "Tell me more about Ahmad",
      "What's Kumar's issue in Math?",
      "How can I help Siti?"
    ]
  },
  
  // Class Performance
  class_info: {
    triggers: ['class', 'form', '4s1', '3a', 'students', 'overall', 'how are'],
    emotion: 'neutral',
    responses: [
      {
        content: "Your Form 4S1 class is doing quite well overall! Here's what I'm seeing:\n\n📊 **Class Average**: 68% (B- range)\n📈 **Trend**: +3% improvement from last month\n⚠️ **Areas for attention**: Science topics (59% average)\n✨ **Strengths**: English (76%), Math (72%)\n\nMost students are in the B-C range, which is solid. The Science topics might need some focused review sessions. Would you like me to identify specific students who need extra support there?",
        context: "class_overview"
      },
      {
        content: "Looking at your class data, I can see some interesting patterns. Would you like me to break it down by subject, or would you prefer to focus on specific students who might need support?",
        context: "offering_detailed_view"
      },
      {
        content: "Your classes are looking good! There are a few students who might need extra support, but overall you're doing great work. The class participation has been strong, and homework completion is at 78%, which is above average.",
        context: "positive_summary"
      }
    ],
    followUpPrompts: [
      "Break down by subject",
      "Who needs help in Science?",
      "Compare to other Form 4 classes"
    ]
  },
  
  // Parent Meeting Preparation
  parent_meeting: {
    triggers: ['parent', 'meeting', 'prepare', 'brief', 'conference', 'discussion'],
    emotion: 'neutral',
    animation: 'thinking',
    responses: [
      {
        content: "Let me help you prepare for that parent meeting. I'll pull together a comprehensive brief:\n\n**Ahmad's Overview**\n• **Current Grade**: 54% (Passing, but concerning trend)\n• **Strengths**: Good test scores (68% avg) - understands material\n• **Challenges**: Homework completion (45%), attendance (85%)\n• **Recent Change**: Drop started 6 weeks ago\n• **Recommendation**: Discuss any external factors affecting focus\n\nI can also create a more detailed report if you need specific examples or data points to reference.",
        context: "student_meeting_brief"
      },
      {
        content: "Good thinking to prepare ahead! For the parent meeting, I'd suggest framing it this way: Start with Ahmad's strengths (he understands the material, test scores prove it), then address the completion issue as something you want to partner with them on solving. Would you like me to help draft talking points?",
        context: "meeting_strategy"
      },
      {
        content: "I can create a summary with key points - both strengths and areas for growth. The data shows Ahmad's capable of the work, which is a positive starting point for the conversation. What specific aspects would you like to emphasize?",
        context: "customized_brief"
      }
    ],
    followUpPrompts: [
      "Create detailed report",
      "Draft talking points",
      "Show attendance patterns"
    ]
  },
  
  // Encouragement / Positive Feedback
  encouragement: {
    triggers: ['thank', 'thanks', 'great', 'good', 'helpful', 'appreciate', 'awesome'],
    emotion: 'happy',
    animation: 'nod',
    responses: [
      {
        content: "You're asking great questions! This proactive approach really makes a difference for your students. I'm here whenever you need insights or want to explore the data together.",
        context: "general_encouragement"
      },
      {
        content: "I can see you really care about your students - that shows in how thoughtfully you're approaching this. That kind of attention is what helps students succeed.",
        context: "acknowledging_care"
      },
      {
        content: "This is good work! Understanding the patterns in the data is the first step to helping students get back on track. What would you like to explore next?",
        context: "positive_reinforcement"
      }
    ]
  },
  
  // Comparison Queries
  comparison: {
    triggers: ['compare', 'versus', 'vs', 'difference', 'better', 'worse'],
    emotion: 'neutral',
    animation: 'thinking',
    responses: [
      {
        content: "Let me compare Ahmad to the class average:\n\n**Ahmad vs. Form 4S1**\n• Overall: 54% vs. 68% (14% below)\n• Math: 62% vs. 72% (10% below)\n• Science: 48% vs. 59% (11% below)\n• English: 58% vs. 76% (18% below)\n\nThe gap is consistent across subjects, which suggests this might not be a content-specific issue. Could there be something affecting his overall engagement?",
        context: "student_to_class_comparison"
      },
      {
        content: "Comparing across classes can be tricky because of different student compositions, but I can show you the patterns. Would you like to see performance by subject, or focus on specific metrics like attendance or assignment completion?",
        context: "class_to_class_comparison"
      }
    ],
    followUpPrompts: [
      "Show attendance comparison",
      "Compare assignment completion",
      "What about engagement?"
    ]
  },
  
  // Data Limitations / Uncertainty
  uncertain: {
    triggers: ['why', 'reason', 'cause', 'explain'],
    emotion: 'thinking',
    animation: 'thinking',
    responses: [
      {
        content: "That's a great question, but I can only show you what's happening in the data - I can't definitively say why. Have you noticed anything in class that might explain the pattern? Your observations are just as important as the numbers.",
        context: "acknowledging_limits"
      },
      {
        content: "The data shows the pattern, but the root cause needs your insight. You know these students personally - has anything changed in Ahmad's behavior or circumstances lately that might explain the trend?",
        context: "teacher_expertise"
      },
      {
        content: "I can show you correlations - like attendance and grades both dropped around the same time - but correlation doesn't always mean causation. Your firsthand knowledge of the student is crucial here.",
        context: "correlation_not_causation"
      }
    ]
  },
  
  // Default / Fallback
  default: {
    triggers: [], // Catch-all
    emotion: 'neutral',
    responses: [
      {
        content: "That's a great question! Let me see what I can find in the data. Could you give me a bit more context about what you're looking for?",
        context: "need_clarification"
      },
      {
        content: "I want to make sure I understand correctly. Are you asking about a specific student, class, or overall patterns? That will help me pull the right information for you.",
        context: "clarifying_intent"
      },
      {
        content: "Hmm, I'm not quite sure about that specific detail, but I can show you what I do see in the data that might be related. Would that help?",
        context: "partial_information"
      },
      {
        content: "Based on what I'm seeing, here's what stands out... but I think I might be missing something in your question. Could you rephrase it for me?",
        context: "requesting_rephrase"
      }
    ],
    followUpPrompts: [
      "Show me student data",
      "How are my classes doing?",
      "Who needs attention?"
    ]
  }
};
```

### Response Selection Algorithm

```typescript
// lib/ai/responseEngine.ts
export class MockResponseEngine {
  private conversationHistory: Message[] = [];
  private isFirstInteraction = true;
  
  async getResponse(userMessage: string): Promise<AIResponse> {
    const lowerMessage = userMessage.toLowerCase();
    
    // 1. Find matching category
    const category = this.findBestCategory(lowerMessage);
    
    // 2. Select appropriate response variant
    const response = this.selectResponseVariant(
      category,
      this.conversationHistory,
      this.isFirstInteraction
    );
    
    // 3. Add to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });
    
    this.isFirstInteraction = false;
    
    // 4. Return response with metadata
    return {
      content: response.content,
      emotion: category.emotion,
      animation: category.animation,
      followUpPrompts: category.followUpPrompts,
      category: category.name
    };
  }
  
  private findBestCategory(message: string): ResponseCategory {
    let bestMatch = RESPONSE_DATABASE.default;
    let maxMatchCount = 0;
    
    for (const [name, category] of Object.entries(RESPONSE_DATABASE)) {
      const matchCount = category.triggers.filter(trigger =>
        message.includes(trigger)
      ).length;
      
      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = category;
        bestMatch.name = name;
      }
    }
    
    return bestMatch;
  }
  
  private selectResponseVariant(
    category: ResponseCategory,
    history: Message[],
    isFirst: boolean
  ): ResponseTemplate {
    const responses = category.responses;
    
    // Filter by context
    const contextualResponses = responses.filter(r => {
      if (!r.context) return true;
      if (r.context === 'first_interaction') return isFirst;
      if (r.context === 'returning_user') return !isFirst;
      return true;
    });
    
    // Select random from filtered
    return contextualResponses[
      Math.floor(Math.random() * contextualResponses.length)
    ];
  }
}
```

---

## 🚀 Deployment Configuration

### Railway Setup

**railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run preview",
    "healthcheckPath": "/",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Environment Variables:**
```bash
# .env.production
NODE_ENV=production
VITE_APP_TITLE=Cikgu Maya 3D
VITE_TTS_PROVIDER=google # or 'web_speech'
VITE_GOOGLE_TTS_API_KEY=your_api_key_here # only if using Google TTS
```

### GitHub Repository Structure

```
cikgu-maya-3d/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy to Railway on push
├── public/                     # Static assets
├── src/                        # Source code
├── .env.example
├── .env.production
├── .gitignore
├── package.json
├── railway.json
├── README.md
└── LICENSE
```

**Auto-Deploy Workflow (.github/workflows/deploy.yml):**
```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Railway CLI
        run: npm install -g @railway/cli
      
      - name: Deploy to Railway
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Alternative: GitHub Pages Deployment

**vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cikgu-maya-3d/', // Replace with your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})
```

**GitHub Pages Workflow:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v2
```

---

## 📝 Implementation Phases

### Phase 1: Foundation (Week 1)

**Goals:**
- ✅ Project setup with Vite + React + TypeScript
- ✅ Basic 3D scene with Three.js
- ✅ Simple character placeholder (geometric shapes)
- ✅ Basic chat UI (no AI yet)

**Deliverables:**
- Functional 3D viewport
- Interactive camera controls
- Chat input/output
- Basic state management

### Phase 2: Character & Animations (Week 2)

**Goals:**
- ✅ 3D character integration (AI-generated, library model, or geometric)
- ✅ Idle animation implementation
- ✅ Talking animation (jaw movement)
- ✅ Basic gestures (wave, nod)

**Deliverables:**
- 3D character with animations
- Animation controller
- Emotion system

### Phase 3: Voice & Sound (Week 3)

**Goals:**
- ✅ Web Speech API integration
- ✅ Voice playback controls
- ✅ Sound effects
- ✅ Audio-animation synchronization

**Deliverables:**
- Working TTS system
- Voice controls in UI
- Animated talking synced to audio

### Phase 4: Mock AI System (Week 4)

**Goals:**
- ✅ Response database implementation
- ✅ Keyword matching algorithm
- ✅ Persona adherence
- ✅ Follow-up prompts

**Deliverables:**
- Intelligent mock AI
- Full Cikgu Maya persona
- Context-aware responses

### Phase 5: Polish & UX (Week 5)

**Goals:**
- ✅ UI/UX refinement using UI/UX Pro Max principles
- ✅ Animations polish
- ✅ Performance optimization
- ✅ Mobile responsiveness

**Deliverables:**
- Professional-grade UI
- Smooth animations
- Fast load times (<3s)
- Mobile-optimized

### Phase 6: Deployment (Week 6)

**Goals:**
- ✅ Railway deployment setup
- ✅ GitHub repository setup
- ✅ CI/CD pipeline
- ✅ Documentation

**Deliverables:**
- Live production URL
- Auto-deploy on push
- Complete README
- Demo video

---

## 🎯 ClaudeKit Implementation Prompts

### Complete ClaudeKit Workflow

Use these prompts in sequence to build the entire prototype with ClaudeKit.

---

### **Prompt 1: Persona Design (Optional: Use /brainstorm)**

```
/brainstorm [Design the persona for Cikgu Maya, a 3D AI teaching assistant:

CONTEXT:
- Target audience: Malaysian secondary school teachers
- Purpose: Analytics assistant for student data insights
- Tone: Warm, professional, colleague-like (not authoritative)
- Cultural context: Malaysian education (Form 1-5, multi-ethnic)

EXPLORE:
1. Physical appearance (age, ethnicity, clothing, features)
2. Personality traits (supportive, data-informed, humble)
3. Voice characteristics (accent, tone, pacing, pitch)
4. Communication style (language, formality, emoji usage)
5. Emotional range (neutral, happy, concerned, thinking, encouraging)
6. Visual design elements (colors, styling, accessories)

CONSTRAINTS:
- Must feel approachable yet professional
- Suitable for Malaysian teachers (all ethnicities)
- NOT childish, NOT robotic, NOT overly corporate
- Should embody "experienced teaching colleague"

OUTPUT:
- Character design brief
- Voice profile
- Personality guidelines
- Visual reference descriptions
]
```

---

### **Prompt 2: Technical Planning**

```
/plan [Build 3D Cikgu Maya Interactive Assistant with the following specifications:

PROJECT OVERVIEW:
- Standalone React web app (TypeScript)
- 3D character with animations using Three.js
- Voice output (Text-to-Speech)
- Interactive chat interface
- Mock AI responses following Cikgu Maya persona
- Deployable to Railway

TECHNICAL STACK:
- React 18 + TypeScript
- Three.js + React Three Fiber + Drei
- Tailwind CSS for styling
- Zustand for state management
- Web Speech API (MVP) or Google Cloud TTS (production)
- Vite for build tool

CORE FEATURES TO IMPLEMENT:

1. **3D Character System**
   - Ready Player Me GLB model integration
   - Scene setup (lighting, camera, environment)
   - Interactive camera controls (orbit, zoom)
   - Character loading state

2. **Animation System**
   - Idle animation (breathing, blinking, subtle movement)
   - Talking animation (jaw movement synced to audio)
   - Gestures: wave, nod, thinking pose, pointing
   - Facial expressions: neutral, happy, concerned, thinking, encouraging
   - Animation triggers based on response category

3. **Voice System**
   - TTS provider abstraction (support multiple providers)
   - Web Speech API implementation (MVP)
   - Voice configuration (rate 0.9, pitch 1.1)
   - Audio playback controls (play, stop, replay)
   - Sync talking animation with audio amplitude

4. **Chat Interface**
   - Split layout: 3D viewport (50%) + Chat panel (50%)
   - Message list with user/assistant bubbles
   - Typewriter effect for AI responses
   - User input field with send button
   - Suggested prompt chips
   - Voice control buttons

5. **Mock AI Response System**
   - Response database with categories:
     * Greetings (warm welcomes)
     * Student queries (insights, performance)
     * At-risk students (supportive guidance)
     * Class information (overview, trends)
     * Parent meeting prep (briefs, talking points)
     * Encouragement (positive reinforcement)
     * Comparisons (student vs class)
     * Default fallback
   - Keyword matching algorithm
   - Response selection with context awareness
   - Persona adherence (Cikgu Maya voice)
   - Follow-up prompt suggestions

6. **UI Components**
   - Header with branding and status
   - 3D viewport with camera controls info
   - Chat panel with message history
   - Input area with suggested prompts
   - Footer with prototype mode badge
   - Voice control buttons

FILE STRUCTURE:
Reference the detailed file structure in the PRD:
- src/components/3d/ (character, scene, animations)
- src/components/chat/ (panel, messages, input)
- src/components/voice/ (controller, player, settings)
- src/lib/ai/ (mock responses, persona, engine)
- src/lib/animations/ (config, expressions)
- src/hooks/ (useChat, useVoice, useAnimations)
- src/store/ (Zustand chat store)

DESIGN REQUIREMENTS (UI/UX Pro Max):
- Education-grade professional aesthetics
- Color palette: Blue primary (#4A90E2), Green secondary (#50C878)
- Typography: Inter for body, Poppins for headings
- Clean, spacious layout with clear hierarchy
- Smooth transitions and animations
- Mobile-responsive (desktop priority)

PERFORMANCE TARGETS:
- Initial load: <3 seconds
- 3D model size: <10MB
- Smooth 60fps animations
- TTS latency: <1 second

DEPLOYMENT:
- GitHub repository
- Railway deployment
- CI/CD auto-deploy on main branch push
- Environment variables for TTS API keys

REFERENCE DOCUMENTS:
- Schoolytics_AI_Assistant_Persona.md (full persona specifications)
- Cikgu_Maya_3D_Prototype_PRD.md (this document)

Create a comprehensive implementation plan with:
1. Component architecture diagram
2. State management strategy
3. 3D scene setup approach
4. Animation system design
5. Voice integration strategy
6. Response engine algorithm
7. Development milestones
8. Testing approach
]
```

---

### **Prompt 3: UI/UX Design (Using UI/UX Pro Max Skill)**

```
/design:good [Design the UI for Cikgu Maya 3D Interactive Assistant:

DESIGN BRIEF:
Create a professional, education-grade web interface for a 3D AI teaching assistant. The interface should feel warm, approachable, and trustworthy while maintaining professional polish.

TARGET AUDIENCE:
- Malaysian secondary school teachers (ages 25-55)
- Tech-comfortable but not expert
- Using during work hours (needs to look professional)
- Mobile and desktop usage

LAYOUT STRUCTURE:
1. **Header** (60px height)
   - Left: Logo + "Cikgu Maya" branding
   - Right: Status indicator + Settings
   - Full width, sticky
   - White background with subtle shadow

2. **Main Content** (Split layout)
   - **Left Panel (50%)**: 3D Viewport
     * Full height below header
     * Gradient background (sky blue to soft purple)
     * Camera controls info badge (bottom left)
   
   - **Right Panel (50%)**: Chat Interface
     * Message history (scrollable, flex-grow)
     * Suggested prompts (when applicable)
     * Input area (fixed at bottom)
     * White background

3. **Footer** (40px height)
   - Prototype mode badge
   - Quick info text
   - Centered, subtle background

COLOR PALETTE:
- Primary: #4A90E2 (Confident Blue)
- Secondary: #50C878 (Encouraging Green)
- Accent: #FF6B9D (Warm Pink)
- Background: #F8FAFC (Off-white)
- Gradient: #E0F2FE → #DDD6FE
- Text Primary: #1E293B
- Text Secondary: #64748B

TYPOGRAPHY:
- Font Family: 'Inter' for body, 'Poppins' for headings
- Base Size: 16px
- Headings: 24px (Header), 18px (Section)
- Body: 15px (Messages), 14px (Meta info)
- Line Height: 1.5 (comfortable reading)

COMPONENT STYLES:

**Message Bubbles:**
- Assistant: Light gray (#F1F5F9), rounded-bl-sm
- User: Blue (#4A90E2), white text, rounded-br-sm
- Max width: 80% of chat panel
- Padding: 12px 16px
- Border radius: 16px (rounded corners)
- Subtle shadow: 0 1px 2px rgba(0,0,0,0.1)
- Typewriter animation for AI messages

**Input Field:**
- Height: 48px
- Border: 2px solid #E2E8F0
- Border radius: 12px
- Focus: Border color changes to primary blue, subtle shadow
- Padding: 12px 16px
- Font size: 15px

**Buttons:**
- Primary (Send): Blue background, white text, rounded-xl
- Secondary (Voice controls): White background, blue text, border
- Hover: Slight scale (1.02) and brightness increase
- Disabled: Gray, reduced opacity, no pointer

**Suggested Prompt Chips:**
- White background, light gray border
- Rounded-full (pill shape)
- Padding: 8px 16px
- Hover: Blue tint background, border color change
- Small font (14px)

**3D Viewport:**
- Gradient background (sky to purple)
- Canvas takes full container
- Camera controls info badge (bottom left):
  * White background with transparency
  * Rounded corners
  * Subtle shadow
  * Icon + text

INTERACTION DESIGN:
1. **Message Send Flow:**
   - User types → Send button becomes active
   - Click send → Input clears, message appears
   - Typing indicator shows (3 animated dots)
   - AI response appears with typewriter effect
   - Voice plays automatically after typing completes

2. **Voice Controls:**
   - Play button on each assistant message
   - Stop speaking button in header (when active)
   - Visual indicator when speaking (animated icon)
   - Talking animation syncs with audio

3. **3D Character Interaction:**
   - Drag to rotate (orbit controls)
   - Scroll to zoom in/out
   - Character animates based on conversation state:
     * Idle when quiet
     * Talking when speaking
     * Gestures for emphasis

4. **Suggested Prompts:**
   - Show on first load and after responses
   - Click to auto-fill input
   - Fade in/out animations
   - Context-aware suggestions

RESPONSIVE DESIGN:
- Desktop (>1024px): Split 50/50 layout
- Tablet (768-1024px): Adjust to 40/60 split
- Mobile (<768px): Stack vertically, 3D on top (40%), chat below (60%)

ACCESSIBILITY:
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Focus indicators
- Alt text for icons
- ARIA labels for interactive elements

ANIMATIONS:
- Message bubble fade-in: 200ms ease-out
- Typewriter effect: 30ms per character
- Button hover: 150ms ease
- Prompt chip hover: 200ms ease
- Smooth scrolling in message list

MICRO-INTERACTIONS:
- Send button subtle pulse when enabled
- Voice button glow when speaking
- Thinking dots bounce animation
- Success states (green checkmark, brief)
- Error states (red indicator, shake)

REFERENCE:
- Use UI/UX Pro Max skill's design intelligence
- Apply education tech design patterns
- Malaysian cultural sensitivity in visual choices
- Professional workspace aesthetic

OUTPUT REQUIREMENTS:
1. Complete component mockups (HTML/CSS/Tailwind)
2. Color system implementation
3. Typography scale
4. Spacing system (4px base unit)
5. Component variants (default, hover, active, disabled)
6. Responsive breakpoints
7. Animation specifications
8. Accessibility notes

Create professional, production-ready UI designs that feel warm, trustworthy, and education-appropriate.
]
```

---

### **Prompt 4: Implementation (3D Character & Scene)**

```
/cook [Implement the 3D Character and Scene Setup:

TASK:
Build the 3D visualization components for Cikgu Maya using React Three Fiber.

COMPONENTS TO BUILD:

1. **Scene.tsx**
   - Set up Three.js scene
   - Configure camera (PerspectiveCamera, FOV 50, position [0, 1.2, 3.5])
   - Add lights:
     * Ambient light (intensity 0.6)
     * Directional light (position [5,5,5], intensity 0.8, cast shadows)
     * Spot light (position [-3,3,2], intensity 0.3)
   - Add environment (Environment preset="apartment")
   - Ground plane (10x10, receives shadows)
   - Orbit controls (enable pan false, zoom true, limits)

2. **MayaCharacter.tsx**
   
   **CHOOSE ONE IMPLEMENTATION APPROACH:**
   
   **Option A: AI-Generated Model (Meshy.ai/Rodin)**
   - Load 3D model from Meshy.ai GLB export
   - Use useGLTF hook from @react-three/drei
   - Handle loading states with Suspense
   - Apply materials if needed
   - Enable shadows (castShadow, receiveShadow)
   - Position character at origin
   - Scale appropriately for scene (usually 1.0 if generated for real-world scale)
   
   **Option B: Free Model Library (Sketchfab/Mixamo)**
   - Load downloaded GLB model
   - Same as Option A (useGLTF, Suspense, shadows, positioning)
   - May need to adjust scale depending on source model
   
   **Option C: Geometric Character (Three.js Primitives) - DEFAULT**
   - Build character from geometric shapes:
     * Head: SphereGeometry (0.4 radius) - skin tone material
     * Body: CapsuleGeometry (0.4 top, 0.45 bottom, 0.9 height) - teal blue material
     * Arms: CylinderGeometry (0.08 radius, 0.7 height) x2 - skin tone
     * Hands: SphereGeometry (0.12 radius) x2 - skin tone
     * Eyes: SphereGeometry (0.08 radius) x2 - dark brown/black
     * Hair: Partial sphere for hair volume - black material
     * Smile: TorusGeometry for mouth curve - slightly darker skin tone
   - Use refs for animated parts (head, arms, jaw)
   - Apply MeshStandardMaterial with appropriate colors
   - Enable shadows on all meshes
   - Group all parts under single <group> for easy positioning
   
   **Recommended for MVP: Option C** (geometric) for fastest implementation, 
   then upgrade to Option A (AI-generated) or B (library) later
   
   **Materials Configuration:**
   ```typescript
   const materials = {
     skin: new MeshStandardMaterial({ color: '#f4c2a8', metalness: 0.1, roughness: 0.9 }),
     clothing: new MeshStandardMaterial({ color: '#4a90e2', metalness: 0.2, roughness: 0.8 }),
     hair: new MeshStandardMaterial({ color: '#2c1810', metalness: 0.3, roughness: 0.7 }),
     eyes: new MeshStandardMaterial({ color: '#2c1810', metalness: 0.5, roughness: 0.2 })
   };
   ```

3. **Animations.tsx**
   - Implement idle animation:
     * Breathing (subtle chest/shoulder movement, 3s loop)
     * Blinking (random 2-5s intervals)
     * Head micro-movements (looking around subtly, 8s loop)
     * Weight shift (gentle sway, 6s loop)
   - Implement talking animation:
     * Jaw movement (synced to audio amplitude)
     * Subtle head bob
     * Optional: Blend shape morph targets for lip sync
   - Implement gestures:
     * Wave (2s, right hand lifts and waves)
     * Nod (1.5s, head tilts down 2-3 times)
     * Thinking (3s, hand to chin, head tilt)
     * Point (2s, arm extends, index finger)
   - Animation controller (trigger animations based on props)

4. **FacialExpressions.tsx**
   - Implement expression system using blend shapes:
     * Neutral (default)
     * Happy (smile, eye squint)
     * Concerned (furrowed brow, soft eyes)
     * Thinking (eyes up/side, slight head tilt)
     * Encouraging (warm smile, open expression)
   - Smooth transitions between expressions (lerp)

5. **hooks/use3DCharacter.ts**
   - Model loading hook
   - Animation control hook
   - Expression management hook

TECHNICAL REQUIREMENTS:
- Use @react-three/fiber for React integration
- Use @react-three/drei for helpers (OrbitControls, Environment, useGLTF)
- Implement smooth 60fps animations
- Handle model loading errors gracefully
- Optimize for web performance (<10MB model)
- Support Draco compression for GLB files

CHARACTER MODEL OPTIONS:

**FOR MVP: Use Option C (Geometric Character)**
ClaudeKit will create a sophisticated stylized character using Three.js primitives:
- Professional proportions and design
- Teal business attire
- Shoulder-length black hair
- Friendly facial features
- Fully animated (idle, talking, gestures)
- Ultra-lightweight (<50KB)
- No external dependencies

**FOR PRODUCTION: Upgrade to Real Model**
Later, easily swap with:
- AI-generated model from Meshy.ai (5 min to generate)
- Free model from Sketchfab/Mixamo (instant download)
- Custom VRoid character (30 min to create)
- The geometric character's bone structure will be similar, making swap easy

**Implementation Strategy:**
1. Build geometric character first (this prompt)
2. Get MVP working end-to-end
3. Generate/download real model
4. Replace MayaCharacter component (10 minutes)
5. Adjust scale/positioning as needed

**Code Structure for Easy Swapping:**
```typescript
// Easy to swap between implementations
const USE_GLB_MODEL = false; // Set to true when ready

function MayaCharacter() {
  if (USE_GLB_MODEL) {
    return <GLBCharacter url="/models/maya.glb" />;
  } else {
    return <GeometricCharacter />;
  }
}
```

TESTING:
- Verify animations play smoothly
- Test camera controls work correctly
- Ensure shadows render properly
- Check performance (fps counter)
- Validate model loads without errors

REFERENCE:
- Three.js documentation (https://threejs.org/docs/)
- React Three Fiber docs (https://docs.pmnd.rs/react-three-fiber)
- @react-three/drei helpers (https://github.com/pmndrs/drei)
- Meshy.ai documentation (if using AI-generated model)
- Mixamo documentation (if using library model)
]
```

---

### **Prompt 5: Implementation (Chat Interface)**

```
/cook [Implement the Chat Interface Components:

TASK:
Build the chat UI components with full functionality.

COMPONENTS TO BUILD:

1. **ChatPanel.tsx**
   - Main container for chat interface
   - Layout: Message list + Input area
   - State management via Zustand
   - Responsive design (50% width on desktop)

2. **MessageList.tsx**
   - Scrollable message container
   - Auto-scroll to bottom on new messages
   - Display user and assistant messages
   - Loading indicator during AI typing
   - Smooth scroll behavior

3. **MessageBubble.tsx**
   - Individual message component
   - Props: role ('user' | 'assistant'), content, timestamp
   - Different styles for user vs assistant
   - Voice playback button for assistant messages
   - Typewriter effect for latest assistant message
   - Timestamp on hover

4. **ChatInput.tsx**
   - Text input field
   - Send button
   - Character count (optional)
   - Submit on Enter, new line on Shift+Enter
   - Disabled state during AI response
   - Input validation

5. **SuggestedPrompts.tsx**
   - Horizontal scrollable chips
   - Context-aware prompts based on conversation
   - Click to auto-fill input
   - Show on first load and after responses
   - Fade in/out animations

6. **TypingIndicator.tsx**
   - Animated "thinking" indicator
   - Three dots with bounce animation
   - "Cikgu Maya is thinking..." text
   - Shows during AI processing

7. **VoiceControls.tsx**
   - Play/Stop buttons for voice
   - Volume control (optional)
   - Voice on/off toggle
   - Visual indicator when speaking

FEATURES:
- Typewriter effect (30ms per character)
- Smooth scroll to bottom on new message
- Message timestamps
- Voice playback controls per message
- Loading states
- Error handling
- Empty state (first load)

STYLING (Tailwind CSS):
- Use design system from /design:good output
- Responsive breakpoints
- Smooth transitions
- Focus states
- Hover effects
- Accessibility (ARIA labels, keyboard navigation)

STATE MANAGEMENT:
- Zustand store for:
  * messages array
  * isTyping boolean
  * currentEmotion string
  * currentAnimation string
  * voiceEnabled boolean
  * isSpeaking boolean

INTERACTIONS:
1. User types message → Send button becomes active
2. Click send → Message added to list, input clears
3. AI response appears with typewriter effect
4. Voice plays automatically after typing completes
5. User can click play button to replay any message
6. User can click stop button to interrupt speaking

TESTING:
- Test message sending
- Verify typewriter effect
- Check voice controls work
- Test suggested prompts
- Validate scroll behavior
- Ensure responsive design
]
```

---

### **Prompt 6: Implementation (Voice System)**

```
/cook [Implement the Voice System:

TASK:
Build the text-to-speech system with provider abstraction.

COMPONENTS TO BUILD:

1. **voice/ttsProvider.ts**
   - Abstract interface for TTS providers
   - TTSConfig type definition
   - Provider factory function

2. **voice/WebSpeechProvider.ts**
   - Web Speech API implementation
   - speak() method
   - stop() method
   - Voice selection (prefer en-MY, en-SG, en-GB)
   - Configuration: rate 0.9, pitch 1.1, volume 1.0

3. **voice/GoogleTTSProvider.ts** (Optional for MVP)
   - Google Cloud TTS API implementation
   - Authenticated API calls
   - Audio playback from Base64
   - Voice: en-MY-Standard-A (Female)

4. **VoiceController.tsx**
   - Main voice control component
   - TTS provider initialization
   - Play/stop functionality
   - Queue management (for multiple messages)
   - Event handling (onStart, onEnd, onError)

5. **hooks/useVoice.ts**
   - Voice control hook
   - speakMessage(text) function
   - stopSpeaking() function
   - isSpeaking state
   - voiceEnabled state
   - Audio amplitude getter (for jaw animation)

6. **AudioPlayer.tsx**
   - Visual audio player component
   - Play/pause/stop buttons
   - Progress bar (optional)
   - Volume control (optional)

FEATURES:
- Auto-play after AI response completes
- Manual replay for any message
- Stop speaking functionality
- Sync talking animation with audio
- Audio amplitude analysis for jaw movement
- Queue management (one speech at a time)

CONFIGURATION:
```typescript
const defaultTTSConfig = {
  provider: 'web_speech',
  voice: 'default',
  rate: 0.9,    // Slightly slower for clarity
  pitch: 1.1,   // Slightly higher for warmth
  volume: 1.0,
  language: 'en-MY'
};
```

AUDIO ANALYSIS (for animation sync):
- Use Web Audio API to analyze audio
- Create AnalyserNode
- Get frequency data for amplitude
- Pass amplitude to 3D character for jaw movement

TESTING:
- Test Web Speech API works in different browsers
- Verify voice plays automatically
- Test stop functionality
- Check jaw animation syncs with audio
- Validate configuration options

FALLBACK:
- If Web Speech API not available → Show warning
- If voice not found → Use default browser voice
- If audio fails → Show error, allow retry
]
```

---

### **Prompt 7: Implementation (Mock AI Response Engine)**

```
/cook [Implement the Mock AI Response System:

TASK:
Build the intelligent mock AI that responds naturally while maintaining Cikgu Maya's persona.

FILES TO CREATE:

1. **lib/ai/mockResponses.ts**
   - Response database (RESPONSE_DATABASE constant)
   - Response categories:
     * greetings (warm welcomes, wave animation)
     * student_info (insights, thinking animation)
     * at_risk (supportive guidance, concerned emotion)
     * class_info (overviews, neutral emotion)
     * parent_meeting (preparation briefs, thinking animation)
     * encouragement (positive reinforcement, happy emotion)
     * comparison (benchmarking, thinking animation)
     * uncertain (acknowledging limits, thinking emotion)
     * default (fallback responses)
   
   - Each category includes:
     * triggers: string[] (keywords)
     * responses: ResponseTemplate[] (content + variants)
     * emotion: Emotion ('neutral' | 'happy' | 'concerned' | 'thinking' | 'encouraging')
     * animation?: Animation ('wave' | 'nod' | 'thinking' | 'point')
     * followUpPrompts?: string[] (suggested next questions)

2. **lib/ai/responseEngine.ts**
   - MockResponseEngine class
   - findBestCategory(message: string) method
   - selectResponseVariant() method
   - getResponse(message: string) async method
   - Conversation history tracking
   - Context awareness (first interaction vs returning)

3. **lib/ai/persona.ts**
   - Persona guidelines
   - Voice rules (DO/DON'T lists)
   - Tone spectrum
   - Malaysian context constants
   - Response formatting helpers

4. **hooks/useChat.ts**
   - Chat state management hook
   - sendMessage(text: string) function
   - Response streaming simulation
   - Emotion and animation updates

RESPONSE DATABASE STRUCTURE:

Reference the detailed response database in the PRD (Section: Mock AI Response System).

Key categories to implement:
1. **Greetings** - Warm welcomes (15+ variants)
2. **Student Queries** - Ahmad-specific and generic student insights
3. **At-Risk Students** - Supportive, non-judgmental guidance
4. **Class Information** - Form 4S1 performance overviews
5. **Parent Meetings** - Comprehensive briefs and talking points
6. **Encouragement** - Positive reinforcement for teachers
7. **Comparisons** - Student vs class, class vs class
8. **Uncertainty** - Acknowledging data limitations respectfully
9. **Default Fallback** - Graceful handling of unclear queries

ALGORITHM:

```typescript
async getResponse(userMessage: string): Promise<AIResponse> {
  // 1. Normalize input
  const normalized = userMessage.toLowerCase().trim();
  
  // 2. Find best matching category
  const category = this.findBestCategory(normalized);
  
  // 3. Select contextual response variant
  const response = this.selectResponseVariant(
    category,
    this.conversationHistory,
    this.isFirstInteraction
  );
  
  // 4. Extract metadata
  const emotion = category.emotion;
  const animation = category.animation;
  const followUps = category.followUpPrompts;
  
  // 5. Update history
  this.conversationHistory.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  });
  
  this.isFirstInteraction = false;
  
  // 6. Return complete response
  return {
    content: response.content,
    emotion,
    animation,
    followUpPrompts: followUps
  };
}
```

PERSONA ADHERENCE:

Ensure all responses follow Cikgu Maya's voice:
- ✅ Warm, professional, colleague-like
- ✅ Insights over raw numbers
- ✅ Supportive, never judgmental
- ✅ Celebrates positives first
- ✅ Respects teacher expertise
- ✅ Appropriately uncertain (no predictions)
- ✅ Malaysian context (Form, SPM, etc.)

TESTING:
- Test all response categories trigger correctly
- Verify persona consistency across responses
- Check context awareness (first vs returning user)
- Test follow-up prompt generation
- Validate emotion and animation mappings
- Ensure no repetitive responses
]
```

---

### **Prompt 8: Integration & Polish**

```
/cook [Integrate all components and polish the application:

TASK:
Connect 3D scene, chat interface, voice system, and AI engine into cohesive experience.

INTEGRATION POINTS:

1. **App.tsx (Main Component)**
   - Layout: Header + Main (3D + Chat) + Footer
   - State management: Zustand store
   - Component composition
   - Responsive layout

2. **Message Flow:**
   User Input → Chat Store → Response Engine → Voice System → 3D Animation
   
   Sequence:
   a. User types and sends message
   b. Message added to chat store
   c. Response engine generates AI response
   d. Typewriter effect displays response
   e. Voice system speaks response
   f. 3D character plays talking animation + emotion
   g. Follow-up prompts update

3. **Animation Synchronization:**
   - Link voice amplitude to jaw movement
   - Trigger gestures based on response category
   - Update facial expression based on emotion
   - Return to idle when not speaking

4. **Voice Controls:**
   - Play button on each message
   - Stop button in header (when speaking)
   - Auto-play after response completes
   - Visual indicator when speaking

5. **UI Polish:**
   - Loading states (model loading, thinking indicator)
   - Error states (model load failure, TTS error)
   - Empty state (first load with suggested prompts)
   - Smooth transitions between all states
   - Proper focus management

PERFORMANCE OPTIMIZATIONS:

1. **3D Scene:**
   - Lazy load 3D model
   - Draco compression for GLB
   - Reduce polygon count if needed
   - Use LOD (Level of Detail) if multiple models

2. **React:**
   - Memoize expensive computations
   - Use React.memo for pure components
   - Lazy load heavy components
   - Debounce input handlers

3. **Assets:**
   - Compress images
   - Optimize fonts (subset if possible)
   - Code splitting for routes (if applicable)

ACCESSIBILITY:

1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Enter to send message
   - Space to play/pause voice
   - Esc to close modals/stop voice

2. **Screen Readers:**
   - ARIA labels on all buttons
   - Announce new messages
   - Announce animation states
   - Proper heading hierarchy

3. **Visual:**
   - Sufficient color contrast (WCAG AA)
   - Focus indicators
   - Text alternatives for icons
   - No reliance on color alone

TESTING CHECKLIST:

- [ ] 3D model loads correctly
- [ ] Animations play smoothly
- [ ] Chat messages display properly
- [ ] Voice plays after responses
- [ ] Jaw syncs with speaking
- [ ] Emotions change facial expression
- [ ] Gestures trigger correctly
- [ ] Suggested prompts work
- [ ] Keyboard navigation works
- [ ] Mobile responsive layout
- [ ] Error states handle gracefully
- [ ] Performance is smooth (60fps)

FINAL POLISH:

1. Add loading screen for initial load
2. Implement smooth page transitions
3. Add micro-interactions (button hover effects, etc.)
4. Ensure all colors match design system
5. Verify typography consistency
6. Test in multiple browsers (Chrome, Firefox, Safari)
7. Test on mobile devices
8. Add console error handling
9. Implement analytics events (optional)
10. Add README with setup instructions

Create a cohesive, polished experience that feels professional and delightful to use.
]
```

---

### **Prompt 9: Testing**

```
/test [Comprehensive testing of Cikgu Maya 3D Prototype:

TEST COVERAGE:

1. **3D Scene & Character:**
   - ✅ Model loads without errors
   - ✅ Model displays at correct position/scale
   - ✅ Camera controls respond correctly (drag, zoom)
   - ✅ Lights and shadows render properly
   - ✅ Scene performance is smooth (60fps target)

2. **Animations:**
   - ✅ Idle animation plays continuously
   - ✅ Talking animation syncs with voice
   - ✅ Wave gesture triggers on greeting
   - ✅ Nod gesture triggers on positive responses
   - ✅ Thinking pose triggers appropriately
   - ✅ Point gesture emphasizes key info
   - ✅ Transitions between animations are smooth

3. **Facial Expressions:**
   - ✅ Neutral expression is default
   - ✅ Happy expression for positive responses
   - ✅ Concerned expression for at-risk discussions
   - ✅ Thinking expression when processing
   - ✅ Encouraging expression for supportive responses
   - ✅ Smooth transitions between expressions

4. **Chat Interface:**
   - ✅ User can type and send messages
   - ✅ Messages appear in correct order
   - ✅ User messages styled differently from assistant
   - ✅ Typewriter effect works correctly
   - ✅ Timestamps display properly
   - ✅ Auto-scroll to bottom on new messages
   - ✅ Suggested prompts populate correctly
   - ✅ Clicking prompt fills input field

5. **Voice System:**
   - ✅ TTS plays automatically after response
   - ✅ Voice configuration correct (rate, pitch)
   - ✅ Play button replays message
   - ✅ Stop button interrupts speech
   - ✅ Only one voice plays at a time
   - ✅ Visual indicator shows speaking state
   - ✅ Jaw movement syncs with audio

6. **Mock AI Responses:**
   - ✅ Greetings trigger correct responses
   - ✅ Student queries return relevant insights
   - ✅ At-risk queries return supportive guidance
   - ✅ Class queries return overviews
   - ✅ Parent meeting queries return briefs
   - ✅ Encouragement responses are positive
   - ✅ Comparison queries return data
   - ✅ Uncertain queries acknowledge limits
   - ✅ Default fallback works for unclear queries
   - ✅ Follow-up prompts are contextual
   - ✅ Persona voice is consistent

7. **Integration:**
   - ✅ Message → Response → Voice → Animation flow works
   - ✅ Emotion changes facial expression
   - ✅ Animation triggers match response type
   - ✅ Voice controls affect 3D character
   - ✅ All state updates correctly

8. **Performance:**
   - ✅ Initial load time <3 seconds
   - ✅ 3D rendering at 60fps
   - ✅ Chat interface responsive
   - ✅ Voice playback smooth
   - ✅ No memory leaks

9. **Responsive Design:**
   - ✅ Desktop layout (>1024px) works
   - ✅ Tablet layout (768-1024px) works
   - ✅ Mobile layout (<768px) works
   - ✅ Touch interactions work on mobile
   - ✅ Camera controls work on touch devices

10. **Accessibility:**
    - ✅ Keyboard navigation works
    - ✅ Screen reader announces messages
    - ✅ ARIA labels present
    - ✅ Focus indicators visible
    - ✅ Color contrast meets WCAG AA
    - ✅ No keyboard traps

11. **Error Handling:**
    - ✅ Model load failure handled gracefully
    - ✅ TTS error shows user-friendly message
    - ✅ Network errors handled
    - ✅ Invalid input rejected
    - ✅ Console errors are informative

12. **Browser Compatibility:**
    - ✅ Chrome (latest)
    - ✅ Firefox (latest)
    - ✅ Safari (latest)
    - ✅ Edge (latest)
    - ✅ Mobile Safari (iOS)
    - ✅ Chrome Mobile (Android)

TEST SCENARIOS:

**Scenario 1: First-Time User**
1. Load app
2. See 3D character with idle animation
3. Read welcome message
4. Click suggested prompt
5. Receive response with typewriter effect
6. Hear voice speak response
7. See character animate while speaking
8. Try another prompt

**Scenario 2: Student Inquiry**
1. Ask "How is Ahmad performing?"
2. Receive detailed student insight
3. See concerned expression if applicable
4. Hear empathetic voice tone
5. Get follow-up prompt suggestions
6. Click "What's causing the decline?"
7. Receive root cause analysis

**Scenario 3: Parent Meeting Prep**
1. Ask "Prepare for Ahmad's parent meeting"
2. Receive comprehensive brief
3. See thinking animation during processing
4. Hear professional tone
5. Get structured talking points
6. Request detailed report
7. Receive formatted output

**Scenario 4: Voice Controls**
1. Disable auto-play in settings
2. Send message
3. Manually click play button
4. Voice starts, character animates
5. Click stop button mid-speech
6. Voice stops, character returns to idle

**Scenario 5: Mobile Experience**
1. Open on mobile device
2. See stacked layout (3D on top)
3. Interact with 3D (pinch zoom, swipe rotate)
4. Type message in chat
5. Receive response
6. Scroll through message history
7. Play voice on mobile

EXPECTED OUTCOMES:

For each test, document:
- ✅ Pass criteria met
- ⚠️ Minor issues found
- ❌ Critical issues found
- 📝 Notes and observations

PERFORMANCE BENCHMARKS:

Measure and report:
- Initial load time (target: <3s)
- Time to interactive (target: <5s)
- Frame rate during animation (target: 60fps)
- Memory usage (target: <150MB)
- Model file size (target: <10MB)
- Bundle size (target: <1MB JS, <500KB CSS)

Create comprehensive test report with:
1. Test results summary
2. Issues found (categorized by severity)
3. Performance metrics
4. Browser compatibility matrix
5. Recommendations for improvements
]
```

---

### **Prompt 10: Deployment Setup**

```
/cook [Set up GitHub repository and Railway deployment:

TASK:
Configure project for deployment with CI/CD pipeline.

GITHUB REPOSITORY SETUP:

1. **Initialize Git Repository:**
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit - Cikgu Maya 3D prototype"
   ```

2. **Create .gitignore:**
   ```
   # Dependencies
   node_modules/
   
   # Build outputs
   dist/
   build/
   
   # Environment variables
   .env
   .env.local
   .env.production
   
   # OS files
   .DS_Store
   Thumbs.db
   
   # IDE
   .vscode/
   .idea/
   
   # Logs
   *.log
   npm-debug.log*
   
   # Temporary
   .cache/
   temp/
   ```

3. **Create README.md:**
   Include:
   - Project description
   - Features list
   - Tech stack
   - Setup instructions
   - Development commands
   - Deployment guide
   - License

4. **Create CONTRIBUTING.md** (optional)

5. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cikgu-maya-3d.git
   git branch -M main
   git push -u origin main
   ```

RAILWAY DEPLOYMENT:

1. **Create railway.json:**
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS",
       "buildCommand": "npm run build"
     },
     "deploy": {
       "startCommand": "npm run preview",
       "healthcheckPath": "/",
       "healthcheckTimeout": 100,
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

2. **Update package.json scripts:**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview --host --port $PORT",
       "lint": "eslint src --ext ts,tsx",
       "type-check": "tsc --noEmit"
     }
   }
   ```

3. **Create .env.example:**
   ```bash
   # App Configuration
   VITE_APP_TITLE=Cikgu Maya 3D
   VITE_APP_VERSION=1.0.0
   
   # TTS Configuration
   VITE_TTS_PROVIDER=web_speech
   # VITE_TTS_PROVIDER=google
   # VITE_GOOGLE_TTS_API_KEY=your_api_key_here
   
   # Optional: Analytics
   # VITE_ANALYTICS_ID=your_analytics_id
   ```

4. **Railway Setup Steps:**
   a. Go to https://railway.app
   b. Sign in with GitHub
   c. Create new project
   d. Select "Deploy from GitHub repo"
   e. Choose cikgu-maya-3d repository
   f. Configure environment variables:
      - Add any from .env.example as needed
   g. Deploy

5. **Domain Configuration:**
   - Railway provides default domain: xxx.railway.app
   - Optional: Add custom domain in Railway dashboard

CI/CD PIPELINE:

1. **Create .github/workflows/deploy.yml:**
   ```yaml
   name: Deploy to Railway
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Run tests
           run: npm test
         
         - name: Build
           run: npm run build
         
         - name: Deploy to Railway
           run: |
             npm install -g @railway/cli
             railway up
           env:
             RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
   ```

2. **GitHub Secrets Setup:**
   - Go to GitHub repo → Settings → Secrets
   - Add RAILWAY_TOKEN (from Railway dashboard)

3. **Branch Protection:**
   - Protect main branch
   - Require PR reviews (optional)
   - Require status checks to pass

ALTERNATIVE: GITHUB PAGES DEPLOYMENT

If preferring static hosting:

1. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/cikgu-maya-3d/',
     // ... rest of config
   })
   ```

2. **Create .github/workflows/pages.yml:**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   permissions:
     contents: read
     pages: write
     id-token: write
   
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v2
           with:
             path: ./dist
     
     deploy:
       needs: build
       runs-on: ubuntu-latest
       steps:
         - uses: actions/deploy-pages@v2
   ```

3. **Enable GitHub Pages:**
   - Repo Settings → Pages
   - Source: GitHub Actions

MONITORING & ANALYTICS:

1. **Add Sentry (Error Tracking):**
   ```bash
   npm install @sentry/react
   ```

2. **Add Google Analytics (optional):**
   - Add tracking code to index.html
   - Or use GA4 via npm package

3. **Performance Monitoring:**
   - Use Railway metrics
   - Add custom performance marks
   - Monitor Core Web Vitals

POST-DEPLOYMENT CHECKLIST:

- [ ] App loads on production URL
- [ ] 3D character loads correctly
- [ ] Voice works in production
- [ ] Chat functions properly
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Custom domain configured (if applicable)
- [ ] Error tracking active
- [ ] Analytics configured (if using)
- [ ] README updated with live demo link

DOCUMENTATION:

Update README with:
- 🔗 Live Demo: [Your Railway URL]
- 📹 Demo Video: [Link to video]
- 📸 Screenshots: [Add screenshots]
- 🚀 Deployment Status: [Badge from Railway]
- 📖 Usage Instructions
- 🛠️ Development Setup
- 🤝 Contributing Guidelines
- 📄 License

Create complete deployment package ready for production use.
]
```

---

## 📚 Additional Resources

### Documentation Files

Save these prompts and responses:
1. **Character Design Reference**: Output from /brainstorm persona
2. **Technical Architecture**: Output from /plan
3. **UI/UX Specifications**: Output from /design:good
4. **Implementation Notes**: Outputs from all /cook commands
5. **Test Report**: Output from /test
6. **Deployment Guide**: Output from deployment /cook

### Quick Reference Commands

```bash
# Development
npm install           # Install dependencies
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build

# Testing
npm test              # Run tests
npm run lint          # Lint code
npm run type-check    # TypeScript check

# Deployment
git push origin main  # Auto-deploy via CI/CD
railway up            # Manual Railway deploy
```

---

## ❓ FAQ

**Q: Can I use a different 3D model than Ready Player Me?**
A: Yes! The MayaCharacter component can load any GLB/GLTF file. Just replace the model path.

**Q: How do I add more animations?**
A: Create new animation clips in the Animations.tsx component, then map them to response categories in mockResponses.ts.

**Q: Can I integrate real AI later?**
A: Absolutely! Replace MockResponseEngine with a real API call to Claude/ChatGPT. The interface is already abstracted.

**Q: What if I want to use ElevenLabs for voice?**
A: Create a new ElevenLabsProvider class implementing the TTSProvider interface, then update the provider configuration.

**Q: How do I change Cikgu Maya's appearance?**
A: Modify the character design in Ready Player Me and export a new GLB, or create a custom model in Blender.

**Q: Can this be integrated into ScholaView later?**
A: Yes! It's designed as a standalone prototype, but the components can be imported into the main app when ready.

---

## 🎉 Success Metrics

Once deployed, measure:
- ⏱️ Load time (<3s)
- 🎨 UI polish score (subjective)
- 🗣️ Voice naturalness (user feedback)
- 🎭 Animation smoothness (60fps)
- 📱 Mobile usability
- 😊 User engagement (time spent, messages sent)
- 🎯 Demo effectiveness (for sales)

---

**Ready to build?** Start with Prompt 1 (Persona Design) and work through sequentially. Each prompt builds on the previous one, creating a complete, production-ready 3D AI assistant prototype!

Good luck, and have fun bringing Cikgu Maya to life! 🚀
