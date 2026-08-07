import { supabase } from "./supabase";


export type DashboardStats = {
  disponibles: number;
  bajoStock: number;
  agotados: number;
  valorTotal: number;
};



export async function obtenerDashboardStats() {


  const {
    data: productos,
    error,

  } = await supabase

    .from("productos")

    .select(`
      stock,
      stock_minimo,
      precio_venta
    `)

    .eq("activo", true);





  if (error) {


    console.error(
      "Error obteniendo estadísticas:",
      error
    );


    return {

      data: null,

      error,

    };


  }





  let disponibles = 0;

  let bajoStock = 0;

  let agotados = 0;

  let valorTotal = 0;






  productos?.forEach((producto)=>{



    const stock =

      producto.stock ?? 0;




    const minimo =

      producto.stock_minimo ?? 0;





    const precio =

      Number(producto.precio_venta ?? 0);








    // Total de plantas disponibles

    disponibles += stock;






    // Estados del inventario


    if(stock === 0){


      agotados++;


    }

    else if(stock <= minimo){


      bajoStock++;


    }







    // Valor económico del inventario


    valorTotal +=

      stock * precio;



  });







  return {


    data:{


      disponibles,

      bajoStock,

      agotados,

      valorTotal,


    },


    error:null,


  };



}