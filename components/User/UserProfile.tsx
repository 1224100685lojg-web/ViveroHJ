"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UserData = {
  nombre: string;
  rol: string;
};

export default function UserProfile() {
  const [user, setUser] = useState<UserData>({
    nombre: "Usuario",
    rol: "",
  });

  useEffect(() => {
    const cargarUsuario = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) return;

      const { data } = await supabase
        .from("usuarios")
        .select("nombre, rol")
        .eq("auth_user_id", authUser.id)
        .single();

      if (data) {
        setUser({
          nombre: data.nombre,
          rol: data.rol,
        });
      }
    };

    cargarUsuario();
  }, []);

  const rolTexto =
    user.rol === "administrador"
      ? "Administrador"
      : user.rol === "supervisor"
      ? "Supervisor"
      : "Empleado";

  return (
    <div className="border-t border-white/5 p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#2a4a2a] border border-[#6db56d]/30 flex items-center justify-center text-[#a8d5a8] font-semibold">
          {user.nombre.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-[#e8f4e8] truncate">
            {user.nombre}
          </p>

          <p className="text-xs text-white/40">
            {rolTexto}
          </p>
        </div>
      </div>
    </div>
  );
}