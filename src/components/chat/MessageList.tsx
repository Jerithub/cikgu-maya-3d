import { useEffect, useRef } from 'react'
import { useChatStore } from '@/store/chatStore'
import { MessageBubble } from './MessageBubble'
import { TypingIndicator } from './TypingIndicator'

export function MessageList() {
  const messages = useChatStore((state) => state.messages)
  const isTyping = useChatStore((state) => state.isTyping)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive or typing state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4 space-y-2"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Welcome message */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-maya-primary via-maya-primary-light to-maya-secondary rounded-full flex items-center justify-center shadow-glow-primary ring-4 ring-white/30 backdrop-blur-sm">
              <span className="text-4xl">👋</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-maya-success rounded-full border-3 border-white shadow-md"></div>
          </div>
          <div className="bg-glass-white-strong backdrop-blur-md px-6 py-4 rounded-2xl border border-glass-border-strong shadow-glass">
            <h2 className="text-xl font-heading font-semibold text-maya-text-primary">
              Selamat datang! I'm Cikgu Maya
            </h2>
            <p className="text-sm text-maya-text-secondary mt-2 leading-relaxed">
              Your AI teaching assistant for Malaysian educators.<br />
              Ask me about your students, classes, or teaching strategies.
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}

      {/* Typing indicator */}
      {isTyping && <TypingIndicator />}
    </div>
  )
}
