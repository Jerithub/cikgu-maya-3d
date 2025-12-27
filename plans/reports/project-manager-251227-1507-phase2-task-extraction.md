# Phase 2 Task Extraction Report

**Date:** 2025-12-27
**Plan:** 251227-1114-cikgu-maya-3d-mvp
**Section:** Phase 2: 3D Scene (Lines 712-727)

---

## PHASE_2_TASKS:

**Step 2.1:** Create `Scene.tsx` component with Canvas, lighting setup, environment, ground plane, and OrbitControls

**Step 2.2:** Create `Viewport3D.tsx` wrapper component for 3D canvas integration

**Step 2.3:** Enhance existing `MayaCharacter.tsx` - add `pointing` animation with arm gesture (rotation -1.8z, -0.5x, position y 1.3)

**Step 2.4:** Add audio amplitude sync to `MayaCharacter.tsx` talking animation - use `audioAmplitude` prop to control jaw rotation

**Step 2.5:** Refine existing animations in MayaCharacter (idle, talking, wave, nod, thinking) for smooth transitions

**Step 2.6:** Add OrbitControls camera with constraints (no pan, zoom 2-6, polar angle limits, target [0,1.2,0])

**Step 2.7:** Optimize lighting setup - ambient (0.6), directional with shadows (1.0, shadow-map 1024), point light (0.4)

**Step 2.8:** Test all 6 animations: idle, talking, wave, nod, thinking, pointing

---

## AMBIGUITIES:

1. **Audio Amplitude Source**: Plan mentions `audioAmplitude` prop but doesn't specify how to derive actual audio amplitude from Web Speech API during TTS playback
2. **Animation Transitions**: "Refine existing animations" is vague - what specific improvements needed beyond smooth transitions?
3. **Testing Criteria**: No specific pass/fail criteria for animation testing beyond "all animations work"

---

## REQUIRED_SKILLS:

- **React Three Fiber**: @react-three/fiber, @react-three/drei (OrbitControls, Environment)
- **Three.js**: Core 3D primitives, lighting, shadows, mesh manipulation
- **Animation Programming**: THREE.MathUtils.lerp for smooth interpolation, rotation/position transforms
- **TypeScript**: Interface definitions, props typing
- **React Hooks**: useState, useRef for component references
- **State Management**: Zustand store integration (useChatStore)

---

## BLOCKERS:

none

---

## DEPENDENCIES:

- Phase 1 must be complete (Layout component, Zustand store)
- Existing MayaCharacter.tsx must be accessible
- Three.js dependencies installed (@react-three/fiber, @react-three/drei, three)

---

## ACCEPTANCE_CRITERIA:

1. Scene.tsx renders Canvas with all lights, shadows, ground, environment
2. Viewport3D.tsx wraps scene and integrates with Layout
3. MayaCharacter accepts `animation` and `audioAmplitude` props
4. Pointing animation: right arm rotates/positions correctly, lasts 2 seconds
5. Talking animation: jaw rotation syncs with audioAmplitude value
6. All 6 animations play without visual glitches
7. Camera orbits smoothly within defined constraints
8. Shadows render correctly on ground plane
