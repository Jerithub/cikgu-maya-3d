interface SuggestedPromptsProps {
  prompts: string[]
  onSelectPrompt: (prompt: string) => void
}

export function SuggestedPrompts({ prompts, onSelectPrompt }: SuggestedPromptsProps) {
  if (prompts.length === 0) return null

  return (
    <div className="px-4 py-3 border-t border-maya-bg-gray bg-maya-bg-light">
      <p className="text-xs text-maya-text-muted mb-2">Suggested:</p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="px-3 py-1.5 bg-white border border-maya-bg-gray rounded-full text-sm text-maya-text-primary hover:border-maya-primary hover:text-maya-primary transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
