import { RESPONSE_DATABASE } from './mockResponses'
import type { EmotionType, AnimationType } from '@/types/message'

export class MockResponseEngine {
  getResponse(userMessage: string): {
    text: string
    emotion: EmotionType
    animation: AnimationType
    followUpPrompts: string[]
  } {
    const normalizedMessage = userMessage.toLowerCase().trim()

    // Find matching category
    for (const [category, template] of Object.entries(RESPONSE_DATABASE)) {
      // Skip default category
      if (category === 'default') continue

      const hasMatch = template.triggers.some((trigger) =>
        normalizedMessage.includes(trigger)
      )

      if (hasMatch) {
        return {
          text: this.selectRandomResponse(template.responses),
          emotion: template.emotion,
          animation: template.animation,
          followUpPrompts: template.followUpPrompts ?? [],
        }
      }
    }

    // Default fallback
    const defaultTemplate = RESPONSE_DATABASE.default
    return {
      text: this.selectRandomResponse(defaultTemplate.responses),
      emotion: defaultTemplate.emotion,
      animation: defaultTemplate.animation,
      followUpPrompts: defaultTemplate.followUpPrompts ?? [],
    }
  }

  private selectRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)]
  }
}
