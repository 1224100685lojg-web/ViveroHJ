import DashboardCard from "@/components/DashboardCard";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Calendar,
  Activity,
} from "lucide-react";

export default function MovimientosPage() {
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
          Movimientos
        </h1>

        <p className="mt-2 text-white/50">
          Control de entradas y salidas de inventario
        </p>

      </div>

      {/* RESUMEN */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <DashboardCard
          title="Entradas"
          value="120"
          subtitle="Este mes"
          subtitleColor="#6db56d"
          icon={<ArrowDownCircle size={16} />}
          iconBg="rgba(107,181,107,0.15)"
          iconColor="#6db56d"
        />

        <DashboardCard
          title="Salidas"
          value="48"
          subtitle="Este mes"
          subtitleColor="#f09595"
          icon={<ArrowUpCircle size={16} />}
          iconBg="rgba(226,75,74,0.15)"
          iconColor="#f09595"
        />

        <DashboardCard
          title="Hoy"
          value="18"
          subtitle="Movimientos"
          subtitleColor="#fac775"
          icon={<Calendar size={16} />}
          iconBg="rgba(239,159,39,0.15)"
          iconColor="#fac775"
        />

        <DashboardCard
          title="Mes"
          value="302"
          subtitle="Total"
          subtitleColor="#9fe1cb"
          icon={<Activity size={16} />}
          iconBg="rgba(93,202,165,0.15)"
          iconColor="#9fe1cb"
        />

      </div>

      {/* FILTROS */}
      <div className="flex flex-wrap gap-3">

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
          Entradas
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
            hover:border-[#f09595]
            transition
          "
        >
          Salidas
        </button>

      </div>

      {/* HISTORIAL */}
      <div
        className="
          bg-[#162616]
          border
          border-[#274127]
          rounded-2xl
          overflow-hidden
        "
      >

        <div className="px-5 py-4 border-b border-[#274127]">

          <h2 className="text-white font-medium">
            Historial de movimientos
          </h2>

          <p className="text-white/40 text-sm mt-1">
            Registro cronológico de entradas y salidas
          </p>

        </div>

        <div className="p-5 text-white/60">
          Aquí irá la tabla de movimientos...
        </div>

      </div>

    </div>
  );
}