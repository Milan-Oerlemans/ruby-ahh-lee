'use client'

import { useEffect, useRef, useState } from 'react'
import { asset } from '@/lib/asset'

interface Q { text: string; options: string[]; correct: number }

const QS: Q[] = [
  { text: "What's Ruby-Lee's favourite flower?",           options: ['Roses', 'Peonies', 'Tulips', 'Orchids'],                        correct: 2  },
  { text: "What's her favourite fruit?",                  options: ['Strawberries', 'Watermelon', 'Mango', 'Apples'],                 correct: 2  },
  { text: "What's her go-to drink?",                      options: ['Iced Coffee', 'Smoothie', 'Matcha', 'Soda'],                     correct: 2  },
  { text: "Favourite meal out?",                          options: ['Dinner', 'Picnic', 'Brunch', 'Breakfast'],                       correct: 0  },
  { text: "Ice cream or frozen yogurt?",                  options: ['Ice Cream', 'Frozen Yogurt'],                                    correct: 1  },
  { text: "Favourite animal?",                            options: ['Cats', 'Dogs', 'Birds', 'Horse'],                                correct: 0  },
  { text: "Gold or silver?",                              options: ['Gold', 'Silver'],                                                correct: 1  },
  { text: "One of these is NOT Ruby-Lee's favourite sweet — pick the odd one out.", options: ['White Chocolate', 'Rainbow Mentos', 'Double Hearts', 'Speckled Eggs'], correct: -1 },
  { text: "Sleep in late or get up early?",               options: ['Sleep In Late', 'Get Up Early'],                                 correct: 0  },
  { text: "Garlic bread or cheese sticks?",               options: ['Garlic Bread', 'Cheese Sticks'],                                 correct: 1  },
  { text: "mmmmmbbbb or hhhhhaaaaaa?",                    options: ['mmmmmbbbb', 'hhhhhaaaaaa'],                                      correct: 0  },
  { text: "dos or numero?",                               options: ['dos', 'numero'],                                                 correct: 1  },
]

const TILE_COLORS = ['#fbd9e3', '#d9ecfb', '#d3f5e4', '#fbf3d9']

function PhotoTile({ qi, i, opt }: { qi: number; i: number; opt: string }) {
  const src = asset(`/quiz/q${qi + 1}_opt${i + 1}.jpg`)
  return (
    <>
      <img
        src={src}
        alt={opt}
        className="qtile-photo-img"
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span className="qtile-photo-placeholder">{opt.charAt(0)}</span>
    </>
  )
}

