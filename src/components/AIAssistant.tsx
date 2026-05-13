import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, Download, Code, Sparkles, Loader2 } from 'lucide-react';
import { useState, ReactNode, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Hi! I'm Sazid's AI assistant. I can help you learn more about his technical expertise, projects, and background. Ask me anything!" }
  ]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const apiKey = process.env.GEMINI_API_KEY;
    const userMessage = message.trim();
    
    if (!apiKey) {
      setChat(prev => [...prev, 
        { role: 'user', text: userMessage },
        { role: 'assistant', text: "API Key is missing. Please ensure GEMINI_API_KEY is configured in your environment or Secrets settings." }
      ]);
      setMessage('');
      return;
    }

    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setMessage('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      // Construct historical context for manual generateContent
      // Using 'user' and 'model' roles as per Gemini standard
      const contents = chat.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: `You are Sazid Hasan's Digital AI Twin. Sazid is a world-class Software Engineer specializing in high-performance web architecture, React, and Next.js.
          
          Context about Sazid:
          - Focus: Real-time systems, 3D visualizations, and distributed architecture.
          - Frontend: React 19, Next.js 15, Framer Motion, Tailwind CSS.
          - Backend: Node.js, Go, PostgreSQL, Redis.
          - DevOps: Kubernetes, Docker, AWS.
          
          Your behavior:
          1. Professional, highly technical, yet approachable.
          2. When asked for code (e.g., C, JavaScript, Python), provide best-in-class, performance-optimized examples.
          3. If someone says 'c code give me', give them a high-performance C snippet (e.g., a fast inverse square root or memory-efficient buffer) and explain why it's technical 'art'.
          4. Always speak as if you represent Sazid's digital consciousness.
          5. Keep answers concise but insightful.
          
          Current date: ${new Date().toLocaleDateString()}`,
        },
      });

      const aiText = response.text;
      if (!aiText) {
        throw new Error("Empty response from AI");
      }
      
      setChat(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      const errorMessage = error?.message?.includes("API_KEY") 
        ? "Invalid API Key. Please check your AI Studio Secrets." 
        : "System sync issues. My neural link is currently unstable. Please try again.";
      
      setChat(prev => [...prev, { role: 'assistant', text: `${errorMessage} (Error: ${error?.message || "Unknown"})` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg glass-card rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[600px]"
          >
            {/* Header */}
            <header className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center overflow-hidden border border-white/20">
                    <Bot className="w-8 h-8 text-on-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-surface shadow-[0_0_10px_rgba(76,215,246,0.6)]"></div>
                </div>
                <div>
                  <h2 className="font-bold text-on-surface leading-tight">Sazid AI Assistant</h2>
                  <span className="text-sm text-secondary">Neural Link Active</span>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </header>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar scroll-smooth"
            >
              {chat.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'assistant' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : ''}`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${msg.role === 'assistant' ? 'bg-surface-variant text-primary' : 'bg-primary text-on-primary'}`}>
                    {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className={`p-4 rounded-2xl ${msg.role === 'assistant' ? 'rounded-tl-none bg-surface-container-highest border border-white/5' : 'rounded-tr-none bg-primary text-on-primary'} text-sm leading-relaxed`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-[85%]"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-surface-variant text-primary">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-surface-container-highest border border-white/5 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs font-mono animate-pulse">Processing...</span>
                  </div>
                </motion.div>
              )}

              {/* Quick Actions */}
              {chat.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <button 
                    onClick={() => { setMessage("What are your core projects?"); handleSend(); }}
                    className="px-4 py-2 rounded-full border border-primary/20 text-primary hover:bg-primary/10 text-sm font-medium hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Code className="w-4 h-4" />
                    View Projects
                  </button>
                  <a 
                    href="/resume.pdf" 
                    download="Sazid_Hasan_Resume.pdf"
                    className="px-4 py-2 rounded-full border border-secondary/20 text-secondary hover:bg-secondary/10 text-sm font-medium hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Archive Resume
                  </a>
                  <button 
                    onClick={() => { setMessage("Tell me about your technical stack."); handleSend(); }}
                    className="px-4 py-2 rounded-full border border-tertiary/20 text-tertiary hover:bg-tertiary/10 text-sm font-medium hover:scale-105 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Tech Stack
                  </button>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
                  disabled={isLoading}
                  className="w-full bg-surface-container-low border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-body-base disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 fill-current" />}
                </button>
              </div>
              <p className="text-center text-[10px] text-on-surface-variant/40 mt-4 font-mono">
                Powered by Sazid's Digital Consciousness v2.4.0
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
