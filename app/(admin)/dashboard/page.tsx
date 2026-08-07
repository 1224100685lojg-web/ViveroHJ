"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


import DashboardCard from "@/components/DashboardCard";
import InventoryTable from "@/components/Tables/InventoryTable";
import SalesChart from "@/components/Charts/InventoryChart";
import CategoryChart from "@/components/Charts/CategoryChart";
import Image from "next/image";

import { obtenerDashboardStats } from "@/lib/dashboard";

import {
  Sprout,
  AlertTriangle,
  Ban,
  Coins,
} from "lucide-react";


type User = {
  name: string;
  role: "admin" | "empleado";
};



export default function HomePage() {


  const router = useRouter();





  const [user, setUser] =
    useState<User | null>(null);



  const [stats, setStats] = useState({

    disponibles: 0,

    bajoStock: 0,

    agotados: 0,

    valorTotal: 0,

  });






  useEffect(() => {


    const stored =
      localStorage.getItem("flora-user");



    if (!stored) {

      router.replace("/");

      return;

    }



    const parsed: User =
      JSON.parse(stored);



    queueMicrotask(() => {

      setUser(parsed);

    });



  }, [router]);







  useEffect(() => {


    async function cargarStats() {


      const {
        data,
        error,
      } =
      await obtenerDashboardStats();



      if(error || !data){

        console.error(error);

        return;

      }



      setStats(data);


    }



    cargarStats();



  }, []);








  if (!user) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#111a11]
          text-white
        "
      >

        Cargando...

      </div>

    );

  }







return (
  <>
  {/* HERO */}

<div
  className="
    mb-5
    rounded-3xl
    border
    border-white/5
    bg-gradient-to-br
    from-[#1b2b1b]
    via-[#162616]
    to-[#0f1a0f]
    p-6

    flex
    items-center
    justify-between
  "
>

  <div>

    <p className="text-sm text-white/40">
      Panel de administración
    </p>

    <h1
      className="
        mt-2
        text-4xl
        font-bold
        text-white
      "
    >
      Bienvenido,
      <span className="text-[#82c982]">
        {" "}
        {user.name}
      </span>
    </h1>

    <p className="mt-3 text-white/50">
      Consulta el estado del inventario y administra los
      productos del vivero.
    </p>

  </div>

<div
className="
  object-contain
  transition-all
  duration-300
  hover:scale-105
  drop-shadow-[0_0_20px_rgba(109,181,109,0.35)]
"
>
  <Image
    src="/images/logo.png"
    alt="Logo Vivero HJ"
    width={80}
    height={80}
    className="
      object-contain
      drop-shadow-lg
    "
    priority
  />
</div>

</div>
    {/* TARJETAS KPI */}

    <div
      className="
        grid
        grid-cols-1
        xs:grid-cols-2
        md:grid-cols-2
        xl:grid-cols-4
        gap-4
        mt-0
        mb-5
      "
    >
    </div>

    {/* TABLA */}

<div
  className="
    rounded-3xl

    border
    border-white/5

    bg-[#131f13]

    p-5

    shadow-xl

    mb-8
  "
>
      <InventoryTable />
    </div>

    {/* GRAFICAS */}

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-[1fr_300px]
        gap-5
        mt-5
        w-full
      "
    >
      <div
  className="
    min-w-0

    rounded-3xl

    border
    border-white/5

    bg-[#131f13]

    p-5
  "
>
        <SalesChart periodo="semana" />
      </div>

      <div
  className="
    min-w-0

    rounded-3xl

    border
    border-white/5

    bg-[#131f13]

    p-5
  "
>
        <CategoryChart />
      </div>
    </div>
  </>
);

}