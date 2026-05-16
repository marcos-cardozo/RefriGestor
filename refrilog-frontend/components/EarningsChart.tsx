"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

interface EarningsChartProps {
  data: {
    month: string;
    total: number;
  }[];
}

export function EarningsChart({ data }: EarningsChartProps) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/40 p-4! shadow-xl backdrop-blur-xl">
      <h2 className="mb-4! text-lg font-bold text-zinc-800">Ganancias</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />

            <Tooltip />

            <Line type="monotone" dataKey="total" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
