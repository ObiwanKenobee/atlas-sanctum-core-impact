import { 
  Place, 
  IntelligenceSignal, 
  DecisionRecord, 
  CoordinationProject, 
  VerificationAudit, 
  ResearchPaperOrBrief, 
  CapitalOpportunity,
  FieldObservation
} from '../types/atlas';

export const PLACES_REGISTRY: Place[] = [
  {
    id: 'nakuru-county',
    name: 'Nakuru County',
    nativeName: 'Kaunti ya Nakuru',
    scale: 'county',
    coordinates: { lat: -0.3031, lng: 36.0800, elevationMeters: 1850 },
    description: 'Flagship demonstration theater in the Great Rift Valley. A critical agricultural, geothermal, and hydrological crossroad hosting vulnerable lakes and expanding urban populations.',
    ecologicalZone: 'Highland Rift Agro-Ecological Zone III & IV',
    populationEstimate: 2162202,
    priorityFloorFlag: false,
    activeHazards: ['Flash flood surging from Bahati ridges', 'Aquifer salinity in peri-urban boreholes', 'Siltation of Lake Nakuru feeder rivers'],
    keyAssets: ['Menengai Geothermal Field (105MW)', 'Lake Nakuru National Park', 'Mau Water Tower feeder network', 'Nakuru Wholesale Produce Hub'],
    knowledgeGaps: ['Deep groundwater recharge rates in Rongai volcanic tuff', 'Informal boreholes unregistered in Kaptembwa ward', 'Soil microbial decline under intensive synthetic fertilizer use in Njoro']
  },
  {
    id: 'mau-forest-complex',
    name: 'Eastern Mau Water Tower',
    nativeName: 'Msitu wa Mau',
    scale: 'region',
    coordinates: { lat: -0.4500, lng: 35.8500, elevationMeters: 2600 },
    parentPlaceId: 'nakuru-county',
    description: 'Largest indigenous montane forest in East Africa and primary hydrological sponge recharging rivers feeding Lake Nakuru, Lake Victoria, and Lake Natron.',
    ecologicalZone: 'Montane Podocarpus & Bamboo Cloud Forest',
    populationEstimate: 145000,
    priorityFloorFlag: true,
    activeHazards: ['Canopy edge desiccation from illegal logging', 'Enapuyapui peat swamp drainage', 'Buffer zone soil compaction'],
    keyAssets: ['Enapuyapui Peat Wetland', 'Njoro River Headwaters', 'Indigenous Ogiek Community Seed Banks', 'KFS Ranger Stations'],
    knowledgeGaps: ['Sub-canopy humidity trends below 2200m altitude', 'Micro-hydrology of highland peat bogs during dry season transitions']
  },
  {
    id: 'lake-nakuru-basin',
    name: 'Lake Nakuru Catchment',
    nativeName: 'Bonde la Ziwa Nakuru',
    scale: 'ward',
    coordinates: { lat: -0.3667, lng: 36.0833, elevationMeters: 1759 },
    parentPlaceId: 'nakuru-county',
    description: 'Endorheic alkaline lake Ramsar site. Subject to unprecedented lake level expansion (+6.2m since 2010), altering salinity and flamingo biomass.',
    ecologicalZone: 'Alkaline Lacustrine & Acacia Savannah',
    populationEstimate: 420000,
    priorityFloorFlag: false,
    activeHazards: ['Urban stormwater heavy metal flush', 'Submerged lakeside infrastructure', 'Silt loading from Makalia river'],
    keyAssets: ['Ramsar Wetland Sanctuary', 'Nakuru Municipal Sewage Treatment Works', 'Lion & Rhino Sanctuary perimeter'],
    knowledgeGaps: ['Underground volcanic fissures connecting Lake Nakuru to Menengai hydro-thermal system']
  },
  {
    id: 'rhonda-kaptembwa',
    name: 'Rhonda & Kaptembwa Settlements',
    nativeName: 'Mtaa wa Rhonda na Kaptembwa',
    scale: 'community',
    coordinates: { lat: -0.3150, lng: 36.0420, elevationMeters: 1810 },
    parentPlaceId: 'nakuru-county',
    description: 'Dense low-income peri-urban settlements situated on gentle volcanic slopes. High vulnerability to stormwater runoffs and unpaved road erosion.',
    ecologicalZone: 'Peri-Urban Volcanic Wash Zone',
    populationEstimate: 182000,
    priorityFloorFlag: true, // Priority Floor / Option for Excluded
    activeHazards: ['Pit latrine inundation during seasonal downpours', 'High drinking water vendor tariffs', 'Unregulated greywater drainage'],
    keyAssets: ['Community Water Kiosks (24 active)', 'Barut Youth Drainage Cooperative', 'Rhonda Primary School Rain Catchment'],
    knowledgeGaps: ['Precise mapping of 680 unregistered shallow wells', 'Real-time localized bacterial contamination rates']
  },
  {
    id: 'menengai-caldera',
    name: 'Menengai Geothermal Caldera',
    nativeName: 'Volkano ya Menengai',
    scale: 'site',
    coordinates: { lat: -0.2000, lng: 36.0667, elevationMeters: 2278 },
    parentPlaceId: 'nakuru-county',
    description: 'Massive shield volcano caldera. Hosts high-enthalpy geothermal energy wells, carbon extraction units, and experimental agricultural drying facilities.',
    ecologicalZone: 'Volcanic Caldera & Semi-arid Scrub',
    populationEstimate: 28000,
    priorityFloorFlag: false,
    activeHazards: ['Hydrogen sulfide micro-leakage along geological faults', 'Rockslide hazards on northern rim'],
    keyAssets: ['GDC Geothermal Wellheads (48 drilled wells)', 'Direct-Use Greenhouses', 'Caldera Forest Reserve'],
    knowledgeGaps: ['Sub-surface fracture thermal decay under sustained continuous steam extraction']
  },
  {
    id: 'lake-naivasha-aquifer',
    name: 'Lake Naivasha Aquifer Basin',
    nativeName: 'Bonde la Ziwa Naivasha',
    scale: 'region',
    coordinates: { lat: -0.7167, lng: 36.4333, elevationMeters: 1884 },
    parentPlaceId: 'nakuru-county',
    description: 'Freshwater lake in the Rift Valley supporting 70% of Kenya’s floriculture export and Olkaria geothermal complexes. Critical water budget tension between commercial horticulture and local pastoralists.',
    ecologicalZone: 'Freshwater Lacustrine & Papyrus Fringe',
    populationEstimate: 350000,
    priorityFloorFlag: false,
    activeHazards: ['Groundwater table depletion along South Lake Road', 'Agrochemical pesticide runoff into papyrus fringes'],
    keyAssets: ['Olkaria Geothermal Complex (800MW+)', 'Flower Export Agro-industrial Hub', 'Malewa River Inflow'],
    knowledgeGaps: ['Deep bedrock water leakage towards Lake Magadi']
  },
  {
    id: 'nairobi-kibera-corridor',
    name: 'Nairobi River & Kibera Riparian Corridor',
    nativeName: 'Bonde la Mto Nairobi - Kibera',
    scale: 'community',
    coordinates: { lat: -1.3130, lng: 36.7860, elevationMeters: 1670 },
    description: 'Urban informal basin with extreme density. Demonstrates urban resilience, decentralized bio-digesters, and community-led river regeneration.',
    ecologicalZone: 'Highland Urban Riverine Corridor',
    populationEstimate: 260000,
    priorityFloorFlag: true,
    activeHazards: ['Riparian flash flooding wiping out zinc dwellings', 'Solid waste blockages of river channel'],
    keyAssets: ['Ushirika Community Bio-centres', 'Soweto East Rain Harvesting Network', 'Kibera Public Space Project #7'],
    knowledgeGaps: ['Micro-plastic distribution in riverbed sediment downstream of Ngong river confluence']
  }
];

