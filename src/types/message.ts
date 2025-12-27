export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  emotion?: EmotionType
  animation?: AnimationType
}

export type EmotionType = 'neutral' | 'happy' | 'concerned' | 'thinking' | 'encouraging'
// Phase 2: Added 'pointing' animation
export type AnimationType = 'idle' | 'talking' | 'wave' | 'nod' | 'thinking' | 'pointing'
