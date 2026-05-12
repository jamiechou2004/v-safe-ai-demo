import { Mail, Phone, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import VSafeLogo from '../common/VSafeLogo';
import { useLanguage } from '../../i18n';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center mb-6">
            <VSafeLogo inverted compact />
          </div>
          <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
            {t('footer.body')}
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
          <h4 className="text-white font-bold mb-6">{t('footer.resources')}</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link to="/" className="hover:text-health-green transition-colors">{t('footer.home')}</Link>
            </li>
            <li>
              <Link to="/check-in" className="hover:text-health-green transition-colors">{t('footer.checkin')}</Link>
            </li>
            <li>
              <Link to="/emergency" className="hover:text-health-green transition-colors">{t('footer.emergency')}</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-health-green transition-colors">{t('footer.privacy')}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">{t('footer.official')}</h4>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="https://vsafe.cdc.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-health-green transition-colors">
                CDC V-safe <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://www.cdc.gov/vaccines" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-health-green transition-colors">
                {t('footer.vaccineInfo')} <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://vaers.hhs.gov" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-health-green transition-colors">
                {t('footer.vaers')} <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {currentYear} v-safe ai demo. {t('footer.demo')}</p>
      </div>
    </footer>
  );
}
