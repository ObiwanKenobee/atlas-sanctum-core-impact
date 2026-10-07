import React, { useState } from 'react';
import { 
  IntelligenceSignal, 
  EvidenceSource, 
  EpistemicStatus,
  Place 
} from '../types/atlas';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { 
  BrainCircuit, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Database, 
  Satellite, 
  Activity, 
  Users, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileCheck,
  TrendingUp
} from 'lucide-react';

interface SignalTimelinePoint {
  date: string;
  intensity: number;
  baseline: number;
}

const getPlaceIntensityHistory = (placeId: string): SignalTimelinePoint[] => {
  switch (placeId) {
    case 'lake-nakuru-basin':
      return [
        { date: 'Oct 01', intensity: 42, baseline: 30 },
        { date: 'Oct 02', intensity: 46, baseline: 30 },
        { date: 'Oct 03', intensity: 58, baseline: 30 },
        { date: 'Oct 04', intensity: 71, baseline: 30 },
        { date: 'Oct 05', intensity: 84, baseline: 30 },
        { date: 'Oct 06', intensity: 88, baseline: 30 },
        { date: 'Oct 07', intensity: 86, baseline: 30 },
      ];
    case 'rhonda-kaptembwa':
      return [
        { date: 'Oct 01', intensity: 24, baseline: 20 },
        { date: 'Oct 02', intensity: 28, baseline: 20 },
        { date: 'Oct 03', intensity: 36, baseline: 20 },
        { date: 'Oct 04', intensity: 62, baseline: 20 },
        { date: 'Oct 05', intensity: 78, baseline: 20 },
        { date: 'Oct 06', intensity: 86, baseline: 20 },
        { date: 'Oct 07', intensity: 92, baseline: 20 },
      ];
    case 'mau-forest-complex':
      return [
        { date: 'Oct 01', intensity: 35, baseline: 25 },
        { date: 'Oct 02', intensity: 44, baseline: 25 },
        { date: 'Oct 03', intensity: 59, baseline: 25 },
        { date: 'Oct 04', intensity: 74, baseline: 25 },
        { date: 'Oct 05', intensity: 85, baseline: 25 },
        { date: 'Oct 06', intensity: 89, baseline: 25 },
        { date: 'Oct 07', intensity: 91, baseline: 25 },
      ];
    case 'menengai-caldera':
      return [
        { date: 'Oct 01', intensity: 68, baseline: 50 },
        { date: 'Oct 02', intensity: 72, baseline: 50 },
        { date: 'Oct 03', intensity: 75, baseline: 50 },
        { date: 'Oct 04', intensity: 81, baseline: 50 },
        { date: 'Oct 05', intensity: 85, baseline: 50 },
        { date: 'Oct 06', intensity: 83, baseline: 50 },
        { date: 'Oct 07', intensity: 85, baseline: 50 },
      ];
    default:
      return [
        { date: 'Oct 01', intensity: 30, baseline: 25 },
        { date: 'Oct 02', intensity: 35, baseline: 25 },
        { date: 'Oct 03', intensity: 45, baseline: 25 },
        { date: 'Oct 04', intensity: 58, baseline: 25 },
        { date: 'Oct 05', intensity: 68, baseline: 25 },
        { date: 'Oct 06', intensity: 74, baseline: 25 },
        { date: 'Oct 07', intensity: 72, baseline: 25 },
      ];
  }
};

const CustomSparklineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const base = payload[0].payload.baseline;
    return (
      <div className="bg-[#0c0d0e]/95 border border-[#2b3038] p-2 rounded-xs shadow-lg text-[10px] font-mono">
        <div className="text-[#8c94a0]">{label}</div>
        <div className="text-[#f5f2eb] font-semibold mt-0.5">
          Intensity: <span className="text-[#c27847]">{val}%</span>
        </div>
        <div className="text-[#656e7b]">Safety Baseline: {base}%</div>
      </div>
    );
  }
  return null;
};

interface IntelligenceEngineProps {
  signals: IntelligenceSignal[];
  selectedSignal: IntelligenceSignal | null;
  onSelectSignal: (signal: IntelligenceSignal) => void;
  places: Place[];
  onFormulateDecision: (signal: IntelligenceSignal) => void;
}

