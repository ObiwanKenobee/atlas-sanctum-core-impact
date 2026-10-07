import React, { useState } from 'react';
import { 
  OperationalStage, 
  Place, 
  IntelligenceSignal, 
  DecisionRecord, 
  CoordinationProject, 
  VerificationAudit, 
  ResearchPaperOrBrief, 
  CapitalOpportunity, 
  FieldObservation 
} from './types/atlas';
import { 
  PLACES_REGISTRY, 
  SIGNALS_REGISTRY, 
  DECISION_RECORDS, 
  COORDINATION_PROJECTS, 
  VERIFICATION_AUDITS, 
  RESEARCH_BRIEFS, 
  CAPITAL_OPPORTUNITIES, 
  FIELD_OBSERVATIONS_LOG 
} from './data/atlasData';
import { Header } from './components/Header';
import { CommandBridge } from './components/CommandBridge';
import { AtlasObservatory } from './components/AtlasObservatory';
import { IntelligenceEngine } from './components/IntelligenceEngine';
import { DecisionEngine } from './components/DecisionEngine';
import { CoordinationEngine } from './components/CoordinationEngine';
import { VerificationEngine } from './components/VerificationEngine';
import { ResearchLaboratory } from './components/ResearchLaboratory';
import { CapitalOpportunityEngine } from './components/CapitalOpportunityEngine';
import { FieldObservationModal } from './components/FieldObservationModal';
import { LineageDrawer } from './components/LineageDrawer';
import { 
  Compass, 
  ShieldCheck, 
  Activity, 
  Heart, 
  FileText, 
  Eye, 
  GitFork, 
  CheckCircle2, 
  Radio
} from 'lucide-react';

