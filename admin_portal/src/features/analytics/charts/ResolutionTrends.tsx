import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ResolutionTrendsProps {
  data: { date: string; submitted: number; resolved: number; avgHours: number }[];
}

export const ResolutionTrends: React.FC<ResolutionTrendsProps> = ({ data }) => {
  return (
    <div className="chart-panel">
      <h3>Average Resolution Time Trend (Hours)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAvgHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} unit="h" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B26',
                borderColor: 'rgba(255,255,255,0.12)',
                borderRadius: '8px',
                color: '#F1F5F9',
                fontSize: '12px',
              }}
            />
            <Area type="monotone" dataKey="avgHours" stroke="#3B82F6" fillOpacity={1} fill="url(#colorAvgHours)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
