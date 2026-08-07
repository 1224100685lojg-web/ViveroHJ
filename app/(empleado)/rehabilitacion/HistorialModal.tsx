"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import type { Planta } from "@/types/planta";


type Props = {
  open: boolean;
  planta: Planta | null;
  onClose: () => void;
};


type Historial = {
  id:string;
  fecha:string;
  altura_anterior:number;
  altura_nueva:number;
  estado_anterior:string;
  estado_nuevo:string;
  responsable:string;
  observaciones:string | null;
};



export default function HistorialModal({
  open,
  planta,
  onClose,
}:Props){


  const [historial,setHistorial] = useState<Historial[]>([]);
  const [cargando,setCargando] = useState(false);



  useEffect(()=>{

    if(
      !open ||
      !planta
    ) return;


    cargarHistorial();


  },[open,planta]);





  async function cargarHistorial(){


    if(!planta) return;


    try {


      setCargando(true);



      const {data,error}=await supabase
        .from("historial_rehabilitacion")
        .select("*")
        .eq(
          "rehabilitacion_id",
          planta.id
        )
        .order(
          "fecha",
          {
            ascending:false
          }
        );



      if(error)
        throw error;



      setHistorial(
        data ?? []
      );



    }catch(error){

      console.error(
        "ERROR HISTORIAL:",
        error
      );


    }finally{

      setCargando(false);

    }


  }





  if(!open || !planta)
    return null;



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
        w-[700px]
        max-h-[85vh]
        overflow-y-auto
        rounded-xl
        border
        border-white/10
        bg-[#0f1a0f]
        p-6
        "
      >



        <div className="
          flex
          justify-between
          items-center
          mb-5
        ">


          <div>

            <h2 className="
              text-xl
              font-semibold
              text-white
            ">
              Historial de crecimiento
            </h2>


            <p className="
              text-sm
              text-white/40
            ">
              {planta.nombre}
            </p>


          </div>



          <button
            onClick={onClose}
            className="
            text-white/50
            hover:text-white
            "
          >
            ✕
          </button>


        </div>





        {
          cargando && (

            <p className="
              text-white/40
              text-sm
            ">
              Cargando historial...
            </p>

          )
        }





        {
          !cargando &&
          historial.length === 0 && (

            <div className="
              rounded-lg
              bg-white/[0.03]
              p-6
              text-center
              text-white/40
            ">
              Esta planta todavía no tiene cambios registrados.
            </div>

          )
        }





        <div className="space-y-4">


        {
          historial.map((item)=>(


            <div
              key={item.id}
              className="
              rounded-xl
              border
              border-white/10
              bg-white/[0.03]
              p-4
              "
            >


              <div className="
                flex
                justify-between
                mb-3
              ">

                <span className="
                  text-sm
                  text-[#a8d5a8]
                ">
                  {item.fecha}
                </span>


                <span className="
                  text-xs
                  text-white/40
                ">
                  {item.responsable}
                </span>

              </div>




              <div className="
                grid
                grid-cols-2
                gap-4
                text-sm
              ">


                <div>

                  <p className="text-white/40">
                    Altura
                  </p>

                  <p className="text-white">
                    {item.altura_anterior} cm → {item.altura_nueva} cm
                  </p>

                </div>



                <div>

                  <p className="text-white/40">
                    Estado
                  </p>

                  <p className="text-white">
                    {item.estado_anterior} → {item.estado_nuevo}
                  </p>

                </div>


              </div>





              {
                item.observaciones && (

                  <p className="
                    mt-4
                    text-sm
                    text-white/60
                  ">
                    {item.observaciones}
                  </p>

                )
              }



            </div>


          ))
        }


        </div>






        <div className="
          flex
          justify-end
          mt-6
        ">


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
            Cerrar
          </button>


        </div>




      </div>


    </div>

  );

}