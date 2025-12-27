export function TypingIndicator() {
  return (
    <div className="flex w-full mb-4">
      <div className="bg-maya-bg-gray rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1">
          {/* Three bouncing dots */}
          <span className="w-2 h-2 bg-maya-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-maya-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-maya-text-muted rounded-full animate-bounce"></span>
          <span className="ml-2 text-sm text-maya-text-muted">Maya is typing...</span>
        </div>
      </div>
    </div>
  )
}
