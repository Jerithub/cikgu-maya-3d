# R3F 3D Character Creation Research

**Date:** 2025-12-26
**Topic:** Building Stylized 3D Characters with React Three Fiber
**Focus:** Geometric primitives, materials, animation patterns, shadows

---

## Executive Summary

React Three Fiber (R3F) provides declarative, component-based approach to Three.js character creation. Use geometric primitives (Sphere, Capsule, Cylinder, Torus) with MeshStandardMaterial for stylized characters. Animation via `useFrame` hook + refs. Shadows require explicit `castShadow`/`receiveShadow` props.

**Key Packages:**
- `@react-three/fiber` - Core renderer
- `@react-three/drei` - Helpers (animations, controls, loaders)
- `three` - Core 3D engine

---

## 1. Geometric Primitives for Character Creation

### Available Primitives
- **SphereGeometry** - Heads, eyes, spherical joints
- **CapsuleGeometry** - Body segments, limbs (rounded ends)
- **CylinderGeometry** - Arms, legs, neck
- **TorusGeometry** - Accessories, hair loops
- **BoxGeometry** - Hands, feet, blocky features

### Character Structure Pattern

```jsx
// Stylized character with group hierarchy
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Character() {
  const groupRef = useRef()
  const headRef = useRef()
  const armLeftRef = useRef()
  const armRightRef = useRef()

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#ffccaa" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.4, 1, 4, 8]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.1} roughness={0.9} />
      </mesh>

      {/* Arms */}
      <mesh ref={armLeftRef} position={[-0.6, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
        <meshStandardMaterial color="#ffccaa" metalness={0.1} roughness={0.8} />
      </mesh>

      <mesh ref={armRightRef} position={[0.6, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
        <meshStandardMaterial color="#ffccaa" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  )
}
```

### Key Geometry Args

- `sphereGeometry args=[radius, widthSegments, heightSegments]`
- `capsuleGeometry args=[radius, length, capsSegments, radialSegments]`
- `cylinderGeometry args=[radiusTop, radiusBottom, height, radialSegments]`
- `torusGeometry args=[radius, tube, radialSegments, tubularSegments]`

---

## 2. Material Setup

### MeshStandardMaterial Properties

**Skin/Body Material:**
```jsx
<meshStandardMaterial
  color="#ffccaa"
  metalness={0.1}    // Low metalness for organic feel
  roughness={0.8}    // High roughness for matte finish
/>
```

**Clothing Material:**
```jsx
<meshStandardMaterial
  color="#3b82f6"
  metalness={0.0}    // No metalness for fabric
  roughness={0.9}    // Very rough for cloth texture
/>
```

**Accessory Material:**
```jsx
<meshStandardMaterial
  color="#ffd700"
  metalness={0.3}    // Slight metallic for shine
  roughness={0.4}    // Lower roughness for reflection
/>
```

### Material Guidelines

| Surface Type | Metalness | Roughness | Effect |
|--------------|-----------|-----------|--------|
| Skin | 0.0-0.1 | 0.7-0.9 | Matte, organic |
| Fabric/Clothing | 0.0 | 0.8-0.9 | Soft, diffuse |
| Plastic | 0.1-0.3 | 0.5-0.7 | Slight shine |
| Metal | 0.7-1.0 | 0.1-0.4 | Reflective |

**Pitfalls:**
- Avoid `metalness={1}` + `roughness={0}` (perfect mirror causes rendering issues)
- Don't use MeshBasicMaterial (no lighting interaction)
- Avoid extreme values (causes rendering artifacts)

---

## 3. Ref Management for Animation

### Ref Pattern

```jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function AnimatedCharacter() {
  const groupRef = useRef()
  const headRef = useRef()
  const jawRef = useRef()
  const armLeftRef = useRef()
  const armRightRef = useRef()

  useFrame((state, delta) => {
    // Access current THREE.Mesh object via .current
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }

    // Breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={headRef} {...headProps} />
      <mesh ref={jawRef} {...jawProps} />
      <mesh ref={armLeftRef} {...armLeftProps} />
      <mesh ref={armRightRef} {...armRightProps} />
    </group>
  )
}
```

