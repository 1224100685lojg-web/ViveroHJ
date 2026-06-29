"use client";

import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/5 rounded-lg px-3 py-2">

      <Search
        size={14}
        className="text-white/30"
      />

      <input
        type="text"
        placeholder="Buscar..."
        className="
          bg-transparent
          outline-none
          text-sm
          placeholder:text-white/25
          text-white/70
          w-[140px]
        "
      />

    </div>
  );
}