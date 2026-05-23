// Terminal-style action button with two variants.
// Primary = gold (action), Secondary = outlined blue (utility).
export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const base =
    'font-mono uppercase tracking-widest text-sm font-bold px-6 py-3 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-loyola-gold text-loyola-blue-deep border-2 border-loyola-gold hover:bg-loyola-gold-dark hover:shadow-[0_0_20px_rgba(255,199,44,0.5)] active:translate-y-0.5',
    secondary:
      'bg-transparent text-loyola-gold border-2 border-loyola-gold/40 hover:border-loyola-gold hover:bg-loyola-gold/10',
    ghost:
      'bg-transparent text-loyola-paper/70 hover:text-loyola-gold border-2 border-transparent',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
