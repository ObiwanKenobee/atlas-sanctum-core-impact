import React, { useState } from 'react';
import { VerificationAudit } from '../types/atlas';
import { 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  HelpCircle, 
  BookOpen, 
  Sliders, 
  Cpu, 
  Award,
  ArrowRight
} from 'lucide-react';

interface VerificationEngineProps {
  verifications: VerificationAudit[];
}

export const VerificationEngine: React.FC<VerificationEngineProps> = ({
  verifications
}) => {
  const [selectedAudit, setSelectedAudit] = useState<VerificationAudit>(verifications[0]);

  const getStatusBadge = (status: VerificationAudit['wasAtlasRight']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono border rounded-xs text-emerald-400 border-emerald-800 bg-emerald-950/20">
            CONFIRMED ACCURATE
          </span>
        );
      case 'partially_accurate':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono border rounded-xs text-amber-400 border-amber-800 bg-amber-950/20">
            PARTIALLY ACCURATE (CALIBRATED)
          </span>
        );
      case 'diverged_recalibrated':
        return (
          <span className="px-2 py-0.5 text-[10px] font-mono border rounded-xs text-[#e8705c] border-[#8a3324] bg-[#3a1510]/30 font-semibold">
            WE WERE WRONG (RECALIBRATED)
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner on Humility & Truthfulness */}
      <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verification Ledger & Epistemic Accountability</span>
          </div>
          <h2 className="text-lg font-serif font-medium text-[#f5f2eb] mt-0.5">
            "Was Atlas Right?" · The Institutional Memory
          </h2>
          <p className="text-xs text-[#8c94a0] font-mono mt-1">
            We record every prediction, measure the divergence against real ground sensors, admit failure openly, and update the underlying models.
          </p>
        </div>

        <div className="p-2.5 bg-[#0c0d0e] border border-[#1e2329] rounded-xs text-xs font-mono">
          <div className="text-[#78818f] text-[10px]">HISTORICAL PREDICTION ACCURACY</div>
          <div className="text-cyan-400 text-lg font-semibold mt-0.5">88.6% (Mean Error: 7.4%)</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Verification Ledger Cards (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase">
            Verification Cases ({verifications.length})
          </span>

          <div className="space-y-2">
            {verifications.map(audit => {
              const isSelected = audit.id === selectedAudit.id;
              return (
                <div
                  key={audit.id}
                  onClick={() => setSelectedAudit(audit)}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#15191f] border-[#c27847] text-[#f5f2eb]'
                      : 'bg-[#111316] border-[#22272e] text-[#8e96a2] hover:border-[#343b47] hover:text-[#d0d6e0]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className="text-[#c27847] font-semibold uppercase">{audit.placeName}</span>
                    {getStatusBadge(audit.wasAtlasRight)}
                  </div>

                  <h3 className="text-xs font-medium text-[#f0ede6] leading-snug line-clamp-2">
                    {audit.title}
                  </h3>

                  <div className="mt-2.5 pt-2 border-t border-[#1d2229] flex items-center justify-between text-[10px] font-mono text-[#78818f]">
                    <span>ERROR: {audit.errorPercentage}%</span>
                    <span>{new Date(audit.verifiedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Verification Deep Dive (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 bg-[#111316] border border-[#22272e] rounded-sm space-y-5">
            {/* Header */}
            <div className="border-b border-[#1f242c] pb-4">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#c27847] uppercase font-semibold">{selectedAudit.placeName}</span>
                <span className="text-[#8c94a0]">AUDIT BODY: {selectedAudit.verifyingBody}</span>
              </div>
              <h2 className="text-xl font-serif font-medium text-[#f5f2eb] mt-1">
                {selectedAudit.title}
              </h2>
              <div className="mt-2 text-xs font-mono text-[#8c94a0]">
                Intervention: {selectedAudit.intervention}
              </div>
            </div>

            {/* Expected vs Observed Outcome Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs space-y-2 text-xs font-mono">
                <div className="text-[10px] text-cyan-400 uppercase font-semibold flex items-center justify-between">
                  <span>WHAT ATLAS PREDICTED</span>
                  <span>PRIOR RUN</span>
                </div>
                <p className="text-[#d8dadf] text-sm font-sans leading-relaxed">
                  {selectedAudit.expectedOutcome}
                </p>
              </div>

              <div className="p-4 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs space-y-2 text-xs font-mono">
                <div className="text-[10px] text-[#c27847] uppercase font-semibold flex items-center justify-between">
                  <span>WHAT ACTUALLY HAPPENED</span>
                  <span className="text-[#e8705c]">ERROR: {selectedAudit.errorPercentage}%</span>
                </div>
                <p className="text-[#d8dadf] text-sm font-sans leading-relaxed">
                  {selectedAudit.observedOutcome}
                </p>
              </div>
            </div>

            {/* Why It Diverged (Honest admission) */}
            <div className="p-4 bg-[#171110] border border-[#48201b] rounded-xs space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-[10px] text-[#e8705c] uppercase font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>ROOT CAUSE OF DIVERGENCE (WHY WE DIVERGED)</span>
              </div>
              <p className="text-[#ecdcd8] text-sm font-sans leading-relaxed">
                {selectedAudit.whyItDiverged}
              </p>
            </div>

            {/* Model Adjustment & Institutional Lesson */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-[#10141a] border border-[#1b2533] rounded-xs space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] text-cyan-400 uppercase font-semibold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>MODEL CODE ADJUSTMENT</span>
                </div>
                <p className="text-[#cbd5e1] leading-relaxed">
                  {selectedAudit.modelAdjustmentMade}
                </p>
              </div>

              <div className="p-4 bg-[#14120e] border border-[#382a17] rounded-xs space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] text-[#e8a36e] uppercase font-semibold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ENDURING INSTITUTIONAL LESSON</span>
                </div>
                <p className="text-[#ded3c5] leading-relaxed">
                  {selectedAudit.institutionalLesson}
                </p>
              </div>
            </div>

            {/* Verification Seal */}
            <div className="p-3 bg-[#0d0e11] border border-[#1f242c] rounded-xs flex items-center justify-between text-[11px] font-mono text-[#8c94a0]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Cryptographically Sealed in Atlas Institutional Registry</span>
              </div>
              <span>TIMESTAMP: {new Date(selectedAudit.verifiedAt).toISOString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