### TypeScript Typing

```tsx
import * as THREE from 'three'

const headRef = useRef<THREE.Mesh>(null!)
const groupRef = useRef<THREE.Group>(null!)
```

### Best Practices

1. **Null check refs:** Always check `ref.current` exists before access
2. **Use refs for performance:** Direct THREE object access beats state updates
3. **Group hierarchy:** Parent refs for whole-body transforms, child refs for individual parts
4. **Clean refs:** R3F auto-cleans refs on unmount

**Pitfalls:**
- Don't `setState` in `useFrame` (causes infinite re-renders)
- Avoid `useEffect` for animations (use `useFrame` instead)
- Don't mutate refs outside render loop unless necessary

---

## 4. Animation Patterns

### 4.1 Idle Animations

#### Breathing Animation
```jsx
useFrame((state) => {
  const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.02
  groupRef.current.position.y = breathe
})
```

#### Blinking Animation
```jsx
const [blink, setBlink] = useState(false)

useEffect(() => {
  const interval = setInterval(() => {
    setBlink(true)
    setTimeout(() => setBlink(false), 150)
  }, 3000 + Math.random() * 2000)
  return () => clearInterval(interval)
}, [])

// In render
<mesh scale={blink ? [1, 0.1, 1] : [1, 1, 1]}>
  {/* Eye geometry */}
</mesh>
```

#### Subtle Movement
```jsx
useFrame((state) => {
  // Gentle head sway
  headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  headRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05

  // Arm sway
  armLeftRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
})
```

### 4.2 Gesture Animations

#### Wave Gesture
```jsx
const [isWaving, setIsWaving] = useState(false)

useFrame((state) => {
  if (isWaving && armRightRef.current) {
    // Wave motion
    armRightRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.5
    armRightRef.current.position.y = 0.8 + Math.sin(state.clock.elapsedTime * 10) * 0.1
  }
})

// Trigger
<mesh onClick={() => setIsWaving(!isWaving)} />
```

#### Nod Gesture
```jsx
const [isNodding, setIsNodding] = useState(false)

useFrame((state) => {
  if (isNodding && headRef.current) {
    // Nod up and down
    headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 15) * 0.3
  }
})
```

#### Thinking Pose
```jsx
useFrame((state) => {
  // Head tilt
  headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1) * 0.2 + 0.3

  // Hand to chin
  armRightRef.current.rotation.x = -1.5
  armRightRef.current.rotation.z = 0.5
})
```

### 4.3 Audio-Reactive Animation

#### Jaw Movement from Audio Amplitude
```jsx
import { useEffect, useRef, useState } from 'react'

function AudioReactiveJaw({ audioUrl }) {
  const jawRef = useRef()
  const [audio, setAudio] = useState(null)
  const [analyser, setAnalyser] = useState(null)

  useEffect(() => {
    const audioEl = new Audio(audioUrl)
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const src = ctx.createMediaElementSource(audioEl)
    const analyserNode = ctx.createAnalyser()

    src.connect(analyserNode)
    analyserNode.connect(ctx.destination)
    analyserNode.fftSize = 256

    setAudio(audioEl)
    setAnalyser(analyserNode)

    return () => {
      audioEl.pause()
      ctx.close()
    }
  }, [audioUrl])

  useFrame(() => {
    if (analyser && jawRef.current) {
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)

      // Get average amplitude
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length

      // Map amplitude to jaw rotation (0 to 0.5 radians)
      const jawOpen = (average / 255) * 0.5
      jawRef.current.rotation.x = jawOpen
    }
  })

  return (
    <mesh ref={jawRef} position={[0, -0.4, 0.3]}>
      <boxGeometry args={[0.3, 0.1, 0.2]} />
      <meshStandardMaterial color="#ffccaa" />
    </mesh>
  )
}
```

**Audio Pitfalls:**
- Browser autoplay policies require user interaction
- AudioContext must resume on user gesture
- Clean up AudioContext on unmount (memory leaks)
- Use proper FFT size (256 = 128 data points, good for speech)

---

## 5. Shadow Configuration

### Enabling Shadows

