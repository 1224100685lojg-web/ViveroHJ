import EstadoApartado from "./EstadoApartado";


type Apartado = {
  id:string;
  folio:string;
  cliente:string;
  producto:string;
  total:number;
  anticipo:number;
  pendiente:number;
  estado:string;
  entrega:string;
};


type Props = {

  apartados: Apartado[];

  onCancelar:(id:string)=>void;

  onFinalizar:(apartado: Apartado)=>void;

};






export default function ApartadoTable({

  apartados,

  onCancelar,

  onFinalizar,

}:Props){





return (



<div

className="
overflow-x-auto
"

>



<table

className="
w-full
text-sm
"

>




<thead>


<tr

className="
border-b
border-white/5
text-white/30
text-left
"

>



<th className="py-3">

Folio

</th>




<th>

Cliente

</th>





<th>

Producto

</th>





<th>

Total

</th>

<th>
  Anticipo
</th>




<th>

Pendiente

</th>





<th>

Estado

</th>





<th>

Entrega

</th>





<th>

Acciones

</th>





</tr>



</thead>









<tbody>



{


apartados.map((apartado)=>(




<tr

key={apartado.id}

className="
border-b
border-white/5
text-white/80
"

>






<td

className="
py-4
"

>

#{apartado.folio}

</td>








<td>

{apartado.cliente}

</td>








<td>

{apartado.producto}

</td>








<td>

${apartado.total.toLocaleString()}

</td>

<td className="text-blue-300 font-medium">
  ${apartado.anticipo.toLocaleString()}
</td>








<td

className={
  apartado.pendiente > 0
    ? "text-yellow-300 font-medium"
    : "text-green-400 font-medium"
}

>

${apartado.pendiente.toLocaleString()}

</td>



<td>


<EstadoApartado

estado={apartado.estado}

/>

</td>

<td>
  {apartado.entrega || "-"}
</td>


<td>


{

apartado.estado === "pendiente"? (


<div className="flex gap-2">


<button


onClick={() => onFinalizar(apartado)}


className="

px-3

py-1.5

rounded-lg

text-xs

bg-green-500/10

text-green-300

hover:bg-green-500/20

transition

"


>


Finalizar


</button>





<button


onClick={()=>onCancelar(apartado.id)}


className="

px-3

py-1.5

rounded-lg

text-xs

bg-red-500/10

text-red-300

hover:bg-red-500/20

transition

"


>


Cancelar


</button>



</div>



) : (

<div className="text-xs">

  {apartado.estado === "entregado" && (
    <span className="text-green-400 font-medium">
      🟢 Entregado
    </span>
  )}

  {apartado.estado === "cancelado" && (
    <span className="text-red-400 font-medium">
      🔴 Cancelado
    </span>
  )}

</div>

)



}



</td>









</tr>





))

}





</tbody>







</table>







</div>




);



}