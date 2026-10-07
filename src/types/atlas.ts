export type OperationalStage = 
  | 'observe' 
  | 'understand' 
  | 'decide' 
  | 'coordinate' 
  | 'act' 
  | 'verify' 
  | 'learn';

export type SpatialScale = 
  | 'planet' 
  | 'continent' 
  | 'country' 
  | 'region' 
  | 'county' 
  | 'ward' 
  | 'community' 
  | 'site' 
  | 'asset';

export type EpistemicStatus = 
  | 'fact' 
  | 'observed' 
  | 'measured' 
  | 'correlated' 
  | 'inferred' 
  | 'modeled' 
  | 'predicted' 
  | 'hypothesized' 
  | 'speculative';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface SpatialCoordinates {
  lat: number;
  lng: number;
  elevationMeters?: number;
}

export interface Place {
  id: string;
  name: string;
  nativeName?: string;
  scale: SpatialScale;
  coordinates: SpatialCoordinates;
  parentPlaceId?: string;
  description: string;
  ecologicalZone: string;
  populationEstimate: number;
  priorityFloorFlag: boolean; // Indicates vulnerable / under-documented community focus
  activeHazards: string[];
  keyAssets: string[];
  knowledgeGaps: string[]; // "What don't we know about this place?"
}

export interface EvidenceSource {
  id: string;
  title: string;
  type: 'satellite' | 'ground_sensor' | 'community_report' | 'government_registry' | 'academic_study' | 'drone_lidar';
  sensorOrAuthor: string;
  timestamp: string;
  resolutionOrPrecision: string;
  confidenceScore: number; // 0-100
  urlOrRef?: string;
  epistemicTier: EpistemicStatus;
}

export interface IntelligenceSignal {
  id: string;
  placeId: string;
  placeName: string;
  headline: string;
  category: 'water' | 'climate' | 'ecology' | 'infrastructure' | 'agriculture' | 'community';
  severity: RiskLevel;
  confidencePercent: number;
  detectedAt: string;
  summary: string;
  whyItMatters: string;
  evidence: EvidenceSource[];
  epistemicStatus: EpistemicStatus;
  assumptions: string[];
  limitations: string[];
  modelUsed: string;
  recommendedAction: string;
  status: 'active' | 'evaluating' | 'decided' | 'resolved';
}

export interface ScenarioOption {
  id: string;
  name: string;
  summary: string;
  interventionType: string;
  estimatedCostUSD: number;
  timelineMonths: number;
  resilienceGainPercent: number;
  vulnerablePeopleProtected: number;
  risksAndTradeoffs: string[];
  confidenceScore: number;
  verificationMethod: string;
}

export interface DecisionRecord {
  id: string;
  title: string;
  placeId: string;
  placeName: string;
  problemStatement: string;
  urgency: 'immediate' | 'high' | 'routine';
  options: ScenarioOption[];
  recommendedOptionId: string;
  alternativeOptionId: string;
  assignedSteward: string;
  reviewStatus: 'pending_review' | 'council_approved' | 'in_execution' | 'verified';
  auditLog: {
    steward: string;
    action: string;
    timestamp: string;
    rationale: string;
  }[];
}

export interface CoordinationProject {
  id: string;
  title: string;
  placeId: string;
  placeName: string;
  participatingInstitutions: string[];
  leadSteward: string;
  allocatedBudgetUSD: number;
  disbursedBudgetUSD: number;
  status: 'mobilizing' | 'active_fieldwork' | 'nearing_completion' | 'under_verification';
  targetMilestone: string;
  progressPercent: number;
  timeline: string;
  priorityFloorBenefit: string;
  activeBlockers: string[];
}

export interface VerificationAudit {
  id: string;
  decisionId: string;
  title: string;
  placeName: string;
  intervention: string;
  expectedOutcome: string;
  observedOutcome: string;
  errorPercentage: number;
  wasAtlasRight: 'confirmed' | 'partially_accurate' | 'diverged_recalibrated';
  whyItDiverged: string;
  modelAdjustmentMade: string;
  institutionalLesson: string;
  verifiedAt: string;
  verifyingBody: string;
}

export interface ResearchPaperOrBrief {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  epistemicBreakdown: {
    measuredFacts: string[];
    correlations: string[];
    inferences: string[];
    remainingHypotheses: string[];
  };
  sampleSize: string;
  uncertaintyMargin: string;
  reproducibilityScore: number;
  datasetName: string;
  lastUpdated: string;
}

export interface CapitalOpportunity {
  id: string;
  title: string;
  placeName: string;
  domain: 'water_infrastructure' | 'agroforestry' | 'renewable_energy' | 'flood_defense' | 'sanitation';
  capitalRequiredUSD: number;
  blendedFinanceStructure: {
    concessionalPublicPct: number;
    privateCapitalPct: number;
    communityEquityPct: number;
  };
  expectedEcologicalYield: string;
  expectedEconomicReturnPct: number;
  directBeneficiaries: number;
  priorityFloorScore: number; // 0-100 indicating inclusion of underserved communities
  status: 'dossier_ready' | 'under_capital_review' | 'syndicated';
}

export interface FieldObservation {
  id: string;
  placeId: string;
  placeName: string;
  observerName: string;
  observerRole: string;
  observationType: 'hydrology' | 'canopy_health' | 'soil_moisture' | 'crop_yield' | 'infrastructure_damage';
  summary: string;
  metricValue?: string;
  timestamp: string;
  syncStatus: 'synced' | 'queued_offline';
  verifiedBySatellite: boolean;
}
