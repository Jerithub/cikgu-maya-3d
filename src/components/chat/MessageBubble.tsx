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
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-maya-primary text-white rounded-br-sm'
            : 'bg-maya-bg-gray text-maya-text-primary rounded-bl-sm'
        }`}
      >
        {/* Message content with whitespace preservation */}
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>

        {/* Timestamp */}
        <p
          className={`text-xs mt-1 ${
            isUser ? 'text-maya-primary-light' : 'text-maya-text-muted'
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  )
}
