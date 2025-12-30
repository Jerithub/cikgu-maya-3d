# Glassmorphism UI - Code Examples & Patterns

**Date:** 2025-12-29
**Purpose:** Reusable patterns and code examples for glassmorphism design

---

## Design Patterns Library

### Pattern 1: Basic Glass Panel

**Use for:** Main containers, sections

```tsx
<div className="bg-glass-white backdrop-blur-md border border-glass-border shadow-glass rounded-2xl p-4">
  {/* Your content */}
</div>
```

**Visual effect:**
- 75% white opacity
- 12px blur (frosted glass)
- Subtle white border
- Soft shadow for depth

---

### Pattern 2: Strong Glass Panel

**Use for:** Headers, important sections, input areas

```tsx
<div className="bg-glass-white-strong backdrop-blur-lg border border-glass-border-strong shadow-glass-sm">
  {/* Your content */}
</div>
```

**Visual effect:**
- 85% white opacity (more opaque)
- 16px blur (stronger frosting)
- Defined white border
- Subtle shadow

---

### Pattern 3: Colored Glass (Primary)

**Use for:** User messages, primary actions

```tsx
<div className="bg-glass-primary backdrop-blur-md border border-maya-primary/20 shadow-glass-sm text-white">
  {/* Your content */}
</div>
```

**Visual effect:**
- 90% blue opacity
- Maintains brand color
- Subtle primary border
- White text for contrast

---

### Pattern 4: Interactive Glass Button

**Use for:** Clickable elements, chips, suggestions

```tsx
<button className="
  bg-white/70
  backdrop-blur-sm
  border border-glass-border-strong
  rounded-full
  px-4 py-2
  hover:bg-maya-primary/10
  hover:border-maya-primary
  hover:shadow-glass-sm
  hover:scale-105
  active:scale-95
  transition-all duration-200
">
  Click me
</button>
```

**Interactions:**
- Semi-transparent white (70%)
- Hover: Primary tint + scale up
- Active: Scale down (press feedback)
- Smooth 200ms transitions

---

### Pattern 5: Glowing Glass Button

**Use for:** Primary actions, send buttons, important CTAs

```tsx
<button className="
  bg-gradient-to-br
  from-maya-primary
  to-maya-primary-dark
  text-white
  rounded-2xl
  p-3.5
  shadow-glow-primary
  hover:from-maya-primary-dark
  hover:to-maya-primary
  hover:scale-105
  active:scale-95
  transition-all duration-200
">
  <Send className="w-5 h-5" />
</button>
```

**Visual effect:**
- Gradient from primary to dark primary
- Glowing shadow (20px blur, 30% opacity)
- Reverse gradient on hover
- Satisfying scale animation

---

### Pattern 6: Glass Badge

**Use for:** Status indicators, tags, labels

```tsx
<div className="
  inline-flex items-center gap-1.5
  px-3 py-1
  rounded-full
  bg-maya-success/20
  text-maya-success
  border border-maya-success/30
  backdrop-blur-sm
  text-xs font-medium
  shadow-sm
">
  <span className="w-1.5 h-1.5 rounded-full bg-maya-success"></span>
  <span>Ready to help</span>
</div>
```

**Visual effect:**
- 20% colored background (subtle)
- Colored text for clarity
- 30% colored border
- Small colored dot indicator

---

### Pattern 7: Animated Glass Card

**Use for:** Messages, notifications, dynamic content

```tsx
<div className="
  animate-slide-up
  bg-glass-white-strong
  backdrop-blur-md
  rounded-2xl
  px-4 py-3
  border border-glass-border-strong
  shadow-glass-sm
  hover:shadow-glass
  transition-all duration-200
">
  {/* Your content */}
</div>
```

**Interactions:**
- Slides up on mount (400ms)
- Hover: Deeper shadow
- Smooth transitions

---

### Pattern 8: Glass Input Field

**Use for:** Text inputs, textareas, form fields

```tsx
<input
  type="text"
  className="
    w-full
    px-4 py-3
    rounded-2xl
    border
    bg-white/80
    backdrop-blur-sm
    border-glass-border-strong
    text-maya-text-primary
    placeholder:text-maya-text-muted/60
    focus:bg-white/95
    focus:border-maya-primary
    focus:shadow-glass
    transition-all
    outline-none
  "
  placeholder="Type something..."
/>
```

**States:**
- Default: 80% white opacity
- Focus: 95% opacity (clearer)
- Focus: Primary border + glass shadow
- Smooth transitions

---

### Pattern 9: Glass Avatar with Glow

**Use for:** User avatars, profile pictures, character icons

```tsx
<div className="relative">
  {/* Avatar */}
  <div className="
    w-12 h-12
    bg-gradient-to-br
    from-maya-primary
    via-maya-primary-light
    to-maya-secondary
    rounded-full
    flex items-center justify-center
    shadow-glow-primary
    ring-2 ring-white/20
    hover:scale-105
    hover:shadow-glow-secondary
    transition-all duration-200
  ">
    <span className="text-white text-xl">👩‍🏫</span>
  </div>

  {/* Online indicator */}
  <div className="
    absolute -bottom-0.5 -right-0.5
    w-3.5 h-3.5
    bg-maya-success
    rounded-full
    border-2 border-white
    shadow-sm
  "></div>
</div>
```

