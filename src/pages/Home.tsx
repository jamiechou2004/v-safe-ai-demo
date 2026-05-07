import { Link } from 'react-router-dom';
import { CalendarCheck2, CheckCircle2, ClipboardList, LockKeyhole, MessageSquareText, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-100 pb-14">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 bg-white px-6 py-10 shadow-sm md:grid-cols-[1.15fr_0.85fr] md:px-10 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Sign up for V-safe!
            </h1>
            <p className="mt-7 text-2xl font-black leading-snug text-slate-900">
              CDC wants to know how you feel after vaccination.
            </p>
            <div className="mt-10 space-y-8 text-xl leading-9 text-slate-700">
              <p>
                Vaccine safety is a top priority for the Centers for Disease Control and Prevention (CDC).
              </p>
              <p>
                V-safe is a vaccine safety monitoring system that lets you tell CDC how you feel after a vaccination by completing short check-ins.
              </p>
            </div>

            <div className="mt-10">
              <p className="text-xl font-black text-slate-950">Do you have a V-safe account?</p>
              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <button className="rounded border-2 border-health-blue bg-white px-5 py-3 text-lg font-black text-health-blue shadow-sm transition hover:bg-blue-50">
                  Yes, let me log in
                </button>
                <Link to="/check-in" className="rounded bg-health-blue px-6 py-3 text-center text-lg font-bold text-white shadow-md transition hover:bg-blue-600">
                  No, let me register
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md border border-slate-200 bg-[#eee7f6] p-6 shadow-sm">
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
                    To help CDC monitor vaccine safety.
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
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 bg-white px-6 py-12 shadow-sm lg:grid-cols-[0.85fr_1.15fr] lg:px-12">
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
              <Link key={item.title} to={item.to} className="group border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-health-blue/40 hover:shadow-md">
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
