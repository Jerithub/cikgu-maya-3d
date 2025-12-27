# Maya Character 3D Implementation Plan

**Date:** 2025-12-26
**Type:** Feature Implementation
**Status:** Completed

---

## Overview

Build Cikgu Maya as a stylized geometric 3D character using Three.js and React Three Fiber. The character will feature realistic materials, shadow support, and five animation states (idle, talking, wave, nod, thinking).

---

## Phases

| Phase | Status | Description |
|-------|--------|-------------|
| [01-setup](./phase-01-setup.md) | Completed | Project setup with dependencies |
| [02-character-meshes](./phase-02-character-meshes.md) | Completed | Build geometric character meshes |
| [03-animations](./phase-03-animations.md) | Completed | Implement character animations |
| [04-testing](./phase-04-testing.md) | Completed | Test and verify component |

---

## Key Specifications

### Character Design (from persona brief)
- **Style:** Stylized geometric (Pixar-esque maturity)
- **Colors:** Teal blue body (#4a90e2), skin tone (#f4c2a8), dark brown hair/eyes (#2c1810)
- **Personality:** Professional, warm, approachable colleague

### Technical Requirements
- React Three Fiber for rendering
- Geometric primitives (Sphere, Capsule, Cylinder, Torus)
- MeshStandardMaterial (metalness 0.1-0.3, roughness 0.7-0.9)
- Shadow support (castShadow, receiveShadow)
- Ref-based animation system

---

## Related Files

- Research: `plans/reports/researcher-251226-2211-r3f-character-creation.md`
- Persona: `plans/reports/brainstorm-251226-2137-cikgu-maya-persona-design.md`

---

## Unresolved Questions

1. Audio input format for talking animation (live mic, pre-recorded, or amplitude prop?)
2. Animation trigger mechanism (props, callbacks, or imperative API?)
3. Performance targets (polygon count, target FPS?)
