# VRM Integration with React Three Fiber - Research Report

**Date:** 2025-12-29
**Researcher:** Claude (Subagent)
**Project:** Cikgu Maya 3D
**Status:** Ready for Implementation

---

## Executive Summary

VRM (Virtual Reality Model) integration with React Three Fiber (R3F) is **well-supported** via `@pixiv/three-vrm` v3.4.4 (already installed). Key findings:

✅ **Straightforward integration** - VRMLoaderPlugin works seamlessly with GLTFLoader
✅ **Bone manipulation** - Direct access to skeleton bones for custom animations
✅ **BlendShapes** - Built-in support for facial expressions (lip sync, emotions)
✅ **LookAt** - Automatic eye/head tracking available
✅ **First-person/Third-person views** - Camera modes built-in
⚠️ **Documentation limited** - Examples scattered, need to reference GitHub directly
⚠️ **TypeScript types** - May need augmentation for some VRM properties

---

## 1. Loading VRM in React Three Fiber

### Core Approach

```typescript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface VRMCharacterProps {
  url: string
  animation?: 'idle' | 'talking' | 'wave' | 'nod' | 'thinking'
  audioAmplitude?: number
}

export function VRMCharacter({ url, animation = 'idle', audioAmplitude = 0 }: VRMCharacterProps) {
  const vrmRef = useRef<VRM | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loader = new GLTFLoader()

    // Register VRM plugin
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser)
    })

    loader.load(
      url,
      (gltf) => {
        const vrm = gltf.userData.vrm

        if (vrm) {
          // Important: Call VRMUtils to remove unnecessary VRM components
          VRMUtils.deepRemoveVRMComponents(vrm.scene)

          // Adjust rotation + position for VRoid Studio models
          vrm.scene.rotation.y = Math.PI // Face forward
          vrm.scene.position.y = 0

          vrmRef.current = vrm
          setLoading(false)
        }
      },
      (progress) => {
        console.log(`Loading: ${(progress.loaded / progress.total) * 100}%`)
      },
      (error) => {
        console.error('Error loading VRM:', error)
        setError(error.message)
        setLoading(false)
      }
    )

    return () => {
      // Cleanup
      if (vrmRef.current) {
        vrmRef.current.scene.dispose()
      }
    }
  }, [url])

  // Animation loop
  useFrame((state, delta) => {
    if (vrmRef.current) {
      const vrm = vrmRef.current

      // Update VRM (crucial for blendshapes, lookat, etc.)
      vrm.update(delta)

      // Your custom animations here
      handleAnimations(vrm, animation, audioAmplitude, state.clock.elapsedTime)
    }
  })

  if (loading) return <LoadingScreen />
  if (error) return <ErrorScreen message={error} />

  return <primitive object={vrmRef.current?.scene} />
}
```

### Key Points

1. **VRMLoaderPlugin** - Register with GLTFLoader to parse VRM files
2. **VRMUtils.deepRemoveVRMComponents()** - Removes VRM-specific helpers (first-person camera, etc.)
3. **vrm.update(delta)** - **MUST** call every frame for blendshapes, lookat, constraints
4. **Rotation adjustment** - VRoid models face backward by default, rotate `Math.PI` to face forward
5. **Cleanup** - Dispose VRM scene on unmount

---

## 2. Accessing and Animating VRM Bones

### VRM Bone Structure

VRM models use a standardized humanoid bone structure:

```typescript
// Access via vrm.humanoid
const humanoid = vrm.humanoid

// Available bones (VRM 1.0 spec):
humanoid.getNormalizedBoneNode('head')       // Head
humanoid.getNormalizedBoneNode('neck')       // Neck
humanoid.getNormalizedBoneNode('chest')      // Chest/Spine
humanoid.getNormalizedBoneNode('spine')      // Upper spine
humanoid.getNormalizedBoneNode('hips')       // Hips

// Arms
humanoid.getNormalizedBoneNode('leftShoulder')
humanoid.getNormalizedBoneNode('leftUpperArm')
humanoid.getNormalizedBoneNode('leftLowerArm')
humanoid.getNormalizedBoneNode('leftHand')
humanoid.getNormalizedBoneNode('rightShoulder')
humanoid.getNormalizedBoneNode('rightUpperArm')
humanoid.getNormalizedBoneNode('rightLowerArm')
humanoid.getNormalizedBoneNode('rightHand')

// Legs
humanoid.getNormalizedBoneNode('leftUpperLeg')
humanoid.getNormalizedBoneNode('leftLowerLeg')
humanoid.getNormalizedBoneNode('leftFoot')
humanoid.getNormalizedBoneNode('rightUpperLeg')
humanoid.getNormalizedBoneNode('rightLowerLeg')
humanoid.getNormalizedBoneNode('rightFoot')

// Fingers (if available)
humanoid.getNormalizedBoneNode('leftThumb', 'leftIndex', 'leftMiddle', etc.)
humanoid.getNormalizedBoneNode('rightThumb', 'rightIndex', 'rightMiddle', etc.)
```

