import MovementsSection from "@/components/MovementsSection";

export default function MovimientosPage() {
  return (
    <div
      className="
        rounded-2xl
        bg-[#0f1a0f]
        p-6
        space-y-5
      "
    >
      {/* HEADER */}
      <div className="border-b border-[#274127] pb-5">
        <h1 className="text-3xl font-bold text-white">
          Movimientos
        </h1>

        <p className="mt-2 text-white/50">
          Control de entradas y salidas de inventario
        </p>
      </div>

      {/* CONTENIDO */}
      <MovementsSection />
    </div>
  );
}