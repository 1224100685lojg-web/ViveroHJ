"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("flora-user");
    router.push("/");
  };

  return (
    <button
      onClick={logout}
      title="Cerrar sesión"
      className="
        w-9 h-9
        rounded-lg
        border border-red-500/20
        flex items-center justify-center
        text-red-400
        hover:bg-red-500/10
        transition
      "
    >
      <LogOut size={15} />
    </button>
  );
}