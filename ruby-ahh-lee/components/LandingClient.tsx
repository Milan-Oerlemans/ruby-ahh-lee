'use client'

import { useCallback, useEffect, useState } from 'react'
import LockScreen from './LockScreen'
import MenuScreen from './MenuScreen'

const STORAGE_KEY = 'ruby-unlocked'

export default function LandingClient() {
  // null = waiting for localStorage check (avoids SSR mismatch)
  const [phase, setPhase] = useState<'lock' | 'menu' | null>(null)
  const [lockKey, setLockKey] = useState(0)

  useEffect(() => {
    const unlocked = localStorage.getItem(STORAGE_KEY)
    setPhase(unlocked ? 'menu' : 'lock')
  }, [])

  const handleSolved = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, '1')
    setPhase('menu')
  }, [])

  const handleBack = () => {
    localStorage.removeItem(STORAGE_KEY)
    setPhase('lock')
    setLockKey(k => k + 1)
  }

  if (phase === null) return null

  return (
    <div className="stage">
      <LockScreen key={lockKey} phase={phase} onSolved={handleSolved} />
      <MenuScreen shown={phase === 'menu'} onBack={handleBack} />
    </div>
  )
}
