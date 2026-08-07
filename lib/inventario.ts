import { supabase } from "./supabase";

export type Producto = {
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

  categoria_id: string | null;
  proveedor_id: string | null;

  tipo_medicion: string | null;
  unidad_medicion: string | null;

  created_at?: string;
  updated_at?: string;

  categorias?: {
  nombre: string;
} | null;
};

export async function obtenerProductos() {
  return await supabase
    .from("productos")
    .select(`
      *,
      categorias(
        nombre
      )
    `)
    .eq("activo", true)
    .order("nombre");
}

export async function obtenerProducto(id: string) {
  return await supabase
    .from("productos")
    .select(`
      *,
      categorias(
        nombre
      )
    `)
    .eq("id", id)
    .single();
}

export async function actualizarStock(
  productoId: string,
  nuevoStock: number
) {
  return await supabase
    .from("productos")
    .update({
      stock: nuevoStock,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productoId);
}

export async function registrarMovimiento({
  producto_id,
  usuario_id,
  tipo,
  cantidad,
  motivo,
  observaciones,
}: {
  producto_id: string;
  usuario_id?: string;
  tipo: "ENTRADA" | "SALIDA" | "AJUSTE";
  cantidad: number;
  motivo?: string;
  observaciones?: string;
}) {
  return await supabase
    .from("movimientos_inventario")
    .insert({
      producto_id,
      usuario_id: usuario_id ?? null,
      tipo,
      cantidad,
      motivo: motivo || null,
      observaciones: observaciones || null,
    });
}

export async function obtenerMovimientos() {
  return await supabase
    .from("movimientos_inventario")
    .select(`
      *,
      productos(
        nombre,
        codigo
      )
    `)
    .order("created_at", { ascending: false });
}