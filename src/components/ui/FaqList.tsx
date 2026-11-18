import { Plus } from 'lucide-react'
import type { Faq } from '../../data/faq'

/** Accessible FAQ built on native <details>, so it works without JavaScript. */
export function FaqList({ items, tone = 'light' }: { items: Faq[]; tone?: 'light' | 'dark' }) {
  const line = tone === 'dark' ? 'border-white/15' : 'border-ink/15'
  return (
    <div className={`border-t ${line}`}>
      {items.map((f, i) => (
        <details key={f.id} className={`group border-b ${line}`} data-reveal style={{ '--reveal-delay': `${i * 50}ms` } as React.CSSProperties}>
          <summary className="flex cursor-pointer list-none items-start gap-5 py-6 [&::-webkit-details-marker]:hidden">
            <span className={`mono tabular mt-1.5 text-xs ${tone === 'dark' ? 'text-white/65' : 'text-ink-3'}`}>{String(i + 1).padStart(2, '0')}</span>
            <span className="flex-1 font-display text-[1.3rem] font-[700] leading-tight [font-stretch:85%] sm:text-[1.55rem]">{f.q}</span>
            <span
              className={`mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-full border transition-transform duration-500 group-open:rotate-45 ${
                tone === 'dark' ? 'border-white/30' : 'border-ink/25'
              }`}
              aria-hidden="true"
            >
              <Plus size={18} />
            </span>
          </summary>
          <div className="pb-7 pl-9 pr-12 text-[1.02rem] leading-relaxed opacity-85 sm:pl-10">
            <p className="max-w-[44rem]">{f.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}
