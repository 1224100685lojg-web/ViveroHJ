import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  subtitleColor?: string;
  icon?: ReactNode;
  iconBg?: string;
  iconColor?: string;
};

export default function DashboardCard({
  title,
  value,
  subtitle = "",
  subtitleColor = "#888",
  icon,
  iconBg = "transparent",
  iconColor = "#fff",
}: Props) {
  return (
    <div
      className="
        bg-[#0f1a0f]
        border border-white/5
        rounded-xl
        p-4
        hover:border-white/10
        transition
      "
    >

      {/* TOP */}
      <div className="flex items-center justify-between mb-4">

        <p className="text-[11px] text-white/35 tracking-wide">
          {title}
        </p>

    {icon && (
      <div
        className="
          w-8 h-8
          rounded-lg
          flex items-center justify-center
        "
        style={{
          background: iconBg,
          color: iconColor,
        }}
      >
        {icon}
      </div>
    )}

      </div>

      {/* VALUE */}
      <h3 className="text-3xl font-medium text-[#e8f4e8] mb-2">
        {value}
      </h3>

      {/* SUB */}
      <p
        className="text-[11px]"
        style={{
          color: subtitleColor,
        }}
      >
        {subtitle}
      </p>

    </div>
  );
}