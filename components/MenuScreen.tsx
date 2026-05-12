'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import SkyBackground from './SkyBackground'
import KnowQuiz from './KnowQuiz'
import YearsTimeline from './YearsTimeline'

const ITEMS = [
  { id: 'know',   label: 'How well do you know Ruby-Lee?' },
  { id: 'years',  label: 'Us, over the years' },
  { id: 'gift',   label: "Ruby-Lee's birthday present" },
  { id: 'letter', label: 'A letter from me' },
]

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

interface MenuScreenProps {
  shown: boolean
  onBack: () => void
}

export default function MenuScreen({ shown, onBack }: MenuScreenProps) {
  const router = useRouter()
  const [view, setView] = useState<'menu' | 'letter' | 'know' | 'years'>('menu')
  const [exiting, setExiting] = useState(false)

  // Reset to menu whenever the screen is hidden (e.g. user locks and returns)
  useEffect(() => {
    if (!shown) {
      setView('menu')
      setExiting(false)
    }
  }, [shown])

  const transition = (to: 'menu' | 'letter') => {
    setExiting(true)
    setTimeout(() => {
      setView(to)
      setExiting(false)
    }, 280)
  }

  const handlePillClick = () => {
    if (view === 'letter' || view === 'know' || view === 'years') {
      transition('menu')
    } else {
      onBack()
    }
  }

  const handleItemClick = (id: string) => {
    if (id === 'letter') {
      transition('letter')
    } else if (id === 'know') {
      transition('know')
    } else if (id === 'years') {
      transition('years')
    } else {
      router.push(`/${id}`)
    }
  }

  return (
    <div className={`screen menu-screen ${shown ? 'is-shown' : ''}`}>
      <SkyBackground />

      <button className="back-pill" onClick={handlePillClick}>
        {view === 'letter' || view === 'know' || view === 'years' ? '← back to menu' : '🔒 lock it up and leave'}
      </button>

      <div className={`menu-stage${view === 'years' ? ' is-years' : ''}`}>
        <div className={`menu-card ${view === 'letter' ? 'is-letter' : ''}${view === 'know' ? ' is-know' : ''}${view === 'years' ? ' is-years' : ''}`}>
          <div className="corner tl">{CORNER_SVG}</div>
          <div className="corner tr">{CORNER_SVG}</div>
          <div className="corner bl">{CORNER_SVG}</div>
          <div className="corner br">{CORNER_SVG}</div>

          {/* ── Menu view ── */}
          {view === 'menu' && (
            <div className={`menu-inner ${exiting ? 'is-exiting' : ''}`}>
              <header className="menu-header">
                <div className="eyebrow">
                  <span className="tick" />
                  Happy Anniversary · Happy Birthday
                  <span className="tick" />
                </div>
                <h1 className="menu-title">For you, Ruby-Lee.</h1>
                <p className="menu-sub">Pick a cloud to begin —</p>
              </header>

              <ul className="menu-list">
                {ITEMS.map((item, i) => (
                  <li key={item.id}>
                    <button className="menu-btn" onClick={() => handleItemClick(item.id)}>
                      <span className="num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="btn-label">{item.label}</span>
                      <span className="arrow">→</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="menu-foot">
                made with <span className="menu-heart">♥</span> just for you
              </div>
            </div>
          )}

          {/* ── Letter view ── */}
          {view === 'letter' && (
            <div className={`letter-inner ${exiting ? 'is-exiting' : ''}`}>
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
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{LETTER}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}

          {/* ── Know view ── */}
          {view === 'know' && (
            <KnowQuiz exiting={exiting} />
          )}

          {/* ── Years view ── */}
          {view === 'years' && (
            <YearsTimeline exiting={exiting} />
          )}
        </div>
      </div>
    </div>
  )
}
