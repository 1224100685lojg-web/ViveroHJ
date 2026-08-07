"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
  PackageCheck,
  ClipboardList,
} from "lucide-react";
import DetailMovementModal from "../Modals/DetailMovementModal";
import { useSearch } from "@/context/SearchContext";
import type { Movimiento } from "@/types/movimientos";

type Props = {
  movimientos?: Movimiento[];

  loading?: boolean;

  onStatsChange?: (stats: {
    entradas: number;
    salidas: number;
    hoy: number;
    mes: number;
  }) => void;
};

export default function MovementsTable({
  movimientos: movimientosExternos,
  loading: loadingExterno,
  onStatsChange,
}: Props) {

const { busqueda } = useSearch();
const [movimientosInternos, setMovimientosInternos] = useState<Movimiento[]>([]);

const [tipoFiltro, setTipoFiltro] = useState<
  | "TODOS"
  | "ENTRADA"
  | "SALIDA"
  | "AJUSTE"
  | "APARTADO"
  | "PEDIDO"
>("TODOS");
const [fechaInicio, setFechaInicio] = useState("");
const [fechaFin, setFechaFin] = useState("");

const [rangoRapido, setRangoRapido] = useState<
  "TODOS" | "HOY" | "7DIAS" | "MES" | "PERSONALIZADO"
>("TODOS");

const [loadingInterno, setLoadingInterno] = useState(true);

const [openDetail, setOpenDetail] = useState(false);

const [movimientoSeleccionado, setMovimientoSeleccionado] =
  useState<Movimiento | null>(null);

  const movimientos =
  movimientosExternos ?? movimientosInternos;


const loading =
  loadingExterno ?? loadingInterno;

async function cargarMovimientos() {

  setLoadingInterno(true);


  const { data, error } = await supabase
    .from("movimientos_inventario")
    .select(`
      *,
      usuarios(
        nombre
      )
    `)
    .order("created_at", {
      ascending: false,
    });



  if (error) {

    console.error(
      "ERROR CARGANDO MOVIMIENTOS:",
      error
    );

    setLoadingInterno(false);

    return;

  }



  const listaBase = data ?? [];



  const referencias = listaBase
    .filter(
      (m) =>
        m.tipo === "APARTADO" &&
        m.referencia_id
    )
    .map(
      (m) =>
        m.referencia_id!
    );



  const { data: apartadosData } =
    await supabase
      .from("apartados")
      .select(`
        id,
        estado
      `)
      .in(
        "id",
        referencias
      );



  const productosIds = listaBase
    .map(
      (m) =>
        m.producto_id
    )
    .filter(Boolean);



  const { data: productosData } =
    await supabase
      .from("productos")
      .select(`
        id,
        nombre,
        codigo
      `)
      .in(
        "id",
        productosIds
      );



  const lista: Movimiento[] =
    listaBase.map(
      (m:any)=>({

        ...m,


        productos:
          productosData?.find(
            p =>
              p.id === m.producto_id
          ) ?? null,



        apartado_estado:
          apartadosData?.find(
            a =>
              a.id === m.referencia_id
          )?.estado ?? null,


      })
    );



  console.log(
    "MOVIMIENTOS COMPLETOS:",
    lista
  );



  // Guardar movimientos internos
  setMovimientosInternos(lista);



  // ===========================
  // Estadísticas
  // ===========================


  const hoy = new Date();



  const entradas =
    lista.filter(
      (m) =>
        m.tipo === "ENTRADA"
    ).length;



  const salidas =
    lista.filter(
      (m) =>
        m.tipo === "SALIDA"
    ).length;



  const movimientosHoy =
    lista.filter(
      (m)=>{

        const fecha =
          new Date(
            m.created_at
          );


        return (
          fecha.getDate() === hoy.getDate() &&
          fecha.getMonth() === hoy.getMonth() &&
          fecha.getFullYear() === hoy.getFullYear()
        );

      }
    ).length;




  const movimientosMes =
    lista.filter(
      (m)=>{

        const fecha =
          new Date(
            m.created_at
          );


        return (
          fecha.getMonth() === hoy.getMonth() &&
          fecha.getFullYear() === hoy.getFullYear()
        );

      }
    ).length;




  onStatsChange?.({

    entradas,

    salidas,

    hoy: movimientosHoy,

    mes: movimientosMes,

  });



  setLoadingInterno(false);

}

useEffect(() => {
  if (!movimientosExternos) {
    void cargarMovimientos();
  }
}, [movimientosExternos, onStatsChange]);


const movimientosFiltrados = useMemo(() => {
  const texto = busqueda.toLowerCase();

  return movimientos.filter((m) => {
    const nombre = m.productos?.nombre?.toLowerCase() ?? "";
    const esPedido = m.tipo === "PEDIDO";
    const codigo = m.productos?.codigo?.toLowerCase() ?? "";
const motivo = m.motivo?.toLowerCase() ?? "";

const observaciones =
  m.observaciones?.toLowerCase() ?? "";


const referenciaFormateada =
  formatearReferencia(m.observaciones)
    .toLowerCase();


const coincideBusqueda =
  nombre.includes(texto) ||
  (esPedido &&
   m.observaciones?.toLowerCase().includes(texto)) ||
  codigo.includes(texto) ||
  motivo.includes(texto) ||
  observaciones.includes(texto) ||
  referenciaFormateada.includes(texto) ||
  m.tipo.toLowerCase().includes(texto);

    const coincideTipo =
      tipoFiltro === "TODOS" ||
      m.tipo === tipoFiltro;

      const fechaMovimiento = new Date(m.created_at);

const coincideFechaInicio =
  !fechaInicio ||
  fechaMovimiento >= new Date(fechaInicio);

const coincideFechaFin =
  !fechaFin ||
  fechaMovimiento <= new Date(fechaFin + "T23:59:59");

    return (
  coincideBusqueda &&
  coincideTipo &&
  coincideFechaInicio &&
  coincideFechaFin
);
  });
}, [
  movimientos,
  busqueda,
  tipoFiltro,
  fechaInicio,
  fechaFin
]);

  function colorTipo(tipo: string) {
    switch (tipo) {

      case "ENTRADA":
        return "bg-green-500/10 text-green-400";

      case "SALIDA":
        return "bg-red-500/10 text-red-400";

      case "APARTADO":
        return "bg-blue-500/10 text-blue-400";

      case "PEDIDO":
        return "bg-purple-500/10 text-purple-400";

      default:
        return "bg-yellow-500/10 text-yellow-400";
    }
  }

function icono(tipo: string) {
  switch (tipo) {

    case "ENTRADA":
      return <ArrowDownCircle size={14} />;

    case "SALIDA":
      return <ArrowUpCircle size={14} />;

    case "APARTADO":
      return <PackageCheck size={14} />;

    case "PEDIDO":
      return <ClipboardList size={14} />;

    default:
      return <RefreshCcw size={14} />;
  }
}

function formatearReferencia(texto: string | null) {
  if (!texto) return "-";

  const uuid =
    /([0-9a-f]{8})-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;


  return texto.replace(
    uuid,
    (_, corto) => `#${corto.toUpperCase()}`
  );
}

  return (
    <div className="overflow-hidden rounded-2xl border border-[#274127] bg-[#162616]">

      <div className="flex flex-col gap-4 border-b border-[#274127] p-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="font-medium text-white">
            Historial de movimientos
          </h2>

          <p className="mt-1 text-sm text-white/40">
            Registro cronológico del inventario
          </p>
        </div>

</div>

<div className="flex flex-wrap gap-2 border-b border-[#274127] px-5 py-4">

  <button
    onClick={() => setTipoFiltro("TODOS")}
    className={`rounded-xl px-4 py-2 text-sm transition ${
      tipoFiltro === "TODOS"
        ? "bg-[#6db56d] text-black"
        : "bg-[#0f1a0f] text-white border border-[#274127]"
    }`}
  >
    Todos
  </button>

  <button
    onClick={() => setTipoFiltro("ENTRADA")}
    className={`rounded-xl px-4 py-2 text-sm transition ${
      tipoFiltro === "ENTRADA"
        ? "bg-green-500 text-white"
        : "bg-[#0f1a0f] text-white border border-[#274127]"
    }`}
  >
    Entradas
  </button>

  <button
    onClick={() => setTipoFiltro("SALIDA")}
    className={`rounded-xl px-4 py-2 text-sm transition ${
      tipoFiltro === "SALIDA"
        ? "bg-red-500 text-white"
        : "bg-[#0f1a0f] text-white border border-[#274127]"
    }`}
  >
    Salidas
  </button>

  <button
  onClick={() => setTipoFiltro("APARTADO")}
  className={`rounded-xl px-4 py-2 text-sm transition ${
    tipoFiltro === "APARTADO"
      ? "bg-blue-500 text-white"
      : "bg-[#0f1a0f] text-white border border-[#274127]"
  }`}
>
  Apartados
</button>

  <div className="flex flex-wrap items-center gap-3 border-b border-[#274127] px-5 py-4">

  <div className="flex items-center gap-2">

    <span className="text-sm text-white/60">
      Desde
    </span>

    <input
      type="date"
      value={fechaInicio}
      onChange={(e) => setFechaInicio(e.target.value)}
      className="
        rounded-lg
        border
        border-[#274127]
        bg-[#0f1a0f]
        px-3
        py-2
        text-white
      "
    />

  </div>

  <div className="flex items-center gap-2">

    <span className="text-sm text-white/60">
      Hasta
    </span>

    <input
      type="date"
      value={fechaFin}
      onChange={(e) => setFechaFin(e.target.value)}
      className="
        rounded-lg
        border
        border-[#274127]
        bg-[#0f1a0f]
        px-3
        py-2
        text-white
      "
    />

  </div>

</div>

</div>

<table className="w-full">

 <thead className="bg-[#111a11]">
  <tr>
    <th className="px-5 py-3 text-left text-[10px] uppercase text-white/40">
      Fecha
    </th>

    <th className="px-5 py-3 text-left text-[10px] uppercase text-white/40">
      Producto
    </th>

    <th className="px-5 py-3 text-left text-[10px] uppercase text-white/40">
      Tipo
    </th>

    <th className="px-5 py-3 text-left text-[10px] uppercase text-white/40">
      Cantidad
    </th>

    <th className="px-5 py-3 text-left text-[10px] uppercase text-white/40">
      Referencia
    </th>
  </tr>
</thead>

        <tbody>

          {loading && (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-white/40"
              >
                Cargando movimientos...
              </td>
            </tr>
          )}

          {!loading &&
            movimientosFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-white/40"
                >
                  No hay movimientos registrados.
                </td>
              </tr>
            )}

          {!loading &&
  movimientosFiltrados.map((movimiento) => (
    <tr
      key={movimiento.id}
      onClick={() => {
        setMovimientoSeleccionado(movimiento);
        setOpenDetail(true);
      }}
      className="
        cursor-pointer
        border-t
        border-white/5
        transition
        hover:bg-white/[0.03]
      "
    >
      {/* FECHA */}
      <td className="px-5 py-4">
        <div className="text-sm text-white">
          {new Date(movimiento.created_at).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>

        <div className="text-xs text-white/40">
          {new Date(movimiento.created_at).toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </td>

      {/* PRODUCTO */}
      <td className="px-5 py-4">
        <div className="text-white font-medium">
              {
                movimiento.productos?.nombre ??
                movimiento.pedido_producto ??
                "Sin producto"
              }
        </div>

        <div className="text-xs text-white/40">
          {movimiento.productos?.codigo ?? ""}
        </div>
      </td>

      {/* TIPO */}
      <td className="px-5 py-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${colorTipo(
            movimiento.tipo
          )}`}
        >
          {icono(movimiento.tipo)}
          {movimiento.tipo}
        </span>
      </td>

      {/* CANTIDAD */}
      <td className="px-5 py-4">
        <span className="rounded-lg bg-white/5 px-3 py-1 font-semibold text-white">
          {movimiento.cantidad}
        </span>
      </td>

{/* REFERENCIA */}
<td className="px-5 py-4 text-sm text-white/70">

  <div>
    {formatearReferencia(movimiento.observaciones)}
  </div>


{movimiento.tipo === "APARTADO" && (
  <div className="mt-1 text-xs">
    {movimiento.apartado_estado === "pendiente" && (
      <span className="text-yellow-400">
        🟡 Pendiente de pago
      </span>
    )}

    {movimiento.apartado_estado === "entregado" && (
      <span className="text-green-400">
        🟢 Completado
      </span>
    )}

    {movimiento.apartado_estado === "cancelado" && (
      <span className="text-red-400">
        🔴 Cancelado
      </span>
    )}
    
  </div>
)}
</td>
    </tr>
))}
    </tbody>
      </table>

        <DetailMovementModal
          open={openDetail}
          movimiento={movimientoSeleccionado}
          onClose={() => {
            setOpenDetail(false);
            setMovimientoSeleccionado(null);
          }}
        />


    </div>
  );
}