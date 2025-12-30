import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRMUtils, VRM } from '@pixiv/three-vrm'
import * as THREE from 'three'
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js'

export type AnimationState = 'idle' | 'talking' | 'wave' | 'nod' | 'thinking' | 'pointing'

export interface VRMCharacterProps {
  animation?: AnimationState
  audioAmplitude?: number
}

export function VRMCharacter({
  animation = 'idle',
  audioAmplitude = 0,
}: VRMCharacterProps) {
  const vrmRef = useRef<VRM | null>(null)
  const [vrmLoaded, setVrmLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Bone refs for animation
  const headBoneRef = useRef<THREE.Object3D | null>(null)
  const jawBoneRef = useRef<THREE.Object3D | null>(null)
  const rightUpperArmRef = useRef<THREE.Object3D | null>(null)
  const rightLowerArmRef = useRef<THREE.Object3D | null>(null)
  const chestBoneRef = useRef<THREE.Object3D | null>(null)

  // Load VRM
  useEffect(() => {
    const loader = new GLTFLoader()
    loader.register((parser: any) => new VRMLoaderPlugin(parser))

    loader.load(
      '/Maya.vrm',
      (gltf: GLTF) => {
        const vrm = gltf.userData.vrm as VRM | undefined
        if (!vrm) {
          setError('No VRM data found in file')
          return
        }

        // Clean up previous VRM
        if (vrmRef.current) {
          vrmRef.current.scene.removeFromParent()
        }

        VRMUtils.removeUnnecessaryVertices(gltf.scene)
        VRMUtils.removeUnnecessaryJoints(gltf.scene)

        vrmRef.current = vrm
        vrm.scene.rotation.y = Math.PI // VRoid models face backward
        vrm.scene.position.y = 0

        // Cache bone references
        headBoneRef.current = vrm.humanoid.getNormalizedBoneNode('head')
        jawBoneRef.current = vrm.humanoid.getNormalizedBoneNode('jaw')
        rightUpperArmRef.current = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')
        rightLowerArmRef.current = vrm.humanoid.getNormalizedBoneNode('rightLowerArm')
        chestBoneRef.current = vrm.humanoid.getNormalizedBoneNode('chest')

        setVrmLoaded(true)
        setError(null)
      },
      undefined,
      (err: unknown) => {
        console.error('Error loading VRM:', err)
        setError('Failed to load VRM file')
      }
    )

    return () => {
      if (vrmRef.current) {
        vrmRef.current.scene.removeFromParent()
      }
    }
  }, [])

  // Main animation loop
  useFrame((state, delta) => {
    if (!vrmRef.current || !vrmLoaded) return

    const time = state.clock.elapsedTime
    const vrm = vrmRef.current

    // ========== IDLE ANIMATION (always active) ==========
    // Breathing animation via chest
    if (chestBoneRef.current) {
      chestBoneRef.current.rotation.z = Math.sin(time * 2) * 0.03
    }

    // Subtle head sway
    if (headBoneRef.current) {
      headBoneRef.current.rotation.y = Math.sin(time * 0.5) * 0.05
      headBoneRef.current.rotation.x = Math.cos(time * 0.3) * 0.03
    }

    // ========== STATE-BASED ANIMATIONS ==========
    switch (animation) {
      case 'talking': {
        // Jaw movement for talking
        if (jawBoneRef.current) {
          const jawOpen = audioAmplitude > 0
            ? audioAmplitude * 0.5
            : ((Math.sin(time * 10) + 1) / 2) * 0.4

          jawBoneRef.current.rotation.x = THREE.MathUtils.lerp(
            jawBoneRef.current.rotation.x,
            jawOpen,
            0.3
          )
        }
        break
      }

      case 'pointing': {
        // Pointing gesture with right arm
        if (rightUpperArmRef.current) {
          rightUpperArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightUpperArmRef.current.rotation.z,
            -1.5,
            0.1
          )
          rightUpperArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightUpperArmRef.current.rotation.x,
            -0.3,
            0.1
          )
        }
        if (rightLowerArmRef.current) {
          rightLowerArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightLowerArmRef.current.rotation.x,
            -1.5,
            0.1
          )
        }
        break
      }

      case 'wave': {
        // Wave gesture with right arm
        if (rightUpperArmRef.current) {
          rightUpperArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightUpperArmRef.current.rotation.z,
            -2.0,
            0.1
          )
        }

        // Waving motion
        const waveMotion = Math.sin(time * 10) * 0.4
        if (rightLowerArmRef.current) {
          rightLowerArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightLowerArmRef.current.rotation.z,
            waveMotion,
            0.2
          )
        }
        break
      }

      case 'nod': {
        // Nod head up and down
        if (headBoneRef.current) {
          const nodAmount = Math.sin(time * 15) * 0.25
          headBoneRef.current.rotation.x = nodAmount
        }
        break
      }

      case 'thinking': {
        // Thinking pose - hand to chin, head tilt
        if (rightUpperArmRef.current) {
          rightUpperArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightUpperArmRef.current.rotation.z,
            -0.8,
            0.1
          )
          rightUpperArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightUpperArmRef.current.rotation.x,
            -1.2,
            0.1
          )
        }
        if (rightLowerArmRef.current) {
          rightLowerArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightLowerArmRef.current.rotation.x,
            -1.0,
            0.1
          )
        }

        if (headBoneRef.current) {
          headBoneRef.current.rotation.z = THREE.MathUtils.lerp(
            headBoneRef.current.rotation.z,
            0.15,
            0.1
          )
        }
        break
      }

      default: {
        // Reset to idle pose
        if (rightUpperArmRef.current) {
          rightUpperArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightUpperArmRef.current.rotation.z,
            0,
            0.1
          )
          rightUpperArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightUpperArmRef.current.rotation.x,
            0,
            0.1
          )
        }
        if (rightLowerArmRef.current) {
          rightLowerArmRef.current.rotation.x = THREE.MathUtils.lerp(
            rightLowerArmRef.current.rotation.x,
            0,
            0.1
          )
          rightLowerArmRef.current.rotation.z = THREE.MathUtils.lerp(
            rightLowerArmRef.current.rotation.z,
            0,
            0.1
          )
        }
        if (jawBoneRef.current) {
          jawBoneRef.current.rotation.x = THREE.MathUtils.lerp(
            jawBoneRef.current.rotation.x,
            0,
            0.1
          )
        }
        if (headBoneRef.current) {
          headBoneRef.current.rotation.z = THREE.MathUtils.lerp(
            headBoneRef.current.rotation.z,
            0,
            0.1
          )
        }
      }
    }

    // CRITICAL: Update VRM every frame
    vrm.update(delta)
  })

  if (error) {
    console.error('VRM Error:', error)
    return null
  }

  if (!vrmLoaded || !vrmRef.current) {
    return null
  }

  return <primitive object={vrmRef.current.scene} />
}
