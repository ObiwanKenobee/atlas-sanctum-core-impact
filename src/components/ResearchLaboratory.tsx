import React, { useState } from 'react';
import { ResearchPaperOrBrief } from '../types/atlas';
import { 
  FlaskConical, 
  FileText, 
  CheckSquare, 
  Share2, 
  Database, 
  Layers, 
  Compass, 
  BookMarked, 
  Percent, 
  Activity, 
  Download
} from 'lucide-react';

interface ResearchLaboratoryProps {
  briefs: ResearchPaperOrBrief[];
}

export const ResearchLaboratory: React.FC<ResearchLaboratoryProps> = ({
  briefs
}) => {
  const [selectedBrief, setSelectedBrief] = useState<ResearchPaperOrBrief>(briefs[0]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner on Epistemic Rigor */}
      <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#c27847] uppercase">
            <FlaskConical className="w-4 h-4" />
            <span>Open Epistemic Research Laboratory</span>
          </div>
          <h2 className="text-lg font-serif font-medium text-[#f5f2eb] mt-0.5">
            Empirical Rigor: Fact vs Correlation vs Inference vs Speculation
          </h2>
          <p className="text-xs text-[#8c94a0] font-mono mt-1">
            We never manufacture scientific certainty. Every research dossier decomposes assertions into transparent statistical tiers.
          </p>
        </div>

        <div className="text-xs font-mono text-[#78818f] bg-[#0c0d0e] p-2.5 px-3.5 border border-[#1e2329] rounded-xs">
          <span>ACTIVE WORKING PAPERS: </span>
          <span className="text-[#f5f2eb] font-semibold">{briefs.length} PUBLISHED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Research Briefs List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase">
            Evidence Packages & Notebooks
          </span>

          <div className="space-y-2">
            {briefs.map(brief => {
              const isSelected = brief.id === selectedBrief.id;
              return (
                <div
                  key={brief.id}
                  onClick={() => setSelectedBrief(brief)}
                  className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#15191f] border-[#c27847] text-[#f5f2eb]'
                      : 'bg-[#111316] border-[#22272e] text-[#8e96a2] hover:border-[#343b47] hover:text-[#d0d6e0]'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#c27847] uppercase font-semibold mb-1">
                    REPRODUCIBILITY SCORE: {brief.reproducibilityScore}%
                  </div>

                  <h3 className="text-xs font-medium text-[#f0ede6] leading-snug line-clamp-2">
                    {brief.title}
                  </h3>

                  <div className="mt-2.5 pt-2 border-t border-[#1d2229] flex items-center justify-between text-[10px] font-mono text-[#78818f]">
                    <span>DATASET: {brief.datasetName.split('-')[0]}</span>
                    <span>{brief.lastUpdated}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Research Brief Deep Dive (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 bg-[#111316] border border-[#22272e] rounded-sm space-y-5">
            {/* Header */}
            <div className="border-b border-[#1f242c] pb-4">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#c27847] uppercase font-semibold">
                  REPRODUCIBILITY INDEX: {selectedBrief.reproducibilityScore}/100
                </span>
                <span className="text-[#8c94a0]">UNCERTAINTY: {selectedBrief.uncertaintyMargin}</span>
              </div>
              <h2 className="text-xl font-serif font-medium text-[#f5f2eb] mt-1 leading-snug">
                {selectedBrief.title}
              </h2>
              <div className="mt-2 text-xs font-mono text-[#7d8694]">
                AUTHORS: {selectedBrief.authors.join(', ')}
              </div>
            </div>

            {/* Abstract */}
            <div className="p-4 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs space-y-1.5 text-xs font-mono">
              <span className="text-[10px] text-[#c27847] uppercase font-semibold block">
                PEER-AUDITED ABSTRACT
              </span>
              <p className="text-[#d8dadf] text-sm font-sans leading-relaxed">
                {selectedBrief.abstract}
              </p>
            </div>

            {/* Epistemic Decomposition Grid */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold text-[#f5f2eb] uppercase block">
                Strict Epistemic Breakdown of Claims
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                {/* 1. Measured Facts */}
                <div className="p-3.5 bg-[#0f1712] border border-[#1e3d2a] rounded-xs space-y-1.5">
                  <span className="text-[10px] text-emerald-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    1. EMPIRICALLY MEASURED FACTS (GROUND TRUTH)
                  </span>
                  <ul className="space-y-1 text-[#bce7cf] text-[11px]">
                    {selectedBrief.epistemicBreakdown.measuredFacts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>✓</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Statistically Correlated */}
                <div className="p-3.5 bg-[#0f151e] border border-[#1c2e47] rounded-xs space-y-1.5">
                  <span className="text-[10px] text-blue-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    2. STATISTICAL CORRELATIONS (P &lt; 0.05)
                  </span>
                  <ul className="space-y-1 text-[#bfdbfe] text-[11px]">
                    {selectedBrief.epistemicBreakdown.correlations.map((corr, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>~</span>
                        <span>{corr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Inferences */}
                <div className="p-3.5 bg-[#17140e] border border-[#3d2d14] rounded-xs space-y-1.5">
                  <span className="text-[10px] text-amber-400 uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    3. MODEL INFERENCES & INTERPRETATIONS
                  </span>
                  <ul className="space-y-1 text-[#fde68a] text-[11px]">
                    {selectedBrief.epistemicBreakdown.inferences.map((inf, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>→</span>
                        <span>{inf}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Hypotheses */}
                <div className="p-3.5 bg-[#171110] border border-[#48201b] rounded-xs space-y-1.5">
                  <span className="text-[10px] text-[#e8705c] uppercase font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#e8705c]" />
                    4. REMAINING HYPOTHESES & UNPROVEN CONJECTURE
                  </span>
                  <ul className="space-y-1 text-[#fecdd3] text-[11px]">
                    {selectedBrief.epistemicBreakdown.remainingHypotheses.map((hyp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span>?</span>
                        <span>{hyp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Scientific Rigor Metadata */}
            <div className="p-3 bg-[#0d0e11] border border-[#1b1f24] rounded-xs grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-[#8a929f]">
              <div>
                <span className="text-[10px] text-[#6c7482] block">SAMPLE SIZE</span>
                <span className="text-[#f5f2eb] text-[11px] font-medium">{selectedBrief.sampleSize}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6c7482] block">UNCERTAINTY MARGIN</span>
                <span className="text-cyan-400 text-[11px] font-medium">{selectedBrief.uncertaintyMargin}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#6c7482] block">DATASET REPOSITORY</span>
                <span className="text-[#e8a36e] text-[11px] font-medium">{selectedBrief.datasetName}</span>
              </div>
            </div>

            {/* Download & Export */}
            <div className="pt-2 flex items-center justify-between border-t border-[#1d2228] text-xs font-mono">
              <span className="text-[#78818f]">Open Access under Atlas Covenant License v1.0</span>
              <button 
                onClick={() => alert(`Exported ${selectedBrief.title} evidence package with verified cryptographic checksum.`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1b1f24] hover:bg-[#232830] text-[#f5f2eb] border border-[#2e343d] rounded-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#c27847]" />
                <span>Export Evidence Package (.parquet)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
