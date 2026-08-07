"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Periodo } from "@/types/reportes";

type Props = {

  periodo?: Periodo;

  fechaInicio?: string;

  fechaFin?: string;

  onLoaded: (stats: {
    ventas: number;
    productos: number;
    promedio: number;
  }) => void;

};



export default function ReportsStats({

  periodo = "mes",

  fechaInicio,

  fechaFin,

  onLoaded,

}: Props) {



useEffect(() => {

  cargar();

}, [
  periodo,
  fechaInicio,
  fechaFin
]);





function obtenerFechaInicio(periodo: Periodo) {


  const fecha = new Date();



  switch(periodo){


    case "hoy":

      fecha.setHours(
        0,
        0,
        0,
        0
      );

      break;



    case "semana":

      fecha.setDate(
        fecha.getDate() - 7
      );

      break;



    case "mes":

      fecha.setDate(
        fecha.getDate() - 30
      );

      break;



  }


  return fecha;

}





async function cargar(){


try {



let inicioPeriodo =
  obtenerFechaInicio(periodo);


let finPeriodo =
  new Date();




if(
  periodo === "personalizado"
  &&
  fechaInicio
  &&
  fechaFin
){


  inicioPeriodo =
    new Date(fechaInicio);



  finPeriodo =
    new Date(fechaFin);



  finPeriodo.setHours(
    23,
    59,
    59,
    999
  );


}





// =====================================
// VENTAS TOTALES
// =====================================



const {
  data: ventas,
  error:errorVentas

}

=
await supabase

.from("ventas")

.select(
  "id,total, fecha"
)

.eq(
  "estado",
  "completada"
)

.gte(
  "fecha",
  inicioPeriodo.toISOString()
)

.lte(
  "fecha",
  finPeriodo.toISOString()
);





if(errorVentas){

 throw errorVentas;

}





const totalVentas =

ventas?.reduce(

(acc, venta)=>

acc +
Number(
  venta.total ?? 0
),

0

)

??

0;





const numeroVentas =
  ventas?.length ?? 0;



const promedio =

numeroVentas > 0

?

totalVentas / numeroVentas

:

0;







// =====================================
// PRODUCTOS VENDIDOS
// =====================================



const idsVentas =
  ventas?.map((venta: any) => venta.id) ?? [];

let productos = 0;

if (idsVentas.length > 0) {

  const {
    data: detalle,
    error: errorDetalle,
  } = await supabase
    .from("detalle_ventas")
    .select("cantidad")
    .in("venta_id", idsVentas);

  if (errorDetalle) {
    throw errorDetalle;
  }

  productos =
    detalle?.reduce(
      (acc, item) =>
        acc + Number(item.cantidad ?? 0),
      0
    ) ?? 0;
}








onLoaded({

ventas: totalVentas,

productos,

promedio,

});





}

catch(error){



console.error(

"Error cargando estadísticas:",

error

);




onLoaded({

ventas:0,

productos:0,

promedio:0,

});



}



}





return null;


}