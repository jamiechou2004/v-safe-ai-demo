import { Link } from 'react-router-dom';

export default function News() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-300/20">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">What&apos;s New</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          Stay informed about the latest V-safe features and improvements. This space is for updates on safety monitoring, participant support, and user experience enhancements.
        </p>
        <div className="space-y-6">
          <article className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Enhanced safety check-ins</h2>
            <p className="text-slate-600 leading-relaxed">
              We&apos;ve improved the check-in flow to make symptom reporting easier and more intuitive for participants.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Stronger privacy protections</h2>
            <p className="text-slate-600 leading-relaxed">
              V-safe continues to protect participant data and provide transparent information about how reports are used.
            </p>
          </article>
        </div>
        <div className="mt-8">
          <Link to="/check-in" className="inline-flex items-center gap-2 rounded-full bg-health-blue px-6 py-3 text-white font-bold shadow-lg shadow-health-blue/20 transition hover:bg-blue-600">
            Begin a Check-in
          </Link>
        </div>
      </div>
    </div>
  );
}
