import React, { useState } from 'react';
import { Place, FieldObservation } from '../types/atlas';
import { 
  PlusCircle, 
  MapPin, 
  Radio, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  Camera, 
  ShieldAlert,
  Save
} from 'lucide-react';

interface FieldObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  places: Place[];
  selectedPlace: Place;
  onSaveObservation: (obs: FieldObservation) => void;
  lowBandwidthMode: boolean;
}

export const FieldObservationModal: React.FC<FieldObservationModalProps> = ({
  isOpen,
  onClose,
  places,
  selectedPlace,
  onSaveObservation,
  lowBandwidthMode
}) => {
  const [placeId, setPlaceId] = useState<string>(selectedPlace.id);
  const [observerName, setObserverName] = useState<string>('Field Steward Kiprotich');
  const [observerRole, setObserverRole] = useState<string>('Community Watershed Scout');
  const [observationType, setObservationType] = useState<FieldObservation['observationType']>('hydrology');
  const [summary, setSummary] = useState<string>('Elevated turbidity in tributary stream following 35mm nocturnal downpour.');
  const [metricValue, setMetricValue] = useState<string>('NTU reading: 52');
  const [offlineSimulated, setOfflineSimulated] = useState<boolean>(lowBandwidthMode);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPlace = places.find(p => p.id === placeId) || selectedPlace;

    const newObs: FieldObservation = {
      id: `field-obs-${Date.now()}`,
      placeId: currentPlace.id,
      placeName: currentPlace.name,
      observerName,
      observerRole,
      observationType,
      summary,
      metricValue: metricValue || undefined,
      timestamp: new Date().toISOString(),
      syncStatus: offlineSimulated ? 'queued_offline' : 'synced',
      verifiedBySatellite: false
    };

    onSaveObservation(newObs);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="max-w-lg w-full bg-[#111316] border border-[#2e343d] rounded-sm p-6 space-y-4 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-[#20252c] pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#c27847]" />
            <h3 className="text-sm font-serif font-semibold text-[#f5f2eb] uppercase tracking-wide">
              Edge Ground Telemetry Capture
            </h3>
          </div>
          <button onClick={onClose} className="text-[#78818f] hover:text-[#f5f2eb]">
            ✕
          </button>
        </div>

        {/* Edge / Offline status indicator */}
        <div className={`p-2.5 rounded-xs border flex items-center justify-between ${
          offlineSimulated 
            ? 'bg-[#1e1510] border-[#48281a] text-[#e8a36e]' 
            : 'bg-[#0f1712] border-[#1d3a27] text-emerald-400'
        }`}>
          <div className="flex items-center gap-2">
            {offlineSimulated ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{offlineSimulated ? 'LOCAL EDGE CACHE (OFFLINE QUEUE)' : 'DIRECT REGISTRY UPLINK (ONLINE)'}</span>
          </div>
          <button
            type="button"
            onClick={() => setOfflineSimulated(!offlineSimulated)}
            className="text-[10px] underline hover:opacity-80"
          >
            Switch to {offlineSimulated ? 'Online' : 'Offline'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[10px] text-[#78818f] uppercase block mb-1">Target Geographic Asset</label>
            <select
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
            >
              {places.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.scale.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-[#78818f] uppercase block mb-1">Steward Name</label>
              <input
                type="text"
                value={observerName}
                onChange={(e) => setObserverName(e.target.value)}
                required
                className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-[#78818f] uppercase block mb-1">Role / Affiliation</label>
              <input
                type="text"
                value={observerRole}
                onChange={(e) => setObserverRole(e.target.value)}
                required
                className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-[#78818f] uppercase block mb-1">Domain Type</label>
              <select
                value={observationType}
                onChange={(e) => setObservationType(e.target.value as any)}
                className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
              >
                <option value="hydrology">Hydrology / Water</option>
                <option value="canopy_health">Canopy & Forest</option>
                <option value="soil_moisture">Soil & Agriculture</option>
                <option value="crop_yield">Food & Harvest</option>
                <option value="infrastructure_damage">Infrastructure</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[#78818f] uppercase block mb-1">Metric Value / Sensor Probe</label>
              <input
                type="text"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                placeholder="e.g. 45 NTU, 1.4m depth"
                className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] text-[#78818f] uppercase block mb-1">Observation Summary & Ground Truth</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
              className="w-full p-2 bg-[#0c0d0e] border border-[#232932] rounded-xs text-[#f5f2eb] text-xs focus:border-[#c27847] outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#1d2228]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#1b1f24] text-[#8e96a2] rounded-xs hover:text-[#f5f2eb]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#c27847] text-[#0c0d0e] font-semibold uppercase rounded-xs hover:bg-[#d88c58]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Commit Observation to Ledger</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
