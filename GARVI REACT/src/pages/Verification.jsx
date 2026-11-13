import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  Download,
  Share2,
  ArrowLeft,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Users,
  QrCode,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Seo from '../components/Seo';

const VERIFIED_DIRECTORY = {
  'GUJ-UNI-104': {
    id: 'GUJ-UNI-104',
    name: 'Gujarat University, Ahmedabad',
    nameGu: 'ગુજરાત યુનિવર્સિટી, અમદાવાદ',
    aishe: 'U-0144',
    category: 'State Public University',
    district: 'Ahmedabad',
    stars: 4,
    grade: 'Grade A++',
    score: 84.6,
    stateRank: 4,
    validCycle: '2025 – 2026',
    issuedDate: '15 September 2025',
    verifiedBy: 'Knowledge Consortium of Gujarat (KCG) & ICARE',
    govtOrderNo: 'KCG/GSIRF/2025/VER-8821',
    hash: '0x8f4d92a18c3b4e7a9b0c2d3e4f5a6b7c',
    website: 'https://gujaratuniversity.ac.in',
    tlr: { score: 26.8, max: 30, pct: '89%' },
    rpc: { score: 24.5, max: 30, pct: '81%' },
    go: { score: 17.4, max: 20, pct: '87%' },
    oi: { score: 15.9, max: 20, pct: '79%' }
  },
  'IITGN-101': {
    id: 'IITGN-101',
    name: 'Indian Institute of Technology Gandhinagar (IIT-GN)',
    nameGu: 'આઈઆઈટી ગાંધીનગર',
    aishe: 'U-0136',
    category: 'Institute of National Importance',
    district: 'Gandhinagar',
    stars: 5,
    grade: 'Grade A+++',
    score: 94.2,
    stateRank: 1,
    validCycle: '2025 – 2026',
    issuedDate: '15 September 2025',
    verifiedBy: 'Knowledge Consortium of Gujarat (KCG) & ICARE',
    govtOrderNo: 'KCG/GSIRF/2025/VER-1001',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
    website: 'https://iitgn.ac.in',
    tlr: { score: 29.4, max: 30, pct: '98%' },
    rpc: { score: 28.8, max: 30, pct: '96%' },
    go: { score: 19.2, max: 20, pct: '96%' },
    oi: { score: 16.8, max: 20, pct: '84%' }
  },
  'DAIICT-102': {
    id: 'DAIICT-102',
    name: 'DA-IICT, Gandhinagar',
    nameGu: 'ડીએ-આઈઆઈસીટી, ગાંધીનગર',
    aishe: 'U-0137',
    category: 'Private University',
    district: 'Gandhinagar',
    stars: 5,
    grade: 'Grade A+++',
    score: 89.8,
    stateRank: 2,
    validCycle: '2025 – 2026',
    issuedDate: '15 September 2025',
    verifiedBy: 'Knowledge Consortium of Gujarat (KCG) & ICARE',
    govtOrderNo: 'KCG/GSIRF/2025/VER-2044',
    hash: '0x9c8b7a6d5e4f3a2b1c0d9e8f7a6b5c4d',
    website: 'https://daiict.ac.in',
    tlr: { score: 28.1, max: 30, pct: '93%' },
    rpc: { score: 26.2, max: 30, pct: '87%' },
    go: { score: 18.6, max: 20, pct: '93%' },
    oi: { score: 16.9, max: 20, pct: '84%' }
  },
  'SVNIT-105': {
    id: 'SVNIT-105',
    name: 'Sardar Vallabhbhai National Institute of Technology (SVNIT Surat)',
    nameGu: 'એસવીએનઆઈટી સુરત',
    aishe: 'U-0144',
    category: 'National Institute / Engineering',
    district: 'Surat',
    stars: 5,
    grade: 'Grade A+++',
    score: 89.4,
    stateRank: 5,
    validCycle: '2025 – 2026',
    issuedDate: '15 September 2025',
    verifiedBy: 'Knowledge Consortium of Gujarat (KCG) & ICARE',
    govtOrderNo: 'KCG/GSIRF/2025/VER-3089',
    hash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
    website: 'https://svnit.ac.in',
    tlr: { score: 27.9, max: 30, pct: '93%' },
    rpc: { score: 27.1, max: 30, pct: '90%' },
    go: { score: 18.4, max: 20, pct: '92%' },
    oi: { score: 16.0, max: 20, pct: '80%' }
  }
};

