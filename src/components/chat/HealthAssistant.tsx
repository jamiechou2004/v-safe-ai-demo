import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, MessageSquare, ChevronRight, MoreVertical, ExternalLink, MapPinned } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { getHealthAssistantResponse } from '../../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface HealthAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface AssistantIntent {
  response: string;
  navigateTo?: string;
}

const VSAFE_INFO = `I am an AI assistant, not a doctor.

V-safe is a vaccine safety monitoring tool that lets people report how they feel after vaccination through short check-ins. It helps public health teams monitor vaccine safety and spot possible safety signals.

You can use this prototype to:
- Sign up or register a vaccine check-in
- Report symptoms after vaccination
- Find emergency guidance
- Review privacy and data safety information`;

const COLLEGE_VACCINE_INFO = `I am an AI assistant, not a doctor.

College vaccine requirements depend on your school and state, so the most accurate source is your university's student health or immunization requirements page. For general U.S. guidance, start here:

- [CDC vaccines by age](https://www.cdc.gov/vaccines/by-age/index.html)
- [CDC adult immunization schedule](https://www.cdc.gov/vaccines/imz-schedules/adult-easyread.html)

Common college requirements often include MMR, Tdap, meningococcal vaccines, hepatitis B, and varicella, but your university's own requirement page is the one to follow.`;

const ROUTE_RESPONSES: { path: string; label: string; keywords: string[]; response: string }[] = [
  {
    path: '/check-in',
    label: 'Sign up / Register',
    keywords: ['sign up', 'signup', 'register', 'registration', 'vaccine register', 'check in', 'check-in', 'report symptom', 'report how', '注册', '登记', '报名', '打卡', '报告症状'],
    response: `I am taking you to the V-safe sign up page now. You can register your vaccine information and complete your check-in there.`,
  },
  {
    path: '/emergency',
    label: 'Emergency guidance',
    keywords: ['emergency', 'urgent', '911', 'chest pain', 'difficulty breathing', 'severe', '紧急', '急救', '胸痛', '呼吸困难', '严重'],
    response: `I am taking you to emergency guidance now. If you have difficulty breathing, chest pain, face or throat swelling, or another severe symptom, call 911 or seek emergency care immediately.`,
  },
  {
    path: '/privacy',
    label: 'Privacy',
    keywords: ['privacy', 'security', 'data', 'personal information', '隐私', '安全', '数据'],
    response: `I am taking you to the privacy and data safety page now. It explains how this prototype describes collection, use, and protection of health information.`,
  },
  {
    path: '/',
    label: 'About V-safe',
    keywords: ['home', 'about', 'about us', 'v-safe info', 'what is v-safe', '首页', '关于'],
    response: `I am taking you to the V-safe overview page now. It explains what V-safe is and how vaccine safety check-ins work.`,
  },
];

function getAssistantIntent(message: string): AssistantIntent | null {
  const normalized = message.toLowerCase();

  if (
    normalized.includes('college') ||
    normalized.includes('university') ||
    normalized.includes('student vaccine') ||
    normalized.includes('school vaccine') ||
    normalized.includes('大学') ||
    normalized.includes('学生') ||
    normalized.includes('学校疫苗')
  ) {
    return { response: COLLEGE_VACCINE_INFO };
  }

  if (
    normalized.includes('what is v-safe') ||
    normalized.includes('what is vsafe') ||
    normalized.includes('general info') ||
    normalized.includes('tell me about v-safe') ||
    normalized.includes('v safe 是什么') ||
    normalized.includes('v-safe 是什么') ||
    normalized.includes('介绍')
  ) {
    return { response: VSAFE_INFO };
  }

  const route = ROUTE_RESPONSES.find(item => item.keywords.some(keyword => normalized.includes(keyword)));
  if (route) {
    return {
      response: route.response,
      navigateTo: route.path,
    };
  }

  return null;
}

