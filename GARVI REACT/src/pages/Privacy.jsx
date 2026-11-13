import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Seo from '../components/Seo';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      <Seo
        title="Privacy Policy & DPDP Act Compliance"
        description="Official Privacy Policy and Data Protection declaration for GARVI under the Digital Personal Data Protection Act (DPDP Act 2023, India)."
      />

      <header className="glass sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-xl font-black text-gradient-garvi tracking-tight">GARVI</span>
            <span className="text-xs text-slate-500 font-bold hidden sm:inline">Legal &amp; Compliance</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-garvi-orange">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>DPDP Act (India, 2023) &amp; GDPR Compliant</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Effective Date: November 2026 • Knowledge Consortium of Gujarat (KCG) &amp; Education Department
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">1. Commitment to Data Privacy</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              GARVI (Gujarat Academic Ratings Visualization for Improvement) operates under the Knowledge Consortium of Gujarat (KCG), Education Department, Government of Gujarat. We are committed to protecting personal and institutional data in accordance with India’s <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and applicable global data protection principles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">2. Categories of Data Processed</h2>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li><strong>Institutional Credentials &amp; Profiles:</strong> User IDs, AISHE codes, institution names, official emails, and hashed authentication records.</li>
              <li><strong>Academic &amp; Evaluation Data:</strong> GSIRF metric submissions, faculty counts, student strength, research paper counts, and financial allocations submitted for accreditation.</li>
              <li><strong>Technical Metadata:</strong> Anonymized IP addresses, session duration, browser type, and timestamps collected solely for uptime monitoring, intrusion detection, and audit compliance.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">3. Purpose of Processing (Lawful Grounds)</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We process data strictly for lawful government educational purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block mb-0.5">Rating &amp; Benchmarking</span>
                Accrediting institutions across Gujarat according to statutory GSIRF rules.
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-900 block mb-0.5">Verification Integrity</span>
                Providing verifiable digital badges and certificates for public transparency.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">4. Data Rights under DPDP Act 2023</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Institutions and data principals retain the right to:
            </p>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside">
              <li>Request summary and details of institutional personal data held.</li>
              <li>Request correction and updating of inaccurate data through official verification procedures.</li>
              <li>Nominate authorized institutional representatives to manage submission portals.</li>
              <li>Grievance redressal directly through the state evaluation authority.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">5. Security Safeguards</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              All data transmissions are protected via TLS 1.3 HTTPS encryption. Passwords are never stored in plaintext and are hashed using bcrypt with salted rounds. Access to administrator evaluation panels is restricted and recorded in immutable audit logs.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-sm font-bold text-slate-900">Data Protection Officer &amp; Inquiries</h2>
            <p className="text-xs text-slate-500">
              Knowledge Consortium of Gujarat (KCG), Education Department, Government of Gujarat<br />
              Email: <a href="mailto:garvisupport@gmail.com" className="text-garvi-orange underline">garvisupport@gmail.com</a> • Website: https://kcg.gujarat.gov.in/
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