**Visual effect:**
- Gradient background (colorful)
- Primary glow shadow
- White glass ring
- Online indicator (green dot)
- Hover: Secondary glow + scale

---

### Pattern 10: Typing Indicator (Animated Dots)

**Use for:** Loading states, thinking states, processing

```tsx
<div className="flex items-center gap-1.5">
  {/* Animated dots */}
  <span className="
    w-2.5 h-2.5
    bg-gradient-to-br
    from-maya-primary
    to-maya-secondary
    rounded-full
    animate-bounce
    [animation-delay:-0.3s]
  "></span>
  <span className="
    w-2.5 h-2.5
    bg-gradient-to-br
    from-maya-primary
    to-maya-secondary
    rounded-full
    animate-bounce
    [animation-delay:-0.15s]
  "></span>
  <span className="
    w-2.5 h-2.5
    bg-gradient-to-br
    from-maya-primary
    to-maya-secondary
    rounded-full
    animate-bounce
  "></span>
  <span className="ml-2 text-sm text-maya-text-secondary font-medium">
    Thinking...
  </span>
</div>
```

**Animation:**
- Three gradient dots
- Staggered bounce (wave effect)
- -0.3s, -0.15s, 0s delays

---

## Before/After Code Comparison

### Example 1: ChatPanel

**Before:**
```tsx
<div className="flex flex-col h-full bg-white">
  {/* Components */}
</div>
```

**After:**
```tsx
<div className="flex flex-col h-full bg-glass-white backdrop-blur-md border-l border-glass-border shadow-glass">
  {/* Components */}
</div>
```

**Changes:**
- ❌ `bg-white` → ✅ `bg-glass-white backdrop-blur-md`
- ✅ Added glass border and shadow

---

### Example 2: MessageBubble (User)

**Before:**
```tsx
<div className="bg-maya-primary text-white rounded-2xl rounded-br-sm px-4 py-2">
  <p className="text-sm">{content}</p>
</div>
```

**After:**
```tsx
<div className="
  bg-glass-primary
  text-white
  rounded-2xl rounded-br-sm
  px-4 py-3
  backdrop-blur-md
  shadow-glass-sm
  border border-maya-primary/20
  hover:shadow-glass
  hover:bg-maya-primary/95
  transition-all duration-200
  animate-slide-up
">
  <p className="text-sm leading-relaxed">{content}</p>
</div>
```

**Changes:**
- ❌ `bg-maya-primary` → ✅ `bg-glass-primary backdrop-blur-md`
- ✅ Added border, shadow, hover effects
- ✅ Added slide-up animation
- ✅ Improved typography spacing

---

### Example 3: ChatHeader Avatar

**Before:**
```tsx
<div className="w-10 h-10 bg-gradient-to-br from-maya-primary to-maya-secondary rounded-full flex items-center justify-center shadow-md">
  <span className="text-white text-lg">👩‍🏫</span>
</div>
```

**After:**
```tsx
<div className="relative">
  <div className="
    w-12 h-12
    bg-gradient-to-br
    from-maya-primary
    via-maya-primary-light
    to-maya-secondary
    rounded-full
    flex items-center justify-center
    shadow-glow-primary
    ring-2 ring-white/20
    transition-all
    hover:scale-105
    hover:shadow-glow-secondary
  ">
    <span className="text-white text-xl">👩‍🏫</span>
  </div>
  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-maya-success rounded-full border-2 border-white shadow-sm"></div>
</div>
```

**Changes:**
- ✅ Larger size (10 → 12)
- ✅ Three-color gradient (via-maya-primary-light)
- ❌ `shadow-md` → ✅ `shadow-glow-primary`
- ✅ Added glass ring (`ring-2 ring-white/20`)
- ✅ Added online indicator (green dot)
- ✅ Added hover animations

---

### Example 4: Send Button

**Before:**
```tsx
<button className="
  p-3
  rounded-xl
  bg-maya-primary
  text-white
  hover:bg-maya-primary-dark
  shadow-md
">
  <Send className="w-5 h-5" />
</button>
```

**After:**
```tsx
<button className="
  p-3.5
  rounded-2xl
  bg-gradient-to-br
  from-maya-primary
  to-maya-primary-dark
  text-white
  hover:from-maya-primary-dark
  hover:to-maya-primary
  shadow-glow-primary
  hover:scale-105
  active:scale-95
  transition-all duration-200
">
  <Send className="w-5 h-5" />
</button>
```

**Changes:**
- ❌ Solid color → ✅ Gradient
- ❌ `shadow-md` → ✅ `shadow-glow-primary`
- ✅ Reverse gradient on hover
- ✅ Scale animations (105% hover, 95% active)
- ✅ Smooth transitions

