"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { tokenomics } from "@/data/tokenomics";

const RADIAN = Math.PI / 180;

/** Allocations run into the billions, so scale the unit instead of fixing it at millions. */
function formatTokens(n: number) {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "")}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  return n.toLocaleString();
}

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percentage,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percentage < 6) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${percentage.toFixed(1)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-coin-surface border border-emerald/20 rounded-xl p-4 shadow-glass text-sm">
        <p className="font-semibold text-white mb-1">{d.label}</p>
        <p className="text-emerald-light">{d.percentage.toFixed(2)}%</p>
        <p className="text-white/50">{formatTokens(d.tokens)} MMC</p>
      </div>
    );
  }
  return null;
};

export function TokenomicsChart() {
  return (
    <div className="w-full">
      {/* Chart */}
      <div className="h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={tokenomics.breakdown}
              cx="50%"
              cy="50%"
              innerRadius="52%"
              outerRadius="78%"
              paddingAngle={2}
              dataKey="percentage"
              labelLine={false}
              label={renderCustomLabel}
            >
              {tokenomics.breakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Centre label overlay note */}
      <div className="text-center -mt-4 mb-6">
        <p className="text-white/30 text-xs">Hover segments for details</p>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {tokenomics.breakdown.map((entry) => (
          <div key={entry.label} className="flex items-start gap-3 p-3 rounded-xl bg-white/2 border border-white/5">
            <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: entry.color }} />
            <div className="min-w-0">
              <p className="text-white/80 text-sm font-medium truncate">{entry.label}</p>
              <p className="text-white/40 text-xs">
                {entry.percentage.toFixed(2)}% · {formatTokens(entry.tokens)} MMC
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
