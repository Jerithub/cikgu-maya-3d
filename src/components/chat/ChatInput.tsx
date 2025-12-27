import { Send } from 'lucide-react'
import { useState, KeyboardEvent } from 'react'

const MAX_CHARACTERS = 500

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    const trimmedInput = input.trim()
    if (trimmedInput && !disabled) {
      onSend(trimmedInput)
      setInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const charCount = input.length
  const isNearLimit = charCount > MAX_CHARACTERS * 0.9
  const isAtLimit = charCount >= MAX_CHARACTERS
  const canSend = input.trim().length > 0 && !disabled && !isAtLimit

  return (
    <div className="p-4 border-t border-maya-bg-gray bg-maya-bg-light">
      <div className="flex flex-col gap-2">
        {/* Character counter */}
        <div className="flex justify-end">
          <span
            className={`text-xs ${
              isAtLimit
                ? 'text-maya-error font-medium'
                : isNearLimit
                  ? 'text-maya-warning'
                  : 'text-maya-text-muted'
            }`}
          >
            {charCount}/{MAX_CHARACTERS}
          </span>
        </div>

        {/* Input area */}
        <div className="flex gap-2 items-end">
          {/* Text area */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={disabled}
              maxLength={MAX_CHARACTERS}
              rows={1}
              className={`w-full px-4 py-3 pr-12 rounded-2xl border resize-none outline-none transition-all ${
                disabled
                  ? 'bg-maya-bg-gray text-maya-text-muted cursor-not-allowed'
                  : 'bg-white text-maya-text-primary border-maya-bg-gray focus:border-maya-primary focus:ring-2 focus:ring-maya-primary/20'
              }`}
              style={{
                minHeight: '48px',
                maxHeight: '120px',
              }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`p-3 rounded-xl transition-all ${
              canSend
                ? 'bg-maya-primary text-white hover:bg-maya-primary-dark shadow-md'
                : 'bg-maya-bg-gray text-maya-text-muted cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Helper text */}
        <p className="text-xs text-maya-text-muted text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  )
}