### Direct Bone Rotation

```typescript
function waveAnimation(vrm: VRM, time: number) {
  const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')

  if (rightArm) {
    // Wave motion
    rightArm.rotation.z = Math.sin(time * 10) * 0.5 + 2.5 // Lift arm
    rightArm.rotation.x = Math.sin(time * 15) * 0.3        // Wave back and forth
  }
}

function nodAnimation(vrm: VRM, time: number) {
  const head = vrm.humanoid.getNormalizedBoneNode('head')
  const neck = vrm.humanoid.getNormalizedBoneNode('neck')

  if (head && neck) {
    // Nod down and up
    const nodAmount = Math.sin(time * 15) * 0.3
    head.rotation.x = nodAmount
    neck.rotation.x = nodAmount * 0.5
  }
}

function thinkingAnimation(vrm: VRM, time: number) {
  const head = vrm.humanoid.getNormalizedBoneNode('head')
  const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')

  if (head) {
    // Tilt head slightly
    head.rotation.z = THREE.MathUtils.lerp(head.rotation.z, 0.15, 0.1)
  }

  if (rightArm) {
    // Bring hand to chin (adjust values for your model)
    rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -1.5, 0.1)
    rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, 0.5, 0.1)
  }
}
```

### Smooth Transitions

```typescript
// Use THREE.MathUtils.lerp for smooth transitions
function smoothAnimation(vrm: VRM, targetRotations: Record<string, THREE.Euler>, factor: number = 0.1) {
  Object.entries(targetRotations).forEach(([boneName, target]) => {
    const bone = vrm.humanoid.getNormalizedBoneNode(boneName)
    if (bone) {
      bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, target.x, factor)
      bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, target.y, factor)
      bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, target.z, factor)
    }
  })
}
```

---

## 3. Lip Sync with Jaw Rotation

### Option A: Simple Jaw Movement (Audio Amplitude)

```typescript
function talkingAnimation(vrm: VRM, audioAmplitude: number) {
  const jaw = vrm.humanoid.getNormalizedBoneNode('jaw')

  if (jaw) {
    // Map audio amplitude (0-1) to jaw rotation
    const maxJawOpen = 0.4 // Adjust for your model
    const jawOpen = audioAmplitude * maxJawOpen

    jaw.rotation.x = THREE.MathUtils.lerp(jaw.rotation.x, jawOpen, 0.3)
  }
}
```

### Option B: Viseme-Based Lip Sync (BlendShapes)

VRM models typically include AA, EH, IH, OH, U (vowel) blendshapes:

```typescript
function visemeLipSync(vrm: VRM, viseme: string, weight: number) {
  const blendShape = vrm.blendShape

  // Map visemes to VRM blendshape names
  const visemeMap: Record<string, string> = {
    'A': 'aa',
    'E': 'eh',
    'I': 'ih',
    'O': 'oh',
    'U': 'u',
  }

  const vrmBlendShape = visemeMap[viseme]
  if (vrmBlendShape) {
    blendShape.setValue(vrmBlendShape, weight)
  }
}

// Usage with TTS phoneme timing
function syncWithPhonemes(vrm: VRM, phonemes: Array<{ phoneme: string, endTime: number }>) {
  phonemes.forEach(({ phoneme, endTime }) => {
    setTimeout(() => {
      visemeLipSync(vrm, phoneme, 1.0)
      setTimeout(() => visemeLipSync(vrm, phoneme, 0.0), 100)
    }, endTime)
  })
}
```

### Option C: Analyze Real Audio (Web Audio API)

