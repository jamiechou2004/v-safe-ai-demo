import { ShieldCheck, Menu, X, Globe, ChevronDown, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StudentDisclaimer from '../common/StudentDisclaimer';
import VSafeLogo from '../common/VSafeLogo';

interface HeaderProps {
  onOpenChat: () => void;
}

export default function Header({ onOpenChat }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const mainNavItems = [
    { name: 'About V-safe', path: '/' },
    { name: 'Data and Research', path: '/data' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Notes for Participants', path: '/notes' },
    { name: 'What\'s New', path: '/news' },
    { name: 'Data Security and Privacy', path: '/privacy' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      <StudentDisclaimer />
      
      {/* Top Header - White */}
      <div className="bg-white py-4 md:py-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Area */}
            <Link id="logo-link" to="/" className="flex items-center">
              <VSafeLogo />
            </Link>

            {/* Top Right Utilities */}
            <div className="hidden md:flex items-center gap-6">
              <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-health-navy transition-colors">
                <Globe className="w-4 h-4" />
                English
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="h-6 w-px bg-slate-200" />
              <button className="text-sm font-bold text-health-navy border-2 border-slate-200 px-5 py-2 rounded-lg hover:bg-slate-50 transition-all">
                Log In
              </button>
              <button
                onClick={onOpenChat}
                className="group relative p-[2px] rounded-full transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-health-blue to-health-purple rounded-full" />
                <div className="relative flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-health-navy font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-health-blue" />
                  Ask V-safe AI
                </div>
              </button>
              <Link
                to="/check-in"
                className="bg-health-blue text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all shadow-md shadow-blue-100"
              >
                Register Now
              </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 text-[13px] font-bold tracking-wide transition-all ${
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
              <button className="text-sm font-bold text-health-navy border-2 border-slate-200 py-3 rounded-lg hover:bg-slate-50 transition-all text-center">Log In</button>
              <Link to="/check-in" onClick={() => setIsOpen(false)} className="bg-health-blue text-white py-3 rounded-lg font-bold text-sm text-center shadow-md shadow-blue-50">Register Now</Link>
            </div>
            
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenChat();
              }}
              className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-health-purple to-health-blue text-white py-4 rounded-xl font-bold mb-6 shadow-lg"
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
