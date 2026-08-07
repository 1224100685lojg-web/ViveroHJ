"use client";

import { useEffect, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";


import ProductModal from "../Modals/ProductModal";
import ProductDetailsDrawer from "../Inventario/ProductDetailsDrawer";

import { supabase } from "@/lib/supabase";
import { obtenerProductos, type Producto } from "@/lib/inventario";




type Props = {

  productos?: Producto[];

  onRefresh?:()=>void;

};







export default function InventoryTable({
  productos,
  onRefresh,
}:Props){
const { busqueda } = useSearch();
const [productosInternos,setProductosInternos] =
useState<Producto[]>([]);




const [openModal,setOpenModal] =
useState(false);



const [productoEditar,setProductoEditar] =
useState<Producto | null>(null);




const [productoVer,setProductoVer] =
useState<Producto | null>(null);



const [openDrawer,setOpenDrawer] =
useState(false);





const [filtroEstado,setFiltroEstado] =
useState<
"Todos" | "Disponible" | "Bajo stock" | "Agotado"
>("Todos");







async function cargarProductosInternos(){



const {
data,
error
}=await obtenerProductos();




if(error){

console.error(
"Error cargando productos:",
error
);

return;

}




setProductosInternos(
(data ?? []) as Producto[]
);



}







useEffect(()=>{


if(!productos){

cargarProductosInternos();

}


},[productos]);







const listaProductos =
productos ?? productosInternos;









async function eliminarProducto(id:string){



const confirmar =
confirm(
"¿Deseas eliminar este producto?"
);



if(!confirmar)
return;






const {
error
}
=
await supabase
.from("productos")
.update({

activo:false,

updated_at:
new Date().toISOString()

})
.eq("id",id);





if(error){

alert(error.message);

return;

}





onRefresh
?
onRefresh()
:
cargarProductosInternos();



}









const productosFiltrados =

listaProductos.filter((producto)=>{



const texto = busqueda
  .toLowerCase()
  .trim()
  .split(" ")
  .filter(Boolean);



const camposBusqueda = [

  producto.nombre,

  producto.codigo,

  producto.nombre_cientifico,

  producto.ubicacion,

  producto.tipo,

  producto.descripcion,

]

.map(
  campo =>
    (campo ?? "")
      .toLowerCase()
);



const coincideBusqueda =
  texto.every(
    palabra =>
      camposBusqueda.some(
        campo =>
          campo.includes(palabra)
      )
  );








const estado =


producto.stock === 0


?


"Agotado"



:


producto.stock <= producto.stock_minimo


?


"Bajo stock"



:


"Disponible";








const coincideEstado =


filtroEstado === "Todos"

||

estado === filtroEstado;







return (

coincideBusqueda

&&

coincideEstado

);



});
  return (

    <div className="w-full">


      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-white/5
          bg-[#0f1a0f]
        "
      >



        {/* HEADER TABLA */}

        <div
          className="
            border-b
            border-white/5
            px-5
            py-4
          "
        >

          <div className="space-y-3">


            <h2 className="text-sm font-medium text-white">
              Inventario de plantas
            </h2>



            <div className="flex flex-wrap gap-2">


              {
              [
                "Todos",
                "Disponible",
                "Bajo stock",
                "Agotado",
              ].map((estado)=>(


                <button

                  key={estado}

                  onClick={()=>setFiltroEstado(
                    estado as
                    "Todos" |
                    "Disponible" |
                    "Bajo stock" |
                    "Agotado"
                  )}


                  className={`
                    rounded-lg
                    px-3
                    py-1.5
                    text-xs
                    transition

                    ${
                    filtroEstado === estado

                    ?

                    "bg-[#6db56d] text-black"

                    :

                    "bg-white/5 text-white/60 hover:bg-white/10"

                    }
                  `}

                >

                  {estado}

                </button>


              ))
              }


            </div>


          </div>


        </div>







        {/* TABLA */}


        <div className="overflow-x-auto">


          <table className="w-full">



            <thead className="bg-[#111a11]">


              <tr>


                <th
                className="
                px-5
                py-3
                text-left
                text-[10px]
                uppercase
                text-white/40
                "
                >
                  Código
                </th>



                <th
                className="
                px-5
                py-3
                text-left
                text-[10px]
                uppercase
                text-white/40
                "
                >
                  Planta
                </th>



                <th
                className="
                px-5
                py-3
                text-left
                text-[10px]
                uppercase
                text-white/40
                "
                >
                  Ubicación
                </th>




                <th
                className="
                px-5
                py-3
                text-left
                text-[10px]
                uppercase
                text-white/40
                "
                >
                  Stock
                </th>




                <th
                className="
                px-5
                py-3
                text-left
                text-[10px]
                uppercase
                text-white/40
                "
                >
                  Precio venta
                </th>




                <th
                className="
                px-5
                py-3
                text-left
                text-[10px]
                uppercase
                text-white/40
                "
                >
                  Estado
                </th>




                <th
                className="
                px-5
                py-3
                text-center
                text-[10px]
                uppercase
                text-white/40
                "
                >
                  Acciones
                </th>


              </tr>


            </thead>







            <tbody>




            {
            productosFiltrados.length === 0 && (


              <tr>


                <td
                colSpan={7}
                className="
                py-10
                text-center
                text-white/40
                "
                >

                  No se encontraron productos.

                </td>


              </tr>


            )
            }








            {
            productosFiltrados.map((producto)=>{



              const estado =


              producto.stock === 0

              ?

              "Agotado"


              :


              producto.stock <= producto.stock_minimo

              ?

              "Bajo stock"


              :

              "Disponible";







              return (


              <tr

              key={producto.id}

              className="
              border-t
              border-white/5
              transition
              hover:bg-white/[0.02]
              "

              >





              {/* CODIGO */}


              <td
              className="
              px-5
              py-4
              text-xs
              text-white/40
              "
              >

                {producto.codigo ?? "-"}

              </td>








              {/* PRODUCTO */}


              <td
              className="
              px-5
              py-4
              "
              >



                <div
                className="
                flex
                items-center
                gap-4
                "
                >



                {
                producto.imagen

                ?

                <img

                src={producto.imagen}

                alt={producto.nombre}

                className="
                h-12
                w-12
                rounded-lg
                object-cover
                border
                border-white/10
                "

                />


                :


                <div
                className="
                h-12
                w-12
                rounded-lg
                bg-white/5
                flex
                items-center
                justify-center
                text-xs
                text-white/30
                "
                >

                  N/A

                </div>

                }







                <div>


                  <div
                  className="
                  font-medium
                  text-white
                  "
                  >

                    {producto.nombre}

                  </div>



                  {
                  producto.nombre_cientifico && (


                    <div
                    className="
                    mt-1
                    text-xs
                    italic
                    text-white/40
                    "
                    >

                      {producto.nombre_cientifico}

                    </div>


                  )
                  }



                </div>



                </div>



              </td>









              {/* UBICACION */}


              <td
              className="
              px-5
              py-4
              text-sm
              text-white/70
              "
              >

                {
                producto.ubicacion
                ??
                "-"
                }


              </td>








              {/* STOCK */}


              <td
              className="
              px-5
              py-4
              text-sm
              text-white/70
              "
              >

                {producto.stock}

              </td>









              {/* PRECIO */}


              <td
              className="
              px-5
              py-4
              text-sm
              text-white/70
              "
              >

              $
              {
              Number(producto.precio_venta)
              .toLocaleString(
                "es-MX",
                {
                  minimumFractionDigits:2
                }
              )
              }


              </td>









              {/* ESTADO */}


              <td
              className="
              px-5
              py-4
              "
              >


              <span

              className={`

              rounded-full

              px-3
              py-1

              text-[10px]

              font-medium


              ${
              estado === "Disponible"

              ?

              "bg-green-500/10 text-green-400"


              :


              estado === "Bajo stock"

              ?

              "bg-yellow-500/10 text-yellow-400"


              :

              "bg-red-500/10 text-red-400"

              }


              `}

              >

                {estado}

              </span>


              </td>









              {/* ACCIONES */}


              <td
              className="
              px-5
              py-4
              "
              >


              <div
              className="
              flex
              justify-center
              gap-2
              "
              >




              <button

              onClick={()=>{

                setProductoVer(producto);

                setOpenDrawer(true);

              }}

              className="
              rounded-lg
              bg-white/5
              p-2
              hover:bg-green-500/20
              "

              >

                <Eye
                size={16}
                className="text-green-400"
                />

              </button>







              <button

              onClick={()=>{

                setProductoEditar(producto);

                setOpenModal(true);

              }}

              className="
              rounded-lg
              bg-white/5
              p-2
              hover:bg-blue-500/20
              "

              >

                <Pencil
                size={16}
                className="text-blue-400"
                />

              </button>







              <button

              onClick={()=>eliminarProducto(producto.id)}

              className="
              rounded-lg
              bg-white/5
              p-2
              hover:bg-red-500/20
              "

              >

                <Trash2
                size={16}
                className="text-red-400"
                />

              </button>




              </div>



              </td>






              </tr>


              );


            })
            }



            </tbody>


          </table>


        </div>


      </div>









      {/* MODAL EDITAR */}


      <ProductModal

      open={openModal}

      producto={productoEditar}


      onClose={()=>{

        setOpenModal(false);

        setProductoEditar(null);

      }}



      onSaved={()=>{


        onRefresh

        ?

        onRefresh()

        :

        cargarProductosInternos();



        setOpenModal(false);

        setProductoEditar(null);


      }}

      />









      {/* DETALLE */}


      <ProductDetailsDrawer


      open={openDrawer}


      producto={productoVer}


      onClose={()=>{


        setOpenDrawer(false);

        setProductoVer(null);


      }}


      onEdit={()=>{


        setOpenDrawer(false);


        setTimeout(()=>{


          setProductoEditar(productoVer);

          setProductoVer(null);

          setOpenModal(true);



        },300);


      }}


      />





    </div>

  );

}

