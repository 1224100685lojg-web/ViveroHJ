"use client";

import {
  X,
  Pencil,
  DollarSign,
  CalendarDays,
  Hash,
  Warehouse,
  Sprout,
  Droplets,
  Sun,
  Thermometer,
  MapPin,
  Ruler,
} from "lucide-react";


type Producto = {
  id: string;

  codigo: string | null;

  nombre: string;

  nombre_cientifico: string | null;

  descripcion: string | null;

  observaciones: string | null;

  tipo: string | null;

  luz: string | null;

  frecuencia_riego: string | null;

  temperatura_min: number | null;

  temperatura_max: number | null;

  altura_promedio: number | null;

  diametro_maceta: string | null;

  color: string | null;

  origen: string | null;

  ubicacion: string | null;


  precio_compra: number;

  precio_venta: number;


  stock: number;

  stock_minimo: number;


  imagen: string | null;

  activo: boolean;


  created_at?: string;

  updated_at?: string;
};


type Props = {

  open: boolean;

  producto: Producto | null;

  onClose: () => void;

  onEdit?: () => void;

};



export default function ProductDetailsDrawer({

  open,

  producto,

  onClose,

  onEdit,

}: Props) {


  if (!producto) return null;



  const estado =

    producto.stock === 0

      ? "Agotado"

      :

    producto.stock <= producto.stock_minimo

      ? "Bajo stock"

      :

      "Disponible";




  const estadoColor =

    estado === "Disponible"

      ?

      "bg-green-500/15 text-green-400 border-green-500/20"

      :

    estado === "Bajo stock"

      ?

      "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"

      :

      "bg-red-500/15 text-red-400 border-red-500/20";




  function formatearFecha(fecha?: string) {


    if (!fecha) return "-";


    return new Date(fecha).toLocaleDateString(
      "es-MX",
      {
        day:"2-digit",
        month:"long",
        year:"numeric",
      }
    );

  }




  return (

    <>


      {/* Overlay */}

      <div

        onClick={onClose}

        className={`
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          z-40

          transition-opacity

          ${
            open
            ?
            "opacity-100"
            :
            "opacity-0 pointer-events-none"
          }
        `}

      />





      {/* Contenedor */}


      <aside

        className={`
          fixed

          top-1/2
          left-1/2

          w-[95%]

          max-w-2xl

          h-[85vh]


          -translate-x-1/2
          -translate-y-1/2


          rounded-3xl


          overflow-hidden


          border
          border-white/10


          bg-[#0f1a0f]


          shadow-[0_25px_80px_rgba(0,0,0,0.5)]


          transition-all
          duration-300


          z-50


          flex
          flex-col


          ${
            open

            ?

            "opacity-100 scale-100"

            :

            "opacity-0 scale-95 pointer-events-none"
          }

        `}

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


            <h2 className="text-lg font-semibold text-white">

              Ficha del producto

            </h2>


            <p className="mt-1 text-xs text-white/40">

              Información completa de la planta

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

          space-y-6
          "

        >





          {/* PRODUCTO PRINCIPAL */}



          <div

            className="
            flex
            gap-6
            items-center
            "

          >



            {
              producto.imagen

              ?

              <img

                src={producto.imagen}

                alt={producto.nombre}

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

                bg-white/5

                flex
                items-center
                justify-center

                text-white/30
                "

              >

                Sin imagen

              </div>

            }






            <div className="flex-1">


              <h3

                className="
                text-2xl
                font-semibold
                text-white
                "

              >

                {producto.nombre}

              </h3>



              {
                producto.nombre_cientifico &&

                <p

                  className="
                  mt-1
                  text-sm
                  italic
                  text-white/40
                  "

                >

                  {producto.nombre_cientifico}

                </p>
              }




              <p className="
              mt-2
              text-sm
              text-white/40
              ">

                Código: {producto.codigo ?? "-"}

              </p>




              <span

                className={`
                inline-flex

                mt-4

                px-3
                py-1

                rounded-full

                text-xs
                font-medium

                border

                ${estadoColor}
                `}

              >

                {estado}

              </span>


            </div>


          </div>






          {/* MÉTRICAS */}



          <div

            className="
            grid
            grid-cols-2

            gap-4
            "

          >


            <InfoCard

              icon={<DollarSign size={18}/>}

              title="Precio venta"

              value={
                `$${producto.precio_venta.toLocaleString(
                  "es-MX",
                  {
                    minimumFractionDigits:2
                  }
                )}`
              }

            />



            <InfoCard

              icon={<DollarSign size={18}/>}

              title="Precio compra"

              value={
                `$${producto.precio_compra.toLocaleString(
                  "es-MX",
                  {
                    minimumFractionDigits:2
                  }
                )}`
              }

            />



            <InfoCard

              icon={<Warehouse size={18}/>}

              title="Stock"

              value={`${producto.stock} unidades`}

            />



            <InfoCard

              icon={<Hash size={18}/>}

              title="Código"

              value={producto.codigo ?? "-"}

            />


          </div>
                    {/* INFORMACIÓN BOTÁNICA */}


          <div

            className="
            rounded-2xl

            border
            border-white/10

            bg-white/[0.03]

            p-5

            space-y-4
            "

          >


            <div className="flex items-center gap-2">

              <Sprout
                size={18}
                className="text-green-400"
              />

              <h3 className="text-sm font-semibold text-white">

                Información botánica

              </h3>


            </div>




            <div

              className="
              grid
              grid-cols-2
              gap-4
              "

            >



              <InfoCard

                icon={<Sprout size={16}/>}

                title="Tipo"

                value={
                  producto.tipo ?? "-"
                }

              />



              <InfoCard

                icon={<Sun size={16}/>}

                title="Luz"

                value={
                  producto.luz ?? "-"
                }

              />




              <InfoCard

                icon={<Droplets size={16}/>}

                title="Riego"

                value={
                  producto.frecuencia_riego ?? "-"
                }

              />



              <InfoCard

                icon={<MapPin size={16}/>}

                title="Ubicación"

                value={
                  producto.ubicacion ?? "-"
                }

              />


            </div>



          </div>







          {/* CONDICIONES DE CULTIVO */}



          <div

            className="
            rounded-2xl

            border
            border-white/10

            bg-white/[0.03]

            p-5

            space-y-4
            "

          >



            <div className="flex items-center gap-2">


              <Thermometer

                size={18}

                className="text-green-400"

              />


              <h3 className="text-sm font-semibold text-white">

                Condiciones de cultivo

              </h3>



            </div>





            <div

              className="
              grid
              grid-cols-2

              gap-4
              "

            >




              <InfoCard

                icon={<Thermometer size={16}/>}

                title="Temperatura"

                value={

                  producto.temperatura_min !== null &&

                  producto.temperatura_max !== null

                  ?

                  `${producto.temperatura_min}°C - ${producto.temperatura_max}°C`

                  :

                  "-"

                }

              />





              <InfoCard

                icon={<Ruler size={16}/>}

                title="Altura promedio"

                value={

                  producto.altura_promedio

                  ?

                  `${producto.altura_promedio} cm`

                  :

                  "-"

                }

              />






              <InfoCard

                icon={<BoxIcon/>}

                title="Maceta"

                value={
                  producto.diametro_maceta ?? "-"
                }

              />




              <InfoCard

                icon={<Sprout size={16}/>}

                title="Origen"

                value={
                  producto.origen ?? "-"
                }

              />



            </div>


          </div>








          {/* DESCRIPCIÓN */}




          <InfoSection

            title="Descripción"

            value={
              producto.descripcion ||
              "Sin descripción."
            }

          />








          {/* OBSERVACIONES */}



          <InfoSection

            title="Observaciones"

            value={

              producto.observaciones ||

              "Sin observaciones."

            }

          />









          {/* FECHAS */}



          <div

            className="
            grid
            grid-cols-2
            gap-4
            "

          >



            <InfoCard

              icon={<CalendarDays size={18}/>}

              title="Creado"

              value={
                formatearFecha(
                  producto.created_at
                )
              }

            />




            <InfoCard

              icon={<CalendarDays size={18}/>}

              title="Actualizado"

              value={
                formatearFecha(
                  producto.updated_at
                )
              }

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



          <button

            onClick={onEdit}

            className="
            group

            w-full

            rounded-2xl


            bg-gradient-to-r

            from-[#6db56d]

            to-[#82c982]


            py-3.5


            text-[#081008]


            font-semibold


            flex

            items-center

            justify-center

            gap-3


            shadow-lg

            shadow-green-900/20


            hover:scale-[1.01]


            transition
            "

          >



            <span

              className="
              flex
              items-center
              justify-center

              w-8
              h-8

              rounded-xl

              bg-black/10

              "

            >

              <Pencil size={16}/>


            </span>




            Editar producto



          </button>



        </div>




      </aside>


    </>

  );


}








type InfoCardProps = {

  icon?: React.ReactNode;

  title:string;

  value:string;

};





function InfoCard({

  icon,

  title,

  value,

}:InfoCardProps){



  return (



    <div

      className="
      rounded-xl

      border

      border-white/10

      bg-white/[0.03]

      p-4

      hover:bg-white/[0.06]

      transition
      "

    >



      <div

        className="
        flex
        items-center
        gap-2

        text-xs

        uppercase

        tracking-wider

        text-white/40
        "

      >



        {icon}


        {title}



      </div>





      <div

        className="
        mt-2

        text-white

        font-semibold
        "

      >

        {value}


      </div>



    </div>


  );

}








function InfoSection({

  title,

  value,

}:{

  title:string;

  value:string;

}){


  return (

    <div

      className="
      rounded-xl

      border

      border-white/10

      bg-white/[0.03]

      p-4
      "

    >


      <p

        className="
        text-xs

        uppercase

        tracking-wider

        text-white/40
        "

      >

        {title}

      </p>




      <p

        className="
        mt-2

        text-sm

        text-white/80

        leading-relaxed
        "

      >

        {value}

      </p>



    </div>


  );

}





function BoxIcon(){

  return (

    <svg

      width="16"

      height="16"

      viewBox="0 0 24 24"

      fill="none"

      stroke="currentColor"

      strokeWidth="2"

      strokeLinecap="round"

      strokeLinejoin="round"

    >

      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>

      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>

      <line x1="12" y1="22.08" x2="12" y2="12"/>

    </svg>

  );

}