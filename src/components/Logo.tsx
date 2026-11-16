type LogoProps = {
  className?: string;
  showWordmark?: boolean;
  variant?: 'dark' | 'light';
};

export function LogoMark({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="225 570 390 290" fill="none" className={className} aria-hidden="true">
      <path
        fill="#36424A"
        d="M420.8 576.6 L230.6 851.0 L341.8 851.0 L413.2 744.8 L315.7 824.8 L282.8 824.8 L420.8 633.1 L558.8 824.8 L525.9 824.8 L428.4 744.8 L499.8 851.0 L611.0 851.0 Z"
      />
      <path fill="#686866" d="M420.8 633.1 L311.6 779.3 L420.8 688.3 L530.0 779.3 Z" />
      <path fill="#686866" d="M311.6 779.3 L282.8 824.8 L306.1 824.8 Z" />
      <path fill="#686866" d="M530.0 779.3 L558.8 824.8 L535.5 824.8 Z" />
    </svg>
  );
}

export default function Logo({ className = '', showWordmark = true, variant = 'dark' }: LogoProps) {
  if (!showWordmark) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <LogoMark />
        <span className="sr-only">Atonize</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src={variant === 'light' ? '/images/atonize-logo-light.svg' : '/images/atonize-logo.svg'}
        alt="Atonize"
        className="h-12 w-auto"
      />
    </span>
  );
}
