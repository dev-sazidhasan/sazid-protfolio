import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, ReactNode } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BlogPage from './pages/BlogPage';
import PortfolioPage from './pages/PortfolioPage';
import AIAssistant from './components/AIAssistant';
import { Bot, Download } from 'lucide-react';

function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function MainApp() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const location = useLocation();

  // Scroll to top or handle hash links on route change
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <PageTransition>
          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 items-end">
         <motion.a 
          href="/Sazid Hasan Resume.pdf" 
          download="Sazid_Hasan_Resume.pdf"
          whileHover={{ scale: 1.1, x: -5 }}
          className="bg-surface-variant text-on-surface-variant rounded-full p-4 shadow-xl border border-white/10 flex items-center gap-3 overflow-hidden group w-14 hover:w-44 transition-all duration-300 cursor-pointer"
        >
          <Download className="w-6 h-6 flex-shrink-0" />
          <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Download Resume</span>
        </motion.a>
        
        <motion.button 
          onClick={() => setIsAiOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary-container text-on-primary-container rounded-full p-4 shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 group"
        >
          <span className="font-medium hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity">AI Assistant</span>
          <Bot className="w-6 h-6" />
        </motion.button>
      </div>

      <AIAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
