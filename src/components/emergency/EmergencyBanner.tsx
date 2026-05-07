import { AlertTriangle, Phone, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function EmergencyBanner() {
  return (
    <div className="bg-red-600 text-white rounded-2xl overflow-hidden shadow-xl shadow-red-200 border border-red-700">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-center">
          <div className="bg-white/20 p-4 rounded-xl self-start">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">Seek Emergency Care Immediately</h2>
            <p className="text-red-50 text-base md:text-lg mb-4">
              If you or someone in your care experience any of the following symptoms after vaccination, call 911 or visit the nearest emergency room.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
              <div className="flex items-center gap-2 bg-red-700/50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
                Difficulty breathing or shortness of breath
              </div>
              <div className="flex items-center gap-2 bg-red-700/50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
                Chest pain or heavy pressure
              </div>
              <div className="flex items-center gap-2 bg-red-700/50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
                Swelling of the face, tongue, or throat
              </div>
              <div className="flex items-center gap-2 bg-red-700/50 p-2 rounded-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
                Sudden confusion or loss of consciousness
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-700 p-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="tel:911" className="flex items-center gap-2 bg-white text-red-700 px-6 py-2 rounded-full font-bold hover:bg-slate-50 transition-colors">
          <Phone className="w-4 h-4" /> Call 911
        </a>
        <a href="https://www.google.com/maps/search/emergency+room+near+me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-red-800 text-white px-6 py-2 rounded-full font-bold hover:bg-red-900 transition-colors">
          <MapPin className="w-4 h-4" /> Find Nearest ER <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
