"use client";

import { useEffect, useState } from "react";

import InventoryTable from "@/components/Tables/InventoryTable";
import InventoryStats from "@/components/Inventario/InventoryStats";

import EntradaModal from "@/components/Modals/EntradaModal";
import SalidaModal from "@/components/Modals/SalidaModal";
import ProductModal from "@/components/Modals/ProductModal";

import { obtenerProductos, type Producto } from "@/lib/inventario";



export default function InventarioPage() {

  const [productos, setProductos] =
    useState<Producto[]>([]);


  const [openEntrada, setOpenEntrada] =
    useState(false);


  const [openSalida, setOpenSalida] =
    useState(false);

  const [openProducto, setOpenProducto] = useState(false);



  async function cargarProductos(){


    const {
      data,
      error
    } = await obtenerProductos();



    if(error){

      console.error(
        "Error cargando productos:",
        error
      );

      return;

    }



    setProductos(
      (data ?? []) as Producto[]
    );

  }




  useEffect(()=>{

    cargarProductos();

  },[]);





  return (

    <div className="rounded-2xl bg-[#0f1a0f] p-6 space-y-5">


      {/* HEADER */}

      <div className="border-b border-[#274127] pb-5">

        <h1 className="text-3xl font-bold text-white">
          Inventario
        </h1>

        <p className="mt-2 text-white/50">
          Control de existencias y movimientos
        </p>

      </div>




      {/* STATS */}

      <InventoryStats
        productos={productos}
      />







      {/* ACCIONES */}

      <div className="flex flex-wrap gap-3">


        <button
          onClick={()=>setOpenProducto(true)}
          className="
            rounded-xl
            bg-[#6db56d]
            px-5
            py-2
            text-sm
            font-medium
            text-black
          "
        >
          + Nuevo producto
        </button>



        <button
          onClick={()=>setOpenEntrada(true)}
          className="
            rounded-xl
            border
            border-[#274127]
            bg-[#162616]
            px-4
            py-2
            text-sm
            text-white
          "
        >
          ↓ Entrada
        </button>




        <button
          onClick={()=>setOpenSalida(true)}
          className="
            rounded-xl
            border
            border-[#274127]
            bg-[#162616]
            px-4
            py-2
            text-sm
            text-white
          "
        >
          ↑ Salida
        </button>


      </div>





      {/* TABLA */}

<InventoryTable
  productos={productos}
  onRefresh={cargarProductos}
/>






      {/* MODALES */}

      <EntradaModal
        open={openEntrada}
        onClose={()=>setOpenEntrada(false)}
        onSaved={()=>{

          setOpenEntrada(false);
          cargarProductos();

        }}
      />



      <SalidaModal
        open={openSalida}
        onClose={()=>setOpenSalida(false)}
        onSaved={()=>{

          setOpenSalida(false);
          cargarProductos();

        }}
      />

<ProductModal
  open={openProducto}
  onClose={() => setOpenProducto(false)}
  onSaved={() => {
    setOpenProducto(false);
    cargarProductos();
  }}
  producto={null}
/>

    </div>

  );

}