export default function HealthAssistant({ isOpen, setIsOpen }: HealthAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    const messageContent = text || input;
    if (!messageContent.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const intent = getAssistantIntent(messageContent);
    if (intent) {
      if (intent.navigateTo) {
        navigate(intent.navigateTo);
      }

      const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: intent.response };
      setMessages(prev => [...prev, assistantMsg]);
      setIsLoading(false);
      return;
    }

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const response = await getHealthAssistantResponse(messageContent, history);
    
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button - Secondary Entry */}
      <div className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-health-blue text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
          aria-label="Ask v-safe ai demo assistant"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap ml-0 group-hover:ml-2">
            Ask V-safe AI
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-50 pointer-events-auto"
            />
            
            {/* Chat Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[480px] bg-white shadow-[0_0_50px_rgba(0,0,0,0.1)] z-50 flex flex-col pointer-events-auto"
            >
              {/* Header Utils */}
              <div className="flex justify-end p-4 gap-4 text-slate-400">
                <button className="hover:text-slate-600 transition-colors">
                  <MoreVertical className="w-6 h-6" />
                </button>
                <div className="flex border border-slate-300 rounded px-1 gap-0.5 items-center">
                  <div className="w-2 h-3 bg-slate-300 rounded-sm" />
                  <div className="w-3 h-3 bg-slate-900 rounded-sm" />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:text-slate-600 transition-colors"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto px-10 py-4">
                {messages.length === 0 ? (
                  <div className="space-y-8 pt-10">
                    <div className="space-y-1">
                      <p className="text-slate-400 font-bold text-[10px] tracking-[0.3em] uppercase opacity-70">V-SAFE AI DEMO</p>
                      <h2 className="text-4xl font-bold text-health-blue tracking-tight">Hello, Jamie</h2>
                      <p className="text-lg font-bold text-slate-400 leading-tight">What can I assist you with today?</p>
                    </div>

                    <div className="space-y-2">
                      <button 
                        onClick={() => handleSend("Take me to the sign up page")}
                        className="w-full flex justify-between items-center px-6 py-3.5 border border-slate-200 rounded-xl bg-white text-left font-bold text-health-navy hover:border-health-purple/30 hover:bg-slate-50 transition-all group shadow-sm"
                      >
                        Take me to sign up
                        <MapPinned className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleSend("Report how I'm feeling today")}
                        className="w-full flex justify-between items-center px-6 py-3.5 border border-slate-200 rounded-xl bg-white text-left font-bold text-health-navy hover:border-health-purple/30 hover:bg-slate-50 transition-all group shadow-sm"
                      >
                        Report how I'm feeling today
                        <ChevronRight className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleSend("What vaccines do college students need?")}
                        className="w-full flex justify-between items-center px-6 py-3.5 border border-slate-200 rounded-xl bg-white text-left font-bold text-health-navy hover:border-health-purple/30 hover:bg-slate-50 transition-all group shadow-sm"
                      >
                        College vaccine requirements
                        <ExternalLink className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleSend("What is V-safe?")}
                        className="w-full flex justify-between items-center px-6 py-3.5 border border-slate-200 rounded-xl bg-white text-left font-bold text-health-navy hover:border-health-purple/30 hover:bg-slate-50 transition-all group shadow-sm"
                      >
                        What is V-safe?
                        <ChevronRight className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 pt-4 pb-20">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[90%] p-5 rounded-[2rem] ${
                            msg.role === 'user'
                              ? 'bg-health-blue text-white rounded-tr-none shadow-md'
                              : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100'
                          }`}
                        >
                          <div className="markdown-body text-[16px] leading-relaxed">
                            <ReactMarkdown
                              components={{
                                a: ({ children, href }) => (
                                  <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2">
                                    {children}
                                  </a>
                                ),
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-50 border border-slate-100 p-5 rounded-[2rem] rounded-tl-none flex items-center gap-3">
                          <Loader2 className="w-5 h-5 text-health-blue animate-spin" />
                          <span className="text-sm text-slate-500 font-bold tracking-tight">V-safe AI is thinking...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-8 pb-8 pt-4">
                <div className="relative flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-health-blue/20 transition-all">
                    <textarea
                      rows={2}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type your message..."
                      className="w-full px-5 py-4 bg-transparent border-none text-base text-slate-700 placeholder:text-slate-400 outline-none resize-none block"
                    />
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="w-12 h-12 bg-gradient-to-tr from-health-blue to-health-purple text-white rounded-xl flex items-center justify-center hover:shadow-lg active:scale-95 disabled:opacity-30 transition-all shrink-0"
                  >
                    <Send className="w-5 h-5 -rotate-12" />
                  </button>
                </div>
                
                {messages.length > 0 && (
                  <p className="text-center text-[11px] text-slate-400 mt-8 font-bold uppercase tracking-[0.2em] opacity-50">
                    Secured by V-safe Privacy Guard
                  </p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
