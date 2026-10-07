import React, { useState } from 'react';
import { 
  DecisionRecord, 
  ScenarioOption 
} from '../types/atlas';
import { 
  GitFork, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  Send, 
  FileCheck, 
  UserCheck, 
  Layers, 
  Award,
  ChevronRight
} from 'lucide-react';

interface DecisionEngineProps {
  decisions: DecisionRecord[];
  selectedDecision: DecisionRecord | null;
  onSelectDecision: (decision: DecisionRecord) => void;
  onApproveDecision: (decisionId: string, chosenOptionId: string, stewardName: string, rationale: string) => void;
  onDispatchToCoordination: (decision: DecisionRecord) => void;
}

export const DecisionEngine: React.FC<DecisionEngineProps> = ({
  decisions,
  selectedDecision,
  onSelectDecision,
  onApproveDecision,
  onDispatchToCoordination
}) => {
  const [activeDecision, setActiveDecision] = useState<DecisionRecord>(
    selectedDecision || decisions[0]
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    (selectedDecision || decisions[0]).recommendedOptionId
  );
  const [stewardName, setStewardName] = useState<string>('Eng. Mary Wambui (Nakuru Water Directorate)');
  const [rationale, setRationale] = useState<string>('Evidence confirms Hybrid Scenario C balances immediate silt trapping with long-term ecological roots.');
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);

  const activeOption = activeDecision.options.find(o => o.id === selectedOptionId) || activeDecision.options[0];

  const handleSignApproval = (e: React.FormEvent) => {
    e.preventDefault();
    onApproveDecision(activeDecision.id, selectedOptionId, stewardName, rationale);
    setShowApprovalModal(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c27847] uppercase">
            <GitFork className="w-4 h-4" />
            <span>Scenario Engine & Institutional Governance</span>
          </div>
          <h2 className="text-lg font-serif font-medium text-[#f5f2eb] mt-0.5">
            Decisions Under Covenant: Humans Remain Responsible
          </h2>
          <p className="text-xs text-[#8c94a0] font-mono mt-1">
            AI recommends and exposes tradeoffs. Authorized institutional stewards deliberate, sign, and accept responsibility.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[#88909c]">ACTIVE DOSSIERS:</span>
          <span className="text-[#f5f2eb] font-semibold">{decisions.length} WAITING</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Decision Dossier Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase">
            Decision Dossiers
          </span>

          <div className="space-y-2">
            {decisions.map(dec => {
              const isSelected = dec.id === activeDecision.id;
              return (
                <div
                  key={dec.id}
                  onClick={() => {
                    setActiveDecision(dec);
                    setSelectedOptionId(dec.recommendedOptionId);
                    onSelectDecision(dec);
                  }}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#15191f] border-[#c27847] text-[#f5f2eb]'
                      : 'bg-[#111316] border-[#22272e] text-[#8e96a2] hover:border-[#343b47] hover:text-[#d0d6e0]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#c27847] uppercase font-semibold">{dec.placeName}</span>
                    <span className={`px-1.5 py-0.2 border rounded-xs ${
                      dec.urgency === 'immediate' ? 'text-[#e8705c] border-[#8a3324]' : 'text-amber-400 border-amber-800'
                    }`}>
                      {dec.urgency.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xs font-medium text-[#f0ede6] leading-snug line-clamp-2">
                    {dec.title}
                  </h3>

                  <div className="mt-2 pt-2 border-t border-[#1d2229] flex items-center justify-between text-[10px] font-mono text-[#78818f]">
                    <span>STATUS: {dec.reviewStatus.replace('_', ' ').toUpperCase()}</span>
                    <span>{dec.options.length} SCENARIOS</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scenario Analysis & Trade-off Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 bg-[#111316] border border-[#22272e] rounded-sm space-y-6">
            {/* Dossier Header */}
            <div className="border-b border-[#1f242c] pb-4">
              <div className="text-[11px] font-mono text-[#c27847] uppercase font-semibold">
                LOCATION: {activeDecision.placeName}
              </div>
              <h2 className="text-xl font-serif font-medium text-[#f5f2eb] mt-1">
                {activeDecision.title}
              </h2>
              <p className="text-xs text-[#8c94a0] font-mono mt-1.5 leading-relaxed">
                Problem: {activeDecision.problemStatement}
              </p>
            </div>

            {/* Scenario Comparison Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase">
                  Comparative Scenarios ({activeDecision.options.length})
                </span>
                <span className="text-[10px] font-mono text-[#78818f]">
                  SELECT TO SIMULATE TRADEOFFS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeDecision.options.map(opt => {
                  const isSelected = opt.id === selectedOptionId;
                  const isRecommended = opt.id === activeDecision.recommendedOptionId;
                  const isAlternative = opt.id === activeDecision.alternativeOptionId;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[#181d24] border-[#c27847] shadow-sm' 
                          : 'bg-[#0c0d0e] border-[#1f242c] hover:border-[#2f3744]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="text-[#8e96a2] uppercase">{opt.interventionType}</span>
                        {isRecommended && (
                          <span className="px-1.5 py-0.2 bg-[#c27847]/20 border border-[#c27847] text-[#e8a36e] rounded-xs font-semibold">
                            RECOMMENDED
                          </span>
                        )}
                        {isAlternative && (
                          <span className="px-1.5 py-0.2 bg-[#1b232c] text-[#8e9bb0] rounded-xs">
                            ALTERNATIVE
                          </span>
                        )}
                      </div>

                      <h4 className="text-xs font-medium text-[#f5f2eb] line-clamp-1">
                        {opt.name}
                      </h4>
                      <p className="text-[11px] text-[#8c94a0] mt-1 line-clamp-2 leading-relaxed">
                        {opt.summary}
                      </p>

                      <div className="mt-3 pt-2 border-t border-[#1a1f26] grid grid-cols-3 gap-1 text-[10px] font-mono">
                        <div>
                          <span className="text-[#6c7482] block">COST</span>
                          <span className="text-[#f5f2eb] font-semibold">${(opt.estimatedCostUSD / 1000).toFixed(0)}k</span>
                        </div>
                        <div>
                          <span className="text-[#6c7482] block">RESILIENCE</span>
                          <span className={`font-semibold ${opt.resilienceGainPercent > 0 ? 'text-emerald-400' : 'text-[#e8705c]'}`}>
                            {opt.resilienceGainPercent > 0 ? `+${opt.resilienceGainPercent}%` : `${opt.resilienceGainPercent}%`}
                          </span>
                        </div>
                        <div>
                          <span className="text-[#6c7482] block">PROTECTED</span>
                          <span className="text-[#f5f2eb] font-semibold">{(opt.vulnerablePeopleProtected / 1000).toFixed(1)}k</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Scenario Deep-Dive & Trade-offs */}
            <div className="p-4 bg-[#0c0d0e] border border-[#1f242c] rounded-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#1a1f26] pb-2 text-xs font-mono">
                <span className="text-[#f5f2eb] font-semibold uppercase">
                  SIMULATED IMPACT: {activeOption.name}
                </span>
                <span className="text-emerald-400">
                  MODEL CONFIDENCE: {activeOption.confidenceScore}%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#e8705c] uppercase font-semibold block mb-1">
                    RISKS & TRADEOFFS
                  </span>
                  <ul className="space-y-1 text-[#b8c0cc]">
                    {activeOption.risksAndTradeoffs.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#e8705c]">·</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] text-cyan-400 uppercase font-semibold block mb-1">
                    VERIFICATION PROTOCOL
                  </span>
                  <p className="text-[#b8c0cc] leading-relaxed">
                    {activeOption.verificationMethod}
                  </p>
                </div>
              </div>
            </div>

            {/* Governance & Institutional Audit Trail */}
            <div className="p-4 bg-[#14171c] border border-[#232932] rounded-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#d8dadf] uppercase font-semibold flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#c27847]" />
                  Institutional Audit Trail & Signatures
                </span>
                <span className="text-[10px] text-[#7d8694]">
                  ASSIGNED STEWARD: {activeDecision.assignedSteward}
                </span>
              </div>

              <div className="space-y-2">
                {activeDecision.auditLog.map((log, i) => (
                  <div key={i} className="p-2.5 bg-[#0d0e11] border border-[#1b1f24] rounded-xs text-xs font-mono">
                    <div className="flex items-center justify-between text-[10px] text-[#8e96a2] mb-0.5">
                      <span className="text-[#c27847] font-semibold">{log.steward}</span>
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <div className="text-[#f5f2eb] font-medium">{log.action}</div>
                    <div className="text-[11px] text-[#8e96a2] mt-0.5 italic">"{log.rationale}"</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Action Toolbar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#1d2228]">
              <button
                onClick={() => setShowApprovalModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#c27847] hover:bg-[#d88c58] text-[#0c0d0e] text-xs font-mono font-semibold uppercase rounded-xs transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Sign Institutional Ratification</span>
              </button>

              <button
                onClick={() => onDispatchToCoordination(activeDecision)}
                className="flex items-center gap-2 px-4 py-2 bg-[#1b1f24] hover:bg-[#232830] text-[#f5f2eb] border border-[#2e343d] text-xs font-mono uppercase rounded-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dispatch to Multi-Agency Coordination</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Human Steward Sign-off Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="max-w-lg w-full bg-[#111316] border border-[#2e343d] rounded-sm p-6 space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-[#20252c] pb-3">
              <h3 className="text-sm font-serif font-semibold text-[#f5f2eb] uppercase">
                Ratify Institutional Covenant
              </h3>
              <button 
                onClick={() => setShowApprovalModal(false)}
                className="text-[#78818f] hover:text-[#f5f2eb]"
              >
                ✕
              </button>
            </div>

            <p className="text-[#8c94a0] leading-relaxed">
              In accordance with Atlas Sanctum Section 11, human leaders remain accountable for consequential capital and environmental choices.
            </p>

            <form onSubmit={handleSignApproval} className="space-y-3">
              <div>
                <label className="text-[10px] text-[#78818f] uppercase block mb-1">
                  Responsible Steward Name & Institution
                </label>
                <input
                  type="text"
                  value={stewardName}
                  onChange={(e) => setStewardName(e.target.value)}
                  required
                  className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#78818f] uppercase block mb-1">
                  Selected Scenario
                </label>
                <div className="p-2 bg-[#171b21] border border-[#27303c] rounded-xs text-[#e8a36e] font-semibold">
                  {activeOption.name} (${(activeOption.estimatedCostUSD / 1000).toFixed(0)}k USD)
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#78818f] uppercase block mb-1">
                  Institutional Rationale
                </label>
                <textarea
                  rows={3}
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  required
                  className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApprovalModal(false)}
                  className="px-3 py-1.5 bg-[#1b1f24] text-[#8e96a2] rounded-xs hover:text-[#f5f2eb]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#c27847] text-[#0c0d0e] font-semibold uppercase rounded-xs hover:bg-[#d88c58]"
                >
                  Record Signature & Seal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
