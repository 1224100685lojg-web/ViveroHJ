"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { ArrowDownCircle, ArrowUpCircle, Boxes } from "lucide-react";

import { obtenerMovimientos } from "@/lib/inventario";

type Periodo =
  | "hoy"
  | "semana"
  | "mes"
  | "personalizado";

interface Props {
  periodo?: Periodo;
}

interface ChartData {
  fecha: string;
  entradas: number;
  salidas: number;
}

export default function SalesChart({
  periodo = "hoy",
}: Props) {
  const [data, setData] =
    useState<ChartData[]>([]);

  useEffect(() => {
    async function cargarDatos() {
      const {
        data: movimientos,
        error,
      } = await obtenerMovimientos();

      if (error || !movimientos) {
        console.error(error);
        return;
      }

      const ahora = new Date();
      const fechaLimite = new Date();

      switch (periodo) {
        case "hoy":
          fechaLimite.setHours(
            0,
            0,
            0,
            0
          );
          break;

        case "semana":
          fechaLimite.setDate(
            ahora.getDate() - 7
          );
          break;

        case "mes":
          fechaLimite.setDate(
            ahora.getDate() - 30
          );
          break;

        default:
          fechaLimite.setDate(
            ahora.getDate() - 365
          );
      }

      const resumen: Record<
        string,
        ChartData
      > = {};

      movimientos
        .filter((mov) => {
          return (
            new Date(mov.created_at) >=
            fechaLimite
          );
        })
        .forEach((mov) => {
          const fecha = new Date(
            mov.created_at
          );

          const clave =
            fecha.toLocaleDateString(
              "es-MX",
              {
                day: "2-digit",
                month: "short",
              }
            );

          if (!resumen[clave]) {
            resumen[clave] = {
              fecha: clave,
              entradas: 0,
              salidas: 0,
            };
          }

          if (mov.tipo === "ENTRADA") {
            resumen[clave].entradas +=
              mov.cantidad;
          }

          if (mov.tipo === "SALIDA") {
            resumen[clave].salidas +=
              mov.cantidad;
          }
        });

      setData(
        Object.values(resumen)
      );
    }

    cargarDatos();
  }, [periodo]);

  const entradas = useMemo(
    () =>
      data.reduce(
        (a, b) => a + b.entradas,
        0
      ),
    [data]
  );

  const salidas = useMemo(
    () =>
      data.reduce(
        (a, b) => a + b.salidas,
        0
      ),
    [data]
  );

  const balance =
    entradas - salidas;

  return (
    <div className="space-y-6">

      {/* KPIs */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-[#274127] bg-[#132113] p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-green-500/15 p-2">

              <ArrowUpCircle
                size={18}
                className="text-green-400"
              />

            </div>

            <div>

              <p className="text-xs text-white/50">
                Entradas
              </p>

              <h3 className="text-2xl font-bold text-white">
                {entradas}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-[#274127] bg-[#132113] p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-orange-500/15 p-2">

              <ArrowDownCircle
                size={18}
                className="text-orange-400"
              />

            </div>

            <div>

              <p className="text-xs text-white/50">
                Salidas
              </p>

              <h3 className="text-2xl font-bold text-white">
                {salidas}
              </h3>

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-[#274127] bg-[#132113] p-4">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-blue-500/15 p-2">

              <Boxes
                size={18}
                className="text-blue-400"
              />

            </div>

            <div>

              <p className="text-xs text-white/50">
                Balance
              </p>

              <h3
                className={`text-2xl font-bold ${
                  balance >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {balance}
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* GRÁFICA */}

      <div className="h-[340px]">

        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-white/40">
            No existen movimientos para este periodo.
          </div>
        ) : (
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              barGap={8}
              barCategoryGap="18%"
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(255,255,255,.05)"
              />

              <XAxis
                dataKey="fecha"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "rgba(255,255,255,.55)",
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill:
                    "rgba(255,255,255,.55)",
                  fontSize: 12,
                }}
              />

              <Tooltip
                cursor={{
                  fill:
                    "rgba(255,255,255,.03)",
                }}
                contentStyle={{
                  background:
                    "#152415",
                  border:
                    "1px solid rgba(255,255,255,.08)",
                  borderRadius: 12,
                  color: "#fff",
                }}
                formatter={(value, name) => [
                  `${value} pzas`,
                  name,
                ]}
              />

              <Legend
                iconType="circle"
                verticalAlign="bottom"
                wrapperStyle={{
                  color: "#fff",
                  fontSize: 12,
                  paddingTop: 12,
                }}
              />

              <Bar
                dataKey="entradas"
                name="Entradas"
                fill="#6DB56D"
                radius={[8, 8, 0, 0]}
                animationDuration={700}
              />

              <Bar
                dataKey="salidas"
                name="Salidas"
                fill="#F2A65A"
                radius={[8, 8, 0, 0]}
                animationDuration={700}
              />

            </BarChart>

          </ResponsiveContainer>
        )}

      </div>

    </div>
  );
}