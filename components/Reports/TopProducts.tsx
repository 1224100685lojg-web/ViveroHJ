"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type { Periodo } from "@/types/reportes";


type Props = {
  periodo?: Periodo;
    fechaInicio?: string;
  fechaFin?: string;
};


type ProductoMovimiento = {
  nombre: string;
  movimientos: number;
};




export default function TopProducts({
  periodo = "hoy",
}: Props) {


  const [productos, setProductos] =
    useState<ProductoMovimiento[]>([]);


  const [loading, setLoading] =
    useState(true);





  useEffect(() => {

    cargarProductos();

  }, [periodo]);







  async function cargarProductos() {


    try {


      setLoading(true);



      const {
        data,
        error
      } =
      await supabase
        .from("movimientos_inventario")
        .select(`
          cantidad,
          tipo,
          created_at,
          productos(
            nombre
          )
        `);




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








      const resumen:
        Record<string, ProductoMovimiento>
      = {};







      data?.forEach((mov)=>{



        const fechaMovimiento =
          new Date(
            mov.created_at
          );





        if(
          fechaMovimiento < fechaLimite
        ){

          return;

        }






        const producto =
          Array.isArray(
            mov.productos
          )
          ? mov.productos[0]
          : mov.productos;







        const nombre =
          producto?.nombre ??
          "Producto sin nombre";







        if(!resumen[nombre]){


          resumen[nombre] = {

            nombre,

            movimientos:0,

          };


        }







        resumen[nombre].movimientos +=
          Number(
            mov.cantidad ?? 0
          );



      });









      const ordenados =
        Object.values(resumen)
        .sort(
          (a,b)=>
            b.movimientos -
            a.movimientos
        )
        .slice(0,5);







      setProductos(
        ordenados
      );



    }
    catch(error){


      console.error(
        "Error cargando productos principales:",
        error
      );


      setProductos([]);


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
        Productos con mayor movimiento
      </h2>





      <p
        className="
          mt-2
          text-sm
          text-white/40
        "
      >
        Productos con más movimientos registrados.
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
            Cargando productos...
          </p>

        )}








        {!loading &&
        productos.length === 0 && (

          <p
            className="
              text-sm
              text-white/40
            "
          >
            No se encontraron productos con movimientos en este periodo.
          </p>

        )}








        {!loading &&
        productos.map(
          (producto,index)=>(


            <div
              key={producto.nombre}
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





                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-[#203520]
                    text-sm
                    text-[#6db56d]
                  "
                >
                  {index + 1}
                </span>






                <p
                  className="
                    text-sm
                    text-white
                  "
                >
                  {producto.nombre}
                </p>




              </div>








              <span
                className="
                  text-sm
                  text-[#9fe1cb]
                "
              >

                {producto.movimientos}


                <span
                  className="
                    ml-1
                    text-white/40
                  "
                >
                  movimientos
                </span>


              </span>







            </div>


          )

        )}







      </div>





    </div>

  );

}