export const SIGNALS_REGISTRY: IntelligenceSignal[] = [
  {
    id: 'sig-nak-001',
    placeId: 'lake-nakuru-basin',
    placeName: 'Lake Nakuru Catchment',
    headline: 'Siltation surge detected in Njoro-Makalia delta following highland clearing',
    category: 'water',
    severity: 'high',
    confidencePercent: 88,
    detectedAt: '2026-10-06T14:22:00Z',
    summary: 'Multi-spectral satellite imagery and acoustic silt sensors at the Njoro river flume indicate a 34% increase in suspended sediment load over 14 days, threatening water clarity and benthic invertebrate beds.',
    whyItMatters: 'Accelerated siltation elevates lake bed topography, exacerbating peri-urban flooding in southern Nakuru town and suffocating the alkaline algae that sustain lesser flamingo colonies.',
    evidence: [
      {
        id: 'ev-sat-01',
        title: 'Sentinel-2 Level-2A Surface Reflectance (Band 4/8 Turbidity Index)',
        type: 'satellite',
        sensorOrAuthor: 'Copernicus Sentinel-2B Multispectral Instrument',
        timestamp: '2026-10-05T07:42:00Z',
        resolutionOrPrecision: '10m spatial resolution',
        confidenceScore: 92,
        epistemicTier: 'measured'
      },
      {
        id: 'ev-wrma-02',
        title: 'WRMA Njoro River Flume Gauging Station #2FC05 Telemetry',
        type: 'ground_sensor',
        sensorOrAuthor: 'Water Resources Authority (WRMA) Automated Turbidity Probe',
        timestamp: '2026-10-06T06:00:00Z',
        resolutionOrPrecision: '15-minute interval NTU measurement (±2.5 NTU)',
        confidenceScore: 95,
        epistemicTier: 'measured'
      },
      {
        id: 'ev-comm-03',
        title: 'Barut Smallholder Farmers Association Field Incident Report',
        type: 'community_report',
        sensorOrAuthor: 'Barut CFA Ground Stewards',
        timestamp: '2026-10-04T16:15:00Z',
        resolutionOrPrecision: '3 GPS-tagged photos with unpaved road gully measurements',
        confidenceScore: 84,
        epistemicTier: 'observed'
      }
    ],
    epistemicStatus: 'inferred',
    assumptions: [
      'Upstream rain gauge in Njoro (42mm on Oct 3) was the trigger event',
      'Sediment settling velocity conforms to standard volcanic pumice particle density'
    ],
    limitations: [
      'Sub-surface bedload transport cannot be measured directly by acoustic surface probes',
      'Cloud cover over eastern Mau summit obscured optical sensing for 36 hours'
    ],
    modelUsed: 'HydroSed-Africa v3.2 (Distributed Sediment Routing Engine)',
    recommendedAction: 'Dispatch community vegetative buffer stabilization along 4.2km of Njoro river riparian reserve and commission 3 check dams before expected short rains climax.',
    status: 'active'
  },
  {
    id: 'sig-nak-002',
    placeId: 'rhonda-kaptembwa',
    placeName: 'Rhonda & Kaptembwa Settlements',
    headline: 'Priority Floor Alert: Shallow aquifer contamination risk in 4 informal sub-wards',
    category: 'community',
    severity: 'critical',
    confidencePercent: 86,
    detectedAt: '2026-10-06T09:15:00Z',
    summary: 'Localized rain intensity exceeding 28mm/hr combined with unlined latrines has caused coliform intrusion into unsealed community hand pumps serving 14,000 residents who lack piped municipal water.',
    whyItMatters: 'Vulnerable families with daily incomes under $2 rely exclusively on these shallow pumps. Failure to act immediately will produce waterborne disease outbreaks within 72 hours.',
    evidence: [
      {
        id: 'ev-field-04',
        title: 'Nakuru Community Health Volunteers Rapid Colilert Test Array',
        type: 'ground_sensor',
        sensorOrAuthor: 'Sub-County Public Health Officer & Rhonda CHVs',
        timestamp: '2026-10-05T18:00:00Z',
        resolutionOrPrecision: '24 sampling points across Block 4 & 7; MPN > 240/100ml in 18 samples',
        confidenceScore: 94,
        epistemicTier: 'measured'
      },
      {
        id: 'ev-soc-05',
        title: 'Nakuru Water & Sanitation Co (NAWASSCO) Vendor Water Price Spike',
        type: 'community_report',
        sensorOrAuthor: 'Kaptembwa Consumer Price Monitoring Network',
        timestamp: '2026-10-06T08:00:00Z',
        resolutionOrPrecision: '20L jerrycan price jumped from 5 KES to 35 KES within 24h',
        confidenceScore: 90,
        epistemicTier: 'observed'
      }
    ],
    epistemicStatus: 'measured',
    assumptions: [
      'Current water vendor price gouging forces poorest households back to contaminated wells',
      'Rain forecast models indicate another 30mm precipitation within 48h'
    ],
    limitations: [
      'Exact underground flow vector through fractured pumice layers has 12% uncertainty'
    ],
    modelUsed: 'EpidemicRisk-WaterPath v1.8 (Spatial Contagion Model)',
    recommendedAction: 'Deploy NAWASSCO emergency chlorine dosing tablets to 2,400 households and open emergency municipal standpipes at subsidized zero-rate.',
    status: 'active'
  },
  {
    id: 'sig-mau-003',
    placeId: 'mau-forest-complex',
    placeName: 'Eastern Mau Water Tower',
    headline: 'Highland peat wetland drainage detected along Enapuyapui conservation perimeter',
    category: 'ecology',
    severity: 'high',
    confidencePercent: 91,
    detectedAt: '2026-10-05T11:30:00Z',
    summary: 'Synthetic Aperture Radar (SAR) interferometry confirms 18 hectares of illicit agricultural ditch digging in the highland peat wetland, reducing natural water sponge capacity by ~420,000 m³.',
    whyItMatters: 'Enapuyapui is the primary sponge feeding the Njoro and Mara rivers. Once peat bogs dry and oxidize, baseline dry-season river discharge drops by up to 60%, devastating downstream pastoralists and wildlife.',
    evidence: [
      {
        id: 'ev-sar-06',
        title: 'Sentinel-1 C-SAR Interferometric Soil Coherence Analysis',
        type: 'satellite',
        sensorOrAuthor: 'ESA Copernicus Sentinel-1 Radar (VV/VH)',
        timestamp: '2026-10-04T17:20:00Z',
        resolutionOrPrecision: '10m spatial resolution, surface displacement accuracy ±5mm',
        confidenceScore: 93,
        epistemicTier: 'measured'
      },
      {
        id: 'ev-ogiek-07',
        title: 'Ogiek Indigenous Council of Elders Drone Reconnaissance Log',
        type: 'drone_lidar',
        sensorOrAuthor: 'Ogiek Forest Stewardship Rangers (DJI Matrice 300 LiDAR)',
        timestamp: '2026-10-05T09:40:00Z',
        resolutionOrPrecision: '5cm point cloud showing 14 drainage trenches cut into sphagnum layer',
        confidenceScore: 98,
        epistemicTier: 'observed'
      }
    ],
    epistemicStatus: 'measured',
    assumptions: [
      'Trench depth of 1.2m accelerates lateral hydrological drawdown across a 50m radius'
    ],
    limitations: [
      'Peat carbon density estimates based on 2024 core samples rather than 2026 fresh cores'
    ],
    modelUsed: 'PeatSponge Hydro-Dynamic Simulation v4.1',
    recommendedAction: 'Coordinate KFS and Ogiek Rangers joint patrol to plug drainage ditches with local brushwood dams before water table subsides further.',
    status: 'active'
  },
  {
    id: 'sig-men-004',
    placeId: 'menengai-caldera',
    placeName: 'Menengai Geothermal Caldera',
    headline: 'Geothermal direct-heat utilization opportunity: 45MW thermal excess venting',
    category: 'infrastructure',
    severity: 'moderate',
    confidencePercent: 85,
    detectedAt: '2026-10-04T16:00:00Z',
    summary: 'Thermal sensors at wellheads MW-08 through MW-17 indicate continuous venting of low-enthalpy secondary brine (118°C) that could power municipal grain drying and milk pasteurization.',
    whyItMatters: 'Post-harvest grain loss in Nakuru County exceeds 22% due to damp storage; converting free geothermal steam into cooperative grain drying can protect $4.8M of maize annually.',
    evidence: [
      {
        id: 'ev-gdc-08',
        title: 'Geothermal Development Company (GDC) Wellhead SCADA Logs',
        type: 'ground_sensor',
        sensorOrAuthor: 'GDC Reservoir Engineering Division',
        timestamp: '2026-10-04T12:00:00Z',
        resolutionOrPrecision: 'Calibrated thermal flow meters (mass flow 18.4 kg/s at 3.2 bar)',
        confidenceScore: 96,
        epistemicTier: 'measured'
      }
    ],
    epistemicStatus: 'modeled',
    assumptions: [
      'Pipeline spur of 3.8km to Rongai farming cooperative hub can be constructed without caldera rim disruption'
    ],
    limitations: [
      'Requires silica scaling mitigation in secondary heat exchangers'
    ],
    modelUsed: 'GeoThermo-Economic Yield Engine v2.0',
    recommendedAction: 'Syndicate Blended Finance dossier with African Development Bank and Nakuru Cereals Cooperatives.',
    status: 'active'
  }
];

