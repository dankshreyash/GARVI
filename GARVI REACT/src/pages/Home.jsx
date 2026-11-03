import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BarChart3, PieChart, Activity, Mail, Phone, ShieldCheck, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <a href="https://im.ge/i/GARVI-symbol.ngltcP" target="_blank" rel="noopener noreferrer">
              <img
                src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png"
                alt="GARVI symbol"
                className="mx-auto mb-6 h-24 md:h-32 object-contain fade-in stagger-1"
                width={480}
                height={273}
              />
            </a>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in stagger-2">
              <span className="text-garvi-orange">GARVI</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800 fade-in stagger-3">
              Gujarat Academic Ratings Visualization for Improvement
            </h2>
            <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-gray-600 fade-in stagger-4">
              A comprehensive data-driven analytics platform under the Gujarat State Institutional Rating Framework (GSIRF)
              for educational excellence and institutional improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
              <Link
                to="/analytics"
                className="btn-outline-garvi text-center"
              >
                Analytics
              </Link>
              <Link
                to="/benchmarking"
                className="btn-outline-garvi text-center"
              >
                Benchmarking
              </Link>
              <Link
                to="/simulator"
                className="btn-outline-garvi text-center"
              >
                Simulator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-black">About GARVI</h2>
              <div className="h-1 bg-garvi-orange mt-3" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 fade-in">
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-6 text-garvi-orange">Purpose</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                GARVI serves as the cornerstone of educational analytics in Gujarat, providing institutions with powerful
                tools to visualize, analyze, and improve their academic performance through data-driven insights.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Built under the Gujarat State Institutional Rating Framework (GSIRF), GARVI empowers educational
                institutions to benchmark their performance, identify improvement areas, and simulate strategic decisions
                for enhanced academic outcomes.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-bold text-garvi-orange">Key Features</h4>
                <span className="px-3 py-1 text-xs rounded-full bg-garvi-orange/10 text-garvi-orange font-medium">
                  GSIRF Ready
                </span>
              </div>
              <div className="space-y-4">
                {[{
                  label: 'Real-time performance analytics',
                }, {
                  label: 'Comprehensive benchmarking tools',
                }, {
                  label: 'Strategic decision simulation',
                }, {
                  label: 'Interactive data visualization',
                }, {
                  label: 'Institutional improvement tracking',
                }].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-garvi-orange/10 text-garvi-orange">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-gray-700">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[{
              label: 'Parameters',
              value: '4',
              icon: BarChart3,
            }, {
              label: 'Indicators',
              value: '16',
              icon: PieChart,
            }, {
              label: 'Institutions',
              value: '470',
              icon: Users,
            }].map((kpi, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100 fade-in">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-garvi-orange/10 text-garvi-orange">
                  <kpi.icon className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-sm text-gray-500">{kpi.label}</div>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Our Tools</h2>
              <div className="h-1 bg-garvi-orange mt-2" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[{
              title: 'Analytics Tool',
              desc: 'Comprehensive data analysis and visualization platform for institutional performance metrics and trends.',
              route: '/analytics',
              icon: BarChart3,
            }, {
              title: 'Benchmarking',
              desc: 'Compare your institution&#39;s performance against state and national standards with detailed benchmarking reports.',
              route: '/benchmarking',
              icon: PieChart,
            }, {
              title: 'Simulator',
              desc: 'Model different scenarios and strategic decisions to predict their impact on institutional ratings and performance.',
              route: '/simulator',
              icon: Activity,
            }, {
              title: 'Advanced Analytics',
              desc: 'Deep-dive analytics with AI-powered insights, predictive modeling, and advanced statistical analysis tools.',
              route: '#advanced',
              icon: ShieldCheck,
            }].map((tool, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl p-8 card-hover border border-gray-100 hover-lift fade-in">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-2xl flex items-center justify-center mx-auto mb-4 icon-bounce">
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{tool.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">{tool.desc}</p>
                <div className="text-center">
                  <Link
                    to={tool.route}
                    className="inline-flex items-center bg-garvi-orange text-white px-6 py-3 rounded-xl font-semibold hover:bg-garvi-gold transition-all duration-300"
                  >
                    Explore {tool.title}
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block">
              <h2 className="text-3xl md:text-4xl font-bold text-black">Vision &amp; Mission</h2>
              <div className="h-1 bg-garvi-orange mt-3" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {[{
              title: 'Our Vision',
              text: 'To establish Gujarat as a leader in educational excellence through data-driven insights, empowering institutions to achieve world-class standards and fostering a culture of continuous improvement in academic performance.',
            }, {
              title: 'Our Mission',
              text: 'To provide comprehensive, user-friendly analytical tools that enable educational institutions to visualize performance data, benchmark against standards, and make informed strategic decisions for sustainable academic growth and excellence.',
            }].map((item, i) => (
              <div key={i} className="text-center bg-white p-8 rounded-2xl shadow-xl card-hover fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-garvi-orange to-garvi-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-garvi-orange">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold mb-4 text-garvi-orange">GARVI</div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Gujarat Academic Ratings Visualization for Improvement - Empowering educational institutions through data-driven analytics and strategic insights under the Gujarat State Institutional Rating Framework.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <a href="mailto:garvi@gmail.com" className="inline-flex items-center gap-2 text-garvi-orange hover:text-garvi-gold transition-colors">
                  <Mail className="w-5 h-5" /> garvi@gmail.com
                </a>
                <a href="tel:9573978391" className="inline-flex items-center gap-2 text-garvi-orange hover:text-garvi-gold transition-colors">
                  <Phone className="w-5 h-5" /> 9573978391
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/" className="hover:text-garvi-orange transition-colors">Home</Link></li>
                <li><Link to="/" className="hover:text-garvi-orange transition-colors">About GARVI</Link></li>
                <li><Link to="/tools" className="hover:text-garvi-orange transition-colors">Our Tools</Link></li>
                <li><Link to="/vision" className="hover:text-garvi-orange transition-colors">Vision &amp; Mission</Link></li>
                <li><a href="#" className="hover:text-garvi-orange transition-colors">GSIRF</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Tools</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/analytics" className="hover:text-garvi-orange transition-colors">Analytics Tool</Link></li>
                <li><Link to="/benchmarking" className="hover:text-garvi-orange transition-colors">Benchmarking</Link></li>
                <li><Link to="/simulator" className="hover:text-garvi-orange transition-colors">Simulator</Link></li>
                <li><a href="#" className="hover:text-garvi-orange transition-colors">Advanced Analytics</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                <p>© <span id="yearSpan" /> GARVI. All rights reserved.</p>
              </div>
              <div className="flex items-center space-x-6 text-gray-400">
                <span>Developed by <span className="text-garvi-orange font-semibold">ICARE</span></span>
                <span>•</span>
                <span><span className="text-garvi-orange font-semibold">Government of Gujarat</span></span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

