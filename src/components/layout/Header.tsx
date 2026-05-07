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
                className={`group relative overflow-hidden rounded-full border px-3 py-2.5 text-xs font-black shadow-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-health-blue/15 active:translate-y-0 active:scale-[0.98] lg:px-5 lg:py-3 lg:text-sm ${
                  isChatOpen
                    ? 'border-health-navy bg-health-navy text-white shadow-slate-300'
                    : 'border-health-blue/70 bg-white text-health-navy hover:border-health-blue hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/70'
                }`}
                aria-pressed={isChatOpen}
              >
                <span className={`absolute left-2 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full transition-all duration-200 ${
                  isChatOpen ? 'bg-health-green' : 'bg-health-green/80 group-hover:h-7'
                }`} />
                <span className="relative flex items-center gap-2">
                  {isChatOpen ? <X className="h-4 w-4" /> : <MessageSquare className="h-4 w-4 text-health-blue transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-health-blue" />}
                  {isChatOpen ? 'Close AI' : 'Ask V-safe AI'}
                  {!isChatOpen && <Sparkles className="h-3.5 w-3.5 text-health-purple opacity-80 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110" />}
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
              className={`mb-6 flex w-full items-center justify-center gap-3 rounded-lg py-4 font-black shadow-lg ${
                isChatOpen ? 'bg-health-navy text-white' : 'bg-health-blue text-white'
              }`}
            >
              {isChatOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              {isChatOpen ? 'Close V-safe AI' : 'Ask V-safe AI'}
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
