export default function ApartadoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {


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
          text-white/30
        "
      >
        {title}
      </p>


      <p
        className="
          text-2xl
          font-semibold
          text-[#a8d5a8]
          mt-2
        "
      >
        {value}
      </p>


    </div>

  );

}