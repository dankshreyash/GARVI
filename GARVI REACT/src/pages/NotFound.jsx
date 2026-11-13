import { Link } from 'react-router-dom';
import { Home, BarChart3 } from 'lucide-react';
import Seo from '../components/Seo';

const CURRENT_YEAR = new Date().getFullYear();

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <Seo
        title="404 Page Not Found"
        description="The requested page could not be found on the GARVI platform. Navigate back to the homepage or state analytics."
        noindex={true}
      />

      <nav className="glass sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-black text-gradient-garvi tracking-tight">
              GARVI
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-garvi-orange px-3 py-1.5 rounded-xl hover:bg-slate-100 transition"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-amber-50 border border-amber-200 text-garvi-orange font-black text-4xl mb-6 shadow-sm">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable under the GSIRF portal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 btn-garvi text-xs sm:text-sm py-2.5 px-5 shadow-xs"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            to="/analytics"
            className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:text-garvi-orange hover:border-garvi-orange px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-2xs"
          >
            <BarChart3 className="w-4 h-4" /> Explore State Analytics
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link to="/benchmarking" className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 transition shadow-2xs">
            <span className="text-xs font-bold text-slate-900 block">Peer Benchmarking</span>
            <span className="text-[11px] text-slate-500">Compare 469 colleges across Gujarat</span>
          </Link>
          <Link to="/simulator" className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 transition shadow-2xs">
            <span className="text-xs font-bold text-slate-900 block">GSIRF Simulator</span>
            <span className="text-[11px] text-slate-500">Simulate rating improvements</span>
          </Link>
          <Link to="/login" className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-amber-400 transition shadow-2xs">
            <span className="text-xs font-bold text-slate-900 block">Institutional Login</span>
            <span className="text-[11px] text-slate-500">Access college data portal</span>
          </Link>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        &copy; {CURRENT_YEAR} GARVI — Gujarat Academic Ratings Visualization for Improvement. Knowledge Consortium of Gujarat (KCG).
      </footer>
    </div>
  );
}
