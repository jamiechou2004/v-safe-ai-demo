import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, MessageSquare, ChevronRight, ExternalLink, MapPinned, ShieldCheck, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { getHealthAssistantResponse } from '../../services/geminiService';
import { findUniversityByQuery } from '../../data/universities';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  action?: {
    label: string;
    path: string;
  };
}

interface HealthAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface AssistantIntent {
  response: string;
  suggestions?: string[];
  navigateTo?: string;
  navigateLabel?: string;
}

const VSAFE_INFO = `Of course. V-safe is meant to make the after-vaccination follow-up feel simple instead of confusing.

The basic idea is: after someone gets vaccinated, they can complete short check-ins about how they feel. Those check-ins help public health teams watch for vaccine safety patterns and understand what people are experiencing.

In this demo, I can help you with a few practical things:
- Get to the sign up or check-in page
- Understand what V-safe does in plain language
- Find privacy and data safety information
- Review emergency guidance if symptoms sound serious

Small note: I can help explain and guide you through the demo, but I cannot replace medical advice from a clinician.`;

const COLLEGE_VACCINE_INFO = `Yes, I can help with that. College vaccine requirements can feel hard to track because each school may set its own rules, forms, deadlines, and exemptions.

The best next step is to tell me the university name. If it is in this demo database, I will give you that school's official immunization page and summarize what kind of requirements to look for.

For general U.S. vaccine guidance, these CDC pages are useful starting points:

- [CDC vaccines by age](https://www.cdc.gov/vaccines/by-age/index.html)
- [CDC adult immunization schedule](https://www.cdc.gov/vaccines/imz-schedules/adult-easyread.html)

Common college requirements often include MMR, Tdap, meningococcal vaccines, hepatitis B, and varicella. Your university's own student health page is still the source of truth.`;

const ROUTE_RESPONSES: { path: string; label: string; keywords: string[] }[] = [
  {
    path: '/check-in',
    label: 'Sign up / Register',
    keywords: ['sign up', 'signup', 'register', 'registration', 'vaccine register', 'check in', 'check-in', 'report symptom', 'report how', '注册', '登记', '报名', '打卡', '报告症状'],
  },
  {
    path: '/emergency',
    label: 'Emergency guidance',
    keywords: ['emergency', 'urgent', '911', 'chest pain', 'difficulty breathing', 'severe', '紧急', '急救', '胸痛', '呼吸困难', '严重'],
  },
  {
    path: '/privacy',
    label: 'Privacy',
    keywords: ['privacy', 'security', 'data', 'personal information', '隐私', '安全', '数据'],
  },
  {
    path: '/data',
    label: 'Data and research',
    keywords: ['data', 'research', 'statistics', 'study', 'studies', '数据', '研究', '统计'],
  },
  {
    path: '/how-it-works',
    label: 'How it works',
    keywords: ['how it works', 'how does it work', 'steps', 'process', '流程', '怎么用', '如何使用'],
  },
  {
    path: '/notes',
    label: 'Participant notes',
    keywords: ['notes', 'participant', 'tips', 'reminder', 'participant notes', '注意事项', '参与者', '提示'],
  },
  {
    path: '/participants',
    label: 'Participants roster',
    keywords: ['participants', 'participant roster', 'enroll participant', 'roster', 'csv', 'database sync', '参与者名单', '参与者管理'],
  },
  {
    path: '/news',
    label: "What's new",
    keywords: ['news', "what's new", 'updates', 'latest', 'new features', '新闻', '更新', '最新'],
  },
  {
    path: '/',
    label: 'About V-safe',
    keywords: ['home', 'about', 'about us', 'v-safe info', 'what is v-safe', '首页', '关于'],
  },
];

function getAssistantIntent(message: string): AssistantIntent | null {
  const normalized = message.toLowerCase();
  const matchedSchool = findUniversityByQuery(message);

  if (matchedSchool) {
    return {
      response: `I found a school-specific resource for you.

For **${matchedSchool.name}**, this is the official page to start with for student immunization or vaccine requirements:

[${matchedSchool.name} immunization requirements](${matchedSchool.immunizationUrl})

What to look for on that page:
${matchedSchool.commonRequirementTags.map(tag => `- ${tag}`).join('\n')}

${matchedSchool.notes}

Because requirements can change by program, residency status, and term, treat the university page as the source of truth. If you want, tell me another school name and I can check that one too.`,
      suggestions: ['Ask about another university', 'What vaccines do college students need?', 'Take me to sign up'],
    };
  }

  if (
    normalized.includes('college') ||
    normalized.includes('university') ||
    normalized.includes('student vaccine') ||
    normalized.includes('school vaccine') ||
    normalized.includes('大学') ||
    normalized.includes('学生') ||
    normalized.includes('学校疫苗')
  ) {
    return {
      response: COLLEGE_VACCINE_INFO,
      suggestions: ['Ask about UCLA requirements', 'Ask about MIT requirements', 'Ask about Harvard requirements'],
    };
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
    return {
      response: VSAFE_INFO,
      suggestions: ['How does V-safe work?', 'Show privacy information', 'Take me to sign up'],
    };
  }

  const route = ROUTE_RESPONSES.find(item => item.keywords.some(keyword => normalized.includes(keyword)));
  if (route) {
    return {
      response: `I found the page that matches what you asked for: **${route.label}**.\n\nI can take you there, but I will wait for your confirmation first so the page does not change unexpectedly.`,
      suggestions: ['Stay here', 'What is V-safe?', 'Show privacy information'],
      navigateTo: route.path,
      navigateLabel: route.label,
    };
  }

  return null;
}

