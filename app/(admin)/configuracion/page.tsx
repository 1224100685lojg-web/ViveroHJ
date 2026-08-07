"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import ProfileSettings from "@/components/Configuracion/ProfileSettings";
import UsersSettings from "@/components/Configuracion/UsersSettings";
import { User } from "lucide-react";

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
};

export default function ConfiguracionPage() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [nombre, setNombre] = useState("");

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    cargarUsuario();
  }, []);

  const cargarUsuario = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("usuarios")
      .select(`
        id,
        nombre,
        correo,
        rol,
        activo
      `)
      .eq("auth_user_id", user.id)
      .single();

    if (data) {
      setUsuario(data);
      setNombre(data.nombre);
    }
  };

  const guardarCambios = async () => {
    if (!usuario) return;

    setGuardando(true);

    const { error } = await supabase
      .from("usuarios")
      .update({
        nombre,
        updated_at: new Date().toISOString(),
      })
      .eq("id", usuario.id);

    setGuardando(false);

    if (error) {
      console.error(error);
      alert("Error al guardar cambios");
      return;
    }

    alert("Cambios guardados correctamente");

    cargarUsuario();
  };

  if (!usuario) {
    return (
      <div className="p-8 text-white/50">
        Cargando configuración...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Configuración
        </h1>

        <p className="text-white/50 text-sm">
          Administra la información del sistema
        </p>
      </div>

      <ProfileSettings
        usuario={usuario}
        nombre={nombre}
        setNombre={setNombre}
        guardando={guardando}
        guardarCambios={guardarCambios}
      />

        <UsersSettings />

      {/* Próximamente */}
      {/* <CompanySettings /> */}

      {/* Próximamente */}
      {/* <UsersSettings /> */}
    </div>
  );
}