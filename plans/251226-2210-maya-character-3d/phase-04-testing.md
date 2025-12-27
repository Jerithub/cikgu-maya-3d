# Phase 04: Testing

**Status:** Pending
**Priority:** Medium

---

## Context

- Plan: [plan.md](./plan.md)

---

## Overview

Verify the MayaCharacter component renders correctly and all animations function as specified.

---

## Key Requirements

### Visual Verification
- Character appears in correct proportions
- Colors match specification
- Shadows render correctly
- Materials look matte, not plastic

### Functional Testing
- All 5 animation states work
- Transitions between states are smooth
- Audio amplitude controls talking jaw
- No console errors or warnings

---

## Implementation Steps

1. Create test App.tsx with animation controls
2. Add buttons to trigger each animation state
3. Add slider for audio amplitude simulation
4. Verify each animation state
5. Check for TypeScript errors
6. Test responsiveness on resize

---

## Architecture

```tsx
// App.tsx test harness
function App() {
  const [animation, setAnimation] = useState<AnimationState>('idle')
  const [amplitude, setAmplitude] = useState(0)

  return (
    <Canvas shadows camera={{ position: [0, 2, 5] }}>
      <Lights />
      <MayaCharacter animation={animation} audioAmplitude={amplitude} />
      <Ground />
    </Canvas>
  )
}
```

---

## Todo List

- [ ] Build App.tsx with animation controls
- [ ] Add directional + ambient lights
- [ ] Add ground plane with receiveShadow
- [ ] Test idle animation
- [ ] Test talking animation (with amplitude slider)
- [ ] Test wave animation
- [ ] Test nod animation
- [ ] Test thinking animation
- [ ] Run TypeScript check (tsc --noEmit)
- [ ] Verify no console errors

---

## Success Criteria

- All animations trigger correctly
- Character shadows render on ground
- No TypeScript errors
- Smooth 60fps rendering
- Component responds to prop changes

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Performance issues | Reduce geometry segments if needed |
| Animation not visible | Check camera position and lighting |

---

## Security Considerations

- Test harness only for development
- No production exposure needed

---

## Next Steps

After testing complete, create usage documentation and example integration code.
