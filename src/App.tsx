import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HealthAssistant from './components/chat/HealthAssistant';
import Home from './pages/Home';
import CheckIn from './pages/CheckIn';
import Emergency from './pages/Emergency';
import Privacy from './pages/Privacy';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header onOpenChat={() => setIsChatOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/check-in" element={<CheckIn />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        <Footer />
        <HealthAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
      </div>
    </Router>
  );
}
