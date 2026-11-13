import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  PieChart,
  Activity,
  HelpCircle,
  CheckCircle2,
  Clock,
  LogOut,
  Calendar,
  ArrowRight,
  Layers,
  ChevronRight,
  Globe,
  Code,
  Copy,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { INSTITUTIONS_REGISTRY } from '../data/institutionsRegistry';
import InstitutionalRechartsSuite from '../components/InstitutionalRechartsSuite';
import Seo from '../components/Seo';

export default function Dashboard() {
  const navigate = useNavigate();
  const { lang, toggleLanguage, t } = useLanguage();
  const [profileOpen, setProfileOpen] = useState(false);
  const [dataSubmissionModal, setDataSubmissionModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Active authenticated institution or default to Anand Law College
  const [activeInst] = useState(() => {
    try {
      const stored = localStorage.getItem('garvi_active_institution');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INSTITUTIONS_REGISTRY[0]; // Anand Law College by default
  });

  const [daysRemaining] = useState(() => {
    const deadline = new Date('2026-07-31');
    const today = new Date();
    return Math.max(0, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));
  });

  const [completionPct] = useState(() => {
    try {
      const raw = localStorage.getItem('garvi_gsirf2026_v1');
      if (raw) {
        const data = JSON.parse(raw);
        const vals = Object.values(data).filter((v) => v && v !== '0' && v !== 'false');
        const total = Object.keys(data).length || 1;
        return Math.min(100, Math.round((vals.length / total) * 100)) + '%';
      }
    } catch {}
    return '15%';
  });

  const [submissionStatus] = useState(() => {
    try {
      const subs = JSON.parse(localStorage.getItem('garvi_submissions_v1') || '[]');
      return subs.length > 0 ? subs[subs.length - 1] : null;
    } catch {
      return null;
    }
  });

  const openAnalytics = () => navigate('/analytics');
  const openBenchmarking = () => navigate('/benchmarking');
  const openSimulator = () => navigate('/simulator');

  const handleLogout = () => {
    if (window.confirm(lang === 'gu' ? 'શું તમે ખરેખર લૉગઆઉટ કરવા માંગો છો?' : 'Are you sure you want to sign out?')) {
      localStorage.removeItem('garvi_active_institution');
      navigate('/login');
    }
  };

  const badgeSlug = activeInst.star >= 5 ? 'gsirf-5star-badge.svg' : 'gsirf-4star-badge.svg';

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16" onClick={() => profileOpen && setProfileOpen(false)}>
      <Seo
        title={`${activeInst.name} — Institutional Analytics Dashboard`}
        description={`Internal GSIRF performance dashboard, scorecard pillars, and digital accreditation badge for ${activeInst.name}.`}
        noindex={true}
      />
      {/* Top Navbar */}
      <nav className="glass sticky top-0 z-40 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-orange-50 border border-amber-200/60 flex items-center justify-center p-0.5 overflow-hidden">
                  <picture>
                    <source srcSet="/kcg_gujarat_transparent.webp" type="image/webp" />
                    <img
                      src="/kcg_gujarat_transparent.png"
                      alt="GARVI"
                      width="36"
                      height="36"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                      }}
                    />
                  </picture>
                </div>
                <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
              </Link>
              <span className="h-4 w-px bg-slate-300 hidden sm:block" />
              <h1 className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
                {lang === 'gu' ? 'સંસ્થાકીય ડેશબોર્ડ' : 'Institutional Analytics Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Language Switcher Pill */}
              <button
                onClick={toggleLanguage}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs tracking-wide transition-all shadow-2xs cursor-pointer"
                title={lang === 'en' ? 'Switch to Gujarati' : 'Switch to English'}
              >
                <Globe className="w-3.5 h-3.5 text-garvi-orange" />
                <span>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
              </button>

              <button
                onClick={() => alert('Support helpline: helpdesk@kcg.gujarat.gov.in | +91 81475 56654')}
                className="p-2 text-slate-500 hover:text-garvi-orange hover:bg-slate-100 rounded-xl transition cursor-pointer"
                title="Help Center"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition shadow-2xs cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen(!profileOpen);
                  }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    {activeInst.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold text-slate-900 block leading-tight truncate max-w-[140px]">
                      {activeInst.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium leading-none">
                      {activeInst.uid}
                    </span>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 py-2 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{activeInst.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono">ID: {activeInst.instId}</p>
                    </div>
                    <Link to="/admin" className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                      Admin Credentials Registry
                    </Link>
                    <a href="#settings" className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                      {lang === 'gu' ? 'સંસ્થાકીય પ્રોફાઇલ' : 'Institutional Profile'}
                    </a>
                    <hr className="my-1 border-slate-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left font-semibold cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {lang === 'gu' ? 'સાઇન આઉટ' : 'Sign Out'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Recharts Analytics Suite (Dynamic for Logged-In College) */}
        <InstitutionalRechartsSuite inst={activeInst} lang={lang} />

        {/* GSIRF 2026 Data Collection Banner Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden fade-in">
          <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-garvi-gold p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {lang === 'gu' ? 'સક્રિય ચક્ર — GSIRF ૨૦૨૬' : 'Active Cycle — GSIRF 2026'}
                </span>
                <span className="flex items-center gap-1 text-xs text-white/90 font-medium">
                  <Calendar className="w-3.5 h-3.5" /> {t('dashboard.dataCollectionSub', 'Deadline: 31 July 2026')}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t('dashboard.dataCollectionBanner', 'Institutional Data Collection Portal')}
              </h2>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                {lang === 'gu'
                  ? 'ગુજરાત રાજ્ય સંસ્થાકીય રેટિંગ ફ્રેમવર્ક હેઠળ ૨૦૨૬ રેટિંગ ચક્ર માટે શૈક્ષણિક, ફેકલ્ટી, સંશોધન અનુદાન, પ્લેસમેન્ટ અને નાણાકીય ડેટા સબમિટ કરો.'
                  : 'Submit academic, faculty, research grants, placements, and financial data for the 2026 rating cycle under the Gujarat State Institutional Rating Framework.'}
              </p>
            </div>

            <div className="flex-shrink-0">
              {submissionStatus?.status === 'accepted' ? (
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>{lang === 'gu' ? 'રાજ્ય એડમિન દ્વારા મંજૂર' : 'Approved by State Admin'}</span>
                </div>
              ) : submissionStatus?.status === 'pending' ? (
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span>{lang === 'gu' ? 'ચકાસણી હેઠળ બાકી' : 'Pending Admin Review'}</span>
                </div>
              ) : (
                <button
                  onClick={() => setDataSubmissionModal(true)}
                  className="bg-white text-slate-900 font-bold px-6 py-3.5 rounded-2xl hover:bg-slate-50 transition text-sm shadow-md flex items-center gap-2 hover:scale-[1.02] transform cursor-pointer"
                >
                  <span>{t('dashboard.fillDataNow', 'Open Submission Portal')}</span>
                  <ArrowRight className="w-4 h-4 text-garvi-orange" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white">
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                {lang === 'gu' ? 'રાજ્ય સબમિશન' : 'State Submissions'}
              </span>
              <span className="text-2xl font-black text-slate-900">324 / 470</span>
              <span className="text-[11px] text-emerald-600 block mt-0.5 font-semibold">69% Turnout</span>
            </div>
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                {lang === 'gu' ? 'ડેટા વિભાગો' : 'Data Sections'}
              </span>
              <span className="text-2xl font-black text-amber-600">8 Pillars</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Faculty, R&amp;D, Placements</span>
            </div>
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                {lang === 'gu' ? 'તમારી પ્રગતિ' : 'Your Progress'}
              </span>
              <span className="text-2xl font-black text-blue-600">{completionPct}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">{lang === 'gu' ? 'ડ્રાફ્ટ સાચવેલ' : 'Draft Saved'}</span>
            </div>
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                {t('dashboard.daysLeft', 'Days Remaining')}
              </span>
              <span className="text-2xl font-black text-rose-600">{daysRemaining}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Deadline: 31 Jul 2026</span>
            </div>
          </div>
        </div>

        {/* 3 Main Action Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
          <div
            onClick={openAnalytics}
            className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover-lift transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-center justify-center text-garvi-orange mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-garvi-orange transition-colors">
                {t('modules.analyticsTitle', 'Executive Analytics')}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {t('modules.analyticsDesc', 'View interactive PowerBI reports, scorecards, and historical trend comparisons for all 470+ institutions.')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-garvi-orange">
              <span>{t('home.exploreAnalytics', 'Open Analytics')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={openBenchmarking}
            className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover-lift transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-blue-50 border border-blue-200/80 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {t('modules.benchmarkingTitle', 'Peer Benchmarking')}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Compare {activeInst.name} against leading colleges across Gujarat on TLR, RPC, GO, and OI.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
              <span>{t('nav.benchmarking', 'Start Comparison')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          <div
            onClick={openSimulator}
            className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover-lift transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-purple-50 border border-purple-200/80 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                {t('modules.simulatorTitle', 'GSIRF 2026 Simulator')}
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Simulate how hiring PhD faculty or publishing 10 more research papers will boost your rating.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>{t('nav.simulator', 'Launch Simulator')}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Verifiable Digital Badge Card Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-garvi-orange">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    VERIFIED ACCREDITATION
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Anti-Fraud Feature</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Verifiable Digital Badge for {activeInst.name}
                </h3>
              </div>
            </div>

            <Link
              to={`/verify/${activeInst.instId || 'ALC-LAW-207'}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-garvi-orange transition text-xs font-bold shadow-xs"
            >
              <span>{lang === 'gu' ? 'ચકાસણી પેજ જુઓ' : 'Preview Live Verification Card'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Badge Live Preview */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                {lang === 'gu' ? 'લાઇવ બેજ પૂર્વાવલોકન (વેબસાઇટ પર કેવું દેખાશે):' : 'Live Badge Preview (How it appears on your website):'}
              </span>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3">
                <Link to={`/verify/${activeInst.instId || 'ALC-LAW-207'}`} target="_blank" className="hover:scale-105 transition-transform" title="Click to verify">
                  <img
                    src={`/badges/${badgeSlug}`}
                    alt="GSIRF Verified Institution"
                    width="360"
                    height="84"
                    loading="lazy"
                    decoding="async"
                    className="max-w-full h-auto drop-shadow-sm cursor-pointer"
                  />
                </Link>
                <span className="text-[11px] text-slate-400 font-medium text-center">
                  💡 When students click this badge on your website, it opens the official tamper-proof verification page on GARVI.
                </span>
              </div>
            </div>

            {/* Right: Embed Code Copy Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-garvi-orange" />
                  <span>{lang === 'gu' ? 'તમારી સાઇટ પર મૂકવા માટેનો એમ્બેડ કોડ:' : 'Embed Snippet for College Webmaster:'}</span>
                </span>
                <button
                  onClick={() => {
                    const snippet = `<a href="https://garvi.gujarat.gov.in/verify/${activeInst.instId || 'ALC-LAW-207'}" target="_blank" rel="noopener">\n  <img src="https://garvi.gujarat.gov.in/badges/${badgeSlug}" alt="GSIRF Verified Institution" width="360" height="84" />\n</a>`;
                    navigator.clipboard?.writeText(snippet);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-garvi-orange border border-amber-200 text-xs font-bold transition cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? (lang === 'gu' ? 'કોપી થઈ ગયું!' : 'Copied!') : (lang === 'gu' ? 'કોડ કોપી કરો' : 'Copy HTML Code')}</span>
                </button>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[11px] text-amber-200/90 overflow-x-auto border border-slate-800 leading-relaxed shadow-inner">
                <code>
                  &lt;a href=&quot;https://garvi.gujarat.gov.in/verify/{activeInst.instId || 'ALC-LAW-207'}&quot; target=&quot;_blank&quot;&gt;<br />
                  &nbsp;&nbsp;&lt;img src=&quot;https://garvi.gujarat.gov.in/badges/{badgeSlug}&quot; alt=&quot;GSIRF Verified Institution&quot; /&gt;<br />
                  &lt;/a&gt;
                </code>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1">
                <p>✓ <strong>Tamper-Proof:</strong> Hosted directly from the Government of Gujarat GARVI CDN.</p>
                <p>✓ <strong>Auto-Updates:</strong> If rating changes in 2026 cycle, the badge updates dynamically.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* GSIRF 2026 8-Section Preview Modal */}
      {dataSubmissionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-garvi-orange">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {t('dashboard.previewDataModal', 'GSIRF 2026 8-Section Data Collection Preview')}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeInst.name} (ID: {activeInst.instId}) • Deadline: 31 July 2026
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDataSubmissionModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'gu'
                ? 'સંસ્થાઓ અહીં ૮ વિભાગોમાં વિગતો ભરી શકે છે અથવા પૂર્વ-ફોર્મેટ કરેલ એક્સેલ ફાઇલ સીધી અપલોડ કરી શકે છે:'
                : 'Institutions can enter values section-by-section or bulk-upload via the official pre-formatted Excel template:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {[
                { name: lang === 'gu' ? '૧. સંસ્થાકીય મૂળભૂત પ્રોફાઇલ' : '1. Institutional Profile', status: lang === 'gu' ? 'પૂર્ણ' : 'Completed', count: '100%' },
                { name: lang === 'gu' ? '૨. શિક્ષક મંડળ અને ફેકલ્ટી વિગતો' : '2. Faculty & Staff Qualifications', status: lang === 'gu' ? 'ડ્રાફ્ટ સાચવેલ' : 'Draft Saved', count: '45%' },
                { name: lang === 'gu' ? '૩. સંશોધન પ્રકાશનો (Scopus/WoS)' : '3. Research Publications (Scopus)', status: lang === 'gu' ? 'બાકી' : 'Pending', count: '0%' },
                { name: lang === 'gu' ? '૪. પેટન્ટ્સ અને બૌદ્ધિક સંપદા (IPR)' : '4. Patents & IPR Filings', status: lang === 'gu' ? 'બાકી' : 'Pending', count: '0%' },
                { name: lang === 'gu' ? '૫. વિદ્યાર્થી પ્લેસમેન્ટ અને પગાર' : '5. Student Placements & Higher Ed', status: lang === 'gu' ? 'ડ્રાફ્ટ સાચવેલ' : 'Draft Saved', count: '30%' },
                { name: lang === 'gu' ? '૬. પ્રયોગશાળા અને ઇન્ફ્રાસ્ટ્રક્ચર ખર્ચ' : '6. Capital & Operational Expenditure', status: lang === 'gu' ? 'બાકી' : 'Pending', count: '0%' },
                { name: lang === 'gu' ? '૭. સર્વસમાવેશકતા અને છાત્રવૃત્તિ' : '7. Inclusivity & Female Enrollment', status: lang === 'gu' ? 'બાકી' : 'Pending', count: '0%' },
                { name: lang === 'gu' ? '૮. સત્તાવાર પુરાવા પીડીએફ દસ્તાવેજો' : '8. Verification Affidavits & Proofs', status: lang === 'gu' ? 'બાકી' : 'Pending', count: '0%' }
              ].map((sec, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">{sec.name}</span>
                    <span className="text-[10px] text-slate-500">{sec.status}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-garvi-orange">{sec.count}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100 justify-end">
              <button
                onClick={() => setDataSubmissionModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {t('dashboard.close', 'Close')}
              </button>
              <button
                onClick={() => {
                  alert(lang === 'gu' ? 'GSIRF ૨૦૨૬ એક્સેલ ફાઇલ અપલોડ સંવાદ...' : 'Opening Excel Drag-and-Drop Bulk Upload Window...');
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white text-xs font-bold shadow-xs hover:shadow-md cursor-pointer"
              >
                {lang === 'gu' ? 'એક્સેલ બલ્ક અપલોડ (.xlsx)' : 'Bulk Upload Excel (.xlsx)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
