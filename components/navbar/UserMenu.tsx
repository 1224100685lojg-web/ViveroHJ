"use client";

import { useState } from "react";

type User = {
  name: string;
  role: string;
};

export default function UserMenu() {

  const [user] = useState<User>(() => {
    if (typeof window === "undefined") {
      return {
        name: "Usuario",
        role: "",
      };
    }

    const saved = localStorage.getItem("flora-user");

    if (!saved) {
      return {
        name: "Usuario",
        role: "",
      };
    }

    try {
      return JSON.parse(saved);
    } catch {
      return {
        name: "Usuario",
        role: "",
      };
    }
  });

  return (
    <div className="flex items-center gap-3">

      <div className="hidden sm:block text-right">
        <p className="text-sm text-[#e8f4e8]">
          {user.name}
        </p>

        <p className="text-[11px] text-white/40 uppercase">
          {user.role}
        </p>
      </div>

      <div
        className="
          w-9 h-9 rounded-full
          bg-[#2a4a2a]
          border border-[#6db56d]/30
          flex items-center justify-center
          text-[#a8d5a8]
          text-xs font-medium
        "
      >
        {user.name.charAt(0).toUpperCase()}
      </div>

    </div>
  );
}