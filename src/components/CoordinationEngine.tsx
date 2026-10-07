import React, { useState } from 'react';
import { CoordinationProject } from '../types/atlas';
import { 
  Network, 
  Building2, 
  Users, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  PlusCircle,
  ShieldCheck,
  Check
} from 'lucide-react';

interface CoordinationEngineProps {
  projects: CoordinationProject[];
  onResolveBlocker: (projectId: string, blockerIndex: number) => void;
  onNavigateToField: () => void;
}

export const CoordinationEngine: React.FC<CoordinationEngineProps> = ({
  projects,
  onResolveBlocker,
  onNavigateToField
}) => {
  const [selectedProject, setSelectedProject] = useState<CoordinationProject>(projects[0]);

  const totalAllocated = projects.reduce((acc, p) => acc + p.allocatedBudgetUSD, 0);
  const totalDisbursed = projects.reduce((acc, p) => acc + p.disbursedBudgetUSD, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c27847] uppercase">
            <Network className="w-4 h-4" />
            <span>Institutional Coordination Layer</span>
          </div>
          <h2 className="text-lg font-serif font-medium text-[#f5f2eb] mt-0.5">
            Inter-Agency Operational Alignment
          </h2>
          <p className="text-xs text-[#8c94a0] font-mono mt-1">
            Bridging county ministries, indigenous councils, water authorities, and civic alliances to eliminate operational latency.
          </p>
        </div>

        {/* Global Budget Flow Stats */}
        <div className="flex items-center gap-4 text-xs font-mono bg-[#0c0d0e] p-2.5 px-4 rounded-xs border border-[#1e2329]">
          <div>
            <span className="text-[#6c7482] block text-[10px]">TOTAL BUDGET</span>
            <span className="text-[#f5f2eb] font-semibold">${(totalAllocated / 1000).toFixed(0)}k</span>
          </div>
          <div className="border-l border-[#22272e] pl-4">
            <span className="text-[#6c7482] block text-[10px]">DISBURSED</span>
            <span className="text-emerald-400 font-semibold">${(totalDisbursed / 1000).toFixed(0)}k</span>
          </div>
          <div className="border-l border-[#22272e] pl-4">
            <span className="text-[#6c7482] block text-[10px]">BURNOUT RATE</span>
            <span className="text-cyan-400 font-semibold">{((totalDisbursed / totalAllocated) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Missions List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase">
            Active Multi-Agency Operations ({projects.length})
          </span>

          <div className="space-y-2">
            {projects.map(proj => {
              const isSelected = proj.id === selectedProject.id;
              const hasBlockers = proj.activeBlockers.length > 0;

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#15191f] border-[#c27847] text-[#f5f2eb]'
                      : 'bg-[#111316] border-[#22272e] text-[#8e96a2] hover:border-[#343b47] hover:text-[#d0d6e0]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#c27847] font-semibold uppercase">{proj.placeName}</span>
                    <span className={`px-1.5 py-0.2 border rounded-xs ${
                      hasBlockers ? 'text-amber-400 border-amber-800 bg-amber-950/20' : 'text-emerald-400 border-emerald-800'
                    }`}>
                      {proj.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xs font-medium text-[#f0ede6] leading-snug line-clamp-2">
                    {proj.title}
                  </h3>

                  {/* Progress bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-[#78818f]">
                      <span>PROGRESS</span>
                      <span>{proj.progressPercent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1b1f26] rounded-xs overflow-hidden">
                      <div 
                        className="h-full bg-[#c27847] transition-all"
                        style={{ width: `${proj.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#1d2229] flex items-center justify-between text-[10px] font-mono text-[#78818f]">
                    <span>LEAD: {proj.leadSteward.split(' ')[0]}</span>
                    <span>{proj.participatingInstitutions.length} AGENCIES</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Operation Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 bg-[#111316] border border-[#22272e] rounded-sm space-y-5">
            {/* Header */}
            <div className="border-b border-[#1f242c] pb-4">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#c27847] uppercase font-semibold">{selectedProject.placeName}</span>
                <span className="text-[#8c94a0]">{selectedProject.timeline}</span>
              </div>
              <h2 className="text-xl font-serif font-medium text-[#f5f2eb] mt-1">
                {selectedProject.title}
              </h2>
              <div className="mt-2 flex items-center gap-2 text-xs font-mono text-[#7d8694]">
                <span>LEAD STEWARD:</span>
                <span className="text-[#f5f2eb] font-semibold">{selectedProject.leadSteward}</span>
              </div>
            </div>

            {/* Target Milestone */}
            <div className="p-4 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs space-y-1 text-xs font-mono">
              <span className="text-[10px] text-[#c27847] uppercase font-semibold block">
                CURRENT OPERATIONAL MILESTONE
              </span>
              <p className="text-[#d8dadf] text-sm font-sans leading-relaxed">
                {selectedProject.targetMilestone}
              </p>
            </div>

            {/* Participating Institutions Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase block">
                Participating Institutional Covenants ({selectedProject.participatingInstitutions.length})
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                {selectedProject.participatingInstitutions.map((inst, i) => (
                  <div key={i} className="p-2.5 bg-[#0f1114] border border-[#1c2026] rounded-xs flex items-center gap-2 text-[#d2d7e0]">
                    <Building2 className="w-3.5 h-3.5 text-[#c27847]" />
                    <span className="truncate">{inst}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority Floor Protection */}
            <div className="p-3.5 bg-[#17130e] border border-[#3d2716] rounded-xs text-xs font-mono space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] text-[#e8a36e] uppercase font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c27847]" />
                <span>Priority Floor Protection Target</span>
              </div>
              <p className="text-[#dcd1c7] leading-relaxed">
                {selectedProject.priorityFloorBenefit}
              </p>
            </div>

            {/* Active Blockers & Remediation */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase block">
                Active Operational Friction & Blockers ({selectedProject.activeBlockers.length})
              </span>
              {selectedProject.activeBlockers.length === 0 ? (
                <div className="p-3 bg-[#0d1410] border border-[#183622] text-emerald-400 text-xs font-mono rounded-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Zero active blockers reported. Operational cadence proceeding smoothly.</span>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedProject.activeBlockers.map((blocker, idx) => (
                    <div key={idx} className="p-3 bg-[#171110] border border-[#48201b] rounded-xs flex items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-2 text-[#e8705c]">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{blocker}</span>
                      </div>
                      <button
                        onClick={() => onResolveBlocker(selectedProject.id, idx)}
                        className="px-2.5 py-1 bg-[#241715] hover:bg-[#38201d] text-[#f29382] border border-[#522520] rounded-xs text-[10px] uppercase transition-colors shrink-0 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" />
                        <span>Resolve</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#1d2228]">
              <div className="text-[11px] font-mono text-[#78818f]">
                Disbursed: ${(selectedProject.disbursedBudgetUSD / 1000).toFixed(0)}k of ${(selectedProject.allocatedBudgetUSD / 1000).toFixed(0)}k USD
              </div>
              <button
                onClick={onNavigateToField}
                className="flex items-center gap-2 px-4 py-2 bg-[#1b1f24] hover:bg-[#232830] text-[#f5f2eb] border border-[#2e343d] text-xs font-mono uppercase rounded-xs transition-colors"
              >
                <span>Dispatch Ground Telemetry Inspection</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c27847]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
