import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import { useLanguage } from '../context/LanguageContext';
import {
  BarChart3,
  PieChart,
  Activity,
  Mail,
  Phone,
  Users,
  ArrowRight,
  BookOpen,
  Award,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [currentYear] = useState(() => new Date().getFullYear());
  const { t } = useLanguage();

  const homeSchemas = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'GovernmentOrganization',
      name: 'GARVI — Gujarat Academic Ratings Visualization for Improvement',
      alternateName: 'GSIRF Portal',
      url: 'https://garvi-inky.vercel.app/',
      logo: 'https://garvi-inky.vercel.app/kcg_gujarat_transparent.png',
      description: 'Official higher education rating, institutional benchmarking and analytics platform under Education Department, Government of Gujarat.',
      parentOrganization: {
        '@type': 'GovernmentOrganization',
        name: 'Knowledge Consortium of Gujarat (KCG)',
        url: 'https://kcg.gujarat.gov.in/'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        addressCountry: 'IN'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'GARVI Gujarat Academic Ratings',
      url: 'https://garvi-inky.vercel.app/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://garvi-inky.vercel.app/analytics?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is GARVI?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'GARVI (Gujarat Academic Ratings Visualization for Improvement) is the official analytics and institutional benchmarking platform powering the Gujarat State Institutional Rating Framework (GSIRF) for over 470 universities and colleges.'
          }
        },
        {
          '@type': 'Question',
          name: 'How does the GSIRF 2026 Simulator work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The GSIRF Simulator enables colleges to perform what-if scenario planning by adjusting faculty ratio, research papers, PhD faculty, and student strength to project anticipated star rating and rank changes.'
          }
        },
        {
          '@type': 'Question',
          name: 'Can institutions compare their metrics against other colleges?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, the Peer Benchmarking tool lets institutions compare up to 3 colleges side-by-side across TLR, Research & IPR, Graduation Outcomes, and Outreach & Inclusivity.'
          }
        }
      ]
    }
  ], []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans relative overflow-x-hidden">
      <Seo
        title="Gujarat Academic Ratings Visualization for Improvement | GSIRF 2026"
        description="Official GSIRF analytics, institutional benchmarking, and predictive simulator for 470+ universities and colleges across Gujarat."
        keywords="GARVI, GSIRF, Gujarat Higher Education, NIRF Gujarat, Gujarat College Ratings, Gujarat University Rankings, KCG, Academic Benchmarking"
        schemas={homeSchemas}
      />
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
              {t('home.badge', 'Government of Gujarat Initiative')} • {t('home.subBadge', 'Education Department')}
            </span>
            <span className="text-xs text-amber-600 font-bold px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200">
              GSIRF
            </span>
          </div>

          {/* Transparent Gujarat Map & KCG Emblem */}
          <div className="mb-6 fade-in stagger-1">
            <div className="inline-block relative">
              <picture>
                <source srcSet="/kcg_gujarat_transparent.webp" type="image/webp" />
                <img
                  src="/kcg_gujarat_transparent.png"
                  alt="GARVI Gujarat Emblem"
                  className="mx-auto h-24 md:h-32 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                  width={480}
                  height={273}
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                  }}
                />
              </picture>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 fade-in stagger-2">
            <span className="text-gradient-garvi block text-5xl sm:text-6xl md:text-7xl mb-1">GARVI</span>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 max-w-3xl mx-auto block leading-snug">
              {t('home.heroTitlePrefix', 'Empowering Gujarat Higher Education with')}{' '}
              <span className="text-garvi-orange underline decoration-amber-300 decoration-wavy decoration-2">
                {t('home.heroTitleHighlight', 'Data-Driven Excellence')}
              </span>
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed fade-in stagger-4">
            {t('home.heroSubtitle', 'GARVI (Gujarat Academic Ratings Visualization for Improvement) is the official state analytics & institutional benchmarking engine powering GSIRF 2026 for 470+ universities and colleges.')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <Link
              to="/analytics"
              className="btn-garvi text-base w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              <span>{t('home.exploreAnalytics', 'Explore Analytics')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-xl border border-slate-300 bg-white/90 text-slate-800 font-bold hover:bg-slate-50 hover:border-garvi-orange hover:text-garvi-orange transition-all duration-200 w-full sm:w-auto shadow-xs text-base"
            >
              {t('home.instituteLogin', 'Institute Login')}
            </Link>
          </div>

          {/* Micro Trust Strip */}
          <div className="mt-14 pt-8 border-t border-slate-200/60 max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {t('home.verifiedInstitutions', '470+ Institutions Evaluated')}
            </span>
            <span className="h-3 w-px bg-slate-300 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-garvi-orange" />
              {t('home.dataCollectionOpen', 'GSIRF 2026 Data Collection Open')}
            </span>
            <span className="h-3 w-px bg-slate-300 hidden sm:block" />
            <span className="text-slate-600 font-semibold">
              {t('home.deadlineNotice', 'Deadline: 31 July 2026')}
            </span>
          </div>
        </div>
      </section>

      {/* 4 Pillars of GSIRF */}
      <section id="pillars" className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-garvi-orange bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200/60">
              {t('pillars.weightage', 'Weightage')} • GSIRF Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {t('home.pillarsTitle', 'The 4 Core Pillars of GSIRF Rating')}
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              {t('home.pillarsSubtitle', 'Gujarat State Institutional Rating Framework evaluates academic excellence across four internationally benchmarked core dimensions.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                code: 'TLR',
                weight: '30%',
                title: t('pillars.tlr', 'Teaching, Learning & Resources'),
                desc: t('pillars.tlrDesc', 'Faculty-student ratio, faculty with PhD, financial resource utilization, and modern lab facilities.'),
                icon: BookOpen,
                borderColor: 'border-amber-200 hover:border-amber-400',
                badgeColor: 'bg-amber-100 text-amber-800'
              },
              {
                code: 'RPC',
                weight: '30%',
                title: t('pillars.rp', 'Research & Professional Practice'),
                desc: t('pillars.rpDesc', 'Scopus/WoS publications, citations, IPR patents granted, and sponsored research funding.'),
                icon: TrendingUp,
                borderColor: 'border-blue-200 hover:border-blue-400',
                badgeColor: 'bg-blue-100 text-blue-800'
              },
              {
                code: 'GO',
                weight: '20%',
                title: t('pillars.go', 'Graduation Outcomes'),
                desc: t('pillars.goDesc', 'Median placement salary, percentage of students placed, higher education progression, and university exams.'),
                icon: Award,
                borderColor: 'border-emerald-200 hover:border-emerald-400',
                badgeColor: 'bg-emerald-100 text-emerald-800'
              },
              {
                code: 'OI',
                weight: '20%',
                title: t('pillars.oi', 'Outreach & Inclusivity'),
                desc: t('pillars.oiDesc', 'Gender diversity ratio, students from outside Gujarat, economically/socially challenged student scholarships.'),
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
                      {pillar.weight} {t('pillars.weightage', 'Weightage')}
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
                  <span>{t('home.launchModule', 'Explore Metrics')}</span>
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
              {t('home.toolkitTitle', 'The GARVI Intelligence Toolkit')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
              {t('home.toolkitSubtitle', 'Comprehensive multi-dimensional intelligence built for Gujarat Vice-Chancellors, Principals, and Education Administrators.')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t('modules.analyticsTitle', 'Executive Analytics'),
                badge: 'PowerBI',
                badgeColor: 'bg-emerald-100 text-emerald-800',
                desc: t('modules.analyticsDesc', 'Statewide interactive dashboards, star distribution, and pillar performance metrics powered by PowerBI.'),
                route: '/analytics',
                icon: BarChart3,
                buttonText: t('home.exploreAnalytics', 'Open Analytics'),
                features: ['Comprehensive PowerBI Dashboards', 'Rank & Score Visualizations', 'Parameter-Level Trend Analysis']
              },
              {
                title: t('modules.benchmarkingTitle', 'Institutional Benchmarking'),
                badge: 'Comparative',
                badgeColor: 'bg-blue-100 text-blue-800',
                desc: t('modules.benchmarkingDesc', 'Head-to-head peer comparisons across Teaching, Research, Placements, and Infrastructure metrics.'),
                route: '/benchmarking',
                icon: PieChart,
                buttonText: t('nav.benchmarking', 'Launch Benchmarking'),
                features: ['Peer Gap Identification', 'State Average Comparisons', 'Key Indicator Radar Charts']
              },
              {
                title: t('modules.simulatorTitle', 'GSIRF 2026 Simulator'),
                badge: 'Predictive',
                badgeColor: 'bg-purple-100 text-purple-800',
                desc: t('modules.simulatorDesc', 'Predict your star rating by adjusting faculty counts, PhD staff, research publications, and lab budgets in real time.'),
                route: '/simulator',
                icon: Activity,
                buttonText: t('nav.simulator', 'Launch Simulator'),
                features: ['Real-Time Star Impact', 'Sensitivity & Goal Modeling', 'Download Strategy Action Plan']
              }
            ].map((tool, i) => {
              const Icon = tool.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover-lift transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-garvi-orange">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{tool.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{tool.desc}</p>
                    <ul className="space-y-2 mb-8 border-t border-slate-100 pt-5">
                      {tool.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={tool.route}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-gradient-to-r hover:from-garvi-orange hover:to-garvi-gold hover:text-white transition-all shadow-xs"
                  >
                    <span>{tool.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statewide Impact Metrics Strip */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-400">470+</div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">{t('home.statsInstitutions', 'Rated Institutions')}</div>
              <p className="text-[11px] text-slate-400">{t('home.statsInstitutionsSub', 'Universities & Colleges in Gujarat')}</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-400">28</div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">{t('home.statsStars', '5-Star Institutions')}</div>
              <p className="text-[11px] text-slate-400">{t('home.statsStarsSub', 'Highest institutional excellence tier')}</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-400">₹6.4 LPA</div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">{t('home.statsMedian', 'Avg. Placement Package')}</div>
              <p className="text-[11px] text-slate-400">{t('home.statsMedianSub', 'Statewide professional benchmark')}</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-400">100%</div>
              <div className="text-xs sm:text-sm font-bold text-slate-200">{t('home.statsCompliance', 'Digital Submissions')}</div>
              <p className="text-[11px] text-slate-400">{t('home.statsComplianceSub', 'GSIRF 2026 verification progress')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-amber-950/90 to-slate-900 p-8 sm:p-12 text-center shadow-xl border border-amber-900/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-garvi-orange/20 rounded-full blur-3xl pointer-events-none" />
            <span className="inline-block text-xs uppercase tracking-widest font-extrabold text-amber-400 mb-3 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
              Government of Gujarat • GSIRF 2026
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              {t('home.ctaTitle', 'Ready to benchmark your institution?')}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
              {t('home.ctaSubtitle', 'Access institutional rankings, predictive simulations, and accreditation gap reports directly.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="btn-garvi text-sm w-full sm:w-auto shadow-md"
              >
                <span>{t('home.accessPortal', 'Access College Portal')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admin"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20 w-full sm:w-auto"
              >
                {t('home.adminAccess', 'Admin Scrutiny Panel')}
              </Link>
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
                {t('home.heroSubtitle', 'Gujarat Academic Ratings Visualization for Improvement. A data-driven analytics and institutional improvement initiative under the Gujarat State Institutional Rating Framework.')}
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
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                {t('nav.brandSub', 'Platform Navigation')}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/" className="hover:text-garvi-orange transition-colors">{t('nav.home', 'Home')}</Link></li>
                <li><Link to="/analytics" className="hover:text-garvi-orange transition-colors">{t('nav.analytics', 'Analytics')}</Link></li>
                <li><Link to="/benchmarking" className="hover:text-garvi-orange transition-colors">{t('nav.benchmarking', 'Benchmarking')}</Link></li>
                <li><Link to="/simulator" className="hover:text-garvi-orange transition-colors">{t('nav.simulator', 'Simulator')}</Link></li>
                <li><Link to="/dashboard" className="hover:text-garvi-orange transition-colors">{t('dashboard.institutionalScorecard', 'Dashboard')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                {t('home.adminAccess', 'Portals & Access')}
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><Link to="/login" className="hover:text-garvi-orange transition-colors">{t('nav.login', 'Institutional Login')}</Link></li>
                <li><Link to="/admin" className="hover:text-garvi-orange transition-colors">{t('nav.adminPortal', 'State Admin Portal')}</Link></li>
                <li><a href="https://kcg.gujarat.gov.in" target="_blank" rel="noreferrer" className="hover:text-garvi-orange transition-colors">{t('common.kcgTitle', 'Knowledge Consortium of Gujarat (KCG)')}</a></li>
                <li><a href="https://gujgov.edu.in" target="_blank" rel="noreferrer" className="hover:text-garvi-orange transition-colors">{t('common.deptHigherEd', 'Education Dept., Govt. of Gujarat')}</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {currentYear} GARVI. {t('common.allRightsReserved', 'All rights reserved.')}</p>
            <div className="flex items-center gap-4 text-slate-400">
              <span>Developed by <strong className="text-slate-200">ICARE</strong></span>
              <span>•</span>
              <span><strong className="text-slate-200">{t('common.govGujarat', 'Government of Gujarat')}</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
