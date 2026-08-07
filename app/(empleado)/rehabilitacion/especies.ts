export type Especie = {
  id: number;
  nombre: string;
  categoria: string;

  alturaObjetivo: number; // cm

  riego: string;
  luz: string;
  fertilizacion: string;

  crecimiento: "Lento" | "Medio" | "Rápido";

  humedad: "Baja" | "Media" | "Alta";

  temperaturaMin: number;
  temperaturaMax: number;
};

export const especies: Especie[] = [
  {
    id: 1,
    nombre: "Palmera Washingtonia",
    categoria: "Palmera",
    alturaObjetivo: 150,
    riego: "Cada 3 días",
    luz: "Pleno sol",
    fertilizacion: "Cada 30 días",
    crecimiento: "Lento",
    humedad: "Media",
    temperaturaMin: 18,
    temperaturaMax: 35,
  },

  {
    id: 2,
    nombre: "Orquídea",
    categoria: "Flor",
    alturaObjetivo: 35,
    riego: "Cada 7 días",
    luz: "Sombra",
    fertilizacion: "Cada 45 días",
    crecimiento: "Medio",
    humedad: "Alta",
    temperaturaMin: 16,
    temperaturaMax: 28,
  },

  {
    id: 3,
    nombre: "Rosal",
    categoria: "Flor",
    alturaObjetivo: 45,
    riego: "Cada 2 días",
    luz: "Medio sol",
    fertilizacion: "Cada 30 días",
    crecimiento: "Rápido",
    humedad: "Media",
    temperaturaMin: 15,
    temperaturaMax: 30,
  },

  {
    id: 4,
    nombre: "Bugambilia",
    categoria: "Arbusto",
    alturaObjetivo: 80,
    riego: "Cada 4 días",
    luz: "Pleno sol",
    fertilizacion: "Cada 30 días",
    crecimiento: "Rápido",
    humedad: "Media",
    temperaturaMin: 18,
    temperaturaMax: 38,
  },

  {
    id: 5,
    nombre: "Cactus",
    categoria: "Suculenta",
    alturaObjetivo: 12,
    riego: "Cada 15 días",
    luz: "Pleno sol",
    fertilizacion: "Cada 60 días",
    crecimiento: "Lento",
    humedad: "Baja",
    temperaturaMin: 15,
    temperaturaMax: 40,
  },

  {
    id: 6,
    nombre: "Suculenta",
    categoria: "Suculenta",
    alturaObjetivo: 15,
    riego: "Cada 10 días",
    luz: "Medio sol",
    fertilizacion: "Cada 45 días",
    crecimiento: "Medio",
    humedad: "Baja",
    temperaturaMin: 16,
    temperaturaMax: 32,
  },

  {
    id: 7,
    nombre: "Ficus",
    categoria: "Árbol",
    alturaObjetivo: 120,
    riego: "Cada 5 días",
    luz: "Luz indirecta",
    fertilizacion: "Cada 30 días",
    crecimiento: "Medio",
    humedad: "Media",
    temperaturaMin: 18,
    temperaturaMax: 30,
  },

  {
    id: 8,
    nombre: "Lavanda",
    categoria: "Flor",
    alturaObjetivo: 40,
    riego: "Cada 4 días",
    luz: "Pleno sol",
    fertilizacion: "Cada 40 días",
    crecimiento: "Rápido",
    humedad: "Baja",
    temperaturaMin: 15,
    temperaturaMax: 32,
  },
];