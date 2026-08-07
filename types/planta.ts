export type TipoMedicion =
  | "altura"
  | "cobertura"
  | "estado"
  | "cantidad"
  | "dimension"
  | null;


export type Planta = {
  id: string;

  codigo: string | null;

  producto_id: string | null;

  nombre: string;

  nombre_cientifico: string | null;

  imagen: string | null;

  tipo: string | null;

  estado:
    | "Desarrollo"
    | "Rehabilitación"
    | "Lista"
    | "Crítica";

  responsable: string | null;

  proximoCuidado: string | null;

  medicionActual: number;

  medicionMeta: number | null;

  tipoMedicion:
    | "altura"
    | "cobertura"
    | "estado"
    | "cantidad"
    | "dimension"
    | null;
};