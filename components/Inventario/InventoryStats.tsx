"use client";
import {
  Package,
  DollarSign,
  AlertTriangle,
  PackageX
} from "lucide-react";

type Producto = {
  id: string;
  nombre: string;
  precio_venta: number | string | null;
  stock: number | null;
  stock_minimo: number | null;
};


type Props = {
  productos: Producto[];
};


export default function InventoryStats({
  productos,
}: Props) {


  const totalProductos =
    productos.length;



const valorInventario =
  productos.reduce(
    (total, producto) => {

      const precio =
        Number(producto.precio_venta ?? 0);

      const stock =
        Number(producto.stock ?? 0);


      return total + (precio * stock);

    },
    0
  );



const bajoStock =
  productos.filter(
    (producto) =>
      Number(producto.stock ?? 0) <=
      Number(producto.stock_minimo ?? 0) &&
      Number(producto.stock ?? 0) > 0
  ).length;



const agotados =
  productos.filter(
    (producto) =>
      Number(producto.stock ?? 0) === 0
  ).length;



const tarjetas = [
  {
    titulo: "Productos",
    valor: totalProductos,
    descripcion: "productos registrados",
    icono: <Package size={18}/>
  },

  {
    titulo: "Valor inventario",
    valor: `$${valorInventario.toLocaleString(
      "es-MX",
      {
        minimumFractionDigits: 2,
      }
    )}`,
    descripcion: "valor actual del stock",
    icono: <DollarSign size={18}/>
  },

  {
    titulo: "Bajo stock",
    valor: bajoStock,
    descripcion: "productos por surtir",
    icono: <AlertTriangle size={18}/>
  },

  {
    titulo: "Agotados",
    valor: agotados,
    descripcion: "sin existencia",
    icono: <PackageX size={18}/>
  },
];




  return (

    <div
      className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >

      {
        tarjetas.map((tarjeta) => (

          <div
            key={tarjeta.titulo}
            className="
              rounded-2xl
              border
              border-[#274127]
              bg-[#162616]
              p-5
              transition
              hover:border-[#6db56d]
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <p
                className="
                  text-sm
                  text-white/50
                "
              >
                {tarjeta.titulo}
              </p>


              <span
                className="
                  text-xl
                "
              >
                {tarjeta.icono}
              </span>

            </div>



            <h3
              className="
                mt-3
                text-3xl
                font-bold
                text-white
              "
            >
              {tarjeta.valor}
            </h3>



            <p
              className="
                mt-1
                text-xs
                text-white/40
              "
            >
              {tarjeta.descripcion}
            </p>


          </div>

        ))
      }

    </div>

  );

}