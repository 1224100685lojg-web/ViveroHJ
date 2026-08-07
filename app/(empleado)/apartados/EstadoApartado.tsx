export default function EstadoApartado({
  estado,
}: {
  estado: string;
}) {

  const estilos = {
    pendiente: "bg-yellow-500/10 text-yellow-300",
    entregado: "bg-green-500/10 text-green-300",
    cancelado: "bg-red-500/10 text-red-300",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        capitalize
        ${
          estilos[
            estado.toLowerCase() as keyof typeof estilos
          ] || "bg-white/10 text-white/40"
        }
      `}
    >
      {estado}
    </span>
  );
}