# Phase 03: VRM Animations

**Status:** Pending | **Priority:** High

## Context

- Parent: [plan.md](plan.md)
- Research: [researcher-251229-2205-vrm-integration.md](../../reports/researcher-251229-2205-vrm-integration.md)
- Existing: `src/components/3d/MayaCharacter.tsx:46-234` - Animation logic

## Overview

Map existing animations to VRM humanoid bones.

## Requirements

1. Idle: Breathing (hips/ chest) + head sway
2. Talking: Jaw rotation
3. Wave: Right arm wave motion
4. Nod: Head rotation x-axis
5. Thinking: Hand to chin pose + head tilt
6. Pointing: Right arm forward

## VRM Bones to Use

- `head` - nod, thinking tilt, idle sway
- `jaw` - talking animation
- `rightUpperArm`, `rightLowerArm` - wave, pointing, thinking
- `chest` - breathing animation

## Implementation Steps

1. Add bone refs in VRMCharacter component
2. Create bone access helper using `vrm.humanoid.getNormalizedBoneNode()`
3. Port animation logic from MayaCharacter useFrame
4. Apply rotations to bone nodes with lerp smoothing

## Success Criteria

- [ ] All animations work on VRM model
- [ ] Smooth transitions between states
- [ ] Breathing animation always active
