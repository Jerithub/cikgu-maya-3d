import { useChatStore } from '@/store/chatStore'
import { MockResponseEngine } from '@/lib/ai/responseEngine'
import type { AnimationType } from '@/types/message'

const responseEngine = new MockResponseEngine()

// Animation durations in milliseconds
const ANIMATION_DURATIONS: Record<AnimationType, number> = {
  idle: 0,
  talking: 0,
  wave: 2000,
  nod: 1500,
  thinking: 3000,
  pointing: 2000,
}

export function useChat() {
  const store = useChatStore()

  const sendMessage = async (content: string) => {
    // Add user message
    store.addMessage({
      role: 'user',
      content,
    })

    // Show typing indicator
    store.setTyping(true)

    // Simulate thinking delay (500-1000ms)
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500))

    // Get AI response
    const { text, emotion, animation, followUpPrompts } =
      responseEngine.getResponse(content)

    // Add assistant message
    store.addMessage({
      role: 'assistant',
      content: text,
      emotion,
      animation,
    })

    // Update character state
    store.setEmotion(emotion)
    store.setAnimation(animation)

    // Hide typing indicator
    store.setTyping(false)

    // Speak response if voice enabled
    store.speak(text)

    // Return animation to idle after duration (except for talking which handles itself)
    if (animation !== 'idle' && animation !== 'talking') {
      const duration = ANIMATION_DURATIONS[animation] ?? 2000
      setTimeout(() => {
        // Only reset if not currently speaking
        if (!store.isSpeaking) {
          store.setAnimation('idle')
        }
      }, duration)
    }

    return followUpPrompts
  }

  return {
    messages: store.messages,
    isTyping: store.isTyping,
    sendMessage,
  }
}
