type Status = 'ready' | 'thinking' | 'speaking'

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    ready: {
      bgColor: 'bg-maya-success/20',
      textColor: 'text-maya-success',
      borderColor: 'border-maya-success/30',
      label: 'Ready to help',
      dotColor: 'bg-maya-success',
    },
    thinking: {
      bgColor: 'bg-maya-warning/20',
      textColor: 'text-maya-warning',
      borderColor: 'border-maya-warning/30',
      label: 'Thinking...',
      dotColor: 'bg-maya-warning animate-pulse',
    },
    speaking: {
      bgColor: 'bg-maya-info/20',
      textColor: 'text-maya-info',
      borderColor: 'border-maya-info/30',
      label: 'Speaking...',
      dotColor: 'bg-maya-info animate-pulse',
    },
  }

  const { bgColor, textColor, borderColor, label, dotColor } = config[status]

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${bgColor} ${textColor} border ${borderColor} backdrop-blur-sm text-xs font-medium shadow-sm`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
      <span>{label}</span>
    </div>
  )
}
