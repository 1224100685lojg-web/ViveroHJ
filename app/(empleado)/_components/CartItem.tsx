"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { CartProduct, useCart } from "./CartContext";

type Props = {
  producto: CartProduct;
};

export default function CartItem({ producto }: Props) {

  const {
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
  } = useCart();


  const subtotal = producto.precio * producto.cantidad;


  return (

    <div
      className="
        bg-white/[0.03]
        border
        border-white/5
        rounded-xl
        p-4
        transition
        hover:border-[#6db56d]/30
      "
    >


      {/* ENCABEZADO */}

      <div className="flex justify-between items-start">


        <div className="min-w-0">

          <h3
            className="
              text-sm
              font-medium
              text-white
              truncate
            "
          >
            {producto.nombre}
          </h3>


          <p
            className="
              text-[11px]
              text-white/40
              mt-1
            "
          >
            ${producto.precio} c/u
          </p>


        </div>



        <button
          onClick={() => eliminarProducto(producto.id)}
          className="
            p-2
            rounded-lg
            text-red-300
            hover:bg-red-500/10
            transition
          "
        >
          <Trash2 size={16} />
        </button>


      </div>





      {/* CANTIDAD */}

      <div
        className="
          flex
          items-center
          justify-between
          mt-5
        "
      >

        <span
          className="
            text-sm
            text-white/40
          "
        >
          Cantidad
        </span>



        <div
          className="
            flex
            items-center
            gap-3
          "
        >


          <button
            onClick={() => disminuirCantidad(producto.id)}
            className="
              w-8
              h-8
              rounded-lg
              bg-white/5
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/10
              transition
            "
          >
            <Minus size={14}/>
          </button>



          <span
            className="
              w-6
              text-center
              text-sm
              font-medium
              text-white
            "
          >
            {producto.cantidad}
          </span>



          <button
            onClick={() => aumentarCantidad(producto.id)}
            className="
              w-8
              h-8
              rounded-lg
              bg-[#6db56d]/20
              text-[#a8d5a8]
              flex
              items-center
              justify-center
              hover:bg-[#6db56d]/30
              transition
            "
          >
            <Plus size={14}/>
          </button>


        </div>


      </div>





      {/* SEPARADOR */}

      <div
        className="
          border-t
          border-white/5
          my-5
        "
      />





      {/* INFORMACIÓN */}

      <div className="space-y-2">


        <div className="flex justify-between text-sm">

          <span className="text-white/40">
            Precio unitario
          </span>

          <span className="text-white">
            ${producto.precio}
          </span>

        </div>



        <div className="flex justify-between text-sm">

          <span className="text-white/40">
            Cantidad
          </span>

          <span className="text-white">
            {producto.cantidad}
          </span>

        </div>



        <div
          className="
            flex
            justify-between
            pt-2
          "
        >

          <span
            className="
              text-white
              font-medium
            "
          >
            Subtotal
          </span>


          <span
            className="
              text-lg
              font-semibold
              text-[#a8d5a8]
            "
          >
            ${subtotal}
          </span>


        </div>


      </div>


    </div>

  );
}