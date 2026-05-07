import vSafeLogo from '../../assets/logos/V_SafeLogo.png';

interface VSafeLogoProps {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}

export default function VSafeLogo({ inverted = false, compact = false, className = '' }: VSafeLogoProps) {
  return (
    <img
      src={vSafeLogo}
      alt="V-safe"
      className={`${compact ? 'h-10' : 'h-12 sm:h-14 lg:h-16'} w-auto object-contain ${inverted ? 'brightness-0 invert' : ''} ${className}`}
    />
  );
}
