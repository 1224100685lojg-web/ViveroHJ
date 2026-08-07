"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Pedido = {
  id: string;
  cliente: string;
  telefono: string | null;
  producto: string;
  cantidad: number;
  observaciones: string | null;
  estado: string;
  fecha_entrega: string | null;
  activo: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  pedido: Pedido | null;
};

const estados = [
  "Pendiente",
  "En búsqueda",
  "Conseguido",
  "Entregado",
  "Cancelado",
];

export default function PedidoModal({
  open,
  onClose,
  onSaved,
  pedido,
}: Props) {
  const [cliente, setCliente] = useState("");
  const [telefono, setTelefono] = useState("");
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [observaciones, setObservaciones] = useState("");

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (pedido) {
      setCliente(pedido.cliente);
      setTelefono(pedido.telefono ?? "");
      setProducto(pedido.producto);
      setCantidad(String(pedido.cantidad));
      setFechaEntrega(pedido.fecha_entrega ?? "");
      setEstado(pedido.estado);
      setObservaciones(pedido.observaciones ?? "");
    } else {
      limpiarFormulario();
    }
  }, [pedido, open]);

  function limpiarFormulario() {
    setCliente("");
    setTelefono("");
    setProducto("");
    setCantidad("1");
    setFechaEntrega("");
    setEstado("Pendiente");
    setObservaciones("");
  }

  async function guardarPedido() {
    if (!cliente.trim()) {
      alert("Ingresa el nombre del cliente.");
      return;
    }

    if (!producto.trim()) {
      alert("Ingresa el producto solicitado.");
      return;
    }

    setGuardando(true);

    let error = null;

    if (pedido) {
      const { error: updateError } = await supabase
        .from("pedidos")
        .update({
          cliente: cliente.trim(),
          telefono: telefono.trim() || null,
          producto: producto.trim(),
          cantidad: Number(cantidad),
          fecha_entrega: fechaEntrega || null,
          estado,
          observaciones: observaciones.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", pedido.id);

      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("pedidos")
        .insert({
          cliente: cliente.trim(),
          telefono: telefono.trim() || null,
          producto: producto.trim(),
          cantidad: Number(cantidad),
          fecha_entrega: fechaEntrega || null,
          estado,
          observaciones: observaciones.trim() || null,
          activo: true,
        });

      error = insertError;
    }

    setGuardando(false);

    if (error) {
      alert(error.message);
      return;
    }

    limpiarFormulario();
    onSaved();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f1a0f] p-6 shadow-2xl">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          {pedido
          ? `Editar pedido • ${pedido.producto}`
          : "Nuevo pedido"}
        </h2>

       {pedido && (
  <div className="mb-6 rounded-xl border border-white/10 bg-[#152315] p-5">
    <h3 className="mb-4 text-base font-semibold text-white">
      Información del pedido
    </h3>

    <div className="space-y-2 text-sm">
      <div>
        <span className="text-white/50">Cliente:</span>
        <span className="ml-2 text-white">{pedido.cliente}</span>
      </div>

      <div>
        <span className="text-white/50">Producto:</span>
        <span className="ml-2 text-white">{pedido.producto}</span>
      </div>

      <div>
        <span className="text-white/50">Estado actual:</span>
        <span className="ml-2 text-white">{pedido.estado}</span>
      </div>

      <div>
        <span className="text-white/50">Cantidad:</span>
        <span className="ml-2 text-white">{pedido.cantidad}</span>
      </div>

      <div>
        <span className="text-white/50">Fecha de entrega:</span>
        <span className="ml-2 text-white">
          {pedido.fecha_entrega || "Sin fecha"}
        </span>
      </div>
    </div>
  </div>
)}

        <div className="grid grid-cols-2 gap-4">

          <input
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Cliente"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

          <input
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Teléfono"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

          <input
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            placeholder="Producto solicitado"
            className="col-span-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

          <input
            type="date"
            value={fechaEntrega}
            onChange={(e) => setFechaEntrega(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="col-span-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          >
            {estados.map((item) => (
              <option
                key={item}
                value={item}
                className="bg-[#0f1a0f]"
              >
                {item}
              </option>
            ))}
          </select>

          <textarea
            rows={4}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            placeholder="Observaciones"
            className="col-span-2 resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#6db56d]"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={() => {
              limpiarFormulario();
              onClose();
            }}
            disabled={guardando}
            className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10"
          >
            Cancelar
          </button>

          <button
            onClick={guardarPedido}
            disabled={guardando}
            className="rounded-lg bg-[#6db56d] px-5 py-2.5 font-medium text-black hover:brightness-110"
          >
            {guardando
              ? pedido
                ? "Actualizando..."
                : "Guardando..."
              : pedido
              ? "Actualizar pedido"
              : "Guardar pedido"}
          </button>

        </div>

      </div>
    </div>
  );
}