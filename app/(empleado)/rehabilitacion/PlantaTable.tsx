"use client";

import EstadoPlanta from "./EstadoPlanta";
import ProgresoCrecimiento from "./ProgresoCrecimiento";
import type { Planta } from "@/types/planta";


export type Props = {

  plantas: Planta[];

  onDelete?: (
    id:string
  ) => void;


  onEdit?: (
    planta:Planta
  ) => void;


  onHistory: (
    planta:Planta
  ) => void;

};



export default function PlantaTable({

  plantas,
  onDelete,
  onEdit,
  onHistory,

}:Props){



return (

<>


<div className="
hidden
md:block
overflow-x-auto
rounded-xl
pb-2
">


<table className="
min-w-[1200px]
w-full
text-sm
border-separate
border-spacing-y-3
">


<thead>

<tr className="
border-b
border-white/5
text-left
text-white/30
">


<th className="px-4 py-3">
Código
</th>

<th className="px-4 py-3">
Planta
</th>

<th className="px-4 py-3">
Tipo
</th>

<th className="px-4 py-3">
Altura
</th>

<th className="px-4 py-3">
Progreso
</th>

<th className="px-4 py-3">
Estado
</th>

<th className="px-4 py-3">
Responsable
</th>

<th className="px-4 py-3">
Próximo cuidado
</th>

<th className="text-center">
Acciones
</th>


</tr>

</thead>



<tbody>


{
plantas.map((planta)=>{


const porcentaje =
  planta.medicionMeta && planta.medicionMeta > 0
    ? Math.min(
        Math.round(
          (planta.medicionActual /
          planta.medicionMeta) * 100
        ),
        100
      )
    : 0;



return (

<tr
key={planta.id}
className="
bg-white/[0.02]
rounded-xl
text-white/80
hover:bg-white/[0.05]
transition
"
>



<td className="px-4 py-4">

<span className="
rounded-lg
bg-[#6db56d]/10
px-3
py-1
text-xs
text-[#a8d5a8]
">

{planta.codigo}

</span>

</td>




<td className="px-4 py-4">

  <div className="flex items-center gap-3">

    <div className="h-12 w-12 overflow-hidden rounded-lg bg-white/5">

      {planta.imagen ? (

        <img
          src={planta.imagen}
          alt={planta.nombre}
          className="h-full w-full object-cover"
        />

      ) : (

        <div className="flex h-full items-center justify-center">
          🌿
        </div>

      )}

    </div>

    <div>

      <p className="font-medium text-white">
        {planta.nombre}
      </p>

      {planta.nombre_cientifico && (

        <p className="text-xs italic text-white/40">
          {planta.nombre_cientifico}
        </p>

      )}

    </div>

  </div>

</td>




<td>

{planta.tipo}

</td>




      <td>

      <p className="text-white">

      {planta.medicionActual} cm

      </p>


      <p className="text-xs text-white/40">

      Meta:
      {
      planta.medicionMeta ?? "Sin definir"
      } cm

      </p>

      </td>




<td className="min-w-[220px]">


<ProgresoCrecimiento
actual={planta.medicionActual}
objetivo={
  planta.medicionMeta ?? 0
}
/>


<div className="
flex
justify-between
text-[11px]
text-white/40
mt-2
">


<span>
{planta.medicionActual}
{
 planta.tipoMedicion === "altura"
 ? " cm"
 : planta.tipoMedicion === "cobertura"
 ? "%"
 : ""
}
</span>


<span className="
text-[#a8d5a8]
font-medium
">

{porcentaje}%

</span>


<span>
Meta:

{
planta.medicionMeta
??
"Sin definir"
}

{
planta.tipoMedicion === "altura"
&& " cm"
}
</span>


</div>


</td>




<td>

<EstadoPlanta
estado={planta.estado}
/>

</td>




<td>

<p>
{planta.responsable ?? "Sin asignar"}
</p>


<span className="
text-xs
text-white/40
">

Encargado

</span>


</td>




<td>

{planta.proximoCuidado}

</td>





<td>

<div className="
flex
justify-center
gap-2
">


{
onEdit && (

<button

onClick={() =>
onEdit(planta)
}

className="
rounded-md
bg-blue-500/15
px-3
py-1
text-xs
text-blue-300
hover:bg-blue-500/25
"

>

Editar

</button>

)
}





<button

onClick={() =>
onHistory(planta)
}

className="
rounded-md
bg-purple-500/15
px-3
py-1
text-xs
text-purple-300
hover:bg-purple-500/25
"

>

Historial

</button>






{
onDelete && (

<button

onClick={() =>
onDelete(planta.id)
}

className="
rounded-md
bg-red-500/15
px-3
py-1
text-xs
text-red-300
hover:bg-red-500/25
"

>

Eliminar

</button>

)

}



</div>


</td>




</tr>

)


})

}



</tbody>


</table>


</div>







<div className="
md:hidden
space-y-4
">


{
plantas.map((planta)=>{


const porcentaje =
  planta.medicionMeta && planta.medicionMeta > 0
    ? Math.min(
        Math.round(
          (planta.medicionActual /
          planta.medicionMeta) * 100
        ),
        100
      )
    : 0;



return (


<div

key={planta.id}

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
p-4
space-y-4
"

>



<div className="
flex
justify-between
items-start
">


<div>

<p className="
text-xs
text-white/40
">

{planta.codigo}

</p>


<h3 className="
text-white
font-semibold
">

{planta.nombre}

</h3>


<p className="
text-sm
text-white/50
">

{planta.tipo}

</p>


</div>


<EstadoPlanta
estado={planta.estado}
/>


</div>





<ProgresoCrecimiento

actual={planta.medicionActual}

objetivo={planta.medicionMeta ?? 0}

/>



<p className="
text-right
text-xs
text-[#a8d5a8]
">

{porcentaje}% completado

</p>





<div className="
grid
grid-cols-2
gap-3
text-sm
">


<div>

<p className="text-white/40">
Responsable
</p>

<p className="text-white">

{planta.responsable}

</p>

</div>



<div>

<p className="text-white/40">
Próximo cuidado
</p>


<p className="text-white">

{planta.proximoCuidado}

</p>


</div>


</div>





<div className="
flex
gap-2
pt-2
">


{
onEdit && (

<button

onClick={() =>
onEdit(planta)
}

className="
flex-1
rounded-lg
bg-blue-500/15
py-2
text-sm
text-blue-300
"

>

Editar

</button>

)

}





<button

onClick={() =>
onHistory(planta)
}

className="
flex-1
rounded-lg
bg-purple-500/15
py-2
text-sm
text-purple-300
"

>

Historial

</button>






{
onDelete && (

<button

onClick={() =>
onDelete(planta.id)
}

className="
flex-1
rounded-lg
bg-red-500/15
py-2
text-sm
text-red-300
"

>

Eliminar

</button>

)

}



</div>



</div>


)


})

}



{
plantas.length===0 && (

<div className="
py-10
text-center
text-white/40
">

No hay plantas registradas.

</div>

)

}



</div>


</>

);


}