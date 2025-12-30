# Phase 04: Integration

**Status:** Pending | **Priority:** High

## Context

- Parent: [plan.md](plan.md)
- Existing: `src/components/3d/Scene.tsx`

## Overview

Swap MayaCharacter with VRMCharacter in Scene.

## Related Files

- `src/components/3d/Scene.tsx:3` - MayaCharacter import
- `src/components/3d/Scene.tsx:31-34` - MayaCharacter usage

## Implementation Steps

1. Update Scene.tsx import
2. Verify animation props pass correctly
3. Test with existing chatStore animations

## Success Criteria

- [ ] VRM renders in place of geometric character
- [ ] Chat animations trigger correctly
- [ ] No console errors
