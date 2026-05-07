import { Mail, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import VSafeLogo from '../common/VSafeLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
            <VSafeLogo inverted compact />
          </div>
          <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
            A research-based redesign focusing on the patient experience. V-safe is a safety monitoring system that allows you to share how you feel after your vaccination.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-health-green/20 hover:text-health-green transition-all">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-health-green/20 hover:text-health-green transition-all">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/" className="hover:text-health-green transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/check-in" className="hover:text-health-green transition-colors">Safety Check-in</Link>
            </li>
            <li>
              <Link to="/emergency" className="hover:text-health-green transition-colors">Emergency Info</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-health-green transition-colors">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Official Links</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="https://vsafe.cdc.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-health-green transition-colors">
                CDC V-safe <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://www.cdc.gov/vaccines" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-health-green transition-colors">
                Vaccine Information <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://vaers.hhs.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-health-green transition-colors">
                VAERS Reporting <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {currentYear} v-safe ai demo. Built for demonstration purposes. Not an official government tool.</p>
      </div>
    </footer>
  );
}
