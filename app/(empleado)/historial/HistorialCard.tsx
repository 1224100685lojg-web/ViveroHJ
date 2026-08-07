"use client";

import { Eye, ReceiptText, CalendarDays, Package } from "lucide-react";

type HistorialCardProps = {
  folio: string;
  cliente: string;
  fecha: string;
  productos: number;
  total: number;
  estado: "Completada" | "Cancelada" | "Pendiente";
  onVerDetalle?: () => void;
};

export default function HistorialCard({
  folio,
  cliente,
  fecha,
  productos,
  total,
  estado,
  onVerDetalle,
}: HistorialCardProps) {
  return (
    <div
      className="
        bg-white/[0.03]
        border
        border-white/5
        rounded-xl
        p-5
        transition
        hover:border-[#6db56d]/30
        hover:bg-white/[0.05]
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <ReceiptText size={18} className="text-[#a8d5a8]" />

            <h2 className="text-lg font-semibold text-white">
              Venta #{folio}
            </h2>
          </div>

          <p className="text-white/40 text-sm mt-1">
            {cliente}
          </p>
        </div>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
            ${
              estado === "Completada"
                ? "bg-green-500/15 text-green-300"
                : estado === "Pendiente"
                ? "bg-yellow-500/15 text-yellow-300"
                : "bg-red-500/15 text-red-300"
            }
          `}
        >
          {estado}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <CalendarDays size={16} />
          {fecha}
        </div>

        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Package size={16} />
          {productos} producto{productos !== 1 && "s"}
        </div>

        <div className="text-right">
          <p className="text-xs text-white/40">
            Total
          </p>

          <p className="text-lg font-semibold text-[#a8d5a8]">
            ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={onVerDetalle}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            bg-[#6db56d]/20
            text-[#a8d5a8]
            hover:bg-[#6db56d]/30
            transition
          "
        >
          <Eye size={16} />
          Ver detalle
        </button>
      </div>
    </div>
  );
}