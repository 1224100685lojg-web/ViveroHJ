"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

import { supabase } from "@/lib/supabase";
import { obtenerPedidos } from "@/lib/pedidos";

import PedidoModal from "../Modals/PedidoModal";
import { useSearch } from "@/context/SearchContext";
import {
  buscarTexto
} from "@/lib/busqueda";

type Pedido = {
  id: string;
  cliente: string;
  telefono: string | null;
  producto: string;
  cantidad: number;
  observaciones: string | null;
  estado: string;
  fecha_entrega: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string | null;
};



type Props = {
  pedidos?: Pedido[];
  busqueda?: string;
  onRefresh?: () => void;
};



const estados = [
  "Todos",
  "Pendiente",
  "En búsqueda",
  "Conseguido",
  "Entregado",
  "Cancelado",
] as const;



export default function PedidosTable({
  pedidos,
  onRefresh,
}: Props) {

  const { busqueda } = useSearch();


  const [pedidosInternos, setPedidosInternos] =
    useState<Pedido[]>([]);


  const [openModal, setOpenModal] =
    useState(false);


  const [pedidoEditar, setPedidoEditar] =
    useState<Pedido | null>(null);



  const [filtroEstado, setFiltroEstado] =
    useState<(typeof estados)[number]>("Todos");



  async function cargarPedidos() {

    const { data, error } =
      await obtenerPedidos();


    if (error) {

      console.error(error);

      return;

    }


    setPedidosInternos(
      (data ?? []) as Pedido[]
    );

  }




  useEffect(() => {

    if (!pedidos) {
      cargarPedidos();
    }

  }, []);





  const listaPedidos =
    pedidos ?? pedidosInternos;






  async function eliminarPedido(id:string){


    const confirmar =
      confirm(
        "¿Deseas eliminar este pedido?"
      );


    if(!confirmar) return;



    const {error} =
      await supabase
        .from("pedidos")
        .update({
          activo:false,
          updated_at:new Date().toISOString(),
        })
        .eq("id",id);



    if(error){

      alert(error.message);

      return;

    }



    onRefresh
      ? onRefresh()
      : cargarPedidos();


  }





  const pedidosFiltrados =
    listaPedidos.filter((pedido)=>{


      const texto =
        busqueda.toLowerCase();



const coincideBusqueda =

buscarTexto(
  pedido.cliente,
  busqueda
)

||

buscarTexto(
  pedido.producto,
  busqueda
)

||

buscarTexto(
  pedido.telefono ?? "",
  busqueda
)

||

buscarTexto(
  pedido.estado,
  busqueda
)

||

buscarTexto(
  pedido.observaciones ?? "",
  busqueda
);



      const coincideEstado =

        filtroEstado === "Todos"

        ||

        pedido.estado === filtroEstado;



      return (
        coincideBusqueda &&
        coincideEstado
      );


    });





  const total =
    listaPedidos.length;


  const pendientes =
    listaPedidos.filter(
      p=>p.estado==="Pendiente"
    ).length;



  const busquedaCount =
    listaPedidos.filter(
      p=>p.estado==="En búsqueda"
    ).length;



  const conseguidos =
    listaPedidos.filter(
      p=>p.estado==="Conseguido"
    ).length;



  const entregados =
    listaPedidos.filter(
      p=>p.estado==="Entregado"
    ).length;





  function colorEstado(estado:string){


    switch(estado){

      case "Pendiente":
        return "bg-yellow-500/10 text-yellow-300";


      case "En búsqueda":
        return "bg-blue-500/10 text-blue-300";


      case "Conseguido":
        return "bg-green-500/10 text-green-300";


      case "Entregado":
        return "bg-emerald-500/10 text-emerald-300";


      case "Cancelado":
        return "bg-red-500/10 text-red-300";


      default:
        return "bg-white/10 text-white";

    }

  }





  return (

<div className="space-y-6">



{/* ESTADÍSTICAS */}

<div className="
grid
gap-4
sm:grid-cols-2
xl:grid-cols-5
">


{[
["Total",total],
["Pendientes",pendientes],
["En búsqueda",busquedaCount],
["Conseguidos",conseguidos],
["Entregados",entregados],
].map(([titulo,valor])=>(


<div
key={titulo}
className="
rounded-2xl
border
border-[#274127]
bg-[#0f1a0f]
p-5
"
>


<p className="text-xs uppercase text-white/40">
{titulo}
</p>


<p className="
mt-2
text-3xl
font-bold
text-white
">
{valor}
</p>


</div>


))}


</div>





{/* PANEL TABLA */}


<div className="
overflow-hidden
rounded-2xl
border
border-[#274127]
bg-[#0f1a0f]
">



<div className="
flex
flex-col
gap-4
border-b
border-[#274127]
p-5

md:flex-row
md:items-center
md:justify-between
">


<h2 className="
text-lg
font-semibold
text-white
">
Pedidos registrados
</h2>



<button

onClick={()=>{

setPedidoEditar(null);

setOpenModal(true);

}}

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-[#6db56d]
px-4
py-2
text-sm
font-medium
text-black
"
>

<Plus size={16}/>

Nuevo pedido

</button>



</div>





{/* FILTROS */}


<div className="
flex
flex-wrap
gap-2
p-5
">


{estados.map((estado)=>(


<button

key={estado}

onClick={()=>
setFiltroEstado(estado)
}


className={`
rounded-xl
px-4
py-2
text-sm
transition

${
filtroEstado===estado

?

"bg-[#6db56d] text-black"

:

"bg-[#162616] text-white/70 hover:bg-[#203520]"

}

`}

>

{estado}

</button>


))}


</div>






{/* TABLA */}


<div className="overflow-x-auto">


<table className="
w-full
text-left
">


<thead className="
border-y
border-[#274127]
text-xs
uppercase
text-white/40
">


<tr>

<th className="px-5 py-4">
Cliente
</th>

<th className="px-5 py-4">
Producto
</th>

<th className="px-5 py-4">
Cantidad
</th>

<th className="px-5 py-4">
Estado
</th>

<th className="px-5 py-4">
Entrega
</th>

<th className="px-5 py-4 text-right">
Acciones
</th>


</tr>


</thead>





<tbody>


{pedidosFiltrados.map((pedido)=>(


<tr
key={pedido.id}
className="
border-b
border-[#274127]
hover:bg-[#162616]
"
>


<td className="px-5 py-4 text-white">

<div>
{pedido.cliente}
</div>

<p className="text-xs text-white/40">
{pedido.telefono ?? "Sin teléfono"}
</p>

</td>



<td className="px-5 py-4 text-white">
{pedido.producto}
</td>



<td className="px-5 py-4 text-white">
{pedido.cantidad}
</td>



<td className="px-5 py-4">

<span
className={`
rounded-full
px-3
py-1
text-xs
${colorEstado(pedido.estado)}
`}
>

{pedido.estado}

</span>

</td>



<td className="px-5 py-4 text-white/70">

{
pedido.fecha_entrega
?
new Date(
pedido.fecha_entrega
).toLocaleDateString("es-MX")
:
"Sin fecha"
}

</td>



<td className="
px-5
py-4
text-right
">


<div className="
flex
justify-end
gap-2
">


<button

onClick={()=>{

setPedidoEditar(pedido);

setOpenModal(true);

}}

className="
rounded-lg
bg-blue-500/10
p-2
text-blue-300
hover:bg-blue-500/20
"

>

<Pencil size={16}/>

</button>




<button

onClick={()=>
eliminarPedido(pedido.id)
}

className="
rounded-lg
bg-red-500/10
p-2
text-red-300
hover:bg-red-500/20
"

>

<Trash2 size={16}/>

</button>



</div>


</td>



</tr>


))}


</tbody>


</table>


</div>


</div>





<PedidoModal

open={openModal}

pedido={pedidoEditar}

onClose={()=>{

setOpenModal(false);

setPedidoEditar(null);

}}


onSaved={()=>{

setOpenModal(false);

setPedidoEditar(null);


onRefresh
?
onRefresh()
:
cargarPedidos();


}}

/>


</div>


);


}