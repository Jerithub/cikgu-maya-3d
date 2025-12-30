export function TypingIndicator() {
  return (
    <div className="flex w-full mb-4 animate-fade-in">
      <div className="bg-glass-white-strong backdrop-blur-md rounded-2xl rounded-bl-sm px-5 py-3 border border-glass-border-strong shadow-glass-sm">
        <div className="flex items-center gap-1.5">
          {/* Three bouncing dots */}
          <span className="w-2.5 h-2.5 bg-gradient-to-br from-maya-primary to-maya-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2.5 h-2.5 bg-gradient-to-br from-maya-primary to-maya-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2.5 h-2.5 bg-gradient-to-br from-maya-primary to-maya-secondary rounded-full animate-bounce"></span>
          <span className="ml-2 text-sm text-maya-text-secondary font-medium">Cikgu Maya is thinking...</span>
        </div>
      </div>
    </div>
  )
}
