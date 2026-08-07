"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

type Props = {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  imagen?: string | null;
  categoria?: string;
  onOpen?: () => void;
};


export default function ProductCard({
  id,
  nombre,
  precio,
  stock,
  imagen,
  categoria = "Producto",
  onOpen,
}: Props) {


const { agregarProducto } = useCart();

const disponible = stock > 0;

function manejarAgregar() {

  const esMovil = window.innerWidth < 1024;


  if (esMovil && onOpen) {
    onOpen();
    return;
  }


  agregarProducto({
    id,
    nombre,
    precio,
    stock,
  });

}



  return (

    <div
      className="
        bg-white/[0.03]
        border
        border-white/5
        rounded-xl
        overflow-hidden
        transition
        hover:border-[#6db56d]/30
      "
    >


{/* IMAGEN PRODUCTO */}

<div
  className="
    h-28
    bg-[#6db56d]/10
    flex
    items-center
    justify-center
    overflow-hidden
  "
>
  {imagen ? (
    <img
      src={imagen}
      alt={nombre}
      className="
        w-full
        h-full
        object-cover
      "
    />
  ) : (
    <span className="text-4xl">
      🌿
    </span>
  )}
</div>





      {/* INFORMACIÓN */}

      <div className="p-3">


        <p
          className="
            text-[11px]
            text-white/40
          "
        >
          {categoria}
        </p>



        <h3
          className="
            text-sm
            font-medium
            text-white
            truncate
            mt-1
          "
        >
          {nombre}
        </h3>




        <div
          className="
            flex
            justify-between
            items-center
            mt-3
          "
        >


          <span
            className="
              text-lg
              font-semibold
              text-[#a8d5a8]
            "
          >
            ${precio}
          </span>



          <span
            className="
              text-xs
              text-white/40
            "
          >
            Stock {stock}
          </span>


        </div>





        <button

          disabled={!disponible}


onClick={manejarAgregar}


          className={`
            w-full
            mt-3
            py-2.5
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            text-sm
            transition

            ${
              disponible
                ? 
                `
                bg-[#6db56d]/20
                text-[#a8d5a8]
                hover:bg-[#6db56d]/30
                `
                :
                `
                bg-white/5
                text-white/30
                cursor-not-allowed
                `
            }
          `}
        >

          <ShoppingCart size={15}/>

          {disponible ? "Agregar" : "Agotado"}


        </button>


      </div>


    </div>

  );

}