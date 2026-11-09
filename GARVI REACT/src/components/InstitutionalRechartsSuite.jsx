import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';
import {
  Trophy,
  TrendingUp,
  Target,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function InstitutionalRechartsSuite({ inst, lang = 'en' }) {
  if (!inst) return null;

  // Radar Chart data: College vs State Average
  const radarData = inst.pillars.map((p) => ({
    subject: p.code,
    fullName: p.label,
    college: p.score,
    stateAvg: p.stateAvg,
    fullMark: p.max
  }));

  // Pillar Comparison Bar Data
  const barData = inst.pillars.map((p) => ({
    name: p.code,
    fullName: p.label,
    collegeScore: p.score,
    stateAverage: p.stateAvg,
    color: p.color
  }));

  // Historical Progression Data
  const trendData = inst.historicalTrends || [];

  return (
    <div className="space-y-6">
      {/* Top Identity & Rank Pill Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/70 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-900/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              {inst.category} • GSIRF 2024 Verified
            </span>
            <span className="text-xs text-slate-300">AISHE: {inst.aishe}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {lang === 'gu' && inst.nameGu ? inst.nameGu : inst.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {inst.coordinator} • District: <strong className="text-white">{inst.district}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">State Rank</span>
            <div className="text-3xl font-black text-amber-400">#{inst.rank}</div>
            <span className="text-[10px] text-slate-300">of {inst.totalCollegesInCat} in category</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Total Score</span>
            <div className="text-3xl font-black text-emerald-400">{inst.totalScore}</div>
            <div className="flex items-center justify-center gap-0.5 text-xs text-amber-400 mt-0.5">
              {'★'.repeat(inst.star)}{'☆'.repeat(5 - inst.star)}
              <span className="text-[10px] font-bold text-white ml-1">({inst.star}-Star)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Radar Chart (4 Pillars) + Bar Comparison vs State Average */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Recharts Radar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-garvi-orange flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'gu' ? '૪ સ્તંભ સંતુલન રડાર ચાર્ટ' : '4-Pillar Multi-Dimensional Balance'}
                </h3>
                <p className="text-[11px] text-slate-400">Recharts Radar vs State Benchmark</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              Interactive
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" tick={{ fontSize: 12, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Radar
                  name={inst.name}
                  dataKey="college"
                  stroke="#d97706"
                  fill="#f59e0b"
                  fillOpacity={0.45}
                />
                <Radar
                  name="Gujarat State Average"
                  dataKey="stateAvg"
                  stroke="#94a3b8"
                  fill="#cbd5e1"
                  fillOpacity={0.25}
                />
                <Tooltip
                  formatter={(value, name) => [`${value} / 100`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center">
            {inst.pillars.map((p) => (
              <div key={p.code} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block">{p.code}</span>
                <span className="text-sm font-black text-slate-800">{p.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Recharts Bar Comparison */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {lang === 'gu' ? 'રાજ્ય સરેરાશ સામે સ્તંભવાર સરખામણી' : 'Pillar Performance vs State Benchmark'}
                </h3>
                <p className="text-[11px] text-slate-400">Higher values indicate relative competitive advantage</p>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12, fontWeight: 700 }} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val, name) => [`${val} points`, name === 'collegeScore' ? inst.name : 'State Average']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                <Bar name="Your Institution" dataKey="collegeScore" fill="#d97706" radius={[6, 6, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.collegeScore >= entry.stateAverage ? '#10b981' : '#f59e0b'} />
                  ))}
                </Bar>
                <Bar name="Gujarat State Benchmark" dataKey="stateAverage" fill="#94a3b8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Above State Average</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Opportunity for Growth</span>
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Recharts Historical Evolution Curve */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {lang === 'gu' ? 'ઐતિહાસિક રેટિંગ અને સ્કોર પ્રગતિ (૨૦૨૨ - ૨૦૨૫)' : 'Historical Rating & Score Trajectory (2022 - 2025)'}
              </h3>
              <p className="text-xs text-slate-400">GSIRF year-over-year composite growth curve</p>
            </div>
          </div>
          <span className="text-xs font-bold text-garvi-orange bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
            CGPA: {inst.cgpa} / 5.0
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" stroke="#64748b" tick={{ fontSize: 12, fontWeight: 700 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Line type="monotone" dataKey="score" name="Overall GSIRF Score" stroke="#d97706" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="tlr" name="Teaching & Learning (TLR)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="oi" name="Outreach & Inclusivity (OI)" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 3: Sub-parameter Breakdown & Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sub-parameters List */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>{lang === 'gu' ? 'મુખ્ય પરિમાણોના આંકડા' : 'Key Evaluated Metric Breakdown'}</span>
            <span className="text-[10px] text-slate-400 font-normal">Official GSIRF Audit Values</span>
          </h3>
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {inst.subParameters.map((param, idx) => {
              const pct = Math.min(100, Math.round((param.value / param.benchmark) * 100));
              return (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>{param.key}</span>
                    <span className="font-mono text-slate-900">{param.value} <span className="text-slate-400 font-normal">/ {param.benchmark}</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${pct >= 75 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Action Plan & Recommendations */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-garvi-orange" />
              <span>{lang === 'gu' ? 'સંસ્થાકીય ગુણવત્તા વિશ્લેષણ' : 'Institutional Quality Insights & Roadmap'}</span>
            </h3>

            {/* Strengths */}
            <div className="mt-3 space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                {lang === 'gu' ? 'મુખ્ય શક્તિઓ (Strengths)' : 'Verified Strengths'}
              </span>
              {inst.strengths.map((str, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-emerald-50/60 p-2 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{str}</span>
                </div>
              ))}
            </div>

            {/* Growth Areas */}
            <div className="mt-4 space-y-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                {lang === 'gu' ? 'સુધારણા માટેના ક્ષેત્રો (Target Areas)' : 'Strategic Priorities for 2026'}
              </span>
              {inst.growthAreas.map((area, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-amber-50/70 p-2 rounded-xl border border-amber-100">
                  <AlertCircle className="w-3.5 h-3.5 text-garvi-orange shrink-0 mt-0.5" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            Audited under Gujarat State Institutional Rating Framework rules.
          </div>
        </div>
      </div>
    </div>
  );
}
