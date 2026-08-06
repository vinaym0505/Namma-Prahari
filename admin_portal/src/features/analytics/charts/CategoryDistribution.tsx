import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CategoryDistributionProps {
  data: { name: string; value: number }[];
}

const COLORS = ['#3B82F6', '#EF4444', '#F59E0B', '#06B6D4', '#8B5CF6', '#22C55E'];

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ data }) => {
  return (
    <div className="chart-panel">
      <h3>Category Distribution</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#161B26',
                borderColor: 'rgba(255,255,255,0.12)',
                borderRadius: '8px',
                color: '#F1F5F9',
                fontSize: '12px',
              }}
            />
            <Legend
              formatter={(value) => <span style={{ color: '#94A3B8', fontSize: '11px' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
