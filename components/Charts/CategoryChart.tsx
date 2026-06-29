"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Plantas",
    value: 42,
    color: "#3a7a3a",
  },

  {
    name: "Insumos",
    value: 26,
    color: "#ef9f27",
  },

  {
    name: "Flores",
    value: 18,
    color: "#d85a30",
  },

  {
    name: "Otros",
    value: 14,
    color: "#444441",
  },
];

export default function CategoryChart() {
  return (
    <div
      className="
        bg-[#0f1a0f]
        border border-white/5
        rounded-xl
        p-4
      "
    >

      <h3 className="text-[12px] text-[#dce8dc] font-medium mb-4">
        Categorías
      </h3>

      <div className="h-[180px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={3}
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* LEGEND */}
      <div className="grid grid-cols-2 gap-2 mt-2">

        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-[10px] text-white/40"
          >

            <div
              className="w-2 h-2 rounded-sm"
              style={{
                background: item.color,
              }}
            />

            {item.name} {item.value}%

          </div>
        ))}

      </div>

    </div>
  );
}