---

## Animation Keyframes Reference

### Fade In
```css
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```
**Usage:** `animate-fade-in` (300ms ease-in-out)

### Slide Up
```css
@keyframes slideUp {
  0% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
```
**Usage:** `animate-slide-up` (400ms ease-out)

### Scale In
```css
@keyframes scaleIn {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
```
**Usage:** `animate-scale-in` (200ms ease-out)

---

## Color Reference

### Glass Backgrounds
```javascript
'glass-white':        'rgba(255, 255, 255, 0.75)'  // 75% opacity
'glass-white-strong': 'rgba(255, 255, 255, 0.85)'  // 85% opacity
'glass-white-subtle': 'rgba(255, 255, 255, 0.60)'  // 60% opacity
'glass-primary':      'rgba(74, 144, 226, 0.90)'   // 90% blue
```

### Glass Borders
```javascript
'glass-border':        'rgba(255, 255, 255, 0.18)'  // Subtle
'glass-border-strong': 'rgba(255, 255, 255, 0.30)'  // Defined
```

### Shadows
```javascript
'shadow-glass':    '0 8px 32px 0 rgba(31, 38, 135, 0.15)'   // Standard
'shadow-glass-lg': '0 12px 40px 0 rgba(31, 38, 135, 0.20)'  // Elevated
'shadow-glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.10)'   // Subtle

'shadow-glow-primary':   '0 0 20px rgba(74, 144, 226, 0.3)' // Blue glow
'shadow-glow-secondary': '0 0 20px rgba(80, 200, 120, 0.3)' // Green glow
```

---

## Common Combinations

### Pattern: Glass Card with Animation
```tsx
<div className="bg-glass-white-strong backdrop-blur-md border border-glass-border-strong shadow-glass rounded-2xl animate-fade-in">
  {/* Content */}
</div>
```

### Pattern: Interactive Glass Chip
```tsx
<button className="px-4 py-2 bg-white/70 backdrop-blur-sm border border-glass-border-strong rounded-full hover:bg-maya-primary/10 hover:border-maya-primary hover:scale-105 active:scale-95 transition-all duration-200">
  {/* Label */}
</button>
```

### Pattern: Glowing Primary Button
```tsx
<button className="px-6 py-3 bg-gradient-to-br from-maya-primary to-maya-primary-dark text-white rounded-2xl shadow-glow-primary hover:from-maya-primary-dark hover:to-maya-primary hover:scale-105 active:scale-95 transition-all duration-200">
  {/* Label */}
</button>
```

### Pattern: Status Badge
```tsx
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-maya-success/20 text-maya-success border border-maya-success/30 backdrop-blur-sm text-xs font-medium">
  <span className="w-1.5 h-1.5 rounded-full bg-maya-success"></span>
  <span>Online</span>
</div>
```

---

## Accessibility Checklist

### Focus States
```tsx
// All interactive elements should have:
focus:border-maya-primary
focus:ring-2
focus:ring-maya-primary/20
focus:outline-none
```

### Keyboard Navigation
```tsx
// Ensure tab order is logical
// Use semantic HTML (button, input, etc.)
// Provide ARIA labels for icon-only buttons
aria-label="Description"
```

### Contrast Ratios
- ✅ Normal text: 4.5:1 minimum
- ✅ Large text: 3:1 minimum
- ✅ Test with browser DevTools

### Motion Preferences
```tsx
// Consider adding:
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Best Practices

### GPU Acceleration
- ✅ Use `transform` instead of `left/top`
- ✅ Use `opacity` instead of `visibility`
- ✅ Combine with `will-change: transform` for complex animations

### Backdrop Filter Fallback
```tsx
// Browsers without backdrop-filter support will show:
// - Higher opacity (still readable)
// - Shadows for depth
// - Borders for definition
```

### Bundle Optimization
- ✅ Use Tailwind's JIT mode (enabled by default in v3+)
- ✅ Tree-shake unused utilities
- ✅ Purge unused classes in production

---

## Quick Reference Card

### Opacity Levels
| Use Case | Class | Opacity |
|----------|-------|---------|
| Main panels | `bg-glass-white` | 75% |
| Headers | `bg-glass-white-strong` | 85% |
| Subtle sections | `bg-glass-white-subtle` | 60% |
| User messages | `bg-glass-primary` | 90% |

### Blur Levels
| Use Case | Class | Blur |
|----------|-------|------|
| Panels | `backdrop-blur-md` | 12px |
| Headers | `backdrop-blur-lg` | 16px |
| Buttons | `backdrop-blur-sm` | 4px |

### Animation Speeds
| Animation | Duration | Easing |
|-----------|----------|--------|
| Fade in | 300ms | ease-in-out |
| Slide up | 400ms | ease-out |
| Scale in | 200ms | ease-out |
| Transitions | 200ms | ease-in-out |

---

**Status:** 📚 Complete Pattern Library

All glassmorphism patterns documented with reusable code examples. Use these patterns to maintain design consistency across the application.
