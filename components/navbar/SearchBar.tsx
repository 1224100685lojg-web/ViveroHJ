"use client";

import { Search, X } from "lucide-react";
import { useSearch } from "@/context/SearchContext";

export default function SearchBar() {
  const {
    busqueda,
    setBusqueda,
    limpiarBusqueda,
  } = useSearch();

  return (
    <div className="relative w-full max-w-md">

      <Search
        size={16}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-white/30
        "
      />

<input
  type="text"
  value={busqueda}
  onChange={(e) => setBusqueda(e.target.value)}
  placeholder="Buscar en el sistema..."
  className="
    relative
    z-50
    w-full
    bg-white/[0.03]
    border
    border-white/10
    rounded-lg
    py-2
    pl-9
    pr-10
    text-sm
    text-white
    placeholder:text-white/30
    outline-none
  "
/>

      {busqueda && (
        <button
          onClick={limpiarBusqueda}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-white/40
            hover:text-white
          "
        >
          <X size={15} />
        </button>
      )}

    </div>
  );
}