export const DECISION_RECORDS: DecisionRecord[] = [
  {
    id: 'dec-nak-2026-01',
    title: 'Mitigation of Njoro River Silt Load and Lake Nakuru Siltation',
    placeId: 'lake-nakuru-basin',
    placeName: 'Lake Nakuru Catchment / Njoro River',
    problemStatement: 'Severe sediment loading (34% above safety baseline) threatening lake ecosystem balance and town water intake infrastructure.',
    urgency: 'immediate',
    options: [
      {
        id: 'opt-a',
        name: 'Scenario A: Upstream Agroforestry & Bamboo Riparian Buffer',
        summary: 'Mobilize 6 Community Forest Associations to plant native giant bamboo and vetiver grass along 18km of degraded riverbank, with farmer payment for ecosystem services.',
        interventionType: 'Nature-based Agroforestry',
        estimatedCostUSD: 140000,
        timelineMonths: 6,
        resilienceGainPercent: 78,
        vulnerablePeopleProtected: 32000,
        risksAndTradeoffs: ['Takes 12-18 months to achieve full root stabilization', 'Requires farmer compliance and grazing exclusion enforcement'],
        confidenceScore: 89,
        verificationMethod: 'Bi-weekly Sentinel-2 NDVI tracking + WRMA turbidity flume telemetry'
      },
      {
        id: 'opt-b',
        name: 'Scenario B: Engineered Gabion Check Dams & Silt Traps',
        summary: 'Construct 14 masonry and rock gabion check dams across steep feeder gullies in Upper Njoro to trap sediment mechanically before it reaches main river stem.',
        interventionType: 'Hard Civil Engineering',
        estimatedCostUSD: 310000,
        timelineMonths: 2,
        resilienceGainPercent: 64,
        vulnerablePeopleProtected: 18000,
        risksAndTradeoffs: ['Rapid silt saturation within 3 seasons requiring expensive dredging', 'Higher upfront capital outlay'],
        confidenceScore: 82,
        verificationMethod: 'Total volumetric silt trapped surveys + drone photogrammetry'
      },
      {
        id: 'opt-c',
        name: 'Scenario C: Hybrid Catchment Regeneration (Recommended)',
        summary: 'Construct 6 strategic check dams at peak gully choke points combined with immediate community bamboo planting, nursery seed distribution, and local youth steward stipends.',
        interventionType: 'Integrated Hybrid Ecological Infrastructure',
        estimatedCostUSD: 215000,
        timelineMonths: 4,
        resilienceGainPercent: 91,
        vulnerablePeopleProtected: 45000,
        risksAndTradeoffs: ['Requires multi-institutional coordination between KFS, WRMA, and County Government'],
        confidenceScore: 92,
        verificationMethod: 'Integrated satellite silt index + sediment depth gauges + community mobile logs'
      },
      {
        id: 'opt-d',
        name: 'Scenario D: Baseline (No Intervention)',
        summary: 'Allow existing trends to continue without institutional capital or coordinated intervention.',
        interventionType: 'Status Quo',
        estimatedCostUSD: 0,
        timelineMonths: 0,
        resilienceGainPercent: -28,
        vulnerablePeopleProtected: 0,
        risksAndTradeoffs: ['Lake bed rises additional 14cm', 'Water treatment plant shuts down during storms', 'Economic loss estimated at $1.9M'],
        confidenceScore: 95,
        verificationMethod: 'Observational damage assessment'
      }
    ],
    recommendedOptionId: 'opt-c',
    alternativeOptionId: 'opt-a',
    assignedSteward: 'Eng. Mary Wambui (Director of Water Services, Nakuru County)',
    reviewStatus: 'council_approved',
    auditLog: [
      {
        steward: 'Dr. Joseph Kipkemoi (Lead Hydrologist, Atlas Sanctum)',
        action: 'Formulated Scenario Options from HydroSed Model Run #449',
        timestamp: '2026-10-06T10:15:00Z',
        rationale: 'Evidence from Sentinel-2 and WRMA confirms hybrid check dam + bio-shield provides 91% resilience with lowest lifecycle maintenance cost.'
      },
      {
        steward: 'Eng. Mary Wambui (Nakuru County Water Directorate)',
        action: 'Approved Scenario C for Joint Implementation with KFS & WRMA',
        timestamp: '2026-10-06T13:40:00Z',
        rationale: 'County matching fund of $85,000 committed alongside Green Climate Fund grant.'
      }
    ]
  },
  {
    id: 'dec-rho-2026-02',
    title: 'Emergency Drinking Water Security in Rhonda & Kaptembwa',
    placeId: 'rhonda-kaptembwa',
    placeName: 'Rhonda & Kaptembwa Informal Settlements',
    problemStatement: 'Severe coliform intrusion into shallow wells impacting 14,000 unserved residents following flash storms.',
    urgency: 'immediate',
    options: [
      {
        id: 'opt-r1',
        name: 'Scenario A: Emergency Tanker Water Delivery & Jerrycan Subsidies',
        summary: 'Deploy 6 municipal water bowsers daily to deliver free chlorinated water at 12 centralized distribution points.',
        interventionType: 'Emergency Humanitarian Relief',
        estimatedCostUSD: 32000,
        timelineMonths: 1,
        resilienceGainPercent: 65,
        vulnerablePeopleProtected: 14000,
        risksAndTradeoffs: ['High ongoing fuel cost', 'Logistical bottleneck in narrow unpaved alleys'],
        confidenceScore: 94,
        verificationMethod: 'Daily delivery liters logged via digital token meter'
      },
      {
        id: 'opt-r2',
        name: 'Scenario B: Point-of-Use Chlorine Distribution & UV Kiosk Retrofits (Recommended)',
        summary: 'Distribute 30-day Aquatab supply to all 2,400 vulnerable households and equip 6 existing youth kiosks with solar-powered UV purification modules.',
        interventionType: 'Decentralized Point-of-Use Infrastructure',
        estimatedCostUSD: 24500,
        timelineMonths: 1,
        resilienceGainPercent: 88,
        vulnerablePeopleProtected: 18200,
        risksAndTradeoffs: ['Relies on household adherence to chlorine dosing instructions'],
        confidenceScore: 91,
        verificationMethod: 'CHV spot tests for free chlorine residual in stored household water'
      }
    ],
    recommendedOptionId: 'opt-r2',
    alternativeOptionId: 'opt-r1',
    assignedSteward: 'Amina Hassan (Public Health Community Lead, Rhonda Ward)',
    reviewStatus: 'in_execution',
    auditLog: [
      {
        steward: 'Amina Hassan',
        action: 'Authorized Emergency Chlorine Distribution Plan',
        timestamp: '2026-10-06T11:00:00Z',
        rationale: 'Point-of-use distribution directly shields poorest households without waiting for road repairs.'
      }
    ]
  }
];

