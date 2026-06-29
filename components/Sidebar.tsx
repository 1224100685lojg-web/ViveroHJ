import {
  LayoutGrid,
  Flower2,
  Sprout,
  Package,
  Truck,
  AlertTriangle,
  Settings,
} from "lucide-react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};


export default function Sidebar({
  open = false,
  onClose,
}: SidebarProps) {

  const [category, setCategory] = useState("todas");

  return (
    <>
  {/* Overlay móvil */}
  {open && (
    <div
      onClick={onClose}
      className="
        lg:hidden
        fixed inset-0
        bg-black/50
        z-40
      "
    />
  )}

  <aside
    className={`
      fixed lg:static
      top-0 left-0
      h-screen lg:h-auto
      w-[220px]
      min-w-[220px]
      bg-[#0f1a0f]
      border-r border-white/5
      p-3
      flex flex-col
      z-50
      transition-transform duration-300

      ${
        open
          ? "translate-x-0"
          : "-translate-x-full lg:translate-x-0"
      }
    `}
  >

      {/* LOGO */}
      <div className="lg:hidden flex justify-end mb-2">
        <button
          onClick={onClose}
          className="
            text-white/50
            hover:text-white
            text-xl
          "
        >
          ✕
        </button>
      </div>
      <div className="flex items-center gap-2 px-3 py-4 mb-4">
        <div className="w-2 h-2 rounded-full bg-[#6db56d]" />

        <h1 className="text-[#e8f4e8] font-medium tracking-wide">
          Vivero HJ
        </h1>
      </div>

      {/* CATEGORIAS */}
      <div className="text-[10px] uppercase tracking-widest text-white/25 px-3 mb-2">
        Categorías
      </div>

      <div className="space-y-1">

<SidebarItem
  icon={<LayoutGrid size={15} />}
  label="Todas"
  active={category === "todas"}
  onClick={() => setCategory("todas")}
/>

<SidebarItem
  icon={<Sprout size={15} />}
  label="Plantas"
  active={category === "plantas"}
  onClick={() => setCategory("plantas")}
/>

<SidebarItem
  icon={<Flower2 size={15} />}
  label="Flores"
  active={category === "flores"}
  onClick={() => setCategory("flores")}
/>

<SidebarItem
  icon={<Package size={15} />}
  label="Macetas"
  active={category === "macetas"}
  onClick={() => setCategory("macetas")}
/>

      </div>

      {/* ACCIONES */}
      <div className="text-[10px] uppercase tracking-widest text-white/25 px-3 mt-6 mb-2">
        Acciones
      </div>

      <div className="space-y-1">

        <SidebarItem
          icon={<Truck size={15} />}
          label="Proveedores"
        />

        <SidebarItem
          icon={<AlertTriangle size={15} />}
          label="Alertas"
          badge="4"
        />

        <SidebarItem
          icon={<Settings size={15} />}
          label="Configuración"
        />

      </div>

      {/* STOCK */}
      <div className="mt-auto bg-white/[0.03] border border-white/5 rounded-xl p-4">

        <p className="text-[11px] text-white/30 mb-4">
          Stock por categoría
        </p>

        <StockItem
          name="Plantas"
          value="78%"
          width="78%"
          color="#6db56d"
        />

        <StockItem
          name="Flores"
          value="45%"
          width="45%"
          color="#ef9f27"
        />

        <StockItem
          name="Macetas"
          value="12%"
          width="12%"
          color="#e24b4a"
        />

      </div>

    </aside>
</>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  badge,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  badge?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();

  const active = href ? pathname === href : false;

  const content = (
    <div
      className={`
        flex items-center justify-between
        px-3 py-2 rounded-lg transition
        cursor-pointer
        ${
          active
            ? "bg-[#6db56d]/10 text-[#a8d5a8]"
            : "text-white/45 hover:bg-white/5"
        }
      `}
    >
      <div className="flex items-center gap-2 text-[13px]">
        {icon}
        {label}
      </div>

      {badge && (
        <span className="text-[10px] bg-red-500/20 text-red-300 px-2 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );

  if (!href) return content;

  return <Link href={href}>{content}</Link>;
}

function StockItem({
  name,
  value,
  width,
  color,
}: {
  name: string;
  value: string;
  width: string;
  color: string;
}) {
  return (
    <div className="mb-3">

      <div className="flex justify-between text-[10px] text-white/40 mb-1">
        <span>{name}</span>
        <span>{value}</span>
      </div>

      <div className="h-1 rounded-full bg-white/10 overflow-hidden">

        <div
          className="h-full rounded-full"
          style={{
            width,
            background: color,
          }}
        />

      </div>

    </div>
  );
}