import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BarChart3, PieChart, Activity, Users, LogIn, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { lang, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { path: '/', label: t('nav.home', 'Home'), icon: Home },
    { path: '/analytics', label: t('nav.analytics', 'Analytics'), icon: BarChart3 },
    { path: '/benchmarking', label: t('nav.benchmarking', 'Benchmarking'), icon: PieChart },
    { path: '/simulator', label: t('nav.simulator', 'Simulator'), icon: Activity },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass fixed w-full top-0 z-50 border-b border-gray-200/70 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo & Emblem with transparent Gujarat map */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 flex items-center justify-center p-0.5 shadow-xs group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/kcg_gujarat_transparent.png"
                alt="KCG Gujarat Emblem"
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Fallback to original symbol if file path has issue
                  e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-gradient-garvi">
                  GARVI
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100/70 text-amber-900 border border-amber-200/50">
                  <Sparkles className="w-2.5 h-2.5 text-garvi-orange" /> {t('nav.badge', 'GSIRF')}
                </span>
              </div>
              <p className="hidden md:block text-[10px] text-gray-500 font-medium -mt-1 leading-none tracking-tight">
                {t('nav.brandSub', 'Govt. of Gujarat Academic Ratings')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links & Controls */}
          <div className="hidden md:flex items-center space-x-1.5 text-sm">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-gradient-to-r from-garvi-orange/15 to-garvi-gold/15 text-garvi-orange shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-garvi-orange' : 'text-gray-500'}`} />
                  {link.label}
                </Link>
              );
            })}

            <div className="h-5 w-px bg-gray-200 mx-1.5" />

            {/* Language Switcher Pill */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300/80 bg-amber-50/70 hover:bg-amber-100/80 text-amber-950 font-bold text-xs tracking-wide transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
              title={lang === 'en' ? 'ગુજરાતીમાં ફેરવો (Switch to Gujarati)' : 'Switch to English'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-garvi-orange group-hover:rotate-45 transition-transform" />
              <span className="font-extrabold text-garvi-orange">
                {lang === 'en' ? 'ગુજરાતી' : 'English'}
              </span>
            </button>

            <Link
              to="/login"
              className="px-3.5 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:text-garvi-orange hover:bg-gray-100/70 flex items-center gap-1.5 transition-colors"
            >
              <LogIn className="w-4 h-4 text-gray-500" />
              {t('nav.login', 'Login')}
            </Link>

            <Link
              to="/admin"
              className="ml-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-semibold shadow-xs hover:shadow-md hover:scale-[1.02] transition-all text-sm"
            >
              <Users className="w-4 h-4" />
              {t('nav.adminPortal', 'Admin Portal')}
            </Link>
          </div>

          {/* Mobile Right Controls: Language pill + hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-950 font-bold text-xs shadow-2xs cursor-pointer"
              aria-label="Toggle Language"
            >
              <Globe className="w-3 h-3 text-garvi-orange" />
              <span>{lang === 'en' ? 'ગુજરાતી' : 'EN'}</span>
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:text-garvi-orange hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  active
                    ? 'bg-garvi-orange/10 text-garvi-orange'
                    : 'text-gray-700 hover:text-garvi-orange hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-base font-semibold text-gray-700 hover:text-garvi-orange hover:bg-gray-50"
            >
              <LogIn className="w-5 h-5" />
              {t('login.title', 'Institutional Login')}
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-semibold shadow-xs"
            >
              <Users className="w-5 h-5" />
              {t('nav.adminPortal', 'Admin Portal')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