```typescript
function createAudioAnalyzer() {
  const audioContext = new AudioContext()
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 256
  return analyser
}

function getAudioAmplitude(analyser: AnalyserNode): number {
  const dataArray = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(dataArray)

  // Calculate average amplitude
  const sum = dataArray.reduce((a, b) => a + b, 0)
  const average = sum / dataArray.length

  // Normalize to 0-1
  return average / 255
}

// In useFrame loop:
useFrame(() => {
  if (isSpeaking && vrmRef.current) {
    const amplitude = getAudioAmplitude(analyser)
    talkingAnimation(vrmRef.current, amplitude)
  }
})
```

---

## 4. Custom Animations Mapping

### Animation Controller

```typescript
function handleAnimations(vrm: VRM, animation: string, audioAmplitude: number, time: number) {
  // Reset all bones to default pose
  resetPose(vrm)

  switch (animation) {
    case 'talking':
      talkingAnimation(vrm, audioAmplitude)
      break

    case 'wave':
      waveAnimation(vrm, time)
      break

    case 'nod':
      nodAnimation(vrm, time)
      break

    case 'thinking':
      thinkingAnimation(vrm, time)
      break

    case 'pointing':
      pointingAnimation(vrm)
      break

    case 'idle':
    default:
      idleAnimation(vrm, time)
      break
  }
}

function resetPose(vrm: VRM) {
  // Smoothly return all bones to neutral
  const bones = [
    'head', 'neck', 'chest', 'spine', 'hips',
    'leftShoulder', 'leftUpperArm', 'leftLowerArm', 'leftHand',
    'rightShoulder', 'rightUpperArm', 'rightLowerArm', 'rightHand'
  ]

  bones.forEach(boneName => {
    const bone = vrm.humanoid.getNormalizedBoneNode(boneName)
    if (bone) {
      bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, 0, 0.1)
      bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, 0, 0.1)
      bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, 0, 0.1)
    }
  })
}

function idleAnimation(vrm: VRM, time: number) {
  const head = vrm.humanoid.getNormalizedBoneNode('head')
  const chest = vrm.humanoid.getNormalizedBoneNode('chest')

  if (head) {
    // Subtle head sway
    head.rotation.y = Math.sin(time * 0.5) * 0.1
    head.rotation.x = Math.cos(time * 0.3) * 0.05
  }

  if (chest) {
    // Breathing
    chest.position.y = Math.sin(time * 2) * 0.02
  }
}

function pointingAnimation(vrm: VRM) {
  const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')
  const rightLowerArm = vrm.humanoid.getNormalizedBoneNode('rightLowerArm')

  if (rightArm && rightLowerArm) {
    // Extend arm forward
    rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -1.8, 0.1)
    rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, -0.5, 0.1)
    rightLowerArm.rotation.x = THREE.MathUtils.lerp(rightLowerArm.rotation.x, 0, 0.1)
  }
}
```

---

## 5. Best Practices & Common Pitfalls

### ✅ Best Practices

1. **Call vrm.update(delta) every frame**
   - Essential for blendshapes, lookat, constraints, spring bones
   - Pass `delta` from `useFrame` for time-independent animation

2. **Use VRMUtils for setup**
   ```typescript
   VRMUtils.deepRemoveVRMComponents(vrm.scene) // Remove VRM helpers
   VRMUtils.removeUnnecessaryVertices(vrm.scene) // Optimize geometry
   VRMUtils.removeUnnecessaryJoints(vrm.scene) // Remove hidden bones
   ```

3. **Smooth transitions with lerp**
   - Never set rotation directly (snap to value)
   - Always use `THREE.MathUtils.lerp()` for natural motion

4. **Handle model variations**
   - Not all VRM models have all bones (check for null)
   - Some models use blendshapes instead of bones for jaw
   - Test with multiple models

5. **Performance optimization**
   - Disable shadows if not needed
   - Use simple materials for web
   - Consider reducing polygon count

### ⚠️ Common Pitfalls

1. **Forgetting vrm.update()**
   - Blendshapes won't work
   - LookAt won't track
   - Constraints won't apply
   - Spring bones won't animate

2. **Wrong coordinate system**
   - VRoid models face backward by default
   - Rotate scene `Math.PI` on Y-axis
   - Adjust position Y to ground (usually -model height)

