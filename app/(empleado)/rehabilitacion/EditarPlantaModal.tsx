"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import type { Planta } from "@/types/planta";


type Props = {
  open: boolean;
  planta: Planta | null;
  onClose: () => void;
  onSave: () => void;
};



export default function EditarPlantaModal({
  open,
  planta,
  onClose,
  onSave,
}: Props) {

  const [medicionNueva, setMedicionNueva] = useState("");
  const [medicionMeta, setMedicionMeta] = useState("");

  const [estado, setEstado] =
    useState<
      "Desarrollo" |
      "Rehabilitación" |
      "Lista" |
      "Crítica"
    >("Desarrollo");


  const [responsable, setResponsable] =
    useState("");


  const [observacion, setObservacion] =
    useState("");


  const [proximoCuidado, setProximoCuidado] =
    useState("");


  const [guardando, setGuardando] =
    useState(false);



useEffect(() => {

  if(!planta)
    return;


  setMedicionNueva(
    planta.medicionActual?.toString() ?? ""
  );


  setMedicionMeta(
    planta.medicionMeta?.toString() ?? ""
  );


  setEstado(planta.estado);


  setResponsable(
    planta.responsable ?? ""
  );


  setProximoCuidado(
    planta.proximoCuidado &&
    planta.proximoCuidado !== "-"
      ? planta.proximoCuidado
      : ""
  );


  setObservacion("");

}, [planta]);





  if(!open || !planta)
    return null;





  async function guardarSeguimiento(){
  if(!planta)
    return;
    try{


      setGuardando(true);



      const nuevaMedicion =
        Number(medicionNueva);



        if (
          Number.isNaN(nuevaMedicion) ||
          Number.isNaN(Number(medicionMeta))
        ) {

          alert(
            "Ingresa mediciones válidas."
          );

          return;

        }





      const incremento =
        nuevaMedicion -
        planta.medicionActual;






      // 1. Actualizar planta actual

      const { error: updateError } =
        await supabase
          .from("rehabilitaciones")
            .update({
              altura_actual: nuevaMedicion,
              medicion_actual: nuevaMedicion,

              altura_meta: medicionMeta
                ? Number(medicionMeta)
                : null,

              medicion_meta: medicionMeta
                ? Number(medicionMeta)
                : null,

              estado,
              responsable,
              proximo_cuidado: proximoCuidado || null
            })
          .eq(
            "id",
            planta.id
          );



      if(updateError)
        throw updateError;







      // 2. Crear historial

      const { error: historialError } =
        await supabase
          .from("historial_rehabilitacion")
          .insert({

            rehabilitacion_id:
              planta.id,


            altura_anterior:
              planta.medicionActual,


            altura_nueva:
              nuevaMedicion,


            incremento,


            estado,


            observacion:
              observacion || null,


            responsable,


            fecha:
              new Date()
              .toISOString()

          });




      if(historialError)
        throw historialError;







      alert(
        "Medición registrada correctamente."
      );



      onSave();

      onClose();





    }catch(error:any){


      console.error(
        "ERROR REGISTRANDO SEGUIMIENTO:",
        error
      );


      alert(
        error.message ??
        "No se pudo registrar."
      );



    }finally{

      setGuardando(false);

    }


  }







  const inputStyle = `
    w-full
    mt-2
    rounded-lg
    border
    border-white/10
    bg-white/5
    px-3
    py-2
    text-white
  `;





  return (

    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      "
    >


      <div
        className="
        w-[500px]
        rounded-xl
        border
        border-white/10
        bg-[#0f1a0f]
        p-6
        "
      >


        <h2
          className="
          text-xl
          font-semibold
          text-white
          "
        >
          Registrar seguimiento
        </h2>



        <p
          className="
          mt-1
          text-sm
          text-white/40
          "
        >
          {planta.nombre}
        </p>





        <div className="mt-6 space-y-4">





          <div>

            <label className="text-sm text-white/60">
              Altura actual
            </label>

            <p className="text-xs text-white/40">
              Actual: {planta.medicionActual} cm
            </p>


            <input
              type="number"
              placeholder="Nueva medición cm"
              value={medicionNueva}
              onChange={
                e =>
                setMedicionNueva(
                  e.target.value
                )
              }
              className={inputStyle}
            />


          </div>

          <div>
            <label className="text-sm text-white/60">
              Meta de crecimiento
            </label>

            <input
              type="number"
              value={medicionMeta}
              onChange={(e) =>
                setMedicionMeta(e.target.value)
              }
              className={inputStyle}
            />
          </div>





          <div>

            <label className="text-sm text-white/60">
              Estado
            </label>


            <select
              value={estado}
              onChange={
                e =>
                setEstado(
                  e.target.value as any
                )
              }
              className={inputStyle}
            >

              <option>
                Desarrollo
              </option>

              <option>
                Rehabilitación
              </option>

              <option>
                Lista
              </option>

              <option>
                Crítica
              </option>


            </select>

          </div>








          <div>

            <label className="text-sm text-white/60">
              Observación
            </label>


            <textarea

              value={observacion}

              onChange={
                e =>
                setObservacion(
                  e.target.value
                )
              }

              placeholder="Ej. Mejor coloración, nuevas hojas..."

              className={inputStyle}

            />

          </div>








          <div>

            <label className="text-sm text-white/60">
              Responsable
            </label>


            <input

              value={responsable}

              onChange={
                e =>
                setResponsable(
                  e.target.value
                )
              }

              className={inputStyle}

            />

          </div>







          <div>

            <label className="text-sm text-white/60">
              Próximo cuidado
            </label>


            <input

              type="date"

              value={proximoCuidado}

              onChange={
                e =>
                setProximoCuidado(
                  e.target.value
                )
              }

              className={inputStyle}

            />

          </div>



        </div>







        <div
          className="
          flex
          justify-end
          gap-3
          mt-8
          "
        >

          <button
            onClick={onClose}
            className="
            rounded-lg
            bg-white/5
            px-5
            py-2
            text-white/60
            "
          >
            Cancelar
          </button>




          <button
            disabled={guardando}
            onClick={guardarSeguimiento}
            className="
            rounded-lg
            bg-[#6db56d]/20
            px-5
            py-2
            text-[#a8d5a8]
            "
          >

            {
              guardando
              ? "Registrando..."
              : "Registrar medición"
            }

          </button>



        </div>



      </div>


    </div>

  );

}