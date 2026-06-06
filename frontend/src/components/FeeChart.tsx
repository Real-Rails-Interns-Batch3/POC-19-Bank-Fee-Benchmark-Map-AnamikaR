"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  fees: any[];
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-3 bg-[#0b1117]/95 border border-[#38bdf8]/40 backdrop-blur-md rounded-lg shadow-xl text-xs font-mono">
        <p className="font-bold text-white uppercase tracking-wider">{data.bank}</p>
        <p className="text-gray-400 mt-0.5">{data.city} Node</p>
        <div className="mt-2 pt-1.5 border-t border-[#1f2937]/80">
          <p className="text-[#38bdf8] font-bold">Fee: ₹{data.fee}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Type: {data.fee_type}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function FeeChart({ fees }: Props) {
  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={fees} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="feeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
          <XAxis 
            dataKey="bank" 
            stroke="#9ca3af" 
            fontSize={10} 
            fontFamily="monospace"
            tickLine={false} 
            axisLine={{ stroke: '#1f2937' }}
          />
          <YAxis 
            stroke="#9ca3af" 
            fontSize={10} 
            fontFamily="monospace"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(31, 41, 55, 0.2)' }} />
          <Bar
            dataKey="fee"
            fill="url(#feeGrad)"
            radius={[4, 4, 0, 0]}
            maxBarSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}