"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import PlantaCard from "./PlantaCard";
import PlantaTable from "./PlantaTable";
import PlantaModal from "./PlantaModal";
import EditarPlantaModal from "./EditarPlantaModal";
import HistorialModal from "./HistorialModal";
import { useSearch } from "@/context/SearchContext";
import type { Planta } from "@/types/planta";





export default function RehabilitacionPage() {
const { busqueda } = useSearch();

const [plantas, setPlantas] = useState<Planta[]>([]);

const [modalAbierto, setModalAbierto] = useState(false);

const [plantaEditar, setPlantaEditar] =
    useState<Planta | null>(null);

const [plantaHistorial, setPlantaHistorial] =
    useState<Planta | null>(null);

const [cuidadosPendientes, setCuidadosPendientes] = useState(0);

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

  producto_id:item.producto_id,

  codigo:
    item.productos?.codigo ??
    "SIN-CODIGO",

  nombre:
    item.productos?.nombre ??
    "Sin nombre",

  nombre_cientifico:
    item.productos?.nombre_cientifico ?? null,

  tipo:
    item.productos?.tipo ?? null,

  tipoMedicion:
    item.tipo_medicion ?? "altura",

  imagen:
    item.imagen ?? null,

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

    const hoy = new Date()
  .toISOString()
  .split("T")[0];


const pendientes =
  plantasFormateadas.filter(
    (planta) =>
    planta.proximoCuidado &&
    planta.proximoCuidado !== "-" &&
    planta.proximoCuidado <= hoy
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
        p=>p.id !== id
      )
    );

    await cargarPlantas();


  }






  function editarPlanta(
    planta:Planta
  ){

    setPlantaEditar(
      planta
    );

  }






function verHistorial(
  planta: Planta
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
const plantasFiltradas = plantas.filter((planta) => {

  const texto = busqueda.toLowerCase();

  return (

    (planta.codigo ?? "")
      .toLowerCase()
      .includes(texto)

    ||

    planta.nombre
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

    (planta.responsable ?? "")
      .toLowerCase()
      .includes(texto)

    ||

    planta.estado
      .toLowerCase()
      .includes(texto)

  );

});






  return (

    <>


      <div className="space-y-5 md:space-y-6">



        <div>

          <h1 className="
            text-xl
            sm:text-2xl
            font-semibold
            text-white
          ">
            Rehabilitación y Desarrollo
          </h1>


          <p className="
            text-sm
            text-white/40
            mt-2
          ">
            Seguimiento del crecimiento, rehabilitación y cuidados de las plantas.
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
          bg-white/[0.03]
          border
          border-white/5
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





          </div>







                <PlantaTable
                  plantas={plantasFiltradas}
                  onDelete={eliminarPlanta}
                  onEdit={editarPlanta}
                  onHistory={verHistorial}
                />



        </div>



      </div>







      <PlantaModal
        open={modalAbierto}
        onClose={() =>
          setModalAbierto(false)
        }
        onSave={agregarPlanta}
      />







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