"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import PlantaCard from "@/app/(empleado)/rehabilitacion/PlantaCard"; 
import PlantaTable from "@/app/(empleado)/rehabilitacion/PlantaTable"; 
import PlantaModal from "@/app/(empleado)/rehabilitacion/PlantaModal"; 
import EditarPlantaModal from "@/app/(empleado)/rehabilitacion/EditarPlantaModal"; 
import HistorialModal from "@/app/(empleado)/rehabilitacion/HistorialModal";
import { useSearch } from "@/context/SearchContext";
import type { Planta } from "@/types/planta";



type Props = {
  modo?: "admin" | "empleado";
};



export default function RehabilitacionView({
  modo = "empleado"
}: Props) {

  const { busqueda } = useSearch();


  const esAdmin = modo === "admin";


  const [plantas, setPlantas] =
    useState<Planta[]>([]);


  const [modalAbierto, setModalAbierto] =
    useState(false);


  const [plantaEditar, setPlantaEditar] =
    useState<Planta | null>(null);


  const [plantaHistorial, setPlantaHistorial] =
    useState<Planta | null>(null);

const [cuidadosPendientes,setCuidadosPendientes]
=
useState(0);

  const [historialAbierto, setHistorialAbierto] =
    useState(false);

    





  useEffect(() => {

    cargarPlantas();

  }, []);





  async function cargarPlantas() {


const { data, error } =
await supabase
.from("rehabilitaciones")
.select(`
  id,
  producto_id,

  tipo_medicion,
  medicion_actual,
  medicion_meta,

  estado,

  responsable_id,

  proximo_cuidado,

  productos!inner(
    id,
    codigo,
    nombre,
    nombre_cientifico,
    imagen,
    tipo,
    ubicacion
  ),

  usuarios(
    nombre
  )
`);


    if(error){

      console.error(
        "ERROR REHABILITACIONES:",
        error
      );

      return;

    }




    const plantasFormateadas: Planta[] =
      (data ?? []).map((item:any)=>({

        id:item.id,


        producto_id:
          item.producto_id,


        codigo:
          item.productos?.codigo ??
          item.productos?.[0]?.codigo ??
          "SIN-CODIGO",


        nombre:
          item.productos?.nombre ??
          item.productos?.[0]?.nombre ??
          "Sin nombre",


          nombre_cientifico:
            item.productos?.nombre_cientifico ??
            item.productos?.[0]?.nombre_cientifico ??
            null,

          tipo:
            item.productos?.tipo ??
            item.productos?.[0]?.tipo ??
            null,

          imagen:
            item.productos?.imagen ??
            item.productos?.[0]?.imagen ??
            null,

tipoMedicion:
  item.tipo_medicion ?? "altura",


        medicionActual:
        Number(
          item.medicion_actual ?? 0
        ),


        medicionMeta:
        item.medicion_meta
        ? Number(item.medicion_meta)
        : null,

        porcentajeRecuperacion:
        Number(
          item.porcentaje_recuperacion ?? 0
        ),
                estado:
                  item.estado ??
                  "Desarrollo",

        responsable:
        item.usuarios?.nombre ??
        "Sin asignar",


        proximoCuidado:
          item.proximo_cuidado ??
          "-"

      }));



    setPlantas(
      plantasFormateadas
    );

    const hoy =
new Date()
.toISOString()
.split("T")[0];


const pendientes =
plantasFormateadas.filter(
  (p) =>
    p.proximoCuidado &&
    p.proximoCuidado !== "-" &&
    p.proximoCuidado <= hoy
).length;


setCuidadosPendientes(
pendientes
);



  }





  async function agregarPlanta(){

    await cargarPlantas();

  }







  async function eliminarPlanta(
    id:string
  ){


    if(
      !confirm(
        "¿Eliminar esta planta?"
      )
    )
      return;



    const { error } =
      await supabase
        .from("rehabilitaciones")
        .delete()
        .eq(
          "id",
          id
        );



    if(error){

      console.error(
        "ERROR ELIMINAR:",
        error
      );


      alert(
        "No se pudo eliminar la planta"
      );


      return;

    }



    setPlantas(prev =>
      prev.filter(
        p => p.id !== id
      )
    );

  }







  function editarPlanta(
    planta:Planta
  ){

    setPlantaEditar(
      planta
    );

  }







  function verHistorial(
    planta:Planta
  ){

    setPlantaHistorial(
      planta
    );


    setHistorialAbierto(
      true
    );

  }








  const enRehabilitacion =
    plantas.filter(
      p =>
      p.estado === "Rehabilitación"
    ).length;



  const listasVenta =
    plantas.filter(
      p =>
      p.estado === "Lista"
    ).length;

    const plantasFiltradas = plantas.filter((planta)=>{

  const texto = busqueda.toLowerCase();


  return (

    planta.nombre
      .toLowerCase()
      .includes(texto)


    ||

(planta.codigo ?? "")
  .toLowerCase()
  .includes(texto)


    ||

    (planta.nombre_cientifico ?? "")
      .toLowerCase()
      .includes(texto)


    ||

    (planta.tipo ?? "")
      .toLowerCase()
      .includes(texto)


    ||

    planta.estado
      .toLowerCase()
      .includes(texto)


    ||

    (planta.responsable ?? "")
      .toLowerCase()
      .includes(texto)

  );

});






  return (

    <>


      <div
        className="
          min-h-screen
          rounded-2xl
          bg-[#0f1a0f]
          p-6
          space-y-5
          md:space-y-6
        "
      >



        <div>


          <h1 className="
            text-xl
            sm:text-2xl
            font-semibold
            text-white
          ">


            {
              esAdmin
              ? "Administración de Rehabilitación"
              : "Rehabilitación y Desarrollo"
            }


          </h1>




          <p className="
            text-sm
            text-white/50
            mt-2
          ">


            {
              esAdmin
              ?
              "Gestión completa de plantas, estados, responsables e historial."
              :
              "Seguimiento del crecimiento, rehabilitación y cuidados de las plantas."
            }


          </p>


        </div>






        <div className="
          grid
          grid-cols-2
          xl:grid-cols-4
          gap-3
          sm:gap-4
        ">



          <PlantaCard
            title="Plantas registradas"
            value={
              plantas.length.toString()
            }
          />



          <PlantaCard
            title="En rehabilitación"
            value={
              enRehabilitacion.toString()
            }
          />



          <PlantaCard
            title="Listas para venta"
            value={
              listasVenta.toString()
            }
          />



          <PlantaCard
          title="Cuidados pendientes"
          value={
            cuidadosPendientes.toString()
          }
          />


        </div>








        <div className="
          bg-[#162616]
          border
          border-[#274127]
          rounded-xl
          p-4
          sm:p-5
        ">



          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-5
          ">



            <div>


              <h2 className="
                text-white
                font-medium
              ">

                Plantas registradas

              </h2>



              <p className="
                text-xs
                text-white/40
                mt-1
              ">

                Control de crecimiento y rehabilitación.

              </p>


            </div>





            {
              esAdmin && (

                <button
                  onClick={() =>
                    setModalAbierto(true)
                  }
                  className="
                    w-full
                    sm:w-auto
                    px-4
                    py-3
                    rounded-lg
                    bg-[#6db56d]/20
                    text-[#a8d5a8]
                    text-sm
                    hover:bg-[#6db56d]/30
                    transition
                  "
                >

                  + Registrar Planta

                </button>

              )
            }



          </div>







          <PlantaTable
            plantas={plantasFiltradas}
            onDelete={
              esAdmin
              ? eliminarPlanta
              : undefined
            }
            onEdit={
              esAdmin
              ? editarPlanta
              : undefined
            }
            onHistory={verHistorial}
          />



        </div>



      </div>







      {
        esAdmin && (

          <PlantaModal
            open={modalAbierto}
            onClose={() =>
              setModalAbierto(false)
            }
            onSave={agregarPlanta}
          />

        )
      }







      {
        esAdmin && (

          <EditarPlantaModal
            open={
              !!plantaEditar
            }
            planta={
              plantaEditar
            }
            onClose={() =>
              setPlantaEditar(null)
            }
            onSave={
              cargarPlantas
            }
          />

        )
      }







      <HistorialModal

        open={
          historialAbierto
        }

        planta={
          plantaHistorial
        }

        onClose={() => {

          setHistorialAbierto(false);

          setPlantaHistorial(null);

        }}

      />



    </>

  );

}