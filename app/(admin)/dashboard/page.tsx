"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import InventoryTable from "@/components/Tables/InventoryTable";

import SalesChart from "@/components/Charts/SalesChart";
import CategoryChart from "@/components/Charts/CategoryChart";

import {
  Sprout,
  AlertTriangle,
  Ban,
  Coins,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 🔥 validación SIN useState de control
  const isAuthenticated =
    typeof window !== "undefined" &&
    localStorage.getItem("flora-user") !== null;

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111a11] text-white">
        Cargando...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#111a11] text-white flex">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <section className="flex-1 p-3 md:p-8">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="
          grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-5
        ">
          <DashboardCard
            title="Disponibles"
            value="318"
            subtitle="+22 este mes"
            subtitleColor="#6db56d"
            icon={<Sprout size={16} />}
            iconBg="rgba(107,181,107,0.15)"
            iconColor="#a8d5a8"
          />

          <DashboardCard
            title="Bajo stock"
            value="14"
            subtitle="Revisar pronto"
            subtitleColor="#fac775"
            icon={<AlertTriangle size={16} />}
            iconBg="rgba(239,159,39,0.15)"
            iconColor="#fac775"
          />

          <DashboardCard
            title="Agotados"
            value="5"
            subtitle="Acción requerida"
            subtitleColor="#f09595"
            icon={<Ban size={16} />}
            iconBg="rgba(226,75,74,0.15)"
            iconColor="#f09595"
          />

          <DashboardCard
            title="Valor total"
            value="$94K"
            subtitle="+3.1% mes ant."
            subtitleColor="#9fe1cb"
            icon={<Coins size={16} />}
            iconBg="rgba(93,202,165,0.15)"
            iconColor="#9fe1cb"
          />
        </div>

        <InventoryTable />

        <div className="
          grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-4 mt-4
        ">
          <SalesChart />
          <CategoryChart />
        </div>
      </section>
    </main>
  );
}