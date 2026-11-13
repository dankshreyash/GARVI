import { Link } from 'react-router-dom';
import { ArrowLeft, Scale } from 'lucide-react';
import Seo from '../components/Seo';

export default function Terms() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      <Seo
        title="Terms of Service & Usage Guidelines"
        description="Terms of service, institutional code of conduct, and evaluation conditions for the GARVI GSIRF platform."
      />

      <header className="glass sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">Terms &amp; Conditions</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-garvi-orange">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold mb-3">
              <Scale className="w-3.5 h-3.5 text-garvi-orange" />
              <span>State Accreditation Terms &amp; Conditions</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last Updated: November 2026 • Knowledge Consortium of Gujarat (KCG)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              By accessing, browsing, or signing into the GARVI platform (https://garvi-inky.vercel.app/), participating colleges, universities, faculty, and administrators agree to be bound by these Terms of Service and official GSIRF operating guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Institutional Data Accuracy &amp; Integrity</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Participating institutions represent and warrant that all figures submitted (faculty counts, NIRF documentation, research citations, exam progression, placements, and expenditure reports) are authentic, verified by the head of the institution, and backed by verifiable records. Submitting falsified data constitutes grounds for rating revocation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Digital Accreditation Badges &amp; Embeds</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Colleges granted official star ratings (5-Star, 4-Star, 3-Star, 2-Star) are authorized to display official GARVI/GSIRF verifiable badges on their websites. Altering the cryptographic embed code or misrepresenting star grades is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Intellectual Property</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              The GARVI algorithm, interactive simulation weights, scoring methodologies, and visual designs are the intellectual property of Knowledge Consortium of Gujarat (KCG), Education Department, Government of Gujarat.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-sm font-bold text-slate-900">Official Inquiries</h2>
            <p className="text-xs text-slate-500">
              For regulatory clarifications or legal questions, contact:<br />
              Education Department, Government of Gujarat • Email: garvisupport@gmail.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
