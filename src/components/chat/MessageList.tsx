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
        <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
          <div className="w-16 h-16 bg-maya-primary rounded-full flex items-center justify-center">
            <span className="text-3xl">👋</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-maya-text-primary">
              Welcome! I'm Cikgu Maya
            </h2>
            <p className="text-sm text-maya-text-secondary mt-1">
              Your AI teaching assistant. How can I help you today?
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
