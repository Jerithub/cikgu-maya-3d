export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  emotion?: EmotionType
  animation?: AnimationType
}

export type EmotionType = 'neutral' | 'happy' | 'concerned' | 'thinking' | 'encouraging'
// Phase 1: Matches MayaCharacter's AnimationState
// Phase 2: Will add 'pointing' when character is enhanced
export type AnimationType = 'idle' | 'talking' | 'wave' | 'nod' | 'thinking'
