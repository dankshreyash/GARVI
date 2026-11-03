import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Phone } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    const pass = e.target.elements.password.value.trim();
    if (email && pass) {
      setMsg({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 2000);
    } else {
      setMsg({ type: 'error', text: 'Invalid credentials. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden font-sans">
      {/* Floating shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="floating-shape w-24 h-24 bg-garvi-orange rounded-full top-20 left-10" />
        <div className="floating-shape w-16 h-16 bg-garvi-gold rounded-lg bottom-32 right-16" style={{ animationDelay: '1s' }} />
      </div>

      {/* Top Header */}
      <div className="bg-white shadow-md fixed top-0 inset-x-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <img src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png" alt="GARVI logo" className="h-12 w-12 object-contain" />
            <h1 className="text-2xl font-bold text-garvi-orange">GARVI</h1>
            <span className="text-base text-gray-600 ml-2">Login</span>
          </div>
        </div>
      </div>

      {/* Login Container */}
      <main className="pt-28 pb-8 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 fade-in">
          <div className="text-center mb-8">
            <img src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png" alt="GARVI Symbol" className="mx-auto h-24 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
            <p className="text-gray-500 text-sm">Access your GARVI Analytics Dashboard</p>
          </div>

          <form id="loginForm" onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-garvi-orange/40 focus:border-garvi-orange outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-garvi-orange/40 focus:border-garvi-orange outline-none pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  id="togglePwd"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-garvi-orange"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="text-garvi-orange focus:ring-garvi-orange border-gray-300 rounded" /> Remember me
              </label>
              <a href="#forgot" className="text-garvi-orange hover:text-garvi-gold">Forgot password?</a>
            </div>

            <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-semibold hover:shadow-lg transition-all">
              Sign In
            </button>

            <div className="text-center text-sm text-gray-500 mt-3">
              Don&#39;t have an account? <a href="#signup" className="text-garvi-orange hover:text-garvi-gold font-semibold">Sign up</a>
            </div>
          </form>

          {msg && (
            <div
              className={`mt-6 text-center py-2 rounded-lg text-white font-medium ${
                msg.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {msg.text}
            </div>
          )}
        </div>
      </main>

      {/* Help Window */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-garvi-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-gray-800">Need Help?</span>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
                <a href="#contact" className="hover:text-garvi-orange transition-colors flex items-center gap-1">
                  <Mail className="w-4 h-4" /> support@garvi.gujarat.gov.in
                </a>
                <a href="#phone" className="hover:text-garvi-orange transition-colors flex items-center gap-1">
                  <Phone className="w-4 h-4" /> +91-79-1234-5678
                </a>
                <a href="#guide" className="hover:text-garvi-orange transition-colors flex items-center gap-1">
                  User Guide
                </a>
              </div>
            </div>
            <button id="helpToggle" className="sm:hidden text-garvi-orange hover:text-garvi-gold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div id="mobileHelp" className="hidden sm:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <a href="#contact" className="flex items-center gap-2 text-gray-600 hover:text-garvi-orange transition-colors">
                <Mail className="w-4 h-4" /> Email: support@garvi.gujarat.gov.in
              </a>
              <a href="#phone" className="flex items-center gap-2 text-gray-600 hover:text-garvi-orange transition-colors">
                <Phone className="w-4 h-4" /> Phone: +91-79-1234-5678
              </a>
              <a href="#guide" className="flex items-center gap-2 text-gray-600 hover:text-garvi-orange transition-colors">
                User Guide &amp; Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