export const COORDINATION_PROJECTS: CoordinationProject[] = [
  {
    id: 'proj-coord-01',
    title: 'Njoro River Hybrid Bio-Shield & Check Dam Operation',
    placeId: 'lake-nakuru-basin',
    placeName: 'Lake Nakuru Catchment / Njoro Sub-County',
    participatingInstitutions: [
      'Nakuru County Water Directorate',
      'Kenya Forest Service (KFS)',
      'Water Resources Authority (WRMA)',
      'Barut Community Forest Association',
      'Egerton University Water Research Lab'
    ],
    leadSteward: 'Eng. Mary Wambui',
    allocatedBudgetUSD: 215000,
    disbursedBudgetUSD: 95000,
    status: 'active_fieldwork',
    targetMilestone: 'Complete 6 upstream rock check dams and plant 45,000 bamboo shoots across 8.5km riparian strip.',
    progressPercent: 44,
    timeline: 'Oct 2026 – Feb 2027',
    priorityFloorBenefit: 'Protects 3,200 downstream smallholder farm plots from flash floods and gully washout.',
    activeBlockers: ['Temporary timber transport permit delays at Rongai border']
  },
  {
    id: 'proj-coord-02',
    title: 'Rhonda-Kaptembwa Clean Water Assurance Initiative',
    placeId: 'rhonda-kaptembwa',
    placeName: 'Rhonda & Kaptembwa Wards',
    participatingInstitutions: [
      'NAWASSCO (Nakuru Water & Sanitation Co)',
      'Rhonda Community Health Volunteers Network',
      'Red Cross Kenya (Nakuru Branch)',
      'Barut Youth Drainage Cooperative'
    ],
    leadSteward: 'Amina Hassan',
    allocatedBudgetUSD: 24500,
    disbursedBudgetUSD: 24500,
    status: 'active_fieldwork',
    targetMilestone: 'Distribute 72,000 Aquatab chlorine units and install 6 solar UV units at key kiosks.',
    progressPercent: 78,
    timeline: 'Oct 2026 (Rapid Response)',
    priorityFloorBenefit: 'Directly ensures 18,200 low-income residents have zero-cost pathogen-free drinking water.',
    activeBlockers: []
  },
  {
    id: 'proj-coord-03',
    title: 'Eastern Mau Peat Bog Hydrological Restoration',
    placeId: 'mau-forest-complex',
    placeName: 'Eastern Mau / Enapuyapui Swamp',
    participatingInstitutions: [
      'Kenya Water Towers Agency',
      'Ogiek Peoples Development Program (OPDP)',
      'Kenya Forest Service',
      'East African Wildlife Society'
    ],
    leadSteward: 'Elder Daniel Kobei',
    allocatedBudgetUSD: 85000,
    disbursedBudgetUSD: 40000,
    status: 'mobilizing',
    targetMilestone: 'Plug 14 drainage trenches and establish 20 community eco-ranger patrol zones.',
    progressPercent: 25,
    timeline: 'Nov 2026 – Apr 2027',
    priorityFloorBenefit: 'Protects ancestral indigenous territory water rights and prevents dry-season stream failure.',
    activeBlockers: ['Awaiting heavy machinery permit for drainage re-plugging from Ministry of Environment']
  }
];

