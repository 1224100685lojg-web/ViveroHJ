"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Resumen",
    href: "/dashboard",
  },
  {
    name: "Inventario",
    href: "/inventario",
  },
  {
    name: "Movimientos",
    href: "/movimientos",
  },
  {
    name: "Pedidos",
    href: "/pedidos",
  },
  {
    name: "Reportes",
    href: "/reportes",
  },
];

export default function NavLinks() {

  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`
            px-4 py-2 rounded-lg text-sm transition
            ${
              pathname === link.href
                ? "bg-[#2d6b2d] text-white"
                : "text-white/50 hover:text-white"
            }
          `}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}