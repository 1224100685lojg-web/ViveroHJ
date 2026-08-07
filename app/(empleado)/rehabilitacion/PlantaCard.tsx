type Props = {
  title: string;
  value: string;
};

export default function PlantaCard({
  title,
  value,
}: Props) {
  return (
    <div
      className="
        bg-white/[0.03]
        border
        border-white/5
        rounded-xl
        p-5
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-wider
          text-white/40
        "
      >
        {title}
      </p>

      <h2
        className="
          mt-3
          text-3xl
          font-semibold
          text-[#a8d5a8]
        "
      >
        {value}
      </h2>
    </div>
  );
}