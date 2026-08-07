type Props = {
  actual: number;
  objetivo: number;
};

export default function ProgresoCrecimiento({
  actual,
  objetivo,
}: Props) {
  const porcentaje =
    objetivo > 0
      ? Math.min(Math.round((actual / objetivo) * 100), 100)
      : 0;

  let color = "bg-red-500";
  let estado = "Crecimiento inicial";

  if (porcentaje <= 30) {
    color = "bg-red-500";
    estado = "Crecimiento inicial";
  } else if (porcentaje <= 70) {
    color = "bg-yellow-500";
    estado = "En desarrollo";
  } else if (porcentaje < 100) {
    color = "bg-green-500";
    estado = "Casi lista";
  } else {
    color = "bg-emerald-500";
    estado = "Lista para venta";
  }

  return (
    <div className="min-w-[220px]">

      <div className="flex justify-between items-center text-[11px] text-white/40 mb-1">

        <span>
          {actual} cm / {objetivo} cm
        </span>

        <span className="font-medium">
          {porcentaje}%
        </span>

      </div>

      <div
        className="
          w-full
          h-2.5
          rounded-full
          bg-white/10
          overflow-hidden
        "
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{
            width: `${porcentaje}%`,
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-2">

        <span
          className={`
            text-xs
            font-medium

            ${
              porcentaje <= 30
                ? "text-red-400"
                : porcentaje <= 70
                ? "text-yellow-300"
                : porcentaje < 100
                ? "text-green-300"
                : "text-emerald-400"
            }
          `}
        >
          {estado}
        </span>

        <span className="text-[11px] text-white/35">
          Meta: {objetivo} cm
        </span>

      </div>

    </div>
  );
}