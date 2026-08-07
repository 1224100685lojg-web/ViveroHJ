"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Producto = {
  id: string;
  nombre: string;
  stock: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export default function EntradaModal({
  open,
  onClose,
  onSaved,
}: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);

  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!open) return;

    cargarProductos();
  }, [open]);

  async function cargarProductos() {
    const { data } = await supabase
      .from("productos")
      .select("id,nombre,stock")
      .order("nombre");

    setProductos(data ?? []);
  }

  async function guardarEntrada() {
    if (!producto) {
      alert("Selecciona un producto.");
      return;
    }

    if (!cantidad || Number(cantidad) <= 0) {
      alert("Ingresa una cantidad válida.");
      return;
    }

    setGuardando(true);

    const cantidadNumero = Number(cantidad);

    const productoActual = productos.find(
      (p) => p.id === producto
    );

    if (!productoActual) {
      alert("Producto no encontrado.");
      setGuardando(false);
      return;
    }

    // Actualizar stock

    const { error: errorStock } = await supabase
      .from("productos")
      .update({
        stock: productoActual.stock + cantidadNumero,
      })
      .eq("id", producto);

    if (errorStock) {
      setGuardando(false);
      alert(errorStock.message);
      return;
    }

    // Registrar movimiento

    const { error: errorMovimiento } = await supabase
      .from("movimientos_inventario")
      .insert({
        producto_id: producto,
        tipo: "ENTRADA",
        cantidad: cantidadNumero,
        motivo: motivo || null,
        observaciones: observaciones || null,
      });

    setGuardando(false);

    if (errorMovimiento) {
      alert(errorMovimiento.message);
      return;
    }

    setProducto("");
    setCantidad("");
    setMotivo("");
    setObservaciones("");

    onSaved();
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f1a0f] p-6 shadow-2xl">

        <div className="mb-6">

          <h2 className="text-2xl font-semibold text-white">
            Registrar entrada
          </h2>

          <p className="mt-1 text-sm text-white/50">
            Agrega existencias al inventario.
          </p>

        </div>

        <div className="space-y-4">

<select
  value={producto}
  onChange={(e) => setProducto(e.target.value)}
  className="
    w-full
    rounded-lg
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
  <option
    value=""
    className="bg-[#162416] text-white"
  >
    Selecciona un producto
  </option>

  {productos.map((item) => (
    <option
      key={item.id}
      value={item.id}
      className="bg-[#162416] text-white"
    >
      {item.nombre} (Stock: {item.stock})
    </option>
  ))}
</select>

          <input
            type="number"
            min="1"
            value={cantidad}
            onChange={(e) =>
              setCantidad(e.target.value)
            }
            placeholder="Cantidad"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

          <input
            value={motivo}
            onChange={(e) =>
              setMotivo(e.target.value)
            }
            placeholder="Motivo"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

          <textarea
            rows={3}
            value={observaciones}
            onChange={(e) =>
              setObservaciones(e.target.value)
            }
            placeholder="Observaciones"
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={guardando}
            className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-white transition hover:bg-white/10 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            onClick={guardarEntrada}
            disabled={guardando}
            className="rounded-lg bg-[#6db56d] px-5 py-2.5 font-medium text-black transition hover:brightness-110 disabled:opacity-50"
          >
            {guardando
              ? "Registrando..."
              : "Registrar entrada"}
          </button>

        </div>

      </div>

    </div>
  );
}