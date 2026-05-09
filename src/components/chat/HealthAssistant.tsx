import { useState, useRef, useEffect } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { X, Send, Loader2, MessageSquare, ChevronRight, ExternalLink, MapPinned, ShieldCheck, Sparkles, Expand, PictureInPicture2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { getHealthAssistantResponse } from '../../services/geminiService';
import { findUniversityByQuery, formatUniversityVaccineGuidance, hasSchoolVaccineIntent } from '../../data/universities';

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

interface PanelRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

type ResizeHandle = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

function CollapseToBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="4.5" width="11" height="9" rx="2.6" stroke="currentColor" strokeWidth="1.9" />
      <path d="M7 8h4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M7 10.8h2.6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M10.8 16.2h3.8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="m13.2 14.2 2 2-2 2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="16.2" r="3.1" stroke="currentColor" strokeWidth="1.9" />
      <path d="M18 14.9v2.6M16.7 16.2h2.6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
    </svg>
  );
}

function ReopenAssistantIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="7.3" cy="16" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M7.3 14.6v2.8M5.9 16h2.8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      <path d="M10.8 16h3.7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="m13.2 13.9 2.1 2.1-2.1 2.1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="13.2" y="5" width="7.3" height="8.2" rx="2.4" stroke="currentColor" strokeWidth="1.9" />
      <path d="M15.7 8.2h2.3M15.7 10.6h1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const PANEL_MIN_WIDTH = 320;
const PANEL_MIN_HEIGHT = 360;
const PANEL_COLLAPSE_WIDTH = 340;
const PANEL_COLLAPSE_HEIGHT = 390;
const PANEL_DEFAULT_WIDTH = 448;
const PANEL_DEFAULT_HEIGHT = 640;
const PANEL_MAX_WIDTH = 720;
const PANEL_MAX_HEIGHT = 820;
const PANEL_ICON_SIZE = 72;
const PANEL_MARGIN = 16;
const PANEL_STORAGE_KEY = 'v-safe-ai-panel-rect';
const ICON_STORAGE_KEY = 'v-safe-ai-icon-position';
const MESSAGES_STORAGE_KEY = 'v-safe-ai-messages';

function getDefaultPanelRect(): PanelRect {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0, width: PANEL_DEFAULT_WIDTH, height: PANEL_DEFAULT_HEIGHT };
  }

  const width = Math.min(PANEL_DEFAULT_WIDTH, Math.max(PANEL_MIN_WIDTH, window.innerWidth - PANEL_MARGIN * 2));
  const height = Math.min(PANEL_DEFAULT_HEIGHT, Math.max(PANEL_MIN_HEIGHT, window.innerHeight - 144));
  return {
    x: Math.max(PANEL_MARGIN, window.innerWidth - width - 24),
    y: Math.max(88, Math.min(window.innerHeight - height - 24, 112)),
    width,
    height,
  };
}

function getStoredJson<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : null;
  } catch {
    return null;
  }
}

function getInitialPanelRect(): PanelRect {
  return constrainPanelRect(getStoredJson<PanelRect>(PANEL_STORAGE_KEY) || getDefaultPanelRect());
}

function constrainPanelRect(rect: PanelRect): PanelRect {
  if (typeof window === 'undefined') return rect;

  const maxWidth = Math.min(PANEL_MAX_WIDTH, Math.max(PANEL_MIN_WIDTH, window.innerWidth - PANEL_MARGIN * 2));
  const maxHeight = Math.min(PANEL_MAX_HEIGHT, Math.max(PANEL_MIN_HEIGHT, window.innerHeight - PANEL_MARGIN * 2));
  const width = Math.min(Math.max(rect.width, PANEL_MIN_WIDTH), maxWidth);
  const height = Math.min(Math.max(rect.height, PANEL_MIN_HEIGHT), maxHeight);
  const x = Math.min(Math.max(rect.x, PANEL_MARGIN), window.innerWidth - width - PANEL_MARGIN);
  const y = Math.min(Math.max(rect.y, PANEL_MARGIN), window.innerHeight - height - PANEL_MARGIN);

  return { x, y, width, height };
}

