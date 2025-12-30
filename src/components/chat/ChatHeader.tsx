import { Settings, Volume2, VolumeX } from 'lucide-react'
import { StatusBadge } from '../ui/StatusBadge'
import { useChatStore } from '@/store/chatStore'

export function ChatHeader() {
  const isTyping = useChatStore((state) => state.isTyping)
  const isSpeaking = useChatStore((state) => state.isSpeaking)
  const voiceEnabled = useChatStore((state) => state.voiceEnabled)
  const toggleVoice = useChatStore((state) => state.toggleVoice)

  // Determine status based on state
  const getStatus = (): 'ready' | 'thinking' | 'speaking' => {
    if (isSpeaking) return 'speaking'
    if (isTyping) return 'thinking'
    return 'ready'
  }

  return (
    <div className="px-4 py-4 border-b border-glass-border-strong bg-glass-white-strong backdrop-blur-lg shadow-glass-sm">
      <div className="flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3 animate-fade-in">
          {/* Avatar with gradient glow */}
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-maya-primary via-maya-primary-light to-maya-secondary rounded-full flex items-center justify-center shadow-glow-primary ring-2 ring-white/20 transition-all hover:scale-105 hover:shadow-glow-secondary">
              <span className="text-white text-xl">👩‍🏫</span>
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-maya-success rounded-full border-2 border-white shadow-sm"></div>
          </div>

          {/* Name and status */}
          <div>
            <h1 className="text-lg font-heading font-semibold text-maya-text-primary tracking-tight">
              Cikgu Maya
            </h1>
            <StatusBadge status={getStatus()} />
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          {/* Voice toggle */}
          <button
            onClick={toggleVoice}
            className={`p-2.5 rounded-xl transition-all duration-200 ${
              voiceEnabled
                ? 'bg-maya-primary/15 text-maya-primary hover:bg-maya-primary/25 shadow-glow-primary backdrop-blur-sm'
                : 'bg-white/40 text-maya-text-muted hover:bg-white/60 backdrop-blur-sm'
            }`}
            aria-label={voiceEnabled ? 'Mute voice' : 'Enable voice'}
            title={voiceEnabled ? 'Voice on' : 'Voice off'}
          >
            {voiceEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>

          {/* Settings button */}
          <button
            className="p-2.5 hover:bg-white/60 bg-white/40 backdrop-blur-sm rounded-xl transition-all duration-200 group"
            aria-label="Settings"
            title="Settings (coming soon)"
          >
            <Settings className="w-5 h-5 text-maya-text-secondary group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  )
}
