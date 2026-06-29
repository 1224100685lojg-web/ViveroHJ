import InventoryTable from "@/components/Tables/InventoryTable";

export default function InventarioPage() {
  return (
    <div
      className="
        min-h-screen
        p-6
        space-y-5
        rounded-2xl
        bg-[#0f1a0f]
      "
    >
      {/* HEADER */}
      <div className="pb-5 border-b border-[#274127]">
        <h1 className="text-3xl font-bold text-white">
          Inventario
        </h1>

        <p className="mt-2 text-white/50">
          Gestión de productos en tiempo real
        </p>
      </div>

      {/* BUSCADOR + FILTROS */}
      <div className="flex flex-col xl:flex-row gap-4">

        <input
          placeholder="Buscar producto..."
          className="
            flex-1
            px-5
            py-3
            rounded-xl
            bg-[#162616]
            border
            border-[#274127]
            text-white
            placeholder:text-white/35
            outline-none
            transition
            focus:border-[#6db56d]
            focus:ring-2
            focus:ring-[#6db56d]/20
          "
        />

        <div className="flex gap-2 flex-wrap">

          <button
            className="
              px-4 py-2
              rounded-xl
              bg-[#203520]
              border border-[#6db56d]
              text-white
              text-sm
              font-medium
            "
          >
            Todos
          </button>

          <button
            className="
              px-4 py-2
              rounded-xl
              bg-[#162616]
              border border-[#274127]
              text-white/80
              text-sm
              hover:bg-[#203520]
              hover:border-[#6db56d]
              transition
            "
          >
            Plantas
          </button>

          <button
            className="
              px-4 py-2
              rounded-xl
              bg-[#162616]
              border border-[#274127]
              text-white/80
              text-sm
              hover:bg-[#203520]
              hover:border-[#6db56d]
              transition
            "
          >
            Flores
          </button>

          <button
            className="
              px-4 py-2
              rounded-xl
              bg-[#162616]
              border border-[#274127]
              text-white/80
              text-sm
              hover:bg-[#203520]
              hover:border-[#6db56d]
              transition
            "
          >
            Macetas
          </button>

        </div>
      </div>

      {/* ACCIONES */}
      <div className="flex flex-wrap gap-3">

        <button
          className="
            px-4 py-2
            rounded-xl
            bg-[#162616]
            border border-[#274127]
            text-white
            text-sm
            hover:bg-[#203520]
            hover:border-[#6db56d]
            transition
          "
        >
          + Entrada
        </button>

        <button
          className="
            px-4 py-2
            rounded-xl
            bg-[#162616]
            border border-[#274127]
            text-white
            text-sm
            hover:bg-[#203520]
            hover:border-red-400
            transition
          "
        >
          - Salida
        </button>

        <button
          className="
            px-4 py-2
            rounded-xl
            bg-[#162616]
            border border-[#274127]
            text-white
            text-sm
            hover:bg-[#203520]
            hover:border-[#6db56d]
            transition
          "
        >
          Exportar
        </button>

      </div>

      {/* TABLA */}
      <InventoryTable />

    </div>
  );
}