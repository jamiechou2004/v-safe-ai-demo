import { Link } from 'react-router-dom';

export default function Notes() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white p-10 shadow-xl shadow-slate-300/20">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Notes for Participants</h1>
        <p className="text-slate-600 leading-relaxed mb-6">
          This page offers practical tips for using V-safe, understanding your reports, and keeping your vaccination experience well-documented.
        </p>
        <ul className="space-y-4 text-slate-600 leading-relaxed">
          <li>• Keep a record of your vaccination date, vaccine type, and lot number.</li>
          <li>• Answer follow-up surveys honestly so safety teams can learn from your experience.</li>
          <li>• Reach out to a medical professional if you experience serious symptoms or have safety concerns.</li>
        </ul>
        <div className="mt-8">
          <Link to="/privacy" className="inline-flex items-center gap-2 rounded-full bg-health-blue px-6 py-3 text-white font-bold shadow-lg shadow-health-blue/20 transition hover:bg-blue-600">
            Read Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
