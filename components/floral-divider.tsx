export function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Leaves */}
      <ellipse cx="28" cy="52" rx="10" ry="18" fill="#7a9a6e" transform="rotate(-30 28 52)" opacity="0.85" />
      <ellipse cx="52" cy="50" rx="9" ry="16" fill="#8bab7e" transform="rotate(25 52 50)" opacity="0.8" />
      <ellipse cx="40" cy="58" rx="8" ry="14" fill="#6d8f62" transform="rotate(5 40 58)" opacity="0.75" />
      <path d="M38 62 Q40 48 42 38" stroke="#5a7a50" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M42 60 Q44 46 46 36" stroke="#5a7a50" strokeWidth="1.2" fill="none" opacity="0.5" />

      {/* White rose */}
      <circle cx="36" cy="32" r="10" fill="#f8f6f2" stroke="#e8e0d4" strokeWidth="0.5" />
      <circle cx="33" cy="30" r="5" fill="#fffef9" />
      <circle cx="38" cy="34" r="4" fill="#f5f0e8" />

      {/* Peach rose */}
      <circle cx="48" cy="28" r="11" fill="#f0c9a0" stroke="#e0b888" strokeWidth="0.5" />
      <circle cx="45" cy="26" r="5.5" fill="#f5d4b0" />
      <circle cx="50" cy="30" r="4.5" fill="#e8bf94" />

      {/* Yellow accent */}
      <circle cx="42" cy="22" r="7" fill="#f0d878" stroke="#e0c868" strokeWidth="0.5" opacity="0.9" />
      <circle cx="40" cy="20" r="3.5" fill="#f5e090" />

      {/* Small sprigs */}
      <circle cx="22" cy="38" r="3" fill="#a8b8c8" opacity="0.7" />
      <circle cx="58" cy="36" r="2.5" fill="#b0c0d0" opacity="0.6" />
      <circle cx="26" cy="42" r="2" fill="#98a8b8" opacity="0.5" />
    </svg>
  )
}