```jsx
<Canvas
  shadows
  camera={{ position: [0, 2, 5], fov: 50 }}
>
  {/* Lighting must cast shadow */}
  <directionalLight
    position={[5, 5, 5]}
    intensity={1}
    castShadow
    shadow-mapSize={[1024, 1024]}
  />

  {/* All character meshes need these props */}
  <mesh castShadow receiveShadow>
    <sphereGeometry args={[0.5]} />
    <meshStandardMaterial color="#ffccaa" />
  </mesh>

  {/* Ground must receive shadow */}
  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
    <planeGeometry args={[10, 10]} />
    <meshStandardMaterial color="#f0f0f0" />
  </mesh>
</Canvas>
```

### Shadow Best Practices

1. **Enable on Canvas:** `<Canvas shadows />`
2. **Light setup:** Light must have `castShadow` prop
3. **Mesh props:**
   - `castShadow` - Character casts shadows on ground
   - `receiveShadow` - Character receives self-shadows
4. **Shadow map size:** Higher = better quality, more expensive (1024 default)

**Shadow Types:**
- `BasicShadowMap` - Fastest, lowest quality
- `PCFShadowMap` - Default, good balance
- `PCFSoftShadowMap` - Softer edges, better quality
- `VSMShadowMap` - Variable soft shadows

**Pitfalls:**
- Forgetting `receiveShadow` on ground (shadows invisible)
- Missing `castShadow` on light source
- High shadow-mapSize causes performance issues

---

## 6. Group Hierarchy

### Structure Pattern

```jsx
<Character>
  <group ref={rootGroup}>              {/* Root - full transforms */}
    <group ref={torsoGroup}>            {/* Torso - body positioning */}
      <mesh ref={torsoMesh} />          {/* Body mesh */}
    </group>

    <group ref={headGroup}>             {/* Head group */}
      <mesh ref={headMesh} />           {/* Head mesh */}
      <group ref={jawGroup}>            {/* Jaw subgroup */}
        <mesh ref={jawMesh} />          {/* Jaw mesh */}
      </group>
    </group>

    <group ref={armLeftGroup}>          {/* Left arm */}
      <mesh ref={armLeftMesh} />
    </group>

    <group ref={armRightGroup}>         {/* Right arm */}
      <mesh ref={armRightMesh} />
    </group>
  </group>
</Character>
```

### Hierarchy Benefits

1. **Independent animation:** Animate groups without affecting children
2. **Compound transforms:** Parent rotation affects child position
3. **Organized structure:** Easy to manage complex characters
4. **Performance:** Group transforms are cached

### Transform Propagation

```jsx
// Parent rotation affects child position
useFrame(() => {
  torsoGroup.current.rotation.x = 0.5  // Child moves with parent
})

// Child can still have independent transforms
useFrame(() => {
  headGroup.current.rotation.y = 1  // Independent head rotation
})
```

**Pitfalls:**
- Too many nested groups = performance hit
- Forgetting group refs = no access to transforms
- Mixing mesh and group transforms = confusion

---

## 7. Best Practices

### DO ✅

- Use refs for animated parts (performance)
- Check `ref.current` exists before accessing
- Use `useFrame` for animations (not `useEffect`)
- Enable shadows on Canvas + lights + meshes
- Organize with group hierarchy
- Use MeshStandardMaterial for realistic lighting
- Keep animations simple in `useFrame` (avoid heavy calc)
- Use TypeScript for type safety

### DON'T ❌

- `setState` in `useFrame` (infinite loops)
- Use MeshBasicMaterial (no lighting)
- Forget `castShadow`/`receiveShadow` (no shadows)
- Extreme material values (rendering artifacts)
- Mutate refs outside render loop (unless necessary)
- Overly nested groups (performance issues)
- Skip null checks on refs (crashes)

---

## 8. Code Example: Complete Character

