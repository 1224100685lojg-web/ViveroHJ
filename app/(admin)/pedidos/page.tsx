"use client";

import PedidosTable from "@/components/Tables/PedidosTable";

export default function PedidosPage() {
  return (
    <div
      className="
        rounded-2xl
        bg-[#0f1a0f]
        p-6
      "
    >
      <div
        className="
          border-b
          border-[#274127]
          pb-5
          mb-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          Pedidos
        </h1>

        <p
          className="
            mt-2
            text-white/50
          "
        >
          Control de solicitudes de clientes para productos no disponibles en inventario.
        </p>
      </div>

      <PedidosTable />
    </div>
  );
}