import { Link } from 'react-router-dom';

export default function Simulator() {
  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans">
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-garvi-orange hover:text-garvi-gold transition-colors">
                GARVI
              </Link>
              <div className="ml-2 text-sm text-gray-600 hidden sm:block">Simulator Tool</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-700 hover:text-garvi-orange px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Dashboard
                </Link>
                <Link to="/analytics" className="text-gray-700 hover:text-garvi-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Analytics
                </Link>
                <Link to="/benchmarking" className="text-gray-700 hover:text-garvi-orange px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Benchmarking
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-20 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in stagger-1">
              <span className="text-garvi-orange">Simulator Tool</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto fade-in stagger-2">
              Model different scenarios and strategic decisions to predict their impact on institutional ratings and performance
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto fade-in stagger-3">
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift text-center h-64 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Weak Indicators</h3>
                  <p className="text-gray-600 text-sm mb-4">Automatically flags underperforming indicators for your institute</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-garvi-orange">470</div>
                  <div className="text-xs text-gray-500">Peer Institutions</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift text-center h-64 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">What-If Inputs</h3>
                  <p className="text-gray-600 text-sm mb-4">Use sliders or fields to set target scores for each indicator</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-garvi-orange">20</div>
                  <div className="text-xs text-gray-500">Key Metrics</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover-lift text-center h-64 flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Predicted Impact</h3>
                  <p className="text-gray-600 text-sm mb-4">Instant projection of new total score and rank after your changes</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-garvi-orange">95%</div>
                  <div className="text-xs text-gray-500">Compliance Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="benchmark-container rounded-2xl shadow-2xl p-6 md:p-8 fade-in stagger-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">GSIRF Simulator Dashboard</h2>
                <p className="text-gray-600">Interactive benchmarking analysis and institutional performance comparison</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                  Live Data
                </div>
              </div>
            </div>

            <div id="loading-indicator" className="flex flex-col items-center justify-center py-20">
              <div className="loading-spinner mb-4" />
              <p className="text-gray-600">Loading GSIRF Simulator Dashboard...</p>
            </div>

            <div id="dashboard-frame" className="hidden">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe
                  title="SIMULATOR TOOL"
                  width="1024"
                  height="1060"
                  src="https://app.powerbi.com/view?r=eyJrIjoiZTQ4MTg4ODItODUzMS00YTdiLTk0OGUtMmIxOWM4YjE3NTViIiwidCI6ImU5YjVlZTQxLTRkODUtNDBhZi04YWRhLWQ2MTBiNzU3NTk5YSJ9"
                  frameBorder="0"
                  allowFullScreen={true}
                  className="responsive-iframe"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button className="flex items-center bg-garvi-orange text-white px-4 py-2 rounded-lg hover:bg-garvi-gold transition-colors hover-lift">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </button>
              <button className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors hover-lift">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Dashboard
              </button>
              <button className="flex items-center bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors hover-lift">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Tools</h2>
            <p className="text-gray-600">Explore more GARVI analysis and improvement tools</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-garvi-orange rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">View comprehensive performance analytics</p>
              <Link to="/analytics" className="text-garvi-orange font-semibold hover:text-garvi-gold transition-colors">
                View Dashboard →
              </Link>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-garvi-orange rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Benchmarking Tool</h3>
              <p className="text-gray-600 mb-4">Compare your institution with peers and leaders</p>
              <Link to="/benchmarking" className="text-garvi-orange font-semibold hover:text-garvi-gold transition-colors">
                View Dashboard →
              </Link>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center hover-lift">
              <div className="w-12 h-12 bg-garvi-orange rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tutorials</h3>
              <p className="text-gray-600 mb-4">Learn how to use benchmarking tools effectively</p>
              <a href="#tutorials" className="text-garvi-orange font-semibold hover:text-garvi-gold transition-colors">
                View Tutorials →
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 text-garvi-orange">GARVI</div>
              <p className="text-gray-300 mb-4">Gujarat Academic Rating Visualization for Improvement</p>
              <a href="mailto:garvi@gmail.com" className="text-garvi-orange hover:text-garvi-gold transition-colors">
                garvi@gmail.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Tools</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/analytics" className="hover:text-garvi-orange transition-colors">Analytics Tool</Link></li>
                <li><a href="#" className="hover:text-garvi-orange transition-colors">Benchmarking</a></li>
                <li><a href="#simulator" className="hover:text-garvi-orange transition-colors">Simulator</a></li>
                <li><a href="#tutorials" className="hover:text-garvi-orange transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-garvi-orange transition-colors">User Guide</a></li>
                <li><a href="#" className="hover:text-garvi-orange transition-colors">Technical Support</a></li>
                <li><a href="#" className="hover:text-garvi-orange transition-colors">Training Resources</a></li>
                <li><Link to="/" className="hover:text-garvi-orange transition-colors">Back to Home</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
              <p>&copy; 2024 GARVI Simulator Tool. All rights reserved.</p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span>Developed by <span className="text-garvi-orange">ICARE</span></span>
                <span>•</span>
                <span><span className="text-garvi-orange">Government of Gujarat</span></span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div id="notification-modal" className="notification-modal">
        <div className="notification-content">
          <div id="notification-icon" className="text-4xl mb-4" />
          <h3 id="notification-title" className="text-lg font-semibold mb-2" />
          <p id="notification-message" className="text-gray-600 mb-4" />
          <button id="notification-close" className="bg-garvi-orange text-white px-6 py-2 rounded-lg hover:bg-garvi-gold transition-colors">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
