import React from 'react';

interface WardHeatmapProps {
  data: { ward: string; count: number }[];
}

export const WardHeatmap: React.FC<WardHeatmapProps> = ({ data }) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="chart-panel">
      <h3>Ward Issue Density Breakdown</h3>
      <div className="flex flex-col gap-3 mt-3">
        {data.map((item) => {
          const percentage = Math.round((item.count / maxCount) * 100);
          return (
            <div key={item.ward} className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-txt-primary">{item.ward}</span>
                <span className="text-brand font-bold">{item.count} complaints</span>
              </div>
              <div className="w-full h-2 bg-surface-primary rounded-full overflow-hidden border border-border-subtle">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: percentage > 75 ? '#EF4444' : percentage > 40 ? '#F59E0B' : '#3B82F6',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
