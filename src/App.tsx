import { Layout } from './components/layout/Layout'
import { Viewport3D } from './components/3d/Viewport3D'
import { ChatPanel } from './components/chat/ChatPanel'

function App() {
  return (
    <Layout>
      <Viewport3D />
      <ChatPanel />
    </Layout>
  )
}

export default App
