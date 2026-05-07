import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-300/20">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">How It Works</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          V-safe is designed to keep follow-up simple and fast. Share how you feel after vaccination through a quick check-in, and get helpful guidance if you need it.
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Register</h2>
            <p className="text-slate-600 leading-relaxed">Enter your vaccination details once, then receive reminders for follow-up surveys and safety monitoring.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Report</h2>
            <p className="text-slate-600 leading-relaxed">Tell us how you feel after your vaccine dose. Your input helps monitor safety and identify potential concerns quickly.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">Respond</h2>
            <p className="text-slate-600 leading-relaxed">If you report symptoms, V-safe can offer next-step advice and point you to trusted resources.</p>
          </div>
        </div>
        <div className="mt-8">
          <Link to="/check-in" className="inline-flex items-center gap-2 rounded-full bg-health-purple px-6 py-3 text-white font-bold shadow-lg shadow-health-purple/20 transition hover:bg-purple-600">
            Start Safety Check-in
          </Link>
        </div>
      </div>
    </div>
  );
}
