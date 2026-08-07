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

    <nav
      className="
        hidden
        lg:flex
        items-center
        gap-1
        overflow-x-auto
      "
    >

      {links.map((link)=>(

        <Link

          key={link.href}

          href={link.href}

          className={`
            
            whitespace-nowrap

            px-3
            py-2

            rounded-lg

            text-sm

            transition-all
            duration-200


            ${
              pathname === link.href

              ? `
                bg-[#2d6b2d]
                text-white
                shadow-sm
              `

              :

              `
                text-white/50
                hover:text-white
                hover:bg-white/5
              `
            }

          `}

        >

          {link.name}

        </Link>

      ))}


    </nav>

  );

}