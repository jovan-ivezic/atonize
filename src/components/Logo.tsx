type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="29.5" cy="10.5" r="3" fill="#FBA167" />
      <path
        d="M4 34 L17.6 9.6 Q20 5.4 22.4 9.6 L36 34"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 25.5 Q14.35 22 20 25.5 T31.3 25.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ className = '', showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      {showWordmark && (
        <span className="font-manrope text-[22px] font-extrabold tracking-[-0.03em] text-on-surface leading-none">
          atonize
        </span>
      )}
      <span className="sr-only">Atonize</span>
    </span>
  );
}
