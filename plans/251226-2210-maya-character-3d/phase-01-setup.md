# Phase 01: Project Setup

**Status:** Pending
**Priority:** High

---

## Context

- Plan: [plan.md](./plan.md)
- Research: [../../reports/researcher-251226-2211-r3f-character-creation.md](../../reports/researcher-251226-2211-r3f-character-creation.md)

---

## Overview

Initialize the React project with required dependencies for Three.js and React Three Fiber development.

---

## Key Requirements

### Dependencies
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Useful helpers for R3F
- `three` - Core 3D library
- `@types/three` - TypeScript types
- `typescript` - Type checking
- `vite` - Build tool (or alternative)

### Project Structure
```
src/
  components/
    MayaCharacter.tsx    # Main character component
  App.tsx                 # Demo app with Canvas
  main.tsx                # Entry point
```

---

## Implementation Steps

1. Initialize Vite + React + TypeScript project
2. Install R3F dependencies
3. Create base project structure
4. Set up Canvas with shadows
5. Verify render loop works

---

## Todo List

- [ ] Initialize project (Vite + React + TypeScript)
- [ ] Install `@react-three/fiber` `@react-three/drei` `three` `@types/three`
- [ ] Create src directory structure
- [ ] Create App.tsx with Canvas setup
- [ ] Create main.tsx entry point
- [ ] Add basic test mesh to verify rendering

---

## Success Criteria

- Project builds without errors
- Canvas renders with shadows enabled
- Basic mesh appears on screen

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Version conflicts | Use lockfile, pin compatible versions |
| Three.js peer dependency issues | Follow R3F version compatibility matrix |

---

## Security Considerations

- No user input handling needed for this phase
- Ensure dependencies are from trusted npm registry

---

## Next Steps

Proceed to [phase-02-character-meshes.md](./phase-02-character-meshes.md) after setup verification.
