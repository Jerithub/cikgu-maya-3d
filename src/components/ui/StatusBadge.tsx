type Status = 'ready' | 'thinking' | 'speaking'

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    ready: {
      color: 'bg-maya-success',
      label: 'Ready',
      dotColor: 'bg-green-500',
    },
    thinking: {
      color: 'bg-maya-warning',
      label: 'Thinking...',
      dotColor: 'bg-yellow-500 animate-pulse',
    },
    speaking: {
      color: 'bg-maya-info',
      label: 'Speaking...',
      dotColor: 'bg-blue-500 animate-pulse',
    },
  }

  const { color, label, dotColor } = config[status]

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${color} text-white text-xs font-medium`}>
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      <span>{label}</span>
    </div>
  )
}
