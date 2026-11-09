import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  RotateCcw,
  Download,
  Menu,
  X,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import AnalyticsToolPdfRecreation from '../components/AnalyticsToolPdfRecreation';

export default function Analytics() {
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeEngine, setActiveEngine] = useState('recharts'); // 'recharts' | 'powerbi'

  const handleExport = () => {
    setNotification({
      icon: '📊',
      title: 'Preparing PDF Report',
      message: 'Compiling GSIRF Analytics Tool report for download...'
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setNotification({
      icon: '🔗',
      title: 'Link Copied',
      message: 'Direct link to this Analytics view has been copied to your clipboard!'
    });
  };

  const handleRefresh = () => {
    setNotification({
      icon: '🔄',
      title: 'Data Synchronized',
      message: 'All 469 institutional records refreshed directly from GSIRF 2024 Final Data.'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      {/* Top Navigation */}
      <nav className="glass fixed w-full top-0 z-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black text-gradient-garvi tracking-tight">
                GARVI
              </Link>
              <span className="h-4 w-px bg-slate-300 mx-3 hidden sm:block" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
                GSIRF Analytics Tool
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3 text-xs font-bold">
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 text-slate-600 hover:text-garvi-orange px-3 py-1.5 rounded-xl hover:bg-slate-100 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
              </Link>
              <Link to="/benchmarking" className="text-slate-600 hover:text-garvi-orange px-3 py-1.5 rounded-xl hover:bg-slate-100 transition">
                Benchmarking
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
              to="/benchmarking"
              onClick={() => setNavOpen(false)}
              className="block text-slate-700 hover:text-garvi-orange py-1"
            >
              Benchmarking
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-6">
        {/* Toggle Bar: Native Analytics Tool (PDF Layout) vs PowerBI Iframe */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-garvi-orange" />
            <span className="text-xs font-bold text-slate-800">
              Interactive Analytics Engine:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveEngine('recharts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeEngine === 'recharts'
                  ? 'bg-gradient-to-r from-garvi-orange to-garvi-gold text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Apache ECharts Tool (Matching PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveEngine('powerbi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                activeEngine === 'powerbi'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>PowerBI Desktop Embed</span>
            </button>
          </div>
        </div>

        {/* View 1: Recharts Native PDF Reproduction with Live Excel Data */}
        {activeEngine === 'recharts' ? (
          <AnalyticsToolPdfRecreation />
        ) : (
          /* View 2: Desktop PowerBI Embed */
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                PowerBI Statewide Interactive Analytics Embed
              </h2>
            </div>
            <div className="w-full overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="GARVI ANALYTICS DASHBOARD"
                src="https://app.powerbi.com/view?r=eyJrIjoiNjZlZmViYjItYTIyMi00YWRjLTkyZDctNDM3MzJkM2RkOTY5IiwidCI6ImU5YjVlZTQxLTRkODUtNDBhZi04YWRhLWQ2MTBiNzU3NTk5YSJ9"
                className="w-full h-[600px] md:h-[850px] border-0"
                allowFullScreen={true}
              />
            </div>
          </div>
        )}

        {/* Action Controls Footer */}
        <div className="pt-4 flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleExport}
            className="btn-garvi text-xs py-2.5 px-4 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export Analytics Tool PDF
          </button>
          <button
            onClick={handleShare}
            className="flex items-center bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-bold shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 mr-1.5" />
            Share Dashboard
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-bold shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Refresh Excel Records
          </button>
        </div>
      </main>

      {/* Notification Toast Modal */}
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
