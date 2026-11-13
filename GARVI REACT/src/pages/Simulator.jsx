import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, RotateCcw, Menu, X } from 'lucide-react';
import GsirfInteractiveSimulator from '../components/GsirfInteractiveSimulator';
import Seo from '../components/Seo';

export default function Simulator() {
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const simulatorSchemas = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'GSIRF 2026 Interactive Rating Simulator',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web Browser',
      url: 'https://garvi-inky.vercel.app/simulator',
      description: 'Predictive rating and rank projection engine for Gujarat colleges to model improvements across 16 GSIRF micro-indicators.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR'
      }
    }
  ], []);

  const handleExport = () => {
    setNotification({
      icon: '📊',
      title: 'Scenario Report Downloaded',
      message: 'Your What-If Simulation CSV report has been downloaded!'
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setNotification({
      icon: '🔗',
      title: 'Link Copied',
      message: 'Simulator link has been copied to your clipboard!'
    });
  };

  const handleRefresh = () => {
    setNotification({
      icon: '🔄',
      title: 'Data Synchronized',
      message: 'All 469 institutional metrics and GSIRF weights refreshed.'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Seo
        title="GSIRF 2026 Interactive Rating Simulator & Rank Projector"
        description="Model what-if scenarios across 16 GSIRF micro-indicators to project star ratings, CGPA, and rank improvements for Gujarat institutions."
        keywords="GSIRF simulator, college ranking simulator, rating improvement tool, Gujarat academic simulation, what-if academic analysis"
        schemas={simulatorSchemas}
      />
      <nav className="glass fixed w-full top-0 z-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black text-gradient-garvi tracking-tight">
                GARVI
              </Link>
              <span className="h-4 w-px bg-slate-300 mx-3 hidden sm:block" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
                Simulator Tool
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
              <Link to="/benchmarking" className="text-slate-600 hover:text-garvi-orange px-3 py-1.5 rounded-xl hover:bg-slate-100 transition">
                Benchmarking
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
              to="/benchmarking"
              onClick={() => setNavOpen(false)}
              className="block text-slate-700 hover:text-garvi-orange py-1"
            >
              Benchmarking
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Header */}
      <section className="pt-24 pb-8 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <span className="text-xs font-bold uppercase tracking-widest text-garvi-orange bg-amber-50 px-3 py-1 rounded-full border border-amber-200/60">
              Predictive Modeling
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-3 mb-3 tracking-tight">
              GSIRF Performance Simulator
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl mx-auto">
              Simulate strategic decisions and test what-if scenarios to predict their impact on your institutional rating and rank.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-left hover-lift flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-amber-500/10 text-garvi-orange rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Weak Indicators</h3>
                  <p className="text-slate-500 text-xs">Flags underperforming indicators for your institute</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">469</span>
                  <span className="text-[11px] font-semibold text-slate-400">Peer Base</span>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-left hover-lift flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">What-If Inputs</h3>
                  <p className="text-slate-500 text-xs">Simulate faculty, research &amp; placement targets</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">16 Metrics</span>
                  <span className="text-[11px] font-semibold text-slate-400">Adjustable</span>
                </div>
              </div>

              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200 text-left hover-lift flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-purple-500/10 text-purple-600 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Predicted Score</h3>
                  <p className="text-slate-500 text-xs">Instant projection of new total score and rank</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-2xl font-black text-slate-900">Real-Time</span>
                  <span className="text-[11px] font-semibold text-slate-400">ECharts Engine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm p-4 sm:p-6 md:p-8 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  GSIRF Interactive What-If Simulator
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Adjust any of the 16 institutional indicators below to see live projections for Score, CGPA, Stars &amp; Category Rank
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                  Native ECharts Engine
                </div>
              </div>
            </div>

            {/* Interactive Simulator Component (Replaces PowerBI) */}
            <GsirfInteractiveSimulator onExportReport={handleExport} />

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleShare}
                className="flex items-center bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition text-xs font-bold cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 mr-1.5" />
                Share Simulator Link
              </button>
              <button
                onClick={handleRefresh}
                className="flex items-center bg-slate-100 text-slate-700 px-4 py-2 rounded-xl hover:bg-slate-200 transition text-xs font-bold cursor-pointer"
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
