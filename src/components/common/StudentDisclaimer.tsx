import { AlertCircle } from 'lucide-react';

export default function StudentDisclaimer() {
  return (
    <div className="bg-amber-50 border-b border-amber-100 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-amber-800 text-xs md:text-sm font-medium">
        <AlertCircle id="disclaimer-icon" className="w-4 h-4 shrink-0" />
        <span>STUDENT PROJECT: This is a redesign prototype and NOT an official CDC or government website.</span>
      </div>
    </div>
  );
}
