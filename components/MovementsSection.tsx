"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

import DashboardCard from "@/components/DashboardCard";
import MovementsTable from "@/components/Tables/MovementsTable";
import { useSearch } from "@/context/SearchContext";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  PackageCheck,
  ClipboardList,
} from "lucide-react";
import type { Movimiento } from "@/types/movimientos";


export default function MovementsSection() {


  const { busqueda } = useSearch();


  const [movimientos, setMovimientos] =
    useState<Movimiento[]>([]);


  const [loading, setLoading] =
    useState(true);





  async function cargarMovimientos() {


    setLoading(true);


    const { data, error } =
      await supabase
        .from("movimientos_inventario")
        .select(`
          *,
          productos(
            nombre,
            codigo
          ),
          usuarios(
            nombre
          )
        `)
        .order(
          "created_at",
          {
            ascending:false
          }
        );



    if(error){

      console.error(
        "ERROR MOVIMIENTOS:",
        error
      );

    } else {


      setMovimientos(
        (data as Movimiento[]) ?? []
      );


    }


    setLoading(false);


  }





  useEffect(()=>{

    void cargarMovimientos();

  },[]);







  const estadisticas = useMemo(()=>{


    const ahora = new Date();


    const inicioMes =
      new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        1
      );


    const hoy =
      ahora.toDateString();



    let entradas = 0;

    let salidas = 0;

    let movimientosHoy = 0;

    let movimientosMes = 0;

    let apartados = 0;

    let pedidos = 0;





    movimientos.forEach((m)=>{


      const fecha =
        new Date(m.created_at);




      if(fecha >= inicioMes){


        movimientosMes++;


        if(m.tipo === "ENTRADA")
          entradas++;


        if(m.tipo === "SALIDA")
          salidas++;


        if(m.tipo === "APARTADO")
          apartados++;


        if(m.tipo === "PEDIDO")
          pedidos++;


      }




      if(
        fecha.toDateString() === hoy
      ){

        movimientosHoy++;

      }



    });




    return {

      entradas,

      salidas,

      apartados,

      pedidos,

      movimientosHoy,

      movimientosMes,

    };


  },[movimientos]);









  const movimientosFiltrados =
    movimientos.filter((movimiento)=>{


      const texto =
        busqueda.toLowerCase();



      return (


        movimiento.productos?.nombre
          .toLowerCase()
          .includes(texto)



        ||



        (movimiento.productos?.codigo ?? "")
          .toLowerCase()
          .includes(texto)



        ||



        (movimiento.motivo ?? "")
          .toLowerCase()
          .includes(texto)



        ||



        movimiento.tipo
          .toLowerCase()
          .includes(texto)


      );


    });









  return (

    <div className="space-y-5">



<div
  className="
    mx-auto
    grid
    max-w-6xl
    grid-cols-1
    gap-4
    md:grid-cols-3
  "
>



        <DashboardCard

          title="Entradas"

          value={
            loading
            ? "..."
            : String(estadisticas.entradas)
          }

          subtitle="Este mes"

          subtitleColor="#6db56d"

          icon={
            <ArrowDownCircle size={16}/>
          }

          iconBg="rgba(107,181,107,.15)"

          iconColor="#6db56d"

        />





        <DashboardCard

          title="Salidas"

          value={
            loading
            ? "..."
            : String(estadisticas.salidas)
          }

          subtitle="Este mes"

          subtitleColor="#f09595"

          icon={
            <ArrowUpCircle size={16}/>
          }

          iconBg="rgba(226,75,74,.15)"

          iconColor="#f09595"

        />





        <DashboardCard

          title="Apartados"

          value={
            loading
            ? "..."
            : String(estadisticas.apartados)
          }

          subtitle="Este mes"

          subtitleColor="#fac775"

          icon={
            <PackageCheck size={16}/>
          }

          iconBg="rgba(239,159,39,.15)"

          iconColor="#fac775"

        />





 



      </div>






      <MovementsTable

        movimientos={
          movimientosFiltrados
        }

        loading={loading}

      />




    </div>

  );

}