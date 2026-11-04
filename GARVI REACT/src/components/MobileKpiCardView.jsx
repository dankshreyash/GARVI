import { useState } from 'react';
import {
  Trophy,
  Building2,
  Sparkles,
  Smartphone,
  Monitor,
  ChevronDown,
  CheckCircle2,
  ArrowUpRight,
  BarChart2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const INSTITUTES_DATA = [
  {
    id: 'guj-uni',
    name: 'Gujarat University, Ahmedabad',
    nameGu: 'ગુજરાત યુનિવર્સિટી, અમદાવાદ',
    type: 'State Public University',
    typeGu: 'રાજ્ય જાહેર યુનિવર્સિટી',
    rank: 4,
    prevRank: 6,
    categoryRank: 2,
    totalScore: 84.6,
    stars: 4,
    percentile: 92,
    peersOutperformed: 432,
    tlr: { score: 26.8, max: 30, pct: 89, fsr: '1:14', phd: '82%' },
    rpc: { score: 24.5, max: 30, pct: 81, pubs: 512, patents: 24 },
    go: { score: 17.4, max: 20, pct: 87, placement: '88.5%', medianSalary: '₹6.8 LPA' },
    oi: { score: 15.9, max: 20, pct: 79, outsideState: '14%', femaleRatio: '48%' },
    strengths: ['High Placement Progression', 'PhD Qualified Faculty Strength'],
    strengthsGu: ['ઉચ્ચ પ્લેસમેન્ટ પ્રગતિ', 'પીએચડી લાયકાત ધરાવતી ફેકલ્ટી'],
    growthArea: 'Commercial Patent Filings & IPR Revenue',
    growthAreaGu: 'વાણિજ્યિક પેટન્ટ ફાઇલિંગ અને આઈપીઆર આવક'
  },
  {
    id: 'iit-gn',
    name: 'IIT Gandhinagar',
    nameGu: 'આઈઆઈટી ગાંધીનગર',
    type: 'Institute of National Importance',
    typeGu: 'રાષ્ટ્રીય મહત્વની સંસ્થા',
    rank: 1,
    prevRank: 1,
    categoryRank: 1,
    totalScore: 94.2,
    stars: 5,
    percentile: 99,
    peersOutperformed: 469,
    tlr: { score: 29.4, max: 30, pct: 98, fsr: '1:10', phd: '98%' },
    rpc: { score: 28.8, max: 30, pct: 96, pubs: 840, patents: 62 },
    go: { score: 19.2, max: 20, pct: 96, placement: '96.2%', medianSalary: '₹14.5 LPA' },
    oi: { score: 16.8, max: 20, pct: 84, outsideState: '58%', femaleRatio: '32%' },
    strengths: ['World-Class Research Publications', 'Top Median Placements'],
    strengthsGu: ['વિશ્વસ્તરીય સંશોધન પત્રો', 'ટોચના સરેરાશ પ્લેસમેન્ટ પેકેજ'],
    growthArea: 'Gender Inclusivity Ratio',
    growthAreaGu: 'જાતિ સર્વસમાવેશકતા ગુણોત્તર'
  },
  {
    id: 'daiict',
    name: 'DA-IICT, Gandhinagar',
    nameGu: 'ડીએ-આઈઆઈસીટી, ગાંધીનગર',
    type: 'Private University',
    typeGu: 'ખાનગી યુનિવર્સિટી',
    rank: 2,
    prevRank: 2,
    categoryRank: 1,
    totalScore: 89.8,
    stars: 5,
    percentile: 96,
    peersOutperformed: 454,
    tlr: { score: 28.1, max: 30, pct: 93, fsr: '1:12', phd: '91%' },
    rpc: { score: 26.2, max: 30, pct: 87, pubs: 480, patents: 31 },
    go: { score: 18.6, max: 20, pct: 93, placement: '94.0%', medianSalary: '₹12.0 LPA' },
    oi: { score: 16.9, max: 20, pct: 84, outsideState: '32%', femaleRatio: '38%' },
    strengths: ['Information Tech Research', 'Campus Recruitment Packages'],
    strengthsGu: ['ઇન્ફર્મેશન ટેકનોલોજી સંશોધન', 'કેમ્પસ રિક્રૂટમેન્ટ પેકેજ'],
    growthArea: 'Outreach & Regional Diversity',
    growthAreaGu: 'પ્રાદેશિક વિવિધતા અને આઉટરીચ'
  },
  {
    id: 'nirma',
    name: 'Nirma University, Ahmedabad',
    nameGu: 'નિર્મા યુનિવર્સિટી, અમદાવાદ',
    type: 'Private University',
    typeGu: 'ખાનગી યુનિવર્સિટી',
    rank: 3,
    prevRank: 4,
    categoryRank: 2,
    totalScore: 87.1,
    stars: 5,
    percentile: 94,
    peersOutperformed: 442,
    tlr: { score: 27.5, max: 30, pct: 91, fsr: '1:13', phd: '86%' },
    rpc: { score: 25.8, max: 30, pct: 86, pubs: 530, patents: 28 },
    go: { score: 18.0, max: 20, pct: 90, placement: '91.4%', medianSalary: '₹8.5 LPA' },
    oi: { score: 15.8, max: 20, pct: 79, outsideState: '22%', femaleRatio: '41%' },
    strengths: ['Strong Industry Partnerships', 'High Graduation Rates'],
    strengthsGu: ['મજબૂત ઉદ્યોગ ભાગીદારી', 'ઉચ્ચ સ્નાતક ઉત્તીર્ણ દર'],
    growthArea: 'State & Central Funded Research Grants',
    growthAreaGu: 'સરકારી અનુદાનિત સંશોધન પ્રોજેક્ટ્સ'
  },
  {
    id: 'svnit',
    name: 'SVNIT Surat',
    nameGu: 'એસવીએનઆઈટી સુરત',
    type: 'NIT / Central Govt Funded',
    typeGu: 'એનઆઈટી / કેન્દ્ર સરકાર અનુદાનિત',
    rank: 5,
    prevRank: 5,
    categoryRank: 2,
    totalScore: 89.4,
    stars: 5,
    percentile: 95,
    peersOutperformed: 448,
    tlr: { score: 27.9, max: 30, pct: 93, fsr: '1:12', phd: '94%' },
    rpc: { score: 27.1, max: 30, pct: 90, pubs: 690, patents: 45 },
    go: { score: 18.4, max: 20, pct: 92, placement: '92.5%', medianSalary: '₹10.5 LPA' },
    oi: { score: 16.0, max: 20, pct: 80, outsideState: '50%', femaleRatio: '28%' },
    strengths: ['Doctoral Research Density', 'Engineering Innovation Patents'],
    strengthsGu: ['ડોક્ટરલ સંશોધન ઘનતા', 'એન્જિનિયરિંગ ઇનોવેશન પેટન્ટ્સ'],
    growthArea: 'Campus Gender Balance Enhancement',
    growthAreaGu: 'કેમ્પસ લિંગ સંતુલન સુધારણા'
  }
];

export default function MobileKpiCardView({ onSwitchToDesktop }) {
  const [selectedInstId, setSelectedInstId] = useState('guj-uni');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { lang, t } = useLanguage();

  const inst = INSTITUTES_DATA.find((i) => i.id === selectedInstId) || INSTITUTES_DATA[0];
  const instName = lang === 'gu' && inst.nameGu ? inst.nameGu : inst.name;
  const instType = lang === 'gu' && inst.typeGu ? inst.typeGu : inst.type;
  const growthArea = lang === 'gu' && inst.growthAreaGu ? inst.growthAreaGu : inst.growthArea;
  const strengths = lang === 'gu' && inst.strengthsGu ? inst.strengthsGu : inst.strengths;

  return (
    <div className="w-full max-w-lg mx-auto space-y-4 px-1 py-2">
      {/* Mobile Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-garvi-orange text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900">
                {t('common.mobileView', 'Mobile KPI Cards')}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {lang === 'gu' ? 'લાઇવ' : 'Live'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500">
              {t('common.optimizedPhone', 'Fast, touch-optimized summary • No zoom required')}
            </span>
          </div>
        </div>

        {onSwitchToDesktop && (
          <button
            onClick={onSwitchToDesktop}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-[11px] font-bold text-amber-900 shadow-2xs hover:bg-amber-50 cursor-pointer"
          >
            <Monitor className="w-3.5 h-3.5 text-garvi-orange" />
            <span>{lang === 'gu' ? 'ડેસ્કટોપ' : 'Desktop'}</span>
          </button>
        )}
      </div>

      {/* Institutional Selector */}
      <div className="relative">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          {t('common.institution', 'Select Institution to Benchmark')}:
        </label>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Building2 className="w-4 h-4 text-garvi-orange flex-shrink-0" />
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 block truncate">{instName}</span>
              <span className="text-[10px] text-slate-500">{instType}</span>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-30 py-2 divide-y divide-slate-100 max-h-60 overflow-y-auto">
            {INSTITUTES_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedInstId(item.id);
                  setDropdownOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors cursor-pointer ${
                  item.id === inst.id ? 'bg-amber-50/70 font-bold text-garvi-orange' : 'text-slate-700'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="block truncate">{lang === 'gu' && item.nameGu ? item.nameGu : item.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{lang === 'gu' && item.typeGu ? item.typeGu : item.type}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex-shrink-0">
                  #{item.rank}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 3 Core Primary KPI Cards */}
      <div className="grid grid-cols-1 gap-3">
        {/* Card 1: State Rank */}
        <div className="bg-gradient-to-br from-amber-500 to-garvi-gold text-white rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
              {t('common.overallRank', 'Gujarat State Rank')}
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black tracking-tight">#{inst.rank}</span>
              <span className="text-xs font-bold text-white/90">
                {lang === 'gu' ? '૪૭૦ સંસ્થાઓમાંથી' : 'of 470 Institutions'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-bold text-white">
                <ArrowUpRight className="w-3 h-3" /> {inst.prevRank > inst.rank ? `▲ +${inst.prevRank - inst.rank} spots` : (lang === 'gu' ? 'ટોચનું સ્થાન જાળવી રાખ્યું' : 'Retained top spot')}
              </span>
              <span className="text-[10px] text-white/80 font-medium">{t('common.category', 'Category')}: #{inst.categoryRank}</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Card 2 & 3 in 2-column layout */}
        <div className="grid grid-cols-2 gap-3">
          {/* Card 2: Total Score */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t('common.overallScore', 'Total Score')}
            </span>
            <div className="my-1">
              <div className="text-2xl font-black text-slate-900">{inst.totalScore}</div>
              <span className="text-[10px] text-slate-400 font-semibold block">
                {lang === 'gu' ? '૧૦૦ માંથી પોઈન્ટ્સ' : 'out of 100 points'}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs text-amber-500 font-bold">
                {'★'.repeat(inst.stars)}{'☆'.repeat(5 - inst.stars)}
              </span>
              <span className="text-[10px] font-bold text-slate-600 ml-1">
                {inst.stars}-{lang === 'gu' ? 'સ્ટાર' : 'Star'}
              </span>
            </div>
          </div>

          {/* Card 3: Peer Standing */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {t('common.peerStanding', 'Peer Standing')}
            </span>
            <div className="my-1">
              <div className="text-2xl font-black text-emerald-600">Top {100 - inst.percentile}%</div>
              <span className="text-[10px] text-slate-400 font-semibold block">
                {inst.percentile}{lang === 'gu' ? 'મી પર્સન્ટાઈલ' : 'th Percentile'}
              </span>
            </div>
            <div className="mt-1">
              <span className="text-[10px] font-semibold text-slate-600">
                {lang === 'gu' ? `${inst.peersOutperformed} સંસ્થાઓથી આગળ` : `Ahead of ${inst.peersOutperformed} peers`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Breakdown Accordion / Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-garvi-orange" />
            <span>{t('home.pillarsTitle', 'GSIRF 4 Pillars Performance')}</span>
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            {t('pillars.weightage', 'Weightage')}
          </span>
        </div>

        {/* TLR */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">{t('pillars.tlr', 'Teaching & Learning (TLR)')}</span>
            <span className="font-mono font-bold text-slate-900">{inst.tlr.score} / {inst.tlr.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${inst.tlr.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>{lang === 'gu' ? 'ફેકલ્ટી-વિદ્યાર્થી:' : 'Faculty-Student:'} <strong>{inst.tlr.fsr}</strong></span>
            <span>{lang === 'gu' ? 'પીએચડી ફેકલ્ટી:' : 'PhD Faculty:'} <strong>{inst.tlr.phd}</strong></span>
          </div>
        </div>

        {/* RPC */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">{t('pillars.rp', 'Research & IPR (RPC)')}</span>
            <span className="font-mono font-bold text-slate-900">{inst.rpc.score} / {inst.rpc.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${inst.rpc.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>{lang === 'gu' ? 'સંશોધન પત્રો:' : 'Publications:'} <strong>{inst.rpc.pubs}</strong></span>
            <span>{lang === 'gu' ? 'પેટન્ટ્સ:' : 'Patents:'} <strong>{inst.rpc.patents}</strong></span>
          </div>
        </div>

        {/* GO */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">{t('pillars.go', 'Graduation Outcomes (GO)')}</span>
            <span className="font-mono font-bold text-slate-900">{inst.go.score} / {inst.go.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${inst.go.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>{lang === 'gu' ? 'પ્લેસમેન્ટ:' : 'Placement:'} <strong>{inst.go.placement}</strong></span>
            <span>{lang === 'gu' ? 'સરેરાશ પેકેજ:' : 'Median Package:'} <strong>{inst.go.medianSalary}</strong></span>
          </div>
        </div>

        {/* OI */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">{t('pillars.oi', 'Outreach & Inclusivity (OI)')}</span>
            <span className="font-mono font-bold text-slate-900">{inst.oi.score} / {inst.oi.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${inst.oi.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>{lang === 'gu' ? 'ગુજરાત બહારથી:' : 'Outside Gujarat:'} <strong>{inst.oi.outsideState}</strong></span>
            <span>{lang === 'gu' ? 'વિદ્યાર્થિનીઓ:' : 'Female Students:'} <strong>{inst.oi.femaleRatio}</strong></span>
          </div>
        </div>
      </div>

      {/* Strategic Insights Card */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
        <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
          {lang === 'gu' ? 'મુખ્ય સંસ્થાકીય વિશ્લેષણ' : 'Key Institutional Takeaways'}
        </span>
        <div className="space-y-1.5 text-xs">
          {strengths.map((str, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{str}</span>
            </div>
          ))}
          <div className="flex items-start gap-1.5 text-amber-900 font-medium bg-amber-50/80 p-2 rounded-xl border border-amber-200/60 mt-2">
            <Sparkles className="w-3.5 h-3.5 text-garvi-orange flex-shrink-0 mt-0.5" />
            <span>{lang === 'gu' ? 'GSIRF ૨૦૨૬ માટે લક્ષિત સુધારણા:' : 'Target Area for GSIRF 2026:'} <strong>{growthArea}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
