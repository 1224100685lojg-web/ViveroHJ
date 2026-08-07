"use client";

import { useState } from "react";

import PedidosTable from "@/components/Tables/PedidosTable";
import PedidoModal from "@/components/Modals/PedidoModal";


export default function PedidosPage() {


  const [openModal, setOpenModal] =
    useState(false);


  const [refresh, setRefresh] =
    useState(false);




  return (

    <div
      className="
        min-h-screen
        rounded-2xl
        bg-[#0f1a0f]
        p-6
        space-y-6
      "
    >





      {/* HEADER */}


      <div
        className="
          border-b
          border-[#274127]
          pb-5
        "
      >



        <h1
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          Pedidos
        </h1>



        <p
          className="
            mt-2
            text-white/50
          "
        >
          Control de solicitudes de clientes para productos no disponibles en inventario.
        </p>



      </div>









      {/* CONTENIDO PRINCIPAL */}


      <div
        className="
          rounded-2xl
          border
          border-[#274127]
          bg-[#162616]
          p-5
        "
      >



        <PedidosTable

          key={refresh.toString()}

          onRefresh={() =>
            setRefresh(!refresh)
          }

        />



      </div>









      {/* MODAL NUEVO / EDITAR */}


      <PedidoModal

        open={openModal}

        pedido={null}


        onClose={() =>
          setOpenModal(false)
        }



        onSaved={() => {

          setOpenModal(false);

          setRefresh(!refresh);

        }}


      />





    </div>

  );

}