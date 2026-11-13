import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check } from 'lucide-react';
import { recordAuditLog } from '../services/monitoring';

const CONSENT_STORAGE_KEY = 'garvi_cookie_consent_v1';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!consent) {
        // Small delay so it transitions in smoothly after initial paint
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ status: 'accepted', timestamp: new Date().toISOString() })
      );
    } catch {}
    recordAuditLog('COOKIE_CONSENT_ACCEPTED', { level: 'all' });
    setVisible(false);
  };

  const handleAcceptEssentialOnly = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ status: 'essential_only', timestamp: new Date().toISOString() })
      );
    } catch {}
    recordAuditLog('COOKIE_CONSENT_ESSENTIAL_ONLY', { level: 'essential' });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      role="region"
      className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-800">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-garvi-orange">
              <Cookie className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">
              Cookie &amp; Data Privacy Notice
            </h2>
          </div>
          <button
            type="button"
            onClick={handleAcceptEssentialOnly}
            aria-label="Close and accept only essential cookies"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          GARVI complies with the <strong>Digital Personal Data Protection Act (DPDP Act 2023, India)</strong> and global privacy standards. We use essential cookies for secure institutional authentication and anonymized analytics to improve state ranking transparency.
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-4 text-[11px] text-slate-500 font-medium">
          <Link to="/privacy" className="underline hover:text-garvi-orange transition">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link to="/terms" className="underline hover:text-garvi-orange transition">
            Terms of Service
          </Link>
          <span>•</span>
          <Link to="/cookies" className="underline hover:text-garvi-orange transition">
            Cookie Policy
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-bold text-xs shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Accept All
          </button>
          <button
            type="button"
            onClick={handleAcceptEssentialOnly}
            className="py-2 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition cursor-pointer"
          >
            Essential Only
          </button>
        </div>
      </div>
    </aside>
  );
}