function constrainIconPosition(position: { x: number; y: number }) {
  if (typeof window === 'undefined') return position;

  return {
    x: Math.min(Math.max(position.x, PANEL_MARGIN), Math.max(PANEL_MARGIN, window.innerWidth - PANEL_ICON_SIZE - PANEL_MARGIN)),
    y: Math.min(Math.max(position.y, PANEL_MARGIN), Math.max(PANEL_MARGIN, window.innerHeight - PANEL_ICON_SIZE - PANEL_MARGIN)),
  };
}

function getCollapsedIconPosition(rect: PanelRect) {
  if (typeof window === 'undefined') {
    return { x: 24, y: 24 };
  }

  return constrainIconPosition({
    x: rect.x + rect.width - PANEL_ICON_SIZE,
    y: rect.y + rect.height - PANEL_ICON_SIZE,
  });
}

function getInitialIconPosition(rect: PanelRect) {
  return constrainIconPosition(getStoredJson<{ x: number; y: number }>(ICON_STORAGE_KEY) || getCollapsedIconPosition(rect));
}

function getInitialMessages() {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.sessionStorage.getItem(MESSAGES_STORAGE_KEY);
    return stored ? JSON.parse(stored) as Message[] : [];
  } catch {
    return [];
  }
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

Tell me the university name, and I will check this demo database for the school's official immunization page first. If the school is not in the demo database, I will say that clearly instead of guessing.

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

