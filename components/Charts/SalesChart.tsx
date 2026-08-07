"use client";

import { useEffect, useMemo, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { TrendingUp } from "lucide-react";

import { obtenerVentas } from "@/lib/ventas";

type Periodo =
  | "hoy"
  | "semana"
  | "mes"
  | "personalizado";

interface Props {
  periodo?: Periodo;
  fechaInicio?: string;
  fechaFin?: string;
}

interface Venta {
  id: number;
  fecha: string;
  total: number;
  subtotal: number;
}

interface ChartData {
  fecha: string;
  ventas: number;
  total: number;
}

export default function SalesChart({
  periodo = "hoy",
  fechaInicio,
  fechaFin,
}: Props) {
  const [data, setData] =
    useState<ChartData[]>([]);

  const [loading, setLoading] =
    useState(true);

useEffect(() => {

  cargarVentas();

}, [
  periodo,
  fechaInicio,
  fechaFin
]);

  async function cargarVentas() {
    try {
      setLoading(true);

      const ventas =
        await obtenerVentas();

      const ahora = new Date();

let fechaLimite =
  new Date();


let fechaFinal =
  new Date();



if(
  periodo === "personalizado"
  &&
  fechaInicio
  &&
  fechaFin
){

  fechaLimite =
    new Date(fechaInicio);


  fechaFinal =
    new Date(fechaFin);


  fechaFinal.setHours(
    23,
    59,
    59,
    999
  );

}
else {

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
        fechaLimite.getDate() - 7
      );

      break;


    case "mes":

      fechaLimite.setDate(
        fechaLimite.getDate() - 30
      );

      break;


    default:

      fechaLimite.setDate(
        fechaLimite.getDate() - 365
      );

  }

}

const filtradas =
  ventas.filter((venta: Venta) => {

    const fechaVenta =
      new Date(venta.fecha);


    return (
      fechaVenta >= fechaLimite &&
      fechaVenta <= fechaFinal
    );

  });

      const resumen: Record<
        string,
        ChartData
      > = {};

      filtradas.forEach(
        (venta: Venta) => {
          const fecha =
            new Date(venta.fecha);

          let clave = "";

          if (periodo === "hoy") {
            clave =
              fecha.toLocaleTimeString(
                "es-MX",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );
          } else {
            clave =
              fecha.toLocaleDateString(
                "es-MX",
                {
                  day: "2-digit",
                  month: "short",
                }
              );
          }

          if (!resumen[clave]) {
            resumen[clave] = {
              fecha: clave,
              ventas: 0,
              total: 0,
            };
          }

          resumen[clave].ventas++;

          resumen[clave].total +=
            Number(venta.total);
        }
      );

      setData(
        Object.values(resumen)
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }




  if (loading) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-2xl border border-[#274127] bg-[#162616]">
        <p className="text-sm text-white/50">
          Cargando ventas...
        </p>
      </div>
    );
  }
  if (!data.length) {
    const nombresPeriodo = {
    hoy: "hoy",
    semana: "esta semana",
    mes: "este mes",
    personalizado: "el periodo seleccionado",
};
  return (
    
    <div className="space-y-6">

      {/* KPIs vacíos */}

    


      <div
        className="
          flex
          h-[420px]
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-[#274127]
          bg-[#162616]
          text-center
        "
      >

        <TrendingUp
          size={40}
          className="mb-4 text-[#6db56d]"
        />

        <h3
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          No se encontraron ventas para este periodo
        </h3>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            text-white/50
          "
        >
        No se encontraron ventas para {nombresPeriodo[periodo]}. Cambia el periodo para consultar más información.        </p>

      </div>

    </div>
  );
}

  return (
    <div className="space-y-6">

 

      {/* GRAFICA */}

      <div className="h-[500px] rounded-2xl border border-[#274127] bg-[#162616] p-5">
<div className="mb-6">

  <h3 className="text-xl font-semibold text-white">
    Ventas por periodo
  </h3>

  <p className="mt-1 text-sm text-white/50">
    Comportamiento de las ventas durante el periodo seleccionado.
  </p>

</div>
        <ResponsiveContainer
          width="100%"
          height="80%"
        >

          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 25,
            }}
          >

            <defs>

              <linearGradient
                id="ventasGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#6db56d"
                  stopOpacity={0.45}
                />

                <stop
                  offset="100%"
                  stopColor="#6db56d"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,.05)"
              vertical={false}
            />

            <XAxis
              dataKey="fecha"
              height={50}
              tickMargin={12}
              tick={{
                fill:
                  "rgba(255,255,255,.55)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill:
                  "rgba(255,255,255,.55)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background:
                  "#182518",
                border:
                  "1px solid rgba(255,255,255,.08)",
                borderRadius: 14,
                color: "#fff",
              }}
                formatter={(value) => [
                  `$${Number(value ?? 0).toLocaleString("es-MX")}`,
                  "Total vendido",
                ]}
            />

            <Area
              type="monotone"
              dataKey="total"
              stroke="#6db56d"
              strokeWidth={4}
              fill="url(#ventasGradient)"
              dot={{
                r: 5,
                fill: "#6db56d",
              }}
              activeDot={{
                r: 8,
              }}
              animationDuration={900}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}