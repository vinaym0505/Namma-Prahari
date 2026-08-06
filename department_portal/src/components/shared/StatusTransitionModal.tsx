import React, { useState } from 'react';
import { X, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ComplaintPIISafe } from '@shared/index';
import { STATUS_CONFIG } from '@shared/tokens';

interface StatusTransitionModalProps {
  complaint: ComplaintPIISafe;
  onClose: () => void;
  onConfirmTransition: (complaintId: string, newStatus: string, note: string) => void;
}

const ALLOWED_TRANSITIONS: Record<string, { nextStatus: string; label: string }[]> = {
  submitted: [{ nextStatus: 'assigned', label: 'Assign to Field Officer' }],
  pending_ai_review: [{ nextStatus: 'assigned', label: 'Assign to Field Officer' }],
  assigned: [{ nextStatus: 'in_progress', label: 'Mark Work In Progress' }],
  in_progress: [{ nextStatus: 'resolved', label: 'Mark Complaint Resolved' }],
  escalated: [{ nextStatus: 'in_progress', label: 'Take Action & Resume Work' }],
};

export const StatusTransitionModal: React.FC<StatusTransitionModalProps> = ({
  complaint,
  onClose,
  onConfirmTransition,
}) => {
  const availableNext = ALLOWED_TRANSITIONS[complaint.status] || [];
  const [selectedNextStatus, setSelectedNextStatus] = useState<string>(
    availableNext[0]?.nextStatus || 'resolved'
  );
  const [note, setNote] = useState<string>('');

  const currentStatusInfo = STATUS_CONFIG[complaint.status] || STATUS_CONFIG.submitted;
  const targetStatusInfo = STATUS_CONFIG[selectedNextStatus] || STATUS_CONFIG.resolved;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    onConfirmTransition(complaint.complaintId, selectedNextStatus, note.trim());
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-brand">{complaint.complaintId}</span>
            <span className="text-xs text-txt-muted">Status Transition</span>
          </div>
          <button onClick={onClose} className="p-1 rounded text-txt-muted hover:text-txt-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Transition Visual Indicator */}
        <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-surface-primary border border-border-subtle my-2">
          <span
            className="status-chip"
            style={{ backgroundColor: currentStatusInfo.bg, color: currentStatusInfo.text }}
          >
            {currentStatusInfo.label}
          </span>
          <ArrowRight className="w-4 h-4 text-txt-muted" />
          <span
            className="status-chip"
            style={{ backgroundColor: targetStatusInfo.bg, color: targetStatusInfo.text }}
          >
            {targetStatusInfo.label}
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleConfirm} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-txt-primary uppercase block mb-1">
              Select Target Status
            </label>
            <select
              value={selectedNextStatus}
              onChange={(e) => setSelectedNextStatus(e.target.value)}
              className="input text-xs"
            >
              {availableNext.map((item) => (
                <option key={item.nextStatus} value={item.nextStatus}>
                  {item.label} ({item.nextStatus.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-txt-primary uppercase block mb-1">
              Officer Audit Note (Mandatory)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              rows={3}
              placeholder="Enter official action details, crew assigned, or resolution summary..."
              className="input text-xs"
            />
          </div>

          {/* Statement on Web Rules */}
          <div className="flex items-center gap-2 text-[11px] text-txt-muted p-2 rounded bg-surface-tertiary">
            <ShieldCheck className="w-4 h-4 text-state-green" />
            <span>Workflow status change logged to complaint_history audit trail.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
            <button type="button" onClick={onClose} className="btn btn-ghost text-xs">
              Cancel
            </button>
            <button type="submit" disabled={!note.trim()} className="btn btn-primary text-xs">
              Confirm Status Transition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
