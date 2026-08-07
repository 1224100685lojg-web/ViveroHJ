"use client";

import {
  ShoppingCart,
  ClipboardList,
  FileClock,
  PackageCheck,
  HeartPulse,
  LogOut,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";


type Props = {
  open?: boolean;
  onClose?: () => void;
};


export default function SidebarEmpleado({
  open = false,
  onClose,
}: Props) {


  const pathname = usePathname();
  const router = useRouter();
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
  }, 120);
};





  return (

    <>


      {/* OVERLAY MOVIL */}

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

    bg-[#0f1a0f]

    border-r
    border-white/5

    p-3

    flex
    flex-col

    z-50

    overflow-hidden

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




        {/* CERRAR MOVIL */}

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

            <X size={20}/>

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







        {/* VENTAS */}

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
    Ventas
  </div>
)}



        <div className="space-y-1">


          <SidebarItem
          href="/ventas"
          icon={<ShoppingCart size={18}/>}
          label="Nueva Venta"
          active={pathname === "/ventas"}
          expanded={expanded}
          />



          <SidebarItem
            href="/historial"
            icon={<FileClock size={18}/>}
            label="Historial"
            active={pathname === "/historial"}
            expanded={expanded}
          />

          <SidebarItem
            href="/apartados"
            icon={<PackageCheck size={18}/>}
            label="Apartados"
            active={pathname === "/apartados"}
            expanded={expanded}
          />
          
          <SidebarItem
            href="/rehabilitacion"
            icon={<HeartPulse size={18}/>}
            label="Rehabilitación"
            active={pathname === "/rehabilitacion"}
            expanded={expanded}
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
 active,
 expanded,
}: {
 icon: React.ReactNode;
 label: string;
 href?: string;
 active?: boolean;
 expanded:boolean;
}) {



  const content = (

<div
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



  if (!href) return content;



  return (

    <Link href={href}>
      {content}
    </Link>

  );

}