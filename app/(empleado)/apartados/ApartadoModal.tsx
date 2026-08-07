"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ApartadoModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) {

  const [cliente, setCliente] = useState("");
const [producto, setProducto] = useState("");
const [clientes, setClientes] = useState<any[]>([]);
const [productos, setProductos] = useState<any[]>([]);

const [cantidad, setCantidad] = useState("1");

const [total, setTotal] = useState("");
  const [anticipo, setAnticipo] = useState("");
  const [entrega, setEntrega] = useState("");
  const [guardando, setGuardando] = useState(false);

useEffect(() => {

  if(open){
    cargarDatos();
    limpiar();
  }

}, [open]);

  async function cargarDatos() {

    const { data: clientesData, error: clienteError } =
      await supabase
        .from("clientes")
        .select("id,nombre")
        .order("nombre");

    if (clienteError) console.error("ERROR CLIENTES:", clienteError);

const { data: productosData, error: productoError } =
  await supabase
    .from("productos")
    .select(`
      id,
      nombre,
      precio_venta,
      stock,
      activo
    `)
    .order("nombre");


if (productoError) {
  console.error("ERROR PRODUCTOS:", productoError);
}


console.log("PRODUCTOS APARTADOS:", productosData);

    setClientes(clientesData ?? []);
    setProductos(productosData ?? []);
  }


  async function guardarApartado() {

    if (!producto || !total || !entrega) {
      alert("Completa producto, total y fecha de entrega");
      return;
    }

    const precioTotal = Number(total);
    const pagoAnticipo = Number(anticipo || 0);

    if (pagoAnticipo > precioTotal) {
      alert("El anticipo no puede ser mayor al total");
      return;
    }

    const productoSeleccionado = productos.find(
      p => p.id === producto
    );

    const cantidadApartada = Number(cantidad);


if(
  cantidadApartada > productoSeleccionado.stock
){

  alert(
    `Stock insuficiente. Disponible: ${productoSeleccionado.stock}`
  );

  return;

}

    if (!productoSeleccionado) {
      alert("Selecciona un producto válido");
      return;
    }

    try {

      setGuardando(true);

      const { data: { user } } = await supabase.auth.getUser();

      let usuarioId = null;

      if (user) {
        const { data: usuario } = await supabase
          .from("usuarios")
          .select("id")
          .eq("auth_user_id", user.id)
          .single();

        usuarioId = usuario?.id ?? null;
      }


const { data: apartado, error: apartadoError } =
  await supabase
    .from("apartados")
    .insert({
      cliente_id: cliente || null,
      usuario_id: usuarioId,
      total: precioTotal,
      anticipo: pagoAnticipo,
      estado: "pendiente",
      fecha_entrega: entrega
    })
    .select("id")
    .single();


if (apartadoError) throw apartadoError;


const { error: detalleError } =
  await supabase
    .from("detalle_apartados")
    .insert({
      apartado_id: apartado.id,
      producto_id: producto,
      cantidad: cantidadApartada,
      precio_unitario: Number(productoSeleccionado.precio_venta)
    });


if (detalleError) throw detalleError;

const { error: stockError } =
  await supabase
    .from("productos")
    .update({
      stock:
        productoSeleccionado.stock -
        cantidadApartada
    })
    .eq(
      "id",
      producto
    );

if (stockError) throw stockError;

const { error: movimientoError } =
  await supabase
    .from("movimientos_inventario")
    .insert({
      producto_id: producto,
      usuario_id: usuarioId,
      cliente_id: cliente || null,
      tipo: "APARTADO",
      cantidad: cantidadApartada,
      motivo: "Nuevo apartado",

      referencia_id: apartado.id, // ✅ Correcto

      observaciones: `Apartado #${apartado.id.slice(0,8)}`
    });

if (movimientoError) throw movimientoError;


      alert("Apartado registrado correctamente");

      limpiar();
      onSave();
      onClose();

    } catch (error: any) {

      console.error("ERROR APARTADO:", error);

      alert(error.message ?? "Error creando apartado");

    } finally {

      setGuardando(false);

    }
  }


function limpiar() {
  setCliente("");
  setProducto("");
  setCantidad("1");
  setTotal("");
  setAnticipo("");
  setEntrega("");
}


  if (!open) return null;


  const inputStyle =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white";


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-[#0f1a0f] border border-white/10 rounded-xl w-[450px] p-6">

        <h2 className="text-xl font-semibold text-white">
          Nuevo Apartado
        </h2>

        <p className="text-sm text-white/40 mt-1">
          Reserva un producto para un cliente.
        </p>


        <div className="space-y-4 mt-6">

          <select
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            className={inputStyle}
          >
          <option 
            value=""
            className="bg-[#0f1a0f] text-white"
          >
            Público General
          </option>

            {clientes.map(c => (
              <option
                key={c.id}
                value={c.id}
                className="bg-[#0f1a0f] text-white"
              >
                {c.nombre}
              </option>
            ))}

          </select>


          <select
            value={producto}
onChange={e => {

  const id = e.target.value;

  setProducto(id);


  const prod = productos.find(
    p => p.id === id
  );


  if(prod){

    setTotal(
      (
        Number(prod.precio_venta) *
        Number(cantidad)
      ).toString()
    );

  }

}}
            className={inputStyle}
          >

              <option 
                value=""
                className="bg-[#0f1a0f] text-white"
              >
                Selecciona producto
              </option>


{productos.map(p => (
                <option
                  key={p.id}
                  value={p.id}
                  className="bg-[#0f1a0f] text-white"
                >
                  {p.nombre} - Stock: {p.stock}
                </option>
              ))}

          </select>

          <input
  value={cantidad}
  onChange={e => {

    const valor = e.target.value;

    setCantidad(valor);


    const prod = productos.find(
      p => p.id === producto
    );


    if(prod){

      setTotal(
        (
          Number(prod.precio_venta) *
          Number(valor || 1)
        ).toString()
      );

    }

  }}
  type="number"
  min="1"
  placeholder="Cantidad"
  className={inputStyle}
/>


          <input
            value={total}
            onChange={e => setTotal(e.target.value)}
            type="number"
            placeholder="Precio total"
            className={inputStyle}
          />


          <input
            value={anticipo}
            onChange={e => setAnticipo(e.target.value)}
            type="number"
            placeholder="Anticipo"
            className={inputStyle}
          />


          <input
            value={entrega}
            onChange={e => setEntrega(e.target.value)}
            type="date"
            className={inputStyle}
          />

        </div>


        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 text-white/60"
          >
            Cancelar
          </button>


          <button
            disabled={guardando}
            onClick={guardarApartado}
            className="px-4 py-2 rounded-lg bg-[#6db56d]/20 text-[#a8d5a8]"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>

        </div>

      </div>

    </div>
  );
}