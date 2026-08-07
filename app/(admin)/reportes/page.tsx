"use client";

import { useState } from "react";

import DashboardCard from "@/components/DashboardCard";
import ReportsStats from "../../../components/Reports/ReportsStats";
import SalesChart from "@/components/Charts/SalesChart";
import TopProducts from "@/components/Reports/TopProducts";
import LowStock from "@/components/Reports/LowStock";
import RecentActivity from "@/components/Reports/RecentActivity";
import type { Periodo } from "@/types/reportes";
import {
  DollarSign,
  ArrowDownCircle,
  AlertTriangle,
} from "lucide-react";


export default function ReportesPage() {

  const [periodo, setPeriodo] =
    useState<Periodo>("hoy");


  const [fechaInicio, setFechaInicio] =
    useState("");


  const [fechaFin, setFechaFin] =
    useState("");



  const [stats, setStats] = useState({

    ventas: 0,

    productos: 0,

    promedio: 0,

  });



  const filtros = [

    {
      id: "hoy",
      label: "Hoy",
    },

    {
      id: "semana",
      label: "Semana",
    },

    {
      id: "mes",
      label: "Mes",
    },

    {
      id: "personalizado",
      label: "Personalizado",
    },

  ] as const;



  return (

<div
  className="
    rounded-2xl
    bg-[#0f1a0f]
    p-6
    space-y-6
  "
>


<ReportsStats

  periodo={periodo}

  fechaInicio={fechaInicio}

  fechaFin={fechaFin}

  onLoaded={setStats}

/>



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

Reportes

</h1>



<p

  className="
    mt-2
    text-white/50
  "

>

Estadísticas generales y análisis del vivero.

</p>


</div>





{/* TARJETAS */}


<div

className="
grid
gap-4
md:grid-cols-2
xl:grid-cols-3
"

>


<DashboardCard

title="Ventas"

value={`$${stats.ventas.toLocaleString("es-MX")}`}

subtitle="Ventas registradas"

subtitleColor="#6db56d"

icon={<DollarSign size={16}/>}

iconBg="rgba(107,181,107,.15)"

iconColor="#6db56d"

/>



<DashboardCard

title="Productos vendidos"

value={stats.productos.toString()}

subtitle="Total vendido"

subtitleColor="#9fe1cb"

icon={<ArrowDownCircle size={16}/>}

iconBg="rgba(93,202,165,.15)"

iconColor="#9fe1cb"

/>



<DashboardCard

title="Promedio por venta"

value={`$${stats.promedio.toFixed(2)}`}

subtitle="Monto promedio"

subtitleColor="#f09595"

icon={<AlertTriangle size={16}/>}

iconBg="rgba(226,75,74,.15)"

iconColor="#f09595"

/>



</div>





{/* FILTROS */}



<div

className="
flex
flex-wrap
items-center
justify-between
gap-4
"

>


<div

className="
flex
flex-wrap
gap-2
"

>


{filtros.map((filtro)=>(


<button

key={filtro.id}

onClick={()=>setPeriodo(filtro.id)}

className={`

rounded-xl

border

px-4

py-2

text-sm

transition


${

periodo === filtro.id

?

`

border-[#6db56d]

bg-[#203520]

text-white

`

:

`

border-[#274127]

bg-[#162616]

text-white/80

hover:border-[#6db56d]

hover:bg-[#203520]

`

}

`}

>


{filtro.label}


</button>


))}


</div>



</div>





{/* FECHAS PERSONALIZADAS */}



{
periodo === "personalizado" && (


<div

className="
flex
flex-wrap
gap-4
"

>


<div>


<label

className="
block
mb-1
text-sm
text-white/50
"

>

Desde

</label>



<input

type="date"

value={fechaInicio}

onChange={(e)=>

setFechaInicio(e.target.value)

}

className="
rounded-xl
border
border-[#274127]
bg-[#162616]
px-3
py-2
text-white
"

/>


</div>





<div>


<label

className="
block
mb-1
text-sm
text-white/50
"

>

Hasta

</label>



<input

type="date"

value={fechaFin}

onChange={(e)=>

setFechaFin(e.target.value)

}

className="
rounded-xl
border
border-[#274127]
bg-[#162616]
px-3
py-2
text-white
"

/>


</div>



</div>


)

}







{/* DASHBOARD DE VENTAS */}



<SalesChart

periodo={periodo}

fechaInicio={fechaInicio}

fechaFin={fechaFin}

/>







{/* PANEL INFERIOR */}



<div

className="
grid
gap-5
xl:grid-cols-3
"

>



<div

className="
rounded-2xl
border
border-[#274127]
bg-[#162616]
p-5
"

>


<TopProducts

periodo={periodo}

fechaInicio={fechaInicio}

fechaFin={fechaFin}

/>


</div>





<div

className="
rounded-2xl
border
border-[#274127]
bg-[#162616]
p-5
"

>


<LowStock />


</div>





<div

className="
rounded-2xl
border
border-[#274127]
bg-[#162616]
p-5
"

>


<RecentActivity

periodo={periodo}

fechaInicio={fechaInicio}

fechaFin={fechaFin}

/>


</div>



</div>



</div>


  );

}