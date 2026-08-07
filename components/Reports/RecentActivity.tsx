"use client";

import { useEffect, useState } from "react";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
  CheckCircle2,
} from "lucide-react";

import { obtenerMovimientos } from "@/lib/inventario";
import type { Periodo } from "@/types/reportes";



type Props = {
  periodo?: Periodo;
    fechaInicio?: string;
  fechaFin?: string;
};



type Movimiento = {

  id: string;

  tipo:
    | "ENTRADA"
    | "SALIDA"
    | "AJUSTE";

  cantidad: number;

  created_at: string;

  productos:
    | {
        nombre:string;
      }
    | null;

};






function tiempoTranscurrido(
  fecha:string
){


  const ahora =
    new Date();


  const fechaMovimiento =
    new Date(fecha);



  const diferencia =
    Math.floor(
      (
        ahora.getTime()
        -
        fechaMovimiento.getTime()
      )
      /
      1000
    );



  const minutos =
    Math.floor(
      diferencia / 60
    );



  const horas =
    Math.floor(
      minutos / 60
    );



  const dias =
    Math.floor(
      horas / 24
    );



  if(minutos < 1){

    return "Hace unos segundos";

  }



  if(minutos < 60){

    return `Hace ${minutos} min`;

  }



  if(horas < 24){

    return `Hace ${horas} h`;

  }



  return `Hace ${dias} días`;

}









export default function RecentActivity({

  periodo = "hoy",

}:Props){



  const [
    movimientos,
    setMovimientos
  ] =
  useState<Movimiento[]>([]);




  const [
    loading,
    setLoading
  ] =
  useState(true);









  useEffect(()=>{


    cargarActividad();


  },[periodo]);









  async function cargarActividad(){


    try{


      setLoading(true);




      const {
        data,
        error
      }
      =
      await obtenerMovimientos();





      if(error){

        throw error;

      }







      const ahora =
        new Date();




      const fechaLimite =
        new Date();






      switch(periodo){


        case "hoy":

          fechaLimite.setHours(
            0,
            0,
            0,
            0
          );

        break;




        case "semana":

          fechaLimite.setDate(
            ahora.getDate() - 7
          );

        break;




        case "mes":

          fechaLimite.setDate(
            ahora.getDate() - 30
          );

        break;




        case "personalizado":

          fechaLimite.setDate(
            ahora.getDate() - 365
          );

        break;


      }









      const filtrados =

        (data ?? [])

        .filter((mov)=>{


          return (
            new Date(
              mov.created_at
            )
            >=
            fechaLimite
          );


        })

        .sort(
          (a,b)=>
            new Date(
              b.created_at
            ).getTime()
            -
            new Date(
              a.created_at
            ).getTime()
        )

        .slice(0,5)

        .map((mov)=>({

          ...mov,

          cantidad:
            Number(
              mov.cantidad ?? 0
            )

        }));







      setMovimientos(
        filtrados as Movimiento[]
      );



    }
    catch(error){


      console.error(
        "Error cargando actividad:",
        error
      );


      setMovimientos([]);


    }
    finally{


      setLoading(false);


    }


  }









  return (

    <div>



      <h2
        className="
          text-lg
          font-semibold
          text-white
        "
      >
        Actividad reciente
      </h2>





      <p
        className="
          mt-2
          text-sm
          text-white/40
        "
      >
        Últimos movimientos registrados.
      </p>








      <div
        className="
          mt-5
          space-y-3
        "
      >






        {loading && (

          <p
            className="
              text-sm
              text-white/40
            "
          >
            Cargando actividad...
          </p>

        )}








        {!loading &&
        movimientos.length === 0 && (

          <div
            className="
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/5
              bg-[#0f1a0f]
              p-4
            "
          >

            <CheckCircle2
              size={18}
              className="text-[#6db56d]"
            />

            <p
              className="
                text-sm
                text-white/50
              "
            >
              No hay movimientos registrados en este periodo.
            </p>


          </div>

        )}








        {movimientos.map(
          (movimiento)=>(


            <div
              key={
                movimiento.id
              }
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-white/5
                bg-[#0f1a0f]
                px-4
                py-3
              "
            >





              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >





                <div
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full

                    ${
                      movimiento.tipo === "ENTRADA"
                      ?
                      "bg-green-500/10 text-green-300"
                      :
                      movimiento.tipo === "SALIDA"
                      ?
                      "bg-red-500/10 text-red-300"
                      :
                      "bg-blue-500/10 text-blue-300"
                    }
                  `}
                >



                  {
                    movimiento.tipo === "ENTRADA"
                    ?
                    <ArrowUpCircle size={17}/>

                    :

                    movimiento.tipo === "SALIDA"
                    ?

                    <ArrowDownCircle size={17}/>

                    :

                    <RefreshCcw size={17}/>

                  }



                </div>







                <div>


                  <p
                    className="
                      text-sm
                      font-medium
                      text-white
                    "
                  >

                    {
                      movimiento.productos?.nombre
                      ??
                      "Producto"
                    }


                  </p>





                  <p
                    className="
                      text-xs
                      text-white/40
                    "
                  >

                    {movimiento.tipo}

                    {" • "}

                    {
                      tiempoTranscurrido(
                        movimiento.created_at
                      )
                    }


                  </p>



                </div>




              </div>








              <div
                className={`
                  text-sm
                  font-semibold

                  ${
                    movimiento.tipo === "ENTRADA"
                    ?
                    "text-green-300"
                    :
                    movimiento.tipo === "SALIDA"
                    ?
                    "text-red-300"
                    :
                    "text-blue-300"
                  }
                `}
              >


                {
                  movimiento.tipo === "ENTRADA"
                  ?
                  "+"
                  :
                  movimiento.tipo === "SALIDA"
                  ?
                  "-"
                  :
                  "~"
                }


                {
                  movimiento.cantidad
                }



              </div>







            </div>


          )

        )}







      </div>





    </div>

  );

}