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
# Ruby-Lee,

I wish I had the words, I wish I had the words to explain the last two years. I wish I had the words so that I could make you understand exactly how much you mean to me

I wish i could explain how much i have seen you grow, how you have changed from a young girl to a beatiful Woman. You have grown in ways i think even you dont understand. 
I am truly in aw of how you have over come the past two years. I wish i could show ruby from two years ago you now. Standing tall. 

I wish i could explain how caring you are and how you have stuck with me through my darkest days. How supportive you have been and how you truly stood by me every step of the way.

I wish i could explain to you how beatiful you are, how truly and utterly beatiful you are. I wish I could show you how heads turn when ever you walk into a room

I wish i could make you understand how blessed I am to have you in my life. I wish you would understand how much everyone loves having you around how truly great you are.
I wish you could fathom how much value you add to any room. 

I wish you could realise how much you deserve and how much i want to give you. 

I wish I had the word to make you understand, to make you truly get just how much I love you

Happy Birthday and Happy anniversary
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
