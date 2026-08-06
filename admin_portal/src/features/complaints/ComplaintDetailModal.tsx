import React, { useState } from 'react';
import { X, MapPin, Building2, UserCheck, ShieldAlert, Clock, AlertTriangle, Eye, ZoomIn } from 'lucide-react';
import { ComplaintPIISafe } from '@shared/index';
import { STATUS_CONFIG, SEVERITY_CONFIG } from '@shared/tokens';

interface ComplaintDetailModalProps {
  complaint: ComplaintPIISafe;
  onClose: () => void;
}

export const ComplaintDetailModal: React.FC<ComplaintDetailModalProps> = ({ complaint, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const statusInfo = STATUS_CONFIG[complaint.status] || STATUS_CONFIG.submitted;
  const severityInfo = SEVERITY_CONFIG[complaint.severity] || SEVERITY_CONFIG.Medium;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-brand">{complaint.complaintId}</span>
            <span
              className="status-chip"
              style={{ backgroundColor: statusInfo.bg, color: statusInfo.text, borderColor: `${statusInfo.text}33` }}
            >
              {statusInfo.label}
            </span>
          </div>
          <button onClick={onClose} className="p-1 rounded text-txt-muted hover:text-txt-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title */}
        <h2 className="text-lg font-heading font-bold text-txt-primary">{complaint.title}</h2>

        {/* Zoomable Photo Container */}
        <div className="relative group rounded-lg overflow-hidden border border-border-subtle bg-surface-primary">
          <img
            src={complaint.imageUrl}
            alt={complaint.title}
            className={`w-full object-cover transition-transform duration-300 ${isZoomed ? 'h-[400px] object-contain' : 'h-[220px]'}`}
          />
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute bottom-3 right-3 p-2 rounded-md bg-surface-elevated/80 backdrop-blur text-white text-xs flex items-center gap-1 hover:bg-surface-elevated"
          >
            <ZoomIn className="w-4 h-4" />
            <span>{isZoomed ? 'Reset View' : 'Fullscreen Zoom'}</span>
          </button>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-surface-tertiary border border-border-subtle text-xs">
          <div>
            <span className="text-txt-muted block uppercase text-[10px] font-bold">Category</span>
            <span className="font-semibold text-txt-primary">{complaint.categoryName}</span>
          </div>
          <div>
            <span className="text-txt-muted block uppercase text-[10px] font-bold">Department</span>
            <span className="font-semibold text-txt-primary">{complaint.departmentName}</span>
          </div>
          <div>
            <span className="text-txt-muted block uppercase text-[10px] font-bold">Severity</span>
            <span className="font-bold" style={{ color: severityInfo.color }}>
              {complaint.severity}
            </span>
          </div>
          <div>
            <span className="text-txt-muted block uppercase text-[10px] font-bold">Priority Score</span>
            <span className="font-bold text-brand">{complaint.priorityScore} / 100</span>
          </div>
        </div>

        {/* Location & Ward */}
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-surface-tertiary border border-border-subtle text-xs">
          <div className="flex items-center gap-2 text-txt-primary font-bold">
            <MapPin className="w-4 h-4 text-brand" />
            <span>{complaint.ward}</span>
          </div>
          <p className="text-txt-secondary">{complaint.address}</p>
          <div className="flex items-center gap-4 text-txt-muted text-[11px] mt-1 pt-2 border-t border-border-subtle">
            <span>Assembly: <strong>{complaint.assemblyConstituency}</strong></span>
            <span>Parliament: <strong>{complaint.parliamentaryConstituency}</strong></span>
          </div>
        </div>

        {/* Responsible Representatives Panel */}
        {complaint.representative && (
          <div className="p-4 rounded-lg bg-brand-muted border border-brand/20 text-xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-brand font-bold">
              <UserCheck className="w-4 h-4" />
              <span>Responsible Representatives ({complaint.representative.constituencyName})</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="p-2 rounded bg-surface-secondary border border-border-subtle">
                <span className="text-txt-muted text-[10px] block">MLA</span>
                <span className="font-semibold text-txt-primary">{complaint.representative.mlaName}</span>
                <div className="text-txt-muted text-[11px] mt-0.5">{complaint.representative.mlaPhone}</div>
              </div>
              <div className="p-2 rounded bg-surface-secondary border border-border-subtle">
                <span className="text-txt-muted text-[10px] block">MP</span>
                <span className="font-semibold text-txt-primary">{complaint.representative.mpName}</span>
                <div className="text-txt-muted text-[11px] mt-0.5">{complaint.representative.mpPhone}</div>
              </div>
            </div>
          </div>
        )}

        {/* Description & AI Summary */}
        <div className="flex flex-col gap-2 text-xs">
          <span className="text-txt-muted uppercase text-[10px] font-bold">Issue Description</span>
          <p className="text-txt-primary leading-relaxed p-3 rounded bg-surface-primary border border-border-subtle">
            {complaint.description}
          </p>
        </div>

        {/* Footer Privacy Note */}
        <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between text-[11px] text-txt-muted">
          <span className="flex items-center gap-1 text-state-cyan font-medium">
            <ShieldAlert className="w-3.5 h-3.5" />
            Citizen PII Excluded at Database Layer
          </span>
          <button onClick={onClose} className="btn btn-ghost text-xs">
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
