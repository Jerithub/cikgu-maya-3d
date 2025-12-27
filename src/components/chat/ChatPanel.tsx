import { useState } from 'react'
import { useChatStore } from '@/store/chatStore'
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

  const handleSendMessage = (content: string) => {
    // Add user message
    const store = useChatStore.getState()
    store.addMessage({
      role: 'user',
      content,
    })

    // For now, just clear prompts (Phase 4 will add actual responses)
    setSuggestedPrompts([])

    // TODO: Phase 4 will integrate with MockResponseEngine
    // For now, add a simple echo response after delay
    store.setTyping(true)
    setTimeout(() => {
      store.addMessage({
        role: 'assistant',
        content: `I received your message: "${content}"\n\n(Chat responses will be implemented in Phase 4)`,
        emotion: 'neutral',
        animation: 'idle',
      })
      store.setTyping(false)
    }, 1000)
  }

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-full bg-white">
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
