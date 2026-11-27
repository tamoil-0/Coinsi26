export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path
        d="M6 40 L21 25 L29 32 L40 18 L58 40"
        fill="none"
        stroke="#438BFF"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line x1="6" y1="48" x2="58" y2="48" stroke="#F1B86A" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="40" cy="18" r="4" fill="#53D8F5" />
    </svg>
  );
}
