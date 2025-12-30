interface SuggestedPromptsProps {
  prompts: string[]
  onSelectPrompt: (prompt: string) => void
}

export function SuggestedPrompts({ prompts, onSelectPrompt }: SuggestedPromptsProps) {
  if (prompts.length === 0) return null

  return (
    <div className="px-4 py-3 border-t border-glass-border bg-glass-white-subtle backdrop-blur-md animate-fade-in">
      <p className="text-xs text-maya-text-secondary font-medium mb-2.5 tracking-wide uppercase">
        💡 Suggestions
      </p>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onSelectPrompt(prompt)}
            className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-glass-border-strong rounded-full text-sm text-maya-text-primary hover:border-maya-primary hover:bg-maya-primary/10 hover:text-maya-primary hover:shadow-glass-sm transition-all duration-200 hover:scale-105 active:scale-95 font-medium"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
