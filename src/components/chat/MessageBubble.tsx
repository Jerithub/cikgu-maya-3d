import type { Message } from '@/types/message'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  // Format timestamp
  const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-md shadow-glass-sm transition-all duration-200 hover:shadow-glass ${
          isUser
            ? 'bg-glass-primary text-white rounded-br-sm border border-maya-primary/20 hover:bg-maya-primary/95'
            : 'bg-glass-white-strong text-maya-text-primary rounded-bl-sm border border-glass-border-strong hover:bg-white/95'
        }`}
      >
        {/* Message content with whitespace preservation */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>

        {/* Timestamp */}
        <p
          className={`text-xs mt-1.5 ${
            isUser ? 'text-white/80' : 'text-maya-text-muted'
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  )
}
