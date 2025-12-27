# Phase 02: Character Meshes

**Status:** Pending
**Priority:** High

---

## Context

- Plan: [plan.md](./plan.md)
- Research: [../../reports/researcher-251226-2211-r3f-character-creation.md](../../reports/researcher-251226-2211-r3f-character-creation.md)
- Persona: [../../reports/brainstorm-251226-2137-cikgu-maya-persona-design.md](../../reports/brainstorm-251226-2137-cikgu-maya-persona-design.md)

---

## Overview

Create the MayaCharacter.tsx component with all geometric meshes forming the stylized 3D character.

---

## Key Requirements

### Character Geometry

| Part | Geometry | Dimensions | Color |
|------|----------|------------|-------|
| Head | Sphere | r=0.4 | #f4c2a8 |
| Body | Capsule | rTop=0.4, rBottom=0.45, h=0.9 | #4a90e2 |
| Arms | Cylinder | r=0.08, h=0.7 ×2 | #f4c2a8 |
| Hands | Sphere | r=0.12 ×2 | #f4c2a8 |
| Eyes | Sphere | r=0.08 ×2 | #2c1810 |
| Hair | Sphere (partial) | r=0.45 | #2c1810 |
| Smile | Torus (curve) | - | Darker skin |

### Material Properties
- Skin: `metalness={0.1}, roughness={0.8}`
- Clothing: `metalness={0.1}, roughness={0.9}`

### Ref Structure
```typescript
characterRef: THREE.Group  // Root
headRef: THREE.Mesh        // Head + hair + face
jawRef: THREE.Mesh         // Mouth for talking
armLeftRef: THREE.Mesh     // Left arm
armRightRef: THREE.Mesh    // Right arm (wave gesture)
```

---

## Implementation Steps

1. Create `src/components/MayaCharacter.tsx`
2. Define refs for animated parts
3. Create head group (sphere + hair partial + eyes + smile)
4. Create body capsule with teal blue
5. Create arm cylinders with hands
6. Apply MeshStandardMaterial with correct properties
7. Enable castShadow + receiveShadow on all meshes
8. Group under single `<group ref={characterRef}>`

---

## Architecture

```tsx
<MayaCharacter>
  <group ref={characterRef}>
    {/* Head Group */}
    <group ref={headRef}>
      <mesh> {/* Head sphere */} </mesh>
      <mesh> {/* Hair partial sphere */} </mesh>
      <mesh> {/* Left eye */} </mesh>
      <mesh> {/* Right eye */} </mesh>
      <mesh ref={jawRef}> {/* Mouth/smile */} </mesh>
    </group>

    {/* Body */}
    <mesh> {/* Body capsule */} </mesh>

    {/* Arms */}
    <mesh ref={armLeftRef}> {/* Left arm + hand */} </mesh>
    <mesh ref={armRightRef}> {/* Right arm + hand */} </mesh>
  </group>
</MayaCharacter>
```

---

## Todo List

- [ ] Create MayaCharacter.tsx with refs
- [ ] Build head with sphere (r=0.4, skin #f4c2a8)
- [ ] Add hair partial sphere (r=0.45, black #2c1810)
- [ ] Add eyes (r=0.08, dark brown #2c1810)
- [ ] Add smile/mouth (torus, darker skin)
- [ ] Build body capsule (0.4/0.45 × 0.9, teal #4a90e2)
- [ ] Build arm cylinders (r=0.08 × h=0.7, skin)
- [ ] Add hand spheres (r=0.12, skin)
- [ ] Apply MeshStandardMaterial (metalness 0.1-0.3, roughness 0.7-0.9)
- [ ] Enable castShadow + receiveShadow
- [ ] Verify character renders in App.tsx

---

## Success Criteria

- All body parts visible and correctly positioned
- Colors match specification
- Materials look matte (not overly shiny)
- Shadows render on ground plane

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Geometry positioning issues | Use XYZ coordinates from spec, adjust iteratively |
| Hair sphere covers face | Use phiLength/thetaStart to create partial sphere |
| Materials look plastic | Adjust metalness/roughness values |

---

## Security Considerations

- No user input handling
- Static geometry, no injection risk

---

## Next Steps

Proceed to [phase-03-animations.md](./phase-03-animations.md) after meshes render correctly.
