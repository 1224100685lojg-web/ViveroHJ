type Props = {
  estado: "Desarrollo" | "Rehabilitación" | "Lista" | "Crítica";
};

export default function EstadoPlanta({
  estado,
}: Props) {
  let clases = "";

  switch (estado) {
    case "Lista":
      clases =
        "bg-green-500/15 text-green-300 border border-green-500/20";
      break;

    case "Desarrollo":
      clases =
        "bg-yellow-500/15 text-yellow-300 border border-yellow-500/20";
      break;

    case "Rehabilitación":
      clases =
        "bg-orange-500/15 text-orange-300 border border-orange-500/20";
      break;

    case "Crítica":
      clases =
        "bg-red-500/15 text-red-300 border border-red-500/20";
      break;

    default:
      clases =
        "bg-white/10 text-white/60 border border-white/10";
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        ${clases}
      `}
    >
      {estado}
    </span>
  );
}