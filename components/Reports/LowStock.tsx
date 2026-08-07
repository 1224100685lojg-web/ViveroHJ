"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

import { supabase } from "@/lib/supabase";


type ProductoStock = {
  id: string;
  nombre: string;
  stock: number;
  stock_minimo: number;
};




export default function LowStock() {


  const [
    productos,
    setProductos
  ] = useState<ProductoStock[]>([]);



  const [
    loading,
    setLoading
  ] = useState(true);








  useEffect(() => {

    cargarStockBajo();

  }, []);







  async function cargarStockBajo() {


    try {


      setLoading(true);



      const {
        data,
        error
      }
      =
      await supabase
        .from("productos")
        .select(`
          id,
          nombre,
          stock,
          stock_minimo
        `)
        .eq(
          "activo",
          true
        )
        .order(
          "stock",
          {
            ascending:true,
          }
        );





      if(error){

        throw error;

      }






      const productosBajos =

        (data ?? [])
        .map((producto)=>({

          id:
            producto.id,

          nombre:
            producto.nombre,

          stock:
            Number(
              producto.stock ?? 0
            ),

          stock_minimo:
            Number(
              producto.stock_minimo ?? 0
            ),

        }))
        .filter(
          (producto)=>
            producto.stock <=
            producto.stock_minimo
        )
        .sort(
          (a,b)=>
            a.stock -
            b.stock
        )
        .slice(0,5);







      setProductos(
        productosBajos
      );



    }
    catch(error){


      console.error(
        "Error cargando stock bajo:",
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
        Productos con stock bajo
      </h2>





      <p
        className="
          mt-2
          text-sm
          text-white/40
        "
      >
        Productos que necesitan reposición.
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
            Revisando inventario...
          </p>

        )}









        {!loading &&
        productos.length === 0 && (

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
              size={20}
              className="text-[#6db56d]"
            />


            <p
              className="
                text-sm
                text-white/50
              "
            >
              No hay productos con stock bajo.
            </p>


          </div>

        )}








        {productos.map(
          (producto)=>(


            <div
              key={producto.id}
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
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500/10
                    text-red-300
                  "
                >

                  <AlertTriangle
                    size={16}
                  />

                </div>








                <div>


                  <p
                    className="
                      text-sm
                      font-medium
                      text-white
                    "
                  >
                    {producto.nombre}
                  </p>





                  <p
                    className="
                      text-xs
                      text-white/40
                    "
                  >
                    Mínimo requerido:
                    {" "}
                    {producto.stock_minimo}
                  </p>



                </div>





              </div>








              <div
                className="
                  text-right
                "
              >


                <p
                  className="
                    text-sm
                    font-semibold
                    text-red-300
                  "
                >
                  {producto.stock}
                </p>




                <p
                  className="
                    text-xs
                    text-white/40
                  "
                >
                  disponibles
                </p>




              </div>





            </div>


          )

        )}

      </div>

    </div>

  );

}