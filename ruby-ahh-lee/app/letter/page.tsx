'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SkyBackground from '@/components/SkyBackground'

const CORNER_SVG = (
  <svg viewBox="0 0 40 40">
    <g fill="#e07a99">
      <rect x="17" y="6"  width="6" height="6" transform="rotate(45 20 9)" />
      <rect x="9"  y="17" width="6" height="6" transform="rotate(45 12 20)" />
      <rect x="17" y="17" width="6" height="6" transform="rotate(45 20 20)" />
    </g>
  </svg>
)

const LETTER = `
# My Dearest Ruby-Lee,

There are things I've been meaning to put into words for a while now — things I carry with me quietly, that I want you to have written down somewhere you can find them whenever you need them.

---

## Two Years

Two years. It sounds small when you say it out loud, but we've lived a lot inside those two years. You've seen me at my worst and stuck around for my best. I don't take that lightly.

I remember the exact moment I realised I was in trouble — properly, happily in trouble. You were laughing at something, not even looking at me, and I thought: *I want to hear that laugh for the rest of my life.*

---

## What You've Given Me

You have this way of making ordinary things feel like they matter. A Tuesday afternoon, a drive nowhere in particular, a stupid show we've both already seen — *better*, just because you're there.

You make me want to be better. Not in a pressured way. In the quiet way that comes from loving someone who loves you back clearly and without condition.

> "The best thing to hold onto in life is each other."

---

## Today

Today is yours. Every cloud up there, every word on this page, every ridiculous amount of thought that went into this website — all of it is because you deserve to feel celebrated.

Happy birthday. Happy anniversary.

I love you more than I know how to write down.

Yours always,

**Milan** ♥
`

export default function LetterPage() {
  return (
    <div className="page-sky">
      <SkyBackground />
      <Link href="/" className="back-pill">← back</Link>

      <div className="letter-stage">
        <div className="menu-card letter-card">
          <div className="corner tl">{CORNER_SVG}</div>
          <div className="corner tr">{CORNER_SVG}</div>
          <div className="corner bl">{CORNER_SVG}</div>
          <div className="corner br">{CORNER_SVG}</div>

          <div className="letter-card-header">
            <div className="eyebrow">
              <span className="tick" />
              Happy Anniversary · Happy Birthday
              <span className="tick" />
            </div>
            <h1 className="menu-title">A letter from me.</h1>
          </div>

          <div className="letter-paper">
            <div className="letter-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {LETTER}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
