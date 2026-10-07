import React from 'react';
import { 
  OperationalStage 
} from '../types/atlas';
import { 
  Compass, 
  Eye, 
  BrainCircuit, 
  GitFork, 
  Network, 
  CheckCircle2, 
  FlaskConical, 
  Coins, 
  PlusCircle, 
  Wifi, 
  WifiOff, 
  ShieldAlert,
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentStage: OperationalStage;
  onSelectStage: (stage: OperationalStage) => void;
  priorityFloorActive: boolean;
  onTogglePriorityFloor: () => void;
  lowBandwidthMode: boolean;
  onToggleLowBandwidth: () => void;
  onOpenFieldModal: () => void;
  activeSignalsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  onSelectStage,
  priorityFloorActive,
  onTogglePriorityFloor,
  lowBandwidthMode,
  onToggleLowBandwidth,
  onOpenFieldModal,
  activeSignalsCount
}) => {
  const STAGES: { id: OperationalStage; label: string; icon: React.ReactNode; num: string }[] = [
    { id: 'observe', label: 'Observatory', icon: <Eye className="w-3.5 h-3.5" />, num: '01' },
    { id: 'understand', label: 'Intelligence', icon: <BrainCircuit className="w-3.5 h-3.5" />, num: '02' },
    { id: 'decide', label: 'Decisions', icon: <GitFork className="w-3.5 h-3.5" />, num: '03' },
    { id: 'coordinate', label: 'Coordination', icon: <Network className="w-3.5 h-3.5" />, num: '04' },
    { id: 'act', label: 'Field & Capital', icon: <Coins className="w-3.5 h-3.5" />, num: '05' },
    { id: 'verify', label: 'Verification', icon: <CheckCircle2 className="w-3.5 h-3.5" />, num: '06' },
    { id: 'learn', label: 'Research', icon: <FlaskConical className="w-3.5 h-3.5" />, num: '07' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c0d0e]/95 backdrop-blur-md border-b border-[#23272d] text-[#e8e6df]">
      {/* Top institution bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#c27847]/15 border border-[#c27847]/40 flex items-center justify-center text-[#e8a36e]">
            <Compass className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="font-serif tracking-widest text-base font-semibold text-[#f5f2eb]">
                ATLAS SANCTUM
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#9ba3af] hidden sm:inline">
                Living Systems Command
              </span>
            </div>
            <div className="text-[10px] text-[#717882] tracking-wide italic font-serif hidden md:block">
              "Setting hearts & minds above. Build as though the work will outlive you."
            </div>
          </div>
        </div>

        {/* Global operational tools & toggles */}
        <div className="flex items-center gap-2 text-xs">
          {/* Priority Floor / Option for Excluded toggle */}
          <button
            onClick={onTogglePriorityFloor}
            title="Ensure under-documented & low-resource communities are explicitly visible and prioritized"
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wide rounded-sm transition-all border ${
              priorityFloorActive 
                ? 'bg-[#c27847]/20 border-[#c27847] text-[#e8a36e]' 
                : 'bg-[#16181b] border-[#2b3038] text-[#8e95a0] hover:text-[#d0d5dd]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>PRIORITY FLOOR</span>
            <span className={`w-1.5 h-1.5 rounded-full ${priorityFloorActive ? 'bg-[#c27847]' : 'bg-[#555d68]'}`} />
          </button>

          {/* Low Bandwidth / Edge Mode */}
          <button
            onClick={onToggleLowBandwidth}
            title="Toggle low-bandwidth compressed mode for field operations"
            className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all border ${
              lowBandwidthMode 
                ? 'bg-[#223528] border-[#386c47] text-[#7dd898]' 
                : 'bg-[#16181b] border-[#2b3038] text-[#8e95a0] hover:text-[#d0d5dd]'
            }`}
          >
            {lowBandwidthMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{lowBandwidthMode ? 'EDGE MODE' : 'BROADBAND'}</span>
          </button>

          {/* Submit Observation */}
          <button
            onClick={onOpenFieldModal}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono font-medium rounded-sm bg-[#c27847] text-[#0c0d0e] hover:bg-[#d88c58] transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>RECORD OBSERVATION</span>
          </button>
        </div>
      </div>

      {/* Primary Architectural Loop Navigation */}
      <div className="border-t border-[#1a1d22] bg-[#0f1114]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between overflow-x-auto no-scrollbar py-1 gap-1">
            <div className="flex items-center gap-1">
              {STAGES.map((s) => {
                const isActive = currentStage === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onSelectStage(s.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider transition-colors border-b-2 whitespace-nowrap ${
                      isActive
                        ? 'border-[#c27847] text-[#f5f2eb] bg-[#16191e]'
                        : 'border-transparent text-[#88909c] hover:text-[#c4cbd4] hover:bg-[#131518]'
                    }`}
                  >
                    <span className="text-[10px] opacity-50">{s.num}</span>
                    {s.icon}
                    <span className="uppercase">{s.label}</span>
                    {s.id === 'understand' && activeSignalsCount > 0 && (
                      <span className="ml-1 text-[10px] px-1 py-0.2 bg-[#c27847]/30 text-[#e8a36e] rounded-xs">
                        {activeSignalsCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3 text-[11px] font-mono text-[#6c7380] pl-4 border-l border-[#20242b]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                TELEMETRY: LIVE
              </span>
              <span>·</span>
              <span>GREAT RIFT BASIN</span>
              <span>·</span>
              <span>OCT 2026</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
