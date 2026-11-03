import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, RotateCcw, Download, Menu, X } from 'lucide-react';

export default function Benchmarking() {
  const [loading, setLoading] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [notification, setNotification] = useState(null);

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
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-garvi-orange hover:text-garvi-gold transition-colors">
                GARVI
              </Link>
              <div className="ml-2 text-sm text-gray-600 hidden sm:block">Benchmarking Tool</div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-garvi-orange px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Link>
              <Link to="/analytics" className="text-gray-700 hover:text-garvi-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Analytics
              </Link>
              <Link to="/simulator" className="text-gray-700 hover:text-garvi-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Simulator
              </Link>
            </div>
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-garvi-orange"
            >
              {navOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {navOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setNavOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-garvi-orange py-2 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
            <Link
              to="/analytics"
              onClick={() => setNavOpen(false)}
              className="block text-gray-700 hover:text-garvi-orange py-2 text-sm font-medium"
            >
              Analytics
            </Link>
            <Link
              to="/simulator"
              onClick={() => setNavOpen(false)}
              className="block text-gray-700 hover:text-garvi-orange py-2 text-sm font-medium"
            >
              Simulator
            </Link>
          </div>
        )}
      </nav>

      <section className="pt-20 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in stagger-1">
              <span className="text-garvi-orange">Benchmarking Tool</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto fade-in stagger-2">
              Compare institutional performance against state standards and peer institutions using GSIRF metrics
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto fade-in stagger-3">
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift text-center h-64 flex flex-col justify-between border border-gray-100">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Peer Comparison</h3>
                  <p className="text-gray-600 text-sm mb-4">Compare against similar institutions in Gujarat</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-garvi-orange">470</div>
                  <div className="text-xs text-gray-500">Peer Institutions</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift text-center h-64 flex flex-col justify-between border border-gray-100">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Gaps</h3>
                  <p className="text-gray-600 text-sm mb-4">Identify areas needing strategic attention</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-garvi-orange">16</div>
                  <div className="text-xs text-gray-500">Key Indicators</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift text-center h-64 flex flex-col justify-between border border-gray-100">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">State Standards</h3>
                  <p className="text-gray-600 text-sm mb-4">Benchmark against state-level excellence targets</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-garvi-orange">100%</div>
                  <div className="text-xs text-gray-500">GSIRF Aligned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100 fade-in stagger-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">GSIRF Benchmarking Dashboard</h2>
                <p className="text-gray-600">Interactive benchmarking analysis and institutional performance comparison</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse" />
                  Live Data
                </div>
              </div>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="loading-spinner mb-4" />
                <p className="text-gray-600">Loading GSIRF Benchmarking Dashboard...</p>
              </div>
            )}

            <div className={`w-full overflow-hidden rounded-xl border border-gray-200 ${loading ? 'hidden' : 'block'}`}>
              <iframe
                title="BENCHMARKING TOOL"
                src="https://app.powerbi.com/view?r=eyJrIjoiYjkwMTIxNGEtZGYzZi00YjFkLTlmNWYtMDA4NDY0ZWI0Zjg1IiwidCI6ImU5YjVlZTQxLTRkODUtNDBhZi04YWRhLWQ2MTBiNzU3NTk5YSJ9"
                className="w-full h-[600px] md:h-[900px] border-0"
                allowFullScreen={true}
                onLoad={() => setLoading(false)}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleExport}
                className="flex items-center bg-garvi-orange text-white px-4 py-2.5 rounded-lg hover:bg-garvi-gold transition-colors hover-lift font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
              <button
                onClick={handleShare}
                className="flex items-center bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors hover-lift font-medium"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Dashboard
              </button>
              <button
                onClick={handleRefresh}
                className="flex items-center bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition-colors hover-lift font-medium"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Modal */}
      {notification && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setNotification(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-4xl mb-3">{notification.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{notification.title}</h3>
            <p className="text-gray-600 text-sm mb-6">{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className="bg-garvi-orange text-white px-6 py-2 rounded-xl font-semibold hover:bg-garvi-gold transition-colors w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
