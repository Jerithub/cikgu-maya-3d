import { useState } from 'react'
import { useChat } from '@/hooks/useChat'
import { ChatHeader } from './ChatHeader'
import { MessageList } from './MessageList'
import { ChatInput } from './ChatInput'
import { SuggestedPrompts } from './SuggestedPrompts'

export function ChatPanel() {
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    'Who needs my attention?',
    'How is Form 4S1 doing?',
    'Show at-risk students',
  ])

  const { sendMessage } = useChat()

  const handleSendMessage = async (content: string) => {
    const followUpPrompts = await sendMessage(content)

    // Update suggested prompts with AI-generated follow-ups
    if (followUpPrompts && followUpPrompts.length > 0) {
      setSuggestedPrompts(followUpPrompts)
    } else {
      setSuggestedPrompts([])
    }
  }

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-full bg-glass-white backdrop-blur-md border-l border-glass-border shadow-glass">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <MessageList />

      {/* Suggested Prompts */}
      <SuggestedPrompts prompts={suggestedPrompts} onSelectPrompt={handleSelectPrompt} />

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={false} />
    </div>
  )
}
