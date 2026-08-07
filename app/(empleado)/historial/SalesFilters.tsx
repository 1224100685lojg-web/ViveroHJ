"use client";

type SalesFiltersProps = {

  estado: string;
  setEstado: (value: string) => void;

  desde: string;
  setDesde: (value: string) => void;

  hasta: string;
  setHasta: (value: string) => void;

};

export default function SalesFilters({
  estado,
  setEstado,
  desde,
  setDesde,
  hasta,
  setHasta,
}: SalesFiltersProps) {
  function limpiarFiltros() {
  setDesde("");
  setHasta("");
  setEstado("Todos");
}

  return (
    <div
      className="
        bg-white/[0.03]
        border
        border-white/5
        rounded-xl
        p-4
        sm:p-5
      "
    >
<div
  className="
    flex
    flex-col
    md:flex-row
    md:items-end
    gap-4
  "
>

        {/* Fecha desde */}

        <div className="flex-1">
          <label className="block text-xs text-white/40 mb-2">
            Desde
          </label>

          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="
              w-full
              py-3
              px-3
              rounded-lg
              bg-white/5
              border
              border-white/10
              text-sm
              text-white
              outline-none
              cursor-pointer
              focus:border-[#6db56d]/50
              transition
            "
          />
        </div>

        {/* Fecha hasta */}

        <div className="flex-1">
          <label className="block text-xs text-white/40 mb-2">
            Hasta
          </label>

          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="
              w-full
              py-3
              px-3
              rounded-lg
              bg-white/5
              border
              border-white/5
              text-sm
              text-white
              outline-none
              focus:border-[#6db56d]/40
            "
          />
        </div>

        {/* Estado */}

        <div className="flex-1">
          <label className="block text-xs text-white/40 mb-2">
            Estado
          </label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="
              w-full
              py-3
              px-3
              rounded-lg
              bg-[#162316]
              border
              border-white/15
              text-sm
              text-white
              font-medium
              outline-none
              cursor-pointer
              focus:border-[#6db56d]/60
              transition
            "
          >
            <option
              value="Todos"
              className="bg-[#162316] text-white"
            >
              Todos
            </option>

            <option
              value="Completada"
              className="bg-[#162316] text-white"
            >
              Completada
            </option>

            <option
              value="Pendiente"
              className="bg-[#162316] text-white"
            >
              Pendiente
            </option>

            <option
              value="Cancelada"
              className="bg-[#162316] text-white"
            >
              Cancelada
            </option>

          </select>
        </div>
          <button
    onClick={limpiarFiltros}
    className="
      h-[46px]
      px-5
      rounded-lg
      border
      border-white/10
      bg-white/5
      text-sm
      text-white/60
      hover:text-white
      hover:bg-white/10
      transition
      whitespace-nowrap
    "
  >
    Limpiar filtros
  </button>


      </div>

    </div>
  );
}