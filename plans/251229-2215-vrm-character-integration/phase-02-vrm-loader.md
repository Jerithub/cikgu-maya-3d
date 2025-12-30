# Phase 02: VRM Loader Component

**Status:** Pending | **Priority:** High

## Context

- Parent: [plan.md](plan.md)
- Research: [researcher-251229-2205-vrm-integration.md](../../reports/researcher-251229-2205-vrm-integration.md)
- Existing: `src/components/3d/MayaCharacter.tsx`

## Overview

Create `VRMCharacter.tsx` that loads and renders the VRM model.

## Requirements

1. Load VRM using `GLTFLoader` + `VRMLoaderPlugin`
2. Handle loading state
3. Call `vrm.update(delta)` every frame
4. Support same props as `MayaCharacter`

## Related Files

- `src/components/3d/MayaCharacter.tsx:5-15` - Props interface
- `src/components/3d/Scene.tsx:31-34` - Usage pattern

## Implementation Steps

1. Create `src/components/3d/VRMCharacter.tsx`
2. Import GLTFLoader from drei examples
3. Import VRMLoaderPlugin from @pixiv/three-vrm
4. Load VRM from `/Maya.vrm`
5. Add loading spinner/fallback
6. Export with same AnimationState types

## Success Criteria

- [ ] VRM loads without errors
- [ ] Model renders in scene
- [ ] Loading state handled gracefully
