import vSafeLogo from '../../assets/logos/V_SafeLogo.png';

interface VSafeLogoProps {
  inverted?: boolean;
  compact?: boolean;
}

export default function VSafeLogo({ inverted = false, compact = false }: VSafeLogoProps) {
  return (
    <img
      src={vSafeLogo}
      alt="V-safe"
      className={`${compact ? 'h-10' : 'h-16 md:h-20'} w-auto object-contain ${inverted ? 'brightness-0 invert' : ''}`}
    />
  );
}
