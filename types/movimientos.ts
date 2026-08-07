export type Movimiento = {
  id: string;

  tipo:
    | "ENTRADA"
    | "SALIDA"
    | "AJUSTE"
    | "APARTADO"
    | "PEDIDO";

  cantidad: number;

  motivo: string | null;

  observaciones: string | null;

  created_at: string;

  producto_id: string | null;

  referencia_id: string | null;

  productos?: {
    nombre: string;
    codigo: string | null;
  } | null;

  usuarios?: {
    nombre: string;
  } | null;

  pedido_producto?: string | null;

  apartado_estado?: string | null;
};