export const IntelligenceEngine: React.FC<IntelligenceEngineProps> = ({
  signals,
  selectedSignal,
  onSelectSignal,
  places,
  onFormulateDecision
}) => {
  const [activeSignal, setActiveSignal] = useState<IntelligenceSignal>(
    selectedSignal || signals[0]
  );
  const [expandedTrustLayer, setExpandedTrustLayer] = useState<boolean>(true);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredSignals = signals.filter(s => 
    filterCategory === 'all' ? true : s.category === filterCategory
  );

  const placeIntensityData = getPlaceIntensityHistory(activeSignal.placeId);

  const getEpistemicBadgeColor = (tier: EpistemicStatus) => {
    switch (tier) {
      case 'fact':
      case 'measured':
        return 'text-emerald-400 border-emerald-800/60 bg-emerald-950/20';
      case 'observed':
        return 'text-cyan-400 border-cyan-800/60 bg-cyan-950/20';
      case 'correlated':
        return 'text-blue-400 border-blue-800/60 bg-blue-950/20';
      case 'inferred':
      case 'modeled':
        return 'text-amber-400 border-amber-800/60 bg-amber-950/20';
      case 'predicted':
      case 'hypothesized':
        return 'text-[#e8705c] border-[#8a3324] bg-[#3a1510]/30';
      default:
        return 'text-[#9ba3af] border-[#2f3540] bg-[#16181c]';
    }
  };

  const getSourceIcon = (type: EvidenceSource['type']) => {
    switch (type) {
      case 'satellite': return <Satellite className="w-3.5 h-3.5 text-cyan-400" />;
      case 'ground_sensor': return <Activity className="w-3.5 h-3.5 text-emerald-400" />;
      case 'community_report': return <Users className="w-3.5 h-3.5 text-[#e8a36e]" />;
      default: return <Database className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner on Epistemic Discipline */}
      <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c27847] uppercase">
            <BrainCircuit className="w-4 h-4" />
            <span>Epistemic Governance & Evidence Registry</span>
          </div>
          <h2 className="text-lg font-serif font-medium text-[#f5f2eb] mt-0.5">
            Strict Epistemic Separation: Reality Outranks Narrative
          </h2>
          <p className="text-xs text-[#8c94a0] font-mono mt-1">
            DATA ≠ EVIDENCE ≠ INFERENCE ≠ PREDICTION ≠ DECISION. Every intelligence object exposes its confidence, limitations, and underlying sensors.
          </p>
        </div>

        {/* Epistemic Status Hierarchy Legend */}
        <div className="flex items-center gap-2 overflow-x-auto text-[10px] font-mono">
          <span className="px-2 py-0.5 border rounded-xs border-emerald-800 text-emerald-400">MEASURED</span>
          <span>→</span>
          <span className="px-2 py-0.5 border rounded-xs border-cyan-800 text-cyan-400">OBSERVED</span>
          <span>→</span>
          <span className="px-2 py-0.5 border rounded-xs border-amber-800 text-amber-400">INFERRED</span>
          <span>→</span>
          <span className="px-2 py-0.5 border rounded-xs border-rose-800 text-rose-400">PREDICTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Signals List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase">
              Signals Queue ({filteredSignals.length})
            </span>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-[#111316] p-1 border border-[#22272e] rounded-xs text-[10px] font-mono">
              {['all', 'water', 'community', 'ecology'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2 py-0.5 rounded-xs uppercase transition-colors ${
                    filterCategory === cat 
                      ? 'bg-[#c27847] text-[#0c0d0e] font-semibold' 
                      : 'text-[#838c99] hover:text-[#e8e6df]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredSignals.map(sig => {
              const isSelected = sig.id === activeSignal.id;
              return (
                <div
                  key={sig.id}
                  onClick={() => {
                    setActiveSignal(sig);
                    onSelectSignal(sig);
                  }}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#15191f] border-[#c27847] text-[#f5f2eb]'
                      : 'bg-[#111316] border-[#22272e] text-[#8e96a2] hover:border-[#343b47] hover:text-[#d0d6e0]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-[#c27847] font-semibold uppercase">{sig.placeName}</span>
                    <span className={`px-1.5 py-0.2 border rounded-xs font-mono uppercase ${getEpistemicBadgeColor(sig.epistemicStatus)}`}>
                      {sig.epistemicStatus}
                    </span>
                  </div>

                  <h3 className="text-xs font-medium text-[#f0ede6] leading-snug line-clamp-2">
                    {sig.headline}
                  </h3>

                  {/* Card Mini Sparkline Preview */}
                  <div className="mt-2 h-7 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={getPlaceIntensityHistory(sig.placeId)} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                        <Area 
                          type="monotone" 
                          dataKey="intensity" 
                          stroke="#c27847" 
                          strokeWidth={1.5} 
                          fill="#c27847" 
                          fillOpacity={0.15} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#1d2229] flex items-center justify-between text-[10px] font-mono text-[#78818f]">
                    <span>CONFIDENCE: {sig.confidencePercent}%</span>
                    <span>{sig.evidence.length} SOURCES</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Signal Detail & Trust Layer (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 bg-[#111316] border border-[#22272e] rounded-sm space-y-5">
            {/* Header info */}
            <div className="border-b border-[#1f242c] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#c27847] uppercase font-semibold">{activeSignal.placeName}</span>
                  <span className="text-[#555d6b]">·</span>
                  <span className="text-[#8c94a0] uppercase">{activeSignal.category}</span>
                  <span className="text-[#555d6b]">·</span>
                  <span className="text-[#8c94a0]">{new Date(activeSignal.detectedAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 border rounded-xs text-[10px] font-mono uppercase ${getEpistemicBadgeColor(activeSignal.epistemicStatus)}`}>
                    TIER: {activeSignal.epistemicStatus}
                  </span>
                  <span className="px-2 py-0.5 bg-[#1b1f26] border border-[#2f3540] text-[#e8e6df] text-[10px] font-mono">
                    CONFIDENCE {activeSignal.confidencePercent}%
                  </span>
                </div>
              </div>

              <h2 className="text-xl font-serif font-medium text-[#f5f2eb] mt-2 leading-snug">
                {activeSignal.headline}
              </h2>
            </div>

            {/* Mini Sparkline Chart: Intensity of intelligence signals over time for the selected place */}
            <div className="p-3.5 bg-[#0c0d0e] border border-[#1f242c] rounded-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-[#c27847]" />
                  <span className="text-[10px] text-[#f5f2eb] font-semibold uppercase tracking-wider">
                    Signal Intensity Trajectory Over Time · {activeSignal.placeName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#8c94a0]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-0.5 bg-[#c27847]" />
                    Intensity Index
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-0.5 bg-[#424854] border-t border-dashed" />
                    Safety Baseline
                  </span>
                  <span className="text-emerald-400 font-semibold">
                    ▲ +{((placeIntensityData[placeIntensityData.length - 1].intensity - placeIntensityData[0].intensity) / placeIntensityData[0].intensity * 100).toFixed(0)}% (7-day delta)
                  </span>
                </div>
              </div>

              {/* Recharts Mini Sparkline Area Chart */}
              <div className="w-full h-24 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={placeIntensityData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="intensityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c27847" stopOpacity={0.45} />
                        <stop offset="95%" stopColor="#c27847" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="#4b5563" 
                      fontSize={9} 
                      fontFamily="monospace" 
                      tickLine={false}
                      axisLine={{ stroke: '#22272e' }}
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      stroke="#4b5563" 
                      fontSize={9} 
                      fontFamily="monospace" 
                      tickLine={false}
                      axisLine={false}
                      ticks={[25, 50, 75, 100]}
                      width={28}
                    />
                    <Tooltip content={<CustomSparklineTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="intensity" 
                      stroke="#c27847" 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#intensityGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="baseline" 
                      stroke="#4b5563" 
                      strokeDasharray="3 3"
                      strokeWidth={1} 
                      fill="transparent" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Canonical Structure: Signal -> Why It Matters -> Recommendation */}
            <div className="space-y-4 text-xs font-mono">
              <div className="p-3.5 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs space-y-1">
                <span className="text-[10px] text-[#c27847] uppercase font-semibold block">
                  SYNTHESIZED OBSERVATION
                </span>
                <p className="text-[#d8dadf] text-sm font-sans leading-relaxed">
                  {activeSignal.summary}
                </p>
              </div>

              <div className="p-3.5 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs space-y-1">
                <span className="text-[10px] text-[#e8705c] uppercase font-semibold block">
                  WHY IT MATTERS (SYSTEMIC IMPACT)
                </span>
                <p className="text-[#d8dadf] text-sm font-sans leading-relaxed">
                  {activeSignal.whyItMatters}
                </p>
              </div>

              <div className="p-3.5 bg-[#0f1715] border border-[#1d3d2f] rounded-xs space-y-1">
                <span className="text-[10px] text-emerald-400 uppercase font-semibold block">
                  RECOMMENDED INTERVENTION
                </span>
                <p className="text-[#d8dadf] text-sm font-sans leading-relaxed">
                  {activeSignal.recommendedAction}
                </p>
              </div>
            </div>

            {/* EXPANDABLE TRUST LAYER (Section 12 of Master Prompt) */}
            <div className="border border-[#232932] bg-[#0c0d0e] rounded-xs overflow-hidden">
              <button
                onClick={() => setExpandedTrustLayer(!expandedTrustLayer)}
                className="w-full flex items-center justify-between p-3.5 bg-[#14171c] border-b border-[#232932] hover:bg-[#181c22] transition-colors"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#f5f2eb] font-semibold uppercase">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Inspectable Trust Layer & Evidence Lineage</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#8c94a0]">
                  <span>{activeSignal.evidence.length} Telemetry Sources</span>
                  {expandedTrustLayer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {expandedTrustLayer && (
                <div className="p-4 space-y-4 text-xs font-mono">
                  {/* Evidence Chain */}
                  <div>
                    <span className="text-[10px] text-[#7d8694] uppercase tracking-wider block mb-2 font-semibold">
                      TELEMETRIC EVIDENCE LINEAGE
                    </span>
                    <div className="space-y-2">
                      {activeSignal.evidence.map(ev => (
                        <div key={ev.id} className="p-3 bg-[#111316] border border-[#1e232a] rounded-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#f5f2eb] font-medium">
                              {getSourceIcon(ev.type)}
                              <span>{ev.title}</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-mono">
                              SCORE: {ev.confidenceScore}%
                            </span>
                          </div>
                          <div className="text-[11px] text-[#8e96a2] pl-5 flex flex-wrap gap-x-4 gap-y-1">
                            <span>Source: {ev.sensorOrAuthor}</span>
                            <span>·</span>
                            <span>Resolution: {ev.resolutionOrPrecision}</span>
                            <span>·</span>
                            <span>Tier: {ev.epistemicTier.toUpperCase()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Model & Methodology */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-[#111316] border border-[#1e232a] rounded-xs">
                      <span className="text-[10px] text-[#7d8694] uppercase block">ANALYTICAL MODEL</span>
                      <span className="text-sm font-medium text-[#f0ede6] mt-0.5 block">{activeSignal.modelUsed}</span>
                    </div>

                    <div className="p-3 bg-[#111316] border border-[#1e232a] rounded-xs">
                      <span className="text-[10px] text-[#7d8694] uppercase block">VERIFICATION STATE</span>
                      <span className="text-sm font-medium text-amber-400 mt-0.5 block">Telemetry Audited · Action Pending</span>
                    </div>
                  </div>

                  {/* Assumptions & Known Limitations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#141210] border border-[#3b2719] rounded-xs">
                      <span className="text-[10px] text-[#c27847] uppercase font-semibold block mb-1">
                        EXPLICIT ASSUMPTIONS
                      </span>
                      <ul className="space-y-1 text-[11px] text-[#cdb7a6]">
                        {activeSignal.assumptions.map((ass, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span>·</span>
                            <span>{ass}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-[#171110] border border-[#48201b] rounded-xs">
                      <span className="text-[10px] text-[#e8705c] uppercase font-semibold block mb-1">
                        KNOWN LIMITATIONS & CONFOUNDERS
                      </span>
                      <ul className="space-y-1 text-[11px] text-[#d6b0aa]">
                        {activeSignal.limitations.map((lim, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span>·</span>
                            <span>{lim}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#1d2228]">
              <div className="text-[11px] font-mono text-[#78818f]">
                Institutional Protocol: Ready for scenario formulation in Decision Engine
              </div>
              <button
                onClick={() => onFormulateDecision(activeSignal)}
                className="flex items-center gap-2 px-4 py-2 bg-[#c27847] hover:bg-[#d88c58] text-[#0c0d0e] text-xs font-mono font-semibold tracking-wider uppercase rounded-xs transition-colors"
              >
                <span>Formulate Decision Options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
