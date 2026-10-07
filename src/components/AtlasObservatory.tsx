import React, { useState } from 'react';
import { 
  Place, 
  IntelligenceSignal, 
  FieldObservation, 
  SpatialScale 
} from '../types/atlas';
import { 
  Layers, 
  MapPin, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ShieldAlert, 
  Droplets, 
  TreePine, 
  Zap, 
  Activity, 
  Radio, 
  Compass, 
  ChevronRight, 
  HelpCircle,
  ArrowRight,
  Info
} from 'lucide-react';

interface AtlasObservatoryProps {
  places: Place[];
  signals: IntelligenceSignal[];
  fieldObservations: FieldObservation[];
  selectedPlace: Place;
  onSelectPlace: (place: Place) => void;
  priorityFloorActive: boolean;
  onOpenLineage: (place: Place) => void;
  onSelectSignal: (signal: IntelligenceSignal) => void;
}

export const AtlasObservatory: React.FC<AtlasObservatoryProps> = ({
  places,
  signals,
  fieldObservations,
  selectedPlace,
  onSelectPlace,
  priorityFloorActive,
  onOpenLineage,
  onSelectSignal
}) => {
  // Layer visibility state
  const [activeLayers, setActiveLayers] = useState<{
    hydrology: boolean;
    forest: boolean;
    geothermal: boolean;
    hazards: boolean;
    priorityFloor: boolean;
    telemetry: boolean;
  }>({
    hydrology: true,
    forest: true,
    geothermal: true,
    hazards: true,
    priorityFloor: true,
    telemetry: true
  });

  const [zoomLevel, setZoomLevel] = useState<number>(2); // 1: Global/East Africa, 2: Nakuru County, 3: Site Deep Zoom
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  // Coordinated map points relative to SVG viewport (800 x 500)
  // Nakuru Rift Valley theater center around (-0.30, 36.08)
  const mapCoordinates: Record<string, { x: number; y: number; label: string; icon: string }> = {
    'mau-forest-complex': { x: 230, y: 340, label: 'Eastern Mau Water Tower', icon: 'forest' },
    'lake-nakuru-basin': { x: 440, y: 290, label: 'Lake Nakuru Basin', icon: 'lake' },
    'rhonda-kaptembwa': { x: 380, y: 260, label: 'Rhonda & Kaptembwa', icon: 'settlement' },
    'menengai-caldera': { x: 420, y: 150, label: 'Menengai Caldera', icon: 'geothermal' },
    'lake-naivasha-aquifer': { x: 620, y: 410, label: 'Lake Naivasha Aquifer', icon: 'lake' },
    'nairobi-kibera-corridor': { x: 710, y: 460, label: 'Nairobi River Basin', icon: 'urban' },
    'nakuru-county': { x: 400, y: 240, label: 'Nakuru County HQ', icon: 'capital' }
  };

  const currentCoords = mapCoordinates[selectedPlace.id] || { x: 400, y: 250, label: selectedPlace.name, icon: 'pin' };

  return (
    <div className="space-y-4 pb-10">
      {/* Top Observatory Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#111316] border border-[#22272e] rounded-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-xs bg-[#c27847]/15 border border-[#c27847]/40 flex items-center justify-center text-[#e8a36e]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-[#f5f2eb] tracking-wide">
              ATLAS SPATIAL OBSERVATORY · LIVING TWIN
            </div>
            <div className="text-[10px] text-[#78808c] font-mono">
              THEATER: GREAT RIFT SYSTEM · COORDINATES: 0°18'S, 36°04'E · WGS84
            </div>
          </div>
        </div>

        {/* Spatial Hierarchy Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#8a929f] overflow-x-auto">
          <span>Earth</span>
          <ChevronRight className="w-3 h-3 text-[#505763]" />
          <span>East Africa</span>
          <ChevronRight className="w-3 h-3 text-[#505763]" />
          <button 
            onClick={() => onSelectPlace(places[0])}
            className={`hover:text-[#f5f2eb] transition-colors ${selectedPlace.scale === 'county' ? 'text-[#c27847] font-semibold' : ''}`}
          >
            Nakuru County
          </button>
          <ChevronRight className="w-3 h-3 text-[#505763]" />
          <span className="text-[#f5f2eb] font-semibold bg-[#1a1d22] px-2 py-0.5 rounded-xs border border-[#2a303a]">
            {selectedPlace.name}
          </span>
        </div>
      </div>

      {/* Main Observatory Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Layer Controls & Place Selector (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Spatial Layer Toggles */}
          <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#1d2229] pb-2">
              <span className="text-xs font-mono font-semibold text-[#d8dadf] uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#c27847]" />
                Cartographic Layers
              </span>
              <span className="text-[10px] font-mono text-[#717885]">
                {Object.values(activeLayers).filter(Boolean).length}/6 ACTIVE
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <button
                onClick={() => toggleLayer('hydrology')}
                className={`w-full flex items-center justify-between p-2 rounded-xs border transition-colors ${
                  activeLayers.hydrology 
                    ? 'bg-[#0f171d] border-[#1d3d57] text-[#6cbcf6]' 
                    : 'bg-[#0d0e10] border-[#1c1f24] text-[#69717d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Hydrology & Basins</span>
                </div>
                <span className="text-[10px]">{activeLayers.hydrology ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => toggleLayer('forest')}
                className={`w-full flex items-center justify-between p-2 rounded-xs border transition-colors ${
                  activeLayers.forest 
                    ? 'bg-[#101b13] border-[#1f4828] text-[#7de091]' 
                    : 'bg-[#0d0e10] border-[#1c1f24] text-[#69717d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Canopy & Peat Bogs</span>
                </div>
                <span className="text-[10px]">{activeLayers.forest ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => toggleLayer('geothermal')}
                className={`w-full flex items-center justify-between p-2 rounded-xs border transition-colors ${
                  activeLayers.geothermal 
                    ? 'bg-[#1c180e] border-[#534015] text-[#e8c160]' 
                    : 'bg-[#0d0e10] border-[#1c1f24] text-[#69717d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Geothermal & Grids</span>
                </div>
                <span className="text-[10px]">{activeLayers.geothermal ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => toggleLayer('hazards')}
                className={`w-full flex items-center justify-between p-2 rounded-xs border transition-colors ${
                  activeLayers.hazards 
                    ? 'bg-[#20110e] border-[#572017] text-[#f27e6a]' 
                    : 'bg-[#0d0e10] border-[#1c1f24] text-[#69717d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#e8705c]" />
                  <span>Hazards & Silt Plumes</span>
                </div>
                <span className="text-[10px]">{activeLayers.hazards ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => toggleLayer('priorityFloor')}
                className={`w-full flex items-center justify-between p-2 rounded-xs border transition-colors ${
                  activeLayers.priorityFloor 
                    ? 'bg-[#1e130c] border-[#5c3116] text-[#e8a36e]' 
                    : 'bg-[#0d0e10] border-[#1c1f24] text-[#69717d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#c27847]" />
                  <span>Priority Floor Layer</span>
                </div>
                <span className="text-[10px]">{activeLayers.priorityFloor ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => toggleLayer('telemetry')}
                className={`w-full flex items-center justify-between p-2 rounded-xs border transition-colors ${
                  activeLayers.telemetry 
                    ? 'bg-[#14121b] border-[#382d5a] text-[#b39ef3]' 
                    : 'bg-[#0d0e10] border-[#1c1f24] text-[#69717d]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-violet-400" />
                  <span>Ground Field Telemetry</span>
                </div>
                <span className="text-[10px]">{activeLayers.telemetry ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Place Hierarchy Browser */}
          <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm space-y-3">
            <div className="text-xs font-mono font-semibold text-[#d8dadf] uppercase">
              Monitored Places ({places.length})
            </div>
            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {places.map((place) => {
                const isSelected = selectedPlace.id === place.id;
                return (
                  <button
                    key={place.id}
                    onClick={() => onSelectPlace(place)}
                    className={`w-full text-left p-2 rounded-xs text-xs font-mono transition-colors border ${
                      isSelected
                        ? 'bg-[#1a1e24] border-[#c27847] text-[#f5f2eb]'
                        : 'bg-[#0c0d0e] border-[#1b1f24] text-[#8e96a2] hover:text-[#d3d8e0] hover:border-[#2d333d]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-[#f0ede6] truncate">{place.name}</span>
                      {place.priorityFloorFlag && (
                        <span className="text-[9px] px-1 py-0.2 bg-[#c27847]/20 text-[#e8a36e] rounded-xs">
                          PRIORITY
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#717885] mt-0.5 flex items-center gap-1.5">
                      <span>{place.scale.toUpperCase()}</span>
                      <span>·</span>
                      <span>{place.ecologicalZone.split(' ')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The Spatial Map Canvas (6 cols) */}
        <div className="lg:col-span-6 relative bg-[#090a0c] border border-[#22272e] rounded-sm overflow-hidden flex flex-col min-h-[540px]">
          {/* Map Top Bar Controls */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <div className="bg-[#111316]/90 backdrop-blur-sm border border-[#282e37] px-2.5 py-1 rounded-sm text-[11px] font-mono text-[#e8e6df] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>RESOLUTION: 10M SENTINEL-2 / COP-DEM</span>
            </div>
          </div>

          <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-[#111316]/90 backdrop-blur-sm border border-[#282e37] p-1 rounded-sm">
            <button 
              onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 3))}
              className="p-1 hover:bg-[#1f242b] text-[#b0b8c4] rounded-xs"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 1))}
              className="p-1 hover:bg-[#1f242b] text-[#b0b8c4] rounded-xs"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setZoomLevel(2)}
              className="p-1 hover:bg-[#1f242b] text-[#b0b8c4] rounded-xs"
              title="Reset View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* SVG Map Canvas Viewport */}
          <div className="relative flex-1 w-full h-full min-h-[460px] map-grid-pattern flex items-center justify-center p-4">
            <svg 
              viewBox="0 0 800 520" 
              className="w-full h-full max-h-[500px] select-none transition-transform duration-300"
              style={{
                transform: zoomLevel === 1 ? 'scale(0.85)' : zoomLevel === 3 ? 'scale(1.25)' : 'scale(1)'
              }}
            >
              <defs>
                {/* Rift fault contour gradient */}
                <linearGradient id="riftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1a1c20" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0d0e11" stopOpacity="0.95" />
                </linearGradient>

                <radialGradient id="lakeNakuruGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
                </radialGradient>

                <radialGradient id="mauCanopyGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.35" />
                  <stop offset="80%" stopColor="#064e3b" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#022c22" stopOpacity="0.7" />
                </radialGradient>

                <radialGradient id="calderaGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
                  <stop offset="80%" stopColor="#78350f" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1c1917" stopOpacity="0.6" />
                </radialGradient>
              </defs>

              {/* Rift Valley Basin Contours & Terrain Base */}
              <path 
                d="M 120 50 Q 200 120 220 280 T 310 460 L 680 490 Q 750 320 690 140 T 520 40 Z" 
                fill="url(#riftGradient)" 
                stroke="#2a303a" 
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Major Geological Fault Lines (Mau Escarpment & Bahati Ridge) */}
              <path 
                d="M 180 80 Q 210 220 240 380 L 260 480" 
                fill="none" 
                stroke="#475569" 
                strokeWidth="2" 
                strokeDasharray="6 4"
                opacity="0.6"
              />
              <path 
                d="M 540 60 Q 560 210 590 350 L 610 490" 
                fill="none" 
                stroke="#475569" 
                strokeWidth="2" 
                strokeDasharray="6 4"
                opacity="0.6"
              />

              {/* Layer: Forest & Peat Bog (Eastern Mau) */}
              {activeLayers.forest && (
                <g id="layer-forest">
                  <path
                    d="M 160 280 C 180 240, 290 260, 310 320 C 330 380, 240 430, 190 410 C 140 390, 140 320, 160 280 Z"
                    fill="url(#mauCanopyGradient)"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                  />
                  {/* Peat bog drainage lines */}
                  <path 
                    d="M 230 340 L 255 355 M 240 330 L 265 345" 
                    stroke="#ef4444" 
                    strokeWidth="2" 
                    strokeDasharray="2 2"
                  />
                  <text x="210" y="380" fill="#a7f3d0" fontSize="10" fontFamily="monospace" opacity="0.8">
                    MAU PEAT BOG (ENAPUYAPUI)
                  </text>
                </g>
              )}

              {/* Layer: Hydrology & River Basins */}
              {activeLayers.hydrology && (
                <g id="layer-hydrology">
                  {/* Njoro River Stream from Mau to Lake Nakuru */}
                  <path
                    d="M 240 350 Q 320 330 380 300 T 425 290"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />
                  {/* Makalia River Stream */}
                  <path
                    d="M 330 430 Q 380 370 425 315"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeOpacity="0.75"
                  />
                  {/* Lake Nakuru Water Body */}
                  <ellipse 
                    cx="440" 
                    cy="290" 
                    rx="46" 
                    ry="62" 
                    fill="url(#lakeNakuruGradient)" 
                    stroke="#60a5fa" 
                    strokeWidth="1.8"
                  />
                  <text x="410" y="295" fill="#bae6fd" fontSize="11" fontFamily="monospace" fontWeight="600">
                    LAKE NAKURU
                  </text>

                  {/* Lake Naivasha */}
                  <ellipse 
                    cx="620" 
                    cy="410" 
                    rx="38" 
                    ry="44" 
                    fill="url(#lakeNakuruGradient)" 
                    stroke="#38bdf8" 
                    strokeWidth="1.5"
                  />
                  <text x="585" y="415" fill="#bae6fd" fontSize="10" fontFamily="monospace">
                    LAKE NAIVASHA
                  </text>
                </g>
              )}

              {/* Layer: Geothermal Caldera (Menengai) */}
              {activeLayers.geothermal && (
                <g id="layer-geothermal">
                  <circle
                    cx="420"
                    cy="150"
                    r="48"
                    fill="url(#calderaGradient)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <circle cx="420" cy="150" r="4" fill="#fbbf24" />
                  <text x="365" y="155" fill="#fde68a" fontSize="10" fontFamily="monospace">
                    MENENGAI CALDERA (105MW)
                  </text>
                  {/* Geothermal Steam pipeline spur */}
                  <path d="M 420 150 L 460 170" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>
              )}

              {/* Layer: Hazards & Silt Plumes */}
              {activeLayers.hazards && (
                <g id="layer-hazards">
                  {/* Silt plume in Lake Nakuru delta */}
                  <ellipse 
                    cx="422" 
                    cy="288" 
                    rx="14" 
                    ry="20" 
                    fill="#b45309" 
                    fillOpacity="0.4" 
                    stroke="#f97316" 
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <text x="350" y="325" fill="#fb923c" fontSize="9" fontFamily="monospace">
                    ▲ SILT PLUME SURGE (+34%)
                  </text>
                </g>
              )}

              {/* Layer: Priority Floor (Informal Settlement Corridors) */}
              {activeLayers.priorityFloor && (
                <g id="layer-priority-floor">
                  {/* Rhonda & Kaptembwa Settlement Footprint */}
                  <rect
                    x="360"
                    y="245"
                    width="44"
                    height="32"
                    rx="3"
                    fill="#c27847"
                    fillOpacity="0.25"
                    stroke="#e8a36e"
                    strokeWidth="1.5"
                  />
                  <text x="345" y="240" fill="#fbcfe8" fontSize="9" fontFamily="monospace">
                    RHONDA / KAPTEMBWA
                  </text>
                </g>
              )}

              {/* Interactive Places Markers */}
              {places.map((place) => {
                const pt = mapCoordinates[place.id];
                if (!pt) return null;
                const isSelected = selectedPlace.id === place.id;
                const isHovered = hoveredPoint === place.id;

                return (
                  <g 
                    key={place.id}
                    onClick={() => onSelectPlace(place)}
                    onMouseEnter={() => setHoveredPoint(place.id)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="cursor-pointer transition-all duration-200"
                  >
                    {/* Pulsing ring for selected location */}
                    {isSelected && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="14"
                        fill="none"
                        stroke="#c27847"
                        strokeWidth="1.5"
                        strokeOpacity="0.8"
                        className="animate-pulse"
                      />
                    )}

                    {/* Point Pin */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? '6' : '4'}
                      fill={place.priorityFloorFlag ? '#c27847' : isSelected ? '#f5f2eb' : '#94a3b8'}
                      stroke="#0c0d0e"
                      strokeWidth="2"
                    />

                    {/* Dynamic Label Tag */}
                    {(isSelected || isHovered) && (
                      <g>
                        <rect
                          x={pt.x + 8}
                          y={pt.y - 12}
                          width={place.name.length * 6.5 + 16}
                          height="20"
                          rx="2"
                          fill="#111316"
                          stroke={isSelected ? '#c27847' : '#334155'}
                          strokeWidth="1"
                        />
                        <text
                          x={pt.x + 14}
                          y={pt.y + 1}
                          fill="#f8fafc"
                          fontSize="10"
                          fontFamily="monospace"
                          fontWeight="500"
                        >
                          {place.name}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Layer: Field Telemetry & Observations Pins */}
              {activeLayers.telemetry && fieldObservations.map((obs) => {
                const pt = mapCoordinates[obs.placeId];
                if (!pt) return null;
                // Add slight offset for telemetry
                const tx = pt.x + 12;
                const ty = pt.y + 12;

                return (
                  <g key={obs.id} className="cursor-pointer">
                    <polygon 
                      points={`${tx},${ty - 4} ${tx + 4},${ty + 4} ${tx - 4},${ty + 4}`}
                      fill="#a855f7" 
                      stroke="#111316" 
                      strokeWidth="1"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Map Legend Bar */}
          <div className="border-t border-[#1d2229] bg-[#0c0d0e] p-2.5 px-4 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#78808d]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c27847]" />
                Priority Floor Territory
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Active Hydrological Stream
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Montane Sponge
              </span>
            </div>
            <div className="text-[#a4acb9]">
              CLICK ANY SITE TO EXPAND PLACE KNOWLEDGE DOSSIER
            </div>
          </div>
        </div>

        {/* Selected Place Knowledge Dossier (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 bg-[#111316] border border-[#22272e] rounded-sm space-y-4">
            <div className="border-b border-[#1f242c] pb-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#c27847] uppercase">
                <span>{selectedPlace.scale} Level Asset</span>
                {selectedPlace.priorityFloorFlag && (
                  <span className="bg-[#c27847]/15 text-[#e8a36e] px-1.5 py-0.2 rounded-xs border border-[#c27847]/30">
                    OPTION FOR EXCLUDED
                  </span>
                )}
              </div>
              <h3 className="text-base font-serif font-medium text-[#f5f2eb] mt-1">
                {selectedPlace.name}
              </h3>
              {selectedPlace.nativeName && (
                <div className="text-xs text-[#7d8591] italic font-serif">
                  {selectedPlace.nativeName}
                </div>
              )}
              <div className="text-xs font-mono text-[#8a92a0] mt-2 leading-relaxed">
                {selectedPlace.description}
              </div>
            </div>

            {/* "What do we know about this place?" */}
            <div className="space-y-2">
              <div className="text-xs font-mono font-semibold text-[#f0ede6] uppercase flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>What We Know (Observed State)</span>
              </div>
              <div className="p-2.5 bg-[#0c0d0e] border border-[#1b1f24] rounded-xs space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-[#8e96a2]">
                  <span>Elevation:</span>
                  <span className="text-[#f5f2eb]">{selectedPlace.coordinates.elevationMeters}m ASL</span>
                </div>
                <div className="flex justify-between text-[#8e96a2]">
                  <span>Population:</span>
                  <span className="text-[#f5f2eb]">{selectedPlace.populationEstimate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#8e96a2]">
                  <span>Eco-Zone:</span>
                  <span className="text-[#f5f2eb] text-right truncate max-w-[140px]" title={selectedPlace.ecologicalZone}>
                    {selectedPlace.ecologicalZone}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Hazards */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#e8705c] uppercase flex items-center gap-1.5 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Active Hazards</span>
              </div>
              <ul className="space-y-1 text-xs font-mono text-[#9ea5b2]">
                {selectedPlace.activeHazards.map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#e8705c] mt-0.5">·</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* "What DON'T we know?" Critical Knowledge Gaps Layer */}
            <div className="space-y-2 p-3 bg-[#171410] border border-[#3d2716] rounded-xs">
              <div className="text-xs font-mono text-[#e8a36e] uppercase flex items-center gap-1.5 font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-[#c27847]" />
                <span>Knowledge Gaps (Unmapped)</span>
              </div>
              <p className="text-[11px] text-[#9a8c80] leading-relaxed">
                Atlas identifies unknowns as opportunities for scientific investigation rather than pretending false certainty:
              </p>
              <ul className="space-y-1.5 text-xs font-mono text-[#d6c7b9]">
                {selectedPlace.knowledgeGaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#c27847]">?</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Traceable Lineage Button */}
            <button
              onClick={() => onOpenLineage(selectedPlace)}
              className="w-full flex items-center justify-center gap-2 py-2 bg-[#1d2229] hover:bg-[#252c36] text-[#f5f2eb] border border-[#313944] text-xs font-mono uppercase tracking-wider rounded-xs transition-colors"
            >
              <span>Trace Decision Lineage</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c27847]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
