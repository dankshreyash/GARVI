import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Phone, ChevronDown, ChevronUp, ArrowLeft, Shield, Lock, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setMsg({ type: 'success', text: 'Login successful! Redirecting to Institutional Dashboard...' });
      setTimeout(() => navigate('/dashboard'), 1200);
    } else {
      setMsg({ type: 'error', text: 'Please enter both User ID / Email and Password.' });
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
            <div className="h-9 w-9 rounded-xl bg-orange-50 border border-amber-200/60 flex items-center justify-center p-1 shadow-2xs">
              <img
                src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png"
                alt="GARVI logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
              <span className="text-xs text-slate-500 font-medium ml-2">GSIRF Institutional Portal</span>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-garvi-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="pt-28 pb-24 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-xl p-8 fade-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center p-2">
              <img
                src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png"
                alt="GARVI Symbol"
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Institutional Login</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Sign in to manage GSIRF 2026 data collection and institutional ratings
            </p>
          </div>

          {/* Demo Credentials Quick Fill Banner */}
          <div className="mb-6 p-3 rounded-2xl bg-amber-50/80 border border-amber-200/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-garvi-orange flex-shrink-0" />
              <span className="text-xs text-slate-700">Need demo login access?</span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs font-bold text-garvi-orange hover:text-amber-700 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs hover:bg-amber-50 transition-colors"
            >
              Fill Demo
            </button>
          </div>

          <form id="loginForm" onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Institute User ID or Email
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
                Password
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-garvi-orange"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" className="text-garvi-orange focus:ring-garvi-orange rounded border-slate-300" defaultChecked />
                <span>Remember institute</span>
              </label>
              <a href="#forgot" className="text-garvi-orange hover:text-amber-700 font-semibold">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-bold text-sm shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
            >
              Sign In to Dashboard
            </button>

            <div className="text-center text-xs text-slate-500 pt-1">
              Don&#39;t have institutional credentials?{' '}
              <Link to="/admin" className="text-garvi-orange hover:text-amber-700 font-semibold">
                Contact State Admin
              </Link>
            </div>
          </form>

          {msg && (
            <div
              className={`mt-5 text-center py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 ${
                msg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {msg.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              <span>{msg.text}</span>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Help Window */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">GSIRF Institutional Support</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">Govt. of Gujarat Academic Portal</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-6 text-xs text-slate-600">
              <a href="mailto:garvisupport@gmail.com" className="hover:text-garvi-orange transition-colors flex items-center gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5 text-garvi-orange" /> garvisupport@gmail.com
              </a>
              <a href="tel:+918147556654" className="hover:text-garvi-orange transition-colors flex items-center gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-garvi-orange" /> +91 81475 56654
              </a>
            </div>

            <button
              id="helpToggle"
              onClick={() => setMobileHelpOpen(!mobileHelpOpen)}
              className="sm:hidden text-garvi-orange hover:text-amber-700 p-1"
              aria-label="Toggle Help details"
            >
              {mobileHelpOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {mobileHelpOpen && (
            <div id="mobileHelp" className="sm:hidden mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-1 gap-2 text-xs">
              <a href="mailto:garvisupport@gmail.com" className="flex items-center gap-2 text-slate-600 hover:text-garvi-orange">
                <Mail className="w-3.5 h-3.5 text-garvi-orange" /> garvisupport@gmail.com
              </a>
              <a href="tel:+918147556654" className="flex items-center gap-2 text-slate-600 hover:text-garvi-orange">
                <Phone className="w-3.5 h-3.5 text-garvi-orange" /> +91 81475 56654
              </a>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
