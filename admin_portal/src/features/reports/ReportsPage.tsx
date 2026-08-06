import React from 'react';
import { Download, FileSpreadsheet, FileText, CheckCircle2 } from 'lucide-react';
import { MOCK_COMPLAINTS } from '@shared/mockData';
import { exportComplaintsToCSV } from './exportService';

export const ReportsPage: React.FC = () => {
  const handleExportCSV = () => {
    exportComplaintsToCSV(MOCK_COMPLAINTS);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-xl font-heading font-extrabold text-txt-primary">Executive Reports & Export</h2>
        <p className="text-xs text-txt-secondary">
          Generate and download monthly executive civic compliance reports in standard CSV formats.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="chart-panel flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-brand-muted text-brand flex items-center justify-center font-bold">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-txt-primary m-0">Monthly Complaint Audit Dataset</h3>
              <span className="text-xs text-txt-muted">Complete PII-stripped complaint database dump</span>
            </div>
          </div>
          <p className="text-xs text-txt-secondary">
            Includes all complaint records, SLA status, ward mapping, priority scores, and department resolution timestamps.
          </p>
          <button onClick={handleExportCSV} className="btn btn-primary text-xs w-fit">
            <Download className="w-4 h-4" />
            Download Executive CSV Report
          </button>
        </div>

        <div className="chart-panel flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-state-green/10 text-state-green flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-txt-primary m-0">Free-Tier Report Generator</h3>
              <span className="text-xs text-txt-muted">Client-side instant stream export</span>
            </div>
          </div>
          <p className="text-xs text-txt-secondary">
            Generated using browser-native Blob streams. Zero third-party paid API dependencies required.
          </p>
        </div>
      </div>
    </div>
  );
};
