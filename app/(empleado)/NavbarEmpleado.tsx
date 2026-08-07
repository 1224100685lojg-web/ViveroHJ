"use client";

import { Bell, Search, X, Menu } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import UserMenu from "@/components/navbar/UserMenu";

type Props = {
  onMenuClick?: () => void;
};

export default function NavbarEmpleado({
  onMenuClick,
}: Props) {

  const {
    busqueda,
    setBusqueda,
    limpiarBusqueda,
  } = useSearch();


  return (

      <header
        className="
          h-[72px]
          bg-[#0f1a0f]
          border
          border-white/5
          rounded-xl

          px-5
          lg:px-6

          flex
          items-center
          justify-between

          mb-5
        "
      >

      <div
  className="
    flex
    items-center
    gap-3
    flex-1
    min-w-0
  "
>


        {/* MENU MOVIL */}

        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            w-9
            h-9
            rounded-lg
            border
            border-white/10
            flex
            items-center
            justify-center
            text-white/60
            hover:bg-white/5
            transition
          "
        >

          <Menu size={18}/>

        </button>





        {/* BUSCADOR */}

        <div
          className="
            relative
            w-full
            max-w-[260px]
            sm:max-w-[380px]
            lg:max-w-[520px]
            xl:max-w-[620px]
          "
        >

          <Search
            size={16}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-white/30
            "
          />


          <input

            type="text"

            value={busqueda}

            onChange={(e) =>
              setBusqueda(e.target.value)
            }

            placeholder="Buscar producto..."

            className="
              w-full
              bg-white/[0.03]
              border
              border-white/10
              rounded-lg
              py-3
              pl-9
              pr-10
              text-sm
              text-white
              placeholder:text-white/30
              outline-none
              focus:border-[#6db56d]/50
              transition
            "

          />


          {busqueda && (

            <button

              onClick={limpiarBusqueda}

              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-white/40
                hover:text-white
                transition
              "

            >

              <X size={15}/>

            </button>

          )}


        </div>


      </div>






      {/* USUARIO */}

<div
  className="
    flex
    items-center
    gap-2
    lg:gap-6
    shrink-0
  "
>

        {/* NOTIFICACIONES */}

        <button

          className="
            relative
            w-9
            h-9
            rounded-lg
            border
            border-white/10
            flex
            items-center
            justify-center
            hover:bg-white/5
            transition
          "

        >

          <Bell
            size={16}
            className="text-white/50"
          />


          <span

            className="
              absolute
              top-2
              right-2
              w-1.5
              h-1.5
              rounded-full
              bg-red-500
            "

          />


        </button>

        <UserMenu />


      </div>


    </header>

  );

}