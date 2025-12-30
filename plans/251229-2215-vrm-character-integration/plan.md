# VRM Character Integration Plan

**Status:** In Progress | **Priority:** High | **Created:** 251229-2215

Replace geometric character with VRM character from VRoid Studio.

## Phases

| Phase | Status | Link |
|-------|--------|------|
| 01. Setup | Pending | [phase-01-setup.md](phase-01-setup.md) |
| 02. VRM Loader | Pending | [phase-02-vrm-loader.md](phase-02-vrm-loader.md) |
| 03. Animations | Pending | [phase-03-animations.md](phase-03-animations.md) |
| 04. Integration | Pending | [phase-04-integration.md](phase-04-integration.md) |
| 05. Testing | Pending | [phase-05-testing.md](phase-05-testing.md) |

## Overview

Convert `MayaCharacter.tsx` from geometric primitives to VRM model using `@pixiv/three-vrm`.

### Key Changes

1. Move `Maya.vrm` to `public/` directory
2. Create `VRMCharacter.tsx` with VRM loader
3. Map existing animations to VRM bones
4. Preserve existing `AnimationState` interface

### Dependencies (Installed)

- `@pixiv/three-vrm`: ^3.4.4
- `@react-three/fiber`: ^8.17.10
- `three`: ^0.170.0

## Success Criteria

- [ ] VRM model loads and renders correctly
- [ ] All animations (idle, talking, wave, nod, thinking, pointing) work
- [ ] Lip-sync animation for talking state
- [ ] No breaking changes to existing chat interface
