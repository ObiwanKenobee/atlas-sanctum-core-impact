import React from 'react';
import { Place, IntelligenceSignal, DecisionRecord } from '../types/atlas';
import { 
  GitCommit, 
  MapPin, 
  AlertTriangle, 
  Eye, 
  FileSearch, 
  Cpu, 
  ShieldAlert, 
  Sparkles, 
  GitFork, 
  Coins, 
  Play, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen,
  X,
  ArrowDown
} from 'lucide-react';

interface LineageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  place: Place;
  signals: IntelligenceSignal[];
  decisions: DecisionRecord[];
}

export const LineageDrawer: React.FC<LineageDrawerProps> = ({
  isOpen,
  onClose,
  place,
  signals,
  decisions
}) => {
  if (!isOpen) return null;

  const relevantSignal = signals.find(s => s.placeId === place.id) || signals[0];
  const relevantDecision = decisions.find(d => d.placeId === place.id) || decisions[0];

  const LINEAGE_STEPS = [
    {
      label: 'PLACE',
      title: place.name,
      detail: `${place.scale.toUpperCase()} · ${place.ecologicalZone} · Pop: ${place.populationEstimate.toLocaleString()}`,
      icon: <MapPin className="w-3.5 h-3.5 text-[#c27847]" />,
      color: 'border-[#c27847]'
    },
    {
      label: 'PROBLEM',
      title: place.activeHazards[0] || 'Hydrological and environmental degradation',
      detail: relevantSignal.headline,
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#e8705c]" />,
      color: 'border-[#e8705c]'
    },
    {
      label: 'OBSERVATION',
      title: 'Satellite Multi-spectral + Telemetry Inflow Flume',
      detail: relevantSignal.summary,
      icon: <Eye className="w-3.5 h-3.5 text-cyan-400" />,
      color: 'border-cyan-500'
    },
    {
      label: 'EVIDENCE',
      title: `${relevantSignal.evidence.length} Multi-Source Sensor Tiers`,
      detail: relevantSignal.evidence.map(e => e.title).join('; '),
      icon: <FileSearch className="w-3.5 h-3.5 text-blue-400" />,
      color: 'border-blue-500'
    },
    {
      label: 'ANALYSIS & MODEL',
      title: relevantSignal.modelUsed,
      detail: `Epistemic Tier: ${relevantSignal.epistemicStatus.toUpperCase()} · Model Confidence: ${relevantSignal.confidencePercent}%`,
      icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />,
      color: 'border-purple-500'
    },
    {
      label: 'RISK',
      title: `Systemic Cascading Vulnerability (${relevantSignal.severity.toUpperCase()})`,
      detail: relevantSignal.whyItMatters,
      icon: <ShieldAlert className="w-3.5 h-3.5 text-[#e8705c]" />,
      color: 'border-rose-500'
    },
    {
      label: 'OPPORTUNITY & INTERVENTION',
      title: relevantDecision.options.find(o => o.id === relevantDecision.recommendedOptionId)?.name || 'Intervention Plan',
      detail: relevantSignal.recommendedAction,
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
      color: 'border-emerald-500'
    },
    {
      label: 'CAPITAL & ACTION',
      title: `Blended Finance: $${(relevantDecision.options[0]?.estimatedCostUSD / 1000).toFixed(0)}k Allocated`,
      detail: `Steward: ${relevantDecision.assignedSteward} · Status: ${relevantDecision.reviewStatus.toUpperCase()}`,
      icon: <Coins className="w-3.5 h-3.5 text-amber-400" />,
      color: 'border-amber-500'
    },
    {
      label: 'VERIFICATION',
      title: 'Post-Intervention Sensor Verification Protocol',
      detail: relevantDecision.options[0]?.verificationMethod || 'Satellite NDVI & Ground Probes',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />,
      color: 'border-cyan-500'
    },
    {
      label: 'IMPACT & LEARNING',
      title: 'Institutional Memory & Model Recalibration',
      detail: 'Divergence errors measured, lessons preserved, models permanently improved for generational stewardship.',
      icon: <BookOpen className="w-3.5 h-3.5 text-[#e8a36e]" />,
      color: 'border-[#c27847]'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[#111316] border-l border-[#2e343d] h-full overflow-y-auto p-6 space-y-6 text-xs font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#20252c] pb-4">
          <div>
            <div className="text-[10px] text-[#c27847] uppercase font-semibold">
              EPISTEMIC PROVENANCE & LINEAGE
            </div>
            <h3 className="text-base font-serif font-medium text-[#f5f2eb] mt-0.5">
              Backward Traceability Chain
            </h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#1a1e24] text-[#8e96a2] rounded-xs">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[#8c94a0] leading-relaxed">
          In Atlas Sanctum, no recommendation is an opaque black box. You can trace any decision backwards from institutional policy to raw satellite sensor telemetry.
        </p>

        {/* Vertical Chain Flow */}
        <div className="relative pl-6 space-y-4">
          {/* Vertical connecting line */}
          <div className="absolute left-2.5 top-2 bottom-4 w-0.5 bg-[#252b35]" />

          {LINEAGE_STEPS.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on line */}
              <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#111316] border border-[#3b4350] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#c27847]" />
              </div>

              <div className={`p-3 bg-[#0c0d0e] border rounded-xs ${step.color} space-y-1`}>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#c27847] font-semibold tracking-wider">
                    STEP {idx + 1}: {step.label}
                  </span>
                  <div className="flex items-center gap-1">
                    {step.icon}
                  </div>
                </div>

                <div className="text-xs font-medium text-[#f0ede6]">
                  {step.title}
                </div>

                <div className="text-[11px] text-[#8c94a0] font-sans leading-relaxed">
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#1d2228] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1b1f24] hover:bg-[#232830] text-[#f5f2eb] rounded-xs uppercase tracking-wider"
          >
            Close Lineage Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
