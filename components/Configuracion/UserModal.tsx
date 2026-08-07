"use client";

import { useEffect, useState } from "react";
import { X, UserPlus, Pencil } from "lucide-react";

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
};

type Props = {
  open: boolean;
  usuario?: Usuario | null;
  onClose: () => void;
  onCreated?: () => void;
};

export default function UserModal({
  open,
  usuario,
  onClose,
  onCreated,
}: Props) {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("empleado");
  const [activo, setActivo] = useState(true);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    if (!open) return;

    if (usuario) {

      setNombre(usuario.nombre);
      setCorreo(usuario.correo);
      setRol(usuario.rol);
      setActivo(usuario.activo);
      setPassword("");

    } else {

      limpiar();

    }

  }, [usuario, open]);


  const limpiar = () => {

    setNombre("");
    setCorreo("");
    setPassword("");
    setRol("empleado");
    setActivo(true);

  };

  const generarCorreo = (nombre: string) => {

  return (
    nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .replace(/\s+/g, ".")
      + "@vivero.local"
  );

};


  const guardarUsuario = async () => {

    if (!nombre.trim() || !correo.trim()) {

      alert("Completa todos los campos.");
      return;

    }


    if (!usuario && !password.trim()) {

      alert("La contraseña es obligatoria.");
      return;

    }


    setLoading(true);


    try {

      const response = await fetch("/api/usuarios", {

        method: usuario ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({

          id: usuario?.id,
          nombre,
          correo,
          password,
          rol,
          activo,

        }),

      });


      const data = await response.json();


      if (!response.ok) {

        alert(data.error || "No fue posible guardar el usuario.");
        return;

      }


      alert(
        usuario
          ? "Usuario actualizado correctamente."
          : "Empleado creado correctamente."
      );


      limpiar();
      onCreated?.();
      onClose();


    } catch (error) {

      console.error(error);
      alert("Error del servidor.");

    } finally {

      setLoading(false);

    }

  };


  if (!open) return null;


  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
        p-4
      "
    >

      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-[#132013]
          border
          border-white/10
          shadow-2xl
          overflow-hidden
        "
      >


        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
            border-white/10
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-full
                bg-[#2a4a2a]
                flex
                items-center
                justify-center
                text-[#a8d5a8]
              "
            >

              {usuario ? (
                <Pencil size={20}/>
              ) : (
                <UserPlus size={20}/>
              )}

            </div>


            <div>

              <h2 className="text-white font-semibold">

                {usuario
                  ? "Editar empleado"
                  : "Nuevo empleado"}

              </h2>


              <p className="text-xs text-white/40">

                {usuario
                  ? "Modifica la información del usuario"
                  : "Crear una nueva cuenta"}

              </p>


            </div>

          </div>


          <button
            onClick={onClose}
            className="
              text-white/50
              hover:text-white
              transition
            "
          >

            <X size={20}/>

          </button>


        </div>



        <div className="p-6 space-y-5">


          <div>

            <label className="text-sm text-white/60">
              Nombre
            </label>


<input

  value={nombre}

  onChange={(e)=>{

    const nuevoNombre = e.target.value;

    setNombre(nuevoNombre);


    // Solo generar correo al crear usuario nuevo
    if (!usuario) {

      setCorreo(
        generarCorreo(nuevoNombre)
      );

    }

  }}

  placeholder="Nombre completo"

  className="
    mt-2
    w-full
    rounded-xl
    bg-black/20
    border
    border-white/10
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

              type="email"

              value={correo}

              onChange={(e)=>setCorreo(e.target.value)}

disabled={true}

placeholder="correo generado automáticamente"

              className="
                mt-2
                w-full
                rounded-xl
                bg-black/20
                border
                border-white/10
                px-4
                py-3
                text-white
                outline-none
                disabled:opacity-50
                focus:border-[#6db56d]
              "

            />


          </div>



          {!usuario && (

            <div>

              <label className="text-sm text-white/60">
                Contraseña
              </label>


              <input

                type="password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                placeholder="Contraseña inicial"

                className="
                  mt-2
                  w-full
                  rounded-xl
                  bg-black/20
                  border
                  border-white/10
                  px-4
                  py-3
                  text-white
                  outline-none
                  focus:border-[#6db56d]
                "

              />


            </div>

          )}




<div>
  <label className="text-sm text-white/60">
    Rol
  </label>

  <select
    value={rol}
    onChange={(e) => setRol(e.target.value)}
    className="
      mt-2
      w-full
      rounded-xl
      bg-[#1b2b1b]
      border
      border-white/10
      px-4
      py-3
      text-white
      appearance-none
      outline-none
      focus:border-[#6db56d]
      focus:ring-2
      focus:ring-[#6db56d]/30
    "
  >
    <option
      value="empleado"
      className="bg-[#132013] text-white"
    >
      Empleado
    </option>

    <option
      value="supervisor"
      className="bg-[#132013] text-white"
    >
      Supervisor
    </option>

    <option
      value="administrador"
      className="bg-[#132013] text-white"
    >
      Administrador
    </option>
  </select>
</div>


          {usuario && (

            <div>

              <label className="text-sm text-white/60">
                Estado
              </label>


              <div className="mt-3 flex items-center gap-3">

                <input

                  type="checkbox"

                  checked={activo}

                  onChange={(e)=>setActivo(e.target.checked)}

                  className="w-4 h-4"

                />


                <span className="text-white">

                  {activo
                    ? "Cuenta activa"
                    : "Cuenta desactivada"}

                </span>


              </div>


            </div>

          )}



        </div>



        <div
          className="
            flex
            justify-end
            gap-3
            px-6
            py-5
            border-t
            border-white/10
          "
        >

          <button

            onClick={onClose}

            className="
              px-5
              py-2.5
              rounded-xl
              border
              border-white/10
              text-white/70
              hover:bg-white/5
            "

          >

            Cancelar

          </button>



          <button

            onClick={guardarUsuario}

            disabled={loading}

            className="
              px-5
              py-2.5
              rounded-xl
              bg-[#3f7d3f]
              hover:bg-[#4c934c]
              text-white
              disabled:opacity-50
            "

          >

            {loading
              ? "Guardando..."
              : usuario
                ? "Guardar cambios"
                : "Crear empleado"}

          </button>


        </div>


      </div>


    </div>

  );

}