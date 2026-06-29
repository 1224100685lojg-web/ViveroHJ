"use client";

import { Bell } from "lucide-react";

export default function Notifications() {
  return (
    <button
      className="
        relative
        w-9 h-9
        rounded-lg
        border border-white/10
        flex items-center justify-center
        text-white/40
        hover:bg-white/5
        transition
      "
    >
      <Bell size={15} />

      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
    </button>
  );
}