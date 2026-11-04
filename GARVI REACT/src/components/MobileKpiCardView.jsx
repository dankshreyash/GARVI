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

const INSTITUTES_DATA = [
  {
    id: 'guj-uni',
    name: 'Gujarat University, Ahmedabad',
    type: 'State Public University',
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
    growthArea: 'Commercial Patent Filings & IPR Revenue'
  },
  {
    id: 'iit-gn',
    name: 'IIT Gandhinagar',
    type: 'Institute of National Importance',
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
    growthArea: 'Gender Inclusivity Ratio'
  },
  {
    id: 'daiict',
    name: 'DA-IICT, Gandhinagar',
    type: 'Private University',
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
    growthArea: 'Outreach & Regional Diversity'
  },
  {
    id: 'nirma',
    name: 'Nirma University, Ahmedabad',
    type: 'Private University',
    rank: 3,
    prevRank: 4,
    categoryRank: 2,
    totalScore: 86.4,
    stars: 4,
    percentile: 94,
    peersOutperformed: 442,
    tlr: { score: 27.2, max: 30, pct: 90, fsr: '1:13', phd: '84%' },
    rpc: { score: 25.1, max: 30, pct: 83, pubs: 420, patents: 28 },
    go: { score: 18.1, max: 20, pct: 90, placement: '91.2%', medianSalary: '₹8.2 LPA' },
    oi: { score: 16.0, max: 20, pct: 80, outsideState: '22%', femaleRatio: '42%' },
    strengths: ['Industry Collaboration Labs', 'Placement Rate Consistency'],
    growthArea: 'Sponsored Research Grants'
  },
  {
    id: 'marwadi',
    name: 'Marwadi University, Rajkot',
    type: 'Private University',
    rank: 8,
    prevRank: 11,
    categoryRank: 5,
    totalScore: 78.2,
    stars: 4,
    percentile: 83,
    peersOutperformed: 391,
    tlr: { score: 24.6, max: 30, pct: 82, fsr: '1:15', phd: '68%' },
    rpc: { score: 22.0, max: 30, pct: 73, pubs: 260, patents: 16 },
    go: { score: 16.4, max: 20, pct: 82, placement: '84.0%', medianSalary: '₹5.4 LPA' },
    oi: { score: 15.2, max: 20, pct: 76, outsideState: '18%', femaleRatio: '40%' },
    strengths: ['Saurashtra Regional Hub', 'Rapid Ranking Ascent'],
    growthArea: 'High-Impact Scopus Citations'
  }
];

