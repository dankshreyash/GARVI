import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  PieChart,
  Activity,
  HelpCircle,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  LogOut,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [dataSubmissionModal, setDataSubmissionModal] = useState(false);

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
    if (window.confirm('Are you sure you want to sign out?')) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16" onClick={() => profileOpen && setProfileOpen(false)}>
      {/* Top Navbar */}
      <nav className="glass sticky top-0 z-40 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-orange-50 border border-amber-200/60 flex items-center justify-center p-1">
                  <img
                    src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png"
                    alt="GARVI"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
              </Link>
              <span className="h-4 w-px bg-slate-300 hidden sm:block" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
                Institutional Dashboard
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert('Support helpline: garvisupport@gmail.com | +91 81475 56654')}
                className="p-2 text-slate-500 hover:text-garvi-orange hover:bg-slate-100 rounded-xl transition"
                title="Help Center"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition shadow-2xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen(!profileOpen);
                  }}
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    GU
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="text-xs font-bold text-slate-900 block leading-tight">Gujarat University</span>
                    <span className="text-[10px] text-slate-400 font-medium leading-none">IQAC Coordinator</span>
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 py-2 animate-in fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">Gujarat University</p>
                      <p className="text-[11px] text-slate-500">ID: GUJ-UNI-104</p>
                    </div>
                    <a href="#settings" className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                      Institutional Profile
                    </a>
                    <a href="#submissions" className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
                      Submission History
                    </a>
                    <hr className="my-1 border-slate-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
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
        {/* Welcome Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 fade-in">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-garvi-orange" />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Gujarat University, Ahmedabad
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              GSIRF Institutional ID: <strong className="text-slate-700 font-mono">GUJ-UNI-104</strong> • State University Category
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-garvi-orange" /> Current Rating: 4-Star ★★★★☆
            </span>
          </div>
        </div>

        {/* GSIRF 2026 Collection Banner Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden fade-in">
          <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-garvi-gold p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Active Cycle — GSIRF 2026
                </span>
                <span className="flex items-center gap-1 text-xs text-white/90 font-medium">
                  <Calendar className="w-3.5 h-3.5" /> Deadline: 31 July 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Institutional Data Collection Portal
              </h2>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                Submit academic, faculty, research grants, placements, and financial data for the 2026 rating cycle under the Gujarat State Institutional Rating Framework.
              </p>
            </div>

            <div className="flex-shrink-0">
              {submissionStatus?.status === 'accepted' ? (
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>Approved by State Admin</span>
                </div>
              ) : submissionStatus?.status === 'pending' ? (
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md">
                  <Clock className="w-5 h-5 text-amber-700" />
                  <span>Pending Admin Review</span>
                </div>
              ) : (
                <button
                  onClick={() => setDataSubmissionModal(true)}
                  className="bg-white text-slate-900 font-bold px-6 py-3.5 rounded-2xl hover:bg-slate-50 transition text-sm shadow-md flex items-center gap-2 hover:scale-[1.02] transform"
                >
                  <span>Open Submission Portal</span>
                  <ArrowRight className="w-4 h-4 text-garvi-orange" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 bg-white">
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">State Submissions</span>
              <span className="text-2xl font-black text-slate-900">324 / 470</span>
              <span className="text-[11px] text-emerald-600 block mt-0.5 font-semibold">69% Turnout</span>
            </div>
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">Data Sections</span>
              <span className="text-2xl font-black text-amber-600">8 Pillars</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Faculty, R&amp;D, Placements</span>
            </div>
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">Your Progress</span>
              <span className="text-2xl font-black text-garvi-orange">{completionPct}</span>
              <span className="text-[11px] text-slate-500 block mt-0.5">Draft Auto-Saved</span>
            </div>
            <div className="p-5 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">Days Remaining</span>
              <span className="text-2xl font-black text-blue-600">{daysRemaining}</span>
              <span className="text-[11px] text-blue-500 block mt-0.5">Until Portal Closes</span>
            </div>
          </div>

          <div className="px-6 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-600">Overall Data Completion</span>
            <div className="flex items-center gap-3 w-48 sm:w-64">
              <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-garvi-orange to-garvi-gold rounded-full transition-all duration-500"
                  style={{ width: completionPct }}
                />
              </div>
              <span className="text-xs font-bold text-slate-800">{completionPct}</span>
            </div>
          </div>
        </div>

        {/* 3 Core Tools Suite */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Institutional Decision Tools</h2>
            <span className="text-xs text-slate-500 font-medium">Updated for GSIRF 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Analytics Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover-lift p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-garvi-orange flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Analytics Dashboard</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Full PowerBI analytics suite showing multi-year rating trends, score breakdowns, and parameter rankings.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>State rank breakdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Parameter scoring radar</span>
                  </div>
                </div>
              </div>
              <button
                onClick={openAnalytics}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:opacity-95"
              >
                <span>Launch Analytics</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Benchmarking Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover-lift p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Peer Benchmarking</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Compare your institution with top Gujarat universities. Spot gaps in research publications and placements.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Peer cohort comparisons</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>State average benchmarks</span>
                  </div>
                </div>
              </div>
              <button
                onClick={openBenchmarking}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs hover:bg-slate-800"
              >
                <span>Start Benchmarking</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Simulator Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover-lift p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Performance Simulator</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Simulate what-if scenarios: test how adding faculty or filing patents will impact your total GSIRF score.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Weak indicator identification</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Predicted rating score</span>
                  </div>
                </div>
              </div>
              <button
                onClick={openSimulator}
                className="w-full py-2.5 px-4 rounded-xl border-2 border-garvi-orange text-garvi-orange font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-garvi-orange hover:text-white transition-colors"
              >
                <span>Open Simulator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Recent Institutional Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-garvi-orange" />
              <span>Recent Activity &amp; Milestones</span>
            </h3>
            <div className="space-y-3">
              {[
                {
                  title: 'Faculty List (Roster 2025-26) Uploaded',
                  time: 'Yesterday at 4:30 PM',
                  desc: '142 full-time faculty records saved in draft.',
                  icon: FileText,
                  color: 'bg-emerald-50 text-emerald-700'
                },
                {
                  title: 'Research Publications Synchronized',
                  time: '2 days ago',
                  desc: '88 Scopus indexed papers mapped to Gujarat University.',
                  icon: Sparkles,
                  color: 'bg-blue-50 text-blue-700'
                },
                {
                  title: 'GSIRF 2025 Institutional Report Downloaded',
                  time: '5 days ago',
                  desc: 'Annual evaluation report archived by IQAC.',
                  icon: Download,
                  color: 'bg-purple-50 text-purple-700'
                }
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className={`w-9 h-9 rounded-xl ${act.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <act.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-900 truncate">{act.title}</p>
                      <span className="text-[10px] text-slate-400">{act.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-garvi-orange" />
                <span>Quick Actions</span>
              </h3>
              <div className="space-y-2.5">
                {[
                  { label: 'Export Performance Audit (PDF)', action: () => alert('Compiling Institutional Audit PDF...') },
                  { label: 'Download GSIRF 2026 Guidelines', action: () => alert('Downloading official guidelines...') },
                  { label: 'Request State Admin Verification', action: () => alert('Verification request dispatched to KCG / ICARE.') },
                  { label: 'Invite Faculty Department Heads', action: () => alert('Opening invitation drawer...') }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={item.action}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-100 hover:border-amber-200 text-xs font-semibold text-slate-700 hover:text-garvi-orange transition flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700">
              <span className="font-bold text-amber-900 block mb-1">State Advisory</span>
              Ensure all faculty credentials are cross-verified with official university rosters before 31 July 2026.
            </div>
          </div>
        </div>
      </main>

      {/* GSIRF 2026 Data Collection Modal */}
      {dataSubmissionModal && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in"
          onClick={() => setDataSubmissionModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">GSIRF 2026 Data Collection Sections</h3>
                <p className="text-xs text-slate-500 mt-0.5">Gujarat University (GUJ-UNI-104)</p>
              </div>
              <button
                onClick={() => setDataSubmissionModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                { title: '1. Institutional Overview', status: 'Completed', color: 'text-emerald-700 bg-emerald-50' },
                { title: '2. Faculty & Staff Credentials', status: 'In Progress (80%)', color: 'text-amber-700 bg-amber-50' },
                { title: '3. Student Enrollment & Diversity', status: 'Pending', color: 'text-slate-600 bg-slate-100' },
                { title: '4. Research, Patents & IPR', status: 'In Progress (40%)', color: 'text-amber-700 bg-amber-50' },
                { title: '5. Placement & Progression', status: 'Pending', color: 'text-slate-600 bg-slate-100' },
                { title: '6. Capital & Operational Finances', status: 'Pending', color: 'text-slate-600 bg-slate-100' },
                { title: '7. Facilities & Differently Abled', status: 'Pending', color: 'text-slate-600 bg-slate-100' },
                { title: '8. Executive Declaration & Sign-off', status: 'Locked', color: 'text-slate-400 bg-slate-50' },
              ].map((sec, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <span className="text-xs font-bold text-slate-800">{sec.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-block w-fit mt-2 ${sec.color}`}>
                    {sec.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setDataSubmissionModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Data draft auto-saved. Official review submitted.');
                  setDataSubmissionModal(false);
                }}
                className="btn-garvi text-xs py-2 px-5"
              >
                Save &amp; Continue Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
