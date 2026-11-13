import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Clock,
  Menu,
  X,
  Building2,
  FileCheck2,
  Search,
  PlusCircle,
  Globe,
  FileSpreadsheet,
  ExternalLink,
  Shield,
  Lock,
  LogOut,
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { INSTITUTIONS_FROM_EXCEL } from '../data/institutionsRegistry';
import { loginInstitution } from '../api/garviApi';
import Seo from '../components/Seo';

export default function Admin() {
  const { lang, toggleLanguage, t } = useLanguage();

  // All 469 institutions loaded directly from GSIRF 2024 Final Data.xlsx
  const [users, setUsers] = useState(() => {
    try {
      const customAdded = JSON.parse(localStorage.getItem('garvi_admin_users_v1') || '[]');
      // Merge custom users with the 469 Excel records
      const excelMapped = INSTITUTIONS_FROM_EXCEL.map((i) => ({
        inst: i.name,
        uid: i.uid,
        pwd: i.pwd,
        category: i.category,
        star: i.star,
        score: i.totalScore,
        rank: i.rank,
        isFromExcel: true
      }));
      return [...customAdded, ...excelMapped];
    } catch {
      return INSTITUTIONS_FROM_EXCEL.map((i) => ({
        inst: i.name,
        uid: i.uid,
        pwd: i.pwd,
        category: i.category,
        star: i.star,
        score: i.totalScore,
        rank: i.rank,
        isFromExcel: true
      }));
    }
  });

  const [submissions, setSubmissions] = useState(() => {
    try {
      const stored = localStorage.getItem('garvi_submissions_v1');
      return stored ? JSON.parse(stored) : [
        {
          id: 'sub-1',
          inst: 'ANAND LAW COLLEGE',
          s1_gsirfId: 'ALC-LAW-207',
          submittedAt: '2026-03-12T10:30:00.000Z',
          status: 'accepted'
        },
        {
          id: 'sub-2',
          inst: 'AHMEDABAD UNIVERSITY',
          s1_gsirfId: 'AU-UNI-005',
          submittedAt: '2026-03-14T14:15:00.000Z',
          status: 'pending'
        },
        {
          id: 'sub-3',
          inst: 'IIT GANDHINAGAR',
          s1_gsirfId: 'IITGN-101',
          submittedAt: '2026-03-15T09:45:00.000Z',
          status: 'accepted'
        }
      ];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState({ inst: '', uid: '', pwd: '' });
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [navOpen, setNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('credentials'); // 'credentials' | 'scrutiny'

  // Admin Authentication Gate State
  const [isAdminAuthed, setIsAdminAuthed] = useState(() => {
    return localStorage.getItem('garvi_user_role') === 'admin';
  });
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    if (!adminUser.trim() || !adminPass.trim()) {
      setAdminError('Please enter both Administrator ID and Password.');
      return;
    }
    setAdminLoading(true);
    setAdminError('');
    try {
      const result = await loginInstitution(adminUser, adminPass);
      if (result.role === 'admin' || localStorage.getItem('garvi_user_role') === 'admin') {
        localStorage.setItem('garvi_user_role', 'admin');
        setIsAdminAuthed(true);
      } else {
        setAdminError('Access Denied: This account does not have State Administrator privileges.');
      }
    } catch (err) {
      setAdminError(err.message || 'Invalid administrator username or password.');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('garvi_user_role');
    localStorage.removeItem('garvi_auth_token');
    setIsAdminAuthed(false);
    setAdminPass('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.inst || !formData.uid || !formData.pwd) return;
    const newUser = {
      ...formData,
      category: 'New Registered Institute',
      star: 3,
      score: 50.0,
      rank: 99,
      isCustom: true
    };
    const updated = [newUser, ...users];
    setUsers(updated);

    // Save newly provisioned credentials
    try {
      const customOnly = updated.filter((u) => u.isCustom);
      localStorage.setItem('garvi_admin_users_v1', JSON.stringify(customOnly));
    } catch {}

    setFormData({ inst: '', uid: '', pwd: '' });
  };

  const handleExportCSV = () => {
    const csvHeader = 'Institution_Name,User_ID,Assigned_Password,GSIRF_Star,Total_Score,Category,Rank\n';
    const csvRows = users
      .map(
        (u) =>
          `"${u.inst}","${u.uid}","${u.pwd}",${u.star || 3},${u.score || 0},"${u.category || 'College'}",${u.rank || 0}`
      )
      .join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `GSIRF_2024_All_469_Colleges_Credentials_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const handleDeleteUser = (uid) => {
    if (window.confirm(`Are you sure you want to remove user "${uid}"?`)) {
      const updated = users.filter((u) => u.uid !== uid);
      setUsers(updated);
      try {
        const customOnly = updated.filter((u) => u.isCustom);
        localStorage.setItem('garvi_admin_users_v1', JSON.stringify(customOnly));
      } catch {}
    }
  };

  const togglePasswordVisibility = (uid) => {
    setVisiblePasswords((prev) => ({ ...prev, [uid]: !prev[uid] }));
  };

  const handleUpdateSubmissionStatus = (id, newStatus) => {
    const updated = submissions.map((sub) => {
      if (sub.id === id || sub.s1_gsirfId === id || sub.gsirfId === id) {
        return {
          ...sub,
          status: newStatus,
          acceptedAt: newStatus === 'accepted' ? new Date().toISOString() : sub.acceptedAt,
          rejectedAt: newStatus === 'rejected' ? new Date().toISOString() : sub.rejectedAt
        };
      }
      return sub;
    });
    setSubmissions(updated);
    localStorage.setItem('garvi_submissions_v1', JSON.stringify(updated));
  };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        !filter ||
        u.inst.toLowerCase().includes(filter.toLowerCase()) ||
        u.uid.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory =
        categoryFilter === 'ALL' ||
        (u.category && u.category.toLowerCase().includes(categoryFilter.toLowerCase()));
      return matchesSearch && matchesCategory;
    });
  }, [users, filter, categoryFilter]);

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;
  const acceptedCount = submissions.filter((s) => s.status === 'accepted').length;

  // =========================================================================
  // 1. ADMIN AUTHENTICATION GATE (Prompt for Username & Password)
  // =========================================================================
  if (!isAdminAuthed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white font-sans flex flex-col justify-between">
        <Seo
          title="State Administrator Portal — Access Verification"
          description="Restricted evaluation and credential management portal for Education Department administrators."
          noindex={true}
        />
        {/* Gate Header */}
        <header className="border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center p-0.5">
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
            <span className="text-xl font-black text-amber-400 tracking-tight">GARVI</span>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold hidden sm:inline">
              State Rating Authority
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-400/40 bg-white/5 hover:bg-white/10 text-amber-300 font-bold text-xs tracking-wide transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
            </button>
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition"
            >
              Back to Home
            </Link>
          </div>
        </header>

        {/* Gate Body */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-6">
              <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                Administrator Access
              </h2>
              <p className="text-xs text-amber-200/80 font-medium mt-1">
                Restricted State Evaluation & Scrutiny Portal
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] font-semibold text-amber-300">
                <Lock className="w-3 h-3" /> Credentials Required
              </div>
            </div>

            {adminError && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{adminError}</span>
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Administrator User ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={adminUser}
                    onChange={(e) => setAdminUser(e.target.value)}
                    placeholder="admin or garvisupport@gmail.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Master Password
                </label>
                <div className="relative">
                  <input
                    type={showAdminPass ? 'text' : 'password'}
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition pr-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition p-1"
                  >
                    {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={adminLoading}
                className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 text-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {adminLoading ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Enter Administration Center</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Helper Credentials Card */}
            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <p className="text-[11px] text-slate-400 mb-2">Default Administrator Credentials:</p>
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setAdminUser('admin');
                    setAdminPass('Admin@GARVI2026');
                    setAdminError('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold transition cursor-pointer"
                >
                  Fill: admin / Admin@GARVI2026
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdminUser('garvisupport@gmail.com');
                    setAdminPass('Icare@2026');
                    setAdminError('');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 font-mono text-xs font-bold transition cursor-pointer"
                >
                  Fill: garvisupport
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gate Footer */}
        <footer className="py-4 text-center text-xs text-slate-500 border-t border-white/5">
          GARVI Gujarat Academic Ratings Visualization for Improvement • Official State Government Portal
        </footer>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED ADMINISTRATOR VIEW (Full Access to Everything)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      <Seo
        title="State Oversight & Institutional Registry Dashboard"
        description="State Administrator Portal for GSIRF institutional registry, data verification, and statewide rankings."
        noindex={true}
      />
      {/* Top Header */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold">
              <Shield className="w-3.5 h-3.5 text-garvi-orange" />
              <span>State Administrator</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-xs tracking-wide transition-all shadow-2xs cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-garvi-orange" />
              <span>{lang === 'en' ? 'ગુજરાતી' : 'English'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="btn-garvi text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Download Master Sheet containing all 469 Gujarat institutions from Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Excel Master (.CSV)</span>
              <span className="sm:hidden">Export</span>
            </button>

            {/* Logout Admin */}
            <button
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-200 hover:border-red-200 text-xs font-bold transition cursor-pointer"
              title="Sign out from Administrator mode"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={() => setNavOpen(!navOpen)}
              className="sm:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-xs font-bold">
            <Link to="/" className="block py-1 text-slate-700">{t('nav.home', 'Home')}</Link>
            <Link to="/analytics" className="block py-1 text-slate-700">{t('nav.analytics', 'Analytics')}</Link>
            <Link to="/benchmarking" className="block py-1 text-slate-700">{t('nav.benchmarking', 'Benchmarking')}</Link>
            <Link to="/simulator" className="block py-1 text-slate-700">{t('nav.simulator', 'Simulator')}</Link>
            <button onClick={handleAdminLogout} className="block w-full text-left py-1 text-red-600 font-bold">
              Logout Administrator
            </button>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ========================================================================= */}
        {/* ADMIN COMMAND CENTER: UNRESTRICTED FULL ACCESS TO ALL TOOLS              */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full Administrative Authority</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Administrator Command Hub
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                You have unrestricted administrative privileges to evaluate and compare all 469 Gujarat institutions across GSIRF rating indicators, benchmark targets, and simulation projections.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Supabase Live (469 Institutions)</span>
              </span>
            </div>
          </div>

          {/* 3 Full Access Tool Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            {/* Tool 1: Analytics */}
            <Link
              to="/analytics"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  Deep Analytics Tool
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Inspect ECharts Radar, 16 indicator bars, category standings, and Excel score cards for any college.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Open Full Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Tool 2: Benchmarking */}
            <Link
              to="/benchmarking"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-400/50 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400 mb-3 group-hover:scale-110 transition-transform">
                  <PieChart className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                  Multi-College Benchmarking
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Compare 2 or 3 colleges head-to-head across TLR, RP, GO, and OI with category top performers.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:translate-x-1 transition-transform">
                <span>Open Benchmarking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Tool 3: Simulator */}
            <Link
              to="/simulator"
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  What-If Score Simulator
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  Test indicator improvements, simulate CGPA gains, and model predicted star rating movements.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Open Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </section>

        {/* Header Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Loaded directly from: GSIRF 2024 FInal Data.xlsx</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              State Oversight &amp; Institutional Registry
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Government of Gujarat • Manage credentials &amp; verify submissions across <strong>469 institutions</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Colleges</span>
              <span className="text-xl font-black text-slate-900">{users.length}</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Under Review</span>
              <span className="text-xl font-black text-amber-600">{pendingCount}</span>
            </div>
            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified &amp; Approved</span>
              <span className="text-xl font-black text-emerald-600">{acceptedCount}</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('credentials')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'credentials'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-garvi-orange" />
            <span>Colleges Credentials Registry ({filtered.length} of {users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('scrutiny')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'scrutiny'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-emerald-500" />
            <span>GSIRF Submissions Scrutiny ({submissions.length})</span>
          </button>
        </div>

        {activeTab === 'credentials' && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 fade-in">
            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase text-slate-500 mr-1">Filter by Discipline:</span>
                {['ALL', 'University', 'College', 'Engineering', 'Law', 'Pharmacy', 'Management'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      categoryFilter === cat
                        ? 'bg-amber-100 text-garvi-orange border border-amber-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by college name, user ID (e.g. anand_law, ahmedabad_uni)..."
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-garvi-orange/30 w-full sm:w-80"
                />
              </div>
            </div>

            {/* Featured Highlight for Anand Law College and Ahmedabad University */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-amber-950 block">
                  Featured Institutions (Ready to Login):
                </span>
                <span className="text-xs text-amber-900/80">
                  • <strong>ANAND LAW COLLEGE</strong> (User ID: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">anand_law</code> / Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">AnandLaw#2026</code>)<br />
                  • <strong>AHMEDABAD UNIVERSITY</strong> (User ID: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">ahmedabad_uni</code> / Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[11px]">AhmedabadUni#2026</code>)
                </span>
              </div>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-garvi-orange text-white text-xs font-bold shadow-xs hover:bg-amber-600 transition shrink-0 inline-flex items-center gap-1.5"
              >
                <span>Test College Login</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Add Custom Institution Form */}
            <form onSubmit={handleSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  New Institution Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Government Science College"
                  value={formData.inst}
                  onChange={(e) => setFormData({ ...formData, inst: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-garvi-orange/30 outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Assign User ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. gsc_admin"
                  value={formData.uid}
                  onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-garvi-orange/30 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Assign Password
                </label>
                <input
                  type="text"
                  placeholder="e.g. Science#2026!"
                  value={formData.pwd}
                  onChange={(e) => setFormData({ ...formData, pwd: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-garvi-orange/30 outline-none font-mono"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full btn-garvi text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Issue Credentials</span>
                </button>
              </div>
            </form>

            {/* 469 Colleges Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 max-h-[580px] overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider sticky top-0 z-10 shadow-2xs">
                  <tr>
                    <th className="py-3 px-4">Institution Name (from Excel)</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Assigned User ID</th>
                    <th className="py-3 px-4">Password</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filtered.slice(0, 100).map((user) => {
                    const isVisible = visiblePasswords[user.uid];
                    const isSpecial = user.uid === 'anand_law' || user.uid === 'ahmedabad_uni';
                    return (
                      <tr key={user.uid} className={`hover:bg-slate-50 transition ${isSpecial ? 'bg-amber-50/40' : ''}`}>
                        <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <Building2 className={`w-4 h-4 shrink-0 ${isSpecial ? 'text-garvi-orange' : 'text-slate-400'}`} />
                          <span className="truncate max-w-xs">{user.inst}</span>
                          {isSpecial && (
                            <span className="px-1.5 py-0.2 rounded bg-garvi-orange text-white text-[9px] font-bold">
                              DEMO READY
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-500">{user.category || 'College'}</td>
                        <td className="py-3 px-4">
                          <span className="text-amber-500 font-bold">
                            {'★'.repeat(user.star || 3)}{'☆'.repeat(5 - (user.star || 3))}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">{user.score || '—'}</td>
                        <td className="py-3 px-4 font-mono text-garvi-orange font-bold">{user.uid}</td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          <div className="flex items-center gap-2">
                            <span>{isVisible ? user.pwd : '••••••••••••'}</span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(user.uid)}
                              className="text-slate-400 hover:text-garvi-orange cursor-pointer"
                            >
                              {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {user.isCustom && (
                            <button
                              onClick={() => handleDeleteUser(user.uid)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                              title="Remove custom credential"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length > 100 && (
              <div className="text-center text-xs text-slate-400 pt-2">
                Showing top 100 of {filtered.length} institutions matching filter. Use the search bar to find any of the 469 colleges.
              </div>
            )}
          </section>
        )}

        {activeTab === 'scrutiny' && (
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6 fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-garvi-orange">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    GSIRF 2026 Submissions Scrutiny Queue
                  </h2>
                  <p className="text-xs text-slate-500">
                    Review and verify academic proofs submitted by colleges
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Institution</th>
                    <th className="py-3 px-4">GSIRF ID</th>
                    <th className="py-3 px-4">Submitted Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {submissions.map((sub) => {
                    const isAccepted = sub.status === 'accepted';
                    const isRejected = sub.status === 'rejected';
                    return (
                      <tr key={sub.id || sub.s1_gsirfId} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-garvi-orange shrink-0" />
                          <span>{sub.inst}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{sub.s1_gsirfId}</td>
                        <td className="py-3.5 px-4 text-slate-500">
                          {sub.submittedAt ? new Date(sub.submittedAt).toLocaleDateString() : 'Active Cycle'}
                        </td>
                        <td className="py-3.5 px-4">
                          {isAccepted ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> Approved
                            </span>
                          ) : isRejected ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold border border-red-200">
                              <XCircle className="w-3 h-3" /> Query Dispatched
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                              <Clock className="w-3 h-3" /> Under Review
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          {!isAccepted && (
                            <button
                              onClick={() => handleUpdateSubmissionStatus(sub.id || sub.s1_gsirfId, 'accepted')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition cursor-pointer"
                            >
                              Approve
                            </button>
                          )}
                          {!isRejected && (
                            <button
                              onClick={() => handleUpdateSubmissionStatus(sub.id || sub.s1_gsirfId, 'rejected')}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-[11px] transition cursor-pointer"
                            >
                              Query
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
