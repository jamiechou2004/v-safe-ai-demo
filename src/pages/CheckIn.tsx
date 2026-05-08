import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Activity, 
  MapPin, 
  Syringe, 
  CheckCircle2, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

type Step = 'vaccine' | 'location' | 'symptoms' | 'severity' | 'confirmation';

export default function CheckIn() {
  const [step, setStep] = useState<Step>('vaccine');
  const [formData, setFormData] = useState({
    vaccineType: '',
    dose: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    symptoms: [] as string[],
    severity: 'mild',
    notes: ''
  });

  const steps: { key: Step; label: string; icon: any }[] = [
    { key: 'vaccine', label: 'Vaccine', icon: Syringe },
    { key: 'location', label: 'Location', icon: MapPin },
    { key: 'symptoms', label: 'Symptoms', icon: Activity },
    { key: 'severity', label: 'Details', icon: AlertCircle },
  ];

  const toggleSymptom = (s: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: s === 'None'
        ? prev.symptoms.includes('None') ? [] : ['None']
        : prev.symptoms.includes(s)
          ? prev.symptoms.filter(item => item !== s)
          : [...prev.symptoms.filter(item => item !== 'None'), s]
    }));
  };

  const currentStepIndex = steps.findIndex(s => s.key === step);
  const stepMeta: Record<Exclude<Step, 'confirmation'>, { eyebrow: string; title: string; helper: string; next: string }> = {
    vaccine: {
      eyebrow: 'Start with the basics',
      title: 'Tell us about your vaccination',
      helper: 'Use the information from your vaccine card. Required fields are kept to the minimum needed for this demo.',
      next: 'Continue to location',
    },
    location: {
      eyebrow: 'Add context',
      title: 'Where was the shot given?',
      helper: 'A clinic, pharmacy, or city is enough for this prototype. This helps the flow feel realistic without asking for too much.',
      next: 'Continue to symptoms',
    },
    symptoms: {
      eyebrow: 'Check how you feel',
      title: 'How are you feeling?',
      helper: 'Choose "None" if you feel fine. Selecting a symptom will automatically clear "None."',
      next: 'Continue to details',
    },
    severity: {
      eyebrow: 'Final detail',
      title: 'Just a few more details',
      helper: 'This last step helps make the report easier to interpret before submission.',
      next: 'Submit report',
    },
  };
  const currentMeta = step !== 'confirmation' ? stepMeta[step] : null;
  const canContinue =
    step === 'vaccine' ? Boolean(formData.vaccineType && formData.dose && formData.date) :
    step === 'location' ? Boolean(formData.location.trim()) :
    step === 'symptoms' ? formData.symptoms.length > 0 :
    step === 'severity' ? Boolean(formData.severity) :
    true;

  const goBack = () => {
    if (step === 'location') setStep('vaccine');
    if (step === 'symptoms') setStep('location');
    if (step === 'severity') setStep('symptoms');
  };

  const goNext = () => {
    if (!canContinue) return;
    if (step === 'vaccine') setStep('location');
    if (step === 'location') setStep('symptoms');
    if (step === 'symptoms') setStep('severity');
    if (step === 'severity') setStep('confirmation');
  };

  const renderVaccineStep = () => (
    <div className="space-y-6">
      <div className="mb-8 space-y-2 border-b border-slate-200 pb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">{currentMeta?.eyebrow}</p>
        <h2 className="text-3xl font-black text-health-navy">{currentMeta?.title}</h2>
        <p className="text-slate-600">{currentMeta?.helper}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Vaccine Type</label>
          <select 
            value={formData.vaccineType}
            onChange={(e) => setFormData({...formData, vaccineType: e.target.value})}
            className="w-full rounded border border-slate-300 bg-white p-4 outline-none transition-all focus:border-health-blue focus:ring-4 focus:ring-health-blue/10"
          >
            <option value="">Select a vaccine...</option>
            <option value="covid_pfizer">COVID-19 (Pfizer-BioNTech)</option>
            <option value="covid_moderna">COVID-19 (Moderna)</option>
            <option value="covid_novavax">COVID-19 (Novavax)</option>
            <option value="flu">Seasonal Flu Shot</option>
            <option value="rsv">RSV Vaccine</option>
            <option value="mpox">Mpox Vaccine</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Dose Number</label>
          <div className="grid grid-cols-3 gap-2">
            {['1st', '2nd', 'Booster'].map(d => (
              <button
                key={d}
                onClick={() => setFormData({...formData, dose: d})}
                className={`py-3 rounded-lg text-sm font-bold transition-all border ${
                  formData.dose === d 
                    ? 'bg-health-blue text-white border-health-blue shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-health-blue" /> Date Administered
          </label>
          <input 
            type="date" 
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );

  const renderLocationStep = () => (
    <div className="space-y-6">
      <div className="mb-8 space-y-2 border-b border-slate-200 pb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">{currentMeta?.eyebrow}</p>
        <h2 className="text-3xl font-black text-slate-900">{currentMeta?.title}</h2>
        <p className="text-slate-600">{currentMeta?.helper}</p>
      </div>
      
      <div className="space-y-4">
        <label className="text-sm font-bold text-slate-700">Clinic, Pharmacy, or City</label>
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="e.g. Health Center, CVS, New York"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="input-field pl-14"
          />
        </div>
        <div className="p-5 bg-health-blue/5 rounded-xl border border-health-blue/10 flex gap-3">
          <ShieldCheck className="w-5 h-5 text-health-blue shrink-0" />
          <p className="text-sm text-health-blue/80 font-medium">
            Location data helps public health researchers identify and monitor local health trends effectively.
          </p>
        </div>
      </div>
    </div>
  );

  const renderSymptomsStep = () => (
    <div className="space-y-6">
      <div className="mb-8 space-y-2 border-b border-slate-200 pb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">{currentMeta?.eyebrow}</p>
        <h2 className="text-3xl font-black text-health-navy">{currentMeta?.title}</h2>
        <p className="text-slate-600">{currentMeta?.helper}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          'None', 'Sore arm at injection site', 'Redness or swelling', 'Fever', 
          'Chills', 'Headache', 'Muscle or body aches', 'Fatigue / Tiredness', 
          'Nausea', 'Vomiting / Diarrhea', 'Joint pain', 'Itching'
        ].map(s => (
          <button
            key={s}
            onClick={() => toggleSymptom(s)}
            className={`flex items-center gap-3 rounded border p-4 text-left transition-all ${
              formData.symptoms.includes(s)
                ? 'bg-health-purple/5 border-health-purple text-health-purple font-bold'
                : 'bg-white border-slate-200 text-slate-600 hover:border-health-purple/30'
            }`}
          >
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
              formData.symptoms.includes(s) ? 'bg-health-purple border-health-purple' : 'border-slate-300'
            }`}>
              {formData.symptoms.includes(s) && <CheckCircle2 className="w-4 h-4 text-white" />}
            </div>
            {s}
          </button>
        ))}
      </div>
    </div>
  );

  const renderSeverityStep = () => (
    <div className="space-y-6">
      <div className="mb-8 space-y-2 border-b border-slate-200 pb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">{currentMeta?.eyebrow}</p>
        <h2 className="text-3xl font-black text-health-navy">{currentMeta?.title}</h2>
        <p className="text-slate-600">{currentMeta?.helper}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700">Overall Severity</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'mild', label: 'Mild', desc: 'Manageable' },
              { key: 'moderate', label: 'Moderate', desc: 'Some impact' },
              { key: 'severe', label: 'Severe', desc: 'Could not work' }
            ].map(v => (
              <button
                key={v.key}
                onClick={() => setFormData({...formData, severity: v.key})}
                className={`flex flex-col items-center gap-1 rounded border p-4 transition-all ${
                  formData.severity === v.key
                    ? 'bg-health-purple text-white border-health-purple shadow-md'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span className="font-bold">{v.label}</span>
                <span className="text-[10px] opacity-70 uppercase tracking-wider">{v.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Additional Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Tell us more about how you feel..."
            rows={4}
            className="w-full resize-none rounded border border-slate-300 bg-white p-4 outline-none focus:border-health-blue focus:ring-4 focus:ring-health-blue/10"
          />
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center space-y-8"
    >
      <div className="w-24 h-24 bg-health-green/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-14 h-14 text-health-green" />
      </div>
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-slate-900">Check-in Complete</h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto">Your health report has been securely transmitted for safety monitoring.</p>
      </div>
      
      <div className="glass-card p-8 text-left max-w-md mx-auto space-y-6">
        <h3 className="font-bold text-lg flex items-center gap-2 border-b border-slate-100 pb-4">
          <ShieldCheck className="w-5 h-5 text-health-blue" />
          Submission Summary
        </h3>
        <div className="text-sm space-y-4 text-slate-600">
          <div className="flex justify-between">
            <span className="font-medium">Vaccine Type</span>
            <span className="font-bold text-slate-900">{formData.vaccineType.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Symptoms</span>
            <span className="font-bold text-slate-900">{formData.symptoms.length > 0 ? `${formData.symptoms.length} items` : 'None reported'}</span>
          </div>
          <div className="flex justify-between items-center bg-health-green/5 p-3 rounded-lg border border-health-green/20">
            <span className="font-medium text-health-green">Status</span>
            <span className="text-health-green font-black uppercase text-xs tracking-widest">Securely Sent</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-md mx-auto pt-8">
        <Link to="/" className="btn-primary py-4">Return Home</Link>
        <button onClick={() => setStep('vaccine')} className="btn-secondary py-4">Submit another report</button>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-[linear-gradient(180deg,#f8fbff_0%,#eef4f9_48%,#f8fafc_100%)] px-4 py-10 md:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 px-6 py-8 shadow-[0_18px_56px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 md:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Guided flow
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-950">V-safe check-in</h1>
              <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
                A short, structured report that keeps you oriented at each step. This prototype does not submit real health data.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-200/70">
              {['~2 min', '4 steps', 'Demo only'].map(item => (
                <div key={item} className="rounded-xl bg-white px-3 py-2 text-center text-xs font-black text-slate-600 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      {step !== 'confirmation' && (
        <div className="mb-8 rounded-[1.5rem] border border-white/80 bg-white/88 px-6 py-6 shadow-[0_12px_36px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/70 md:px-10">
          {/* Progress Indicator */}
          <div className="relative flex items-center justify-between">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-health-green -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isActive = s.key === step;
              const isPast = idx < currentStepIndex;

              return (
                <div key={s.key} className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-health-green text-white scale-110 shadow-lg shadow-health-green/30' : 
                    isPast ? 'bg-health-navy text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isPast ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold mt-2 hidden sm:block ${
                    isActive ? 'text-health-green' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid gap-3 border-t border-slate-200/70 pt-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Current step</p>
              <p className="mt-1 text-lg font-black text-slate-950">{currentMeta?.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-500">{currentMeta?.helper}</p>
            </div>
            <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-bold leading-6 text-health-blue ring-1 ring-sky-100">
              Next: {currentMeta?.next}
            </div>
          </div>
        </div>
      )}

      <div className={`${step === 'confirmation' ? 'rounded-[2rem] border border-white/80 bg-white/88 px-6 py-12 shadow-[0_18px_56px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 md:px-10' : 'rounded-[2rem] border border-white/80 bg-white/88 p-6 shadow-[0_18px_56px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 md:p-10'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 'vaccine' && renderVaccineStep()}
            {step === 'location' && renderLocationStep()}
            {step === 'symptoms' && renderSymptomsStep()}
            {step === 'severity' && renderSeverityStep()}
            {step === 'confirmation' && renderConfirmation()}
          </motion.div>
        </AnimatePresence>

        {step !== 'confirmation' && (
          <div className="mt-12 flex justify-between border-t border-slate-200 pt-8">
            <button
              onClick={goBack}
              disabled={step === 'vaccine'}
              className="btn-secondary flex items-center gap-2 group disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <button
              onClick={goNext}
              disabled={!canContinue}
              className="btn-primary flex items-center gap-2 group disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              {currentMeta?.next}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
