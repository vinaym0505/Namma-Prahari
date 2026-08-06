import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DepartmentPerformanceProps {
  data: { name: string; fullName: string; total: number; resolved: number; active: number }[];
}

export const DepartmentPerformance: React.FC<DepartmentPerformanceProps> = ({ data }) => {
  return (
    <div className="chart-panel">
      <h3>Department Performance & Workload</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B26',
                borderColor: 'rgba(255,255,255,0.12)',
                borderRadius: '8px',
                color: '#F1F5F9',
                fontSize: '12px',
              }}
            />
            <Legend formatter={(value) => <span style={{ color: '#94A3B8', fontSize: '11px' }}>{value}</span>} />
            <Bar dataKey="resolved" name="Resolved" fill="#22C55E" radius={[4, 4, 0, 0]} />
            <Bar dataKey="active" name="Active Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
