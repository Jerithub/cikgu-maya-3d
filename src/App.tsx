import { Canvas } from '@react-three/fiber'
import { MayaCharacter } from './components/3d/MayaCharacter'
import { Layout } from './components/layout/Layout'
import { useChatStore } from './store/chatStore'

function Viewport3D() {
  const animation = useChatStore((state) => state.currentAnimation)

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

      {/* Character */}
      <MayaCharacter animation={animation} />

      {/* Ground plane for shadows */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e0e7ff" />
      </mesh>
    </Canvas>
  )
}

function ChatPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Header placeholder */}
      <div className="p-4 border-b border-maya-bg-gray bg-maya-bg-light">
        <h1 className="text-xl font-heading font-semibold text-maya-text-primary">
          Cikgu Maya
        </h1>
        <p className="text-sm text-maya-text-secondary">Your teaching assistant</p>
      </div>

      {/* Messages placeholder */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-maya-text-muted text-center">
          Chat interface coming soon...
        </p>
      </div>

      {/* Input placeholder */}
      <div className="p-4 border-t border-maya-bg-gray">
        <p className="text-maya-text-muted text-sm text-center">
          Type your message here...
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Viewport3D />
      <ChatPanel />
    </Layout>
  )
}

export default App
