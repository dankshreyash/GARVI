import { Component } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { captureError } from '../services/monitoring';

/**
 * Universal React Error Boundary
 * Catches JavaScript errors anywhere in their child component tree,
 * logs errors, and displays a graceful fallback UI instead of a blank white screen.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('GARVI UI Error Caught by ErrorBoundary:', error, errorInfo);
    captureError(error, { componentStack: errorInfo?.componentStack });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/80 text-garvi-orange flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
              The application encountered an unexpected error while rendering this view. Your session and data are secure.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 rounded-xl bg-slate-100 border border-slate-200 text-left font-mono text-[11px] text-slate-600 max-h-24 overflow-y-auto">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="btn-garvi text-xs py-2.5 px-4 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Home className="w-4 h-4" /> Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

