import { useMemo } from 'react';
import { ComplaintPIISafe } from '@shared/index';

export function useAnalytics(complaints: ComplaintPIISafe[]) {
  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    complaints.forEach((c) => {
      counts[c.categoryName] = (counts[c.categoryName] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const departmentData = useMemo(() => {
    const depts: Record<string, { total: number; resolved: number; active: number }> = {};
    complaints.forEach((c) => {
      if (!depts[c.departmentName]) {
        depts[c.departmentName] = { total: 0, resolved: 0, active: 0 };
      }
      depts[c.departmentName].total += 1;
      if (c.status === 'resolved') {
        depts[c.departmentName].resolved += 1;
      } else {
        depts[c.departmentName].active += 1;
      }
    });
    return Object.entries(depts).map(([name, stats]) => ({
      name: name.split(' ')[0], // Short name
      fullName: name,
      ...stats,
    }));
  }, [complaints]);

  const wardData = useMemo(() => {
    const wards: Record<string, number> = {};
    complaints.forEach((c) => {
      wards[c.ward] = (wards[c.ward] || 0) + 1;
    });
    return Object.entries(wards).map(([ward, count]) => ({ ward, count }));
  }, [complaints]);

  const trendData = useMemo(() => {
    return [
      { date: 'Aug 1', submitted: 42, resolved: 38, avgHours: 28 },
      { date: 'Aug 2', submitted: 56, resolved: 48, avgHours: 24 },
      { date: 'Aug 3', submitted: 38, resolved: 45, avgHours: 22 },
      { date: 'Aug 4', submitted: 64, resolved: 52, avgHours: 20 },
      { date: 'Aug 5', submitted: 78, resolved: 60, avgHours: 19 },
      { date: 'Aug 6', submitted: 52, resolved: 41, avgHours: 18 },
    ];
  }, []);

  return { categoryData, departmentData, wardData, trendData };
}
