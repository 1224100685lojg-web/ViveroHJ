"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Producto } from "@/lib/inventario";



type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  producto: Producto | null;
};


export default function ProductModal({
  open,
  onClose,
  onSaved,
  producto,
}: Props) {


  const [nombre,setNombre] = useState("");
  const [codigo,setCodigo] = useState("");

  const [nombreCientifico,setNombreCientifico] = useState("");

  const [descripcion,setDescripcion] = useState("");
  const [observaciones,setObservaciones] = useState("");


  const [tipo,setTipo] = useState("");
  const [tipoMedicion,setTipoMedicion] = useState("");
  const [unidadMedicion,setUnidadMedicion] = useState("");
  const [luz,setLuz] = useState("");
  const [frecuenciaRiego,setFrecuenciaRiego] = useState("");

  const [temperaturaMin,setTemperaturaMin] = useState("");
  const [temperaturaMax,setTemperaturaMax] = useState("");

  const [alturaPromedio,setAlturaPromedio] = useState("");
  const [diametroMaceta,setDiametroMaceta] = useState("");

  const [color,setColor] = useState("");
  const [origen,setOrigen] = useState("");
  const [ubicacion,setUbicacion] = useState("");


  const [precioCompra,setPrecioCompra] = useState("");
  const [precioVenta,setPrecioVenta] = useState("");


  const [stock,setStock] = useState("");
  const [stockMinimo,setStockMinimo] = useState("5");


  const [imagenArchivo,setImagenArchivo] =
    useState<File | null>(null);

  const [previewImagen,setPreviewImagen] =
    useState("");


  const [guardando,setGuardando] =
    useState(false);



  useEffect(()=>{


    if(!open) return;



    if(producto){


      setNombre(producto.nombre);

      setCodigo(producto.codigo ?? "");

      setNombreCientifico(
        producto.nombre_cientifico ?? ""
      );


      setDescripcion(
        producto.descripcion ?? ""
      );


      setObservaciones(
        producto.observaciones ?? ""
      );



      setTipo(producto.tipo ?? "");
    
      setTipoMedicion(producto.tipo_medicion ?? "");
      setUnidadMedicion(
  producto.unidad_medicion ?? ""
);
      setLuz(producto.luz ?? "");

      setFrecuenciaRiego(
        producto.frecuencia_riego ?? ""
      );



      setTemperaturaMin(
        producto.temperatura_min
        ? String(producto.temperatura_min)
        : ""
      );


      setTemperaturaMax(
        producto.temperatura_max
        ? String(producto.temperatura_max)
        : ""
      );



      setAlturaPromedio(
        producto.altura_promedio
        ? String(producto.altura_promedio)
        : ""
      );


      setDiametroMaceta(
        producto.diametro_maceta ?? ""
      );



      setColor(producto.color ?? "");

      setOrigen(producto.origen ?? "");

      setUbicacion(producto.ubicacion ?? "");



      setPrecioCompra(
        String(producto.precio_compra)
      );


      setPrecioVenta(
        String(producto.precio_venta)
      );


      setStock(
        String(producto.stock)
      );


      setStockMinimo(
        String(producto.stock_minimo)
      );


      setPreviewImagen(
        producto.imagen ?? ""
      );



    }else{


      limpiarFormulario();


    }


  },[producto,open]);

  useEffect(() => {
  switch (tipo) {
    case "Planta":
      setTipoMedicion("altura");
      setUnidadMedicion("cm");
      break;

    case "Pasto":
      setTipoMedicion("cobertura");
      setUnidadMedicion("m²");
      break;

    case "Fertilizante":
      setTipoMedicion("cantidad");
      setUnidadMedicion("ml");
      break;

    case "Sustrato":
      setTipoMedicion("cantidad");
      setUnidadMedicion("kg");
      break;

    case "Maceta":
      setTipoMedicion("dimension");
      setUnidadMedicion("cm");
      break;

    case "Semilla":
      setTipoMedicion("cantidad");
      setUnidadMedicion("piezas");
      break;

    case "Herramienta":
      setTipoMedicion("cantidad");
      setUnidadMedicion("piezas");
      break;

    default:
      setTipoMedicion("");
      setUnidadMedicion("");
  }
}, [tipo]);





  function limpiarFormulario(){


    setNombre("");

    setCodigo("");

    setNombreCientifico("");

    setDescripcion("");

    setObservaciones("");


    setTipo("");
    setTipoMedicion("");
    setUnidadMedicion("");
    setLuz("");

    setFrecuenciaRiego("");


    setTemperaturaMin("");

    setTemperaturaMax("");


    setAlturaPromedio("");

    setDiametroMaceta("");


    setColor("");

    setOrigen("");

    setUbicacion("");



    setPrecioCompra("");

    setPrecioVenta("");


    setStock("");

    setStockMinimo("5");



    setImagenArchivo(null);

    setPreviewImagen("");


  }






  function seleccionarImagen(
    e: React.ChangeEvent<HTMLInputElement>
  ){


    const archivo =
      e.target.files?.[0];


    if(!archivo) return;



    setImagenArchivo(archivo);


    setPreviewImagen(
      URL.createObjectURL(archivo)
    );


  }






  async function subirImagen(){


    if(!imagenArchivo)
      return null;



    const extension =
      imagenArchivo.name
      .split(".")
      .pop();



    const nombreArchivo =
      `${crypto.randomUUID()}.${extension}`;





    const {error} =
      await supabase.storage
      .from("productos")
      .upload(
        nombreArchivo,
        imagenArchivo
      );



    if(error)
      throw error;




    const {data} =
      supabase.storage
      .from("productos")
      .getPublicUrl(
        nombreArchivo
      );



    return data.publicUrl;


  }








  async function guardarProducto(){


    if(!nombre.trim()){


      alert(
        "Ingresa el nombre del producto."
      );


      return;

    }




    if(!precioVenta){


      alert(
        "Ingresa el precio de venta."
      );


      return;

    }





    if(!stock){


      alert(
        "Ingresa el stock."
      );


      return;


    }






    try{


      setGuardando(true);




      let imagenUrl =
        producto?.imagen ?? null;





      if(imagenArchivo){


        imagenUrl =
          await subirImagen();


      }






      let error = null;






      const datosProducto = {


        nombre:
          nombre.trim(),


        codigo:
          codigo.trim() || null,


        nombre_cientifico:
          nombreCientifico.trim() || null,



        descripcion:
          descripcion.trim() || null,



        observaciones:
          observaciones.trim() || null,



        tipo:
          tipo || null,


        luz:
          luz || null,


        frecuencia_riego:
          frecuenciaRiego || null,



        temperatura_min:
          Number(temperaturaMin) || null,



        temperatura_max:
          Number(temperaturaMax) || null,



        altura_promedio:
          Number(alturaPromedio) || null,



        diametro_maceta:
          diametroMaceta || null,



        color:
          color || null,



        origen:
          origen || null,



        ubicacion:
          ubicacion || null,



        precio_compra:
          Number(precioCompra) || 0,



        precio_venta:
          Number(precioVenta),



        stock:
          Number(stock),



        stock_minimo:
          Number(stockMinimo),



        imagen:
          imagenUrl,
          tipo_medicion:
  tipoMedicion || null,
  unidad_medicion:
  unidadMedicion || null,

      };





      if(producto){


        const {
          error:updateError
        } = await supabase
        .from("productos")
        .update(datosProducto)
        .eq(
          "id",
          producto.id
        );



        error = updateError;



      }else{


        const {
          error:insertError
        } = await supabase
        .from("productos")
        .insert({

          ...datosProducto,

          activo:true,

        });



        error = insertError;


      }






      if(error)
        throw error;





      limpiarFormulario();


      onSaved();


      onClose();




    }catch(error:any){


      console.error(error);


      alert(
        error.message ||
        "Error al guardar producto"
      );



    }finally{


      setGuardando(false);


    }


  }
    if(!open) return null;



  return (

<div
className="
fixed
inset-0
z-[70]
flex
items-center
justify-center
bg-black/60
backdrop-blur-sm
"
>


<div
className="
w-[95%]
max-w-3xl

max-h-[90vh]

overflow-hidden

rounded-3xl

border
border-white/10

bg-[#0f1a0f]

shadow-[0_25px_80px_rgba(0,0,0,0.5)]

flex
flex-col

animate-in
fade-in
zoom-in-95
duration-300
"
>



{/* HEADER */}

<div
className="
flex
items-center
justify-between

px-6
py-5

border-b
border-white/10
"
>


<div>

<h2
className="
text-lg
font-semibold
text-white
"
>

{
producto
?
"Editar producto"
:
"Nuevo producto"
}

</h2>


<p
className="
mt-1
text-xs
text-white/40
"
>

Información completa del producto

</p>


</div>




<button

onClick={onClose}

className="
w-10
h-10

rounded-xl

bg-white/5

hover:bg-white/10

flex
items-center
justify-center

transition
"

>

<X size={18}/>

</button>


</div>







{/* CONTENIDO */}

<div
className="
flex-1
overflow-y-auto

px-6
py-6

space-y-8
"
>






{/* IMAGEN */}

<div
className="
flex
flex-col
items-center
gap-3
"
>


{
previewImagen ?


<img
src={previewImagen}
alt="Vista previa"
className="
w-36
h-36

rounded-3xl

object-cover

border
border-white/10

shadow-xl
"
/>


:


<div
className="
w-36
h-36

rounded-3xl

bg-white/[0.03]

border
border-white/10

flex
items-center
justify-center

text-white/30
"
>

Sin imagen

</div>

}



<label
className="
cursor-pointer

rounded-xl

bg-white/5

px-4
py-2

text-sm

text-white

hover:bg-white/10

transition
"
>

Cambiar imagen


<input

type="file"

accept="image/*"

onChange={seleccionarImagen}

className="hidden"

/>


</label>


</div>









{/* INFORMACIÓN GENERAL */}

<div className="space-y-4">


<div>

<h3 className="text-sm font-semibold text-white">

Información general

</h3>


<p className="text-xs text-white/40">

Datos principales del producto

</p>


</div>




<input

value={nombre}

onChange={(e)=>setNombre(e.target.value)}

placeholder="Nombre comercial"

className="
w-full

rounded-xl

border
border-white/10

bg-white/[0.03]

px-4
py-3

text-white

outline-none

focus:border-[#6db56d]
"

/>




{(tipo === "Planta" || tipo === "Pasto") && (
  <input
    value={nombreCientifico}
    onChange={(e)=>setNombreCientifico(e.target.value)}
    placeholder="Nombre científico"
    className="
      w-full
      rounded-xl
      border
      border-white/10
      bg-white/[0.03]
      px-4
      py-3
      text-white
      outline-none
      focus:border-[#6db56d]
    "
  />
)}




<input

value={codigo}

onChange={(e)=>setCodigo(e.target.value)}

placeholder="Código interno"

className="
w-full

rounded-xl

border
border-white/10

bg-white/[0.03]

px-4
py-3

text-white

outline-none

focus:border-[#6db56d]
"

/>




<textarea

value={descripcion}

onChange={(e)=>setDescripcion(e.target.value)}

placeholder="Descripción"

rows={3}

className="
w-full

resize-none

rounded-xl

border
border-white/10

bg-white/[0.03]

px-4
py-3

text-white

outline-none

focus:border-[#6db56d]
"

/>


</div>









{/* CARACTERÍSTICAS BOTÁNICAS */}

<div className="space-y-4">


<div>

<h3 className="text-sm font-semibold text-white">

Características botánicas

</h3>


<p className="text-xs text-white/40">

Información de cuidado de la planta

</p>

</div>



<div className="
grid
grid-cols-2
gap-4
">


<select
  value={tipo}
  onChange={(e) => setTipo(e.target.value)}
  className="
    rounded-xl
    border
    border-white/10
    bg-[#162416]
    text-white
    px-4
    py-3
    focus:border-[#6db56d]
    outline-none
  "
>
  <option value="" className="bg-[#162416] text-white">
    Selecciona una categoría
  </option>

  <option value="Planta" className="bg-[#162416] text-white">
    Planta
  </option>

  <option value="Pasto" className="bg-[#162416] text-white">
    Pasto
  </option>

  <option value="Fertilizante" className="bg-[#162416] text-white">
    Fertilizante
  </option>

  <option value="Sustrato" className="bg-[#162416] text-white">
    Sustrato
  </option>

  <option value="Maceta" className="bg-[#162416] text-white">
    Maceta
  </option>

  <option value="Semilla" className="bg-[#162416] text-white">
    Semilla
  </option>

  <option value="Herramienta" className="bg-[#162416] text-white">
    Herramienta
  </option>

  <option value="Otro" className="bg-[#162416] text-white">
    Otro
  </option>
</select>  {/* <-- ESTE TE FALTABA */}


<select
  value={unidadMedicion}
  onChange={(e) => setUnidadMedicion(e.target.value)}
  className="
    rounded-xl
    border
    border-white/10
    bg-[#162416]
    text-white
    px-4
    py-3
    outline-none
    focus:border-[#6db56d]
  "
>

{tipo === "Planta" && (
  <>
    <option className="bg-[#162416] text-white" value="cm">cm</option>
    <option className="bg-[#162416] text-white" value="m">m</option>
  </>
)}

{tipo === "Fertilizante" && (
  <>
    <option className="bg-[#162416] text-white" value="ml">ml</option>
    <option className="bg-[#162416] text-white" value="L">L</option>
    <option className="bg-[#162416] text-white" value="g">g</option>
    <option className="bg-[#162416] text-white" value="kg">kg</option>
  </>
)}

{tipo === "Sustrato" && (
  <>
    <option className="bg-[#162416] text-white" value="kg">kg</option>
    <option className="bg-[#162416] text-white" value="g">g</option>
    <option className="bg-[#162416] text-white" value="L">L</option>
  </>
)}

{tipo === "Pasto" && (
  <>
    <option className="bg-[#162416] text-white" value="m²">m²</option>
    <option className="bg-[#162416] text-white" value="cm²">cm²</option>
  </>
)}

{tipo === "Semilla" && (
  <>
    <option className="bg-[#162416] text-white" value="piezas">piezas</option>
    <option className="bg-[#162416] text-white" value="sobres">sobres</option>
    <option className="bg-[#162416] text-white" value="g">g</option>
  </>
)}

{tipo === "Herramienta" && (
  <>
    <option className="bg-[#162416] text-white" value="piezas">piezas</option>
  </>
)}


</select>

{tipo !== "Herramienta" && (
<input

value={color}

onChange={(e)=>setColor(e.target.value)}

placeholder="Color"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}


{(tipo === "Planta" || tipo === "Pasto") && (
<input
  value={luz}
  onChange={(e)=>setLuz(e.target.value)}
  placeholder="Necesidad de luz"
className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}


{(tipo === "Planta" || tipo === "Pasto") && (
<input
  value={frecuenciaRiego}

onChange={(e)=>setFrecuenciaRiego(e.target.value)}

placeholder="Frecuencia de riego"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}

{tipo === "Planta" && (
<input

value={origen}

onChange={(e)=>setOrigen(e.target.value)}

placeholder="Origen"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}

</div>


</div>









{/* CONDICIONES */}

<div className="space-y-4">


<div>

<h3 className="text-sm font-semibold text-white">

Condiciones de cultivo

</h3>


</div>



<div className="
grid
grid-cols-2
gap-4
">

{(tipo === "Planta" || tipo === "Pasto") && (
<input

value={temperaturaMin}

onChange={(e)=>setTemperaturaMin(e.target.value)}

placeholder="Temperatura mínima"

type="number"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}

{(tipo === "Planta" || tipo === "Pasto") && (
<input

value={temperaturaMax}

onChange={(e)=>setTemperaturaMax(e.target.value)}

placeholder="Temperatura máxima"

type="number"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}

{tipo === "Planta" && (
<input

value={alturaPromedio}

onChange={(e)=>setAlturaPromedio(e.target.value)}

placeholder="Altura promedio"

type="number"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}


{tipo === "Planta" && (
<input

value={diametroMaceta}

onChange={(e)=>setDiametroMaceta(e.target.value)}

placeholder="Diámetro maceta"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>
)}


</div>


</div>









{/* UBICACIÓN */}

<div className="space-y-4">


<h3 className="text-sm font-semibold text-white">

Ubicación

</h3>


<input

value={ubicacion}

onChange={(e)=>setUbicacion(e.target.value)}

placeholder="Ejemplo: Invernadero A - Mesa 4"

className="
w-full

rounded-xl

border
border-white/10

bg-white/[0.03]

px-4
py-3

text-white

outline-none

focus:border-[#6db56d]
"

/>


</div>









{/* INVENTARIO */}

<div className="space-y-4">


<h3 className="text-sm font-semibold text-white">

Control de inventario

</h3>


<div
className="
grid
grid-cols-2
gap-4
"
>


<input

value={stock}

onChange={(e)=>setStock(e.target.value)}

placeholder="Stock actual"

type="number"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>



<input

value={stockMinimo}

onChange={(e)=>setStockMinimo(e.target.value)}

placeholder="Stock mínimo"

type="number"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>



</div>


</div>









{/* INFORMACIÓN COMERCIAL */}

<div className="space-y-4">


<h3 className="text-sm font-semibold text-white">

Información comercial

</h3>



<div
className="
grid
grid-cols-2
gap-4
"
>


<input

value={precioCompra}

onChange={(e)=>setPrecioCompra(e.target.value)}

placeholder="Precio compra"

type="number"

step="0.01"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>



<input

value={precioVenta}

onChange={(e)=>setPrecioVenta(e.target.value)}

placeholder="Precio venta"

type="number"

step="0.01"

className="
rounded-xl
border
border-white/10
bg-white/[0.03]
px-4
py-3
text-white
outline-none
focus:border-[#6db56d]
"

/>


</div>


</div>









{/* OBSERVACIONES */}

<div className="space-y-4">


<h3 className="text-sm font-semibold text-white">

Observaciones

</h3>



<textarea

value={observaciones}

onChange={(e)=>setObservaciones(e.target.value)}

placeholder="Notas adicionales"

rows={3}

className="
w-full

resize-none

rounded-xl

border
border-white/10

bg-white/[0.03]

px-4
py-3

text-white

outline-none

focus:border-[#6db56d]
"

/>


</div>






</div>









{/* FOOTER */}

<div
className="
p-5

border-t

border-white/10
"
>


<div
className="
flex
gap-3
"
>


<button

onClick={()=>{

limpiarFormulario();

onClose();

}}

disabled={guardando}

className="
flex-1

rounded-2xl

bg-white/5

border
border-white/10

py-3

text-white

hover:bg-white/10
"
>

Cancelar

</button>





<button

onClick={guardarProducto}

disabled={guardando}

className="
flex-1

rounded-2xl

bg-gradient-to-r

from-[#6db56d]

to-[#82c982]

py-3

font-semibold

text-[#081008]
shadow-lg
shadow-green-900/20
hover:scale-[1.01]
transition
"
>

{
guardando
?
"Guardando..."
:
producto
?
"Actualizar producto"
:
"Guardar producto"
}
</button>
    </div>
    </div>

  </div>
</div>

  );

}