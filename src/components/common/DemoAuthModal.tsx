import { useState } from 'react';
import { CheckCircle2, Mail, Phone, UserRound, X } from 'lucide-react';

type AuthMode = 'login' | 'register';

interface DemoAuthModalProps {
  mode: AuthMode | null;
  onClose: () => void;
}

export default function DemoAuthModal({ mode, onClose }: DemoAuthModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!mode) return null;

  const isRegister = mode === 'register';

  const submit = () => {
    if (!email.trim() && !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/35 px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-health-blue">V-safe demo account</p>
            <h2 className="mt-1 text-2xl font-black text-health-navy">
              {isRegister ? 'Create demo account' : 'Log in to demo'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-health-green/10 text-health-green">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-health-navy">Demo confirmation sent</h3>
            <p className="mt-3 leading-7 text-slate-600">
              In a production version, V-safe would send a secure sign-in or registration message to the contact information you provided.
            </p>
            <button onClick={onClose} className="mt-7 w-full rounded bg-health-blue px-5 py-3 font-black text-white transition hover:bg-blue-600">
              Continue
            </button>
          </div>
        ) : (
          <div className="space-y-5 px-6 py-6">
            {isRegister && (
              <label className="block">
                <span className="text-sm font-black text-health-navy">Name</span>
                <div className="mt-2 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-3 focus-within:border-health-blue focus-within:ring-4 focus-within:ring-health-blue/10">
                  <UserRound className="h-5 w-5 text-slate-400" />
                  <input value={name} onChange={event => setName(event.target.value)} className="w-full outline-none" placeholder="Jamie Zhou" />
                </div>
              </label>
            )}

            <label className="block">
              <span className="text-sm font-black text-health-navy">Email</span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-3 focus-within:border-health-blue focus-within:ring-4 focus-within:ring-health-blue/10">
                <Mail className="h-5 w-5 text-slate-400" />
                <input value={email} onChange={event => setEmail(event.target.value)} type="email" className="w-full outline-none" placeholder="name@school.edu" />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-black text-health-navy">Phone</span>
              <div className="mt-2 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 py-3 focus-within:border-health-blue focus-within:ring-4 focus-within:ring-health-blue/10">
                <Phone className="h-5 w-5 text-slate-400" />
                <input value={phone} onChange={event => setPhone(event.target.value)} className="w-full outline-none" placeholder="+15551234567" />
              </div>
            </label>

            <button
              onClick={submit}
              disabled={!email.trim() && !phone.trim()}
              className="w-full rounded bg-health-blue px-5 py-3 font-black text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isRegister ? 'Send demo registration' : 'Send demo login link'}
            </button>

            <p className="text-center text-xs font-semibold leading-5 text-slate-500">
              Demo only. No real email or SMS is sent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
