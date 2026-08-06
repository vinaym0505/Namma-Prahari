import React, { useEffect, useRef } from 'react';
import { ComplaintPIISafe } from '@shared/index';

interface ComplaintMapProps {
  complaints: ComplaintPIISafe[];
  onSelectComplaint?: (complaint: ComplaintPIISafe) => void;
  selectedComplaintId?: string;
}

export const ComplaintMap: React.FC<ComplaintMapProps> = ({
  complaints,
  onSelectComplaint,
  selectedComplaintId,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Dynamically import Leaflet for React client-side rendering
    import('leaflet').then((L) => {
      if (!leafletInstance.current && mapRef.current) {
        const map = L.map(mapRef.current).setView([12.9716, 77.5946], 12); // Bengaluru center

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        leafletInstance.current = map;
      }

      const map = leafletInstance.current;
      if (!map) return;

      // Clear existing markers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Render markers for complaints
      complaints.forEach((c) => {
        const color = c.severity === 'High' ? '#EF4444' : c.severity === 'Medium' ? '#F59E0B' : '#06B6D4';

        const customIcon = L.divIcon({
          className: 'custom-map-marker',
          html: `<div style="
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: ${color};
            border: 2px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: bold;
            font-size: 11px;
          ">${c.severity === 'High' ? '!' : '•'}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([c.lat, c.lng], { icon: customIcon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: Inter, sans-serif; padding: 4px;">
            <strong style="color: #0F172A; font-size: 13px;">${c.title}</strong><br/>
            <span style="color: #64748B; font-size: 11px;">${c.ward} · ${c.departmentName}</span><br/>
            <span style="display: inline-block; margin-top: 4px; padding: 2px 6px; border-radius: 4px; background: rgba(59,130,246,0.12); color: #3B82F6; font-size: 10px; font-weight: bold;">${c.status.toUpperCase()}</span>
          </div>
        `);

        if (onSelectComplaint) {
          marker.on('click', () => onSelectComplaint(c));
        }
      });
    });

    return () => {
      if (leafletInstance.current) {
        leafletInstance.current.remove();
        leafletInstance.current = null;
      }
    };
  }, [complaints, onSelectComplaint]);

  return (
    <div className="w-full h-full min-h-[480px] rounded-lg border border-border-subtle overflow-hidden relative">
      <div ref={mapRef} className="w-full h-full min-h-[480px]" />
    </div>
  );
};
