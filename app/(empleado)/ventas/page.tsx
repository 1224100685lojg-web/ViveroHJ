import ProductCard from "../ProductCard";

const productos = [
  {
    nombre: "Cactus Mini",
    precio: 65,
    stock: 20,
  },
  {
    nombre: "Suculenta",
    precio: 45,
    stock: 18,
  },
  {
    nombre: "Rosa",
    precio: 120,
    stock: 12,
  },
  {
    nombre: "Maceta",
    precio: 85,
    stock: 30,
  },
  {
    nombre: "Tierra Negra",
    precio: 55,
    stock: 40,
  },
  {
    nombre: "Orquídea",
    precio: 240,
    stock: 6,
  },
];

export default function VentasPage() {
  return (
    <div className="grid grid-cols-12 gap-5 h-full">

      <section className="col-span-9">

        <h1 className="text-3xl font-bold text-white">
          Nueva Venta
        </h1>

        <p className="text-white/50 mt-2">
          Selecciona los productos para comenzar.
        </p>

        <div className="mt-8">

<div className="grid grid-cols-4 gap-4">

  {productos.map((producto) => (

    <ProductCard
      key={producto.nombre}
      nombre={producto.nombre}
      precio={producto.precio}
      stock={producto.stock}
    />

  ))}

</div>

        </div>

      </section>

      <aside
        className="
        col-span-3
        rounded-2xl
        border
        border-[#274127]
        bg-[#162616]
        p-5
        "
      >

        <h2 className="text-white text-xl font-semibold">
          Carrito
        </h2>

        <p className="text-white/40 mt-8">
          No hay productos agregados.
        </p>

      </aside>

    </div>
  );
}