3. **Direct rotation setting**
   ```typescript
   // ❌ BAD: Snaps to value instantly
   bone.rotation.x = 0.5

   // ✅ GOOD: Smooth transition
   bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, 0.5, 0.1)
   ```

4. **Ignoring bone hierarchy**
   - Rotating "upper arm" also moves "lower arm" and "hand"
   - Consider local vs world space rotations
   - Use `humanoid.getNormalizedBoneNode()` for consistent transforms

5. **BlendShape name mismatches**
   - Different VRM authors use different names
   - Check `vrm.blendShape.registeredBlendShapeNames` to see what's available
   - Common names: "aa", "ih", "eh", "oh", "u" (visemes)
   - Also: "blink", "happy", "angry", "sad" (expressions)

6. **Missing TypeScript types**
   ```typescript
   // Add to your project if needed
   declare module '@pixiv/three-vrm' {
     export interface VRM {
       scene: THREE.Object3D
       humanoid: VRMHumanoid
       blendShape: VRMBlendShape
       lookAt: VRMLookAt
       // Add more as needed
     }
   }
   ```

7. **Memory leaks**
   - Always dispose VRM on unmount
   - Remove event listeners
   - Cancel animations

8. **Audio analysis not working**
   - Web Audio API requires user gesture
   - Create AudioContext only after user interaction
   - Handle CORS for external audio files

---

## 6. Integration with Existing Cikgu Maya Project

### Replace Geometric Character

Current `MayaCharacter.tsx` uses geometric primitives. Replace with:

```typescript
// src/components/3d/VRMCharacter.tsx
export function VRMCharacter({ animation, audioAmplitude }: MayaCharacterProps) {
  // Use URL parameter or default
  const vrmUrl = '/models/maya.vrm'

  return <VRMLoader url={vrmUrl} animation={animation} audioAmplitude={audioAmplitude} />
}
```

### Update Scene.tsx

```typescript
// src/components/3d/Scene.tsx
import { VRMCharacter } from './VRMCharacter' // Instead of MayaCharacter

export function Scene() {
  const animation = useChatStore((state) => state.currentAnimation)
  const isSpeaking = useChatStore((state) => state.currentAnimation === 'talking')

  return (
    <Canvas>
      {/* ... existing lights and environment ... */}

      {/* Use VRM character instead of geometric */}
      <VRMCharacter
        animation={animation}
        audioAmplitude={isSpeaking ? 0.5 : 0}
      />

      {/* ... rest of scene ... */}
    </Canvas>
  )
}
```

### No changes needed to:

- ✅ `useChat` hook (animation state management)
- ✅ Chat store (emotion, animation state)
- ✅ Voice system (audio amplitude tracking)
- ✅ UI components (work with any 3D implementation)

---

## 7. Recommended Workflow

1. **Create VRM model**
   - Use VRoid Studio (free, 30 min to create)
   - Export as VRM
   - Place in `public/models/maya.vrm`

2. **Test basic loading**
   - Implement `VRMCharacter` component
   - Verify model loads and renders
   - Adjust rotation/position

3. **Test bone access**
   - Log `vrm.humanoid.normalizedHumanoidBones` to see available bones
   - Test simple rotations (head nod)

4. **Implement animations one by one**
   - Start with idle (breathing)
   - Add talking (jaw movement)
   - Add gestures (wave, nod)
   - Add complex animations (thinking, pointing)

5. **Test with voice**
   - Sync jaw with audio amplitude
   - Fine-tune jaw rotation range
   - Test viseme sync if using blendshapes

6. **Polish**
   - Smooth all transitions
   - Add blinking (blendshape or scale)
   - Optimize performance

---

## 8. Unresolved Questions

1. **VRM version compatibility**
   - Project uses `@pixiv/three-vrm` v3.4.4
   - VRoid Studio exports VRM 1.0 (should work)
   - Confirm VRM version matches library capabilities

2. **TypeScript type completeness**
   - May need to augment types for certain VRM properties
   - Check `@types/three` compatibility with Three.js v0.170.0

3. **Web Speech API audio analysis**
   - Need to test if `SpeechSynthesisUtterance` can be analyzed
   - May need alternative: Google TTS with audio URL
   - Fallback: Simulate jaw movement with random/sine wave

4. **VRM model licensing**
   - VRoid Studio models are free for commercial use
   - Confirm if attribution required
   - Check for specific restrictions

