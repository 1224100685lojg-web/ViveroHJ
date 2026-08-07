"use client";

import { Save, ShieldCheck, User } from "lucide-react";

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
};

type Props = {
  usuario: Usuario;
  nombre: string;
  setNombre: React.Dispatch<React.SetStateAction<string>>;
  guardando: boolean;
  guardarCambios: () => void;
};

export default function ProfileSettings({
  usuario,
  nombre,
  setNombre,
  guardando,
  guardarCambios,
}: Props) {
  return (
    <div
      className="
        bg-[#132013]
        border border-white/10
        rounded-2xl
        p-6
        space-y-6
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            w-12
            h-12
            rounded-full
            bg-[#2a4a2a]
            flex
            items-center
            justify-center
            text-[#a8d5a8]
          "
        >
          <User size={22} />
        </div>

        <div>
          <h2 className="text-white font-medium">
            Mi perfil
          </h2>

          <p className="text-xs text-white/40">
            Información de tu cuenta
          </p>
        </div>
      </div>

      <div>
        <label className="text-sm text-white/60">
          Nombre
        </label>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="
            mt-2
            w-full
            rounded-xl
            bg-black/20
            border border-white/10
            px-4
            py-3
            text-white
            outline-none
            focus:border-[#6db56d]
          "
        />
      </div>

      <div>
        <label className="text-sm text-white/60">
          Correo
        </label>

        <input
          value={usuario.correo}
          disabled
          className="
            mt-2
            w-full
            rounded-xl
            bg-black/10
            border border-white/10
            px-4
            py-3
            text-white/50
          "
        />
      </div>

      <div>
        <label className="text-sm text-white/60">
          Rol
        </label>

        <div
          className="
            mt-2
            flex
            items-center
            gap-2
            rounded-xl
            bg-black/20
            border border-white/10
            px-4
            py-3
            text-white
          "
        >
          <ShieldCheck size={18} />

          {usuario.rol}
        </div>
      </div>

      <div>
        <label className="text-sm text-white/60">
          Estado
        </label>

        <p
          className={
            usuario.activo
              ? "text-green-400 mt-2"
              : "text-red-400 mt-2"
          }
        >
          {usuario.activo
            ? "🟢 Cuenta activa"
            : "🔴 Cuenta desactivada"}
        </p>
      </div>

      <button
        onClick={guardarCambios}
        disabled={guardando}
        className="
          flex
          items-center
          gap-2
          bg-[#3f7d3f]
          hover:bg-[#4c934c]
          text-white
          px-5
          py-3
          rounded-xl
          transition
          disabled:opacity-50
        "
      >
        <Save size={18} />

        {guardando
          ? "Guardando..."
          : "Guardar cambios"}
      </button>
    </div>
  );
}