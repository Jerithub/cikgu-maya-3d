import { create } from 'zustand'
import type { Message, EmotionType, AnimationType } from '../types/message'

interface ChatState {
  // Message state
  messages: Message[]
  isTyping: boolean

  // Character state
  currentEmotion: EmotionType
  currentAnimation: AnimationType

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (isTyping: boolean) => void
  setEmotion: (emotion: EmotionType) => void
  setAnimation: (animation: AnimationType) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set) => ({
  // Initial state
  messages: [],
  isTyping: false,
  currentEmotion: 'neutral',
  currentAnimation: 'idle',

  // Actions
  addMessage: (msg) => set((state) => ({
    messages: [...state.messages, {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: new Date()
    }]
  })),

  setTyping: (isTyping) => set({ isTyping }),

  setEmotion: (emotion) => set({ currentEmotion: emotion }),

  setAnimation: (animation) => set({ currentAnimation: animation }),

  clearMessages: () => set({ messages: [] })
}))
