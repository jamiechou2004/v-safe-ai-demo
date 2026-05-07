import { motion } from 'motion/react';
import { ShieldCheck, HeartPulse, Activity, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-left space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-health-green/10 text-health-green rounded-full font-semibold text-xs tracking-wider uppercase">
                <CheckCircle2 className="w-4 h-4" />
                Trusted Safety Monitoring
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-health-navy">
                How are you <span className="bg-gradient-to-r from-health-green to-health-blue bg-clip-text text-transparent">feeling</span> after your shot?
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                V-safe is a fast and easy way to check in after your vaccination. Report symptoms, track your health, and help build a safer future for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/check-in" className="btn-primary flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Register with V-safe
                </Link>
                <Link to="/emergency" className="btn-secondary flex items-center justify-center gap-2">
                  Emergency Support
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/user${i}/40/40`} className="w-8 h-8 rounded-full border-2 border-white" aria-hidden="true" referrerPolicy="no-referrer" />
                  ))}
                </div>
                <span>Join millions participating in public health safety.</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-health-blue/10 blur-3xl rounded-full" />
              <div className="relative glass-card border-slate-200 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/healthcare/800/600" 
                  alt="Healthy people smiling" 
                  className="rounded-xl md:rounded-[1.5rem] w-full object-cover aspect-video shadow-inner"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                  <div className="flex items-center gap-4">
                    <div className="bg-health-green p-3 rounded-xl text-white">
                      <Activity className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Health Status</div>
                      <div className="text-xs text-health-green font-semibold">Monitoring Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={itemVariants} className="glass-card p-10 hover:border-health-purple/50 transition-all group">
            <div className="bg-health-purple/10 p-4 rounded-2xl w-fit mb-6 text-health-purple group-hover:bg-health-purple group-hover:text-white transition-all">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Secure Privacy</h3>
            <p className="text-slate-600 leading-relaxed">
              Your health information is protected by industry-standard encryption. We prioritize your data safety above all else.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-10 hover:border-health-blue/50 transition-all group">
            <div className="bg-health-blue/10 p-4 rounded-2xl w-fit mb-6 text-health-blue group-hover:bg-health-blue group-hover:text-white transition-all">
              <HeartPulse className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Daily Check-ins</h3>
            <p className="text-slate-600 leading-relaxed">
              Share how you feel after vaccination with simple surveys. Your feedback helps ensure vaccines remain safe for everyone.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-10 hover:border-health-green/50 transition-all group">
            <div className="bg-health-green/10 p-4 rounded-2xl w-fit mb-6 text-health-green group-hover:bg-health-green group-hover:text-white transition-all">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Instant Guidance</h3>
            <p className="text-slate-600 leading-relaxed">
              Our intelligent Health Assistant is available to answer common questions and provide public health resources instantly.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Emergency Section Info */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 text-white rounded-[2rem] p-10 md:p-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Safety awareness is our priority</h2>
            <p className="text-slate-300 text-lg">
              Understanding vaccine side effects is key to your Peace of mind. We provide the tools to monitor your health and access immediate support when needed.
            </p>
            <Link to="/emergency" className="btn-secondary">
              Emergency Guidance
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-health-green font-bold text-lg mb-2">Common</div>
              <p className="text-sm text-slate-400">Sore arm, mild fatigue, low-grade headache.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="text-health-purple font-bold text-lg mb-2">Monitor</div>
              <p className="text-sm text-slate-400">Report changes through our daily check-ins.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 col-span-2">
              <div className="text-red-400 font-bold text-lg mb-2">Urgent</div>
              <p className="text-sm text-slate-400">Difficulty breathing or sudden chest pain requires immediate care.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
