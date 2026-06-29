"use client";

import Link from "next/link";
import { ShoppingCart, ClipboardList, Users, LogOut } from "lucide-react";

export default function SidebarEmpleado() {
  return (
    <aside className="w-64 bg-[#162616] border-r border-[#274127] flex flex-col">

      <div className="h-16 flex items-center justify-center border-b border-[#274127]">

        <h1 className="text-2xl font-bold text-[#8fd18f]">
          Vivero HJ
        </h1>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        <Link
          href="/ventas"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#203520] text-white transition"
        >
          <ShoppingCart size={20} />
          Nueva Venta
        </Link>

        <Link
          href="/historial"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#203520] text-white transition"
        >
          <ClipboardList size={20} />
          Historial
        </Link>

        <Link
          href="/clientes"
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#203520] text-white transition"
        >
          <Users size={20} />
          Clientes
        </Link>

      </nav>

      <div className="p-4 border-t border-[#274127]">

        <button
          className="
          w-full
          flex
          items-center
          gap-3
          p-3
          rounded-xl
          hover:bg-red-900/20
          text-red-300
          transition
          "
        >
          <LogOut size={20} />

          Cerrar sesión

        </button>

      </div>

    </aside>
  );
}