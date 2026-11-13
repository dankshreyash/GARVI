import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import Seo from '../components/Seo';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      <Seo
        title="Cookie Policy & Local Storage Transparency"
        description="Detailed breakdown of cookies and local storage tokens used across the GARVI platform."
      />

      <header className="glass sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">Cookie Policy</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-garvi-orange">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-3">
              <Cookie className="w-3.5 h-3.5 text-garvi-orange" />
              <span>Transparency &amp; Storage Usage</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Knowledge Consortium of Gujarat (KCG) • GARVI Platform
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. What Are Cookies &amp; Local Storage?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cookies and browser local storage are small text files placed on your computer or mobile device when accessing modern web platforms. They enable the portal to recognize authorized institutions, persist bilingual language settings, and maintain session state.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900">2. Categories of Storage We Use</h2>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                    Essential / Strictly Necessary
                  </span>
                  <span className="font-bold text-xs text-slate-900">garvi_auth_token &amp; garvi_active_institution</span>
                </div>
                <p className="text-xs text-slate-600">
                  Required to securely remember authenticated colleges and administrators. Never contains raw passwords.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold uppercase tracking-wider">
                    Preferences
                  </span>
                  <span className="font-bold text-xs text-slate-900">garvi_language</span>
                </div>
                <p className="text-xs text-slate-600">
                  Stores your chosen display language (English or Gujarati / ગુજરાતી) across browser visits.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                    Anonymized Analytics
                  </span>
                  <span className="font-bold text-xs text-slate-900">Google Analytics 4 (_ga, _gid)</span>
                </div>
                <p className="text-xs text-slate-600">
                  Measures statewide traffic and module engagement with IP anonymization enabled.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. How to Manage Cookies</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              You can adjust your cookie settings at any time using our on-page cookie consent banner, or clear your browser's site data and cookies directly through your browser preferences.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
