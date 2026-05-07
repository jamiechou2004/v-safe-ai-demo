import { Link } from 'react-router-dom';

export default function Data() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-300/20">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Data and Research</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          Discover how V-safe collects and uses participant information to monitor safety and improve vaccination programs.
          This page provides research summaries, data privacy principles, and how the program supports public health.
        </p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">What we track</h2>
            <p className="text-slate-600 leading-relaxed">
              We collect your symptom reports after vaccination to help identify trends, support safety monitoring, and communicate with health authorities.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-3">How it helps</h2>
            <p className="text-slate-600 leading-relaxed">
              Data helps experts spot safety signals faster, improve vaccine guidance, and make the experience more responsive for participants.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link to="/privacy" className="inline-flex items-center gap-2 rounded-full bg-health-blue px-6 py-3 text-white font-bold shadow-lg shadow-health-blue/20 transition hover:bg-blue-600">
            View Privacy Details
          </Link>
        </div>
      </div>
    </div>
  );
}
