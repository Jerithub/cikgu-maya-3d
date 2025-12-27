import { Layout } from './components/layout/Layout'
import { Scene } from './components/3d/Scene'

function Viewport3D() {
  return <Scene />
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
