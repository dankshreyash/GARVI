import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Phone, ArrowLeft, Globe, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { loginInstitution } from '../api/garviApi';
import Seo from '../components/Seo';

export default function Login() {
  const navigate = useNavigate();
  const { lang, toggleLanguage, t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMsg({
        type: 'error',
        text: lang === 'gu'
          ? 'કૃપા કરીને યુઝર આઈડી / ઈમેલ અને પાસવર્ડ બંને દાખલ કરો.'
          : 'Please enter both User ID and Password.'
      });
      return;
    }

    setLoading(true);
    setMsg(null);

    try {
      // 1. Primary path: Authenticate against PostgreSQL Supabase Backend API
      const inst = await loginInstitution(email.trim(), password.trim());

      // Save sanitized institution object in localStorage (NO PASSWORDS!)
      localStorage.setItem('garvi_active_institution', JSON.stringify(inst));
      
      if (inst.role === 'admin') {
        setMsg({
          type: 'success',
          text: lang === 'gu'
            ? 'એડમિનિસ્ટ્રેટર લૉગિન સફળ! એડમિન પોર્ટલ ખોલી રહ્યું છે...'
            : 'Admin authentication verified! Redirecting to State Admin Portal...'
        });
        setTimeout(() => navigate('/admin'), 800);
      } else {
        setMsg({
          type: 'success',
          text: lang === 'gu'
            ? `${inst.nameGu || inst.name} તરીકે લૉગિન સફળ! ડેશબોર્ડ ખોલી રહ્યું છે...`
            : `Login verified by PostgreSQL Backend for ${inst.name}! Loading Recharts...`
        });
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch (apiErr) {
      console.warn('Backend login attempt error:', apiErr.message);
      setMsg({
        type: 'error',
        text: apiErr.message || (lang === 'gu'
          ? 'અમાન્ય ઓળખપત્રો અથવા સર્વર એરર.'
          : 'Invalid username or password. Verified by secure backend.')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans flex flex-col justify-between">
      <Seo
        title="Institutional Login Portal"
        description="Secure authenticated access for Gujarat colleges and universities to view internal analytics, data submissions, and ranking reports."
        keywords="GSIRF login, GARVI institutional login, Gujarat college portal signin, KCG portal"
      />

      {/* Background Ambience */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="glass fixed top-0 inset-x-0 z-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 flex items-center justify-center p-0.5 shadow-2xs">
              <picture>
                <source srcSet="/kcg_gujarat_transparent.webp" type="image/webp" />
                <img
                  src="/kcg_gujarat_transparent.png"
                  alt="GARVI Gujarat Logo"
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
            <div>
              <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
              <span className="text-xs text-slate-500 font-medium ml-2">
                {t('login.title', 'GSIRF Institutional Portal')}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs tracking-wide transition-all shadow-2xs cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-garvi-orange" />
              <span>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
            </button>

            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-garvi-orange transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {lang === 'gu' ? 'મુખ્ય પૃષ્ઠ પર પાછા' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="pt-28 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-xl p-8 fade-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center p-1 overflow-hidden">
              <picture>
                <source srcSet="/kcg_gujarat_transparent.webp" type="image/webp" />
                <img
                  src="/kcg_gujarat_transparent.png"
                  alt="GARVI Symbol"
                  width="64"
                  height="64"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                  }}
                />
              </picture>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('login.title', 'Institutional Login')}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Sign in with institutional credentials generated by the Government Admin
            </p>
          </div>

          <form id="loginForm" onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Institutional User ID / AISHE
              </label>
              <input
                type="text"
                id="email"
                name="username"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-garvi-orange focus:border-garvi-orange outline-none transition font-mono bg-white text-slate-900"
                placeholder="e.g. anand_law or iotn_university"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('login.passwordLabel', 'Password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-garvi-orange focus:border-garvi-orange outline-none transition pr-10 font-mono bg-white text-slate-900"
                  placeholder="••••••••"
                  aria-required="true"
                />
                <button
                  type="button"
                  id="togglePwd"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-garvi-orange cursor-pointer p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-garvi-orange"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="text-garvi-orange focus:ring-garvi-orange rounded border-slate-300 cursor-pointer" defaultChecked />
                <span>{t('login.rememberMe', 'Remember this device')}</span>
              </label>
              <Link to="/admin" className="text-garvi-orange hover:text-amber-700 font-semibold focus:outline-none focus:underline">
                Generate in Admin Portal →
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-bold text-sm shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              {loading ? 'Verifying Credentials...' : 'Sign In & Open Institutional Analytics'}
            </button>
          </form>

          {msg && (
            <div
              className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
                msg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {msg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
              <span>{msg.text}</span>
            </div>
          )}
        </div>
      </main>

      {/* Desktop Help Strip */}
      <div className="hidden lg:block fixed bottom-0 inset-x-0 glass border-t border-slate-200 py-2.5 z-40">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-6">
            <span className="font-semibold text-slate-800">
              GSIRF Institutional Access Helpdesk:
            </span>
            <a href="mailto:helpdesk@kcg.gujarat.gov.in" className="flex items-center gap-1.5 hover:text-garvi-orange">
              <Mail className="w-3.5 h-3.5 text-garvi-orange" />
              <span>helpdesk@kcg.gujarat.gov.in</span>
            </a>
            <a href="tel:+918147556654" className="flex items-center gap-1.5 hover:text-garvi-orange">
              <Phone className="w-3.5 h-3.5 text-garvi-orange" />
              <span>+91 81475 56654</span>
            </a>
          </div>
          <span className="text-[11px] text-slate-500">
            {t('common.portalVersion', 'GARVI System v2.6.4 (GSIRF 2026 Active Cycle)')}
          </span>
        </div>
      </div>
    </div>
  );
}
