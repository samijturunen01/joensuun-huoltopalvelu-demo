interface Props {
  code: string
  label: string
  title: React.ReactNode
  intro?: React.ReactNode
  id?: string
  className?: string
  tone?: 'light' | 'dark'
  size?: 'l' | 'm'
}

/** Section heading styled like a rating-plate field: code · label, then the title. */
export function SectionHeading({ code, label, title, intro, id, className = '', tone = 'light', size = 'l' }: Props) {
  const muted = tone === 'dark' ? 'text-green-400' : 'text-green-700'
  return (
    <div className={className}>
      <p data-reveal className={`plate-label flex items-center gap-3 ${muted}`}>
        <span className="tabular">{code}</span>
        <span className="h-px w-8 bg-current opacity-60" aria-hidden="true" />
        {label}
      </p>
      <h2 id={id} data-reveal style={{ '--reveal-delay': '60ms' } as React.CSSProperties} className={`mt-5 ${size === 'l' ? 'display-l' : 'display-m'}`}>
        {title}
      </h2>
      {intro && (
        <div
          data-reveal
          style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          className={`lede mt-6 max-w-[38rem] ${tone === 'dark' ? '!text-white/75' : ''}`}
        >
          {intro}
        </div>
      )}
    </div>
  )
}
