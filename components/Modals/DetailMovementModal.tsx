"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
  Package,
  Calendar,
  ClipboardList,
  MessageSquare,
} from "lucide-react";
import type { Movimiento } from "@/types/movimientos";

type Props = {
  open: boolean;
  movimiento: Movimiento | null;
  onClose: () => void;
};

export default function DetailMovementModal({
  open,
  movimiento,
  onClose,
}: Props) {
  if (!open || !movimiento) return null;

function colorTipo() {

  if (!movimiento) {
    return "bg-gray-500/10 text-gray-400";
  }

  switch (movimiento.tipo) {

    case "ENTRADA":
      return "bg-green-500/10 text-green-400";

    case "SALIDA":
      return "bg-red-500/10 text-red-400";

    default:
      return "bg-gray-500/10 text-gray-400";
  }

}

function icono() {

  if (!movimiento) {
    return null;
  }
  switch (movimiento.tipo) {
      case "ENTRADA":
        return <ArrowDownCircle size={18} />;

      case "SALIDA":
        return <ArrowUpCircle size={18} />;

      default:
        return <RefreshCcw size={18} />;
    }
  }
  function formatearReferencia(texto: string | null) {
  if (!texto) return "-";

  const uuid =
    /([0-9a-f]{8})-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  return texto.replace(uuid, (_, corto) => `#${corto.toUpperCase()}`);
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-2xl border border-[#274127] bg-[#111a11] shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-[#274127] p-6">

          <div>

            <h2 className="text-2xl font-semibold text-white">
              Detalle del movimiento
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Información completa del registro
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>

        </div>

        {/* CONTENIDO */}

        <div className="space-y-5 p-6">

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-xl border border-[#274127] bg-[#162616] p-4">

              <div className="mb-2 flex items-center gap-2 text-white/50">
                <Package size={16} />
                Producto
              </div>

              <div className="font-medium text-white">
                {movimiento.productos?.nombre}
              </div>

              <div className="mt-1 text-sm text-white/40">
                Código: {movimiento.productos?.codigo || "-"}
              </div>

            </div>

            <div className="rounded-xl border border-[#274127] bg-[#162616] p-4">

              <div className="mb-2 flex items-center gap-2 text-white/50">
                {icono()}
                Tipo
              </div>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${colorTipo()}`}
              >
                {icono()}
                {movimiento.tipo}
              </span>

            </div>

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-xl border border-[#274127] bg-[#162616] p-4">

              <div className="mb-2 flex items-center gap-2 text-white/50">
                <ClipboardList size={16} />
                Cantidad
              </div>

              <div className="text-3xl font-bold text-white">
                {movimiento.cantidad}
              </div>

            </div>

            <div className="rounded-xl border border-[#274127] bg-[#162616] p-4">

              <div className="mb-2 flex items-center gap-2 text-white/50">
                <Calendar size={16} />
                Fecha
              </div>

              <div className="text-white">
                {new Date(movimiento.created_at).toLocaleString()}
              </div>

            </div>

          </div>

          <div className="rounded-xl border border-[#274127] bg-[#162616] p-4">

                <div className="mb-2 flex items-center gap-2 text-white/50">
                  👤
                  Realizado por
                </div>

                <div className="font-medium text-white">
                  {movimiento.usuarios?.nombre ?? "Desconocido"}
                </div>

              </div>

            <div className="rounded-xl border border-[#274127] bg-[#162616] p-4">

              <div className="mb-2 text-white/50">
                Referencia
              </div>

              <div className="font-medium text-white">
                {movimiento.observaciones
                  ? formatearReferencia(movimiento.observaciones)
                  : movimiento.motivo || "-"}
              </div>

            </div>

            <div className="rounded-xl border border-[#274127] bg-[#162616] p-4">

              <div className="mb-2 flex items-center gap-2 text-white/50">
                <MessageSquare size={16} />
                Descripción
              </div>

              <div className="text-white">
                {movimiento.tipo === "SALIDA" && "Producto descontado del inventario por una venta."}
                {movimiento.tipo === "ENTRADA" && "Producto agregado al inventario."}
                {movimiento.tipo === "AJUSTE" && "Ajuste manual de existencias."}
              </div>

            </div>

        </div>

        {/* FOOTER */}

        <div className="flex justify-end border-t border-[#274127] p-5">

          <button
            onClick={onClose}
            className="rounded-xl bg-[#6db56d] px-6 py-2 font-medium text-black transition hover:brightness-110"
          >
            Cerrar
          </button>

        </div>

      </div>

    </div>
  );
}