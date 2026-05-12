import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type LanguageCode = 'en' | 'es' | 'zh';

interface LanguageOption {
  code: LanguageCode;
  label: string;
  shortLabel: string;
  htmlLang: string;
}

const STORAGE_KEY = 'v-safe-ai-language';

export const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', htmlLang: 'en' },
  { code: 'es', label: 'Español', shortLabel: 'ES', htmlLang: 'es' },
  { code: 'zh', label: '中文', shortLabel: '中文', htmlLang: 'zh' },
];

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    'disclaimer.studentProject': 'STUDENT PROJECT: This is a redesign prototype and NOT an official CDC or government website.',
    'nav.about': 'About V-safe',
    'nav.data': 'Data and Research',
    'nav.how': 'How It Works',
    'nav.notes': 'Notes for Participants',
    'nav.participants': 'Participants',
    'nav.news': "What's New",
    'nav.privacy': 'Data Security and Privacy',
    'auth.login': 'Log In',
    'auth.register': 'Register Now',
    'chat.ask': 'Ask V-safe AI',
    'language.label': 'Language',
    'home.badge': 'Guided vaccine safety check-ins',
    'home.heroTitle': 'Know what to do after vaccination.',
    'home.heroLead': 'V-safe helps people report how they feel through simple follow-up check-ins.',
    'home.heroBody1': 'This demo is organized around the real user journey: understand the system, complete the right action, and get clear support without hunting through pages.',
    'home.heroBody2': 'The AI assistant stays available throughout the experience to explain, route, and confirm before moving you somewhere new.',
    'home.start': 'Start check-in',
    'home.createAccount': 'Create demo account',
    'home.login': 'Log in',
    'home.minutes': '2 minutes',
    'home.checkins': '12 check-ins',
    'home.weeks': '6 weeks',
    'home.rhythm': 'A short rhythm that makes follow-up feel predictable.',
    'home.journeyOrient': 'Orient',
    'home.journeyAct': 'Act',
    'home.journeyFollow': 'Follow up',
    'home.journeyOrientBody': 'Understand what V-safe does and what information is needed.',
    'home.journeyActBody': 'Complete a short check-in or register a participant.',
    'home.journeyFollowBody': 'Review guidance, privacy, and campus requirement links.',
    'home.pathLabel': 'Choose a path',
    'home.pathTitle': 'What do you need right now?',
    'home.pathBody': 'Choose the starting point that matches your goal. You can change direction at any time.',
    'home.cardCheckinTitle': 'Start a check-in',
    'home.cardCheckinBody': 'Register vaccine details and report how you feel in a guided flow.',
    'home.cardAiTitle': 'Ask V-safe AI',
    'home.cardAiBody': 'Get help finding pages, understanding V-safe, or locating campus vaccine links.',
    'home.cardParticipantsTitle': 'Manage participants',
    'home.cardParticipantsBody': 'Enroll participants, track reminder status, and prepare outreach.',
    'home.continue': 'Continue',
    'home.aboutLabel': 'About Us',
    'home.aboutTitle': 'What V-safe does',
    'home.aboutBody1': 'V-safe is part of the U.S. vaccine safety system that monitors the safety of vaccines. This demo organizes the experience around registration, short check-ins, and clear support information.',
    'home.aboutBody2': 'The assistant in this prototype helps users move through the site, find general V-safe information, and locate student vaccine requirement resources.',
    'home.learnMore': 'Learn more',
    'footer.body': 'A research-based redesign focusing on the patient experience. V-safe is a safety monitoring system that allows you to share how you feel after your vaccination.',
    'footer.resources': 'Resources',
    'footer.home': 'Home',
    'footer.checkin': 'Safety Check-in',
    'footer.emergency': 'Emergency Info',
    'footer.privacy': 'Privacy Policy',
    'footer.official': 'Official Links',
    'footer.vaccineInfo': 'Vaccine Information',
    'footer.vaers': 'VAERS Reporting',
    'footer.demo': 'Built for demonstration purposes. Not an official government tool.',
    'assistant.subtitle': 'Navigation, check-in support, and campus vaccine links',
    'assistant.capability': 'Guides pages, explains V-safe, and finds campus vaccine links',
    'assistant.ready': 'Ready to guide',
    'assistant.emptyTitle': 'How can I help today?',
    'assistant.emptyBody': 'Ask naturally. I can route you to the right page, explain V-safe in plain language, or find a university vaccine requirement link.',
    'assistant.nav': 'Navigation',
    'assistant.info': 'V-safe info',
    'assistant.campus': 'Campus links',
    'assistant.signUp': 'Take me to sign up',
    'assistant.signUpHelp': 'I will ask before opening the page.',
    'assistant.formHelp': 'Help with this sign up',
    'assistant.formHelpBody': 'Get field-by-field guidance.',
    'assistant.college': 'College vaccine requirements',
    'assistant.collegeBody': 'Ask generally or name a school.',
    'assistant.whatIs': 'What is V-safe?',
    'assistant.whatIsBody': 'Get a clear, human explanation.',
    'assistant.placeholder': 'Type your message...',
    'assistant.disclaimer': 'Demo only - Not medical advice',
  },
  es: {
    'disclaimer.studentProject': 'PROYECTO ESTUDIANTIL: Este es un prototipo rediseñado y NO es un sitio oficial de CDC ni del gobierno.',
    'nav.about': 'Acerca de V-safe',
    'nav.data': 'Datos e investigación',
    'nav.how': 'Cómo funciona',
    'nav.notes': 'Notas para participantes',
    'nav.participants': 'Participantes',
    'nav.news': 'Novedades',
    'nav.privacy': 'Seguridad de datos y privacidad',
    'auth.login': 'Iniciar sesión',
    'auth.register': 'Registrarse',
    'chat.ask': 'Preguntar a V-safe AI',
    'language.label': 'Idioma',
    'home.badge': 'Seguimiento guiado de seguridad de vacunas',
    'home.heroTitle': 'Sepa qué hacer después de vacunarse.',
    'home.heroLead': 'V-safe ayuda a las personas a informar cómo se sienten mediante registros breves.',
    'home.heroBody1': 'Esta demo está organizada alrededor del recorrido real del usuario: entender el sistema, completar la acción correcta y recibir apoyo claro sin buscar entre muchas páginas.',
    'home.heroBody2': 'El asistente de IA permanece disponible para explicar, guiar y confirmar antes de llevarle a otra página.',
    'home.start': 'Iniciar registro',
    'home.createAccount': 'Crear cuenta demo',
    'home.login': 'Iniciar sesión',
    'home.minutes': '2 minutos',
    'home.checkins': '12 registros',
    'home.weeks': '6 semanas',
    'home.rhythm': 'Un ritmo breve que hace que el seguimiento sea predecible.',
    'home.journeyOrient': 'Orientarse',
    'home.journeyAct': 'Actuar',
    'home.journeyFollow': 'Seguimiento',
    'home.journeyOrientBody': 'Entienda qué hace V-safe y qué información se necesita.',
    'home.journeyActBody': 'Complete un registro breve o inscriba a un participante.',
    'home.journeyFollowBody': 'Revise orientación, privacidad y enlaces de requisitos universitarios.',
    'home.pathLabel': 'Elija una ruta',
    'home.pathTitle': '¿Qué necesita ahora?',
    'home.pathBody': 'Elija el punto de inicio que coincida con su objetivo. Puede cambiar de dirección en cualquier momento.',
    'home.cardCheckinTitle': 'Iniciar un registro',
    'home.cardCheckinBody': 'Registre los datos de la vacuna e informe cómo se siente con una guía paso a paso.',
    'home.cardAiTitle': 'Preguntar a V-safe AI',
    'home.cardAiBody': 'Obtenga ayuda para encontrar páginas, entender V-safe o ubicar enlaces universitarios de vacunas.',
    'home.cardParticipantsTitle': 'Gestionar participantes',
    'home.cardParticipantsBody': 'Inscriba participantes, revise recordatorios y prepare comunicaciones.',
    'home.continue': 'Continuar',
    'home.aboutLabel': 'Acerca de',
    'home.aboutTitle': 'Qué hace V-safe',
    'home.aboutBody1': 'V-safe forma parte del sistema de seguridad de vacunas de EE. UU. Esta demo organiza la experiencia alrededor del registro, los check-ins breves y la información de apoyo clara.',
    'home.aboutBody2': 'El asistente ayuda a los usuarios a navegar el sitio, encontrar información general sobre V-safe y localizar recursos universitarios de vacunación.',
    'home.learnMore': 'Más información',
    'footer.body': 'Un rediseño basado en investigación centrado en la experiencia del paciente. V-safe permite compartir cómo se siente después de vacunarse.',
    'footer.resources': 'Recursos',
    'footer.home': 'Inicio',
    'footer.checkin': 'Registro de seguridad',
    'footer.emergency': 'Información de emergencia',
    'footer.privacy': 'Política de privacidad',
    'footer.official': 'Enlaces oficiales',
    'footer.vaccineInfo': 'Información sobre vacunas',
    'footer.vaers': 'Reporte VAERS',
    'footer.demo': 'Creado solo para demostración. No es una herramienta oficial del gobierno.',
    'assistant.subtitle': 'Navegación, apoyo para check-in y enlaces universitarios de vacunas',
    'assistant.capability': 'Guía páginas, explica V-safe y encuentra enlaces universitarios de vacunas',
    'assistant.ready': 'Listo para guiar',
    'assistant.emptyTitle': '¿Cómo puedo ayudar hoy?',
    'assistant.emptyBody': 'Pregunte con naturalidad. Puedo llevarle a la página correcta, explicar V-safe o encontrar requisitos de vacunas universitarios.',
    'assistant.nav': 'Navegación',
    'assistant.info': 'Info de V-safe',
    'assistant.campus': 'Enlaces campus',
    'assistant.signUp': 'Llévame al registro',
    'assistant.signUpHelp': 'Preguntaré antes de abrir la página.',
    'assistant.formHelp': 'Ayuda con este registro',
    'assistant.formHelpBody': 'Guía campo por campo.',
    'assistant.college': 'Requisitos universitarios',
    'assistant.collegeBody': 'Pregunte en general o nombre una universidad.',
    'assistant.whatIs': '¿Qué es V-safe?',
    'assistant.whatIsBody': 'Obtenga una explicación clara y humana.',
    'assistant.placeholder': 'Escriba su mensaje...',
    'assistant.disclaimer': 'Solo demo - No es consejo médico',
  },
  zh: {
    'disclaimer.studentProject': '学生项目：这是重新设计的原型，并不是 CDC 或政府官方网站。',
    'nav.about': '关于 V-safe',
    'nav.data': '数据与研究',
    'nav.how': '如何使用',
    'nav.notes': '参与者须知',
    'nav.participants': '参与者',
    'nav.news': '最新消息',
    'nav.privacy': '数据安全与隐私',
    'auth.login': '登录',
    'auth.register': '立即注册',
    'chat.ask': '询问 V-safe AI',
    'language.label': '语言',
    'home.badge': '疫苗安全随访引导',
    'home.heroTitle': '接种疫苗后，知道下一步该做什么。',
    'home.heroLead': 'V-safe 通过简短随访问卷帮助用户报告接种后的感受。',
    'home.heroBody1': '这个 demo 按真实用户旅程组织：理解系统、完成正确操作，并在不反复找页面的情况下获得清晰支持。',
    'home.heroBody2': 'AI 助手会在整个体验中保持可用，用来解释、导航，并在跳转前先确认。',
    'home.start': '开始 check-in',
    'home.createAccount': '创建 demo 账户',
    'home.login': '登录',
    'home.minutes': '2 分钟',
    'home.checkins': '12 次 check-in',
    'home.weeks': '6 周',
    'home.rhythm': '简短、可预期的随访节奏。',
    'home.journeyOrient': '了解',
    'home.journeyAct': '行动',
    'home.journeyFollow': '跟进',
    'home.journeyOrientBody': '理解 V-safe 的作用以及需要准备的信息。',
    'home.journeyActBody': '完成简短 check-in 或登记参与者。',
    'home.journeyFollowBody': '查看指导、隐私信息和校园疫苗要求链接。',
    'home.pathLabel': '选择路径',
    'home.pathTitle': '你现在需要什么？',
    'home.pathBody': '选择最符合你目标的入口，之后也可以随时切换方向。',
    'home.cardCheckinTitle': '开始 check-in',
    'home.cardCheckinBody': '在引导流程中登记疫苗信息并报告你的感受。',
    'home.cardAiTitle': '询问 V-safe AI',
    'home.cardAiBody': '帮你找页面、理解 V-safe，或定位大学疫苗要求链接。',
    'home.cardParticipantsTitle': '管理参与者',
    'home.cardParticipantsBody': '登记参与者、追踪提醒状态并准备后续沟通。',
    'home.continue': '继续',
    'home.aboutLabel': '关于',
    'home.aboutTitle': 'V-safe 的作用',
    'home.aboutBody1': 'V-safe 是美国疫苗安全系统的一部分，用于监测疫苗安全。本 demo 围绕注册、简短 check-in 和清晰支持信息组织体验。',
    'home.aboutBody2': '这个原型中的助手可以帮助用户浏览网站、查找 V-safe 基础信息，并定位学生疫苗要求资源。',
    'home.learnMore': '了解更多',
    'footer.body': '基于研究的患者体验 redesign。V-safe 是一个疫苗安全监测系统，让用户分享接种后的感受。',
    'footer.resources': '资源',
    'footer.home': '首页',
    'footer.checkin': '安全 check-in',
    'footer.emergency': '紧急信息',
    'footer.privacy': '隐私政策',
    'footer.official': '官方链接',
    'footer.vaccineInfo': '疫苗信息',
    'footer.vaers': 'VAERS 报告',
    'footer.demo': '仅用于演示。不是官方政府工具。',
    'assistant.subtitle': '导航、check-in 支持与校园疫苗链接',
    'assistant.capability': '引导页面、解释 V-safe，并查找大学疫苗链接',
    'assistant.ready': '可以开始引导',
    'assistant.emptyTitle': '今天需要我帮什么？',
    'assistant.emptyBody': '你可以自然提问。我可以带你到正确页面、解释 V-safe，或查找大学疫苗要求链接。',
    'assistant.nav': '导航',
    'assistant.info': 'V-safe 信息',
    'assistant.campus': '校园链接',
    'assistant.signUp': '带我去注册',
    'assistant.signUpHelp': '打开页面前我会先确认。',
    'assistant.formHelp': '帮我填写注册',
    'assistant.formHelpBody': '逐项解释表格字段。',
    'assistant.college': '大学疫苗要求',
    'assistant.collegeBody': '可以泛问，也可以直接说学校名。',
    'assistant.whatIs': 'V-safe 是什么？',
    'assistant.whatIsBody': '获得清晰、自然的解释。',
    'assistant.placeholder': '输入你的问题...',
    'assistant.disclaimer': '仅 demo - 不是医疗建议',
  },
};

interface LanguageContextValue {
  language: LanguageCode;
  currentLanguage: LanguageOption;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  return saved && saved in translations ? saved : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => getInitialLanguage());

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  const currentLanguage = languageOptions.find(option => option.code === language) || languageOptions[0];

  useEffect(() => {
    document.documentElement.lang = currentLanguage.htmlLang;
  }, [currentLanguage.htmlLang]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    currentLanguage,
    setLanguage,
    t: (key) => translations[language][key] || translations.en[key],
  }), [currentLanguage, language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
}
