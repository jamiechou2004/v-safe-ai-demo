import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, MessageSquare, ChevronRight, ExternalLink, MapPinned, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { getHealthAssistantResponse } from '../../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
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
  navigateTo?: string;
  navigateLabel?: string;
}

const VSAFE_INFO = `I am an AI assistant, not a doctor.

V-safe is a vaccine safety monitoring tool that lets people report how they feel after vaccination through short check-ins. It helps public health teams monitor vaccine safety and spot possible safety signals.

You can use this prototype to:
- Sign up or register a vaccine check-in
- Report symptoms after vaccination
- Find emergency guidance
- Review privacy and data safety information`;

const universityVaccineLinks = [
  ['Harvard University', 'https://huhs.harvard.edu/patients-and-visitors/medical-records-and-immunizations/immunization-compliance/'],
  ['MIT', 'https://health.mit.edu/faqs/medical-report-immunizations'],
  ['UCLA', 'https://immunizationrequirement.ucla.edu/'],
  ['USC', 'https://sites.usc.edu/new-student-health-requirements/immunizations/'],
  ['UC Irvine', 'https://studenthealth.uci.edu/immunization-requirements/'],
  ['UC Santa Barbara', 'https://studenthealth.sa.ucsb.edu/immunizations/university-immunization-requirements'],
  ['Cornell University', 'https://health.cornell.edu/services/immunizations-allergy-shots/immunizations'],
  ['Columbia University', 'https://www.health.columbia.edu/immunization-compliance-office'],
  ['University of Washington', 'https://wellbeing.uw.edu/husky-health/immunity/general-requirements/'],
  ['University of Michigan', 'https://uhs.umich.edu/immunizations'],
  ['Purdue University', 'https://www.purdue.edu/push/services/students/immunization-requirements.php'],
  ['University of Oregon', 'https://health.uoregon.edu/immunization-requirements-students'],
  ['University of Tennessee Knoxville', 'https://studenthealth.utk.edu/university-immunization-requirements/'],
  ['RIT', 'https://www.rit.edu/studenthealth/immunizations'],
  ['Temple University', 'https://studenthealth.temple.edu/services/immunizations/immunization-requirements-incoming-students'],
  ['Illinois State University', 'https://healthservices.illinoisstate.edu/medical-services/immunization-requirements/'],
  ['Southern Illinois University', 'https://shc.siu.edu/immunizations/requiredvaccines/'],
  ['Clark University', 'https://www.clarku.edu/health-services/immunization-policy/'],
  ['Methodist University', 'https://www.methodist.edu/life-at-mu/health-wellness/health-services/student-immunizations/'],
  ['Valparaiso University', 'https://www.valpo.edu/student-life/student-health-center/valpo-international-students/immunization-requirements/'],
] as const;

const COLLEGE_VACCINE_INFO = `I am an AI assistant, not a doctor.

College vaccine requirements depend on your school and state, so the most accurate source is your university's student health or immunization requirements page. For general U.S. guidance, start here:

- [CDC vaccines by age](https://www.cdc.gov/vaccines/by-age/index.html)
- [CDC adult immunization schedule](https://www.cdc.gov/vaccines/imz-schedules/adult-easyread.html)

Common college requirements often include MMR, Tdap, meningococcal vaccines, hepatitis B, and varicella, but your university's own requirement page is the one to follow.

Here are 20 official university immunization requirement pages:

${universityVaccineLinks.map(([name, url], index) => `${index + 1}. [${name}](${url})`).join('\n')}`;

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
      response: `I can guide you to **${route.label}**. Would you like me to open that page now?`,
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/10 z-50 pointer-events-auto"
            />
            
            {/* Chat Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-full border-l border-slate-200 bg-white md:w-[430px] shadow-2xl shadow-slate-950/15 z-50 flex flex-col pointer-events-auto"
            >
              <div className="border-b border-slate-200 bg-white px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-health-blue bg-white text-health-blue shadow-sm">
                      <span className="absolute left-0 h-8 w-1 rounded-full bg-health-green" />
                      <MessageSquare className="h-5 w-5" />
                      <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-health-purple" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">V-safe AI demo</p>
                      <h2 className="text-xl font-black tracking-tight text-health-navy">Ask V-safe AI</h2>
                      <p className="mt-0.5 text-xs font-semibold text-slate-500">Navigation, check-in support, and campus vaccine links</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close assistant"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-health-blue/15 bg-health-blue/5 px-3 py-2 text-xs font-semibold text-health-navy">
                  <ShieldCheck className="h-4 w-4 text-health-green" />
                  Routes pages, explains V-safe, and surfaces university vaccine links
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
                        onClick={() => handleSend("Show me official university vaccine requirement links")}
                        className="group flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-health-navy shadow-sm transition hover:border-health-blue/40 hover:bg-blue-50/40"
                      >
                        <span>20 university vaccine links</span>
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
                          className={`max-w-[86%] px-4 py-3 text-sm leading-6 shadow-sm ${
                            msg.role === 'user'
                              ? 'rounded-2xl rounded-tr-md bg-health-blue text-white'
                              : 'rounded-2xl rounded-tl-md border border-slate-200 bg-white text-slate-800'
                          }`}
                        >
                          <div className="markdown-body leading-6">
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
                        {msg.role === 'assistant' && msg.action && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            <button
                              onClick={() => handleConfirmNavigation(msg)}
                              className="inline-flex items-center gap-2 rounded border border-health-blue bg-health-blue px-3 py-2 text-xs font-black text-white transition hover:bg-blue-600"
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
                              className="inline-flex items-center rounded border border-slate-300 bg-white px-3 py-2 text-xs font-black text-slate-600 transition hover:bg-slate-50"
                            >
                              Stay here
                            </button>
                          </div>
                        )}
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
