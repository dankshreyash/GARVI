import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  Sliders,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  Award,
  Sparkles,
  Download,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Target
} from 'lucide-react';
import fullData from '../data/gsirfFullComparisonData.json';
import catStats from '../data/categoryBenchmarks.json';

// 16 GSIRF Micro-Indicators grouped by 4 Pillars
const PILLAR_GROUPS = [
  {
    id: 'TLR',
    name: 'Teaching, Learning & Resources',
    color: '#2563eb',
    indicators: [
      { key: 'SS', label: 'Student Strength (SS)', defaultMax: 20 },
      { key: 'FRS', label: 'Faculty-Student Ratio (FRS)', defaultMax: 30 },
      { key: 'FQE', label: 'Faculty Qualification & Exp (FQE)', defaultMax: 20 },
      { key: 'FRU', label: 'Financial Resources & Util (FRU)', defaultMax: 30 }
    ]
  },
  {
    id: 'RP',
    name: 'Research & Professional Practice',
    color: '#dc2626',
    indicators: [
      { key: 'PU', label: 'Combined Publications (PU)', defaultMax: 35 },
      { key: 'QP', label: 'Quality of Publications (QP)', defaultMax: 25 },
      { key: 'IPR', label: 'Patents & IPR (IPR)', defaultMax: 15 },
      { key: 'FPPP', label: 'Footprint of Projects (FPPP)', defaultMax: 15 }
    ]
  },
  {
    id: 'GO',
    name: 'Graduation Outcomes',
    color: '#d97706',
    indicators: [
      { key: 'GPH', label: 'Placement & Higher Studies (GPH)', defaultMax: 40 },
      { key: 'GUE', label: 'University Examinations (GUE)', defaultMax: 20 },
      { key: 'GMS', label: 'Median Salary (GMS)', defaultMax: 20 },
      { key: 'GPHD', label: 'Graduating Ph.D. Students (GPHD)', defaultMax: 20 }
    ]
  },
  {
    id: 'OI',
    name: 'Outreach & Inclusivity',
    color: '#16a34a',
    indicators: [
      { key: 'RD', label: 'Regional Diversity (RD)', defaultMax: 30 },
      { key: 'WD', label: 'Women Diversity (WD)', defaultMax: 30 },
      { key: 'ESCS', label: 'Econ & Socially Challenged (ESCS)', defaultMax: 20 },
      { key: 'PCS', label: 'Facilities for Physically Challenged (PCS)', defaultMax: 20 }
    ]
  }
];

const ALL_INDICATORS = PILLAR_GROUPS.flatMap((g) => g.indicators);

const CATEGORY_LIST = [
  'Engineering',
  'University',
  'College',
  'Pharmacy',
  'Management',
  'Law',
  'Medical',
  'Agriculture',
  'Architecture',
  'Dental'
];

// Official GSIRF pillar weights per category
function getCategoryWeights(category) {
  const cat = (category || '').toLowerCase();
  if (cat === 'college' || cat === 'law') {
    return { TLR: 0.40, RP: 0.15, GO: 0.25, OI: 0.10 };
  }
  if (cat === 'architecture') {
    return { TLR: 0.40, RP: 0.20, GO: 0.20, OI: 0.10 };
  }
  return { TLR: 0.30, RP: 0.30, GO: 0.20, OI: 0.10 };
}

function getStarFromCgpa(cgpa) {
  if (cgpa >= 4.0) return 5;
  if (cgpa >= 3.25) return 4;
  if (cgpa >= 2.5) return 3;
  if (cgpa >= 1.75) return 2;
  return 1;
}

