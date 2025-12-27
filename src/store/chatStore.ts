import { create } from 'zustand'
import type { Message, EmotionType, AnimationType } from '../types/message'

interface ChatState {
  // Message state
  messages: Message[]
  isTyping: boolean

  // Character state
  currentEmotion: EmotionType
  currentAnimation: AnimationType

  // Voice state
  voiceEnabled: boolean
  isSpeaking: boolean

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  setTyping: (isTyping: boolean) => void
  setEmotion: (emotion: EmotionType) => void
  setAnimation: (animation: AnimationType) => void
  toggleVoice: () => void
  speak: (text: string) => void
  stopSpeaking: () => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  // Initial state
  messages: [],
  isTyping: false,
  currentEmotion: 'neutral',
  currentAnimation: 'idle',
  voiceEnabled: true,
  isSpeaking: false,

  // Actions
  addMessage: (msg) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...msg,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),

  setTyping: (isTyping) => set({ isTyping }),

  setEmotion: (emotion) => set({ currentEmotion: emotion }),

  setAnimation: (animation) => set({ currentAnimation: animation }),

  toggleVoice: () =>
    set((state) => {
      const newState = !state.voiceEnabled
      if (!newState) {
        // Stop speaking if disabling voice
        window.speechSynthesis.cancel()
      }
      return { voiceEnabled: newState }
    }),

  speak: (text) => {
    const { voiceEnabled, stopSpeaking } = get()
    if (!voiceEnabled) return

    stopSpeaking()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.1
    utterance.lang = 'en-MY'

    // Try to find Malaysian English voice, fallback to any English
    const voices = window.speechSynthesis.getVoices()
    const malaysianVoice = voices.find((v) => v.lang === 'en-MY')
    const englishVoice = voices.find((v) => v.lang.startsWith('en-'))

    if (malaysianVoice) {
      utterance.voice = malaysianVoice
    } else if (englishVoice) {
      utterance.voice = englishVoice
    }

    utterance.onstart = () => set({ isSpeaking: true, currentAnimation: 'talking' })
    utterance.onend = () => set({ isSpeaking: false, currentAnimation: 'idle' })
    utterance.onerror = () => set({ isSpeaking: false, currentAnimation: 'idle' })

    window.speechSynthesis.speak(utterance)
  },

  stopSpeaking: () => {
    window.speechSynthesis.cancel()
    set({ isSpeaking: false, currentAnimation: 'idle' })
  },

  clearMessages: () => set({ messages: [] }),
}))