export default function MobileKpiCardView({ title = 'GSIRF Performance Summary', onSwitchToDesktop }) {
  const [selectedInstId, setSelectedInstId] = useState('guj-uni');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const inst = INSTITUTES_DATA.find((item) => item.id === selectedInstId) || INSTITUTES_DATA[0];

  return (
    <div className="w-full space-y-4">
      {/* Mobile Mode Header Pill */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">
              {title}
            </span>
            <span className="text-[10px] text-slate-500">Fast, touch-optimized summary • No iframe zoom required</span>
          </div>
        </div>

        {onSwitchToDesktop && (
          <button
            onClick={onSwitchToDesktop}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-amber-300 text-[11px] font-bold text-amber-900 shadow-2xs hover:bg-amber-50"
          >
            <Monitor className="w-3.5 h-3.5 text-garvi-orange" />
            <span>Desktop</span>
          </button>
        )}
      </div>

      {/* Institutional Selector */}
      <div className="relative">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
          Select Institution to Benchmark:
        </label>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Building2 className="w-4 h-4 text-garvi-orange flex-shrink-0" />
            <div className="truncate">
              <span className="text-xs font-bold text-slate-900 block truncate">{inst.name}</span>
              <span className="text-[10px] text-slate-500">{inst.type}</span>
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
                className={`w-full px-4 py-2.5 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${
                  item.id === inst.id ? 'bg-amber-50/70 font-bold text-garvi-orange' : 'text-slate-700'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="block truncate">{item.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{item.type}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex-shrink-0">
                  Rank #{item.rank}
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
              Gujarat State Rank
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-black tracking-tight">#{inst.rank}</span>
              <span className="text-xs font-bold text-white/90">of 470 Institutions</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-white/20 text-[10px] font-bold text-white">
                <ArrowUpRight className="w-3 h-3" /> {inst.prevRank > inst.rank ? `▲ +${inst.prevRank - inst.rank} spots` : 'Retained top spot'}
              </span>
              <span className="text-[10px] text-white/80 font-medium">Category: #{inst.categoryRank}</span>
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
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Score</span>
            <div className="my-1">
              <div className="text-2xl font-black text-slate-900">{inst.totalScore}</div>
              <span className="text-[10px] text-slate-400 font-semibold block">out of 100 points</span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="text-xs text-amber-500 font-bold">
                {'★'.repeat(inst.stars)}{'☆'.repeat(5 - inst.stars)}
              </span>
              <span className="text-[10px] font-bold text-slate-600 ml-1">{inst.stars}-Star</span>
            </div>
          </div>

          {/* Card 3: Peer Standing */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">State Standing</span>
            <div className="my-1">
              <div className="text-2xl font-black text-emerald-600">Top {100 - inst.percentile}%</div>
              <span className="text-[10px] text-slate-400 font-semibold block">{inst.percentile}th Percentile</span>
            </div>
            <div className="mt-1">
              <span className="text-[10px] font-semibold text-slate-600">Ahead of {inst.peersOutperformed} peers</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Breakdown Accordion / Progress */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-garvi-orange" />
            <span>GSIRF 4 Pillars Performance</span>
          </span>
          <span className="text-[10px] font-bold text-slate-400">Weighted Breakdown</span>
        </div>

        {/* TLR */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">Teaching &amp; Learning (TLR)</span>
            <span className="font-mono font-bold text-slate-900">{inst.tlr.score} / {inst.tlr.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${inst.tlr.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Faculty-Student: <strong>{inst.tlr.fsr}</strong></span>
            <span>PhD Faculty: <strong>{inst.tlr.phd}</strong></span>
          </div>
        </div>

        {/* RPC */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">Research &amp; IPR (RPC)</span>
            <span className="font-mono font-bold text-slate-900">{inst.rpc.score} / {inst.rpc.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${inst.rpc.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Publications: <strong>{inst.rpc.pubs}</strong></span>
            <span>Patents: <strong>{inst.rpc.patents}</strong></span>
          </div>
        </div>

        {/* GO */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">Graduation Outcomes (GO)</span>
            <span className="font-mono font-bold text-slate-900">{inst.go.score} / {inst.go.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${inst.go.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Placement: <strong>{inst.go.placement}</strong></span>
            <span>Median Package: <strong>{inst.go.medianSalary}</strong></span>
          </div>
        </div>

        {/* OI */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-slate-800">Outreach &amp; Inclusivity (OI)</span>
            <span className="font-mono font-bold text-slate-900">{inst.oi.score} / {inst.oi.max}</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${inst.oi.pct}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>Outside Gujarat: <strong>{inst.oi.outsideState}</strong></span>
            <span>Female Students: <strong>{inst.oi.femaleRatio}</strong></span>
          </div>
        </div>
      </div>

      {/* Strategic Insights Card */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
        <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
          Key Institutional Takeaways
        </span>
        <div className="space-y-1.5 text-xs">
          {inst.strengths.map((str, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{str}</span>
            </div>
          ))}
          <div className="flex items-start gap-1.5 text-amber-900 font-medium bg-amber-50/80 p-2 rounded-xl border border-amber-200/60 mt-2">
            <Sparkles className="w-3.5 h-3.5 text-garvi-orange flex-shrink-0 mt-0.5" />
            <span>Target Area for GSIRF 2026: <strong>{inst.growthArea}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
