# Phase 03: Character Animations

**Status:** Pending
**Priority:** High

---

## Context

- Plan: [plan.md](./plan.md)
- Research: [../../reports/researcher-251226-2211-r3f-character-creation.md](../../reports/researcher-251226-2211-r3f-character-creation.md)

---

## Overview

Implement five animation states using `useFrame` hook and ref-based transforms.

---

## Key Requirements

### Animation States

1. **Idle (default)** - Breathing, blinking, subtle head movement
2. **Talking** - Jaw movement synced to audio amplitude
3. **Wave** - Arm lifts, hand waves
4. **Nod** - Head tilts down 2-3 times
5. **Thinking** - Hand to chin pose, head tilt

### Control Interface
```typescript
interface MayaCharacterProps {
  animation?: 'idle' | 'talking' | 'wave' | 'nod' | 'thinking'
  audioAmplitude?: number  // 0-1 for talking animation
}
```

---

## Implementation Steps

### 1. Idle Animation
- Breathing: `groupRef.position.y = sin(time * 2) * 0.02`
- Blinking: Random interval (3-5s), scale eyes Y to 0.1
- Head sway: `rotation.y = sin(time * 0.5) * 0.1`

### 2. Talking Animation
- Map `audioAmplitude` prop to jaw rotation
- `jawRef.rotation.x = amplitude * 0.5`
- Smooth interpolation with lerp

### 3. Wave Gesture
- Raise arm: `armRightRef.rotation.z = -2.5`
- Wave motion: `rotation.x = sin(time * 10) * 0.5`

### 4. Nod Gesture
- `headRef.rotation.x = sin(time * 15) * 0.3`
- Auto-return to idle after 2-3 nods

### 5. Thinking Pose
- Hand to chin: `armRightRef.position = [0.3, 1.4, 0.2]`
- Head tilt: `headRef.rotation.z = 0.2`

---

## Architecture

```tsx
function MayaCharacter({ animation, audioAmplitude }: Props) {
  // Refs
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const jawRef = useRef<THREE.Mesh>(null)
  const armLeftRef = useRef<THREE.Mesh>(null)
  const armRightRef = useRef<THREE.Mesh>(null)

  // Blinking state
  const [blink, setBlink] = useState(false)

  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Always run idle (breathing, subtle movement)
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 2) * 0.02
    }

    // State-based animations
    switch (animation) {
      case 'talking':
        animateTalking(audioAmplitude ?? 0)
        break
      case 'wave':
        animateWave(time)
        break
      case 'nod':
        animateNod(time)
        break
      case 'thinking':
        animateThinking()
        break
      default:
        animateIdle(time)
    }
  })

  // ... render meshes
}
```

---

## Todo List

- [ ] Add animation prop interface
- [ ] Implement idle breathing animation
- [ ] Implement blinking with useEffect interval
- [ ] Implement talking animation (jaw from amplitude)
- [ ] Implement wave gesture
- [ ] Implement nod gesture
- [ ] Implement thinking pose
- [ ] Add smooth transitions (lerp) between states
- [ ] Test all animation states

---

## Success Criteria

- Idle breathing is subtle and natural
- Blinking occurs at random intervals
- Talking jaw moves with amplitude input
- Wave gesture completes full motion
- Nod happens 2-3 times then stops
- Thinking pose holds stable

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Animation state conflicts | Use single switch in useFrame |
| Jerky transitions | Use THREE.MathUtils.lerp for smoothing |
| Infinite loops | Never setState in useFrame |

---

## Security Considerations

- Validate audioAmplitude is 0-1 range
- No external code execution

---

## Next Steps

Proceed to [phase-04-testing.md](./phase-04-testing.md) after animations work.
