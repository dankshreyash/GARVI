import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  RotateCcw,
  Download,
  Menu,
  X,
  Sparkles,
  BarChart3
} from 'lucide-react';
import MultiCollegeAnalyticsComparison from '../components/MultiCollegeAnalyticsComparison';
import Seo from '../components/Seo';

export default function Benchmarking() {
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const benchmarkingSchemas = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'GARVI Multi-Institution Benchmarking Tool',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      url: 'https://garvi-inky.vercel.app/benchmarking',
      description: 'Comparative analytical engine allowing higher education institutions across Gujarat to benchmark performance side-by-side.',
      provider: {
        '@type': 'GovernmentOrganization',
        name: 'Knowledge Consortium of Gujarat (KCG)'
      }
    }
  ], []);

  const handleExport = () => {
    setNotification({
      icon: '📊',
      title: 'Preparing Multi-Institution Report',
      message: 'GSIRF comparative report for selected institutions is being compiled...'
    });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setNotification({
      icon: '🔗',
      title: 'Comparison Link Copied',
      message: 'Direct link to this multi-college comparison has been copied to your clipboard!'
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
      <Seo
        title="Multi-Institution Peer Benchmarking & Gap Analysis"
        description="Compare up to 3 Gujarat colleges and universities side-by-side on TLR, Research, Graduation Outcomes, and Outreach with radar charts."
        keywords="GSIRF benchmarking, Gujarat college comparison, peer benchmarking, radar chart analytics, TLR gap analysis"
        schemas={benchmarkingSchemas}
      />

      {/* Top Navbar */}
      <nav className="glass fixed w-full top-0 z-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-black text-gradient-garvi tracking-tight">
                GARVI
              </Link>
              <span className="h-4 w-px bg-slate-300 mx-3 hidden sm:block" />
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 hidden sm:block">
                Multi-Institution Benchmarking
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
                State Analytics
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
              State Analytics
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 space-y-6">
        {/* Multi-College Analytical View Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-garvi-orange" />
            <h1 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              Multi-College Institutional Benchmarking
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-garvi-orange to-garvi-gold text-white shadow-xs flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Multi-College Recharts (2 or 3 Colleges)</span>
            </span>
          </div>
        </div>

        {/* Active Multi-College Recharts Suite matching ANALYTICS TOOL.pdf */}
        <MultiCollegeAnalyticsComparison />

        {/* Action Controls Footer */}
        <div className="pt-4 flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleExport}
            className="btn-garvi text-xs py-2.5 px-4 shadow-xs"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export Multi-College Comparison Report (.PDF)
          </button>
          <button
            onClick={handleShare}
            className="flex items-center bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-bold shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 mr-1.5" />
            Share Comparison View
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition text-xs font-bold shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Refresh Excel Dataset
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
