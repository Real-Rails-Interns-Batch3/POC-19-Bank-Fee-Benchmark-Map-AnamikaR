"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

// Create custom high-tech pulsing marker icons
const createCustomIcon = (bank: string, isAboveAverage: boolean) => {
  const colorClass = isAboveAverage ? "bg-[#818cf8]" : "bg-[#38bdf8]";
  const pulseClass = isAboveAverage ? "bg-[#818cf8]/40" : "bg-[#38bdf8]/40";
  const borderClass = isAboveAverage ? "border-[#818cf8]/80" : "border-[#38bdf8]/80";
  
  return L.divIcon({
    className: "custom-pulsing-node",
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <span class="animate-ping absolute inline-flex h-5 w-5 rounded-full ${pulseClass} opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3.5 w-3.5 ${colorClass} border-2 ${borderClass} shadow-lg shadow-[#030712]"></span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -10],
  });
};

type Props = {
  fees: any[];
};

// Component to dynamically fit bounds of filtered markers
function ChangeView({ markers }: { markers: any[] }) {
  const map = useMap();
  
  useEffect(() => {
    if (markers.length === 0) return;
    
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
  }, [markers, map]);
  
  return null;
}

export default function MapComponent({ fees }: Props) {
  const markerString = JSON.stringify(
    fees.map((f) => `${f.bank}-${f.lat}-${f.lng}`)
  );

  return (
    <div className="w-full h-full relative" style={{ height: "100vh" }}>
      <MapContainer
        key={markerString}
        center={[20.5937, 78.9629]} // Centered on India
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={false} // Disable default zoom controls to custom style or place them
        style={{
          height: "100%",
          width: "100%",
          background: "#030712",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <ChangeView markers={fees} />

        {fees.map((item, index) => {
          const isAboveAverage = item.fee > item.regional_average;
          
          return (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={createCustomIcon(item.bank, isAboveAverage)}
            >
              <Popup>
                <div className="p-1 min-w-[160px] font-sans">
                  <div className="flex justify-between items-center border-b border-[#1f2937]/50 pb-1.5 mb-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {item.bank}
                    </h3>
                    <span className="text-[10px] font-mono bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20 px-1.5 py-0.5 rounded font-bold">
                      ₹{item.fee}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-medium">Node: {item.city}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase">Type: {item.fee_type}</p>
                  <div className="mt-2.5 pt-2 border-t border-[#1f2937]/30 flex justify-between items-center">
                    <span className="text-[9px] font-mono text-gray-500 uppercase">DEVIATION</span>
                    <span className={`text-[10px] font-bold ${isAboveAverage ? "text-indigo-400" : "text-emerald-400"}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}