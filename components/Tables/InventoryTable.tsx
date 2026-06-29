"use client";

import { useState } from "react";
import ProductModal from "../Modals/ProductModal";

export default function InventoryTable() {
  const [openModal, setOpenModal] = useState(false);
  const productos = [
    {
      id: "#V021",
      nombre: "Suculenta variada",
      categoria: "Plantas",
      cantidad: "84 pzs",
      precio: "$45.00",
      estado: "Disponible",
    },

    {
      id: "#V022",
      nombre: "Cactus columnar",
      categoria: "Plantas",
      cantidad: "37 pzs",
      precio: "$65.00",
      estado: "Disponible",
    },

    {
      id: "#V023",
      nombre: "Rosa inglesa roja",
      categoria: "Flores",
      cantidad: "11 pzs",
      precio: "$120.00",
      estado: "Bajo stock",
    },

    {
      id: "#V024",
      nombre: "Maceta terracota",
      categoria: "Macetas",
      cantidad: "0 pzs",
      precio: "$28.00",
      estado: "Agotado",
    },
  ];

  return (
<div className="w-full">

      {/* TABLA */}
      <div
        className="
          bg-[#0f1a0f]
          border border-white/5
          rounded-xl
          overflow-hidden
        "
      >

        {/* HEADER */}
<div
  className="
    flex items-center justify-between
    px-5 py-4
    border-b border-white/5
  "
>
  <h2 className="text-sm font-medium text-white">
    Inventario de productos
  </h2>

  <button
    onClick={() => setOpenModal(true)}
    className="
      px-4 py-2
      rounded-lg
      bg-[#6db56d]
      text-black
      text-sm
      font-medium
      hover:opacity-90
      transition
    "
  >
    + Nuevo producto
  </button>
</div>


        {/* TABLE */}
        <table className="w-full">

          <thead className="bg-[#111a11]">

            <tr className="text-left">

              <th className="px-5 py-3 text-[10px] font-medium text-white/30 uppercase">
                ID
              </th>

              <th className="px-5 py-3 text-[10px] font-medium text-white/30 uppercase">
                Producto
              </th>

              <th className="px-5 py-3 text-[10px] font-medium text-white/30 uppercase">
                Categoría
              </th>

              <th className="px-5 py-3 text-[10px] font-medium text-white/30 uppercase">
                Cant.
              </th>

              <th className="px-5 py-3 text-[10px] font-medium text-white/30 uppercase">
                Precio
              </th>

              <th className="px-5 py-3 text-[10px] font-medium text-white/30 uppercase">
                Estado
              </th>

            </tr>

          </thead>

          <tbody>

            {productos.map((producto) => (
              <tr
                key={producto.id}
                className="
                  border-t border-white/5
                  hover:bg-white/[0.02]
                  transition
                "
              >

                <td className="px-5 py-4 text-[11px] text-white/25">
                  {producto.id}
                </td>

                <td className="px-5 py-4 text-[12px] font-medium text-[#e8f4e8]">
                  {producto.nombre}
                </td>

                <td className="px-5 py-4 text-[11px] text-white/50">
                  {producto.categoria}
                </td>

                <td className="px-5 py-4 text-[11px] text-white/70">
                  {producto.cantidad}
                </td>

                <td className="px-5 py-4 text-[11px] text-white/70">
                  {producto.precio}
                </td>

                <td className="px-5 py-4">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-[10px] font-medium
                      ${
                        producto.estado === "Disponible"
                          ? "bg-green-500/10 text-[#a8d5a8]"
                          : producto.estado === "Bajo stock"
                          ? "bg-yellow-500/10 text-[#fac775]"
                          : "bg-red-500/10 text-[#f09595]"
                      }
                    `}
                  >
                    {producto.estado}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>


      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </div>
  );
}