```jsx
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function StylizedCharacter() {
  const groupRef = useRef()
  const headRef = useRef()
  const jawRef = useRef()
  const armLeftRef = useRef()
  const armRightRef = useRef()

  const [isWaving, setIsWaving] = useState(false)
  const [blink, setBlink] = useState(false)

  // Blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [])

  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime

    // Breathing
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 2) * 0.02
    }

    // Head idle movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
      headRef.current.rotation.x = Math.cos(time * 0.3) * 0.05
    }

    // Waving gesture
    if (isWaving && armRightRef.current) {
      armRightRef.current.rotation.z = Math.sin(time * 10) * 0.5
      armRightRef.current.position.y = 0.8 + Math.sin(time * 10) * 0.1
    } else if (armRightRef.current) {
      // Reset arm position
      armRightRef.current.rotation.z = THREE.MathUtils.lerp(
        armRightRef.current.rotation.z,
        0,
        0.1
      )
      armRightRef.current.position.y = THREE.MathUtils.lerp(
        armRightRef.current.position.y,
        0.6,
        0.1
      )
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 1.5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ffccaa"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.6, 0.4]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.5} />
      </mesh>
      <mesh position={[0.15, 1.6, 0.4]} castShadow>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.5} />
      </mesh>

      {/* Pupils (blink support) */}
      <mesh
        position={[-0.15, 1.6, 0.45]}
        scale={blink ? [1, 0.1, 1] : [1, 1, 1]}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh
        position={[0.15, 1.6, 0.45]}
        scale={blink ? [1, 0.1, 1] : [1, 1, 1]}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Jaw */}
      <mesh ref={jawRef} position={[0, 1.1, 0.35]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.2]} />
        <meshStandardMaterial color="#ffccaa" metalness={0.1} roughness={0.8} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.4, 1, 4, 8]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Left Arm */}
      <mesh
        ref={armLeftRef}
        position={[-0.6, 0.6, 0]}
        rotation={[0, 0, 0.2]}
        castShadow
        receiveShadow
      >
        <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
        <meshStandardMaterial
          color="#ffccaa"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Right Arm (waving) */}
      <mesh
        ref={armRightRef}
        position={[0.6, 0.6, 0]}
        rotation={[0, 0, -0.2]}
        castShadow
        receiveShadow
        onClick={() => setIsWaving(!isWaving)}
      >
        <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
        <meshStandardMaterial
          color="#ffccaa"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

export default StylizedCharacter
```

---

## 9. Performance Optimization

### Geometry Optimization

```jsx
// Lower segments for performance
<sphereGeometry args={[0.5, 16, 16]} />  // Instead of [0.5, 32, 32]
```

### Material Reuse

```jsx
// Define once, reuse
const skinMaterial = new THREE.MeshStandardMaterial({
  color: '#ffccaa',
  metalness: 0.1,
  roughness: 0.8
})

<mesh material={skinMaterial}>
  <sphereGeometry args={[0.5]} />
</mesh>
```

### Instance for Repeated Parts

```jsx
// For many identical objects (buttons, accessories)
<InstancedMesh args={[geometry, material, count]} />
```

---

## 10. Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Shadows not showing | Enable `shadows` on Canvas, `castShadow` on light + meshes |
| Animations jerky | Use `delta` in useFrame, avoid heavy calcs |
| Memory leaks | Clean up AudioContext, intervals, refs on unmount |
| Ref undefined | Always check `ref.current` before accessing |
| Material too shiny | Lower `metalness` (0-0.3), raise `roughness` (0.7-0.9) |
| Performance issues | Reduce geometry segments, reuse materials, use instances |

---

## Unresolved Questions

1. **Audio-reactive optimization:** Best practices for real-time audio analysis without performance hit?
2. **Complex joint systems:** How to handle multi-joint limbs (shoulder + elbow + wrist) cleanly?
3. **Animation libraries:** Integration with framer-motion-3d vs spring-physics vs manual useFrame?
4. **Mobile performance:** Specific optimization strategies for mobile devices?
5. **Procedural animation:** Best approach for IK/FK systems in R3F?

---

## Resources

- **R3F Docs:** https://docs.pmnd.rs/react-three-fiber
- **Three.js Docs:** https://threejs.org/docs/
- **Drei Helpers:** https://github.com/pmndrs/drei
- **Examples:** https://docs.pmnd.rs/react-three-fiber/examples

---

**Next Steps:** Plan character implementation with specific features (idle states, gestures, audio-reactive jaw).