export default function HealthAssistant({ isOpen, setIsOpen }: HealthAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
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
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: intent.response,
        suggestions: intent.suggestions,
        action: intent.navigateTo
          ? {
              label: intent.navigateLabel ? `Open ${intent.navigateLabel}` : 'Open page',
              path: intent.navigateTo,
            }
          : undefined,
      };
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

  const getDefaultSuggestions = (msg: Message) => {
    if (msg.role !== 'assistant' || msg.action) return [];
    return msg.suggestions || ['Take me to sign up', 'What vaccines do college students need?', 'Show participants page'];
  };

  const handleConfirmNavigation = (message: Message) => {
    if (!message.action) return;

    navigate(message.action.path);
    setMessages(prev => [
      ...prev,
      {
        id: `${Date.now()}-nav`,
        role: 'assistant',
        content: `Done - I opened **${message.action.label.replace('Open ', '')}**. I will stay here if you need anything else.`,
      },
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {!isCompact && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-950/10 z-50 pointer-events-auto"
              />
            )}
            
            {/* Chat Panel */}
            <motion.div
              initial={isCompact ? { opacity: 0, y: 24, scale: 0.96 } : { x: '100%' }}
              animate={isCompact ? { opacity: 1, y: 0, scale: 1 } : { x: 0 }}
              exit={isCompact ? { opacity: 0, y: 24, scale: 0.96 } : { x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className={`fixed right-0 z-50 flex flex-col border-slate-200/80 bg-white shadow-2xl shadow-slate-950/15 pointer-events-auto ${
                isCompact
                  ? 'bottom-4 mx-4 h-[620px] max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-[430px] overflow-hidden rounded-[1.75rem] border bg-white/95 shadow-[0_24px_70px_rgba(15,23,42,0.24)] backdrop-blur-2xl md:right-5 md:bottom-5 md:mx-0'
                  : 'top-0 bottom-0 w-full border-l md:w-[430px]'
              }`}
            >
              <div className={`relative overflow-hidden border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl ${isCompact ? 'px-4 py-3' : 'px-5 py-5'}`}>
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(52,147,214,0.14),transparent_34%),radial-gradient(circle_at_90%_18%,rgba(113,70,195,0.10),transparent_30%),linear-gradient(180deg,rgba(248,250,252,0.98),rgba(255,255,255,0.82))]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`relative isolate flex shrink-0 items-center justify-center rounded-[1.25rem] border border-white/80 bg-white text-health-blue shadow-[inset_0_0_0_1px_rgba(52,147,214,0.16),0_14px_34px_rgba(52,147,214,0.18)] ${isCompact ? 'h-11 w-11' : 'h-14 w-14'}`}>
                      <span className="absolute inset-0 -z-10 rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(52,147,214,0.14),rgba(255,255,255,0.7)_45%,rgba(113,70,195,0.12))]" />
                      <span className={`absolute left-1.5 rounded-full bg-gradient-to-b from-health-green to-sky-400 shadow-sm ${isCompact ? 'h-6 w-1' : 'h-8 w-1.5'}`} />
                      <MessageSquare className={isCompact ? 'h-5 w-5' : 'h-6 w-6'} strokeWidth={2.1} />
                      <Sparkles className="absolute -right-1.5 -top-1.5 h-4 w-4 text-violet-500 drop-shadow-sm" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">V-safe AI demo</p>
                      <h2 className={`${isCompact ? 'text-lg' : 'text-2xl'} font-black tracking-tight text-slate-950`}>Ask V-safe AI</h2>
                      <p className="mt-0.5 max-w-[280px] text-xs font-semibold leading-5 text-slate-500">Navigation, check-in support, and campus vaccine links</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => setIsCompact(value => !value)}
                      className="rounded-full border border-transparent p-2 text-slate-400 transition-all hover:border-slate-200 hover:bg-white/80 hover:text-health-blue hover:shadow-sm"
                      aria-label={isCompact ? 'Expand assistant' : 'Use compact assistant window'}
                      title={isCompact ? 'Expand assistant' : 'Small window mode'}
                    >
                      {isCompact ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
                    </button>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="rounded-full border border-transparent p-2 text-slate-400 transition-all hover:border-slate-200 hover:bg-white/80 hover:text-slate-700 hover:shadow-sm"
                      aria-label="Close assistant"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className={`relative ${isCompact ? 'mt-3' : 'mt-5'} rounded-2xl border border-white/80 bg-white/70 p-1 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.12),0_10px_24px_rgba(15,23,42,0.05)]`}>
                  <div className="flex items-center gap-2.5 rounded-[0.85rem] bg-slate-50/80 px-3 py-2 text-xs font-semibold leading-5 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-health-green ring-1 ring-emerald-100">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <span>Guides pages, explains V-safe, and finds campus vaccine links</span>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto bg-slate-50/70 px-5 py-5">
                {messages.length === 0 ? (
                  <div className="space-y-5">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-health-green/10 text-health-green">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <h3 className="text-2xl font-black tracking-tight text-health-navy">Hello, Jamie</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        I can help you navigate the demo, explain V-safe, or find vaccine requirement resources for students.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <button 
                        onClick={() => handleSend("Take me to the sign up page")}
                        className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-health-navy shadow-sm transition hover:border-health-blue/40 hover:bg-blue-50/40"
                      >
                        <span>Take me to sign up</span>
                        <MapPinned className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleSend("Report how I'm feeling today")}
                        className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-health-navy shadow-sm transition hover:border-health-blue/40 hover:bg-blue-50/40"
                      >
                        <span>Report how I'm feeling today</span>
                        <ChevronRight className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleSend("What vaccines do college students need?")}
                        className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-health-navy shadow-sm transition hover:border-health-blue/40 hover:bg-blue-50/40"
                      >
                        <span>College vaccine requirements</span>
                        <ExternalLink className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleSend("Can you find UCLA vaccine requirements?")}
                        className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-health-navy shadow-sm transition hover:border-health-blue/40 hover:bg-blue-50/40"
                      >
                        <span>Ask about a specific university</span>
                        <ExternalLink className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button 
                        onClick={() => handleSend("What is V-safe?")}
                        className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-health-navy shadow-sm transition hover:border-health-blue/40 hover:bg-blue-50/40"
                      >
                        <span>What is V-safe?</span>
                        <ChevronRight className="w-4 h-4 text-health-purple group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[86%] overflow-hidden text-sm leading-6 shadow-sm ${
                            msg.role === 'user'
                              ? 'rounded-2xl rounded-tr-md bg-health-blue px-4 py-3 text-white'
                              : 'rounded-2xl rounded-tl-md border border-slate-200 bg-white text-slate-800'
                          }`}
                        >
                          <div className={`markdown-body leading-6 ${msg.role === 'assistant' ? 'px-4 py-3' : ''}`}>
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
                          {msg.role === 'assistant' && msg.action && (
                            <div className="border-t border-slate-200 bg-slate-50 px-3 py-3">
                              <div className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                                Permission required
                              </div>
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
                                <button
                                  onClick={() => handleConfirmNavigation(msg)}
                                  className="inline-flex items-center justify-center gap-2 rounded bg-health-blue px-3 py-2.5 text-xs font-black text-white transition hover:bg-blue-600"
                                >
                                  {msg.action.label}
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() =>
                                    setMessages(prev => [
                                      ...prev,
                                      {
                                        id: `${Date.now()}-stay`,
                                        role: 'assistant',
                                        content: 'No problem. I will stay on this page and keep helping here.',
                                      },
                                    ])
                                  }
                                  className="inline-flex items-center justify-center rounded border border-slate-300 bg-white px-3 py-2.5 text-xs font-black text-slate-600 transition hover:bg-slate-50"
                                >
                                  Stay here
                                </button>
                              </div>
                            </div>
                          )}
                          {msg.role === 'assistant' && !msg.action && getDefaultSuggestions(msg).length > 0 && (
                            <div className="border-t border-slate-200 bg-slate-50 px-3 py-3">
                              <div className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
                                You can ask next
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {getDefaultSuggestions(msg).map(suggestion => (
                                  <button
                                    key={suggestion}
                                    onClick={() => handleSend(suggestion)}
                                    className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-black text-slate-600 transition hover:border-health-blue/40 hover:bg-blue-50"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-center gap-3 rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                          <Loader2 className="w-4 h-4 text-health-blue animate-spin" />
                          <span className="text-sm text-slate-500 font-bold">V-safe AI is thinking...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 bg-white px-5 py-4">
                <div className="relative flex items-end gap-3">
                  <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-health-blue focus-within:ring-4 focus-within:ring-health-blue/10">
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
                      className="block w-full resize-none border-none bg-transparent px-4 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-health-blue text-white transition-all hover:bg-blue-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="mt-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  Demo only - Not medical advice
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
