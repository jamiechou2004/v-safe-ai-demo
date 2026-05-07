import { ChevronRight } from 'lucide-react';

interface VSafeLogoProps {
  inverted?: boolean;
  compact?: boolean;
}

export default function VSafeLogo({ inverted = false, compact = false }: VSafeLogoProps) {
  return (
    <div className="flex items-center gap-3" aria-label="V-safe">
      <div className={`font-black tracking-tight ${compact ? 'text-2xl' : 'text-4xl'} ${inverted ? 'text-white' : 'text-slate-950'}`}>
        V-safe
      </div>
      <div className="flex items-center -space-x-3">
        <ChevronRight className={`${compact ? 'w-8 h-8' : 'w-11 h-11'} stroke-[4] text-health-green`} />
        <ChevronRight className={`${compact ? 'w-8 h-8' : 'w-11 h-11'} stroke-[4] text-health-blue`} />
        <ChevronRight className={`${compact ? 'w-8 h-8' : 'w-11 h-11'} stroke-[4] text-health-purple`} />
      </div>
    </div>
  );
}
