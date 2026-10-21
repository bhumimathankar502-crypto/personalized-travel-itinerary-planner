import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Trip } from '../types';
import { MapPin, Navigation, Bus } from 'lucide-react';
import { formatINR } from '../utils/currency';

interface MapRouteViewerProps {
  trip: Trip;
}

export const MapRouteViewer: React.FC<MapRouteViewerProps> = ({ trip }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const currentDay = trip.days[selectedDayIdx] || trip.days[0];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default to trip coords or Indore default
      const centerLat = trip.coordinates?.lat || 22.7196;
      const centerLng = trip.coordinates?.lng || 75.8577;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 13,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers and route lines when selectedDayIdx or trip changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current || !currentDay) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    const points: [number, number][] = [];

    // Fallback base coordinates if individual activity coordinates are missing
    const baseLat = trip.coordinates?.lat || 22.7196;
    const baseLng = trip.coordinates?.lng || 75.8577;

    currentDay.activities.forEach((act, idx) => {
      const actLat = act.lat || (baseLat + (idx === 0 ? 0.012 : idx === 1 ? -0.006 : -0.015));
      const actLng = act.lng || (baseLng + (idx === 0 ? 0.008 : idx === 1 ? 0.014 : -0.010));
      const point: [number, number] = [actLat, actLng];
      points.push(point);

      // Create high-contrast custom HTML marker icon
      const slotColor = idx === 0 ? '#d97706' : idx === 1 ? '#ea580c' : '#4f46e5';
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background-color: ${slotColor};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 13px;
          ">
            ${idx + 1}
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18]
      });

      const popupContent = `
        <div style="font-family: inherit; padding: 4px; min-width: 170px;">
          <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">
            ${act.time_slot} • ${act.time_24h}
          </div>
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 2px;">
            ${act.title}
          </div>
          <div style="font-size: 11px; color: #475569; margin-top: 4px;">
            📍 ${act.location_name}
          </div>
          <div style="font-size: 12px; font-weight: 700; color: #059669; margin-top: 6px;">
            Est: ${formatINR(act.estimated_cost_inr)}
          </div>
          ${act.transit_info ? `<div style="font-size: 10px; color: #64748b; margin-top: 4px; background: #f1f5f9; padding: 3px 6px; border-radius: 4px;">🚌 ${act.transit_info}</div>` : ''}
        </div>
      `;

      L.marker(point, { icon: customIcon })
        .bindPopup(popupContent)
        .addTo(layerGroup);
    });

    // Draw route connecting activities
    if (points.length > 1) {
      L.polyline(points, {
        color: '#059669',
        weight: 4,
        opacity: 0.8,
        dashArray: '8, 8'
      }).addTo(layerGroup);

      // Fit bounds with comfortable padding
      const bounds = L.latLngBounds(points);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    } else if (points.length === 1) {
      mapInstanceRef.current.setView(points[0], 13);
    }
  }, [selectedDayIdx, trip, currentDay]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-5 sm:p-6">
      {/* Header & Day Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-600" />
            <span>Interactive Route & Day Stops</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic path for {trip.destination} stops (Morning → Afternoon → Evening)
          </p>
        </div>

        {/* Day Switcher Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {trip.days.map((d, idx) => (
            <button
              key={d.id || idx}
              onClick={() => setSelectedDayIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedDayIdx === idx
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Day {d.day_number}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative rounded-xl overflow-hidden border border-slate-200 h-80 sm:h-96 z-0">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Stops legend bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
        {currentDay?.activities.map((act, i) => (
          <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-white text-[10px] flex-shrink-0 ${
              i === 0 ? 'bg-amber-600' : i === 1 ? 'bg-orange-600' : 'bg-indigo-600'
            }`}>
              {i + 1}
            </span>
            <div className="truncate">
              <span className="font-semibold text-slate-900 block truncate">{act.title}</span>
              <span className="text-[10px] text-slate-500 truncate block">{act.time_24h} • {act.location_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
