"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Planta } from "@/types/planta";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
};

type Producto = {
  id: string;
  nombre: string;
  nombre_cientifico: string | null;
  tipo: string | null;

  luz: string | null;
  frecuencia_riego: string | null;

  temperatura_min: number | null;
  temperatura_max: number | null;

  altura_promedio: number | null;

  ubicacion: string | null;

  tipo_medicion:
    | "altura"
    | "cobertura"
    | "estado"
    | "cantidad"
    | "dimension"
    | null;

  unidad_medicion: string | null;
};

type Empleado = {
  id: string;
  nombre: string;
};

export default function PlantaModal({
  open,
  onClose,
  onSave,
}: Props) {

  const [productos, setProductos] = useState<Producto[]>([]);

  const [productoId, setProductoId] = useState("");

  const [medicionActual, setMedicionActual] = useState("");
  const [medicionMeta, setMedicionMeta] = useState("");

const [estado, setEstado] = useState<
  "Desarrollo" |
  "Rehabilitación" |
  "Lista" |
  "Crítica"
>("Rehabilitación");


  const [responsableId, setResponsableId] = useState("");

  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  const [tipoSeguimiento, setTipoSeguimiento] = useState<
  "Normal" |
  "Rehabilitación" |
  "Tratamiento" |
  "Adaptación" |
  "Prevención"
>("Rehabilitación");


  const [proximoCuidado, setProximoCuidado] = useState("");


  // Diagnóstico de rehabilitación

  const [diagnostico, setDiagnostico] = useState("");

  const [causa, setCausa] = useState("");

  const [tratamiento, setTratamiento] = useState("");


  const [prioridad, setPrioridad] = useState<
    "Baja" |
    "Media" |
    "Alta" |
    "Crítica"
  >("Media");


  const [
    porcentajeRecuperacion,
    setPorcentajeRecuperacion
  ] = useState("0");


  const [guardando, setGuardando] = useState(false);



  const productoSeleccionado = useMemo(
    () =>
      productos.find(
        (producto) =>
          producto.id === productoId
      ),
    [
      productos,
      productoId
    ]
  );

useEffect(() => {
  setMedicionMeta("");
}, [productoId]);



useEffect(() => {

  if (!open) return;

  cargarProductos();
  cargarEmpleados();

}, [open]);

async function cargarEmpleados(){

  const {
    data,
    error
  } = await supabase
    .from("usuarios")
    .select(`
      id,
      nombre
    `)
    .eq("activo", true)
    .order("nombre");


  if(error){

    console.error(
      "ERROR CARGANDO EMPLEADOS:",
      error
    );

    return;

  }


  setEmpleados(
    data ?? []
  );

}



  async function cargarProductos() {

    const {
      data,
      error
    } = await supabase
.from("productos")
.select(`
  id,
  nombre,
  nombre_cientifico,
  tipo,
  luz,
  frecuencia_riego,
  temperatura_min,
  temperatura_max,
  altura_promedio,
  ubicacion,
  tipo_medicion,
  unidad_medicion
`)
.eq("activo", true)
.not("tipo", "in", "(Fertilizante,Maceta,Sustrato)")
.order("nombre");


    if (error) {

      console.error(
        "ERROR CARGANDO PRODUCTOS:",
        error
      );

      return;

    }


    setProductos(
      data ?? []
    );

  }




  function limpiarFormulario() {


    setProductoId("");

    setMedicionActual("");
    setMedicionMeta("");

    setEstado("Rehabilitación");

    setResponsableId("");

    setTipoSeguimiento(
      "Rehabilitación"
    );

    setProximoCuidado("");

    setDiagnostico("");

    setCausa("");

    setTratamiento("");

    setPrioridad(
      "Media"
    );

    setPorcentajeRecuperacion(
      "0"
    );

  }





async function guardar() {

if (
  !productoId ||
  !productoSeleccionado ||
  !medicionActual
) {
  alert("Completa la planta y la medición actual.");
  return;
}

if (
  productoSeleccionado.tipo_medicion === "altura" &&
  !medicionMeta
) {
  alert("Ingresa la altura objetivo.");
  return;
}
  try {

    setGuardando(true);


    const {
      data: existente
    } = await supabase
      .from("rehabilitaciones")
      .select("id")
      .eq(
        "producto_id",
        productoId
      )
      .neq(
        "estado",
        "Lista"
      )
      .maybeSingle();



    if (existente) {

      alert(
        "Este producto ya tiene una rehabilitación activa."
      );

      return;

    }



    const {
      error
    } = await supabase
      .from("rehabilitaciones")
      .insert({

        codigo:
          `PL-${Date.now()
            .toString()
            .slice(-6)}`,

        producto_id:
          productoId,


        fecha_inicio:
          new Date()
            .toISOString()
            .split("T")[0],


        estado,


        tipo_medicion:
          productoSeleccionado.tipo_medicion,


        medicion_actual:
          Number(medicionActual),


medicion_meta:
  productoSeleccionado.tipo_medicion === "altura" &&
  medicionMeta !== ""
    ? Number(medicionMeta)
    : null,


        responsable_id:
          responsableId || null,


        proximo_cuidado:
          proximoCuidado || null,


        diagnostico:
          diagnostico || null,


        causa:
          causa || null,


        tratamiento:
          tratamiento || null,


        prioridad,


        tipo_seguimiento:
          tipoSeguimiento,


        porcentaje_recuperacion:
          Number(porcentajeRecuperacion)

      });



    if (error)
      throw error;



    alert(
      "Seguimiento registrado correctamente."
    );


    limpiarFormulario();

    onSave();

    onClose();



  } catch(error:any) {


    console.error(
      "ERROR REGISTRANDO:",
      error
    );


    alert(
      error.message ??
      "No se pudo registrar la rehabilitación."
    );


  } finally {


    setGuardando(false);


  }

}




  const inputStyle = `
    w-full
    mt-2
    rounded-xl
    border
    border-[#274127]
    bg-[#162616]
    px-4
    py-2.5
    text-white
    placeholder:text-white/35
    outline-none
    transition
    focus:border-[#6db56d]
    focus:ring-2
    focus:ring-[#6db56d]/20
  `;



  const sectionStyle = `
    rounded-2xl
    border
    border-[#274127]
    bg-[#121d12]
    p-5
  `;



  if (!open)
    return null;

  return (

  <div
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
      p-4
    "
  >

    <div
      className="
        w-full
        max-w-4xl
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        border
        border-[#274127]
        bg-[#0f1a0f]
        p-6
        shadow-2xl
      "
    >


      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Nueva rehabilitación
          </h2>


          <p
            className="
              text-sm
              text-white/50
              mt-1
            "
          >
            Registra el seguimiento de una planta.
          </p>

        </div>


        <button
          onClick={onClose}
          className="
            text-white/60
            hover:text-white
            text-xl
          "
        >
          ✕
        </button>


      </div>





      <div className="space-y-5">



        {/* PRODUCTO */}

        <section className={sectionStyle}>


          <h3
            className="
              text-white
              font-semibold
              text-lg
            "
          >
            Planta
          </h3>



          <select
            className={inputStyle}
            value={productoId}
            onChange={(e)=>
              setProductoId(
                e.target.value
              )
            }
          >

            <option value="">
              Selecciona una planta
            </option>


            {
              productos.map(
                (producto)=>(
                  <option
                    key={producto.id}
                    value={producto.id}
                  >
                    {
                      producto.nombre
                    }
                    {
                      producto.nombre_cientifico
                      ? ` - ${producto.nombre_cientifico}`
                      : ""
                    }
                  </option>
                )
              )
            }

          </select>




          {
            productoSeleccionado && (

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-3
                "
              >

                <div
                  className="
                    rounded-xl
                    bg-[#162616]
                    p-3
                  "
                >

                    <p className="text-xs text-white/50">
                      Tipo
                    </p>

<p className="text-xs text-white/50">
  Objetivo
</p>

<p className="text-white">
{
productoSeleccionado.tipo_medicion === "altura"
?
`${productoSeleccionado.altura_promedio ?? "Sin definir"} cm`

:

productoSeleccionado.tipo_medicion === "cantidad"
?
`Por cantidad (${productoSeleccionado.unidad_medicion ?? "unidad"})`

:

"Sin definir"

}
</p>

                </div>



                <div
                  className="
                    rounded-xl
                    bg-[#162616]
                    p-3
                  "
                >

            <p className="text-xs text-white/50">
              Medición objetivo
            </p>

            <p className="text-white">
              {productoSeleccionado.tipo_medicion === "altura"
                ? (productoSeleccionado.altura_promedio ?? "Sin definir") + " cm"
                : "No aplica"}
            </p>

                </div>



                <div
                  className="
                    rounded-xl
                    bg-[#162616]
                    p-3
                  "
                >

                  <p className="text-xs text-white/50">
                    Ubicación
                  </p>

                  <p className="text-white">
                    {
                      productoSeleccionado.ubicacion ??
                      "Sin definir"
                    }
                  </p>

                </div>


              </div>

            )
          }



        </section>






        {/* DESARROLLO */}

        <section className={sectionStyle}>


          <h3
            className="
              text-white
              font-semibold
              text-lg
              mb-3
            "
          >
            Desarrollo
          </h3>



          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >


            <div>

<label className="text-sm text-white/70">

{
productoSeleccionado?.tipo_medicion === "altura"
?
"Altura actual (cm)"

:

productoSeleccionado?.tipo_medicion === "cantidad"
?
`Cantidad (${productoSeleccionado.unidad_medicion ?? "unidad"})`

:

productoSeleccionado?.tipo_medicion === "cobertura"
?
"Cobertura (%)"

:

"Valor actual"

}

</label>


<input
 type="number"
 className={inputStyle}
 value={medicionActual}
 onChange={(e)=>
   setMedicionActual(
     e.target.value
   )
 }
/>

{
productoSeleccionado?.tipo_medicion === "altura" && (

<div className="mt-4">

  <label className="text-sm text-white/70">
    Altura objetivo (cm)
  </label>

  <input
    type="number"
    className={inputStyle}
    value={medicionMeta}
    onChange={(e) =>
      setMedicionMeta(e.target.value)
    }
    placeholder="Ej. 80"
  />

</div>

)
}

            </div>




            <div>

              <label className="text-sm text-white/70">
                Estado
              </label>


              <select
                className={inputStyle}
                value={estado}
                onChange={(e)=>
                  setEstado(
                    e.target.value as any
                  )
                }
              >

                <option>
                  Desarrollo
                </option>

                <option>
                  Rehabilitación
                </option>

                <option>
                  Lista
                </option>

                <option>
                  Crítica
                </option>


              </select>


            </div>

            <div>

          <label className="text-sm text-white/70">
          Tipo de seguimiento
          </label>


          <select
          className={inputStyle}
          value={tipoSeguimiento}
          onChange={(e)=>
            setTipoSeguimiento(
              e.target.value as any
            )
          }
          >

      <option>
      Normal
      </option>

      <option>
      Rehabilitación
      </option>

      <option>
      Tratamiento
      </option>

      <option>
      Adaptación
      </option>

      <option>
      Prevención
      </option>


      </select>

      </div>



          </div>


        </section>







        {/* DIAGNOSTICO */}

        <section className={sectionStyle}>


          <h3
            className="
              text-white
              font-semibold
              text-lg
              mb-3
            "
          >
            Diagnóstico
          </h3>



          <textarea
            className={inputStyle}
            rows={3}
            placeholder="Describe el problema encontrado..."
            value={diagnostico}
            onChange={(e)=>
              setDiagnostico(
                e.target.value
              )
            }
          />



          <textarea
            className={inputStyle}
            rows={3}
            placeholder="Causa probable..."
            value={causa}
            onChange={(e)=>
              setCausa(
                e.target.value
              )
            }
          />



          <textarea
            className={inputStyle}
            rows={3}
            placeholder="Tratamiento aplicado..."
            value={tratamiento}
            onChange={(e)=>
              setTratamiento(
                e.target.value
              )
            }
          />


        </section>







        {/* CONTROL */}

        <section className={sectionStyle}>


          <h3
            className="
              text-white
              font-semibold
              text-lg
              mb-3
            "
          >
            Control
          </h3>



          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >


            <div>

              <label className="text-sm text-white/70">
                Prioridad
              </label>


              <select
                className={inputStyle}
                value={prioridad}
                onChange={(e)=>
                  setPrioridad(
                    e.target.value as any
                  )
                }
              >

                <option>
                  Baja
                </option>

                <option>
                  Media
                </option>

                <option>
                  Alta
                </option>

                <option>
                  Crítica
                </option>

              </select>


            </div>





            <div>

              <label className="text-sm text-white/70">
                Recuperación %
              </label>


              <input
                type="number"
                min="0"
                max="100"
                className={inputStyle}
                value={porcentajeRecuperacion}
                onChange={(e)=>
                  setPorcentajeRecuperacion(
                    e.target.value
                  )
                }
              />

            </div>





            <div>

              <label className="text-sm text-white/70">
                Responsable
              </label>


              <select
              className={inputStyle}
              value={responsableId}
              onChange={(e)=>
                setResponsableId(
                  e.target.value
                )
              }
              >

              <option value="">
              Sin asignar
              </option>


              {
              empleados.map((empleado)=>(
                <option
                  key={empleado.id}
                  value={empleado.id}
                >
                  {empleado.nombre}
                </option>
              ))
              }


              </select>

            </div>


          </div>





          <div className="mt-4">


            <label className="text-sm text-white/70">
              Próximo cuidado
            </label>


            <input
              type="date"
              className={inputStyle}
              value={proximoCuidado}
              onChange={(e)=>
                setProximoCuidado(
                  e.target.value
                )
              }
            />


          </div>



        </section>







        {/* BOTONES */}

        <div
          className="
            flex
            justify-end
            gap-3
            pt-3
          "
        >


          <button
            onClick={onClose}
            className="
              rounded-xl
              px-5
              py-2.5
              border
              border-[#274127]
              text-white
              hover:bg-white/5
            "
          >
            Cancelar
          </button>



          <button
            disabled={guardando}
            onClick={guardar}
            className="
              rounded-xl
              px-5
              py-2.5
              bg-[#6db56d]
              text-black
              font-semibold
              hover:opacity-90
              disabled:opacity-50
            "
          >

            {
              guardando
              ? "Guardando..."
              : "Guardar"
            }

          </button>


        </div>




      </div>


    </div>


  </div>

);

}