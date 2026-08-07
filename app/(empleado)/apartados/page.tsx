"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import ApartadoCard from "./ApartadoCard";
import ApartadoTable from "./ApartadoTable";
import ApartadoModal from "./ApartadoModal";
import { useSearch } from "@/context/SearchContext";


type Apartado = {
  id: string;
  folio: string;
  cliente: string;
  producto: string;
  total: number;
  anticipo: number;
  pendiente: number;
  estado: string;
  entrega: string;
};


export default function ApartadosPage() {
const { busqueda } = useSearch();

  const [apartados, setApartados] = useState<Apartado[]>([]);

  const [modalAbierto, setModalAbierto] = useState(false);

  const [loading, setLoading] = useState(true);
  const [apartadoFinalizar, setApartadoFinalizar] =
  useState<Apartado | null>(null);

const [pagoRecibido, setPagoRecibido] =
  useState("");





  useEffect(() => {

    cargarApartados();

  }, []);






  async function cargarApartados() {


    setLoading(true);



const { data, error } = await supabase
  .from("apartados")
  .select(`
    id,
    fecha_entrega,
    anticipo,
    total,
    estado,

    clientes(
      nombre
    ),

    detalle_apartados(
      cantidad,
      precio_unitario,
      productos:producto_id(
        nombre
      )
    )
  `)
  .order("fecha", {
    ascending:false
  });




    if(error){

      console.error(
        "ERROR CARGANDO APARTADOS:",
        error
      );

      setLoading(false);

      return;

    }





    const lista: Apartado[] = data?.map(
      (apartado:any)=>({


        id: apartado.id,

folio: `APT-${apartado.id.slice(0,8).toUpperCase()}`,



        cliente:
          apartado.clientes?.nombre ??
          "Público General",





producto:

  apartado.detalle_apartados
    ?.map(
      (detalle:any)=>
        `${detalle.productos?.nombre ?? "Producto sin nombre"} (${detalle.cantidad})`
    )
    .join(", ")
    || "Sin producto",





        total:
          Number(apartado.total),





        anticipo:
          Number(apartado.anticipo),





        pendiente:

          Number(apartado.total) -
          Number(apartado.anticipo),

        estado:

          (apartado.estado ?? "pendiente").toLowerCase(),

        entrega:
          apartado.fecha_entrega
            ? new Date(apartado.fecha_entrega)
                .toLocaleDateString("es-MX")
            : ""


      })

    ) ?? [];





    setApartados(lista);


    setLoading(false);



  }









  async function agregarApartado(){


    await cargarApartados();


    setModalAbierto(false);


  }
async function cancelarApartado(id: string) {

  const confirmar = window.confirm(
    "¿Seguro que deseas cancelar este apartado?"
  );

  if (!confirmar) return;

  const { error } = await supabase
    .from("apartados")
    .update({
      estado: "cancelado",
    })
    .eq("id", id);

  if (error) {
    console.error("ERROR CANCELANDO:", error);
    return;
  }

  alert("Apartado cancelado correctamente.");

  await cargarApartados();
}

async function finalizarApartado(apartado: Apartado) {
  setApartadoFinalizar(apartado);
  setPagoRecibido("");
}


async function confirmarPago() {

  if (!apartadoFinalizar) return;

  const pago = Number(pagoRecibido);

  if (Number.isNaN(pago) || pago <= 0) {
    alert("Ingresa una cantidad válida.");
    return;
  }


  if (pago > apartadoFinalizar.pendiente) {
    alert(
      `No puede ser mayor al pendiente ($${apartadoFinalizar.pendiente.toLocaleString()})`
    );
    return;
  }


  const nuevoAnticipo =
    apartadoFinalizar.anticipo + pago;


  const nuevoPendiente =
    apartadoFinalizar.total - nuevoAnticipo;


  const { error } = await supabase
    .from("apartados")
    .update({
      anticipo: nuevoAnticipo,
      estado:
        nuevoPendiente <= 0
          ? "entregado"
          : "pendiente",
    })
    .eq("id", apartadoFinalizar.id);


  if(error){
    console.error(error);
    return;
  }


  setApartadoFinalizar(null);
  setPagoRecibido("");

  await cargarApartados();

}

const apartadosActivos = apartados.filter((apartado) => {
  const estado = apartado.estado.toLowerCase();
  return estado === "pendiente";
});
const apartadosFiltrados = apartados.filter((apartado)=>{

  const texto = busqueda.toLowerCase();

  return (
    apartado.folio.toLowerCase().includes(texto) ||
    apartado.cliente.toLowerCase().includes(texto) ||
    apartado.producto.toLowerCase().includes(texto)
  );

});


  const dineroPendiente = apartadosActivos.reduce(

    (total,apartado)=>

      total + apartado.pendiente,

    0

  );
const hoy = new Date();

const entregasProximas = apartadosActivos.filter((apartado) => {

  if (!apartado.entrega) return false;

  const fechaEntrega = new Date(apartado.entrega);

  const diferencia =
    fechaEntrega.getTime() - hoy.getTime();

  const dias = diferencia / (1000 * 60 * 60 * 24);

  return dias >= 0 && dias <= 3;

}).length;


  return (
    
    
    <>


      <div className="space-y-6">





        <div>


          <h1 className="text-2xl font-semibold text-white">

            Apartados

          </h1>




          <p className="text-sm text-white/40 mt-1">

            Control de productos reservados por clientes.

          </p>



        </div>









        <div className="grid grid-cols-3 gap-4">



          <ApartadoCard

            title="Apartados activos"

            value={String(apartadosActivos.length)}

          />





          <ApartadoCard

            title="Dinero pendiente"

            value={
              `$${dineroPendiente.toLocaleString("es-MX")}`
            }

          />





          <ApartadoCard

            title="Entregas próximas"

            value={String(entregasProximas)}

          />



        </div>









        <div className="
          bg-white/[0.03]
          border
          border-white/5
          rounded-xl
          p-5
        ">



          <div className="
            flex
            justify-between
            items-center
            mb-5
          ">



            <h2 className="text-white font-medium">

              Listado de apartados

            </h2>





            <button

              onClick={()=>setModalAbierto(true)}

              className="
                px-4
                py-2
                rounded-lg
                bg-[#6db56d]/20
                text-[#a8d5a8]
                text-sm
                hover:bg-[#6db56d]/30
              "

            >

              + Nuevo Apartado


            </button>



          </div>








          {

            loading

            ?

            (

              <div className="
                text-center
                text-white/50
                py-10
              ">

                Cargando apartados...

              </div>

            )


            :


            (

              <ApartadoTable

                apartados={apartadosFiltrados}

                onCancelar={cancelarApartado}

                onFinalizar={finalizarApartado}

              />

            )


          }





        </div>




      </div>







      <ApartadoModal

        open={modalAbierto}

        onClose={()=>setModalAbierto(false)}

        onSave={agregarApartado}

      />

      {apartadoFinalizar && (

<div className="
fixed inset-0
bg-black/50
flex
items-center
justify-center
z-50
">

<div className="
bg-[#162616]
border border-[#274127]
rounded-xl
p-5
w-80
">


<h3 className="text-white font-semibold">
Registrar pago
</h3>


<p className="text-white/50 text-sm mt-2">
Pendiente:
</p>


<p className="text-yellow-300 text-xl font-bold">
${apartadoFinalizar.pendiente.toLocaleString()}
</p>


<input

type="number"

value={pagoRecibido}

onChange={(e)=>setPagoRecibido(e.target.value)}

placeholder="Cantidad recibida"

className="
mt-4
w-full
rounded-lg
bg-[#0f1a0f]
border border-[#274127]
px-3
py-2
text-white
"

/>



<div className="flex gap-2 mt-4">


<button

onClick={()=>{
setApartadoFinalizar(null);
setPagoRecibido("");
}}

className="
flex-1
rounded-lg
bg-white/10
text-white
py-2
">

Cancelar

</button>



<button

onClick={confirmarPago}

className="
flex-1
rounded-lg
bg-green-500/20
text-green-300
py-2
">

Guardar

</button>


</div>


</div>

</div>

)}





    </>

  );


}