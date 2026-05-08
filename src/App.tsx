import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HealthAssistant from './components/chat/HealthAssistant';
import DemoAuthModal from './components/common/DemoAuthModal';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import Emergency from './pages/Emergency';
import Privacy from './pages/Privacy';
import Data from './pages/Data';
import HowItWorks from './pages/HowItWorks';
import Notes from './pages/Notes';
import News from './pages/News';
import Participants from './pages/Participants';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header
          isChatOpen={isChatOpen}
          onToggleChat={() => setIsChatOpen(open => !open)}
          onOpenAuth={setAuthMode}
        />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenAuth={setAuthMode} onOpenAssistant={() => setIsChatOpen(true)} />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/data" element={<Data />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/news" element={<News />} />
            <Route path="/participants" element={<Participants />} />
          </Routes>
        </main>
        <Footer />
        <HealthAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
        <DemoAuthModal mode={authMode} onClose={() => setAuthMode(null)} />
      </div>
    </Router>
  );
}
