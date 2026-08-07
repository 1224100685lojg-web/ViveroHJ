"use client";

import {
  LayoutDashboard,
  Package,
  Truck,
  AlertTriangle,
  Settings,
  ClipboardList,
  BarChart3,
  LogOut
} from "lucide-react";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";


type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};


export default function Sidebar({
  open = false,
  onClose,
}: SidebarProps) {


  const [expanded, setExpanded] = useState(false);

  const timer = useRef<NodeJS.Timeout | null>(null);



  const openSidebar = () => {

    if (timer.current) {
      clearTimeout(timer.current);
    }

    setExpanded(true);

  };



  const closeSidebar = () => {

    timer.current = setTimeout(() => {
      setExpanded(false);
    },120);

  };



  return (
    <>


      {/* OVERLAY MOBILE */}

      {open && (

        <div
          onClick={onClose}
          className="
            lg:hidden
            fixed
            inset-0
            bg-black/50
            z-40
          "
        />

      )}



      <aside

        onMouseEnter={openSidebar}
        onMouseLeave={closeSidebar}

        className={`

          fixed
          lg:static

          top-0
          left-0

          h-dvh

          ${
            expanded
              ? "lg:w-[220px]"
              : "lg:w-[70px]"
          }


          w-[85vw]
          max-w-[220px]


          bg-[#0f1a0f]

          border-r
          border-white/5


          p-3

          flex
          flex-col


          overflow-hidden

          z-50


          transition-[width]
          duration-200
          ease-out



          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }

        `}

      >



        {/* CERRAR MOBILE */}

        <div
          className="
            lg:hidden
            flex
            justify-end
            mb-2
          "
        >

          <button
            onClick={onClose}
            className="
              text-white/40
              hover:text-white
              transition-colors
              duration-150
            "
          >
            ✕
          </button>

        </div>





        {/* LOGO */}

        <div
          className="
            flex
            items-center
            gap-2
            px-3
            py-4
            mb-4
          "
        >

          <div
            className="
              w-2
              h-2
              rounded-full
              bg-[#6db56d]
              shrink-0
            "
          />


          <h1
            className={`

              text-[#e8f4e8]

              font-medium

              tracking-wide

              whitespace-nowrap

              overflow-hidden


              transition-[opacity,width]
              duration-150


              ${
                expanded
                  ? "opacity-100 w-auto"
                  : "opacity-0 w-0"
              }

            `}
          >

            Vivero HJ

          </h1>


        </div>






        {/* MENU */}

        <div>


          {expanded && (

            <div
              className="
                text-[10px]
                uppercase
                tracking-widest
                text-white/25
                px-3
                mb-2
              "
            >
              Menú
            </div>

          )}




          <div className="space-y-1">


            <SidebarItem
              expanded={expanded}
              icon={<LayoutDashboard size={18}/>}
              label="Resumen"
              href="/dashboard"
              onClick={onClose}
            />


            <SidebarItem
              expanded={expanded}
              icon={<Package size={18}/>}
              label="Inventario"
              href="/inventario"
              onClick={onClose}
            />


            <SidebarItem
              expanded={expanded}
              icon={<ClipboardList size={18}/>}
              label="Movimientos"
              href="/movimientos"
              onClick={onClose}
            />



            <SidebarItem
              expanded={expanded}
              icon={<Truck size={18}/>}
              label="Pedidos"
              href="/pedidos"
              onClick={onClose}
            />



            <SidebarItem
              expanded={expanded}
              icon={<AlertTriangle size={18}/>}
              label="Rehabilitación"
              href="/rehabilitacion-admin"
              onClick={onClose}
            />



            <SidebarItem
              expanded={expanded}
              icon={<BarChart3 size={18}/>}
              label="Reportes"
              href="/reportes"
              onClick={onClose}
            />


          </div>





          <div className="mt-4 space-y-1">


            <SidebarItem
              expanded={expanded}
              icon={<Settings size={18}/>}
              label="Configuración"
              href="/configuracion"
              onClick={onClose}
            />


          </div>



        </div>
                {/* CERRAR SESIÓN */}


      </aside>


    </>
  );

}







function SidebarItem({

  icon,
  label,
  href,
  expanded,
  onClick,

}:{

  icon:ReactNode;

  label:string;

  href?:string;

  expanded:boolean;

  onClick?:()=>void;

}){


  const pathname = usePathname();


  const isActive =
    href &&
    (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );



  const content = (

    <div

      onClick={onClick}

      className={`

        flex

        items-center


        ${
          expanded
            ? "gap-2 justify-start"
            : "justify-center"
        }


        px-3

        py-2


        rounded-lg


        transition-colors

        duration-150


        cursor-pointer


        text-[13px]



        ${
          isActive

          ? "bg-[#6db56d]/10 text-[#a8d5a8]"

          : "text-white/45 hover:bg-white/5 hover:text-white"

        }


      `}

    >


      {icon}



      <span

        className={`

          whitespace-nowrap

          overflow-hidden


          transition-[opacity,width]

          duration-150



          ${
            expanded
              ? "opacity-100 w-auto"
              : "opacity-0 w-0"
          }

        `}

      >

        {label}

      </span>


    </div>

  );



  if(!href) return content;



  return (

    <Link
      href={href}
    >
      {content}
    </Link>

  );


}