import { Menu, X, Globe, ChevronDown, MessageSquare, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StudentDisclaimer from '../common/StudentDisclaimer';
import VSafeLogo from '../common/VSafeLogo';

interface HeaderProps {
  isChatOpen: boolean;
  onToggleChat: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export default function Header({ isChatOpen, onToggleChat, onOpenAuth }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { name: 'About V-safe', path: '/' },
    { name: 'Data and Research', path: '/data' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Notes for Participants', path: '/notes' },
    { name: 'Participants', path: '/participants' },
    { name: 'What\'s New', path: '/news' },
    { name: 'Data Security and Privacy', path: '/privacy' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      <StudentDisclaimer />
      
      {/* Top Header - White */}
      <div className="border-b border-slate-100 bg-white py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[72px] items-center justify-between gap-4">
            {/* Logo Area */}
            <Link id="logo-link" to="/" className="flex min-w-0 shrink items-center">
              <VSafeLogo className="max-w-[190px] sm:max-w-[240px] lg:max-w-[280px]" />
            </Link>

            {/* Top Right Utilities */}
            <div className="hidden min-w-0 shrink-0 items-center gap-2 md:flex lg:gap-4">
              <button className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-slate-600 transition-colors hover:text-health-navy lg:text-sm">
                <Globe className="w-4 h-4" />
                English
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="hidden h-6 w-px bg-slate-200 lg:block" />
              <button onClick={() => onOpenAuth('login')} className="whitespace-nowrap rounded border-2 border-slate-200 px-3 py-2.5 text-xs font-black text-health-navy transition-all hover:border-health-blue/30 hover:bg-slate-50 lg:px-5 lg:py-3 lg:text-sm">
                Log In
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                className="whitespace-nowrap rounded bg-health-blue px-4 py-2.5 text-xs font-black text-white shadow-md shadow-blue-100 transition-all hover:bg-blue-600 lg:px-7 lg:py-3 lg:text-sm"
              >
                Register Now
              </button>
              <button
                onClick={onToggleChat}
                className="group relative isolate overflow-hidden rounded-full border border-slate-200/80 bg-white/85 px-3 py-2 text-xs font-black text-slate-900 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300/80 hover:bg-white hover:shadow-[0_18px_45px_rgba(52,147,214,0.18)] focus:outline-none focus:ring-4 focus:ring-sky-400/15 active:translate-y-0 active:scale-[0.98] lg:px-4 lg:py-2.5 lg:text-sm"
                aria-pressed={isChatOpen}
              >
                <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.95),transparent_32%),linear-gradient(135deg,rgba(52,147,214,0.12),rgba(113,70,195,0.08)_55%,rgba(85,167,81,0.10))] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-y-1 left-1 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-sky-400 transition-all duration-200 group-hover:inset-y-2" />
                <span className="relative flex items-center gap-2.5 pl-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-health-blue shadow-[inset_0_0_0_1px_rgba(52,147,214,0.18),0_6px_16px_rgba(52,147,214,0.16)] transition-transform duration-200 group-hover:scale-105">
                    <MessageSquare className="h-4 w-4" />
                  </span>
                  Ask V-safe AI
                  <Sparkles className="h-3.5 w-3.5 text-violet-500/80 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-health-navy transition-colors"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation - Blue */}
      <nav className="hidden md:block bg-health-blue">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-max items-center">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`whitespace-nowrap px-3 py-3 text-[12px] font-bold tracking-wide transition-all lg:px-4 lg:text-[13px] ${
                  location.pathname === item.path 
                    ? 'text-white border-b-4 border-white bg-white/10' 
                    : 'text-blue-50 border-b-4 border-transparent hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="px-4 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button onClick={() => { setIsOpen(false); onOpenAuth('login'); }} className="text-sm font-bold text-health-navy border-2 border-slate-200 py-3 rounded-lg hover:bg-slate-50 transition-all text-center">Log In</button>
              <button onClick={() => { setIsOpen(false); onOpenAuth('register'); }} className="bg-health-blue text-white py-3 rounded-lg font-bold text-sm text-center shadow-md shadow-blue-50">Register Now</button>
            </div>
            
            <button
              onClick={() => {
                setIsOpen(false);
                onToggleChat();
              }}
              className="mb-6 flex w-full items-center justify-center gap-3 rounded-lg bg-health-blue py-4 font-black text-white shadow-lg"
            >
              <MessageSquare className="w-5 h-5" />
              Ask V-safe AI
            </button>
            
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base font-bold rounded-lg border-l-4 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 border-health-blue text-health-navy'
                      : 'text-slate-600 border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-100">
               <button className="flex items-center gap-2 p-3 w-full font-bold text-slate-600">
                <Globe className="w-5 h-5 text-health-blue" />
                Language: English
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