export const VERIFICATION_AUDITS: VerificationAudit[] = [
  {
    id: 'ver-2026-001',
    decisionId: 'dec-nak-2025-08',
    title: 'Evaluation of Upper Njoro Terracing & Vetiver Grass Campaign (Q1 2026)',
    placeName: 'Njoro Agricultural Slopes',
    intervention: 'Installation of 32km of contoured vetiver hedgerows across 120 smallholder maize farms.',
    expectedOutcome: 'Model predicted 45% reduction in topsoil loss and 30% reduction in seasonal stream turbidity.',
    observedOutcome: 'Measured turbidity drop was 38% (better than expected), but topsoil retention in extreme 50mm storm was 31% due to early seedling uprooting before root anchoring.',
    errorPercentage: 14,
    wasAtlasRight: 'partially_accurate',
    whyItDiverged: 'Atlas model assumed vetiver grass root tensile strength at 3 months would reach 40 MPa; local volcanic pumice soil delayed establishment by 18 days due to phosphorus locking.',
    modelAdjustmentMade: 'Updated SoilPlantErosion Engine v2.4 to account for alkaline pumice phosphorus fixation curves in Rift Valley volcanic soils.',
    institutionalLesson: 'Never schedule bare-root hedgerow planting fewer than 60 days before long rain onset in loose volcanic ash terrain without temporary geotextile bundling.',
    verifiedAt: '2026-09-15T10:00:00Z',
    verifyingBody: 'Egerton University Hydrological Verification Bureau & WRMA Inspectorate'
  },
  {
    id: 'ver-2025-004',
    decisionId: 'dec-naiv-2025-02',
    title: 'Lake Naivasha Aquifer Drawdown Prediction vs. Measured Pumping (2025)',
    placeName: 'Lake Naivasha Aquifer Basin',
    intervention: 'Installation of smart telemetry meters on 65 commercial flower farm deep boreholes.',
    expectedOutcome: 'Atlas predicted cumulative water abstraction would decline by 18.5% with tiered tariff enforcement.',
    observedOutcome: 'Observed reduction was 19.2% (Atlas error: -3.7%). Groundwater table stabilization verified in 14 observation wells.',
    errorPercentage: 3.7,
    wasAtlasRight: 'confirmed',
    whyItDiverged: 'Model prediction was highly accurate; minor variance caused by earlier unseasonal rains reducing irrigation need.',
    modelAdjustmentMade: 'Calibrated seasonal demand elasticity coefficient from 0.42 to 0.45.',
    institutionalLesson: 'Real-time transparent meter publishing to all stakeholders eliminated illegal nocturnal pumping without punitive litigation.',
    verifiedAt: '2026-02-10T14:30:00Z',
    verifyingBody: 'Lake Naivasha Water Users Association (LNWRA) & WRMA'
  },
  {
    id: 'ver-2025-002',
    decisionId: 'dec-mau-2024-11',
    title: 'Mau Forest Canopy Recovery under Community Co-Management',
    placeName: 'Eastern Mau Forest Complex',
    intervention: 'Transfer of 4,000 hectares of buffer zone to joint Ogiek-KFS indigenous stewardship.',
    expectedOutcome: 'Atlas predicted 12% canopy density gain over 24 months.',
    observedOutcome: 'Observed canopy gain was only 4.8%. Forest fire in dry spell damaged 420 hectares.',
    errorPercentage: 60,
    wasAtlasRight: 'diverged_recalibrated',
    whyItDiverged: 'We were wrong. Atlas failed to incorporate micro-climatic dry fuel buildup created by invasive eucalyptus brush adjacent to the indigenous podocarpus boundary.',
    modelAdjustmentMade: 'Rewrote FireSpread-Rift model to dynamically weight edge-effect invasive fuel loads and wind vectors in complex montane topography.',
    institutionalLesson: 'Preserving institutional memory: Admitting where models fail is critical to preventing catastrophic fire recurrence. Fuel-break clearing must precede buffer transfers.',
    verifiedAt: '2026-01-20T09:00:00Z',
    verifyingBody: 'Kenya Forest Service & Atlas Sanctum Joint Audit Panel'
  }
];

