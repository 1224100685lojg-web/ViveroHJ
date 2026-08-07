"use client";

import { useEffect, useState } from "react";
import { obtenerProductos, Producto } from "@/lib/inventario";

import ProductCard from "../ProductCard";
import CartItem from "../CartItem";
import SaleModal from "../SaleModal";
import ProductQuickModal from "@/components/ProductQuickModal";
import { useCart } from "../CartContext";
import { useSearch } from "@/context/SearchContext";
import { finalizarVenta } from "@/lib/ventas";
import { supabase } from "@/lib/supabase";



export default function VentasPage() {

  const { carrito, vaciarCarrito } = useCart();

  const { busqueda } = useSearch();

  const [productos, setProductos] = useState<Producto[]>([]);
const [cargando, setCargando] = useState(true);


  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Todas");


const [modalAbierto, setModalAbierto] =
  useState(false);


const [productoSeleccionado, setProductoSeleccionado] =
  useState<Producto | null>(null);


const [cajero, setCajero] = useState("Cargando...");
  const [numeroVenta, setNumeroVenta] = useState("000001");


  useEffect(() => {
  cargarProductos();
  cargarCajero();
  cargarNumeroVenta();

}, []);

async function cargarProductos() {
  setCargando(true);

  const { data, error } = await obtenerProductos();

  if (error) {
    console.error("Error al cargar productos:", error);
  } else {
    setProductos(data ?? []);
  }

  setCargando(false);
}

async function cargarCajero() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { data: usuario } = await supabase
    .from("usuarios")
    .select("nombre")
    .eq("auth_user_id", user.id)
    .single();

  setCajero(
    usuario?.nombre ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Usuario"
  );
}

async function cargarNumeroVenta() {
  const { data } = await supabase
    .from("ventas")
    .select("folio")
    .order("folio", { ascending: false })
    .limit(1)
    .single();

  const siguiente = (data?.folio ?? 0) + 1;

  setNumeroVenta(String(siguiente).padStart(6, "0"));
}

const categorias = [
  "Todas",
  ...Array.from(
    new Set(
      productos
        .map((producto)=>producto.tipo)
        .filter(Boolean)
    )
  )
];



