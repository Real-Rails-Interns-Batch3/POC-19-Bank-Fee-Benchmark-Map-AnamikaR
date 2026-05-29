"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  fees: any[];
};

export default function FeeChart({ fees }: Props) {

  return (
    <div className="h-[300px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart data={fees}>

          <XAxis dataKey="bank" stroke="#9CA3AF" />

          <YAxis stroke="#9CA3AF" />

          <Tooltip />

          <Bar
            dataKey="fee"
            fill="#38BDF8"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}