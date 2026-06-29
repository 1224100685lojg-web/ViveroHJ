"use client";

type Props = {
  nombre: string;
  precio: number;
  stock: number;
};

export default function ProductCard({
  nombre,
  precio,
  stock,
}: Props) {
  return (
    <div
      className="
      bg-[#162616]
      border
      border-[#274127]
      rounded-2xl
      p-4
      flex
      flex-col
      justify-between
      hover:border-[#6db56d]
      hover:shadow-lg
      transition
      "
    >
      <div className="flex justify-center text-6xl">
        🌿
      </div>

      <div>

        <h3 className="text-white font-semibold mt-3">
          {nombre}
        </h3>

        <p className="text-white/40 text-sm">
          Stock: {stock}
        </p>

      </div>

      <div className="mt-5">

        <p className="text-[#8fd18f] text-xl font-bold">
          ${precio}
        </p>

        <button
          className="
          mt-3
          w-full
          bg-[#6db56d]
          text-[#081008]
          rounded-xl
          py-2
          font-semibold
          hover:scale-105
          transition
          "
        >
          Agregar
        </button>

      </div>

    </div>
  );
}