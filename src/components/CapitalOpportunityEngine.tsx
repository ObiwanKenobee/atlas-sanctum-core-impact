import React, { useState } from 'react';
import { CapitalOpportunity } from '../types/atlas';
import { 
  Coins, 
  Sparkles, 
  ShieldAlert, 
  TrendingUp, 
  Leaf, 
  Users, 
  PieChart, 
  ArrowUpRight, 
  CheckCircle2, 
  Building 
} from 'lucide-react';

interface CapitalOpportunityEngineProps {
  opportunities: CapitalOpportunity[];
  priorityFloorActive: boolean;
  onSelectOpportunity: (opp: CapitalOpportunity) => void;
}

export const CapitalOpportunityEngine: React.FC<CapitalOpportunityEngineProps> = ({
  opportunities,
  priorityFloorActive,
  onSelectOpportunity
}) => {
  const [selectedOpp, setSelectedOpp] = useState<CapitalOpportunity>(opportunities[0]);

  const totalCapitalRequired = opportunities.reduce((acc, o) => acc + o.capitalRequiredUSD, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner on Regenerative Capital */}
      <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c27847] uppercase">
            <Coins className="w-4 h-4" />
            <span>Regenerative Capital Intelligence & Opportunity Engine</span>
          </div>
          <h2 className="text-lg font-serif font-medium text-[#f5f2eb] mt-0.5">
            Connecting Evidence to Blended Capital Allocations
          </h2>
          <p className="text-xs text-[#8c94a0] font-mono mt-1">
            Transforming verified living systems intelligence into bankable blended finance dossiers that shield vulnerable populations.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono bg-[#0c0d0e] p-2.5 px-4 rounded-xs border border-[#1e2329]">
          <div>
            <span className="text-[#6c7482] block text-[10px]">TOTAL OPPORTUNITY VALUE</span>
            <span className="text-[#f5f2eb] font-semibold">${(totalCapitalRequired / 1000000).toFixed(2)}M USD</span>
          </div>
          <div className="border-l border-[#22272e] pl-4">
            <span className="text-[#6c7482] block text-[10px]">BENEFICIARIES SHIELDED</span>
            <span className="text-emerald-400 font-semibold">104,000</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Opportunity Dossier Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase">
            Bankable Dossiers ({opportunities.length})
          </span>

          <div className="space-y-2">
            {opportunities.map(opp => {
              const isSelected = opp.id === selectedOpp.id;
              return (
                <div
                  key={opp.id}
                  onClick={() => {
                    setSelectedOpp(opp);
                    onSelectOpportunity(opp);
                  }}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#15191f] border-[#c27847] text-[#f5f2eb]'
                      : 'bg-[#111316] border-[#22272e] text-[#8e96a2] hover:border-[#343b47] hover:text-[#d0d6e0]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="text-[#c27847] font-semibold uppercase">{opp.placeName}</span>
                    <span className="text-emerald-400 bg-emerald-950/30 border border-emerald-800 px-1.5 py-0.2 rounded-xs">
                      {opp.expectedEconomicReturnPct}% IRR
                    </span>
                  </div>

                  <h3 className="text-xs font-medium text-[#f0ede6] leading-snug line-clamp-2">
                    {opp.title}
                  </h3>

                  <div className="mt-2.5 pt-2 border-t border-[#1d2229] flex items-center justify-between text-[10px] font-mono text-[#78818f]">
                    <span>CAPITAL: ${(opp.capitalRequiredUSD / 1000).toFixed(0)}k</span>
                    <span className="text-[#e8a36e]">FLOOR SCORE: {opp.priorityFloorScore}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Capital Dossier Deep Dive (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 bg-[#111316] border border-[#22272e] rounded-sm space-y-5">
            {/* Header */}
            <div className="border-b border-[#1f242c] pb-4">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#c27847] uppercase font-semibold">{selectedOpp.placeName}</span>
                <span className="text-emerald-400 font-semibold">{selectedOpp.expectedEconomicReturnPct}% ECONOMIC RETURN (IRR)</span>
              </div>
              <h2 className="text-xl font-serif font-medium text-[#f5f2eb] mt-1">
                {selectedOpp.title}
              </h2>
              <div className="mt-2 text-xs font-mono text-[#8c94a0]">
                DOMAIN: {selectedOpp.domain.replace('_', ' ').toUpperCase()} · STATUS: {selectedOpp.status.toUpperCase()}
              </div>
            </div>

            {/* Ecological Yield */}
            <div className="p-4 bg-[#0d1611] border border-[#1a3825] rounded-xs space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 uppercase font-semibold">
                <Leaf className="w-3.5 h-3.5" />
                <span>EXPECTED REGENERATIVE & ECOLOGICAL YIELD</span>
              </div>
              <p className="text-[#d0ecd9] text-sm font-sans leading-relaxed">
                {selectedOpp.expectedEcologicalYield}
              </p>
            </div>

            {/* Blended Finance Architecture */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase block">
                Blended Finance Capital Stack (${(selectedOpp.capitalRequiredUSD / 1000).toFixed(0)}k USD)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs">
                  <span className="text-[10px] text-[#78818f] block uppercase">CONCESSIONAL / GRANT</span>
                  <span className="text-lg font-semibold text-cyan-400 mt-1 block">
                    {selectedOpp.blendedFinanceStructure.concessionalPublicPct}%
                  </span>
                  <span className="text-[10px] text-[#8c94a0] mt-0.5 block">
                    ${((selectedOpp.capitalRequiredUSD * selectedOpp.blendedFinanceStructure.concessionalPublicPct) / 100000).toFixed(0)}k (GCF / County)
                  </span>
                </div>

                <div className="p-3 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs">
                  <span className="text-[10px] text-[#78818f] block uppercase">COMMERCIAL / PRIVATE</span>
                  <span className="text-lg font-semibold text-amber-400 mt-1 block">
                    {selectedOpp.blendedFinanceStructure.privateCapitalPct}%
                  </span>
                  <span className="text-[10px] text-[#8c94a0] mt-0.5 block">
                    ${((selectedOpp.capitalRequiredUSD * selectedOpp.blendedFinanceStructure.privateCapitalPct) / 100000).toFixed(0)}k (DFI / Green Bond)
                  </span>
                </div>

                <div className="p-3 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs">
                  <span className="text-[10px] text-[#78818f] block uppercase">COMMUNITY COOPERATIVE</span>
                  <span className="text-lg font-semibold text-emerald-400 mt-1 block">
                    {selectedOpp.blendedFinanceStructure.communityEquityPct}%
                  </span>
                  <span className="text-[10px] text-[#8c94a0] mt-0.5 block">
                    ${((selectedOpp.capitalRequiredUSD * selectedOpp.blendedFinanceStructure.communityEquityPct) / 100000).toFixed(0)}k (Local Sweat/Equity)
                  </span>
                </div>
              </div>
            </div>

            {/* Priority Floor / Option for the Excluded Score */}
            <div className="p-4 bg-[#17130e] border border-[#3d2716] rounded-xs space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#e8a36e] uppercase font-semibold flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#c27847]" />
                  <span>PRIORITY FLOOR INCLUSION SCORE: {selectedOpp.priorityFloorScore}/100</span>
                </span>
                <span className="text-[#f5f2eb] font-semibold">
                  {selectedOpp.directBeneficiaries.toLocaleString()} Beneficiaries
                </span>
              </div>
              <p className="text-[#d8cdbf] leading-relaxed text-[11px]">
                Under Atlas Sanctum Covenant Section 19, capital investments with Priority Floor scores above 85 receive preferential public guarantees to prevent marginalization of low-income populations.
              </p>
            </div>

            {/* Syndicate Capital Action */}
            <div className="pt-2 flex items-center justify-between border-t border-[#1d2228] text-xs font-mono">
              <span className="text-[#78818f]">Ready for institutional capital syndication</span>
              <button 
                onClick={() => alert(`Syndication expression of interest submitted for ${selectedOpp.title}`)}
                className="flex items-center gap-2 px-4 py-2 bg-[#c27847] hover:bg-[#d88c58] text-[#0c0d0e] font-semibold uppercase rounded-xs transition-colors"
              >
                <span>Commit Institutional Capital</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
