import { ShieldCheck, Lock, Eye, FileText, Database } from 'lucide-react';
import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-16 pb-24">
      <section className="space-y-4 text-center">
        <div className="w-16 h-16 bg-health-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8 text-health-blue" />
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-bold text-health-navy font-display">Privacy & Safety</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          We take your data privacy seriously. Learn how we protect your health information and how it's used to keep everyone safe.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Lock className="w-6 h-6 text-health-green" />
              Data Protection
            </h2>
            <p className="text-slate-600 leading-relaxed">
              All information submitted through v-safe is encrypted during transmission and when stored. We use industry-standard security protocols equivalent to those used by major healthcare providers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Eye className="w-6 h-6 text-health-green" />
              Who has access?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Your personal information is only accessible to authorized public health officials. We never sell your data or share it with insurance companies or law enforcement.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-8 text-white space-y-6">
          <h3 className="text-xl font-bold">Key Facts</h3>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <FileText className="w-5 h-5 text-health-green shrink-0" />
              <span>Compliant with federal health information privacy standards.</span>
            </li>
            <li className="flex gap-3">
              <Database className="w-5 h-5 text-health-green shrink-0" />
              <span>Data is used strictly for vaccine safety monitoring and scientific research.</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-health-green shrink-0" />
              <span>You can opt-out of notifications at any time.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="prose prose-slate max-w-none bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200">
        <h2 className="text-2xl font-bold mb-6">Full Privacy Statement (Prototype Summary)</h2>
        <div className="space-y-6 text-slate-600 text-sm md:text-base">
          <p>
            This website is a redesign prototype. No real personal data is being permanently stored in any government database through this specific interface. However, in a production system:
          </p>
          <ul className="list-disc pl-5 space-y-4">
            <li>
              <strong>Information Collected:</strong> The system collects vaccine type, dose date, location, and symptoms reported. We also collect basic contact info to send follow-up check-ins.
            </li>
            <li>
              <strong>Purpose:</strong> The primary purpose is to identify potential safety concerns early. If you report a significant health event, a CDC representative may contact you for more information.
            </li>
            <li>
              <strong>Third Parties:</strong> Your data is shared with the Vaccine Adverse Event Reporting System (VAERS) only if a serious adverse event is reported.
            </li>
            <li>
              <strong>Cookies:</strong> We use essential cookies only to maintain your session while you complete the check-in form.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
