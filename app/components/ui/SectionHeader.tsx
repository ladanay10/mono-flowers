interface SectionHeaderProps {
  tag: string
  title: React.ReactNode
  light?: boolean
  className?: string
}

export function SectionHeader({ tag, title, light, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-20 ${className}`}>
      <p className={`text-[10px] tracking-[0.28em] uppercase mb-6 reveal ${light ? 'text-gold' : 'text-gold'}`}>
        {tag}
      </p>
      <h2 className={`font-display text-[clamp(38px,4.5vw,60px)] font-light leading-[1.15] reveal reveal-d1 ${light ? 'text-cream' : 'text-ink'}`}>
        {title}
      </h2>
    </div>
  )
}