export default function KnowQuiz({ exiting }: { exiting: boolean }) {
  const [qi, setQi]           = useState(0)
  const [sel, setSel]         = useState<number | null>(null)
  const [tOut, setTOut]       = useState(false)
  const [tLeft, setTLeft]     = useState(10)
  const [score, setScore]     = useState(0)
  const [phase, setPhase]     = useState<'q' | 'result' | 'done'>('q')
  const [showPrize, setShowPrize] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const q = QS[qi]
  const trick = q?.correct === -1

  // tick
  useEffect(() => {
    if (phase !== 'q') return
    timer.current = setInterval(() => setTLeft(t => t - 1), 1000)
    return () => { if (timer.current) clearInterval(timer.current) }
  }, [phase, qi])

  // timeout trigger
  useEffect(() => {
    if (phase === 'q' && tLeft <= 0) {
      if (timer.current) clearInterval(timer.current)
      setTOut(true)
      setPhase('result')
    }
  }, [tLeft, phase])

  // auto-advance after result
  useEffect(() => {
    if (phase !== 'result') return
    const id = setTimeout(() => {
      const next = qi + 1
      if (next >= QS.length) {
        setPhase('done')
      } else {
        setQi(next); setSel(null); setTOut(false); setTLeft(10); setPhase('q')
      }
    }, 2200)
    return () => clearTimeout(id)
  }, [phase, qi])

  function pick(i: number) {
    if (phase !== 'q') return
    if (timer.current) clearInterval(timer.current)
    setSel(i)
    if (!trick && i === q.correct) setScore(s => s + 1)
    setPhase('result')
  }

  function restart() {
    setQi(0); setSel(null); setTOut(false); setTLeft(10); setScore(0); setPhase('q'); setShowPrize(false)
  }

  const pct = (tLeft / 10) * 100

  if (phase === 'done') {
    const perfect  = score === QS.length
    const good     = score >= 9
    const hasPrize = score >= 8

    return (
      <div className={`quiz-inner ${exiting ? 'is-exiting' : ''}`}>
        <div className="quiz-done">
          <div className="quiz-done-score">
            {score}<span className="quiz-done-denom">/{QS.length}</span>
          </div>
          <h2 className="quiz-done-title">
            {perfect ? 'Perfect score!' : good ? 'Damn, you know her!' : "You've got some studying to do."}
          </h2>
          <p className="quiz-done-sub">
            {perfect
              ? "You really do know Ruby-Lee inside out."
              : good
              ? "Not bad at all — Ruby-Lee would be impressed."
              : "Maybe spend a little more quality time with Ruby-Lee 😄"}
          </p>

          {hasPrize && !showPrize && (
            <button className="quiz-prize-btn" onClick={() => setShowPrize(true)}>
              🎉 Congrats — here is your prize
            </button>
          )}

          {hasPrize && showPrize && (
            <div className="quiz-prize-video">
              <video
                src={asset('/quiz/prize.mp4')}
                controls
                autoPlay
                playsInline
                className="quiz-prize-player"
              />
            </div>
          )}

          <button className="quiz-retry-btn" onClick={restart}>Play again</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`quiz-inner ${exiting ? 'is-exiting' : ''}`}>
      {/* Header */}
      <div className="quiz-hd">
        <div className="quiz-hd-top">
          <span className="quiz-count">Question {qi + 1} <span className="quiz-count-of">of {QS.length}</span></span>
          <span className="quiz-time-num">{phase === 'q' ? `${tLeft}s` : ''}</span>
        </div>
        <div className="quiz-bar-track">
          <div
            className={`quiz-bar-fill${tLeft <= 3 && phase === 'q' ? ' is-urgent' : ''}`}
            style={{ width: `${pct}%`, transition: phase === 'q' ? 'width 1s linear, background 0.4s' : 'none' }}
          />
        </div>
      </div>

      {/* Question */}
      <p className="quiz-q">{q.text}</p>

      {/* Tiles */}
      <div className={`quiz-tiles quiz-tiles--${q.options.length === 2 ? '2' : '4'}`}>
        {q.options.map((opt, i) => {
          const isSelected    = sel === i
          const isCorrectTile = q.correct === i
          const flip = isSelected || (tOut && !trick && isCorrectTile)
          const dim  = phase === 'result' && !flip

          let variant = ''
          let msg = ''
          if (isSelected) {
            if (trick)          { variant = 'trick';   msg = 'Ha! Trick question — Ruby-Lee loves them ALL 😄' }
            else if (isCorrectTile) { variant = 'correct'; msg = 'Damn — you got it ✓' }
            else                { variant = 'wrong';   msg = 'Wrong — damn you should know this' }
          } else if (tOut && !trick && isCorrectTile) {
            variant = 'timeout'; msg = 'So close but so far…'
          }

          return (
            <button
              key={i}
              className={`quiz-tile${flip ? ' is-flipped' : ''}${dim ? ' is-dim' : ''}`}
              onClick={() => pick(i)}
              disabled={phase !== 'q'}
            >
              <span className="qtile-inner">
                <span className="qtile-front">
                  <span className="qtile-photo" style={{ background: TILE_COLORS[i % TILE_COLORS.length] }}>
                    <PhotoTile qi={qi} i={i} opt={opt} />
                  </span>
                  <span className="qtile-label">{opt}</span>
                </span>
                <span className={`qtile-back qtile-back--${variant}`}>
                  <span className="qtile-msg">{msg}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
