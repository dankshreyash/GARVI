import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Phone, ChevronDown, ChevronUp, ArrowLeft, Shield, Globe, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const navigate = useNavigate();
  const { lang, toggleLanguage, t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setMsg({
        type: 'success',
        text: lang === 'gu'
          ? 'પ્રવેશ સફળ! સંસ્થાકીય ડેશબોર્ડ પર રીડાયરેક્ટ કરી રહ્યું છે...'
          : 'Login successful! Redirecting to Institutional Dashboard...'
      });
      setTimeout(() => navigate('/dashboard'), 1200);
    } else {
      setMsg({
        type: 'error',
        text: lang === 'gu'
          ? 'કૃપા કરીને યુઝર આઈડી / ઈમેલ અને પાસવર્ડ બંને દાખલ કરો.'
          : 'Please enter both User ID / Email and Password.'
      });
    }
  };

  const handleFillDemo = () => {
    setEmail('iqac@gujaratuniversity.ac.in');
    setPassword('GSIRF2026!');
    setMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans flex flex-col justify-between">
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
              <img
                src="/kcg_gujarat_transparent.png"
                alt="GARVI Gujarat Logo"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                }}
              />
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
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8 fade-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center p-1 overflow-hidden">
              <img
                src="/kcg_gujarat_transparent.png"
                alt="GARVI Symbol"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                }}
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('login.title', 'Institutional Login')}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              {t('login.subtitle', 'Sign in with your AISHE / GSIRF registered institutional credentials')}
            </p>
          </div>

          {/* Demo Credentials Quick Fill Banner */}
          <div className="mb-6 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-garvi-orange flex-shrink-0" />
              <span className="text-xs text-slate-700">
                {lang === 'gu' ? 'ડેમો પ્રવેશ જોઈએ છે?' : 'Need demo login access?'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-garvi-orange hover:text-amber-700 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs hover:bg-amber-50 transition-colors cursor-pointer"
            >
              {t('login.fillDemo', 'Fill Demo (SVNIT Surat)')}
            </button>
          </div>

          <form id="loginForm" onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('login.aisheLabel', 'AISHE Code or Institutional Email')}
              </label>
              <input
                type="text"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-garvi-orange/30 focus:border-garvi-orange outline-none transition"
                placeholder="e.g. iqac@gujaratuniversity.ac.in"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {t('login.passwordLabel', 'Password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-garvi-orange/30 focus:border-garvi-orange outline-none transition pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  id="togglePwd"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-garvi-orange cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="text-garvi-orange focus:ring-garvi-orange rounded border-slate-300" defaultChecked />
                <span>{t('login.rememberMe', 'Remember this device')}</span>
              </label>
              <a href="#forgot" className="text-garvi-orange hover:text-amber-700 font-semibold">
                {t('login.forgotPassword', 'Forgot password?')}
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-bold text-sm shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer"
            >
              {t('login.signInBtn', 'Sign In to Dashboard')}
            </button>

            <div className="text-center text-xs text-slate-500 pt-1">
              {lang === 'gu' ? 'ઓળખપત્ર નથી?' : "Don't have institutional credentials?"}{' '}
              <Link to="/admin" className="text-garvi-orange hover:text-amber-700 font-semibold">
                {t('home.adminAccess', 'Contact State Admin')}
              </Link>
            </div>
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
              {lang === 'gu' ? 'GSIRF ૨૦૨૬ સંસ્થાકીય સહાયતા:' : 'GSIRF 2026 Institutional Helpdesk:'}
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

      {/* Mobile Accordion Help */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 glass border-t border-slate-200 z-40">
        <button
          onClick={() => setMobileHelpOpen(!mobileHelpOpen)}
          className="w-full flex items-center justify-between p-3 text-xs font-semibold text-slate-700 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-garvi-orange" />
            {lang === 'gu' ? 'સહાયતા સંપર્ક વિગતો' : 'Need Institutional Help?'}
          </span>
          {mobileHelpOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
        {mobileHelpOpen && (
          <div className="px-4 pb-3 space-y-2 text-xs border-t border-slate-100 bg-white/80">
            <p className="text-slate-600">
              <a href="mailto:helpdesk@kcg.gujarat.gov.in" className="text-garvi-orange font-medium">helpdesk@kcg.gujarat.gov.in</a>
            </p>
            <p className="text-slate-600">
              {lang === 'gu' ? 'હેલ્પલાઇન:' : 'Helpline:'} <a href="tel:+918147556654" className="text-garvi-orange font-medium">+91 81475 56654</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
