import React from 'react';
import { ComplaintPIISafe } from '@shared/index';
import { MOCK_COMPLAINTS } from '@shared/mockData';
import { useAnalytics } from './useAnalytics';
import { CategoryDistribution } from './charts/CategoryDistribution';
import { DepartmentPerformance } from './charts/DepartmentPerformance';
import { ResolutionTrends } from './charts/ResolutionTrends';
import { WardHeatmap } from './charts/WardHeatmap';

export const AnalyticsPage: React.FC = () => {
  const complaints: ComplaintPIISafe[] = MOCK_COMPLAINTS;
  const { categoryData, departmentData, wardData, trendData } = useAnalytics(complaints);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="text-xl font-heading font-extrabold text-txt-primary">City Command Analytics</h2>
        <p className="text-xs text-txt-secondary">
          Real-time aggregated intelligence on category distribution, ward density, and department SLA trends.
        </p>
      </div>

      {/* Grid of bespoke charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentPerformance data={departmentData} />
        <CategoryDistribution data={categoryData} />
        <ResolutionTrends data={trendData} />
        <WardHeatmap data={wardData} />
      </div>
    </div>
  );
};