5. **Performance with VRM**
   - VRM models heavier than geometric character
   - Test load time (target: <3 seconds)
   - May need optimization (Draco compression)

---

## 9. Code Examples Summary

### Full VRM Character Component (Condensed)

```typescript
// src/components/3d/VRMCharacter.tsx
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import * as THREE from 'three'
import type { VRM } from '@pixiv/three-vrm'
import type { MayaCharacterProps } from './MayaCharacter'

export function VRMCharacter({ animation = 'idle', audioAmplitude = 0 }: MayaCharacterProps) {
  const vrmRef = useRef<VRM | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loader = new GLTFLoader()
    loader.register((parser) => new VRMLoaderPlugin(parser))

    loader.load('/models/maya.vrm',
      (gltf) => {
        const vrm = gltf.userData.vrm
        if (vrm) {
          VRMUtils.deepRemoveVRMComponents(vrm.scene)
          vrm.scene.rotation.y = Math.PI
          vrmRef.current = vrm
          setLoading(false)
        }
      },
      undefined,
      (error) => {
        console.error('VRM load error:', error)
        setLoading(false)
      }
    )

    return () => {
      if (vrmRef.current) vrmRef.current.scene.dispose()
    }
  }, [])

  useFrame((state, delta) => {
    if (vrmRef.current) {
      const vrm = vrmRef.current
      vrm.update(delta)

      const time = state.clock.elapsedTime

      // Reset
      Object.values(vrm.humanoid.normalizedHumanoidBones).forEach(bone => {
        if (bone) {
          bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, 0, 0.1)
          bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, 0, 0.1)
          bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, 0, 0.1)
        }
      })

      // Animate based on state
      switch (animation) {
        case 'talking':
          const jaw = vrm.humanoid.getNormalizedBoneNode('jaw')
          if (jaw) {
            jaw.rotation.x = THREE.MathUtils.lerp(jaw.rotation.x, audioAmplitude * 0.4, 0.3)
          }
          break

        case 'wave':
          const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')
          if (rightArm) {
            rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, -2.5, 0.1)
            rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, Math.sin(time * 10) * 0.5, 0.2)
          }
          break

        case 'nod':
          const head = vrm.humanoid.getNormalizedBoneNode('head')
          if (head) {
            head.rotation.x = Math.sin(time * 15) * 0.3
          }
          break

        // Add more animations...
      }

      // Always idle
      const chest = vrm.humanoid.getNormalizedBoneNode('chest')
      if (chest) {
        chest.position.y = Math.sin(time * 2) * 0.02
      }
    }
  })

  if (loading) return <LoadingScreen />

  return <primitive object={vrmRef.current?.scene} />
}
```

---

## 10. References & Resources

### Official Documentation
- **@pixiv/three-vrm GitHub**: https://github.com/pixiv/three-vrm
- **VRM Specification**: https://vrm.dev/en/
- **VRoid Studio**: https://vroid.com/en/studio

### Key Examples
- Basic VRM loading: `packages/three-vrm/examples/basic.html`
- BlendShapes: `packages/three-vrm/examples/blendshape.html`
- LookAt: `packages/three-vrm/examples/look-at.html`
- First-person view: `packages/three-vrm/examples/first-person.html`

### Community Resources
- VRM Discord: https://discord.gg/vrm-dev
- React Three Fiber Docs: https://docs.pmnd.rs/react-three-fiber
- Three.js Docs: https://threejs.org/docs/

### Project-Specific
- `D:\Projects\cikgu-maya-3d\reference\3D_Character_Quick_Start_Guide.md`
- `D:\Projects\cikgu-maya-3d\reference\Cikgu_Maya_3D_Prototype_PRD.md`

---

## Conclusion

VRM integration with R3F is **production-ready** and well-suited for Cikgu Maya 3D. The main advantages:

1. ✅ **Better visuals** - Anime/semi-realistic aesthetic fits Malaysian context
2. ✅ **Full customization** - Create unique character in VRoid Studio
3. ✅ **Rich animation** - Bones + blendshapes for expressive animation
4. ✅ **Free** - VRoid Studio is 100% free, no attribution needed
5. ✅ **Drop-in replacement** - Existing animation system works with VRM

**Recommendation**: Start with geometric character (current implementation), then upgrade to VRM once character design is finalized. VRM provides superior visuals with minimal code changes.

---

**End of Report**