export const RESEARCH_BRIEFS: ResearchPaperOrBrief[] = [
  {
    id: 'res-01',
    title: 'Hydrological Trajectory of Endorheic Rift Lakes Under Accelerated Land-Use Transformation: The Lake Nakuru Basin 2012–2026',
    authors: ['Dr. Joseph Kipkemoi', 'Prof. Angela Mwangi', 'Dr. Eric Lindqvist'],
    abstract: 'An empirical synthesis of 14 years of multi-sensor Earth observation, streamflow telemetry, and sediment core chronologies. Demonstrates that while precipitation increased by 11.2%, runoff coefficient surged by 42% due to urban impervious cover and forest canopy fragmentation.',
    epistemicBreakdown: {
      measuredFacts: [
        'Lake Nakuru surface area increased from 41.5 km² (2010) to 68.2 km² (2026)',
        'Suspended solids in Njoro river flume averaged 420 mg/L during storm surges',
        '64 km² of upstream Mau forest canopy altered between 2000 and 2020'
      ],
      correlations: [
        'Strong positive correlation (r = 0.84, p < 0.001) between urban roof area in Nakuru West and peak storm hydrograph sharpness',
        'Negative correlation (r = -0.76) between water alkalinity (pH drop from 10.2 to 8.9) and Spirulina platensis algal density'
      ],
      inferences: [
        'Rising lake level is predominantly driven by reduced catchment infiltration capacity rather than long-term regional rainfall increase alone'
      ],
      remainingHypotheses: [
        'Sub-surface seismic fracturing from the 2018 Rift Valley movement may have altered deep aquifer outflow channels towards Menengai'
      ]
    },
    sampleSize: '5,120 daily streamflow readings, 680 satellite scenes, 42 sediment cores',
    uncertaintyMargin: '±6.2% on volumetric runoff attribution',
    reproducibilityScore: 94,
    datasetName: 'Nakuru-Hydrology-Longitudinal-v4.parquet',
    lastUpdated: '2026-09-28'
  },
  {
    id: 'res-02',
    title: 'The Priority Floor in Geospatial Intelligence: Systematic Under-Representation of Informal Settlements in Climate Adaptation Capital',
    authors: ['Amina Hassan', 'Elena Rostova', 'Kofi Mensah'],
    abstract: 'Investigates the "Option for the Excluded". Evaluates how traditional satellite NDVI and commercial GIS tools systematically obscure low-income populations living in dense peri-urban areas, resulting in a 7:1 capital misallocation toward wealthy agricultural estates.',
    epistemicBreakdown: {
      measuredFacts: [
        'Informal settlements comprise 44% of Nakuru town population but received <6% of municipal drainage investment between 2018-2024',
        'Water cost per liter is 4.8x higher in Kaptembwa informal settlement than in Milimani gated residential estate'
      ],
      correlations: [
        'Correlation between unpaved road density and childhood diarrheal incidence during monsoon (r = 0.79)'
      ],
      inferences: [
        'Standard GIS algorithms treating impervious surface as commercial infrastructure miscategorize tin roofs as low-vulnerability assets'
      ],
      remainingHypotheses: [
        'Community-curated micro-drainage maps can reduce flood response latency by up to 80%'
      ]
    },
    sampleSize: '2,400 household surveys across 6 wards',
    uncertaintyMargin: '±4.1% on household expenditure estimates',
    reproducibilityScore: 91,
    datasetName: 'PriorityFloor-Nakuru-Surveys-2026.json',
    lastUpdated: '2026-10-02'
  }
];

