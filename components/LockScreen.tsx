'use client'

import { useEffect, useRef, useState } from 'react'
import Dial from './Dial'

const COMBO = [1, 2, 0, 5]
const HEART_PATH =
  'M50 84 C22 62 4 44 10 24 C16 8 36 4 50 22 C64 4 84 8 90 24 C96 44 78 62 50 84 Z'

interface LockScreenProps {
  phase: 'lock' | 'menu'
  onSolved: () => void
}

export default function LockScreen({ phase, onSolved }: LockScreenProps) {
  const [digits, setDigits] = useState<number[]>([0, 0, 0, 0])
  const [solved, setSolved] = useState(false)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    const correct = digits.every((d, i) => d === COMBO[i])
    if (correct) {
      hasStarted.current = true
      setSolved(true)
      const t = setTimeout(() => onSolved(), 1700)
      return () => clearTimeout(t)
    }
  }, [digits, onSolved])

  const setDigit = (i: number, v: number) => {
    setDigits(p => { const n = [...p]; n[i] = v; return n })
  }

  return (
    <div className={`screen lock-screen ${phase === 'menu' ? 'is-fading-out' : ''}`}>
      <div className="lock-wrap">
        <div className={`lock-stage ${solved ? 'is-open' : ''}`}>
          <div className="shackle">
            <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMin meet">
              <path className="shackle-arch" d="M28 120 L28 44 A32 32 0 0 1 92 44 L92 120" />
            </svg>
          </div>

          <div className="heart">
            <svg viewBox="0 0 100 90" preserveAspectRatio="xMidYMin meet">
              <path className="heart-path" d={HEART_PATH} />
            </svg>
          </div>

          <div className="dial-area">
            <div className="label">The Day we got Together</div>
            <div className="dials">
              {digits.map((d, i) => (
                <Dial key={i} value={d} onChange={(v) => setDigit(i, v)} />
              ))}
            </div>
          </div>

          <div className={`status ${solved ? 'show' : ''}`}>
            Correct — unlocking
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>

        <div className="hint">Hint · MM / DD</div>
      </div>
    </div>
  )
}