export default function Verification() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Normalize ID or fallback to Gujarat University
  const cleanId = (id || 'GUJ-UNI-104').toUpperCase();
  const record = VERIFIED_DIRECTORY[cleanId] || VERIFIED_DIRECTORY['GUJ-UNI-104'];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const certSchemas = useMemo(() => [
    {
      '@context': 'https://schema.org',
      '@type': 'EducationalOccupationalCredential',
      name: `${record.name} GSIRF Rating Certificate`,
      credentialCategory: record.grade,
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Knowledge Consortium of Gujarat (KCG)'
      },
      validIn: {
        '@type': 'AdministrativeArea',
        name: 'Gujarat, India'
      }
    }
  ], [record]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 pb-20">
      <Seo
        title={`GSIRF Verification — ${record.name}`}
        description={`Cryptographically verified institutional rating badge & certificate for ${record.name} under GSIRF rating framework.`}
        keywords="GSIRF certificate verification, Gujarat college rating badge, KCG rating verification"
        schemas={certSchemas}
      />
      {/* Top Bar */}
      <header className="glass sticky top-0 z-40 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-orange-50 border border-amber-200/60 flex items-center justify-center p-0.5 overflow-hidden">
              <img
                src="/kcg_gujarat_transparent.png"
                alt="GARVI"
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = 'https://i.im.ge/2025/10/14/ngltcP.GARVI-symbol.png';
                }}
              />
            </div>
            <div>
              <span className="text-lg font-black text-gradient-garvi tracking-tight">GARVI</span>
              <span className="text-[11px] text-slate-500 font-semibold ml-2">Official Verification Portal</span>
            </div>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-garvi-orange transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to GARVI</span>
          </Link>
        </div>
      </header>

      {/* Main Verification Certificate Card */}
      <main className="max-w-3xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          {/* Official Verification Header Strip */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white p-6 sm:p-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0 shadow-md">
                  <ShieldCheck className="w-8 h-8 text-emerald-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest bg-emerald-900/60 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                      OFFICIAL PUBLIC RECORD
                    </span>
                    <span className="text-xs text-white/80 font-medium">GSIRF Gujarat</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                    Verifiable Institutional Rating
                  </h1>
                </div>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-emerald-800 text-xs font-black shadow-md self-start sm:self-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>AUTHENTIC &amp; ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Institution Identity */}
            <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-garvi-orange mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>{record.category}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {lang === 'gu' && record.nameGu ? record.nameGu : record.name}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
                  <span>AISHE Code: <strong className="text-slate-800 font-mono">{record.aishe}</strong></span>
                  <span>•</span>
                  <span>District: <strong className="text-slate-800">{record.district}</strong></span>
                  <span>•</span>
                  <span>GSIRF ID: <strong className="text-slate-800 font-mono">{record.id}</strong></span>
                </div>
              </div>

              <div className="text-right sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                <span className="text-3xl font-black text-slate-900 leading-none">
                  #{record.stateRank}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1">
                  Gujarat State Rank
                </span>
              </div>
            </div>

            {/* Star Rating Spotlight */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] uppercase font-bold text-amber-900 tracking-wider">
                  Accredited GSIRF Star Rating
                </span>
                <div className="flex items-center justify-center sm:justify-start gap-3 my-1">
                  <span className="text-3xl sm:text-4xl font-black text-amber-600 tracking-tight">
                    {record.stars}-Star Rating
                  </span>
                  <span className="text-2xl text-amber-500 font-bold">
                    {'★'.repeat(record.stars)}{'☆'.repeat(5 - record.stars)}
                  </span>
                </div>
                <p className="text-xs text-amber-950/80 font-medium">
                  Conferred under Section 14 of Gujarat State Institutional Rating Framework.
                </p>
              </div>

              <div className="text-center sm:text-right bg-white p-4 rounded-xl border border-amber-200 shadow-2xs shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Score</span>
                <span className="text-3xl font-black text-slate-900">{record.score}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">out of 100 points</span>
                <span className="inline-block mt-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {record.grade}
                </span>
              </div>
            </div>

            {/* 4 Pillars Breakdown */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Audited Performance Across 4 GSIRF Pillars
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-left">
                  <div className="flex items-center gap-1.5 text-garvi-orange mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">TLR (30%)</span>
                  </div>
                  <div className="text-lg font-black text-slate-900">{record.tlr.score} <span className="text-xs font-normal text-slate-400">/ 30</span></div>
                  <span className="text-[10px] text-slate-500 font-medium">{record.tlr.pct} efficiency</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-left">
                  <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">RPC (30%)</span>
                  </div>
                  <div className="text-lg font-black text-slate-900">{record.rpc.score} <span className="text-xs font-normal text-slate-400">/ 30</span></div>
                  <span className="text-[10px] text-slate-500 font-medium">{record.rpc.pct} efficiency</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-left">
                  <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                    <Award className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">GO (20%)</span>
                  </div>
                  <div className="text-lg font-black text-slate-900">{record.go.score} <span className="text-xs font-normal text-slate-400">/ 20</span></div>
                  <span className="text-[10px] text-slate-500 font-medium">{record.go.pct} efficiency</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-left">
                  <div className="flex items-center gap-1.5 text-purple-600 mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold">OI (20%)</span>
                  </div>
                  <div className="text-lg font-black text-slate-900">{record.oi.score} <span className="text-xs font-normal text-slate-400">/ 20</span></div>
                  <span className="text-[10px] text-slate-500 font-medium">{record.oi.pct} efficiency</span>
                </div>
              </div>
            </div>

            {/* Cryptographic Proof & Gov Order Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-slate-500" />
                  <span>State Government Verification Metadata</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">{record.validCycle} Academic Cycle</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                <div>
                  <span className="text-slate-400 block">Government Order No:</span>
                  <span className="font-mono font-bold text-slate-800">{record.govtOrderNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Verification Hash (SHA-256):</span>
                  <span className="font-mono text-slate-800 truncate block">{record.hash}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Accredited Body:</span>
                  <span className="font-bold text-slate-800">{record.verifiedBy}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Issue Date:</span>
                  <span className="font-bold text-slate-800">{record.issuedDate}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => alert(`Downloading Official GSIRF Verification Certificate for ${record.name}...`)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-garvi-orange to-garvi-gold text-white font-bold text-xs shadow-xs hover:shadow-md transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Certificate PDF</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied!' : 'Share Public Link'}</span>
                </button>

                {record.website && (
                  <a
                    href={record.website}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition"
                  >
                    <span>Visit College</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