const productosFiltrados = productos.filter((producto)=>{


  const coincideBusqueda =
    producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());



  const coincideCategoria =
    categoriaSeleccionada === "Todas"
    ||
    producto.tipo === categoriaSeleccionada;



  return (
    coincideBusqueda &&
    coincideCategoria
  );


});



  const subtotal = carrito.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  );


  const totalArticulos = carrito.reduce(
    (total, producto) =>
      total + producto.cantidad,
    0
  );



  return (
    <>

    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-5
      "
    >



        {/* PRODUCTOS */}

        <section className="lg:col-span-9">


          <div
            className="
              bg-white/[0.03]
              border
              border-white/5
              rounded-xl
              p-5
              mb-5
            "
          >


          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-between
              items-start
              sm:items-center
              gap-4
            "
          >

              <div>

                <h1
                  className="
                    text-xl
                    sm:text-2xl
                    font-semibold
                    text-white
                  "
                >
                  Nueva Venta
                </h1>


                <p
                  className="
                    text-sm
                    text-white/40
                    mt-1
                  "
                >
                  Selecciona productos para agregarlos al carrito.
                </p>


              </div>



              <div className="text-right">

                <p
                  className="
                    text-xs
                    text-white/30
                  "
                >
                  Venta #
                </p>


                <p
                  className="
                    text-lg
                    sm:text-xl
                    font-semibold
                    text-[#a8d5a8]
                  "
                >
                  {numeroVenta}
                </p>


              </div>


            </div>





            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-3
                mt-3
              "
            >

              <InfoCard
                title="Cliente"
                value="Público General"
              />


              <InfoCard
                title="Cajero"
                value={cajero}
              />


              <InfoCard
                title="Fecha"
                value={new Date().toLocaleDateString()}
              />


              <InfoCard
                title="Total actual"
                value={`$${subtotal.toFixed(2)}`}
                highlight
              />


            </div>




            <div
              className="
                flex
                flex-wrap
                gap-2
                mt-3
              "
            >

              {categorias.map((categoria) => (

                <button
                  key={categoria}
                    onClick={() =>
                      setCategoriaSeleccionada(categoria ?? "")
                    }
                  className={`
                    px-4
                    py-2
                    rounded-lg
                    text-sm
                    transition

                    ${
                      categoriaSeleccionada === categoria
                        ? "bg-[#6db56d]/20 text-[#a8d5a8]"
                        : "bg-white/5 text-white/40 hover:bg-white/10"
                    }
                  `}
                >
                  {categoria}
                </button>

              ))}


            </div>


          </div>





          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              gap-4
            "
          >


            {productosFiltrados.length > 0 ? (

              productosFiltrados.map((producto) => (

<ProductCard
  key={producto.id}
  id={producto.id}
  nombre={producto.nombre}
  precio={producto.precio_venta}
  stock={producto.stock}
  imagen={producto.imagen}
  categoria={producto.tipo ?? undefined}

  onOpen={()=>{
    setProductoSeleccionado(producto);
  }}
/>

              ))

            ) : (

              <div
                className="
                  col-span-full
                  py-20
                  text-center
                "
              >

                <h2
                  className="
                    text-xl
                    font-semibold
                    text-white
                  "
                >
                  No se encontraron productos
                </h2>


                <p className="text-white/30 mt-2">
                  Intenta con otro nombre o categoría.
                </p>


              </div>

            )}


          </div>


        </section>







        {/* CARRITO */}

<aside
  className="
    lg:col-span-3
    bg-white/[0.03]
    border
    border-white/5
    rounded-xl
    p-5
    lg:sticky
    lg:top-5
    h-[calc(100vh-40px)]
    flex
    flex-col
  "
>


          <div
            className="
              flex
              justify-between
              items-center
              border-b
              border-white/5
              pb-4
            "
          >

            <div>

              <h2 className="text-lg font-semibold text-white">
                Carrito
              </h2>


              <p className="text-xs text-white/40 mt-1">
                {totalArticulos} artículo
                {totalArticulos !== 1 ? "s" : ""}
              </p>


            </div>



            {carrito.length > 0 && (

              <button
                onClick={vaciarCarrito}
                className="
                  text-xs
                  text-red-300
                  hover:text-red-200
                "
              >
                Vaciar
              </button>

            )}


          </div>





          {carrito.length === 0 ? (

            <div
              className="
                py-12
                text-center
              "
            >

              <div className="text-5xl">
                🛒
              </div>

              <p className="text-white mt-3">
                Carrito vacío
              </p>

              <p className="text-xs text-white/30 mt-1">
                Agrega productos para comenzar.
              </p>


            </div>


          ) : (

<div
  className="
    space-y-3
    py-4
    max-h-[55vh]
    overflow-y-auto
    pr-2
  "
>

              {carrito.map((producto) => (

                <CartItem
                  key={producto.id}
                  producto={producto}
                />

              ))}


            </div>

          )}






<div
  className="
    border-t
    border-white/5
    pt-4
    pb-1
    sticky
    bottom-0
  bg-[#162716]
    mt-auto
  "
>

            <div className="flex justify-between text-sm text-white/40">

              <span>
                Artículos
              </span>

              <span>
                {totalArticulos}
              </span>

            </div>



            <div className="flex justify-between text-sm text-white/40 mt-2">

              <span>
                Subtotal
              </span>

              <span>
                ${subtotal.toFixed(2)}
              </span>

            </div>



            <div
              className="
                flex
                justify-between
                mt-2
              "
            >

              <span className="text-white font-medium">
                Total
              </span>


              <span className="text-lg font-bold font-semibold text-[#a8d5a8]">
                ${subtotal.toFixed(2)}
              </span>


            </div>




            <button
              disabled={carrito.length === 0}
              onClick={() => setModalAbierto(true)}
              className={`
                w-full
                mt-3
                py-2
                rounded-lg
                text-sm
                transition

                ${
                  carrito.length === 0
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-[#6db56d]/20 text-[#a8d5a8] hover:bg-[#6db56d]/30"
                }
              `}
            >
              Finalizar Venta
            </button>


          </div>


        </aside>


      </div>
  
  <ProductQuickModal
  producto={productoSeleccionado}
  open={!!productoSeleccionado}
  onClose={()=>{
    setProductoSeleccionado(null);
  }}
/>




      <SaleModal
        open={modalAbierto}
        total={subtotal}
        onClose={() => setModalAbierto(false)}
onConfirm={async () => {

  console.log("🔥 CLICK FINALIZAR VENTA");

  console.log(
    "CARRITO:",
    carrito
  );

  try {

const venta = await finalizarVenta(carrito);

console.log(
  "VENTA RETORNADA:",
  venta
);

// Mostrar el siguiente número
setNumeroVenta(
  String(venta.folio + 1).padStart(6, "0")
);

alert("Venta realizada correctamente.");

vaciarCarrito();

setModalAbierto(false);


  } catch (error) {

    console.error(
      "ERROR FINALIZAR VENTA:",
      error
    );

    alert(
      "No se pudo registrar la venta."
    );

  }

}}
      />


    </>
  );
}





function InfoCard({
  title,
  value,
  highlight = false,
}: {
  title: string;
  value: string;
  highlight?: boolean;
}) {


  return (

    <div
      className="
        bg-white/[0.03]
        border
        border-white/5
        rounded-lg
        p-3
      "
    >

      <p className="text-[11px] text-white/30">
        {title}
      </p>


      <p
        className={`
          mt-1
          text-sm
          font-medium
          ${
            highlight
              ? "text-[#a8d5a8]"
              : "text-white"
          }
        `}
      >
        {value}
      </p>


    </div>

  );

}