export const CAPITAL_OPPORTUNITIES: CapitalOpportunity[] = [
  {
    id: 'cap-01',
    title: 'Menengai Caldera Geothermal Direct Heat Agro-Processing Hub',
    placeName: 'Menengai Caldera / Rongai Border',
    domain: 'renewable_energy',
    capitalRequiredUSD: 2400000,
    blendedFinanceStructure: {
      concessionalPublicPct: 35,
      privateCapitalPct: 50,
      communityEquityPct: 15
    },
    expectedEcologicalYield: 'Eliminates 12,000 tons of diesel emissions per year; reduces post-harvest cereal spoilage by 65%.',
    expectedEconomicReturnPct: 14.8,
    directBeneficiaries: 24000,
    priorityFloorScore: 88,
    status: 'dossier_ready'
  },
  {
    id: 'cap-02',
    title: 'Njoro Watershed Community Sand Dam & Agroforestry Bio-Corridor',
    placeName: 'Lake Nakuru Basin / Njoro Sub-County',
    domain: 'water_infrastructure',
    capitalRequiredUSD: 650000,
    blendedFinanceStructure: {
      concessionalPublicPct: 60,
      privateCapitalPct: 25,
      communityEquityPct: 15
    },
    expectedEcologicalYield: 'Traps 180,000 m³ of water in seasonal sand beds; stabilizes 18km of riverbank; sequesters 4,500 tCO2e/yr.',
    expectedEconomicReturnPct: 8.2,
    directBeneficiaries: 38000,
    priorityFloorScore: 92,
    status: 'under_capital_review'
  },
  {
    id: 'cap-03',
    title: 'Rhonda-Kaptembwa Solar UV Water Micro-Grid & Bio-Digesters',
    placeName: 'Rhonda & Kaptembwa Settlements',
    domain: 'sanitation',
    capitalRequiredUSD: 380000,
    blendedFinanceStructure: {
      concessionalPublicPct: 70,
      privateCapitalPct: 15,
      communityEquityPct: 15
    },
    expectedEcologicalYield: 'Processes 40 tons of organic waste into biogas; replaces contaminated shallow wells with safe UV micro-piping.',
    expectedEconomicReturnPct: 6.5,
    directBeneficiaries: 42000,
    priorityFloorScore: 99,
    status: 'syndicated'
  }
];