function getAssistantIntent(message: string, currentPath: string): AssistantIntent | null {
  const normalized = message.toLowerCase();
  const matchedSchool = findUniversityByQuery(message);

  if (matchedSchool) {
    return {
      response: formatUniversityVaccineGuidance(matchedSchool),
      suggestions: ['Ask another school', 'Ask about SCAD Atlanta'],
    };
  }

  if (hasSchoolVaccineIntent(message)) {
    return {
      response: `I can help with school vaccine requirements, but I did not find a specific university match in this demo database.

Please send the school name exactly as it appears, for example:
- UCLA
- MIT
- SCAD
- University of Michigan

I will look for that school's official immunization page first and avoid guessing if it is not in the demo data.`,
      suggestions: ['Ask about SCAD', 'Ask about UCLA'],
    };
  }

  if (
    normalized.includes('college') ||
    normalized.includes('university') ||
    normalized.includes('student vaccine') ||
    normalized.includes('school vaccine') ||
    normalized.includes('immunization requirement') ||
    normalized.includes('vaccine requirement') ||
    normalized.includes('campus vaccine') ||
    normalized.includes('大学') ||
    normalized.includes('学生') ||
    normalized.includes('学校疫苗')
  ) {
    return {
      response: COLLEGE_VACCINE_INFO,
      suggestions: ['Ask about UCLA requirements', 'Ask about MIT requirements'],
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

  if (
    currentPath === '/check-in' &&
    (
      normalized.includes('what information') ||
      normalized.includes('what do i need') ||
      normalized.includes('which field') ||
      normalized.includes('form help') ||
      normalized.includes('表格') ||
      normalized.includes('需要什么')
    )
  ) {
    return {
      response: `For **Sign up / Register**, start with the first section of the form.

You will need:
- Vaccine type
- Dose number
- Vaccination date
- Clinic, pharmacy, or city
- How you are feeling today

This is a demo, so do not enter real sensitive medical information. If you are unsure, use realistic sample values.`,
      suggestions: ['What is V-safe?', 'What vaccines do college students need?'],
    };
  }

  const route = ROUTE_RESPONSES.find(item => item.keywords.some(keyword => normalized.includes(keyword)));
  if (route) {
    if (route.path === currentPath) {
      return {
        response: route.path === '/check-in'
          ? `You are already on **Sign up / Register**.\n\nStart with the vaccine details at the top of the form. I can stay open while you complete it, and you can ask me if you are unsure which field to use.`
          : `You are already on **${route.label}**.\n\nI will stay here while you review this page.`,
        suggestions: route.path === '/check-in'
          ? ['What information do I need?', 'What is V-safe?']
          : ['What is V-safe?', 'Take me to sign up'],
      };
    }

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
  const [messages, setMessages] = useState<Message[]>(() => getInitialMessages());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCompact, setIsCompact] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [panelRect, setPanelRect] = useState<PanelRect>(() => getInitialPanelRect());
  const [iconPosition, setIconPosition] = useState(() => getInitialIconPosition(getInitialPanelRect()));
  const [interactionMode, setInteractionMode] = useState<'idle' | 'dragging' | 'resizing'>('idle');
  const [isDesktop, setIsDesktop] = useState(() => typeof window === 'undefined' ? true : window.innerWidth >= 768);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const savedScrollTopRef = useRef(0);
  const panelRectRef = useRef(panelRect);
  const iconPositionRef = useRef(iconPosition);
  const modeBeforeCollapseRef = useRef<'floating' | 'docked'>('floating');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    panelRectRef.current = panelRect;
  }, [panelRect]);

  useEffect(() => {
    iconPositionRef.current = iconPosition;
  }, [iconPosition]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PANEL_STORAGE_KEY, JSON.stringify(panelRect));
  }, [panelRect]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(ICON_STORAGE_KEY, JSON.stringify(iconPosition));
  }, [iconPosition]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const saveScrollPosition = () => {
    savedScrollTopRef.current = scrollContainerRef.current?.scrollTop ?? savedScrollTopRef.current;
  };

  const restoreScrollPosition = () => {
    window.setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = savedScrollTopRef.current;
      }
    }, 80);
  };

  const collapseToIcon = (rect: PanelRect = panelRectRef.current) => {
    saveScrollPosition();
    modeBeforeCollapseRef.current = isCompact ? 'floating' : 'docked';
    const stableRect = constrainPanelRect(rect);
    setPanelRect(stableRect);
    setIconPosition(getCollapsedIconPosition(stableRect));
    setIsCompact(true);
    setIsCollapsed(true);
  };

  const expandFromIcon = () => {
    setIsCompact(modeBeforeCollapseRef.current === 'floating');
    setIsCollapsed(false);
    setPanelRect(rect => constrainPanelRect(rect));
    restoreScrollPosition();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen || isCompact) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [isOpen, isCompact]);

  useEffect(() => {
    if (interactionMode === 'idle') return;

    const previousUserSelect = document.body.style.userSelect;
    const previousCursor = document.body.style.cursor;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = interactionMode === 'resizing' ? 'grabbing' : 'move';

    return () => {
      document.body.style.userSelect = previousUserSelect;
      document.body.style.cursor = previousCursor;
    };
  }, [interactionMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      setPanelRect(rect => constrainPanelRect(rect));
      setIconPosition(position => constrainIconPosition(position));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePanelDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isCompact || !isDesktop || isCollapsed || event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest('button, a, textarea, input, [data-resize-handle]')) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startY = event.clientY;
    const startRect = panelRectRef.current;
    setInteractionMode('dragging');

    const handleMove = (moveEvent: PointerEvent) => {
      setPanelRect(constrainPanelRect({
        ...startRect,
        x: startRect.x + moveEvent.clientX - startX,
        y: startRect.y + moveEvent.clientY - startY,
      }));
    };

    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      setInteractionMode('idle');
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  const handleResizeStart = (handle: ResizeHandle) => (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isCompact || isCollapsed || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    event.currentTarget.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startY = event.clientY;
    const startRect = panelRectRef.current;
    setInteractionMode('resizing');

    const handleMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      let nextRect = { ...startRect };

      if (handle.includes('e')) nextRect.width = startRect.width + dx;
      if (handle.includes('s')) nextRect.height = startRect.height + dy;
      if (handle.includes('w')) {
        nextRect.width = startRect.width - dx;
        nextRect.x = startRect.x + dx;
      }
      if (handle.includes('n')) {
        nextRect.height = startRect.height - dy;
        nextRect.y = startRect.y + dy;
      }

      if (nextRect.width < PANEL_COLLAPSE_WIDTH || nextRect.height < PANEL_COLLAPSE_HEIGHT) {
        collapseToIcon(startRect);
        window.removeEventListener('pointermove', handleMove);
        window.removeEventListener('pointerup', handleUp);
        setInteractionMode('idle');
        return;
      }

      setPanelRect(constrainPanelRect(nextRect));
    };

    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      setInteractionMode('idle');
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  const handleIconDragStart = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!isDesktop || event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    const startX = event.clientX;
    const startY = event.clientY;
    const startPosition = iconPositionRef.current;
    let moved = false;
    setInteractionMode('dragging');

    const handleMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;

      setIconPosition(constrainIconPosition({
        x: startPosition.x + dx,
        y: startPosition.y + dy,
      }));
    };

    const handleUp = () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      setInteractionMode('idle');
      if (!moved) expandFromIcon();
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  };

  const handleSend = async (text: string = input) => {
    const messageContent = text || input;
    if (!messageContent.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: messageContent };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const intent = getAssistantIntent(messageContent, location.pathname);
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
    const suggestions = msg.suggestions || ['Take me to sign up', 'What vaccines do college students need?'];
    return suggestions
      .filter(suggestion => !(location.pathname === '/check-in' && suggestion.toLowerCase().includes('sign up')))
      .slice(0, 2);
  };

  const isNarrowPanel = isCompact && isDesktop && panelRect.width < 390;
  const panelToggleLabel = isCompact ? 'Expand assistant workspace' : 'Return to floating assistant panel';
  const panelToggleTitle = isCompact ? 'Expand workspace' : 'Return to floating panel';

  const handleConfirmNavigation = (message: Message) => {
    if (!message.action) return;

    const openedLabel = message.action.label.replace('Open ', '');
    navigate(message.action.path);
    setMessages(prev => [
      ...prev.map(item => item.id === message.id ? { ...item, action: undefined } : item),
      {
        id: `${Date.now()}-nav`,
        role: 'assistant',
        content: message.action.path === '/check-in'
          ? `Done - I opened **${openedLabel}**.\n\nYou can begin with the vaccine type, dose, and vaccination date. I will stay here if you need help while filling it out.`
          : `Done - I opened **${openedLabel}**. I will stay here if you need anything else.`,
        suggestions: message.action.path === '/check-in'
          ? ['What information do I need?', 'What is V-safe?']
          : ['What is V-safe?', 'Take me to sign up'],
      },
    ]);
    window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
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
                className="fixed inset-0 z-50 bg-slate-950/20 backdrop-blur-[2px] pointer-events-auto"
              />
            )}
            
            {isCompact && isCollapsed ? (
              <motion.button
                type="button"
                onPointerDown={handleIconDragStart}
                onClick={() => {
                  if (!isDesktop) expandFromIcon();
                }}
                initial={{ opacity: 0, scale: 0.82, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.82, y: 10 }}
                transition={{ type: 'spring', damping: 24, stiffness: 320 }}
                style={isDesktop ? {
                  left: iconPosition.x,
                  top: iconPosition.y,
                  width: PANEL_ICON_SIZE,
                  height: PANEL_ICON_SIZE,
                } : undefined}
                className="fixed bottom-5 right-5 z-50 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/80 bg-white/95 text-health-blue shadow-[0_22px_60px_rgba(15,23,42,0.22)] ring-1 ring-sky-100/80 backdrop-blur-2xl transition-transform hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(52,147,214,0.25)] active:scale-95 md:bottom-auto md:right-auto"
                aria-label="Reopen Ask V-safe AI"
                title="Reopen assistant"
              >
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(52,147,214,0.18),transparent_44%),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(245,250,255,0.92))]" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-violet-500 shadow-sm ring-1 ring-violet-100">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                {messages.length > 0 && (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                )}
                <ReopenAssistantIcon className="relative h-9 w-9" />
              </motion.button>
            ) : (
              <motion.div
                initial={isCompact ? { opacity: 0, y: 24, scale: 0.96 } : { x: '100%' }}
                animate={isCompact ? { opacity: 1, y: 0, scale: 1 } : { x: 0 }}
                exit={isCompact ? { opacity: 0, y: 24, scale: 0.96 } : { x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                style={isCompact && isDesktop ? {
                  left: panelRect.x,
                  top: panelRect.y,
                  width: panelRect.width,
                  height: panelRect.height,
                  transition: interactionMode === 'idle' ? undefined : 'none',
                } : undefined}
                className={`fixed z-50 flex flex-col border-slate-200/80 bg-white shadow-2xl shadow-slate-950/15 pointer-events-auto overscroll-contain ${
                  isCompact
                    ? `inset-x-3 bottom-3 h-[calc(100vh-1.5rem)] max-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[1.5rem] border bg-white/95 shadow-[0_24px_70px_rgba(15,23,42,0.24)] backdrop-blur-2xl md:inset-auto md:h-auto md:rounded-[1.75rem]`
                    : 'top-0 right-0 bottom-0 w-full border-l md:w-[460px]'
                }`}
              >
              <div
                onPointerDown={handlePanelDragStart}
                className={`relative touch-none overflow-hidden border-b border-slate-200/80 bg-white/90 backdrop-blur-2xl ${isCompact ? 'cursor-grab px-4 py-3 active:cursor-grabbing' : 'px-5 py-5'}`}
              >
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
                      <h2 className={`${isCompact ? 'text-lg' : 'text-2xl'} truncate font-black tracking-tight text-slate-950`}>Ask V-safe AI</h2>
                      {!isNarrowPanel && (
                        <p className="mt-0.5 max-w-[280px] text-xs font-semibold leading-5 text-slate-500">Navigation, check-in support, and campus vaccine links</p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      onClick={() => {
                        collapseToIcon(isCompact ? panelRectRef.current : getDefaultPanelRect());
                      }}
                      className="rounded-full border border-transparent p-2 text-slate-400 transition-all hover:border-slate-200 hover:bg-white/80 hover:text-health-blue hover:shadow-sm"
                      aria-label="Collapse assistant to floating AI bubble"
                      title="Collapse to floating bubble"
                    >
                      <CollapseToBubbleIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setIsCollapsed(false);
                        setIsCompact(value => !value);
                      }}
                      className="rounded-full border border-transparent p-2 text-slate-400 transition-all hover:border-slate-200 hover:bg-white/80 hover:text-health-blue hover:shadow-sm"
                      aria-label={panelToggleLabel}
                      title={panelToggleTitle}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={isCompact ? 'expand-workspace' : 'return-floating'}
                          initial={{ opacity: 0, scale: 0.82, rotate: isCompact ? -8 : 8 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          exit={{ opacity: 0, scale: 0.82, rotate: isCompact ? 8 : -8 }}
                          transition={{ duration: 0.16, ease: 'easeOut' }}
                          className="block"
                        >
                          {isCompact ? (
                            <Expand className="h-5 w-5" strokeWidth={2.15} />
                          ) : (
                            <PictureInPicture2 className="h-5 w-5" strokeWidth={2.15} />
                          )}
                        </motion.span>
                      </AnimatePresence>
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
                <div className={`relative ${isCompact ? 'mt-3' : 'mt-5'} rounded-2xl border border-white/80 bg-white/70 p-1 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.12),0_10px_24px_rgba(15,23,42,0.05)] ${isNarrowPanel ? 'hidden' : ''}`}>
                  <div className="flex items-center gap-2.5 rounded-[0.85rem] bg-slate-50/80 px-3 py-2 text-xs font-semibold leading-5 text-slate-700">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-health-green ring-1 ring-emerald-100">
                      <ShieldCheck className="h-4 w-4" />
                    </span>
                    <span>Guides pages, explains V-safe, and finds campus vaccine links</span>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div
                ref={scrollContainerRef}
                onWheel={(event) => event.stopPropagation()}
                onTouchMove={(event) => event.stopPropagation()}
                className="relative flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,#f8fbff_0%,#f6f8fb_42%,#ffffff_100%)] px-3 py-4 sm:px-5 sm:py-5"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_50%_0%,rgba(52,147,214,0.10),transparent_65%)]" />
                {messages.length === 0 ? (
                  <div className="relative space-y-5">
                    <div className="overflow-hidden rounded-[1.2rem] border border-white/80 bg-white/85 p-4 shadow-[0_18px_46px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60 backdrop-blur-xl sm:rounded-[1.4rem] sm:p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
                            Ready to guide
                          </div>
                          <h3 className="text-2xl font-black tracking-tight text-slate-950">How can I help today?</h3>
                        </div>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_16px_32px_rgba(15,23,42,0.18)]">
                          <Sparkles className="h-5 w-5" />
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        Ask naturally. I can route you to the right page, explain V-safe in plain language, or find a university vaccine requirement link.
                      </p>
                      <div className={`mt-5 grid gap-2 text-center ${isNarrowPanel ? 'grid-cols-1' : 'grid-cols-3'}`}>
                        {['Navigation', 'V-safe info', 'Campus links'].map(item => (
                          <div key={item} className="rounded-xl border border-slate-200/70 bg-slate-50/70 px-2 py-2 text-[11px] font-black text-slate-500 sm:rounded-2xl">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <button 
                        onClick={() => handleSend(location.pathname === '/check-in' ? "What information do I need for this sign up form?" : "Take me to the sign up page")}
                        className="group flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-white/82 px-4 py-3.5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/60 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:ring-sky-200 hover:shadow-[0_18px_42px_rgba(52,147,214,0.14)]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-health-blue ring-1 ring-sky-100">
                          <MapPinned className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-black text-slate-950">{location.pathname === '/check-in' ? 'Help with this sign up' : 'Take me to sign up'}</span>
                          <span className="mt-0.5 block text-xs font-semibold text-slate-500">{location.pathname === '/check-in' ? 'Get field-by-field guidance.' : 'I will ask before opening the page.'}</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-health-blue" />
                      </button>
                      <button 
                        onClick={() => handleSend("What vaccines do college students need?")}
                        className="group flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-white/82 px-4 py-3.5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/60 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:ring-violet-200 hover:shadow-[0_18px_42px_rgba(113,70,195,0.12)]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-health-purple ring-1 ring-violet-100">
                          <ExternalLink className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-black text-slate-950">College vaccine requirements</span>
                          <span className="mt-0.5 block text-xs font-semibold text-slate-500">Ask generally or name a school.</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-health-purple" />
                      </button>
                      <button 
                        onClick={() => handleSend("What is V-safe?")}
                        className="group flex w-full items-center gap-3 rounded-2xl border border-white/80 bg-white/82 px-4 py-3.5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/60 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:ring-sky-200 hover:shadow-[0_18px_42px_rgba(52,147,214,0.14)]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-health-blue ring-1 ring-sky-100">
                          <MessageSquare className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-black text-slate-950">What is V-safe?</span>
                          <span className="mt-0.5 block text-xs font-semibold text-slate-500">Get a clear, human explanation.</span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-health-blue" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative space-y-4 pb-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="relative mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-health-blue shadow-sm ring-1 ring-slate-200">
                            <MessageSquare className="h-3.5 w-3.5" />
                          </div>
                        )}
                        <div
                          className={`max-w-[88%] overflow-hidden text-sm leading-6 ${
                            msg.role === 'user'
                              ? 'rounded-[1.35rem] rounded-br-md bg-[linear-gradient(135deg,#1f9be2,#3478d6)] px-4 py-3 text-white shadow-[0_14px_32px_rgba(52,147,214,0.22)]'
                              : 'rounded-[1.35rem] rounded-bl-md border border-white/80 bg-white/90 text-slate-800 shadow-[0_14px_34px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/60 backdrop-blur-xl'
                          }`}
                        >
                          <div className={`markdown-body leading-6 ${msg.role === 'assistant' ? 'px-4 py-3' : ''}`}>
                            <ReactMarkdown
                              components={{
                                h2: ({ children }) => (
                                  <h2 className="mb-3 text-xl font-black tracking-tight text-slate-950">
                                    {children}
                                  </h2>
                                ),
                                h3: ({ children }) => (
                                  <h3 className="mt-4 mb-2 rounded-xl border border-sky-100 bg-sky-50/70 px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] text-sky-800">
                                    {children}
                                  </h3>
                                ),
                                p: ({ children }) => (
                                  <p className="mb-3 last:mb-0">
                                    {children}
                                  </p>
                                ),
                                ul: ({ children }) => (
                                  <ul className="mb-3 space-y-1.5 pl-1 last:mb-0">
                                    {children}
                                  </ul>
                                ),
                                li: ({ children }) => (
                                  <li className="relative list-none pl-5 text-slate-700 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-health-blue/70">
                                    {children}
                                  </li>
                                ),
                                blockquote: ({ children }) => (
                                  <blockquote className="mb-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 text-sm font-semibold leading-6 text-emerald-900">
                                    {children}
                                  </blockquote>
                                ),
                                strong: ({ children }) => (
                                  <strong className="font-black text-slate-950">
                                    {children}
                                  </strong>
                                ),
                                a: ({ children, href }) => (
                                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center rounded-full border border-sky-100 bg-white px-2.5 py-1 text-xs font-black text-health-blue shadow-sm transition hover:border-sky-200 hover:bg-sky-50">
                                    {children}
                                  </a>
                                ),
                              }}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                          {msg.role === 'assistant' && msg.action && (
                            <div className="border-t border-slate-200/80 bg-slate-50/80 px-3 py-3">
                              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Permission required
                              </div>
                              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
                                <button
                                  onClick={() => handleConfirmNavigation(msg)}
                                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-xs font-black text-white shadow-[0_10px_22px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800"
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
                                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-black text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                                >
                                  Stay here
                                </button>
                              </div>
                            </div>
                          )}
                          {msg.role === 'assistant' && !msg.action && getDefaultSuggestions(msg).length > 0 && (
                            <div className="border-t border-slate-200/80 bg-slate-50/80 px-3 py-3">
                              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                You can ask next
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {getDefaultSuggestions(msg).map(suggestion => (
                                  <button
                                    key={suggestion}
                                    onClick={() => handleSend(suggestion)}
                                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-slate-900"
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
                        <div className="flex items-center gap-3 rounded-[1.35rem] rounded-bl-md border border-white/80 bg-white/90 px-4 py-3 shadow-[0_14px_34px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/60 backdrop-blur-xl">
                          <Loader2 className="w-4 h-4 text-health-blue animate-spin" />
                          <span className="text-sm text-slate-500 font-bold">Thinking through the next best step...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200/80 bg-white/90 px-3 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
                <div className="relative flex items-end gap-3">
                  <div className="flex-1 overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-slate-50/80 shadow-inner transition-all focus-within:border-sky-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-200/40">
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
                      className="block w-full resize-none border-none bg-transparent px-4 py-3 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] bg-slate-950 text-white shadow-[0_14px_30px_rgba(15,23,42,0.22)] transition-all hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
                    aria-label="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                  <span className="h-px w-8 bg-slate-200" />
                  Demo only - Not medical advice
                  <span className="h-px w-8 bg-slate-200" />
                </div>
              </div>
              {isCompact && isDesktop && !isCollapsed && (
                <>
                  <div data-resize-handle onPointerDown={handleResizeStart('n')} className="absolute inset-x-8 top-0 h-2 cursor-ns-resize touch-none" />
                  <div data-resize-handle onPointerDown={handleResizeStart('s')} className="absolute inset-x-8 bottom-0 h-2 cursor-ns-resize touch-none" />
                  <div data-resize-handle onPointerDown={handleResizeStart('e')} className="absolute inset-y-8 right-0 w-2 cursor-ew-resize touch-none" />
                  <div data-resize-handle onPointerDown={handleResizeStart('w')} className="absolute inset-y-8 left-0 w-2 cursor-ew-resize touch-none" />
                  <div data-resize-handle onPointerDown={handleResizeStart('nw')} className="absolute left-0 top-0 h-5 w-5 cursor-nwse-resize touch-none" />
                  <div data-resize-handle onPointerDown={handleResizeStart('ne')} className="absolute right-0 top-0 h-5 w-5 cursor-nesw-resize touch-none" />
                  <div data-resize-handle onPointerDown={handleResizeStart('sw')} className="absolute bottom-0 left-0 h-5 w-5 cursor-nesw-resize touch-none" />
                  <div data-resize-handle onPointerDown={handleResizeStart('se')} className="absolute bottom-0 right-0 h-5 w-5 cursor-nwse-resize touch-none" />
                </>
              )}
            </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
