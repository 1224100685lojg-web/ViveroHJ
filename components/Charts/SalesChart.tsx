"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Suculentas",
    ventas: 84,
  },

  {
    name: "Cactus",
    ventas: 62,
  },

  {
    name: "Rosas",
    ventas: 54,
  },

  {
    name: "Fertiliz.",
    ventas: 40,
  },

  {
    name: "Semillas",
    ventas: 35,
  },
];

export default function SalesChart() {
  return (
    <div
      className="
        bg-[#0f1a0f]
        border border-white/5
        rounded-xl
        p-4
        mt-4
      "
    >

      <div className="mb-4">

        <p className="text-[12px] text-[#dce8dc] font-medium">
          Productos más vendidos
        </p>

        <p className="text-[10px] text-white/30 mt-1">
          Mayo 2026
        </p>

      </div>

      <div className="h-[220px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data} layout="vertical">

            <XAxis
              type="number"
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              dataKey="name"
              type="category"
              tick={{
                fill: "rgba(255,255,255,0.5)",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#162316",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "10px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="ventas"
              fill="#3a7a3a"
              radius={[0, 6, 6, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}