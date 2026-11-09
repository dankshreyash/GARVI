import { useState, useMemo } from 'react';
import {
  Target,
  BarChart2,
  Building2,
  Sparkles,
  X,
  Plus
} from 'lucide-react';
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
  ResponsiveContainer
} from 'recharts';

import fullData from '../data/gsirfFullComparisonData.json';

const PALETTE = [
  { stroke: '#d97706', fill: '#f59e0b', name: 'Institution 1 (Primary)' },
  { stroke: '#2563eb', fill: '#3b82f6', name: 'Institution 2' },
  { stroke: '#059669', fill: '#10b981', name: 'Institution 3' }
];

export default function MultiCollegeAnalyticsComparison() {
  // Slicers matching PDF header
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('Engineering');

  // Filter colleges by selected category
  const categoryColleges = useMemo(() => {
    if (selectedCategory === 'All') return fullData;
    return fullData.filter(
      (c) => c.category && c.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  // Selected colleges (up to 3)
  const [selectedCollegeNames, setSelectedCollegeNames] = useState([
    'BIRLA VISHVAKARMA MAHAVIDYALAYA',
    'GOVERNMENT ENGINEERING COLLEGE, GANDHINAGAR',
    'INSTITUTE OF TECHNOLOGY, NIRMA UNIVERSITY'
  ]);

  // Current colleges objects
  const selectedColleges = useMemo(() => {
    return selectedCollegeNames
      .map((name) => fullData.find((c) => c.name.toUpperCase() === name.toUpperCase()))
      .filter(Boolean);
  }, [selectedCollegeNames]);

  const primaryCollege = selectedColleges[0] || fullData[0];

  // Radar chart comparison data across 4 parameters
  const radarData = useMemo(() => {
    const params = [
      { key: 'tlr', label: 'TLR' },
      { key: 'rp', label: 'RP' },
      { key: 'go', label: 'GO' },
      { key: 'oi', label: 'OI' }
    ];

    return params.map((p) => {
      const row = { subject: p.label, fullMark: 100 };
      selectedColleges.forEach((c, idx) => {
        row[`college_${idx}`] = c[p.key] || 0;
        row[`name_${idx}`] = c.name;
      });
      return row;
    });
  }, [selectedColleges]);

  // Parameter Bar Comparison
  const parameterBarData = useMemo(() => {
    const params = [
      { key: 'tlr', label: 'TLR (Teaching & Learning)' },
      { key: 'rp', label: 'RP (Research & IPR)' },
      { key: 'go', label: 'GO (Graduation Outcomes)' },
      { key: 'oi', label: 'OI (Outreach & Inclusivity)' }
    ];

    return params.map((p) => {
      const row = { name: p.label };
      selectedColleges.forEach((c, idx) => {
        row[c.name] = c[p.key] || 0;
      });
      return row;
    });
  }, [selectedColleges]);

  // Indicator Comparison (16 micro indicators from PDF)
  const indicatorList = [
    { key: 'SS', max: 20 },
    { key: 'FRS', max: 30 },
    { key: 'FQE', max: 20 },
    { key: 'FRU', max: 30 },
    { key: 'PU', max: 35 },
    { key: 'QP', max: 25 },
    { key: 'IPR', max: 15 },
    { key: 'FPPP', max: 15 },
    { key: 'GPH', max: 40 },
    { key: 'GUE', max: 20 },
    { key: 'GMS', max: 20 },
    { key: 'GPHD', max: 20 },
    { key: 'RD', max: 30 },
    { key: 'WD', max: 30 },
    { key: 'ESCS', max: 20 },
    { key: 'PCS', max: 20 }
  ];

  const indicatorBarData = useMemo(() => {
    return indicatorList.map((ind) => {
      const row = { name: ind.key, max: ind.max };
      selectedColleges.forEach((c) => {
        row[c.name] = (c.indicators && c.indicators[ind.key]) || 0;
      });
      return row;
    });
  }, [selectedColleges]);

  // Handle college selection change
  const handleCollegeChange = (index, newName) => {
    const updated = [...selectedCollegeNames];
    updated[index] = newName;
    setSelectedCollegeNames(updated);
  };

  const handleAddCollege = () => {
    if (selectedCollegeNames.length < 3) {
      const remaining = categoryColleges.find(
        (c) => !selectedCollegeNames.includes(c.name)
      );
      if (remaining) {
        setSelectedCollegeNames([...selectedCollegeNames, remaining.name]);
      }
    }
  };

  const handleRemoveCollege = (index) => {
    if (selectedCollegeNames.length > 1) {
      const updated = selectedCollegeNames.filter((_, idx) => idx !== index);
      setSelectedCollegeNames(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. PDF Top Control Strip / Slicers Header */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              GARVI Multi-Institution Analytics &amp; Comparison Tool
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              Live Verified
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Year Slicer */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="font-bold text-slate-500">1. Select Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
              >
                <option value="2024">GSIRF 2024</option>
                <option value="2023">GSIRF 2023</option>
              </select>
            </div>

            {/* Category Slicer */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl">
              <span className="font-bold text-slate-500">2. Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="University">University</option>
                <option value="College">College</option>
                <option value="Law">Law</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Management">Management</option>
                <option value="Medical">Medical</option>
                <option value="Dental">Dental</option>
                <option value="Architecture">Architecture</option>
                <option value="All">All Disciplines</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2 or 3 College Slicers Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-garvi-orange" />
              <span>Compare Up to 3 Institutions Simultaneously:</span>
            </span>
            {selectedCollegeNames.length < 3 && (
              <button
                onClick={handleAddCollege}
                className="inline-flex items-center gap-1 text-xs font-bold text-garvi-orange hover:text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add 3rd College</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {selectedCollegeNames.map((name, idx) => {
              const colObj = selectedColleges[idx];
              const palette = PALETTE[idx];
              return (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border transition-all"
                  style={{
                    backgroundColor: `${palette.fill}10`,
                    borderColor: `${palette.stroke}60`
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: palette.stroke }}>
                      Institution {idx + 1} {idx === 0 ? '(Primary Focus)' : ''}
                    </span>
                    {selectedCollegeNames.length > 2 && (
                      <button
                        onClick={() => handleRemoveCollege(idx)}
                        className="text-slate-400 hover:text-rose-600 text-xs cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <select
                    value={name}
                    onChange={(e) => handleCollegeChange(idx, e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-xl px-2.5 py-2 outline-none cursor-pointer truncate shadow-2xs"
                  >
                    {categoryColleges.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} (Rank #{c.rank} • {c.star}★)
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards Strip (Like PDF: Total Score, CGPA, Stars, Category Rank) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedColleges.map((c, idx) => {
          const palette = PALETTE[idx];
          return (
            <div
              key={c.name}
              className="bg-white rounded-3xl p-5 border shadow-xs relative overflow-hidden"
              style={{ borderColor: `${palette.stroke}40` }}
            >
              <div
                className="absolute top-0 inset-x-0 h-1.5"
                style={{ backgroundColor: palette.stroke }}
              />
              <span className="text-[11px] font-bold text-slate-500 block truncate" title={c.name}>
                {c.name}
              </span>
              <div className="flex items-baseline justify-between mt-2">
                <div>
                  <span className="text-3xl font-black text-slate-900">{c.total}</span>
                  <span className="text-[10px] text-slate-400 block font-semibold">Total Score 2024</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black" style={{ color: palette.stroke }}>
                    Rank #{c.rank}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-semibold">
                    CGPA: {c.cgpa}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-amber-500 font-bold">
                  {'★'.repeat(c.star)}{'☆'.repeat(5 - c.star)}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {c.category}
                </span>
              </div>
            </div>
          );
        })}

        {/* Category Standing Card (Top 11% / Standouts) */}
        <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white rounded-3xl p-5 border border-amber-900/40 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Category Benchmark Band</span>
            </div>
            <h4 className="text-sm font-bold text-white">
              {primaryCollege.name}
            </h4>
            <p className="text-xs text-amber-200/90 mt-1 font-semibold">
              Ranked #{primaryCollege.rank} in Gujarat {primaryCollege.category}
            </p>
          </div>
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300">Standing:</span>
            <span className="font-bold text-amber-300">
              {primaryCollege.rank <= 10 ? '🥇 Gold Tier (Top 10%)' : '🥈 Silver Tier (Strong)'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Section: 4-Pillar Comparative Analytics (Radar + Bar Chart Side-by-Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Overlay for 2 or 3 Colleges */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-garvi-orange flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Parameter Performance Overlay (Radar)
                </h3>
                <p className="text-[11px] text-slate-400">Head-to-head TLR, RP, GO, OI balance</p>
              </div>
            </div>
          </div>

          <div className="h-96 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="42%" outerRadius="58%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="subject"
                  stroke="#334155"
                  tick={{ fontSize: 12, fontWeight: 800, fill: '#0f172a' }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                {selectedColleges.map((c, idx) => (
                  <Radar
                    key={c.name}
                    name={c.name}
                    dataKey={`college_${idx}`}
                    stroke={PALETTE[idx].stroke}
                    fill={PALETTE[idx].fill}
                    fillOpacity={0.35}
                  />
                ))}
                <Tooltip
                  formatter={(val, name) => [`${val} points`, name]}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
                />
                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{
                    paddingTop: '24px',
                    fontSize: '11px',
                    lineHeight: '18px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Clustered Bar Chart for TLR, RP, GO, OI */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <BarChart2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Side-by-Side Parameter Scores
                </h3>
                <p className="text-[11px] text-slate-400">Compare scores across all 4 GSIRF pillars</p>
              </div>
            </div>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={parameterBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
                {selectedColleges.map((c, idx) => (
                  <Bar
                    key={c.name}
                    dataKey={c.name}
                    fill={PALETTE[idx].stroke}
                    radius={[6, 6, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Section: Complete 16 Micro-Indicators Clustered Comparison (SS, FRS, PU, IPR, GUE, etc.) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              16 Key Indicator Deep-Dive (From Official GSIRF Audit)
            </h3>
            <p className="text-xs text-slate-500">
              SS, FRS, FQE, FRU, PU, QP, IPR, FPPP, GPH, GUE, GMS, GPHD, RD, WD, ESCS, PCS
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
            Audit Level Granularity
          </span>
        </div>

        <div className="h-80 w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={indicatorBarData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fontWeight: 700 }} />
              <YAxis domain={[0, 45]} stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 12, color: '#fff', fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
              {selectedColleges.map((c, idx) => (
                <Bar
                  key={c.name}
                  dataKey={c.name}
                  fill={PALETTE[idx].stroke}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Parameter Table & Gap Analysis (Like PDF Table) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
          Comparative Parameter Audit Table
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Parameter</th>
                {selectedColleges.map((c, idx) => (
                  <th key={c.name} className="py-3 px-4" style={{ color: PALETTE[idx].stroke }}>
                    {c.name}
                  </th>
                ))}
                <th className="py-3 px-4 text-right">Advantage Lead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {[
                { key: 'tlr', name: 'Teaching, Learning & Resources (TLR)' },
                { key: 'rp', name: 'Research & Professional Practice (RP)' },
                { key: 'go', name: 'Graduation Outcomes (GO)' },
                { key: 'oi', name: 'Outreach & Inclusivity (OI)' },
                { key: 'total', name: 'Total Composite Score' },
                { key: 'rank', name: 'State Category Rank' }
              ].map((row) => {
                const scores = selectedColleges.map((c) => c[row.key]);
                const bestIdx = row.key === 'rank'
                  ? scores.indexOf(Math.min(...scores))
                  : scores.indexOf(Math.max(...scores));
                return (
                  <tr key={row.key} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-bold text-slate-800">{row.name}</td>
                    {selectedColleges.map((c, idx) => (
                      <td key={c.name} className="py-3 px-4 font-mono font-bold">
                        {row.key === 'rank' ? `#${c[row.key]}` : c[row.key]}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {selectedColleges[bestIdx]?.name.split(' ')[0]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
