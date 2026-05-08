import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck2, CheckCircle2, ClipboardList, LockKeyhole, MessageSquareText, ShieldCheck, Sparkles, UsersRound } from 'lucide-react';

interface HomeProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenAssistant: () => void;
}

export default function Home({ onOpenAuth, onOpenAssistant }: HomeProps) {
  const primaryActions = [
    {
      title: 'Start a check-in',
      body: 'Register vaccine details and report how you feel in a guided flow.',
      to: '/check-in',
      icon: ClipboardList,
      tone: 'blue',
    },
    {
      title: 'Ask V-safe AI',
      body: 'Get help finding pages, understanding V-safe, or locating campus vaccine links.',
      to: null,
      icon: Sparkles,
      tone: 'slate',
    },
    {
      title: 'Manage participants',
      body: 'Enroll participants, track reminder status, and prepare outreach.',
      to: '/participants',
      icon: UsersRound,
      tone: 'green',
    },
  ];

  const journey = [
    { label: 'Orient', body: 'Understand what V-safe does and what information is needed.' },
    { label: 'Act', body: 'Complete a short check-in or register a participant.' },
    { label: 'Follow up', body: 'Review guidance, privacy, and campus requirement links.' },
  ];

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#eef4f9_44%,#f8fafc_100%)] pb-14">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 shadow-[0_24px_80px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70 backdrop-blur-xl">
          <div className="grid gap-10 px-6 py-10 md:grid-cols-[1.08fr_0.92fr] md:px-10 lg:px-12">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-health-blue">
              <span className="h-1.5 w-1.5 rounded-full bg-health-green" />
              Guided vaccine safety check-ins
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Know what to do after vaccination.
            </h1>
            <p className="mt-6 text-2xl font-black leading-snug text-slate-900">
              V-safe helps people report how they feel through simple follow-up check-ins.
            </p>
            <div className="mt-8 space-y-5 text-lg leading-8 text-slate-600">
              <p>
                This demo is organized around the real user journey: understand the system, complete the right action, and get clear support without hunting through pages.
              </p>
              <p>
                The AI assistant stays available throughout the experience to explain, route, and confirm before moving you somewhere new.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/check-in" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-base font-black text-white shadow-[0_18px_40px_rgba(15,23,42,0.20)] transition hover:-translate-y-0.5 hover:bg-slate-800">
                Start check-in
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button onClick={() => onOpenAuth('register')} className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-black text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50">
                Create demo account
              </button>
              <button onClick={() => onOpenAuth('login')} className="inline-flex items-center justify-center rounded-2xl px-4 py-4 text-base font-black text-slate-500 transition hover:text-slate-950">
                Log in
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-[1.75rem] border border-white/80 bg-[#f0ecfa] p-6 shadow-[0_20px_60px_rgba(113,70,195,0.14)] ring-1 ring-slate-200/70">
              <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                <div className="space-y-4">
                  {[
                    '2 minutes',
                    '12 check-ins',
                    '6 weeks',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-2xl font-black text-slate-950">
                      <CheckCircle2 className="h-8 w-8 text-health-green" />
                      {item}
                    </div>
                  ))}
                  <p className="pt-2 text-lg font-black leading-7 text-slate-900">
                    A short rhythm that makes follow-up feel predictable.
                  </p>
                </div>
                <div className="hidden items-end justify-center sm:flex">
                  <div className="flex h-36 w-24 items-center justify-center rounded-t-[4rem] bg-white/70 text-health-blue shadow-inner">
                    <MessageSquareText className="h-14 w-14" />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <div className="text-4xl font-black text-slate-950">V-safe</div>
                <div className="flex -space-x-2">
                  <div className="h-5 w-10 skew-x-[-28deg] bg-health-green" />
                  <div className="h-5 w-10 skew-x-[-28deg] bg-health-blue" />
                  <div className="h-5 w-10 skew-x-[-28deg] bg-health-purple" />
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="border-t border-slate-200/70 bg-slate-50/70 px-6 py-5 md:px-10 lg:px-12">
            <div className="grid gap-3 md:grid-cols-3">
              {journey.map((item, index) => (
                <div key={item.label} className="flex gap-3 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-slate-200/60">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-black text-slate-950">{item.label}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-500">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-health-blue">Choose a path</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">What do you need right now?</h2>
          </div>
          <p className="hidden max-w-md text-sm font-semibold leading-6 text-slate-500 md:block">
            Choose the starting point that matches your goal. You can change direction at any time.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {primaryActions.map(item => {
            const Icon = item.icon;
            const content = (
              <>
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                  item.tone === 'blue' ? 'bg-sky-50 text-health-blue' : item.tone === 'green' ? 'bg-emerald-50 text-health-green' : 'bg-slate-950 text-white'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 min-h-[72px] text-base leading-7 text-slate-600">{item.body}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-health-blue">
                  Continue
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </>
            );

            if (item.to) {
              return (
                <Link key={item.title} to={item.to} className="group rounded-[1.5rem] border border-white/80 bg-white/88 p-6 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
                  {content}
                </Link>
              );
            }

            return (
              <button key={item.title} type="button" onClick={onOpenAssistant} className="group rounded-[1.5rem] border border-white/80 bg-white/88 p-6 text-left shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
                {content}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 rounded-[1.75rem] border border-white/80 bg-white/88 px-6 py-12 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70 lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
          <div className="border-l-4 border-health-blue pl-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">About Us</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">What V-safe does</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-700">
            <p>
              V-safe is part of the U.S. vaccine safety system that monitors the safety of vaccines. This demo organizes the experience around registration, short check-ins, and clear support information.
            </p>
            <p>
              The assistant in this prototype helps users move through the site, find general V-safe information, and locate student vaccine requirement resources.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ClipboardList,
              title: 'How it works',
              body: 'Register your vaccine information, complete short health check-ins, and review guidance when you need it.',
              to: '/how-it-works',
            },
            {
              icon: ShieldCheck,
              title: 'Safety monitoring',
              body: 'Reported symptoms help safety teams understand trends and support public health monitoring.',
              to: '/data',
            },
            {
              icon: LockKeyhole,
              title: 'Data privacy',
              body: 'The demo explains what information may be collected and how privacy expectations are communicated.',
              to: '/privacy',
            },
          ].map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.title} to={item.to} className="group rounded-[1.5rem] border border-white/80 bg-white/88 p-7 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/70 transition hover:-translate-y-0.5 hover:border-health-blue/40 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]">
                <Icon className="h-9 w-9 text-health-blue" />
                <h3 className="mt-5 text-2xl font-black text-slate-950">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{item.body}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-health-blue">
                  Learn more
                  <CalendarCheck2 className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
