'use client'

interface DialProps {
  value: number
  onChange: (v: number) => void
}

export default function Dial({ value, onChange }: DialProps) {
  return (
    <div className="dial">
      <button className="dial-btn" aria-label="up" onClick={() => onChange((value + 1) % 10)}>
        ＋
      </button>
      <div className="digit-box">
        <span className="digit-num" key={value}>{value}</span>
      </div>
      <button className="dial-btn" aria-label="down" onClick={() => onChange((value + 9) % 10)}>
        −
      </button>
    </div>
  )
}
