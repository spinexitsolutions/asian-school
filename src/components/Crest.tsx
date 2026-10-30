/**
 * Placeholder school crest: a Rajasthani jharokha arch with the school's
 * initials. Replace by uploading a logo in Site Settings.
 */
export function Crest({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="The Asian School crest"
    >
      <path d="M8 60V30C8 15 19 4 32 4s24 11 24 26v30H8Z" fill="#0E1A33" />
      <path
        d="M13 56V31c0-11.5 8.4-21 19-21s19 9.5 19 21v25"
        fill="none"
        stroke="#C9A35B"
        strokeWidth="1.2"
      />
      <path d="M32 14l1.6 3.4 3.7.4-2.8 2.5.8 3.6L32 22l-3.3 1.9.8-3.6-2.8-2.5 3.7-.4L32 14Z" fill="#C9A35B" />
      <text
        x="32"
        y="45"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="17"
        fontStyle="italic"
        fill="#FFFFFF"
      >
        AS
      </text>
      <path d="M18 51h28" stroke="#C9A35B" strokeWidth="1" />
    </svg>
  )
}
