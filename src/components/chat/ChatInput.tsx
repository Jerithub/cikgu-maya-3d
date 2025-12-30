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
    <div className="p-4 border-t border-glass-border-strong bg-glass-white-strong backdrop-blur-lg shadow-glass-sm">
      <div className="flex flex-col gap-2.5">
        {/* Character counter */}
        <div className="flex justify-end">
          <span
            className={`text-xs font-medium transition-colors ${
              isAtLimit
                ? 'text-maya-error'
                : isNearLimit
                  ? 'text-maya-warning'
                  : 'text-maya-text-muted'
            }`}
          >
            {charCount}/{MAX_CHARACTERS}
          </span>
        </div>

        {/* Input area */}
        <div className="flex gap-3 items-end">
          {/* Text area */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your students..."
              disabled={disabled}
              maxLength={MAX_CHARACTERS}
              rows={1}
              className={`w-full px-4 py-3 pr-12 rounded-2xl border resize-none outline-none transition-all backdrop-blur-sm shadow-glass-sm ${
                disabled
                  ? 'bg-white/30 text-maya-text-muted cursor-not-allowed border-glass-border'
                  : 'bg-white/80 text-maya-text-primary border-glass-border-strong focus:border-maya-primary focus:bg-white/95 focus:shadow-glass placeholder:text-maya-text-muted/60'
              }`}
              style={{
                minHeight: '52px',
                maxHeight: '120px',
              }}
            />
          </div>

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className={`p-3.5 rounded-2xl transition-all duration-200 ${
              canSend
                ? 'bg-gradient-to-br from-maya-primary to-maya-primary-dark text-white hover:from-maya-primary-dark hover:to-maya-primary shadow-glow-primary hover:scale-105 active:scale-95'
                : 'bg-white/40 text-maya-text-muted cursor-not-allowed backdrop-blur-sm'
            }`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Helper text */}
        <p className="text-xs text-maya-text-muted/80 text-center font-normal">
          Press <kbd className="px-1.5 py-0.5 bg-white/60 rounded text-[10px] font-semibold border border-glass-border">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-white/60 rounded text-[10px] font-semibold border border-glass-border">Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  )
}