export default function App() {
  // Primary operational navigation
  const [currentStage, setCurrentStage] = useState<OperationalStage>('observe');
  const [isHomeBridge, setIsHomeBridge] = useState<boolean>(true);

  // Inclusion & Bandwidth states
  const [priorityFloorActive, setPriorityFloorActive] = useState<boolean>(true);
  const [lowBandwidthMode, setLowBandwidthMode] = useState<boolean>(false);

  // Entities state
  const [places] = useState<Place[]>(PLACES_REGISTRY);
  const [signals, setSignals] = useState<IntelligenceSignal[]>(SIGNALS_REGISTRY);
  const [decisions, setDecisions] = useState<DecisionRecord[]>(DECISION_RECORDS);
  const [projects, setProjects] = useState<CoordinationProject[]>(COORDINATION_PROJECTS);
  const [verifications] = useState<VerificationAudit[]>(VERIFICATION_AUDITS);
  const [briefs] = useState<ResearchPaperOrBrief[]>(RESEARCH_BRIEFS);
  const [opportunities] = useState<CapitalOpportunity[]>(CAPITAL_OPPORTUNITIES);
  const [fieldObservations, setFieldObservations] = useState<FieldObservation[]>(FIELD_OBSERVATIONS_LOG);

  // Active selections
  const [selectedPlace, setSelectedPlace] = useState<Place>(PLACES_REGISTRY[0]);
  const [selectedSignal, setSelectedSignal] = useState<IntelligenceSignal>(SIGNALS_REGISTRY[0]);
  const [selectedDecision, setSelectedDecision] = useState<DecisionRecord>(DECISION_RECORDS[0]);

  // Modals & Drawers
  const [isFieldModalOpen, setIsFieldModalOpen] = useState<boolean>(false);
  const [isLineageOpen, setIsLineageOpen] = useState<boolean>(false);
  const [lineageTargetPlace, setLineageTargetPlace] = useState<Place>(PLACES_REGISTRY[0]);

  // Navigation helpers
  const handleSelectStage = (stage: OperationalStage) => {
    setCurrentStage(stage);
    setIsHomeBridge(false);
  };

  const handleOpenLineage = (place: Place) => {
    setLineageTargetPlace(place);
    setIsLineageOpen(true);
  };

  const handleSelectSignal = (signal: IntelligenceSignal) => {
    setSelectedSignal(signal);
    const matchedPlace = places.find(p => p.id === signal.placeId);
    if (matchedPlace) setSelectedPlace(matchedPlace);
    setCurrentStage('understand');
    setIsHomeBridge(false);
  };

  const handleSelectDecision = (decision: DecisionRecord) => {
    setSelectedDecision(decision);
    const matchedPlace = places.find(p => p.id === decision.placeId);
    if (matchedPlace) setSelectedPlace(matchedPlace);
    setCurrentStage('decide');
    setIsHomeBridge(false);
  };

  const handleFormulateDecisionFromSignal = (signal: IntelligenceSignal) => {
    const existing = decisions.find(d => d.placeId === signal.placeId);
    if (existing) {
      setSelectedDecision(existing);
    }
    setCurrentStage('decide');
    setIsHomeBridge(false);
  };

  const handleApproveDecision = (
    decisionId: string, 
    chosenOptionId: string, 
    stewardName: string, 
    rationale: string
  ) => {
    setDecisions(prev => prev.map(d => {
      if (d.id !== decisionId) return d;
      return {
        ...d,
        recommendedOptionId: chosenOptionId,
        reviewStatus: 'council_approved',
        auditLog: [
          ...d.auditLog,
          {
            steward: stewardName,
            action: `Ratified Option: ${chosenOptionId}`,
            timestamp: new Date().toISOString(),
            rationale
          }
        ]
      };
    }));
  };

  const handleResolveBlocker = (projectId: string, blockerIndex: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      const updated = [...p.activeBlockers];
      updated.splice(blockerIndex, 1);
      return { ...p, activeBlockers: updated };
    }));
  };

  const handleSaveObservation = (obs: FieldObservation) => {
    setFieldObservations(prev => [obs, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#e8e6df] font-sans flex flex-col selection:bg-[#c27847]/30 selection:text-[#f8f6f0]">
      {/* Institutional Top Navigation Header */}
      <Header
        currentStage={currentStage}
        onSelectStage={handleSelectStage}
        priorityFloorActive={priorityFloorActive}
        onTogglePriorityFloor={() => setPriorityFloorActive(!priorityFloorActive)}
        lowBandwidthMode={lowBandwidthMode}
        onToggleLowBandwidth={() => setLowBandwidthMode(!lowBandwidthMode)}
        onOpenFieldModal={() => setIsFieldModalOpen(true)}
        activeSignalsCount={signals.filter(s => s.status === 'active').length}
      />

      {/* Main Command Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Toggle between Institutional Command Bridge (Home) and Domain Workspaces */}
        <div className="mb-4 flex items-center justify-between border-b border-[#1c2026] pb-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsHomeBridge(true)}
              className={`px-3 py-1 rounded-xs transition-colors ${
                isHomeBridge 
                  ? 'bg-[#1b1f26] text-[#f5f2eb] font-semibold border border-[#2f3642]' 
                  : 'text-[#828a96] hover:text-[#e8e6df]'
              }`}
            >
              COMMAND BRIDGE OVERVIEW
            </button>
            <span className="text-[#3b4350]">/</span>
            <button
              onClick={() => setIsHomeBridge(false)}
              className={`px-3 py-1 rounded-xs uppercase transition-colors ${
                !isHomeBridge 
                  ? 'bg-[#1b1f26] text-[#c27847] font-semibold border border-[#2f3642]' 
                  : 'text-[#828a96] hover:text-[#e8e6df]'
              }`}
            >
              DOMAIN: {currentStage.toUpperCase()}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#78818f]">
            <span>CANONICAL COVENANT:</span>
            <span className="text-[#d8d3c5]">OBSERVE → UNDERSTAND → DECIDE → COORDINATE → ACT → VERIFY → LEARN</span>
          </div>
        </div>

        {/* View Routing */}
        {isHomeBridge ? (
          <CommandBridge
            signals={signals}
            decisions={decisions}
            projects={projects}
            verifications={verifications}
            onNavigateStage={handleSelectStage}
            onSelectSignal={handleSelectSignal}
            onSelectDecision={handleSelectDecision}
            priorityFloorActive={priorityFloorActive}
          />
        ) : (
          <div>
            {currentStage === 'observe' && (
              <AtlasObservatory
                places={places}
                signals={signals}
                fieldObservations={fieldObservations}
                selectedPlace={selectedPlace}
                onSelectPlace={setSelectedPlace}
                priorityFloorActive={priorityFloorActive}
                onOpenLineage={handleOpenLineage}
                onSelectSignal={handleSelectSignal}
              />
            )}

            {currentStage === 'understand' && (
              <IntelligenceEngine
                signals={signals}
                selectedSignal={selectedSignal}
                onSelectSignal={setSelectedSignal}
                places={places}
                onFormulateDecision={handleFormulateDecisionFromSignal}
              />
            )}

            {currentStage === 'decide' && (
              <DecisionEngine
                decisions={decisions}
                selectedDecision={selectedDecision}
                onSelectDecision={setSelectedDecision}
                onApproveDecision={handleApproveDecision}
                onDispatchToCoordination={() => {
                  setCurrentStage('coordinate');
                  setIsHomeBridge(false);
                }}
              />
            )}

            {currentStage === 'coordinate' && (
              <CoordinationEngine
                projects={projects}
                onResolveBlocker={handleResolveBlocker}
                onNavigateToField={() => setIsFieldModalOpen(true)}
              />
            )}

            {currentStage === 'act' && (
              <CapitalOpportunityEngine
                opportunities={opportunities}
                priorityFloorActive={priorityFloorActive}
                onSelectOpportunity={() => {}}
              />
            )}

            {currentStage === 'verify' && (
              <VerificationEngine
                verifications={verifications}
              />
            )}

            {currentStage === 'learn' && (
              <ResearchLaboratory
                briefs={briefs}
              />
            )}
          </div>
        )}
      </main>

      {/* Field Observation Edge Modal */}
      <FieldObservationModal
        isOpen={isFieldModalOpen}
        onClose={() => setIsFieldModalOpen(false)}
        places={places}
        selectedPlace={selectedPlace}
        onSaveObservation={handleSaveObservation}
        lowBandwidthMode={lowBandwidthMode}
      />

      {/* Epistemic Lineage Drawer */}
      <LineageDrawer
        isOpen={isLineageOpen}
        onClose={() => setIsLineageOpen(false)}
        place={lineageTargetPlace}
        signals={signals}
        decisions={decisions}
      />

      {/* Monumental Institutional Footer */}
      <footer className="mt-16 border-t border-[#1d2229] bg-[#090a0c] text-xs font-mono text-[#78818f] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-serif font-medium text-[#f5f2eb]">
                <Compass className="w-4 h-4 text-[#c27847]" />
                <span>ATLAS SANCTUM</span>
                <span className="text-xs text-[#717882] font-mono font-normal">· Living Intelligence Institution</span>
              </div>
              <p className="text-xs text-[#8c94a0] max-w-xl">
                Dedicated to helping humanity understand reality, make trustworthy decisions, coordinate action, and regenerate the living systems upon which life depends.
              </p>
            </div>

            <div className="text-right text-[11px] text-[#8e96a2] space-y-1">
              <div className="text-[#c27847] font-semibold">Covenant Code: Craftsmanship Under Covenant</div>
              <div>The builder archetype: The Steward-Engineer</div>
              <div className="italic">"Build as though the work will outlive you."</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#16191f] flex flex-wrap items-center justify-between gap-4 text-[10px]">
            <div className="flex items-center gap-3">
              <span>PILOT GEOGRAPHY: NAKURU & RIFT VALLEY</span>
              <span>·</span>
              <span>EPSTEMIC AUDIT: 100% VERIFIED</span>
              <span>·</span>
              <span>OPTION FOR EXCLUDED: ACTIVE</span>
            </div>
            <div>
              Setting hearts & minds above. © 2026 Atlas Sanctum. All systems observable.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
