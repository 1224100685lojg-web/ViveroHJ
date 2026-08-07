"use client";

import {
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  Clock3,
} from "lucide-react";


type Props = {
  productos: number;
  articulos: number;
  total: number;
};



export default function SaleStats({
  productos,
  articulos,
  total,
}: Props) {


  const hora = new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });



  const cards = [
    {
      titulo: "Productos",
      valor: productos,
      descripcion: "disponibles",
      icono: ShoppingBag,
      dinero: false,
    },
    {
      titulo: "En carrito",
      valor: articulos,
      descripcion: "artículos",
      icono: ShoppingCart,
      dinero: false,
    },
    {
      titulo: "Total",
      valor: `$${total.toFixed(2)}`,
      descripcion: "venta actual",
      icono: DollarSign,
      dinero: true,
    },
    {
      titulo: "Hora",
      valor: hora,
      descripcion: "caja abierta",
      icono: Clock3,
      dinero: false,
    },
  ];



  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-4
        mt-6
        mb-6
      "
    >


      {cards.map((card) => {


        const Icon = card.icono;


        return (

          <div
            key={card.titulo}
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


            <div
              className="
                w-9
                h-9
                rounded-lg
                bg-[#6db56d]/10
                flex
                items-center
                justify-center
                mb-4
              "
            >

              <Icon
                size={18}
                className="text-[#a8d5a8]"
              />

            </div>




            <p
              className="
                text-xs
                text-white/40
              "
            >
              {card.titulo}
            </p>



            <h2
              className={`
                mt-2
                text-2xl
                font-semibold
                truncate

                ${
                  card.dinero
                    ? "text-[#a8d5a8]"
                    : "text-white"
                }
              `}
            >

              {card.valor}

            </h2>




            <p
              className="
                text-xs
                text-white/30
                mt-1
              "
            >
              {card.descripcion}

            </p>



          </div>

        );

      })}


    </div>

  );

}