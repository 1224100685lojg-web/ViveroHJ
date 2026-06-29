import DashboardCard from "@/components/DashboardCard";

import SalesChart from "@/components/Charts/SalesChart";
import CategoryChart from "@/components/Charts/CategoryChart";

import {
  DollarSign,
  Package,
  TrendingUp,
  BarChart3,
  Download,
} from "lucide-react";

export default function ReportesPage() {
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
          Reportes
        </h1>

        <p className="mt-2 text-white/50">
          Estadísticas y análisis del inventario
        </p>

      </div>

      {/* RESUMEN */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

        <DashboardCard
          title="Ventas"
          value="$28,450"
          subtitle="Este mes"
          subtitleColor="#6db56d"
          icon={<DollarSign size={16} />}
          iconBg="rgba(107,181,107,0.15)"
          iconColor="#6db56d"
        />

        <DashboardCard
          title="Productos"
          value="421"
          subtitle="Vendidos"
          subtitleColor="#9fe1cb"
          icon={<Package size={16} />}
          iconBg="rgba(93,202,165,0.15)"
          iconColor="#9fe1cb"
        />

        <DashboardCard
          title="Crecimiento"
          value="+12%"
          subtitle="Respecto al mes anterior"
          subtitleColor="#fac775"
          icon={<TrendingUp size={16} />}
          iconBg="rgba(239,159,39,0.15)"
          iconColor="#fac775"
        />

        <DashboardCard
          title="Categorías"
          value="8"
          subtitle="Registradas"
          subtitleColor="#f09595"
          icon={<BarChart3 size={16} />}
          iconBg="rgba(226,75,74,0.15)"
          iconColor="#f09595"
        />

      </div>

      {/* ACCIONES */}

      <div className="flex justify-between items-center flex-wrap gap-3">

        <div className="flex gap-3">

          <button className="px-4 py-2 rounded-xl bg-[#203520] border border-[#6db56d] text-white text-sm">
            Mes
          </button>

          <button className="px-4 py-2 rounded-xl bg-[#162616] border border-[#274127] text-white/80 text-sm hover:bg-[#203520] transition">
            Año
          </button>

        </div>

        <button
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-[#6db56d]
            text-[#081008]
            font-medium
          "
        >
          <Download size={16} />

          Exportar
        </button>

      </div>

      {/* GRÁFICOS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        <SalesChart />

        <CategoryChart />

      </div>

    </div>
  );
}