import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, RotateCcw, Download, Menu, X, Smartphone, Monitor } from 'lucide-react';
import MobileKpiCardView from '../components/MobileKpiCardView';

export default function Benchmarking() {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [mobileView, setMobileView] = useState('kpi'); // 'kpi' or 'powerbi'

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    setNotification({
      icon: '📊',
      title: 'Preparing Report',
      message: 'Benchmarking comparison report is being compiled for download...'
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setNotification({
      icon: '🔗',
      title: 'Link Copied',
      message: 'Benchmarking tool link has been copied to your clipboard!'
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotification({
        icon: '🔄',
        title: 'Data Refreshed',
        message: 'GSIRF Benchmarking metrics have been refreshed from the database.'
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <nav className="glass fixed w-full top-0 z-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black text-gradient-garvi tracking-tight">
                GARVI
              </Link>
              <span className="h-4 w-px bg-slate-300 mx-3 hidden sm:block" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
                Benchmarking Tool
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 text-xs font-bold">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-slate-600 hover:text-garvi-orange px-3 py-1.5 rounded-xl hover:bg-slate-100 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Link>
              <Link to="/analytics" className="text-slate-600 hover:text-garvi-orange px-3 py-1.5 rounded-xl hover:bg-slate-100 transition">
                Analytics
              </Link>
              <Link to="/simulator" className="text-slate-600 hover:text-garvi-orange px-3 py-1.5 rounded-xl hover:bg-slate-100 transition">
                Simulator
              </Link>
            </div>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 text-sm font-semibold">
            <Link
              to="/dashboard"
              onClick={() => setNavOpen(false)}
              className="flex items-center gap-2 text-slate-700 hover:text-garvi-orange py-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <Link
              to="/analytics"
              onClick={() => setNavOpen(false)}
              className="block text-slate-700 hover:text-garvi-orange py-1"
            >
              Analytics
            </Link>
            <Link
              to="/simulator"
              onClick={() => setNavOpen(false)}
              className="block text-slate-700 hover:text-garvi-orange py-1"
            >
              Simulator
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <section className="pt-24 pb-8 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <span className="text-xs font-bold uppercase tracking-widest text-garvi-orange bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              Comparative Analysis
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-3 tracking-tight">
              Peer Institutional Benchmarking
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl mx-auto">
              Compare institutional performance against state standards and peer cohorts across all GSIRF parameters.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-left hover-lift flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 text-garvi-orange rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Peer Cohorts</h3>
                  <p className="text-slate-500 text-xs">Direct side-by-side institutional comparisons</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">470</span>
                  <span className="text-[11px] font-semibold text-slate-400">Peer Institutions</span>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-left hover-lift flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Gap Diagnosis</h3>
                  <p className="text-slate-500 text-xs">Pinpoint underperforming indicator gaps</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">16 Metrics</span>
                  <span className="text-[11px] font-semibold text-slate-400">Evaluated</span>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-left hover-lift flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">State Standards</h3>
                  <p className="text-slate-500 text-xs">Benchmark against state excellence targets</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">100%</span>
                  <span className="text-[11px] font-semibold text-slate-400">GSIRF Aligned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 md:p-8 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  GSIRF Benchmarking Dashboard
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Interactive benchmarking analysis and institutional performance comparisons
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                  Live Data
                </div>
              </div>
            </div>

            {/* Mobile View Toggle Switch */}
            <div className="md:hidden flex items-center justify-between mb-5 p-1.5 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setMobileView('kpi')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  mobileView === 'kpi'
                    ? 'bg-white text-garvi-orange shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile KPI Cards</span>
              </button>
              <button
                onClick={() => setMobileView('powerbi')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  mobileView === 'powerbi'
                    ? 'bg-white text-garvi-orange shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop PowerBI</span>
              </button>
            </div>

            {/* Dedicated Mobile KPI Card View (Default on Phones) */}
            <div className={mobileView === 'kpi' ? 'block md:hidden' : 'hidden'}>
              <MobileKpiCardView
                title="GSIRF Benchmarking — Mobile Summary"
                onSwitchToDesktop={() => setMobileView('powerbi')}
              />
            </div>

            {/* Desktop / Full PowerBI Container */}
            <div className={mobileView === 'powerbi' ? 'block' : 'hidden md:block'}>
              {mobileView === 'powerbi' && (
                <div className="md:hidden mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span>Viewing full desktop report. Pan and pinch to zoom as needed.</span>
                  <button
                    onClick={() => setMobileView('kpi')}
                    className="font-bold underline ml-2 flex-shrink-0"
                  >
                    Back to KPI View
                  </button>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="loading-spinner mb-4" />
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Loading GSIRF Benchmarking Engine...
                  </p>
                </div>
              )}

              <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 ${loading ? 'hidden' : 'block'}`}>
                <iframe
                  title="BENCHMARKING TOOL"
                  src="https://app.powerbi.com/view?r=eyJrIjoiYjkwMTIxNGEtZGYzZi00YjFkLTlmNWYtMDA4NDY0ZWI0Zjg1IiwidCI6ImU5YjVlZTQxLTRkODUtNDBhZi04YWRhLWQ2MTBiNzU3NTk5YSJ9"
                  className="w-full h-[600px] md:h-[900px] border-0"
                  allowFullScreen={true}
                  onLoad={() => setLoading(false)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleExport}
                className="btn-garvi text-xs py-2 px-4 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export Benchmarking Report
              </button>
              <button
                onClick={handleShare}
                className="flex items-center bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition text-xs font-bold"
              >
                <Share2 className="w-3.5 h-3.5 mr-1.5" />
                Share Dashboard
              </button>
              <button
                onClick={handleRefresh}
                className="flex items-center bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition text-xs font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Modal */}
      {notification && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4"
          onClick={() => setNotification(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl border border-slate-200 animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">{notification.icon}</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{notification.title}</h3>
            <p className="text-slate-500 text-xs mb-6">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="btn-garvi text-xs py-2 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
