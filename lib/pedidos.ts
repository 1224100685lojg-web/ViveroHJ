import { supabase } from "./supabase";

export type Pedido = {
  id: string;
  cliente: string;
  telefono: string | null;
  producto: string;
  cantidad: number;
  observaciones: string | null;
  estado: string;
  fecha_entrega: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string | null;
};

export async function obtenerPedidos() {
  return await supabase
    .from("pedidos")
    .select("*")
    .eq("activo", true)
    .order("created_at", { ascending: false });
}

export async function obtenerPedido(id: string) {
  return await supabase
    .from("pedidos")
    .select("*")
    .eq("id", id)
    .single();
}

export async function crearPedido(
  pedido: Omit<Pedido, "id" | "created_at" | "updated_at">
) {
  return await supabase
    .from("pedidos")
    .insert({
      ...pedido,
      activo: true,
    });
}

export async function actualizarPedido(
  id: string,
  pedido: Partial<Pedido>
) {
  return await supabase
    .from("pedidos")
    .update({
      ...pedido,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
}

export async function eliminarPedido(id: string) {
  return await supabase
    .from("pedidos")
    .update({
      activo: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
}