import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, PieChart, Activity, HelpCircle, Settings, FileText, Download, CheckCircle2, Clock, XCircle, LogOut } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const deadline = new Date('2026-07-31');
  const today = new Date();
  const daysRemaining = Math.max(0, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));

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
    return '0%';
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
    <div className="min-h-screen bg-gray-50 font-sans" onClick={() => profileOpen && setProfileOpen(false)}>
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl font-bold text-garvi-orange">
                GARVI
              </Link>
              <span className="text-sm text-gray-600 hidden sm:block">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-garvi-orange transition-colors" title="Help Center">
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="relative">
                <button
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileOpen(!profileOpen);
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    U
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">User</span>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2">
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </a>
                    <a href="#preferences" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Preferences
                    </a>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8 fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to GARVI Dashboard</h2>
          <p className="text-gray-600">Gujarat Academic Rating Visualization for Improvement</p>
        </div>

        {/* GSIRF 2026 Collection Banner */}
        <div className="mb-8 fade-in">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="garvi-gradient p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-white bg-opacity-20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    New — Open Now
                  </span>
                  <span className="text-white/80 text-xs">Deadline: 31 Jul 2026</span>
                </div>
                <h3 className="text-2xl font-bold mt-2">GSIRF 2026 — Institutional Data Collection</h3>
                <p className="text-white/90 text-sm mt-1 max-w-2xl">
                  Submit your institution&#39;s data for the Gujarat State Institutional Ranking Framework 2026. Covers faculty, students, research, financials &amp; governance.
                </p>
              </div>
              <div className="flex-shrink-0">
                {submissionStatus?.status === 'accepted' ? (
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-900 font-bold px-5 py-3 rounded-xl text-sm shadow">
                    <CheckCircle2 className="w-4 h-4 text-green-700" /> Accepted by Admin
                  </span>
                ) : submissionStatus?.status === 'rejected' ? (
                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-900 font-bold px-5 py-3 rounded-xl text-sm shadow">
                    <XCircle className="w-4 h-4 text-red-700" /> Resubmit Required
                  </span>
                ) : submissionStatus?.status === 'pending' ? (
                  <span className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-bold px-5 py-3 rounded-xl text-sm shadow">
                    <Clock className="w-4 h-4 text-amber-700" /> Pending Admin Review
                  </span>
                ) : (
                  <button
                    onClick={() => alert('GSIRF Data Collection portal is open for registered institutions.')}
                    className="bg-white text-garvi-orange font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition text-sm whitespace-nowrap shadow-md"
                  >
                    Start Data Submission →
                  </button>
                )}
              </div>
            </div>
            <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-extrabold text-garvi-orange">{submissionStatus ? '1' : '0'}</div>
                <div className="text-xs text-gray-500 mt-0.5">Institutes Submitted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-amber-500">8</div>
                <div className="text-xs text-gray-500 mt-0.5">Data Sections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-green-600">{completionPct}</div>
                <div className="text-xs text-gray-500 mt-0.5">Your Completion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold text-blue-600">{daysRemaining}</div>
                <div className="text-xs text-gray-500 mt-0.5">Days Remaining</div>
              </div>
            </div>
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                <span>Your submission progress</span>
                <span className="text-garvi-orange font-bold ml-auto">{completionPct}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-garvi-orange rounded-full transition-all" style={{ width: completionPct }} />
              </div>
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift fade-in stagger-1 flex flex-col justify-between">
            <div>
              <div className="garvi-gradient p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Analytics</h3>
                <p className="text-white text-opacity-90 text-sm">Comprehensive data analysis and visualization tools</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <BarChart3 className="w-4 h-4 text-garvi-orange" /> Performance metrics &amp; KPIs
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <BarChart3 className="w-4 h-4 text-garvi-orange" /> Interactive PowerBI dashboards
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <BarChart3 className="w-4 h-4 text-garvi-orange" /> Custom report generation
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                className="w-full bg-garvi-orange hover:bg-garvi-gold text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                onClick={openAnalytics}
              >
                Launch Analytics
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift fade-in stagger-2 flex flex-col justify-between">
            <div>
              <div className="garvi-gradient p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">Popular</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Benchmarking</h3>
                <p className="text-white text-opacity-90 text-sm">Compare performance against standards and peers</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <PieChart className="w-4 h-4 text-garvi-orange" /> Peer comparison analysis
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <PieChart className="w-4 h-4 text-garvi-orange" /> Industry standards tracking
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <PieChart className="w-4 h-4 text-garvi-orange" /> Gap analysis reports
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                className="w-full bg-garvi-orange hover:bg-garvi-gold text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                onClick={openBenchmarking}
              >
                Start Benchmarking
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover-lift fade-in stagger-3 flex flex-col justify-between">
            <div>
              <div className="garvi-gradient p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium bg-white bg-opacity-20 px-3 py-1 rounded-full">New</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Simulator</h3>
                <p className="text-white text-opacity-90 text-sm">Model scenarios and predict outcomes</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Activity className="w-4 h-4 text-garvi-orange" /> What-if scenario modeling
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Activity className="w-4 h-4 text-garvi-orange" /> Predictive score projections
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Activity className="w-4 h-4 text-garvi-orange" /> Impact assessment tools
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-6 pb-6">
              <button
                className="w-full bg-garvi-orange hover:bg-garvi-gold text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                onClick={openSimulator}
              >
                Open Simulator
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Analytics report generated',
                  time: '2 hours ago',
                  color: 'bg-green-100 text-green-600',
                  icon: FileText,
                },
                {
                  title: 'KPI analysis completed',
                  time: '5 hours ago',
                  color: 'bg-blue-100 text-blue-600',
                  icon: BarChart3,
                },
                {
                  title: 'Simulation model updated',
                  time: '1 day ago',
                  color: 'bg-purple-100 text-purple-600',
                  icon: Activity,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: 'New Report',
                  desc: 'Create custom report',
                  icon: FileText,
                  action: openAnalytics,
                },
                {
                  title: 'Export Data',
                  desc: 'Download reports',
                  icon: Download,
                  action: () => alert('Generating full dataset export...'),
                },
                {
                  title: 'Benchmarking',
                  desc: 'Compare peer metrics',
                  icon: Settings,
                  action: openBenchmarking,
                },
                {
                  title: 'Help Center',
                  desc: 'Get support & guides',
                  icon: HelpCircle,
                  action: () => alert('Contact GARVI support at garvi@gmail.com or 9573978391'),
                },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.action}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3">
                    <item.icon className="w-4 h-4 text-garvi-orange" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
