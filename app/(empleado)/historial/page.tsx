"use client";

import { useEffect, useMemo, useState } from "react";

import SalesFilters from "./SalesFilters";
import HistorialCard from "./HistorialCard";
import VentaDetalleModal from "./VentaDetalleModal";
import { useSearch } from "@/context/SearchContext";

import { obtenerHistorialVentas } from "@/lib/ventas";


type Venta = {
  id: string;
  folio: string;
  cliente: string;
  fecha: string;
  productos: number;
  total: number;
  estado: "Completada" | "Pendiente";
  metodoPago: string;
  empleado: string;

  detalleProductos: {
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
};



export default function HistorialPage() {
  const { busqueda } = useSearch();
  const [ventas, setVentas] = useState<Venta[]>([]);

  const [cargando, setCargando] = useState(true);

  const [ventaSeleccionada, setVentaSeleccionada] =
    useState<Venta | null>(null);



  const [modalAbierto, setModalAbierto] =
    useState(false);





  const [estado, setEstado] =
    useState("Todos");



  const [desde, setDesde] =
    useState("");



  const [hasta, setHasta] =
    useState("");




  useEffect(() => {

    cargarVentas();

  }, []);




  async function cargarVentas(){


    try {


      setCargando(true);



      const data =
        await obtenerHistorialVentas();



      console.log(
        "VENTAS BD:",
        data
      );



      const ventasFormateadas: Venta[] =
        data.map((venta:any)=>(

        {


          id: venta.id,


          folio:
            venta.id
              .substring(0,8)
              .toUpperCase(),



          cliente:
            venta.clientes?.nombre ??
            "Público General",



          fecha:
            venta.fecha
              .split("T")[0],



          productos:
            venta.detalle_ventas?.length ?? 0,



          total:
            Number(venta.total),



          estado:
            venta.estado === "completada"
              ? "Completada"
              : "Pendiente",



          metodoPago:
            venta.metodo_pago ??
            "Efectivo",



          empleado:
            venta.usuarios?.nombre ??
            "Empleado",




          detalleProductos:


            venta.detalle_ventas?.map(
              (detalle:any)=>({


                nombre:
                  detalle.productos?.nombre ??
                  "Producto",



                cantidad:
                  detalle.cantidad,



                precio:
                  Number(
                    detalle.precio_unitario
                  )


              })

            ) ?? []

        }

      ));



      setVentas(
        ventasFormateadas
      );



    } catch(error){


      console.error(
        "ERROR CARGANDO HISTORIAL:",
        error
      );



    } finally {


      setCargando(false);


    }

  }





  const ventasFiltradas = useMemo(() => {


    return ventas.filter((venta)=>{


const texto = busqueda.toLowerCase();

const coincideBusqueda =
  venta.folio
    .toLowerCase()
    .includes(texto)
  ||
  venta.cliente
    .toLowerCase()
    .includes(texto)
  ||
  venta.empleado
    .toLowerCase()
    .includes(texto)
  ||
  venta.metodoPago
    .toLowerCase()
    .includes(texto);




      const coincideEstado =

        estado === "Todos"

        ||

        venta.estado === estado;





      const coincideDesde =

        !desde

        ||

        venta.fecha >= desde;





      const coincideHasta =

        !hasta

        ||

        venta.fecha <= hasta;




      return (

        coincideBusqueda

        &&

        coincideEstado

        &&

        coincideDesde

        &&

        coincideHasta

      );


    });


  },[
    ventas,
    busqueda,
    estado,
    desde,
    hasta
  ]);






  const totalVentas =
    ventasFiltradas.length;




  const totalVendido =
    ventasFiltradas.reduce(

      (acc,venta)=>
        acc + venta.total,

      0

    );




  const promedio =

    totalVentas > 0

      ?

      totalVendido / totalVentas

      :

      0;






  return (

    <>


      <div className="space-y-5 md:space-y-6">



        <div className="
          bg-white/[0.03]
          border
          border-white/5
          rounded-xl
          p-4
          sm:p-5
          lg:p-6
        ">



          <h1 className="
            text-xl
            sm:text-2xl
            font-semibold
            text-white
          ">

            Historial de Ventas

          </h1>




          <p className="
            text-sm
            sm:text-base
            text-white/40
            mt-2
          ">

            Consulta todas las ventas realizadas por el sistema.

          </p>




          <div className="
            grid
            grid-cols-2
            xl:grid-cols-4
            gap-3
            sm:gap-4
            mt-6
          ">



            <InfoCard
              title="Ventas encontradas"
              value={String(totalVentas)}
            />



            <InfoCard
              title="Completadas"
              value={String(
                ventasFiltradas.filter(
                  (v)=>
                    v.estado === "Completada"
                ).length
              )}
            />



            <InfoCard
              title="Total vendido"
              value={`$${totalVendido.toFixed(2)}`}
              highlight
            />



            <InfoCard
              title="Promedio"
              value={`$${promedio.toFixed(2)}`}
            />



          </div>



        </div>





        <SalesFilters
          estado={estado}
          setEstado={setEstado}
          desde={desde}
          setDesde={setDesde}
          hasta={hasta}
          setHasta={setHasta}
        />






        <div className="space-y-4">


          {
          cargando ? (


            <div className="
              text-center
              text-white/40
              py-10
            ">

              Cargando ventas...


            </div>



          )

          :


          ventasFiltradas.length > 0 ? (



            ventasFiltradas.map((venta)=>(


              <HistorialCard

                key={venta.id}

                folio={venta.folio}

                cliente={venta.cliente}

                fecha={venta.fecha}

                productos={venta.productos}

                total={venta.total}

                estado={venta.estado}


                onVerDetalle={()=>{


                  setVentaSeleccionada(
                    venta
                  );


                  setModalAbierto(
                    true
                  );


                }}

              />


            ))



          )

          :



          (

            <div className="
              bg-white/[0.03]
              border
              border-white/5
              rounded-xl
              py-12
              sm:py-16
              text-center
            ">


              <h2 className="
                text-lg
                sm:text-xl
                text-white
                font-semibold
              ">

                No se encontraron ventas

              </h2>



              <p className="
                text-sm
                sm:text-base
                text-white/40
                mt-2
              ">

                Prueba cambiando los filtros de búsqueda.

              </p>


            </div>

          )

          }



        </div>



      </div>







      <VentaDetalleModal


        open={modalAbierto}


        onClose={()=>{


          setModalAbierto(false);

          setVentaSeleccionada(null);


        }}



        venta={

          ventaSeleccionada

          ?

          {


            folio:
              ventaSeleccionada.folio,


            cliente:
              ventaSeleccionada.cliente,


            fecha:
              ventaSeleccionada.fecha,


            metodoPago:
              ventaSeleccionada.metodoPago,


            empleado:
              ventaSeleccionada.empleado,


            productos:
              ventaSeleccionada.detalleProductos,


            total:
              ventaSeleccionada.total,


          }


          :

          null

        }


      />



    </>

  );

}





function InfoCard({
  title,
  value,
  highlight = false,
}: {
  title:string;
  value:string;
  highlight?:boolean;
}) {


return (

<div className="
bg-white/[0.03]
border
border-white/5
rounded-lg
p-3
sm:p-4
">


<p className="
text-[11px]
sm:text-xs
text-white/30
">

{title}

</p>



<p
className={`

mt-2

text-lg

sm:text-xl

font-semibold

break-words

${
highlight
?
"text-[#a8d5a8]"
:
"text-white"
}

`}
>

{value}

</p>


</div>

);


}