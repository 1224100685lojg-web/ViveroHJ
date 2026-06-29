"use client";

export default function NavbarEmpleado() {
  return (
    <header className="h-16 bg-[#162616] border-b border-[#274127] px-6 flex items-center justify-between">

      <input
        placeholder="Buscar producto..."
        className="
          w-80
          bg-[#203520]
          rounded-xl
          px-4
          py-2
          outline-none
          text-white
          placeholder:text-white/40
        "
      />

      <div className="text-right">

        <p className="text-white font-medium">
          Owen
        </p>

        <p className="text-white/50 text-sm">
          Empleado
        </p>

      </div>

    </header>
  );
}