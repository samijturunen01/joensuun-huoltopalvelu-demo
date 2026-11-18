import { useRef, useState } from 'react'
import { Maximize2, X, ZoomIn } from 'lucide-react'
import type { GuidePhoto } from '../../data/plateGuide'
import { plateSize, plateSrc, plateSrcSet } from '../../lib/asset'

const LOUPE = 190
const ZOOM = 2.6

/**
 * A rating-plate photo with a round magnifier (the drum window again) that
 * follows the pointer, plus a full-size viewer in a native <dialog>.
 */
export function PlateViewer({ photo, priority = false }: { photo: GuidePhoto; priority?: boolean }) {
  const [lens, setLens] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const size = plateSize(photo.id)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    setLens({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height })
  }

  return (
    <figure className="group">
      <div
        className="relative cursor-zoom-in overflow-hidden rounded-2xl bg-ink"
        onPointerMove={onMove}
        onPointerLeave={() => setLens(null)}
        onClick={() => dialog.current?.showModal()}
      >
        <img
          src={plateSrc(photo.id, 960)}
          srcSet={plateSrcSet(photo.id)}
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={`Kuva tyyppikilven paikasta: ${photo.caption}`}
          width={size.w}
          height={size.h}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-auto max-h-[34rem] w-full object-contain"
        />
        {lens && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full border-[6px] border-white shadow-[0_18px_40px_rgb(0_0_0/0.45),inset_0_0_0_1px_rgb(0_0_0/0.2)]"
            style={{
              width: LOUPE,
              height: LOUPE,
              left: lens.x - LOUPE / 2,
              top: lens.y - LOUPE / 2,
              backgroundImage: `url(${plateSrc(photo.id, 1600)})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
              backgroundPosition: `${-(lens.x * ZOOM - LOUPE / 2)}px ${-(lens.y * ZOOM - LOUPE / 2)}px`,
            }}
          />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            dialog.current?.showModal()
          }}
          className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-2 text-[0.85rem] font-semibold text-ink shadow-lg backdrop-blur transition-colors hover:bg-white"
        >
          <Maximize2 size={15} aria-hidden="true" /> Suurenna kuva
        </button>
        <span className="pointer-events-none absolute left-3 top-3 hidden items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.75rem] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 md:inline-flex">
          <ZoomIn size={14} aria-hidden="true" /> Vie hiiri kilven päälle
        </span>
      </div>
      <figcaption className="mt-3 flex gap-2 text-[0.92rem] text-ink-2">
        <span className="led mt-[0.45rem]" aria-hidden="true" />
        {photo.caption}
      </figcaption>

      <dialog
        ref={dialog}
        aria-label={photo.caption}
        className="m-auto max-h-[95svh] max-w-[min(96vw,1600px)] overflow-auto rounded-2xl bg-ink p-0 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close()
        }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-ink/90 px-4 py-3 backdrop-blur">
          <p className="text-[0.92rem]">{photo.caption}</p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            aria-label="Sulje kuva"
            autoFocus
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <img src={plateSrc(photo.id, 1600)} alt={`Kuva tyyppikilven paikasta: ${photo.caption}`} width={size.w} height={size.h} loading="lazy" className="h-auto w-full" />
      </dialog>
    </figure>
  )
}