export default function GsirfInteractiveSimulator({ onExportReport }) {
  // Determine initial college (logged-in college or Birla Vishvakarma Mahavidyalaya)
  const initialCollege = useMemo(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('garvi_active_institution') || 'null');
      if (stored && stored.name) {
        const match = fullData.find((c) => c.name.toUpperCase() === stored.name.toUpperCase());
        if (match) return match;
      }
    } catch {
      // ignore storage errors
    }
    return fullData.find((c) => c.name.includes('BIRLA VISHVAKARMA')) || fullData[0];
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(initialCollege.category || 'Engineering');
  const [selectedInstName, setSelectedInstName] = useState(initialCollege.name);
  const [activePillarTab, setActivePillarTab] = useState('TLR');

  // Filter colleges by category
  const categoryColleges = useMemo(() => {
    const list = fullData.filter(
      (c) => (c.category || '').toLowerCase() === selectedCategory.toLowerCase()
    );
    return list.length > 0 ? list : fullData;
  }, [selectedCategory]);

  // Current baseline college
  const currentCollege = useMemo(() => {
    return (
      categoryColleges.find((c) => c.name.toUpperCase() === selectedInstName.toUpperCase()) ||
      categoryColleges[0] ||
      fullData[0]
    );
  }, [categoryColleges, selectedInstName]);

  // Baseline indicators object
  const baseIndicators = useMemo(() => {
    const obj = {};
    ALL_INDICATORS.forEach((ind) => {
      obj[ind.key] = Number((currentCollege.indicators && currentCollege.indicators[ind.key]) || 0);
    });
    return obj;
  }, [currentCollege]);

  // User-edited indicator overrides (keyed by college name + indicator key, or reset when college changes)
  const [customIndicators, setCustomIndicators] = useState(null);

  // Active simulated indicators (falls back to baseline when no edits made)
  const simIndicators = useMemo(() => {
    if (!customIndicators) return baseIndicators;
    return { ...baseIndicators, ...customIndicators };
  }, [baseIndicators, customIndicators]);

  // Category-level max per indicator for slider bounds
  const indicatorMaxBounds = useMemo(() => {
    const bounds = {};
    ALL_INDICATORS.forEach((ind) => {
      const catMax = Math.max(
        ...categoryColleges.map((c) => Number((c.indicators && c.indicators[ind.key]) || 0))
      );
      bounds[ind.key] = Math.max(ind.defaultMax, Math.ceil(catMax), Math.ceil(baseIndicators[ind.key]));
    });
    return bounds;
  }, [categoryColleges, baseIndicators]);

  // Category averages per indicator to flag weak areas
  const categoryIndicatorAvgs = useMemo(() => {
    const avgs = {};
    const count = categoryColleges.length || 1;
    ALL_INDICATORS.forEach((ind) => {
      const sum = categoryColleges.reduce(
        (acc, c) => acc + Number((c.indicators && c.indicators[ind.key]) || 0),
        0
      );
      avgs[ind.key] = +(sum / count).toFixed(2);
    });
    return avgs;
  }, [categoryColleges]);

  // Identify weakest indicators (largest deficit vs max/category avg)
  const weakIndicators = useMemo(() => {
    return ALL_INDICATORS.map((ind) => {
      const actual = baseIndicators[ind.key];
      const maxVal = indicatorMaxBounds[ind.key] || ind.defaultMax;
      const pctOfMax = maxVal > 0 ? (actual / maxVal) * 100 : 100;
      const gapToMax = +(maxVal - actual).toFixed(2);
      return {
        ...ind,
        actual,
        maxVal,
        pctOfMax: +pctOfMax.toFixed(1),
        gapToMax
      };
    })
      .sort((a, b) => a.pctOfMax - b.pctOfMax)
      .slice(0, 4);
  }, [baseIndicators, indicatorMaxBounds]);

  // Handlers
  const handleCategoryChange = (newCat) => {
    setSelectedCategory(newCat);
    const first = fullData.find(
      (c) => (c.category || '').toLowerCase() === newCat.toLowerCase()
    );
    if (first) {
      setSelectedInstName(first.name);
    }
    setCustomIndicators(null);
  };

  const handleInstitutionChange = (newName) => {
    setSelectedInstName(newName);
    setCustomIndicators(null);
  };

  const handleSliderChange = (key, rawVal) => {
    const maxVal = indicatorMaxBounds[key] || 100;
    const clamped = Math.max(0, Math.min(maxVal, Number(rawVal) || 0));
    setCustomIndicators((prev) => ({
      ...(prev || baseIndicators),
      [key]: +clamped.toFixed(2)
    }));
  };

  const handleReset = () => {
    setCustomIndicators(null);
  };

  const handleBoostWeakest = () => {
    const next = { ...simIndicators };
    weakIndicators.forEach((w) => {
      const target = Math.min(w.maxVal, +(w.actual + (w.maxVal - w.actual) * 0.35).toFixed(2));
      next[w.key] = target;
    });
    setCustomIndicators(next);
  };

  const handleMatchTopPeer = () => {
    const next = {};
    ALL_INDICATORS.forEach((ind) => {
      const maxVal = indicatorMaxBounds[ind.key];
      const currentVal = baseIndicators[ind.key];
      next[ind.key] = Math.max(currentVal, +(currentVal + (maxVal - currentVal) * 0.5).toFixed(2));
    });
    setCustomIndicators(next);
  };

  // =========================================================================
  // REAL-TIME SIMULATION CALCULATIONS
  // =========================================================================
  const weights = useMemo(() => getCategoryWeights(currentCollege.category), [currentCollege.category]);

  const simulation = useMemo(() => {
    const dTLR =
      (simIndicators.SS - baseIndicators.SS) +
      (simIndicators.FRS - baseIndicators.FRS) +
      (simIndicators.FQE - baseIndicators.FQE) +
      (simIndicators.FRU - baseIndicators.FRU);

    const dRP =
      (simIndicators.PU - baseIndicators.PU) +
      (simIndicators.QP - baseIndicators.QP) +
      (simIndicators.IPR - baseIndicators.IPR) +
      (simIndicators.FPPP - baseIndicators.FPPP);

    const dGO =
      (simIndicators.GPH - baseIndicators.GPH) +
      (simIndicators.GUE - baseIndicators.GUE) +
      (simIndicators.GMS - baseIndicators.GMS) +
      (simIndicators.GPHD - baseIndicators.GPHD);

    const dOI =
      (simIndicators.RD - baseIndicators.RD) +
      (simIndicators.WD - baseIndicators.WD) +
      (simIndicators.ESCS - baseIndicators.ESCS) +
      (simIndicators.PCS - baseIndicators.PCS);

    const simTLR = +Math.min(100, Math.max(0, currentCollege.tlr + dTLR)).toFixed(2);
    const simRP = +Math.min(100, Math.max(0, currentCollege.rp + dRP)).toFixed(2);
    const simGO = +Math.min(100, Math.max(0, currentCollege.go + dGO)).toFixed(2);
    const simOI = +Math.min(100, Math.max(0, currentCollege.oi + dOI)).toFixed(2);

    const deltaTotal =
      weights.TLR * (simTLR - currentCollege.tlr) +
      weights.RP * (simRP - currentCollege.rp) +
      weights.GO * (simGO - currentCollege.go) +
      weights.OI * (simOI - currentCollege.oi);

    const simTotal = +Math.min(100, Math.max(0, currentCollege.total + deltaTotal)).toFixed(2);

    // Per-category CGPA factor
    const cgpaFactor = currentCollege.total > 0 ? currentCollege.cgpa / currentCollege.total : 0.0688;
    const simCgpa = +Math.min(5.0, Math.max(0, simTotal * cgpaFactor)).toFixed(2);

    // If no edits made, preserve exact Star & Rank
    const hasEdits = ALL_INDICATORS.some(
      (ind) => Math.abs(simIndicators[ind.key] - baseIndicators[ind.key]) > 0.001
    );

    const simStar = hasEdits ? Math.max(currentCollege.star, getStarFromCgpa(simCgpa)) : currentCollege.star;

    // Live rank projection against real peers in the same category
    let simRank = currentCollege.rank;
    if (hasEdits) {
      const otherColleges = categoryColleges.filter(
        (c) => c.name.toUpperCase() !== currentCollege.name.toUpperCase()
      );
      const betterPeers = otherColleges.filter((c) => c.total > simTotal).length;
      simRank = betterPeers + 1;
    }

    return {
      hasEdits,
      simTLR,
      simRP,
      simGO,
      simOI,
      simTotal,
      simCgpa,
      simStar,
      simRank,
      totalDiff: +(simTotal - currentCollege.total).toFixed(2),
      cgpaDiff: +(simCgpa - currentCollege.cgpa).toFixed(2),
      rankGain: currentCollege.rank - simRank
    };
  }, [simIndicators, baseIndicators, currentCollege, weights, categoryColleges]);

  // =========================================================================
  // APACHE ECHARTS OPTIONS
  // =========================================================================

  // 1. Radar Comparison: Actual 2024 vs Simulated Target
  const radarOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 12 }
      },
      legend: {
        data: ['Actual 2024', 'Simulated Target'],
        bottom: 0,
        textStyle: { fontSize: 11, fontWeight: 700, color: '#334155' }
      },
      radar: {
        indicator: [
          { name: `TLR\n${simulation.simTLR}`, max: 100 },
          { name: `OI\n${simulation.simOI}`, max: 100 },
          { name: `RP\n${simulation.simRP}`, max: 100 },
          { name: `GO\n${simulation.simGO}`, max: 100 }
        ],
        center: ['50%', '46%'],
        radius: '52%',
        axisNameGap: 8,
        axisName: {
          color: '#0f172a',
          fontWeight: 800,
          fontSize: 10,
          lineHeight: 13
        },
        splitArea: {
          areaStyle: { color: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#f8fafc'] }
        }
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [currentCollege.tlr, currentCollege.oi, currentCollege.rp, currentCollege.go],
              name: 'Actual 2024',
              symbolSize: 5,
              itemStyle: { color: '#64748b' },
              lineStyle: { width: 2, color: '#64748b', type: 'dashed' },
              areaStyle: { color: 'rgba(100, 116, 139, 0.18)' }
            },
            {
              value: [simulation.simTLR, simulation.simOI, simulation.simRP, simulation.simGO],
              name: 'Simulated Target',
              symbolSize: 6,
              itemStyle: { color: '#d97706' },
              lineStyle: { width: 2.5, color: '#d97706' },
              areaStyle: { color: 'rgba(245, 158, 11, 0.35)' }
            }
          ]
        }
      ]
    };
  }, [currentCollege, simulation]);

  // 2. Pillar Impact Bar Chart: Actual vs Simulated vs Category Average
  const pillarBarOption = useMemo(() => {
    const avg = catStats[selectedCategory]?.averages || { TLR: 70, RP: 50, GO: 65, OI: 68 };
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 12 }
      },
      legend: {
        data: ['Actual 2024', 'Simulated', 'Category Avg'],
        top: 0,
        textStyle: { fontSize: 10, fontWeight: 700, color: '#475569' }
      },
      grid: { top: 34, left: '3%', right: '3%', bottom: '5%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['TLR', 'RP', 'GO', 'OI'],
        axisLabel: { color: '#0f172a', fontWeight: 800, fontSize: 11 }
      },
      yAxis: {
        type: 'value',
        max: 100,
        splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } }
      },
      series: [
        {
          name: 'Actual 2024',
          type: 'bar',
          data: [currentCollege.tlr, currentCollege.rp, currentCollege.go, currentCollege.oi],
          itemStyle: { color: '#94a3b8', borderRadius: [4, 4, 0, 0] }
        },
        {
          name: 'Simulated',
          type: 'bar',
          data: [simulation.simTLR, simulation.simRP, simulation.simGO, simulation.simOI],
          itemStyle: { color: '#f59e0b', borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', fontSize: 10, fontWeight: 700, color: '#b45309' }
        },
        {
          name: 'Category Avg',
          type: 'bar',
          data: [avg.TLR, avg.RP, avg.GO, avg.OI],
          itemStyle: { color: '#0ea5e9', borderRadius: [4, 4, 0, 0] }
        }
      ]
    };
  }, [currentCollege, simulation, selectedCategory]);

  // 3. Peer Leaderboard Rank Climb Chart
  const rankClimbOption = useMemo(() => {
    const others = categoryColleges
      .filter((c) => c.name.toUpperCase() !== currentCollege.name.toUpperCase())
      .map((c) => ({ name: c.name, total: c.total, isSelf: false }));

    const combined = [
      ...others,
      { name: `${currentCollege.name} (SIMULATED)`, total: simulation.simTotal, isSelf: true }
    ].sort((a, b) => b.total - a.total);

    const selfIdx = combined.findIndex((c) => c.isSelf);
    const startIdx = Math.max(0, selfIdx - 3);
    const windowList = combined.slice(startIdx, startIdx + 7).reverse();

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 11 }
      },
      grid: { top: 10, left: '3%', right: '10%', bottom: '5%', containLabel: true },
      xAxis: {
        type: 'value',
        max: 100,
        splitLine: { lineStyle: { type: 'dashed', color: '#e2e8f0' } }
      },
      yAxis: {
        type: 'category',
        data: windowList.map((c) =>
          c.isSelf ? '★ YOUR SIMULATED' : c.name.length > 26 ? c.name.slice(0, 26) + '…' : c.name
        ),
        axisLabel: { color: '#1e293b', fontWeight: 700, fontSize: 10 }
      },
      series: [
        {
          type: 'bar',
          barWidth: 16,
          data: windowList.map((c) => ({
            value: c.total,
            itemStyle: {
              color: c.isSelf ? '#10b981' : '#cbd5e1',
              borderRadius: [0, 4, 4, 0]
            }
          })),
          label: {
            show: true,
            position: 'right',
            fontWeight: 700,
            fontSize: 10,
            color: '#0f172a'
          }
        }
      ]
    };
  }, [categoryColleges, currentCollege, simulation]);

  // CSV Download
  const handleDownloadCsv = () => {
    const rows = [
      ['GARVI GSIRF What-If Simulation Report'],
      ['Institution', currentCollege.name],
      ['Category', currentCollege.category],
      ['Metric', 'Actual 2024', 'Simulated Target', 'Delta'],
      ['Total Score', currentCollege.total, simulation.simTotal, simulation.totalDiff],
      ['CGPA', currentCollege.cgpa, simulation.simCgpa, simulation.cgpaDiff],
      ['Stars', currentCollege.star, simulation.simStar, simulation.simStar - currentCollege.star],
      ['Category Rank', currentCollege.rank, simulation.simRank, simulation.rankGain],
      ['TLR', currentCollege.tlr, simulation.simTLR, +(simulation.simTLR - currentCollege.tlr).toFixed(2)],
      ['RP', currentCollege.rp, simulation.simRP, +(simulation.simRP - currentCollege.rp).toFixed(2)],
      ['GO', currentCollege.go, simulation.simGO, +(simulation.simGO - currentCollege.go).toFixed(2)],
      ['OI', currentCollege.oi, simulation.simOI, +(simulation.simOI - currentCollege.oi).toFixed(2)],
      [],
      ['Indicator', 'Actual 2024', 'Simulated Target', 'Delta'],
      ...ALL_INDICATORS.map((ind) => [
        ind.label,
        baseIndicators[ind.key],
        simIndicators[ind.key],
        +(simIndicators[ind.key] - baseIndicators[ind.key]).toFixed(2)
      ])
    ];

    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `GARVI_Simulation_${currentCollege.name.replace(/\s+/g, '_').slice(0, 25)}.csv`;
    a.click();
    if (onExportReport) onExportReport();
  };

  const activeGroup = PILLAR_GROUPS.find((g) => g.id === activePillarTab) || PILLAR_GROUPS[0];

  return (
    <div className="space-y-6">
      {/* 1. INSTITUTION SLICERS & PRESET SCENARIOS */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Category Selector */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-900 mb-1">
              1. Select GSIRF Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              {CATEGORY_LIST.map((cat) => {
                const count = fullData.filter(
                  (c) => (c.category || '').toLowerCase() === cat.toLowerCase()
                ).length;
                return (
                  <option key={cat} value={cat}>
                    {cat} ({count} Institutions)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Institution Selector */}
          <div>
            <label className="block text-[11px] font-extrabold uppercase tracking-wider text-amber-900 mb-1">
              2. Select Institution to Simulate
            </label>
            <select
              value={currentCollege.name}
              onChange={(e) => handleInstitutionChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-amber-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              {categoryColleges.map((c) => (
                <option key={c.name} value={c.name}>
                  #{c.rank} — {c.name} (Score: {c.total})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preset Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-amber-200/70">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 mr-1">
              <Zap className="w-3.5 h-3.5 text-amber-600" /> Quick Scenarios:
            </span>
            <button
              type="button"
              onClick={handleBoostWeakest}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Boost Weakest Indicators</span>
            </button>
            <button
              type="button"
              onClick={handleMatchTopPeer}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1"
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Target Top-Tier (+50% Gap)</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition cursor-pointer flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Actual</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Scenario (.CSV)</span>
          </button>
        </div>
      </div>

      {/* 2. PREDICTED IMPACT KPI STRIP (ACTUAL VS SIMULATED) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Score */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Projected Total Score
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {simulation.simTotal}
            </span>
            <span className="text-xs font-semibold text-slate-400 line-through">
              {currentCollege.total}
            </span>
          </div>
          <div className="mt-2">
            {simulation.totalDiff > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" /> +{simulation.totalDiff} pts
              </span>
            ) : simulation.totalDiff < 0 ? (
              <span className="inline-flex items-center text-[11px] font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                {simulation.totalDiff} pts
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-semibold">Baseline 2024</span>
            )}
          </div>
        </div>

        {/* Predicted CGPA */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Projected CGPA (Out of 5)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-600">
              {simulation.simCgpa}
            </span>
            <span className="text-xs font-semibold text-slate-400 line-through">
              {currentCollege.cgpa}
            </span>
          </div>
          <div className="mt-2">
            {simulation.cgpaDiff > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <ArrowUpRight className="w-3 h-3" /> +{simulation.cgpaDiff} CGPA
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-semibold">Baseline CGPA</span>
            )}
          </div>
        </div>

        {/* Predicted Star Rating */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Projected Star Rating
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {simulation.simStar} ★
            </span>
            <span className="text-sm text-amber-500 tracking-tight">
              {'★'.repeat(simulation.simStar)}{'☆'.repeat(5 - simulation.simStar)}
            </span>
          </div>
          <div className="mt-2">
            {simulation.simStar > currentCollege.star ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                <Award className="w-3 h-3" /> Upgraded from {currentCollege.star}★!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-semibold">
                Current: {currentCollege.star}★ Rating
              </span>
            )}
          </div>
        </div>

        {/* Predicted Category Rank */}
        <div className="bg-gradient-to-br from-slate-900 to-amber-950 text-white rounded-2xl p-4 shadow-sm border border-amber-500/30">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
            Projected {currentCollege.category} Rank
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-black text-white">
              #{simulation.simRank}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              (Actual: #{currentCollege.rank})
            </span>
          </div>
          <div className="mt-2">
            {simulation.rankGain > 0 ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +{simulation.rankGain} Ranks Climbed!
              </span>
            ) : simulation.rankGain < 0 ? (
              <span className="inline-flex items-center text-[11px] font-bold text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full">
                {simulation.rankGain} Ranks
              </span>
            ) : (
              <span className="text-[11px] text-slate-300 font-semibold">
                Out of {categoryColleges.length} Peers
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. WEAK INDICATORS AUTO-FLAGGING BANNER */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950">
              Top Underperforming Indicators Flagged for {currentCollege.name}
            </h3>
          </div>
          <span className="text-[11px] text-amber-800 font-semibold">
            Lowest % achievement relative to category max
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {weakIndicators.map((w) => (
            <div
              key={w.key}
              className="bg-white rounded-xl p-3 border border-amber-200/80 flex items-center justify-between gap-2 shadow-2xs"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs text-slate-900">{w.key}</span>
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                    {w.pctOfMax}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  Score: <strong>{w.actual}</strong> / {w.maxVal}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleSliderChange(w.key, Math.min(w.maxVal, w.actual + (w.maxVal - w.actual) * 0.4))
                }
                className="px-2 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-extrabold transition shrink-0 cursor-pointer"
              >
                +Boost
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. MAIN INTERACTIVE WORKSPACE: SLIDER INPUTS (LEFT) + ECHARTS OUTPUTS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: WHAT-IF SLIDER INPUTS */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-garvi-orange flex items-center justify-center">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">What-If Indicator Inputs</h3>
                <p className="text-[11px] text-slate-500">Adjust sliders or enter exact target values</p>
              </div>
            </div>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-xl">
            {PILLAR_GROUPS.map((grp) => {
              const isActive = activePillarTab === grp.id;
              const simVal =
                grp.id === 'TLR'
                  ? simulation.simTLR
                  : grp.id === 'RP'
                  ? simulation.simRP
                  : grp.id === 'GO'
                  ? simulation.simGO
                  : simulation.simOI;
              return (
                <button
                  key={grp.id}
                  type="button"
                  onClick={() => setActivePillarTab(grp.id)}
                  className={`py-2 px-1 rounded-lg text-center transition cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-xs text-slate-900'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="block text-xs font-black">{grp.id}</span>
                  <span className="block text-[10px] font-bold text-amber-600">{simVal}</span>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Header */}
          <div className="flex items-center justify-between text-xs bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800">{activeGroup.name}</span>
            <span className="font-black text-slate-600">
              Weight: {Math.round(weights[activeGroup.id] * 100)}%
            </span>
          </div>

          {/* 4 Indicator Sliders for Selected Pillar */}
          <div className="space-y-4 pt-1">
            {activeGroup.indicators.map((ind) => {
              const baseVal = baseIndicators[ind.key];
              const simVal = simIndicators[ind.key];
              const maxVal = indicatorMaxBounds[ind.key];
              const delta = +(simVal - baseVal).toFixed(2);
              const catAvg = categoryIndicatorAvgs[ind.key];

              return (
                <div
                  key={ind.key}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold text-slate-900 block truncate">
                        {ind.label}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Actual: <strong>{baseVal}</strong> &bull; Cat Avg: <strong>{catAvg}</strong> &bull; Max: {maxVal}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {delta !== 0 && (
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                            delta > 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {delta > 0 ? `+${delta}` : delta}
                        </span>
                      )}
                      <input
                        type="number"
                        min={0}
                        max={maxVal}
                        step="0.5"
                        value={simVal}
                        onChange={(e) => handleSliderChange(ind.key, e.target.value)}
                        className="w-16 px-2 py-1 text-right text-xs font-black bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={maxVal}
                    step="0.25"
                    value={simVal}
                    onChange={(e) => handleSliderChange(ind.key, e.target.value)}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          {simulation.hasEdits && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Simulation active — charts and rank projection updated in real time.
              </span>
            </div>
          )}
        </div>

        {/* RIGHT: REAL-TIME ECHARTS OUTPUTS */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top Row: Radar Overlay + Pillar Bar Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                Pillar Balance: Actual vs Simulated
              </h4>
              <div className="h-64 w-full">
                <ReactECharts
                  option={radarOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-2">
                Score Lift vs Category Average
              </h4>
              <div className="h-64 w-full">
                <ReactECharts
                  option={pillarBarOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Chart: Projected Peer Rank Climb */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800">
                  Projected Peer Standing in {currentCollege.category}
                </h4>
                <p className="text-[11px] text-slate-500">
                  Shows exact rank position among nearby Gujarat peers with your simulated score ({simulation.simTotal})
                </p>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full self-start">
                Rank #{simulation.simRank} of {categoryColleges.length}
              </span>
            </div>
            <div className="h-64 w-full">
              <ReactECharts
                option={rankClimbOption}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

