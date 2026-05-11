export default function SkyBackground() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="sun-wrap">
        <svg viewBox="0 0 340 340">
          <circle cx="220" cy="120" r="160" fill="#ffe8a8" opacity="0.18" />
          <circle cx="220" cy="120" r="130" fill="#ffe8a8" opacity="0.22" />
          <circle cx="220" cy="120" r="100" fill="#ffe8a8" opacity="0.35" />
          <circle cx="220" cy="120" r="78"  fill="#ffeec0" />
          <circle cx="220" cy="120" r="78"  fill="none" stroke="#f6c97a" strokeWidth="2" opacity="0.6" />
          <circle cx="200" cy="100" r="22"  fill="#fff7d6" opacity="0.9" />
        </svg>
      </div>

      <div className="cloud c1">
        <svg viewBox="0 0 220 110">
          <ellipse cx="115" cy="90" rx="100" ry="10" fill="rgba(232,156,176,0.35)" />
          <g fill="#f7c8d4">
            <ellipse cx="50"  cy="70" rx="36" ry="22" /><ellipse cx="95"  cy="78" rx="42" ry="24" />
            <ellipse cx="150" cy="74" rx="40" ry="22" /><ellipse cx="190" cy="70" rx="26" ry="18" />
          </g>
          <g fill="#ffffff">
            <ellipse cx="55"  cy="58" rx="32" ry="26" /><ellipse cx="95"  cy="48" rx="38" ry="32" />
            <ellipse cx="140" cy="54" rx="34" ry="28" /><ellipse cx="178" cy="60" rx="26" ry="22" />
          </g>
          <g fill="#f1e1ea" opacity="0.55">
            <ellipse cx="90"  cy="68" rx="20" ry="6" /><ellipse cx="145" cy="70" rx="18" ry="5" />
          </g>
        </svg>
      </div>

      <div className="cloud c2">
        <svg viewBox="0 0 200 100">
          <ellipse cx="100" cy="84" rx="86" ry="9" fill="rgba(232,156,176,0.3)" />
          <g fill="#f7c8d4">
            <ellipse cx="50"  cy="62" rx="34" ry="22" /><ellipse cx="100" cy="68" rx="44" ry="24" />
            <ellipse cx="155" cy="62" rx="36" ry="22" />
          </g>
          <g fill="#ffffff">
            <ellipse cx="55"  cy="50" rx="30" ry="24" /><ellipse cx="100" cy="40" rx="40" ry="32" />
            <ellipse cx="150" cy="50" rx="32" ry="26" />
          </g>
          <g fill="#f1e1ea" opacity="0.55"><ellipse cx="95" cy="60" rx="22" ry="6" /></g>
        </svg>
      </div>

      <div className="cloud c3">
        <svg viewBox="0 0 240 110">
          <ellipse cx="120" cy="92" rx="110" ry="10" fill="rgba(232,156,176,0.32)" />
          <g fill="#f7c8d4">
            <ellipse cx="40"  cy="72" rx="32" ry="20" /><ellipse cx="85"  cy="78" rx="42" ry="22" />
            <ellipse cx="140" cy="76" rx="44" ry="22" /><ellipse cx="195" cy="72" rx="38" ry="22" />
          </g>
          <g fill="#ffffff">
            <ellipse cx="45"  cy="58" rx="28" ry="22" /><ellipse cx="88"  cy="48" rx="38" ry="32" />
            <ellipse cx="138" cy="44" rx="42" ry="34" /><ellipse cx="190" cy="56" rx="32" ry="26" />
          </g>
          <g fill="#f1e1ea" opacity="0.55">
            <ellipse cx="85"  cy="68" rx="22" ry="6" /><ellipse cx="145" cy="68" rx="22" ry="6" />
          </g>
        </svg>
      </div>

      <div className="cloud c4">
        <svg viewBox="0 0 210 100">
          <ellipse cx="105" cy="84" rx="92" ry="9" fill="rgba(232,156,176,0.3)" />
          <g fill="#f7c8d4">
            <ellipse cx="45"  cy="64" rx="32" ry="20" /><ellipse cx="100" cy="70" rx="46" ry="22" />
            <ellipse cx="160" cy="64" rx="36" ry="22" />
          </g>
          <g fill="#ffffff">
            <ellipse cx="50"  cy="50" rx="28" ry="22" /><ellipse cx="100" cy="42" rx="40" ry="32" />
            <ellipse cx="155" cy="50" rx="32" ry="26" />
          </g>
          <g fill="#f1e1ea" opacity="0.55"><ellipse cx="95" cy="60" rx="22" ry="6" /></g>
        </svg>
      </div>

      <div className="cloud c5">
        <svg viewBox="0 0 160 80">
          <ellipse cx="80" cy="68" rx="68" ry="7" fill="rgba(232,156,176,0.25)" />
          <g fill="#f7c8d4">
            <ellipse cx="40"  cy="52" rx="28" ry="16" /><ellipse cx="80"  cy="56" rx="36" ry="18" />
            <ellipse cx="120" cy="52" rx="28" ry="16" />
          </g>
          <g fill="#ffffff">
            <ellipse cx="42"  cy="42" rx="24" ry="18" /><ellipse cx="80"  cy="34" rx="32" ry="24" />
            <ellipse cx="118" cy="42" rx="26" ry="20" />
          </g>
        </svg>
      </div>

      <div className="cloud c6">
        <svg viewBox="0 0 200 100">
          <ellipse cx="100" cy="86" rx="88" ry="8" fill="rgba(232,156,176,0.28)" />
          <g fill="#f7c8d4">
            <ellipse cx="45"  cy="66" rx="32" ry="20" /><ellipse cx="100" cy="72" rx="44" ry="22" />
            <ellipse cx="155" cy="66" rx="34" ry="20" />
          </g>
          <g fill="#ffffff">
            <ellipse cx="50"  cy="52" rx="28" ry="22" /><ellipse cx="100" cy="42" rx="40" ry="32" />
            <ellipse cx="150" cy="52" rx="30" ry="24" />
          </g>
          <g fill="#f1e1ea" opacity="0.55"><ellipse cx="95" cy="62" rx="22" ry="6" /></g>
        </svg>
      </div>
    </div>
  )
}
