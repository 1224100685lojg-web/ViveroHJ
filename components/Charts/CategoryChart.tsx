"use client";

import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";

import { supabase } from "@/lib/supabase";

type EstadoInventario = {
  name: string;
  value: number;
  color: string;
};

export default function CategoryChart() {
  const [data, setData] = useState<EstadoInventario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarEstadoInventario() {
      const { data: productos, error } = await supabase
        .from("productos")
        .select(`
          stock,
          stock_minimo
        `)
        .eq("activo", true);

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      let disponibles = 0;
      let stockBajo = 0;
      let agotados = 0;

      productos?.forEach((producto: any) => {
        const stock = producto.stock ?? 0;
        const minimo = producto.stock_minimo ?? 0;

        if (stock === 0) {
          agotados++;
        } else if (stock <= minimo) {
          stockBajo++;
        } else {
          disponibles++;
        }
      });

      setData([
        {
          name: "Disponibles",
          value: disponibles,
          color: "#4CAF50",
        },
        {
          name: "Stock bajo",
          value: stockBajo,
          color: "#F9A825",
        },
        {
          name: "Agotados",
          value: agotados,
          color: "#E57373",
        },
      ]);

      setLoading(false);
    }

    cargarEstadoInventario();
  }, []);

  const totalProductos = data.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <div
      className="
        bg-[#0f1a0f]
        border border-white/5
        rounded-xl
        p-5
        h-full
      "
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#e8f4e8]">
          Estado del inventario
        </h3>

        <p className="mt-1 text-xs text-white/40">
          Disponibilidad actual de productos
        </p>
      </div>

      <div className="h-[240px]">
        {loading ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-white/40
            "
          >
            Cargando...
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                animationDuration={900}
                animationBegin={150}
              >
                <Label
                  value={totalProductos}
                  position="center"
                  fill="#ffffff"
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                  }}
                />

                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    stroke="rgba(255,255,255,.12)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `${value} productos`,
                  "Cantidad",
                ]}
                contentStyle={{
                  background: "#182518",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div
        className="
          mt-5
          space-y-2
        "
      >
        {data.map((item) => (
          <div
            key={item.name}
            className="
              flex
              items-center
              justify-between
              text-xs
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="
                  h-3
                  w-3
                  rounded-full
                "
                style={{
                  background: item.color,
                }}
              />

              <span className="text-white/70">
                {item.name}
              </span>
            </div>

            <span className="font-medium text-white/50">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}