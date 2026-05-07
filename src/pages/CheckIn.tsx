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
      symptoms: prev.symptoms.includes(s) 
        ? prev.symptoms.filter(item => item !== s)
        : [...prev.symptoms, s]
    }));
  };

  const currentStepIndex = steps.findIndex(s => s.key === step);

  const renderVaccineStep = () => (
    <div className="space-y-6">
      <div className="mb-8 space-y-2 border-b border-slate-200 pb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">Step 1</p>
        <h2 className="text-3xl font-black text-health-navy">Tell us about your vaccination</h2>
        <p className="text-slate-600">Please provide the details found on your vaccine card.</p>
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
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">Step 2</p>
        <h2 className="text-3xl font-black text-slate-900">Where was the shot given?</h2>
        <p className="text-slate-600">Search for the healthcare facility or pharmacy.</p>
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
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">Step 3</p>
        <h2 className="text-3xl font-black text-health-navy">How are you feeling?</h2>
        <p className="text-slate-600">Select any symptoms you've experienced since your shot.</p>
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
        <p className="text-sm font-black uppercase tracking-[0.18em] text-health-blue">Step 4</p>
        <h2 className="text-3xl font-black text-health-navy">Just a few more details</h2>
        <p className="text-slate-600">Help us understand the intensity of your symptoms.</p>
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
    <div className="bg-slate-100 px-4 py-10 md:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 bg-white px-6 py-8 shadow-sm md:px-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-950">V-safe check-in</h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            Complete this short demo check-in to report vaccine information and symptoms. This prototype does not submit real health data.
          </p>
        </div>
      {step !== 'confirmation' && (
        <div className="mb-8 bg-white px-6 py-6 shadow-sm md:px-10">
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
        </div>
      )}

      <div className={`${step === 'confirmation' ? 'bg-white px-6 py-12 shadow-sm md:px-10' : 'border border-slate-200 bg-white p-6 shadow-sm md:p-10'}`}>
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
              onClick={() => {
                if (step === 'location') setStep('vaccine');
                if (step === 'symptoms') setStep('location');
                if (step === 'severity') setStep('symptoms');
              }}
              disabled={step === 'vaccine'}
              className="btn-secondary flex items-center gap-2 group disabled:opacity-0"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
            <button
              onClick={() => {
                if (step === 'vaccine') setStep('location');
                if (step === 'location') setStep('symptoms');
                if (step === 'symptoms') setStep('severity');
                if (step === 'severity') setStep('confirmation');
              }}
              className="btn-primary flex items-center gap-2 group"
            >
              {step === 'severity' ? 'Submit Report' : 'Next Step'}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
