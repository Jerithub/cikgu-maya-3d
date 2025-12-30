import { ReactNode } from 'react'

interface LayoutProps {
  children: [ReactNode, ReactNode]
}

export function Layout({ children }: LayoutProps) {
  const [viewport, chat] = children

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-gradient-to-br from-maya-bg-light via-white to-maya-bg-gray">
      {/* Left: 3D Viewport (50% on desktop, full on mobile) */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative">
        {viewport}
      </div>

      {/* Right: Chat Panel (50% on desktop, full on mobile) - Transparent to show 3D character */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col relative">
        {chat}
      </div>
    </div>
  )
}
