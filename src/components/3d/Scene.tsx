import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { MayaCharacter } from './MayaCharacter'
import { useChatStore } from '@/store/chatStore'

export function Scene() {
  const animation = useChatStore((state) => state.currentAnimation)
  const isSpeaking = useChatStore((state) => state.currentAnimation === 'talking')

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 4], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="w-full h-full"
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 3, -3]} intensity={0.4} />

      {/* Environment */}
      <Environment preset="city" background={false} />

      {/* Character */}
      <MayaCharacter
        animation={animation}
        audioAmplitude={isSpeaking ? 0.5 : 0}
      />

      {/* Ground */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e0e7ff" />
      </mesh>

      {/* Camera Controls */}
      <OrbitControls
        enablePan={false}
        minDistance={2}
        maxDistance={6}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1.2, 0]}
      />
    </Canvas>
  )
}
