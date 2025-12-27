import type { EmotionType, AnimationType } from '@/types/message'

export interface ResponseTemplate {
  triggers: string[]
  responses: string[]
  emotion: EmotionType
  animation: AnimationType
  followUpPrompts?: string[]
}

export const RESPONSE_DATABASE: Record<string, ResponseTemplate> = {
  greetings: {
    triggers: ['hello', 'hi', 'hey', 'good morning', 'selamat', 'salam'],
    responses: [
      "Selamat pagi! 👋 I'm Cikgu Maya. How can I help you with your students today?",
      "Hello! Great to see you. What would you like to know about your classes?",
      "Hi there! Ready to dive into your student data. Where should we start?",
    ],
    emotion: 'happy',
    animation: 'wave',
    followUpPrompts: [
      'Who needs my attention?',
      'How is Form 4S1 doing?',
      'Show at-risk students',
    ],
  },

  student_queries: {
    triggers: ['student', 'ahmad', 'performance', 'grade', 'marks', 'how is'],
    responses: [
      "Let me pull up Ahmad's profile. He's currently at 54% overall—just above passing. I notice his grades dropped from 72% to 54% over two months. His attendance has also dipped to 84%, which might be connected. Would you like me to dig deeper?",
      "Looking at this student's data, I see some interesting patterns. Their test scores show they understand the material (68% average), but homework completion is the challenge. Only 2 of last 7 assignments submitted.",
      "This student is showing steady improvement! Up 12% from last month. Attendance is solid at 96%, and they're actively participating in class. Keep encouraging this positive trend.",
    ],
    emotion: 'neutral',
    animation: 'thinking',
    followUpPrompts: [
      'Prepare parent meeting brief',
      'Compare to class average',
      'Show attendance pattern',
    ],
  },

  at_risk_students: {
    triggers: ['risk', 'attention', 'concern', 'help', 'struggling', 'failing'],
    responses: [
      "Based on your 3 classes, here are students who need attention:\n\n🔴 HIGH PRIORITY (3 students)\n\n1. **Ahmad bin Hassan** (4S1) - Grade dropped 18% in Math, 5 missing assignments, absent 4 days last week\n\n2. **Siti Aminah** (4S2) - Failing Physics at 38%, attendance at 82%\n\n3. **Lee Wei Ming** (5S1) - Three consecutive declining test scores (75% → 65% → 58%)\n\nWould you like me to analyze any of these students in detail?",
      "I've identified 2 students requiring immediate attention. Both show sudden attendance drops and declining grades. The pattern suggests something might be happening outside school. Let's discuss intervention strategies.",
      "Good news—your at-risk list is short this week. Only 1 student needs close monitoring, and 2 others improved significantly. You're making a real difference!",
    ],
    emotion: 'concerned',
    animation: 'pointing',
    followUpPrompts: [
      'Why is Ahmad struggling?',
      'Prepare intervention plan',
      'Compare to last month',
    ],
  },

  class_overview: {
    triggers: ['class', 'form', '4s1', '4s2', '5s1', 'how are', 'overview'],
    responses: [
      "4S1 is doing well overall! Class average is 72%—7 points above school average. Only 1 student at-risk, 6 students improved 10%+ this month, and assignment completion is at 89%. Whatever you're doing is working!",
      "Let me break down your classes:\n\n• **4S1**: Strong (avg 72%) - 1 at-risk\n• **4S2**: Moderate (avg 65%) - 3 at-risk\n• **5S1**: Excellent (avg 78%) - 0 at-risk\n\nOverall, you're reaching most students effectively. The 4 at-risk students need targeted support.",
      "Your Form 5 class is performing excellently as they prepare for SPM. Average is 78%, and all students are on track for passing grades. Form 4 needs a bit more attention, especially in certain topics.",
    ],
    emotion: 'neutral',
    animation: 'nod',
    followUpPrompts: [
      'Show struggling topics',
      'Compare to school average',
      'Monthly trend analysis',
    ],
  },

  parent_meeting: {
    triggers: ['parent', 'meeting', 'prepare', 'brief', 'talk', 'discuss'],
    responses: [
      "I'll prepare a comprehensive brief for Ahmad's parent meeting:\n\n**START WITH POSITIVES:**\n• Participates actively when present\n• Test scores show understanding (68% avg)\n• Good behavior, no discipline issues\n\n**CONCERNS:**\n• 6 absences in last 4 weeks\n• 5 missing homework assignments\n• Grade decline 72% → 54%\n\n**KEY POINT:**\n'Ahmad understands Mathematics—test performance proves it. The challenge is completing work outside school. Let's discuss if there's something affecting his homework time.'\n\nWant me to suggest questions to ask parents?",
      "Here's your meeting brief ready. I've highlighted what's working, the specific concerns with data, and recommended partnership approaches. I can also draft a follow-up email template if you'd like.",
    ],
    emotion: 'neutral',
    animation: 'thinking',
    followUpPrompts: [
      'Draft follow-up email',
      'Suggest intervention strategies',
      'Show full student history',
    ],
  },

  encouragement: {
    triggers: ['thank', 'thanks', 'great', 'good job', 'appreciate'],
    responses: [
      "You're very welcome! You're doing important work supporting your students. I'm here whenever you need insights or just want to talk through challenges.",
      "I'm glad I could help! Remember, you know your students best—I'm just here to highlight patterns. Your expertise makes the real difference.",
      "Happy to assist! Teaching is tough work, and you're making a real impact. Let me know what else you need.",
    ],
    emotion: 'encouraging',
    animation: 'nod',
    followUpPrompts: [],
  },

  default: {
    triggers: [],
    responses: [
      "I can help you with student insights, class performance, and parent meeting preparation. What would you like to explore?",
      "I'm not sure I understand that question. I can assist with:\n• Student performance analysis\n• At-risk identification\n• Class overviews\n• Parent meeting briefs\n\nWhat would you like to know?",
      "Could you rephrase that? I'm best at discussing specific students, classes, or preparing for parent meetings.",
    ],
    emotion: 'neutral',
    animation: 'thinking',
    followUpPrompts: [
      'Who needs my attention?',
      'How is Form 4S1?',
      'Show at-risk students',
    ],
  },
}
