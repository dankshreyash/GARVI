import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  BarChart3,
  PieChart,
  Activity,
  Mail,
  Phone,
  ShieldCheck,
  Users,
  ArrowRight,
  BookOpen,
  Award,
  TrendingUp,
  Building2,
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [currentYear] = useState(() => new Date().getFullYear());

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-gradient-to-b from-amber-50/40 via-white to-slate-50 overflow-hidden">
        {/* Ambient Glows */}
        <div className="hero-glow top-0 left-1/2 -translate-x-1/2 -translate-y-1/3" />
        <div className="absolute top-20 right-[-100px] w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-[-100px] w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Government Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-200/80 shadow-xs mb-8 fade-in">
            <span className="flex h-2 w-2 rounded-full bg-garvi-orange animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-wide">
              Education Department • Government of Gujarat
            </span>
            <span className="text-xs text-amber-600 font-bold px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
              GSIRF
            </span>
          </div>

          {/* Emblem & Branding */}
          <div className="mb-6 fade-in stagger-1">
            <div className="inline-block relative">
              <img
                src="https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png"
                alt="GARVI Emblem"
                className="mx-auto h-24 md:h-32 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                width={480}
                height={273}
              />
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-4 fade-in stagger-2">
            <span className="text-gradient-garvi">GARVI</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 max-w-3xl mx-auto mb-6 leading-snug fade-in stagger-3">
            Gujarat Academic Ratings Visualization for Improvement
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed fade-in stagger-4">
            A comprehensive data-driven institutional analytics engine under the <span className="font-semibold text-slate-800">Gujarat State Institutional Rating Framework (GSIRF)</span>, empowering universities and colleges with transparent ratings, benchmarking, and predictive growth simulations.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <Link
              to="/analytics"
              className="btn-garvi text-base w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              <span>Explore Analytics Tool</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/benchmarking"
              className="btn-outline-garvi text-base w-full sm:w-auto hover:shadow-sm"
            >
              <PieChart className="w-4 h-4" />
              <span>Benchmarking</span>
            </Link>
            <Link
              to="/simulator"
              className="btn-outline-garvi text-base w-full sm:w-auto hover:shadow-sm"
            >
              <Activity className="w-4 h-4" />
              <span>Performance Simulator</span>
            </Link>
          </div>

          {/* Verified Framework Stats Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: 'Core Pillars', value: '4', sub: 'TLR, RPC, GO, OI', icon: Award, color: 'text-amber-600 bg-amber-50' },
              { label: 'GSIRF Indicators', value: '16', sub: 'Performance Metrics', icon: PieChart, color: 'text-blue-600 bg-blue-50' },
              { label: 'Institutions Evaluated', value: '470+', sub: 'Across Gujarat', icon: Building2, color: 'text-emerald-600 bg-emerald-50' },
              { label: 'Data Framework', value: '100%', sub: 'Objective & Verified', icon: ShieldCheck, color: 'text-purple-600 bg-purple-50' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/80 shadow-xs hover-lift text-left flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">GSIRF</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-700 mt-0.5">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4 Core GSIRF Pillars Section */}
      <section className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-garvi-orange bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/60">
              Evaluation Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              The 4 Pillars of GSIRF Excellence
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              GARVI evaluates higher education institutions across four standardized pillars designed to measure holistic academic strength and societal impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                code: 'TLR',
                weight: '30%',
                title: 'Teaching, Learning & Resources',
                desc: 'Faculty-student ratios, PhD qualifications, physical & digital library infrastructure, and annual expenditure per student.',
                icon: BookOpen,
                borderColor: 'border-amber-200 hover:border-amber-400',
                badgeColor: 'bg-amber-100 text-amber-800'
              },
              {
                code: 'RPC',
                weight: '30%',
                title: 'Research & Professional Practice',
                desc: 'Indexed publications (Scopus / Web of Science), citation impact, research grants from state/central bodies, and IPR patents.',
                icon: TrendingUp,
                borderColor: 'border-blue-200 hover:border-blue-400',
                badgeColor: 'bg-blue-100 text-blue-800'
              },
              {
                code: 'GO',
                weight: '20%',
                title: 'Graduation Outcomes',
                desc: 'Annual university exam pass percentages, median placement packages, campus placements, and progression to higher studies.',
                icon: Award,
                borderColor: 'border-emerald-200 hover:border-emerald-400',
                badgeColor: 'bg-emerald-100 text-emerald-800'
              },
              {
                code: 'OI',
                weight: '20%',
                title: 'Outreach & Inclusivity',
                desc: 'Diversity of students from outside Gujarat, gender balance, facilities for differently-abled students, and regional initiatives.',
                icon: Users,
                borderColor: 'border-purple-200 hover:border-purple-400',
                badgeColor: 'bg-purple-100 text-purple-800'
              }
            ].map((pillar, i) => (
              <div
                key={i}
                className={`bg-slate-50/70 rounded-2xl p-6 border ${pillar.borderColor} hover-lift transition-all flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-black text-slate-900 tracking-tight">{pillar.code}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${pillar.badgeColor}`}>
                      {pillar.weight} Weightage
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-semibold text-garvi-orange">
                  <span>Explore Metrics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Showcase */}
      <section id="tools" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-garvi-orange bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/60">
              Institutional Toolkit
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              Integrated Analytics &amp; Planning Suite
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              State-of-the-art interactive dashboards and scenario modeling tools designed to guide strategic decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Analytics Dashboard',
                badge: 'Live Data',
                badgeColor: 'bg-emerald-100 text-emerald-800',
                desc: 'Real-time performance analytics, parameter breakdowns, and historical rating trends for all 470+ Gujarat institutions.',
                route: '/analytics',
                icon: BarChart3,
                buttonText: 'Open Analytics',
                features: ['Comprehensive PowerBI Dashboards', 'Rank & Score Visualizations', 'Parameter-Level Trend Analysis']
              },
              {
                title: 'Peer Benchmarking Tool',
                badge: 'Comparative',
                badgeColor: 'bg-blue-100 text-blue-800',
                desc: 'Direct head-to-head performance comparisons against peer institutions and state benchmark averages.',
                route: '/benchmarking',
                icon: PieChart,
                buttonText: 'Launch Benchmarking',
                features: ['Peer Gap Identification', 'State Average Comparisons', 'Key Indicator Radar Charts']
              },
              {
                title: 'Performance Simulator',
                badge: 'Predictive',
                badgeColor: 'bg-purple-100 text-purple-800',
                desc: 'Simulate strategic decisions—test how changes in faculty hiring, publications, or placements will shift your rating score.',
                route: '/simulator',
                icon: Activity,
                buttonText: 'Run Simulator',
                features: ['What-If Scenario Planning', 'Weak Indicator Diagnosis', 'Projected Rank Modeling']
              }
            ].map((tool, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover-lift p-8 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-garvi-orange to-garvi-gold flex items-center justify-center text-white shadow-sm">
                      <tool.icon className="w-7 h-7" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{tool.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">{tool.desc}</p>

                  <ul className="space-y-2.5 mb-8">
                    {tool.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={tool.route}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-xs transition-opacity"
                >
                  <span>{tool.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose & About Section */}
      <section id="about" className="py-20 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-garvi-orange bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/60">
                Institutional Mission
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight leading-tight">
                Catalyzing Academic Excellence Across Gujarat
              </h2>
              <p className="text-base text-slate-600 mt-4 leading-relaxed">
                GARVI serves as the flagship digital platform for the Gujarat State Institutional Rating Framework (GSIRF), an initiative spearheaded by the Knowledge Consortium of Gujarat (KCG) and the Department of Higher Education.
              </p>
              <p className="text-base text-slate-600 mt-3 leading-relaxed">
                By making institutional performance transparent and actionable, GARVI helps universities identify weak indicators, allocate funding where it matters most, and drive continuous academic improvement.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="btn-garvi text-sm"
                >
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/admin"
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm text-slate-700 hover:bg-slate-50 transition"
                >
                  State Admin Portal
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-500/10 rounded-3xl p-8 border border-amber-200/70 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Key Framework Advantages</h3>
              {[
                { title: 'Standardized Ratings', desc: 'Normalized across disciplines including Engineering, Management, Pharmacy, and General Universities.' },
                { title: 'Objective Data Validation', desc: 'Cross-verified through institutional submissions, university records, and national research databases.' },
                { title: 'Continuous Improvement', desc: 'Year-round benchmarking and simulation tools to help institutions track progress between cycles.' },
                { title: 'Direct Policy Insights', desc: 'Empowers state education authorities with real-time district and institutional performance metrics.' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-garvi-orange tracking-tight">GARVI</span>
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  GSIRF
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Gujarat Academic Ratings Visualization for Improvement. A data-driven analytics and institutional improvement initiative under the Gujarat State Institutional Rating Framework.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 text-xs font-medium text-slate-300">
                <a href="mailto:garvisupport@gmail.com" className="flex items-center gap-2 hover:text-garvi-orange transition-colors">
                  <Mail className="w-4 h-4 text-garvi-orange" />
                  <span>garvisupport@gmail.com</span>
                </a>
                <a href="tel:+918147556654" className="flex items-center gap-2 hover:text-garvi-orange transition-colors">
                  <Phone className="w-4 h-4 text-garvi-orange" />
                  <span>+91 81475 56654</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Platform Navigation</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/" className="hover:text-garvi-orange transition-colors">Home</Link></li>
                <li><Link to="/analytics" className="hover:text-garvi-orange transition-colors">Analytics Tool</Link></li>
                <li><Link to="/benchmarking" className="hover:text-garvi-orange transition-colors">Peer Benchmarking</Link></li>
                <li><Link to="/simulator" className="hover:text-garvi-orange transition-colors">Performance Simulator</Link></li>
                <li><Link to="/dashboard" className="hover:text-garvi-orange transition-colors">Institutional Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Portals &amp; Access</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/login" className="hover:text-garvi-orange transition-colors">Institutional Login</Link></li>
                <li><Link to="/admin" className="hover:text-garvi-orange transition-colors">State Admin Portal</Link></li>
                <li><a href="https://kcg.gujarat.gov.in" target="_blank" rel="noreferrer" className="hover:text-garvi-orange transition-colors">Knowledge Consortium of Gujarat (KCG)</a></li>
                <li><a href="https://gujgov.edu.in" target="_blank" rel="noreferrer" className="hover:text-garvi-orange transition-colors">Education Dept., Govt. of Gujarat</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {currentYear} GARVI. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Developed by <strong className="text-slate-200">ICARE</strong></span>
              <span>•</span>
              <span><strong className="text-slate-200">Government of Gujarat</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
