import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export type AnimationState = 'idle' | 'talking' | 'wave' | 'nod' | 'thinking'

export interface MayaCharacterProps {
  animation?: AnimationState
  audioAmplitude?: number
}

export function MayaCharacter({
  animation = 'idle',
  audioAmplitude: _audioAmplitude = 0,
}: MayaCharacterProps) {
  // Refs for animated body parts
  const characterRef = useRef<THREE.Group>(null!)
  const headGroupRef = useRef<THREE.Group>(null!)
  const jawRef = useRef<THREE.Mesh>(null!)
  const armLeftRef = useRef<THREE.Mesh>(null!)
  const armRightRef = useRef<THREE.Mesh>(null!)

  // Blinking state
  const [leftEyeBlink, setLeftEyeBlink] = useState(false)
  const [rightEyeBlink, setRightEyeBlink] = useState(false)

  // Blinking effect
  useEffect(() => {
    const blinkLeft = () => {
      setLeftEyeBlink(true)
      setTimeout(() => setLeftEyeBlink(false), 150)
    }
    const blinkRight = () => {
      setRightEyeBlink(true)
      setTimeout(() => setRightEyeBlink(false), 150)
    }

    const blinkInterval = setInterval(() => {
      blinkLeft()
      setTimeout(blinkRight, 50)
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Main animation loop
  useFrame((state) => {
    const time = state.clock.elapsedTime

    // ========== IDLE ANIMATION (always active) ==========
    // Breathing animation
    if (characterRef.current) {
      characterRef.current.position.y = Math.sin(time * 2) * 0.02
    }

    // Subtle head sway
    if (headGroupRef.current) {
      headGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
      headGroupRef.current.rotation.x = Math.cos(time * 0.3) * 0.05
    }

    // ========== STATE-BASED ANIMATIONS ==========
    switch (animation) {
      case 'talking': {
        // Jaw movement synced to simulated audio wave
        if (jawRef.current) {
          const wave = (Math.sin(time * 10) + 1) / 2 // 0-1 sine wave
          const jawOpen = wave * 0.3
          jawRef.current.rotation.x = THREE.MathUtils.lerp(
            jawRef.current.rotation.x,
            jawOpen,
            0.3
          )
        }
        break
      }

      case 'wave': {
        // Wave gesture with right arm
        const armRight = armRightRef.current
        if (armRight) {
          // Lift arm to wave position
          armRight.rotation.z = THREE.MathUtils.lerp(
            armRight.rotation.z,
            -2.5,
            0.1
          )
          armRight.position.y = THREE.MathUtils.lerp(
            armRight.position.y,
            1.2,
            0.1
          )

          // Waving motion
          const waveMotion = Math.sin(time * 10) * 0.5
          armRight.rotation.x = THREE.MathUtils.lerp(
            armRight.rotation.x,
            waveMotion,
            0.2
          )
        }
        break
      }

      case 'nod': {
        // Nod head up and down 2-3 times
        if (headGroupRef.current) {
          const nodSpeed = 15
          const nodAmount = Math.sin(time * nodSpeed) * 0.3
          headGroupRef.current.rotation.x = nodAmount
        }
        break
      }

      case 'thinking': {
        // Thinking pose - hand to chin, head tilt
        const armRightThink = armRightRef.current
        if (armRightThink) {
          armRightThink.position.x = THREE.MathUtils.lerp(
            armRightThink.position.x,
            0.3,
            0.1
          )
          armRightThink.position.y = THREE.MathUtils.lerp(
            armRightThink.position.y,
            1.4,
            0.1
          )
          armRightThink.position.z = THREE.MathUtils.lerp(
            armRightThink.position.z,
            0.2,
            0.1
          )
          armRightThink.rotation.x = THREE.MathUtils.lerp(
            armRightThink.rotation.x,
            -1.5,
            0.1
          )
          armRightThink.rotation.z = THREE.MathUtils.lerp(
            armRightThink.rotation.z,
            0.5,
            0.1
          )
        }

        const headThink = headGroupRef.current
        if (headThink) {
          headThink.rotation.z = THREE.MathUtils.lerp(
            headThink.rotation.z,
            0.15,
            0.1
          )
        }
        break
      }

      default: {
        // Reset to idle pose
        const armRightReset = armRightRef.current
        if (armRightReset) {
          armRightReset.rotation.z = THREE.MathUtils.lerp(
            armRightReset.rotation.z,
            0,
            0.1
          )
          armRightReset.position.y = THREE.MathUtils.lerp(
            armRightReset.position.y,
            0.6,
            0.1
          )
          armRightReset.position.x = THREE.MathUtils.lerp(
            armRightReset.position.x,
            0.6,
            0.1
          )
          armRightReset.position.z = THREE.MathUtils.lerp(
            armRightReset.position.z,
            0,
            0.1
          )
          armRightReset.rotation.x = THREE.MathUtils.lerp(
            armRightReset.rotation.x,
            0,
            0.1
          )
        }

        const jawReset = jawRef.current
        if (jawReset) {
          jawReset.rotation.x = THREE.MathUtils.lerp(
            jawReset.rotation.x,
            0,
            0.1
          )
        }

        const headReset = headGroupRef.current
        if (headReset) {
          headReset.rotation.z = THREE.MathUtils.lerp(
            headReset.rotation.z,
            0,
            0.1
          )
        }
      }
    }
  })

  // Shared material props
  const skinMaterial = (
    <meshStandardMaterial
      color="#f4c2a8"
      metalness={0.1}
      roughness={0.8}
    />
  )

  const clothingMaterial = (
    <meshStandardMaterial
      color="#4a90e2"
      metalness={0.1}
      roughness={0.9}
    />
  )

  const darkMaterial = (
    <meshStandardMaterial
      color="#2c1810"
      metalness={0.1}
      roughness={0.8}
    />
  )

  return (
    <group ref={characterRef} position={[0, 0, 0]}>
      {/* ========== HEAD GROUP ========== */}
      <group ref={headGroupRef} position={[0, 1.4, 0]}>
        {/* Head sphere */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          {skinMaterial}
        </mesh>

        {/* Hair - partial sphere covering top/back of head */}
        <mesh position={[0, 0.1, -0.1]} castShadow receiveShadow>
          <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          {darkMaterial}
        </mesh>

        {/* Left Eye */}
        <mesh position={[-0.12, 0.05, 0.35]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.5} />
        </mesh>
        {/* Left Pupil (with blink) */}
        <mesh
          position={[-0.12, 0.05, 0.4]}
          scale={leftEyeBlink ? [1, 0.1, 1] : [1, 1, 1]}
          castShadow
        >
          <sphereGeometry args={[0.04, 16, 16]} />
          {darkMaterial}
        </mesh>

        {/* Right Eye */}
        <mesh position={[0.12, 0.05, 0.35]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0} roughness={0.5} />
        </mesh>
        {/* Right Pupil (with blink) */}
        <mesh
          position={[0.12, 0.05, 0.4]}
          scale={rightEyeBlink ? [1, 0.1, 1] : [1, 1, 1]}
          castShadow
        >
          <sphereGeometry args={[0.04, 16, 16]} />
          {darkMaterial}
        </mesh>

        {/* Nose - small sphere */}
        <mesh position={[0, -0.05, 0.38]} castShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          {skinMaterial}
        </mesh>

        {/* Smile/Jaw - torus curve for mouth */}
        <mesh ref={jawRef} position={[0, -0.15, 0.32]} castShadow receiveShadow>
          <torusGeometry args={[0.1, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial
            color="#e0a080"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* ========== BODY ========== */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.4, 0.5, 4, 16]} />
        {clothingMaterial}
      </mesh>

      {/* ========== LEFT ARM ========== */}
      <group position={[-0.55, 0.7, 0]} rotation={[0, 0, 0.2]}>
        {/* Arm */}
        <mesh ref={armLeftRef} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
          {skinMaterial}
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          {skinMaterial}
        </mesh>
      </group>

      {/* ========== RIGHT ARM ========== */}
      <group position={[0.55, 0.7, 0]} rotation={[0, 0, -0.2]}>
        {/* Arm */}
        <mesh ref={armRightRef} castShadow receiveShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 16]} />
          {skinMaterial}
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          {skinMaterial}
        </mesh>
      </group>
    </group>
  )
}
