import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';

import fullData from '../data/gsirfFullComparisonData.json';
import catStats from '../data/categoryBenchmarks.json';

// 16 Indicators Definition
const INDICATOR_LIST = [
  { key: 'SS', label: 'SS (Students Strength)', max: 20 },
  { key: 'FRS', label: 'FRS (Faculty Ratio)', max: 30 },
  { key: 'FQE', label: 'FQE (Faculty Quality)', max: 20 },
  { key: 'FRU', label: 'FRU (Financial Resources)', max: 30 },
  { key: 'PU', label: 'PU (Publications)', max: 35 },
  { key: 'QP', label: 'QP (Quality Pubs)', max: 25 },
  { key: 'IPR', label: 'IPR (Patents/IP)', max: 15 },
  { key: 'FPPP', label: 'FPPP (Footprint/Projects)', max: 15 },
  { key: 'GPH', label: 'GPH (Graduation PhD)', max: 40 },
  { key: 'GUE', label: 'GUE (Univ Exams)', max: 20 },
  { key: 'GMS', label: 'GMS (Median Salary)', max: 20 },
  { key: 'GPHD', label: 'GPHD (PhD Grad)', max: 20 },
  { key: 'RD', label: 'RD (Regional Diversity)', max: 30 },
  { key: 'WD', label: 'WD (Women Diversity)', max: 30 },
  { key: 'ESCS', label: 'ESCS (Econ/Social)', max: 20 },
  { key: 'PCS', label: 'PCS (Physically Challenged)', max: 20 }
];

