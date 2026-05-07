import EmergencyBanner from '../components/emergency/EmergencyBanner';
import { Phone, ExternalLink, ShieldAlert, Clock, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Emergency() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 md:py-24 space-y-12">
      <section className="space-y-4 text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-health-navy">Health & Emergency Guidance</h1>
        <p className="text-lg text-slate-600">
          Knowing when to seek help is the most important part of vaccine safety. Use this guide to understand your symptoms.
        </p>
      </section>

      <EmergencyBanner />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 space-y-6"
        >
          <div className="flex items-center gap-3 text-health-blue">
            <Clock className="w-8 h-8" />
            <h2 className="text-2xl font-bold">What is "Normal"?</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Side effects can affect your ability to do daily activities, but they should go away in a few days. Common side effects include:
          </p>
          <ul className="space-y-4 text-slate-700 font-medium">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-health-blue mt-2" />
              Pain or swelling where the shot was given
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-health-green mt-2" />
              Mild fever or chills
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-health-purple mt-2" />
              Headache or muscle pain
            </li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-10 space-y-6"
        >
          <div className="flex items-center gap-3 text-health-purple">
            <ShieldAlert className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Medical Support</h2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Contact your healthcare provider if you have any side effects that bother you or do not go away. They can provide advice specific to your history.
          </p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex gap-4">
            <Phone className="w-6 h-6 text-health-purple shrink-0" />
            <div>
              <div className="font-bold text-slate-900">Your Doctor's Office</div>
              <p className="text-xs text-slate-500">Contact the clinic listed on your insurance card.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-health-blue/5 border border-health-blue/20 rounded-3xl p-8 text-center space-y-6">
        <h3 className="text-2xl font-display font-bold text-health-navy">More Information</h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          The CDC website provides the most up-to-date and comprehensive information on vaccine safety and clinical guidance.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="https://www.cdc.gov/vaccines/safety" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
            CDC Vaccine Safety <ExternalLink className="w-4 h-4" />
          </a>
          <a href="https://vsafe.cdc.gov" target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
            Official V-safe Site <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
