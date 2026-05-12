'use client'

import { useEffect, useRef } from 'react'
import { asset } from '@/lib/asset'

interface Item { file: string; type: 'image' | 'video'; date: string }

// Add dates as "May 2024", "Dec 2024", etc. — leave blank to show just a dot
const MEDIA: Item[] = [
  { file: 't001.jpeg', type: 'image', date: '' },
  { file: 't002.jpeg', type: 'image', date: '' },
  { file: 't003.jpeg', type: 'image', date: '' },
  { file: 't004.jpeg', type: 'image', date: '' },
  { file: 't005.jpeg', type: 'image', date: '' },
  { file: 't006.jpeg', type: 'image', date: '' },
  { file: 't007.jpeg', type: 'image', date: '' },
  { file: 't008.jpeg', type: 'image', date: '' },
  { file: 't009.jpeg', type: 'image', date: '' },
  { file: 't010.jpeg', type: 'image', date: '' },
  { file: 't011.jpeg', type: 'image', date: '' },
  { file: 't012.jpeg', type: 'image', date: '' },
  { file: 't013.jpeg', type: 'image', date: '' },
  { file: 't014.jpeg', type: 'image', date: '' },
  { file: 't015.jpeg', type: 'image', date: '' },
  { file: 't016.jpeg', type: 'image', date: '' },
  { file: 't017.jpeg', type: 'image', date: '' },
  { file: 't018.jpeg', type: 'image', date: '' },
  { file: 't019.jpeg', type: 'image', date: '' },
  { file: 't020.jpeg', type: 'image', date: '' },
  { file: 't021.jpeg', type: 'image', date: '' },
  { file: 't022.jpeg', type: 'image', date: '' },
  { file: 't023.jpeg', type: 'image', date: '' },
  { file: 't024.jpeg', type: 'image', date: '' },
  { file: 't025.jpeg', type: 'image', date: '' },
  { file: 't026.jpeg', type: 'image', date: '' },
  { file: 't027.jpeg', type: 'image', date: '' },
  { file: 't028.jpeg', type: 'image', date: '' },
  { file: 't029.jpeg', type: 'image', date: '' },
  { file: 't030.jpeg', type: 'image', date: '' },
  { file: 't031.jpeg', type: 'image', date: '' },
  { file: 't032.jpeg', type: 'image', date: '' },
  { file: 't033.jpeg', type: 'image', date: '' },
  { file: 't034.jpeg', type: 'image', date: '' },
  { file: 't035.jpeg', type: 'image', date: '' },
  { file: 't036.jpeg', type: 'image', date: '' },
  { file: 't037.jpeg', type: 'image', date: '' },
  { file: 't038.jpeg', type: 'image', date: '' },
  { file: 't039.jpeg', type: 'image', date: '' },
  { file: 't040.jpeg', type: 'image', date: '' },
  { file: 't041.jpeg', type: 'image', date: '' },
  { file: 't042.jpeg', type: 'image', date: '' },
  { file: 't043.jpeg', type: 'image', date: '' },
  { file: 't044.jpeg', type: 'image', date: '' },
  { file: 't045.jpeg', type: 'image', date: '' },
  { file: 't046.jpeg', type: 'image', date: '' },
  { file: 't047.jpeg', type: 'image', date: '' },
  { file: 't048.mp4',  type: 'video', date: '' },
  { file: 't049.mp4',  type: 'video', date: '' },
  { file: 't050.mp4',  type: 'video', date: '' },
]

function AutoVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      muted
      playsInline
      loop
      controls
      preload="none"
      className="tl-media tl-video"
    />
  )
}

export default function YearsTimeline({ exiting }: { exiting: boolean }) {
  return (
    <div className={`years-inner ${exiting ? 'is-exiting' : ''}`}>

      {/* Sticky header */}
      <div className="years-page-header">
        <div className="eyebrow">
          <span className="tick" />
          2 years and counting
          <span className="tick" />
        </div>
        <h1 className="menu-title">Us, over the years.</h1>
      </div>

      {/* Scrollable timeline */}
      <div className="years-scroll">
        <div className="tl-track">

          {/* Opening chapter */}
          <div className="tl-chapter">
            <div className="tl-chapter-pill">
              <span className="tl-chapter-title">Our first date</span>
            </div>
          </div>

          {/* Timeline items */}
          {MEDIA.map(({ file, type, date }, i) => {
            const side = i % 2 === 0 ? 'tl-left' : 'tl-right'
            const card = (
              <div className="tl-card">
                {type === 'image' ? (
                  <img
                    src={asset(`/timeline/${file}`)}
                    alt=""
                    loading="lazy"
                    className="tl-media"
                  />
                ) : (
                  <AutoVideo src={asset(`/timeline/${file}`)} />
                )}
              </div>
            )

            return (
              <div key={file} className={`tl-item ${side}`}>
                {/* Left side */}
                <div className="tl-half tl-half-left">
                  {side === 'tl-left' && card}
                </div>

                {/* Center column: dot + optional date */}
                <div className="tl-mid">
                  {date && (
                    <span className={`tl-date ${side === 'tl-left' ? 'tl-date--left' : 'tl-date--right'}`}>
                      {date}
                    </span>
                  )}
                  <span className="tl-dot" />
                </div>

                {/* Right side */}
                <div className="tl-half tl-half-right">
                  {side === 'tl-right' && card}
                </div>
              </div>
            )
          })}

          {/* Closing chapter */}
          <div className="tl-chapter tl-chapter--end">
            <div className="tl-chapter-pill">
              <span className="tl-chapter-title">Your 21st Birthday</span>
              <span className="tl-chapter-sub">2 years and counting ♥</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
