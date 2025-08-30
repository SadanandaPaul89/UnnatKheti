type Props = {
  className?: string
  title?: string
}

export function UnnatKhetiLogo({ className = "h-10 w-10", title = "UNNATKHETI logo" }: Props) {
  // Colors: primary green (#2e7d32), neutrals (white/black/gray), warm accent (#d97706)
  return (
    <svg className={className} viewBox="0 0 120 120" role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <clipPath id="u-clip">
          <path d="M20,10 v50 c0,22 18,40 40,40 s40,-18 40,-40 V10" />
        </clipPath>
      </defs>

      {/* U outline */}
      <path
        d="M20,10 v50 c0,22 18,40 40,40 s40,-18 40,-40 V10"
        fill="none"
        stroke="#2e7d32"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Crop rows inside U */}
      <g clipPath="url(#u-clip)">
        <path d="M10,72 C35,62 85,62 110,72" fill="none" stroke="#3aa556" strokeWidth="4" />
        <path d="M10,82 C35,72 85,72 110,82" fill="none" stroke="#3aa556" strokeWidth="4" />
        <path d="M10,92 C35,82 85,82 110,92" fill="none" stroke="#3aa556" strokeWidth="4" />
        <path d="M10,102 C35,92 85,92 110,102" fill="none" stroke="#3aa556" strokeWidth="4" />
      </g>

      {/* Warm accent sun */}
      <circle cx="96" cy="22" r="5" fill="#d97706" />
    </svg>
  )
}
