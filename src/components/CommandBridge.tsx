import React from 'react';
import { 
  IntelligenceSignal, 
  DecisionRecord, 
  CoordinationProject, 
  VerificationAudit,
  OperationalStage 
} from '../types/atlas';
import { 
  AlertTriangle, 
  ArrowUpRight, 
  ShieldCheck, 
  TrendingDown, 
  GitPullRequest, 
  Activity, 
  CheckCircle2, 
  Compass, 
  Zap, 
  Droplets, 
  TreePine, 
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';

interface CommandBridgeProps {
  signals: IntelligenceSignal[];
  decisions: DecisionRecord[];
  projects: CoordinationProject[];
  verifications: VerificationAudit[];
  onNavigateStage: (stage: OperationalStage) => void;
  onSelectSignal: (signal: IntelligenceSignal) => void;
  onSelectDecision: (decision: DecisionRecord) => void;
  priorityFloorActive: boolean;
}

export const CommandBridge: React.FC<CommandBridgeProps> = ({
  signals,
  decisions,
  projects,
  verifications,
  onNavigateStage,
  onSelectSignal,
  onSelectDecision,
  priorityFloorActive
}) => {
  const criticalSignals = signals.filter(s => s.severity === 'critical' || s.severity === 'high');
  const pendingDecisions = decisions.filter(d => d.reviewStatus === 'pending_review' || d.reviewStatus === 'council_approved');
  const atRiskProjects = projects.filter(p => p.activeBlockers.length > 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Monumental Hero Banner */}
      <div className="relative overflow-hidden rounded-sm border border-[#262a30] bg-gradient-to-b from-[#131518] to-[#0c0d0e] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c27847]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c27847] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#c27847] animate-pulse" />
            Institutional Command Bridge · Planetary & Regional Status
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-serif font-medium tracking-tight text-[#f5f2eb]">
            Turn complexity into trustworthy intelligence, intelligence into wise decisions, and decisions into measurable flourishing.
          </h1>

          <p className="text-sm text-[#9da4b0] leading-relaxed max-w-3xl">
            Atlas Sanctum connects earth observation, local telemetry, institutional covenants, and capital allocation across the Great Rift Valley. Operating under the canonical stewardship loop: <span className="font-mono text-[#dcd7cb]">OBSERVE → UNDERSTAND → DECIDE → COORDINATE → ACT → VERIFY → LEARN</span>.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateStage('observe')}
              className="flex items-center gap-2 px-4 py-2 bg-[#c27847] text-[#0c0d0e] text-xs font-mono font-semibold tracking-wider uppercase rounded-sm hover:bg-[#d88c58] transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Explore Living Observatory</span>
            </button>
            <button
              onClick={() => onNavigateStage('decide')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1b1f24] text-[#e8e6df] border border-[#2e343d] text-xs font-mono tracking-wider uppercase rounded-sm hover:bg-[#232830] transition-colors"
            >
              <GitPullRequest className="w-3.5 h-3.5" />
              <span>Review Waiting Decisions ({pendingDecisions.length})</span>
            </button>
            <button
              onClick={() => onNavigateStage('verify')}
              className="flex items-center gap-2 px-4 py-2 bg-[#1b1f24] text-[#e8e6df] border border-[#2e343d] text-xs font-mono tracking-wider uppercase rounded-sm hover:bg-[#232830] transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Institutional Memory ("Was Atlas Right?")</span>
            </button>
          </div>
        </div>

        {/* Global Vital Stats Ribbon */}
        <div className="mt-8 pt-6 border-t border-[#1e2227] grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-[#111316] border border-[#1e2329] rounded-sm">
            <div className="text-[11px] font-mono text-[#7a828e] uppercase flex items-center justify-between">
              <span>Earth Health Index</span>
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="mt-1 text-2xl font-mono font-semibold text-[#f5f2eb]">
              91.4%
            </div>
            <div className="text-[10px] text-[#7a828e] mt-0.5">Rift hydrological stability</div>
          </div>

          <div className="p-3 bg-[#111316] border border-[#1e2329] rounded-sm">
            <div className="text-[11px] font-mono text-[#7a828e] uppercase flex items-center justify-between">
              <span>Active Signals</span>
              <AlertTriangle className="w-3.5 h-3.5 text-[#e8a36e]" />
            </div>
            <div className="mt-1 text-2xl font-mono font-semibold text-[#f5f2eb]">
              {signals.length} <span className="text-xs font-normal text-[#8e95a0]">({criticalSignals.length} urgent)</span>
            </div>
            <div className="text-[10px] text-[#7a828e] mt-0.5">3 Water warnings · 1 Peat bog</div>
          </div>

          <div className="p-3 bg-[#111316] border border-[#1e2329] rounded-sm">
            <div className="text-[11px] font-mono text-[#7a828e] uppercase flex items-center justify-between">
              <span>Capital Coordinated</span>
              <Zap className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="mt-1 text-2xl font-mono font-semibold text-[#f5f2eb]">
              $324.5k
            </div>
            <div className="text-[10px] text-[#7a828e] mt-0.5">3 active joint missions</div>
          </div>

          <div className="p-3 bg-[#111316] border border-[#1e2329] rounded-sm">
            <div className="text-[11px] font-mono text-[#7a828e] uppercase flex items-center justify-between">
              <span>Verification Accuracy</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="mt-1 text-2xl font-mono font-semibold text-[#f5f2eb]">
              88.6%
            </div>
            <div className="text-[10px] text-[#7a828e] mt-0.5">3 audited predictions on record</div>
          </div>
        </div>
      </div>

      {/* The 8 Canonical Institutional Questions Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif font-semibold text-[#f5f2eb] tracking-wide">
              OPERATIONAL SITUATION REPORT
            </h2>
            <p className="text-xs text-[#7c838f] font-mono">
              Live synthesized answers to the core institutional queries
            </p>
          </div>
          <span className="text-xs font-mono text-[#8a929f] border border-[#22272e] px-2.5 py-1 rounded-sm bg-[#111316]">
            UPDATED: JUST NOW
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: What needs attention now? */}
          <div className="p-4 bg-[#111316] border border-[#23272e] rounded-sm flex flex-col justify-between hover:border-[#383f4b] transition-colors">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-[#c27847] uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>01. What needs attention now?</span>
              </div>
              <h3 className="text-sm font-medium text-[#f0ede6]">
                Shallow aquifer bacterial contamination in Rhonda & Kaptembwa
              </h3>
              <p className="text-xs text-[#8c94a0] leading-relaxed">
                14,000 residents using unsealed shallow handpumps face severe cholera/coliform exposure due to flash rainwater flush through unlined latrines.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#1c2026] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#e8a36e] bg-[#e8a36e]/10 px-1.5 py-0.5 rounded-xs">
                PRIORITY FLOOR CRITICAL
              </span>
              <button 
                onClick={() => onSelectSignal(signals.find(s => s.id === 'sig-nak-002') || signals[0])}
                className="text-xs font-mono text-[#9da5b3] hover:text-[#f5f2eb] flex items-center gap-1"
              >
                Inspect <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: What is deteriorating? */}
          <div className="p-4 bg-[#111316] border border-[#23272e] rounded-sm flex flex-col justify-between hover:border-[#383f4b] transition-colors">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-[#e8705c] uppercase tracking-wider flex items-center gap-1.5">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>02. What is deteriorating?</span>
              </div>
              <h3 className="text-sm font-medium text-[#f0ede6]">
                Eastern Mau Peat Wetland Sponge Capacity (-420,000 m³)
              </h3>
              <p className="text-xs text-[#8c94a0] leading-relaxed">
                SAR radar telemetry detected 18 ha of illegal drainage cuts in Enapuyapui swamp, dropping dry-season baseline river recharge into Njoro and Mara basins.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#1c2026] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8c94a0]">
                CONFIDENCE: 91% (SENTINEL-1 + LIDAR)
              </span>
              <button 
                onClick={() => onSelectSignal(signals.find(s => s.id === 'sig-mau-003') || signals[0])}
                className="text-xs font-mono text-[#9da5b3] hover:text-[#f5f2eb] flex items-center gap-1"
              >
                Inspect <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 3: What opportunity emerged? */}
          <div className="p-4 bg-[#111316] border border-[#23272e] rounded-sm flex flex-col justify-between hover:border-[#383f4b] transition-colors">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>03. What opportunity emerged?</span>
              </div>
              <h3 className="text-sm font-medium text-[#f0ede6]">
                45MW Menengai Geothermal Direct-Heat Agro Hub
              </h3>
              <p className="text-xs text-[#8c94a0] leading-relaxed">
                Continuous 118°C secondary brine venting can be piped 3.8km to provide zero-emission grain drying, preserving $4.8M of cereal crop for smallholder cooperatives.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#1c2026] flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400">
                BLENDED FINANCE: $2.4M
              </span>
              <button 
                onClick={() => onNavigateStage('act')}
                className="text-xs font-mono text-[#9da5b3] hover:text-[#f5f2eb] flex items-center gap-1"
              >
                Review <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 4: Which decisions are waiting? */}
          <div className="p-4 bg-[#111316] border border-[#23272e] rounded-sm flex flex-col justify-between hover:border-[#383f4b] transition-colors">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-[#c27847] uppercase tracking-wider flex items-center gap-1.5">
                <GitPullRequest className="w-3.5 h-3.5" />
                <span>04. Which decisions are waiting?</span>
              </div>
              <h3 className="text-sm font-medium text-[#f0ede6]">
                Njoro River Bio-Shield vs Heavy Gabion Engineering
              </h3>
              <p className="text-xs text-[#8c94a0] leading-relaxed">
                Evaluating 4 scenario options to mitigate 34% excess silt load into Lake Nakuru before short monsoon rains climax.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#1c2026] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#e8a36e]">
                RECOMMENDED: HYBRID SCENARIO C
              </span>
              <button 
                onClick={() => onSelectDecision(decisions[0])}
                className="text-xs font-mono text-[#9da5b3] hover:text-[#f5f2eb] flex items-center gap-1"
              >
                Decide <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 5: Which projects are at risk? */}
          <div className="p-4 bg-[#111316] border border-[#23272e] rounded-sm flex flex-col justify-between hover:border-[#383f4b] transition-colors">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>05. Which projects are at risk?</span>
              </div>
              <h3 className="text-sm font-medium text-[#f0ede6]">
                Eastern Mau Peat Bog Restoration (Machinery Permit Delay)
              </h3>
              <p className="text-xs text-[#8c94a0] leading-relaxed">
                Excavation re-plugging stalled at Ministry of Environment clearance. Requires inter-agency dispatch between Kenya Water Towers and County.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#1c2026] flex items-center justify-between">
              <span className="text-[10px] font-mono text-amber-400">
                1 ACTIVE BLOCKER
              </span>
              <button 
                onClick={() => onNavigateStage('coordinate')}
                className="text-xs font-mono text-[#9da5b3] hover:text-[#f5f2eb] flex items-center gap-1"
              >
                Coordinate <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 6: What outcomes need verification? */}
          <div className="p-4 bg-[#111316] border border-[#23272e] rounded-sm flex flex-col justify-between hover:border-[#383f4b] transition-colors">
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>06. Did the intervention work?</span>
              </div>
              <h3 className="text-sm font-medium text-[#f0ede6]">
                Upper Njoro Vetiver Terracing (Q1 2026 Audit)
              </h3>
              <p className="text-xs text-[#8c94a0] leading-relaxed">
                Atlas model error: 14%. Silt reduction verified at 38%, but seedling establishment delayed in volcanic pumice. Model recalibrated.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-[#1c2026] flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-400">
                MEMORY LOGGED: "WE WERE WRONG ON PUMICE"
              </span>
              <button 
                onClick={() => onNavigateStage('verify')}
                className="text-xs font-mono text-[#9da5b3] hover:text-[#f5f2eb] flex items-center gap-1"
              >
                Audit <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Demonstration Geography: The Nakuru System */}
      <div className="p-6 bg-[#111316] border border-[#22272e] rounded-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1d2127] pb-4 mb-4">
          <div>
            <div className="text-xs font-mono text-[#c27847] uppercase tracking-wider">
              FLAGSHIP THEATER · NAKURU SYSTEM DEMONSTRATION
            </div>
            <h3 className="text-lg font-serif font-medium text-[#f5f2eb]">
              Living Computational Representation of Rift Catchment
            </h3>
          </div>
          <button
            onClick={() => onNavigateStage('observe')}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#1b1f24] hover:bg-[#232830] text-[#f5f2eb] border border-[#2d323b] text-xs font-mono rounded-sm transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#c27847]" />
            <span>Open Spatial Geospatial Engine</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-[#0c0d0e] border border-[#1b1e22] rounded-sm">
            <span className="text-[#78808d] block text-[10px]">HYDROLOGICAL SPONGE</span>
            <span className="text-[#f5f2eb] font-semibold text-sm block mt-1">Eastern Mau Forest</span>
            <span className="text-[#9ea6b3] text-[11px] block mt-0.5">2,600m · Podocarpus & Peat bogs</span>
          </div>

          <div className="p-3 bg-[#0c0d0e] border border-[#1b1e22] rounded-sm">
            <span className="text-[#78808d] block text-[10px]">CRITICAL ENDORHEIC SINK</span>
            <span className="text-[#f5f2eb] font-semibold text-sm block mt-1">Lake Nakuru Basin</span>
            <span className="text-[#9ea6b3] text-[11px] block mt-0.5">1,759m · Ramsar Alkaline Biosphere</span>
          </div>

          <div className="p-3 bg-[#0c0d0e] border border-[#1b1e22] rounded-sm">
            <span className="text-[#78808d] block text-[10px]">CLEAN GEOTHERMAL ASSET</span>
            <span className="text-[#f5f2eb] font-semibold text-sm block mt-1">Menengai Caldera</span>
            <span className="text-[#9ea6b3] text-[11px] block mt-0.5">2,278m · 105MW + 45MW Heat Excess</span>
          </div>

          <div className="p-3 bg-[#0c0d0e] border border-[#1b1e22] rounded-sm">
            <span className="text-[#e8a36e] block text-[10px]">PRIORITY FLOOR CORRIDOR</span>
            <span className="text-[#f5f2eb] font-semibold text-sm block mt-1">Rhonda & Kaptembwa</span>
            <span className="text-[#9ea6b3] text-[11px] block mt-0.5">182,000 residents · High stormwater exposure</span>
          </div>
        </div>
      </div>
    </div>
  );
};
