"use client";

import { useState } from "react";
import { X, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/app/(empleado)/CartContext";
import type { Producto } from "@/lib/inventario";


type Props = {
  producto: Producto | null;
  open: boolean;
  onClose: () => void;
};


export default function ProductQuickModal({
  producto,
  open,
  onClose,
}: Props) {


  const { agregarProducto } = useCart();


  const [cantidad, setCantidad] = useState(1);



  if (!open || !producto) return null;



  function disminuir() {

    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }

  }



function aumentar() {

  if (!producto) return;

  if (cantidad < producto.stock) {
    setCantidad(cantidad + 1);
  }

}



function agregar() {

  if (!producto) return;

  agregarProducto(
    {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio_venta,
      stock: producto.stock,
    },
    cantidad
  );

  setCantidad(1);
  onClose();
}




  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/60
        flex
        items-end
        sm:items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >


      <div
        className="
          w-full
          max-w-md
          bg-[#101b10]
          border
          border-white/10
          rounded-2xl
          p-5
          shadow-xl
        "
        onClick={(e)=>e.stopPropagation()}
      >



        {/* HEADER */}

        <div
          className="
            flex
            justify-between
            items-center
            mb-4
          "
        >

          <h2 className="text-lg font-semibold text-white">
            Agregar producto
          </h2>


          <button
            onClick={onClose}
            className="
              text-white/40
              hover:text-white
            "
          >

            <X size={20}/>

          </button>


        </div>





        {/* PRODUCTO */}


        <div
          className="
            flex
            gap-4
            items-center
          "
        >


          <div
            className="
              w-20
              h-20
              rounded-xl
              overflow-hidden
              bg-[#6db56d]/10
              flex
              items-center
              justify-center
            "
          >

            {
              producto.imagen
              ?
              (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              )
              :
              (
                <span className="text-3xl">
                  🌿
                </span>
              )
            }


          </div>



          <div>


            <p
              className="
                text-xs
                text-white/40
              "
            >
              {producto.categorias?.nombre ?? "Producto"}
            </p>


            <h3
              className="
                text-white
                font-medium
                mt-1
              "
            >
              {producto.nombre}
            </h3>


            <p
              className="
                text-[#a8d5a8]
                font-semibold
                mt-1
              "
            >
              ${producto.precio_venta}
            </p>


          </div>


        </div>





        {/* CANTIDAD */}


        <div
          className="
            mt-6
            flex
            justify-between
            items-center
          "
        >

          <div>

            <p className="text-sm text-white">
              Cantidad
            </p>

            <p className="text-xs text-white/40">
              Stock disponible: {producto.stock}
            </p>

          </div>



          <div
            className="
              flex
              items-center
              gap-3
              bg-white/5
              rounded-xl
              px-3
              py-2
            "
          >

            <button
              onClick={disminuir}
              className="
                text-white/70
              "
            >
              <Minus size={18}/>
            </button>



            <span className="text-white w-5 text-center">
              {cantidad}
            </span>



            <button
              onClick={aumentar}
              className="
                text-white/70
              "
            >
              <Plus size={18}/>
            </button>


          </div>


        </div>





        {/* BOTON */}


        <button
          onClick={agregar}
          className="
            w-full
            mt-6
            py-3
            rounded-xl
            bg-[#6db56d]/20
            text-[#a8d5a8]
            flex
            items-center
            justify-center
            gap-2
            hover:bg-[#6db56d]/30
            transition
          "
        >

          <ShoppingCart size={18}/>

          Agregar al carrito

        </button>



      </div>


    </div>

  );

}