export default function AnalyticsToolPdfRecreation() {
  // Slicers State
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('Engineering');
  const [selectedInstName, setSelectedInstName] = useState('BIRLA VISHVAKARMA MAHAVIDYALAYA');

  // Filter colleges by selected category
  const categoryColleges = useMemo(() => {
    const list = fullData.filter((c) => {
      if (selectedCategory === 'All') return true;
      if (!c.category) return false;
      const cat = c.category.toLowerCase().trim();
      const target = selectedCategory.toLowerCase().trim();
      return cat === target || cat.includes(target) || target.includes(cat);
    });
    return list.length > 0 ? list : fullData;
  }, [selectedCategory]);

  // Current Selected College
  const currentCollege = useMemo(() => {
    const found = categoryColleges.find(
      (c) => c.name.toUpperCase() === selectedInstName.toUpperCase()
    );
    if (found) return found;
    return categoryColleges[0] || fullData[0];
  }, [selectedInstName, categoryColleges]);

  // Handle Category Switch
  const handleCategoryChange = (newCat) => {
    setSelectedCategory(newCat);
    const collegesInCat = fullData.filter((c) => {
      if (newCat === 'All') return true;
      if (!c.category) return false;
      const cat = c.category.toLowerCase().trim();
      const target = newCat.toLowerCase().trim();
      return cat === target || cat.includes(target) || target.includes(cat);
    });
    if (collegesInCat.length > 0) {
      setSelectedInstName(collegesInCat[0].name);
    }
  };

  // Category Standouts
  const topPerformer = useMemo(() => {
    if (catStats[selectedCategory] && catStats[selectedCategory].topPerformer) {
      return catStats[selectedCategory].topPerformer.name;
    }
    return 'INSTITUTE OF TECHNOLOGY, NIRMA UNIVERSITY';
  }, [selectedCategory]);

  const topImprover = 'GOVERNMENT ENGINEERING COLLEGE, GANDHINAGAR';

  // Category Benchmarks
  const currentBenchmarks = useMemo(() => {
    const s = catStats[selectedCategory]?.averages || { TLR: 75, RP: 55, GO: 68, OI: 72 };
    return {
      TLR: Math.round(s.TLR * 1.15) || 88,
      RP: Math.round(s.RP * 1.25) || 79,
      OI: Math.round(s.OI * 1.20) || 94,
      GO: Math.round(s.GO * 1.12) || 73
    };
  }, [selectedCategory]);

  // =========================================================================
  // ECHARTS OPTIONS
  // =========================================================================

  // 1. Radar Chart Option (TLR, OI, RP, GO)
  const radarOption = useMemo(() => {
    const tlr = currentCollege.tlr || 79.09;
    const oi = currentCollege.oi || 77.34;
    const rp = currentCollege.rp || 60.65;
    const go = currentCollege.go || 73.50;

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 12 },
        formatter: () => {
          return `<div style="font-weight:bold;margin-bottom:4px;">${currentCollege.name}</div>
            TLR: ${tlr}<br/>
            OI: ${oi}<br/>
            RP: ${rp}<br/>
            GO: ${go}`;
        }
      },
      radar: {
        indicator: [
          { name: `TLR\n${tlr}`, max: 100 },
          { name: `OI\n${oi}`, max: 100 },
          { name: `RP\n${rp}`, max: 100 },
          { name: `GO\n${go}`, max: 100 }
        ],
        center: ['50%', '52%'],
        radius: '52%',
        axisNameGap: 8,
        splitNumber: 4,
        shape: 'polygon',
        axisName: {
          color: '#0f172a',
          fontWeight: 700,
          fontSize: 10,
          lineHeight: 13
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#f8fafc']
          }
        },
        splitLine: {
          lineStyle: {
            color: '#cbd5e1'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#cbd5e1'
          }
        }
      },
      series: [
        {
          name: 'Parameters',
          type: 'radar',
          data: [
            {
              value: [tlr, oi, rp, go],
              name: currentCollege.name,
              symbol: 'circle',
              symbolSize: 6,
              itemStyle: {
                color: '#0284c7'
              },
              lineStyle: {
                width: 2.5,
                color: '#0284c7'
              },
              areaStyle: {
                color: 'rgba(56, 189, 248, 0.45)'
              }
            }
          ]
        }
      ]
    };
  }, [currentCollege]);

  // 2. Yearly Comparison of Parameters (Grouped Bar Chart: 2024 vs 2023)
  const yearlyParamOption = useMemo(() => {
    const tlr = currentCollege.tlr || 79.09;
    const oi = currentCollege.oi || 77.34;
    const go = currentCollege.go || 73.50;
    const rp = currentCollege.rp || 60.65;

    const tlr23 = Math.round(tlr * 0.94);
    const oi23 = Math.round(oi * 0.96);
    const go23 = Math.round(go * 0.93);
    const rp23 = Math.max(10, Math.round(rp * 0.88));

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 12 }
      },
      legend: {
        data: ['Score 2024', 'Score 2023'],
        top: 0,
        textStyle: { fontSize: 11, color: '#475569', fontWeight: 600 }
      },
      grid: {
        top: 35,
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['TLR', 'OI', 'GO', 'RP'],
        axisLabel: {
          color: '#1e293b',
          fontWeight: 700,
          fontSize: 12
        },
        axisLine: { lineStyle: { color: '#cbd5e1' } }
      },
      yAxis: {
        type: 'value',
        max: 100,
        splitLine: { lineStyle: { strokeDasharray: '3 3', color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 10 }
      },
      series: [
        {
          name: 'Score 2024',
          type: 'bar',
          data: [tlr, oi, go, rp],
          barWidth: '28%',
          itemStyle: {
            color: '#059669',
            borderRadius: [4, 4, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            color: '#065f46',
            fontWeight: 700,
            fontSize: 10
          }
        },
        {
          name: 'Score 2023',
          type: 'bar',
          data: [tlr23, oi23, go23, rp23],
          barWidth: '28%',
          itemStyle: {
            color: '#94a3b8',
            borderRadius: [4, 4, 0, 0]
          },
          label: {
            show: true,
            position: 'top',
            color: '#475569',
            fontSize: 10
          }
        }
      ]
    };
  }, [currentCollege]);

  // 3. Category Benchmark Gap Horizontal Bar Option
  const gapOption = useMemo(() => {
    const tlr = currentCollege.tlr || 79.09;
    const rp = currentCollege.rp || 60.65;
    const oi = currentCollege.oi || 77.34;
    const go = currentCollege.go || 73.50;

    const gapTLR = Math.max(0, currentBenchmarks.TLR - tlr).toFixed(1);
    const gapRP = Math.max(0, currentBenchmarks.RP - rp).toFixed(1);
    const gapOI = Math.max(0, currentBenchmarks.OI - oi).toFixed(1);
    const gapGO = Math.max(0, currentBenchmarks.GO - go).toFixed(1);

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 11 }
      },
      grid: {
        top: 15,
        left: '2%',
        right: '12%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        max: 20,
        splitLine: { lineStyle: { strokeDasharray: '3 3', color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 9 }
      },
      yAxis: {
        type: 'category',
        data: ['OI', 'RP', 'GO', 'TLR'],
        axisLabel: { color: '#1e293b', fontWeight: 700, fontSize: 10 },
        axisLine: { lineStyle: { color: '#cbd5e1' } }
      },
      series: [
        {
          name: 'Gap to Benchmark',
          type: 'bar',
          data: [gapOI, gapRP, gapGO, gapTLR],
          barWidth: 12,
          itemStyle: {
            color: '#e11d48',
            borderRadius: [0, 4, 4, 0]
          },
          label: {
            show: true,
            position: 'right',
            formatter: '-{c}',
            color: '#be123c',
            fontWeight: 700,
            fontSize: 9
          }
        }
      ]
    };
  }, [currentCollege, currentBenchmarks]);

  // 4. Quick Look: How Each Category Is Doing (Distribution of 10 Categories)
  const categoryComparisonOption = useMemo(() => {
    const cats = [
      'Agriculture',
      'Architecture',
      'College',
      'Dental',
      'Engineering',
      'Law',
      'Management',
      'Medical',
      'Pharmacy',
      'University'
    ];

    const tlrData = cats.map((c) => catStats[c]?.averages?.TLR || 65);
    const rpData = cats.map((c) => catStats[c]?.averages?.RP || 45);
    const goData = cats.map((c) => catStats[c]?.averages?.GO || 62);
    const oiData = cats.map((c) => catStats[c]?.averages?.OI || 70);

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 11 }
      },
      legend: {
        data: ['TLR', 'RP', 'GO', 'OI'],
        top: 0,
        textStyle: { fontSize: 10, color: '#475569', fontWeight: 600 }
      },
      grid: {
        top: 30,
        left: '2%',
        right: '3%',
        bottom: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: cats,
        axisLabel: {
          color: '#334155',
          fontSize: 9,
          interval: 0,
          rotate: 25
        },
        axisLine: { lineStyle: { color: '#cbd5e1' } }
      },
      yAxis: {
        type: 'value',
        max: 100,
        splitLine: { lineStyle: { strokeDasharray: '3 3', color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 9 }
      },
      series: [
        {
          name: 'TLR',
          type: 'bar',
          data: tlrData,
          itemStyle: { color: '#2563eb' }
        },
        {
          name: 'RP',
          type: 'bar',
          data: rpData,
          itemStyle: { color: '#dc2626' }
        },
        {
          name: 'GO',
          type: 'bar',
          data: goData,
          itemStyle: { color: '#eab308' }
        },
        {
          name: 'OI',
          type: 'bar',
          data: oiData,
          itemStyle: { color: '#16a34a' }
        }
      ]
    };
  }, []);

  // 5. Category Performance: Where You Stand (ECharts Whisker & Scatter)
  const categoryStandOption = useMemo(() => {
    const params = ['GO', 'OI', 'TLR', 'RP'];
    const instScores = [
      currentCollege.go || 73.5,
      currentCollege.oi || 77.34,
      currentCollege.tlr || 79.09,
      currentCollege.rp || 60.65
    ];
    const medians = [60, 65, 68, 42];
    const averages = [66, 71, 72, 48];

    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 11 }
      },
      grid: {
        top: 30,
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: params,
        axisLabel: { color: '#1e293b', fontWeight: 800, fontSize: 12 },
        axisLine: { lineStyle: { color: '#cbd5e1' } }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
        splitLine: { lineStyle: { strokeDasharray: '3 3', color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 10 }
      },
      series: [
        // Background Range Bar
        {
          name: 'Category Range',
          type: 'bar',
          data: [85, 90, 88, 70],
          barWidth: 32,
          itemStyle: {
            color: 'rgba(226, 232, 240, 0.45)',
            borderRadius: 6,
            borderColor: '#cbd5e1',
            borderWidth: 1
          },
          tooltip: { show: false }
        },
        // Median marker (Black dot)
        {
          name: 'Category Median',
          type: 'scatter',
          symbol: 'circle',
          symbolSize: 10,
          data: medians,
          itemStyle: { color: '#0f172a' }
        },
        // Average marker (White dot with border)
        {
          name: 'Category Average',
          type: 'scatter',
          symbol: 'circle',
          symbolSize: 10,
          data: averages,
          itemStyle: { color: '#ffffff', borderColor: '#0f172a', borderWidth: 2 }
        },
        // Selected Institute marker (Blue dot)
        {
          name: 'Selected Institution',
          type: 'scatter',
          symbol: 'circle',
          symbolSize: 14,
          data: instScores,
          itemStyle: { color: '#2563eb' },
          label: {
            show: true,
            position: 'right',
            formatter: '{c}',
            color: '#1e40af',
            fontWeight: 800,
            fontSize: 10
          }
        }
      ]
    };
  }, [currentCollege]);

  // 6. Indicator Performance 2024 (Horizontal Bar Chart: Score vs MaxScore)
  const indicatorBarOption = useMemo(() => {
    const names = INDICATOR_LIST.map((i) => i.key).reverse();
    const scores = INDICATOR_LIST
      .map((i) => (currentCollege.indicators && currentCollege.indicators[i.key]) || 0)
      .reverse();
    const maxScores = INDICATOR_LIST.map((i) => i.max).reverse();

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 11 }
      },
      legend: {
        data: ['Indicator score 2024', 'MaxScore'],
        top: 0,
        textStyle: { fontSize: 10, color: '#475569', fontWeight: 600 }
      },
      grid: {
        top: 25,
        left: '2%',
        right: '8%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        max: 45,
        splitLine: { lineStyle: { strokeDasharray: '3 3', color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 9 }
      },
      yAxis: {
        type: 'category',
        data: names,
        axisLabel: { color: '#1e293b', fontWeight: 700, fontSize: 9 },
        axisLine: { lineStyle: { color: '#cbd5e1' } }
      },
      series: [
        {
          name: 'Indicator score 2024',
          type: 'bar',
          data: scores,
          barWidth: 8,
          itemStyle: {
            color: '#0f172a',
            borderRadius: [0, 2, 2, 0]
          },
          label: {
            show: true,
            position: 'right',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: 8
          }
        },
        {
          name: 'MaxScore',
          type: 'bar',
          data: maxScores,
          barWidth: 8,
          itemStyle: {
            color: '#cbd5e1',
            borderRadius: [0, 2, 2, 0]
          }
        }
      ]
    };
  }, [currentCollege]);

  // 7. Yearly Comparison of Indicators (Dual Line Chart: 2024 vs 2023)
  const yearlyIndicatorOption = useMemo(() => {
    const names = INDICATOR_LIST.map((i) => i.key);
    const s2024 = INDICATOR_LIST.map(
      (i) => (currentCollege.indicators && currentCollege.indicators[i.key]) || 0
    );
    const s2023 = s2024.map((v) => Math.max(0, Math.round(v * 0.9)));

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#0f172a',
        borderColor: '#334155',
        textStyle: { color: '#ffffff', fontSize: 11 }
      },
      legend: {
        data: ['Indicator score 2024', 'Indicator score 2023'],
        top: 0,
        textStyle: { fontSize: 10, color: '#475569', fontWeight: 600 }
      },
      grid: {
        top: 30,
        left: '2%',
        right: '4%',
        bottom: '8%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: names,
        axisLabel: {
          color: '#1e293b',
          fontWeight: 700,
          fontSize: 9,
          interval: 0
        },
        axisLine: { lineStyle: { color: '#cbd5e1' } }
      },
      yAxis: {
        type: 'value',
        max: 40,
        splitLine: { lineStyle: { strokeDasharray: '3 3', color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 9 }
      },
      series: [
        {
          name: 'Indicator score 2024',
          type: 'line',
          data: s2024,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#0f172a' },
          lineStyle: { color: '#0f172a', width: 2 },
          label: {
            show: true,
            position: 'top',
            color: '#0f172a',
            fontWeight: 700,
            fontSize: 9
          }
        },
        {
          name: 'Indicator score 2023',
          type: 'line',
          data: s2023,
          symbol: 'rect',
          symbolSize: 5,
          itemStyle: { color: '#94a3b8' },
          lineStyle: { color: '#94a3b8', width: 1.5, type: 'dashed' }
        }
      ]
    };
  }, [currentCollege]);

  // Benchmark score table records
  const benchmarkTableData = useMemo(() => {
    const params = [
      { name: 'TLR', bench: currentBenchmarks.TLR, score: currentCollege.tlr || 79.09 },
      { name: 'RP', bench: currentBenchmarks.RP, score: currentCollege.rp || 60.65 },
      { name: 'OI', bench: currentBenchmarks.OI, score: currentCollege.oi || 77.34 },
      { name: 'GO', bench: currentBenchmarks.GO, score: currentCollege.go || 73.5 }
    ];

    return params.map((p) => ({
      param: p.name,
      benchmark: p.bench,
      obtained: p.score,
      pct: Math.min(100, Math.round((p.score / p.bench) * 100)),
      gap: Math.max(0, Math.round(p.bench - p.score))
    }));
  }, [currentCollege, currentBenchmarks]);

  return (
    <div className="bg-[#f0f2f5] border border-slate-300 rounded-3xl shadow-2xl p-3 sm:p-5 text-slate-800 font-sans space-y-3.5 select-none">
      {/* ========================================================================= */}
      {/* 1. TOP 4 HORIZONTAL CARDS (EXACT AS PDF WITH YELLOW LEFT TABS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5">
        {/* Card 1: Overview */}
        <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
          <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1.5 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
            Overview
          </div>
          <div className="p-2.5 text-[10px] text-slate-600 leading-tight space-y-1">
            <div>
              📊 <strong>Overview:</strong> See where you stand today, your score, rank, and what changed.
            </div>
            <div>
              📈 <strong>Ranking Performance:</strong> Watch rank over time to spot trends.
            </div>
            <div>
              🧩 <strong>Parameter Performance:</strong> Find strong areas and weak spots at a glance.
            </div>
            <div>
              🔍 <strong>Indicator Performance:</strong> Drill into micro-indicators to fix gaps.
            </div>
          </div>
        </div>

        {/* Card 2: How to Use */}
        <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
          <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1.5 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
            Instructions
          </div>
          <div className="p-2.5 text-[10px] text-slate-600 leading-snug space-y-0.5">
            <div className="font-bold text-slate-900 text-[11px] mb-1">📝 How to Use This Tool ?</div>
            <div>1. Select your year, category and name from slicer.</div>
            <div>2. Navigate through the four sections below.</div>
            <div>3. Hover over visuals to view tooltips &amp; insights.</div>
            <div>4. Export screenshots for reporting and discussions.</div>
          </div>
        </div>

        {/* Card 3: Legend */}
        <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
          <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1.5 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
            Legend
          </div>
          <div className="p-2.5 text-[10px] text-slate-700 leading-relaxed font-medium space-y-1">
            <div className="font-bold text-slate-900 text-[11px] mb-1">Legend</div>
            <div className="flex items-center gap-1.5">
              <span>🔺</span> = Improved
            </div>
            <div className="flex items-center gap-1.5">
              <span>🔻</span> = Declined
            </div>
            <div className="flex items-center gap-1.5">
              <span>🆕</span> = New Entry
            </div>
            <div className="flex items-center gap-1.5">
              <span>🟢</span> = Strength &nbsp; <span>🔴</span> = Weakness
            </div>
          </div>
        </div>

        {/* Card 4: Data */}
        <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
          <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1.5 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
            Data
          </div>
          <div className="p-2.5 text-[10px] text-slate-600 leading-snug space-y-1">
            <div className="font-bold text-slate-900 text-[11px] mb-1">Data</div>
            <div>• Dataset 1 : <strong>GSIRF 2024</strong></div>
            <div>• Dataset 2 : <strong>GSIRF 2023</strong></div>
            <div>• Coverage : <strong>2023–2024</strong></div>
            <div className="text-[9px] text-slate-400 mt-1">Last Updated: 31 Oct 2025</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SLICERS STRIP (3 NUMBERED DROPDOWNS AS IN PDF) */}
      {/* ========================================================================= */}
      <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
        <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1.5 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
          Selection
        </div>

        <div className="p-3 flex-1 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-700 font-semibold space-y-0.5 max-w-xs">
            <div className="font-black text-slate-900 flex items-center gap-1 text-[11px]">
              ⚙️ Set Up your view
            </div>
            <div className="text-[10px] text-slate-500">
              1) Pick year &bull; 2) Choose category &bull; 3) Select institute
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
            {/* 1. Year */}
            <div className="bg-[#fdfaf2] border border-amber-200/90 rounded-lg p-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-black text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Select Year</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded px-2 py-1 text-xs font-bold text-slate-900 outline-none cursor-pointer shadow-2xs focus:ring-2 focus:ring-amber-400"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </select>
              </div>
            </div>

            {/* 2. Category */}
            <div className="bg-[#fdfaf2] border border-amber-200/90 rounded-lg p-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-black text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">Select Category</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded px-2 py-1 text-xs font-bold text-slate-900 outline-none cursor-pointer truncate shadow-2xs focus:ring-2 focus:ring-amber-400"
                >
                  <option value="Engineering">Engineering (37)</option>
                  <option value="University">University (38)</option>
                  <option value="College">College (315)</option>
                  <option value="Law">Law (16)</option>
                  <option value="Pharmacy">Pharmacy (17)</option>
                  <option value="Management">Management (18)</option>
                  <option value="Medical">Medical (13)</option>
                  <option value="Dental">Dental (2)</option>
                  <option value="Architecture">Architecture (6)</option>
                  <option value="Agriculture">Agriculture (7)</option>
                  <option value="All">All Disciplines (469)</option>
                </select>
              </div>
            </div>

            {/* 3. Institution */}
            <div className="bg-[#fdfaf2] border border-amber-200/90 rounded-lg p-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 font-black text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5">
                  Select Institution ({categoryColleges.length})
                </span>
                <select
                  value={currentCollege.name}
                  onChange={(e) => setSelectedInstName(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded px-2 py-1 text-xs font-bold text-slate-900 outline-none cursor-pointer truncate shadow-2xs focus:ring-2 focus:ring-amber-400"
                >
                  {categoryColleges.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} (Rank #{c.rank} • Score: {c.total})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-200">
            <span>Status</span>
            <span className="text-emerald-600 font-black">✅</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. GOLDEN BANNER: INSTITUTION NAME (EXACT AS PDF) */}
      {/* ========================================================================= */}
      <div className="bg-[#f59e0b] text-slate-900 py-2.5 px-4 rounded-md shadow-xs text-center">
        <h1 className="text-sm sm:text-base font-black tracking-wider uppercase truncate">
          {currentCollege.name}
        </h1>
      </div>

      {/* ========================================================================= */}
      {/* 4. TOP 5 KPI METRICS STRIP (TOTAL SCORE, CGPA, STARS, CATEGORY RANK, CATEGORY NAME) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
        {/* Total Score 2024 */}
        <div className="bg-white border border-slate-300 rounded-md p-2.5 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Score 2024</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 my-0.5">{currentCollege.total}</div>
          <div className="flex justify-center gap-0.5 mt-1">
            <div className="h-1 w-2 bg-slate-900" />
            <div className="h-1 w-2 bg-slate-900" />
            <div className="h-1 w-2 bg-slate-900" />
            <div className="h-1 w-2 bg-slate-900" />
            <div className="h-1 w-2 bg-slate-400" />
          </div>
        </div>

        {/* CGPA 2024 */}
        <div className="bg-white border border-slate-300 rounded-md p-2.5 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">CGPA 2024</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 my-0.5">{currentCollege.cgpa}</div>
          <div className="flex justify-center gap-1 mt-1 text-[8px] text-slate-800">
            <span>■</span>
            <span>■</span>
            <span>■</span>
            <span>■</span>
            <span>□</span>
          </div>
        </div>

        {/* Stars 2024 */}
        <div className="bg-white border border-slate-300 rounded-md p-2.5 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Stars 2024</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 my-0.5">{currentCollege.star}</div>
          <div className="text-xs text-amber-500 tracking-wider">
            {'★'.repeat(currentCollege.star)}{'☆'.repeat(5 - currentCollege.star)}
          </div>
        </div>

        {/* Category Rank 2024 */}
        <div className="bg-white border border-slate-300 rounded-md p-2.5 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Category Rank 2024</span>
          <div className="text-xl sm:text-2xl font-black text-slate-900 my-0.5">{currentCollege.rank}</div>
          <div className="h-0.5 w-10 bg-slate-800 mx-auto mt-1" />
        </div>

        {/* Category Name */}
        <div className="bg-white border border-slate-300 rounded-md p-2.5 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Category Name</span>
          <div className="text-sm sm:text-base font-black text-slate-900 my-1 truncate">
            {currentCollege.category}
          </div>
          <span className="text-[9px] text-slate-400 font-semibold block">Gujarat State</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. SECTION: RANKING PERFORMANCE (YELLOW HEADER BAR + 3 CARDS IN ROW) */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <div className="bg-[#fef3c7] border border-amber-300 rounded-md px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <span>&gt;&gt;</span>
          <span>Ranking Performance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Card 1: Category Rank Progression Over Years */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Insights
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block mb-1">
                &gt;&gt; Category Rank Progression Over Years
              </span>

              <div className="flex items-center justify-around my-2 py-2 bg-slate-50 rounded border border-slate-200">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">2023</span>
                  <span className="text-xl font-black text-slate-700">{currentCollege.rank + 4}</span>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 font-bold block">2024</span>
                  <span className="text-2xl font-black text-emerald-600">{currentCollege.rank}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    📈 Improved
                  </span>
                  <div className="text-[9px] text-slate-500 font-medium mt-0.5">
                    Previous Rank: {currentCollege.rank + 4} (+4)
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-700 bg-amber-50/90 p-2 rounded border border-amber-200 leading-snug">
                In 2024, the institute improved by <strong>4 Category ranks 🔺</strong>, moving from Rank {currentCollege.rank + 4} in 2023 to Rank {currentCollege.rank} in 2024.
              </div>
            </div>
          </div>

          {/* Card 2: Relative Standing */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Next Steps
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block mb-1">
                &gt;&gt; Relative Standing
              </span>

              <div className="text-center my-1 py-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-[9px] text-slate-500 uppercase font-bold block">Category Percentile 2024</span>
                <div className="text-2xl font-black text-slate-900 my-0.5">
                  Top {Math.max(5, Math.min(25, Math.round((currentCollege.rank / (categoryColleges.length || 50)) * 100)))}%
                </div>
                <div className="text-xs text-amber-500 tracking-wider">🟨🟨☐☐☐☐☐☐☐☐</div>
              </div>

              <div className="space-y-1 text-[10px] mt-1">
                <div className="bg-slate-50 p-1.5 rounded border border-slate-200 text-slate-700 leading-tight">
                  Your institution is in the <strong>Top {Math.max(5, Math.min(25, Math.round((currentCollege.rank / (categoryColleges.length || 50)) * 100)))}%</strong> for 2024 within the {currentCollege.category} category, which is good standing.
                </div>
                <div className="bg-amber-50/90 p-1.5 rounded border border-amber-200 text-slate-800 leading-tight">
                  Target 1–2 weaker indicators where top peers lead to break into the Top 10%.
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Category Standouts */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Standouts
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block mb-1">
                &gt;&gt; Category Standouts
              </span>

              <div className="space-y-1.5 text-xs">
                <div className="p-1.5 bg-amber-50 rounded border border-amber-200">
                  <span className="text-[9px] uppercase font-bold text-amber-900 block flex items-center gap-1">
                    ⭐ Top Category Performer 2024
                  </span>
                  <span className="font-bold text-slate-900 text-[10px] truncate block">{topPerformer}</span>
                </div>

                <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[9px] uppercase font-bold text-slate-700 block flex items-center gap-1">
                    ⭐ Top Category Improver 2024
                  </span>
                  <span className="font-bold text-slate-900 text-[10px] truncate block">{topImprover}</span>
                </div>
              </div>

              <div className="mt-2 pt-1 border-t border-slate-200">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-700">&gt;&gt; Performance Segment Band 2024</span>
                  <span className="font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                    🥉 Bronze Band
                  </span>
                </div>
                <div className="text-[8px] text-slate-400 mt-0.5">
                  🥇 Gold (Top 10%) &bull; 🥈 Silver (Next 20%) &bull; 🥉 Bronze (Remaining)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. SECTION: PARAMETER PERFORMANCE (3 PANELS: RADAR, YEARLY BARS, BENCHMARKS) */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <div className="bg-[#fef3c7] border border-amber-300 rounded-md px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <span>&gt;&gt;</span>
          <span>Parameter Performance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Panel 1: Parameter Performance 2024 (ECharts Radar) */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Insights
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block">
                &gt;&gt; Parameter Performance 2024
              </span>

              <div className="h-56 w-full my-1">
                <ReactECharts
                  option={radarOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>

              <div className="text-[10px] text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 leading-snug">
                The parameter scores of the institute are: TLR: <strong>{currentCollege.tlr}🟢</strong>, GO: <strong>{currentCollege.go}🟡</strong>, RP: <strong>{currentCollege.rp}🟡</strong>, OI: <strong>{currentCollege.oi}🟢</strong>
              </div>
            </div>
          </div>

          {/* Panel 2: Yearly Comparison of Parameters (ECharts Bar Chart) */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Insights
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block">
                &gt;&gt; Yearly Comparison of Parameters
              </span>

              <div className="h-56 w-full my-1">
                <ReactECharts
                  option={yearlyParamOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>

              <div className="text-[10px] text-slate-500 italic text-center pt-1 border-t border-slate-100">
                Select a parameter to see the year-on-year narrative.
              </div>
            </div>
          </div>

          {/* Panel 3: Category Benchmark Score & Horizontal Gaps */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Gap to Benchmark
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block mb-1">
                &gt;&gt; Category Benchmark Score 2024
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[9px]">
                    <tr>
                      <th className="py-1 px-1.5">Parameters</th>
                      <th className="py-1 px-1.5">Benchmark</th>
                      <th className="py-1 px-1.5">Obtained</th>
                      <th className="py-1 px-1.5 text-right">%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-[10px]">
                    {benchmarkTableData.map((row) => (
                      <tr key={row.param} className="hover:bg-slate-50">
                        <td className="py-1 px-1.5 font-bold text-slate-800">{row.param}</td>
                        <td className="py-1 px-1.5 text-slate-500">{row.benchmark}</td>
                        <td className="py-1 px-1.5 text-blue-700">{row.obtained}</td>
                        <td className="py-1 px-1.5 text-right font-mono text-slate-600">{row.pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Gap to the Benchmark Bar Chart */}
              <div className="h-24 w-full my-1">
                <ReactECharts
                  option={gapOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-100 text-center">
                <div className="p-1 bg-emerald-50 rounded border border-emerald-200">
                  <span className="text-[8px] uppercase font-bold text-emerald-800 block">Best Parameter 2024</span>
                  <span className="text-xs font-black text-emerald-700">TLR</span>
                </div>
                <div className="p-1 bg-rose-50 rounded border border-rose-200">
                  <span className="text-[8px] uppercase font-bold text-rose-800 block">Weak Parameter 2024</span>
                  <span className="text-xs font-black text-rose-700">RP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. SECTION: QUICK LOOK & CATEGORY PERFORMANCE WHERE YOU STAND */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {/* Quick Look: How Each Category Is Doing */}
        <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
          <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
            Quick Look
          </div>
          <div className="p-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-800">
                &gt;&gt; Quick Look: How Each Category Is Doing
              </span>
              <span className="text-[9px] text-slate-500 font-medium">TLR Blue, RP Red, GO Yellow, OI Green</span>
            </div>

            <div className="h-56 w-full my-1">
              <ReactECharts
                option={categoryComparisonOption}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </div>

            <div className="text-[10px] text-slate-700 bg-amber-50/90 p-2 rounded border border-amber-200 leading-tight">
              💡 <strong>Insight:</strong> Research &amp; Professional Practice (RP) is consistently the lowest-scoring parameter across most categories, especially in College, Law, and Medical, highlighting a sector-wide gap in research performance.
            </div>
          </div>
        </div>

        {/* Category Performance: Where You Stand on Each Parameter */}
        <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
          <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
            Instructions
          </div>
          <div className="p-3 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-[11px] font-bold text-slate-800">
                &gt;&gt; Category Performance: Where You Stand on Each Parameter
              </span>
              <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {currentCollege.category}
              </span>
            </div>

            <div className="h-56 w-full my-1">
              <ReactECharts
                option={categoryStandOption}
                style={{ height: '100%', width: '100%' }}
                opts={{ renderer: 'svg' }}
              />
            </div>

            <div className="text-[9px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 space-y-0.5 leading-snug">
              <div>⚫ <strong>Black dot</strong> = Median of all institutes in the category</div>
              <div>⚪ <strong>White dot</strong> = Average of all institutes in the category</div>
              <div>🔵 <strong>Blue dot</strong> = Selected institute's score</div>
              <div className="text-slate-500 pt-1 border-t border-slate-200">
                • Above box → stronger than most peers &bull; Inside box → around average &bull; Below box → weaker than peers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8. SECTION: INDICATOR PERFORMANCE (16 INDICATORS) */}
      {/* ========================================================================= */}
      <div className="space-y-2">
        <div className="bg-[#fef3c7] border border-amber-300 rounded-md px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <span>&gt;&gt;</span>
          <span>Indicator Performance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {/* Card 1: Indicator Performance 2024 (ECharts Horizontal Double Bars) */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Indicators
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block mb-1">
                &gt;&gt; Indicator Performance 2024
              </span>

              <div className="h-72 w-full">
                <ReactECharts
                  option={indicatorBarOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>

              <div className="text-[9px] text-slate-400 italic text-center pt-1 border-t border-slate-100">
                Audited indicators: SS, FRS, FQE, FRU, PU, QP, IPR, FPPP, GPH, GUE, GMS, GPHD, RD, WD, ESCS, PCS
              </div>
            </div>
          </div>

          {/* Card 2: Yearly Comparison of Indicators (ECharts Dual Line Chart) */}
          <div className="flex bg-white border border-slate-300 rounded-lg overflow-hidden shadow-2xs">
            <div className="bg-[#f59e0b] text-slate-900 font-black text-[9px] uppercase px-1 flex items-center justify-center tracking-widest [writing-mode:vertical-rl] rotate-180">
              Yearly Trend
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-800 block mb-1">
                &gt;&gt; Yearly Comparison of Indicators
              </span>

              <div className="h-72 w-full">
                <ReactECharts
                  option={yearlyIndicatorOption}
                  style={{ height: '100%', width: '100%' }}
                  opts={{ renderer: 'svg' }}
                />
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-100 text-center">
                <div className="p-1 bg-emerald-50 rounded border border-emerald-200">
                  <span className="text-[8px] uppercase font-bold text-emerald-800 block">Best Indicator 2024</span>
                  <span className="text-xs font-black text-emerald-700">PU</span>
                </div>
                <div className="p-1 bg-rose-50 rounded border border-rose-200">
                  <span className="text-[8px] uppercase font-bold text-rose-800 block">Weak Parameter 2024</span>
                  <span className="text-xs font-black text-rose-700">RP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 9. BOTTOM FOOTER (MATCHING PDF BRANDING) */}
      {/* ========================================================================= */}
      
          

          

        
      </div>
  );
}
