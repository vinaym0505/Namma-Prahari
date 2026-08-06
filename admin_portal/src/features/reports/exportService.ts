import { ComplaintPIISafe } from '@shared/index';

/// Client-Side Executive Monthly Report Exporter (Free Tier Tooling).
/// Generates CSV and text report blobs without external paid APIs.

export function exportComplaintsToCSV(complaints: ComplaintPIISafe[]): void {
  const headers = [
    'Complaint ID',
    'Title',
    'Category',
    'Department',
    'Severity',
    'Priority Score',
    'Status',
    'Ward',
    'Assembly Constituency',
    'Parliamentary Constituency',
    'Latitude',
    'Longitude',
    'Address',
    'Created At',
  ];

  const rows = complaints.map((c) => [
    c.complaintId,
    `"${c.title.replace(/"/g, '""')}"`,
    `"${c.categoryName}"`,
    `"${c.departmentName}"`,
    c.severity,
    c.priorityScore,
    c.status,
    `"${c.ward}"`,
    `"${c.assemblyConstituency}"`,
    `"${c.parliamentaryConstituency}"`,
    c.lat,
    c.lng,
    `"${c.address.replace(/"/g, '""')}"`,
    c.createdAt,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Namma_Prahari_Executive_Report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
