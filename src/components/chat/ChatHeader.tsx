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
    <div className="px-4 py-3 border-b border-maya-bg-gray bg-maya-bg-light">
      <div className="flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-maya-primary to-maya-secondary rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-lg">👩‍🏫</span>
          </div>

          {/* Name and status */}
          <div>
            <h1 className="text-lg font-heading font-semibold text-maya-text-primary">
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
            className={`p-2 rounded-lg transition-colors ${
              voiceEnabled
                ? 'bg-maya-primary/10 text-maya-primary hover:bg-maya-primary/20'
                : 'bg-maya-bg-gray text-maya-text-muted hover:bg-maya-bg-gray/80'
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
            className="p-2 hover:bg-maya-bg-gray rounded-lg transition-colors"
            aria-label="Settings"
            title="Settings (coming soon)"
          >
            <Settings className="w-5 h-5 text-maya-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  )
}