export const FIELD_OBSERVATIONS_LOG: FieldObservation[] = [
  {
    id: 'field-obs-101',
    placeId: 'mau-forest-complex',
    placeName: 'Eastern Mau / Enapuyapui',
    observerName: 'Kiprotich Arap Cheruiyot',
    observerRole: 'Community Forest Scout #04',
    observationType: 'canopy_health',
    summary: 'Fresh ditch cut 1.4m wide crossing stream tributary. Peat soil drying on embankments.',
    metricValue: 'Ditch depth 1.2m, length 140m',
    timestamp: '2026-10-06T07:15:00Z',
    syncStatus: 'synced',
    verifiedBySatellite: true
  },
  {
    id: 'field-obs-102',
    placeId: 'rhonda-kaptembwa',
    placeName: 'Rhonda Ward Block 7',
    observerName: 'Faith Nyambura',
    observerRole: 'Community Health Volunteer',
    observationType: 'hydrology',
    summary: 'Handpump #12 water has foul odor and grey hue after Monday night flash storm. 6 children reported nausea.',
    metricValue: 'Turbidity 45 NTU, Colilert Positive',
    timestamp: '2026-10-06T08:30:00Z',
    syncStatus: 'synced',
    verifiedBySatellite: false
  },
  {
    id: 'field-obs-103',
    placeId: 'lake-nakuru-basin',
    placeName: 'Makalia Falls Inflow',
    observerName: 'Evans Ochieng',
    observerRole: 'KWS Wetland Ranger',
    observationType: 'hydrology',
    summary: 'Water level at gauging rod reading 1.82m (+0.4m over 48h). Silt plume extends 600m into lake.',
    metricValue: 'Gauging rod 1.82m',
    timestamp: '2026-10-06T12:00:00Z',
    syncStatus: 'synced',
    verifiedBySatellite: true
  }
];
