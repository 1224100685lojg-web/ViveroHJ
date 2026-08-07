"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Users,
  Plus,
  ShieldCheck,
  Pencil,
  Trash2,
} from "lucide-react";
import UserModal from "./UserModal";

type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  activo: boolean;
};

export default function UsersSettings() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [usuarioEditar, setUsuarioEditar] =
    useState<Usuario | null>(null);


  useEffect(() => {
    cargarUsuarios();
  }, []);


  const cargarUsuarios = async () => {

    setLoading(true);


    const { data, error } = await supabase
      .from("usuarios")
      .select(`
        id,
        nombre,
        correo,
        rol,
        activo
      `)
      .order("nombre");


    if (error) {

      console.error(error);

    } else {

      setUsuarios(data || []);

    }


    setLoading(false);

  };


  const eliminarUsuario = async (usuario: Usuario) => {


    // Usuario actual conectado
    const usuarioActual = JSON.parse(
      localStorage.getItem("flora-user") || "{}"
    );


    // No permitir borrarse a sí mismo
    if (usuario.id === usuarioActual.id) {

      alert(
        "No puedes eliminar tu propio usuario."
      );

      return;

    }



    // No permitir eliminar último administrador
    if (usuario.rol === "administrador") {


      const { count, error } = await supabase
        .from("usuarios")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("rol", "administrador");


      if (error) {

        console.error(error);
        return;

      }


      if (count === 1) {

        alert(
          "No puedes eliminar el último administrador del sistema."
        );

        return;

      }

    }



    const confirmar = confirm(
      `¿Seguro que deseas eliminar a ${usuario.nombre}?`
    );


    if (!confirmar) return;



    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", usuario.id);



    if (error) {


      console.error(error);


      if (
        error.message.includes(
          "violates foreign key constraint"
        )
      ) {

        alert(
          "Este usuario tiene registros asociados. Se recomienda desactivarlo en lugar de eliminarlo."
        );

      } else {

        alert(
          "No se pudo eliminar el usuario."
        );

      }


      return;

    }



    alert(
      "Usuario eliminado correctamente."
    );


    cargarUsuarios();


  };



  return (

    <>

      <div
        className="
          bg-[#132013]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >


        <div className="flex items-center justify-between mb-6">


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

              <Users size={22}/>

            </div>


            <div>

              <h2 className="text-white font-medium">
                Usuarios
              </h2>

              <p className="text-xs text-white/40">
                Administra las cuentas del sistema
              </p>

            </div>


          </div>



          <button
            onClick={()=>{
              setUsuarioEditar(null);
              setOpenModal(true);
            }}
            className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-xl
              bg-[#3f7d3f]
              hover:bg-[#4c934c]
              text-white
              transition
            "
          >

            <Plus size={18}/>

            Nuevo empleado

          </button>


        </div>




        <div className="overflow-x-auto">


          <table className="w-full">


            <thead>

              <tr
                className="
                  border-b
                  border-white/10
                  text-white/40
                  text-sm
                "
              >

                <th className="text-left py-3">
                  Nombre
                </th>


                <th className="text-left py-3">
                  Correo
                </th>


                <th className="text-left py-3">
                  Rol
                </th>


                <th className="text-left py-3">
                  Estado
                </th>


                <th className="text-right py-3">
                  Acción
                </th>


              </tr>

            </thead>




            <tbody>


              {loading && (

                <tr>

                  <td
                    colSpan={5}
                    className="
                      py-8
                      text-center
                      text-white/40
                    "
                  >

                    Cargando usuarios...

                  </td>

                </tr>

              )}



              {!loading &&
                usuarios.map((usuario)=>(


                  <tr
                    key={usuario.id}
                    className="
                      border-b
                      border-white/5
                      hover:bg-white/5
                      transition
                    "
                  >


                    <td className="py-4 text-white">

                      {usuario.nombre}

                    </td>



                    <td className="py-4 text-white/60">

                      {usuario.correo}

                    </td>



                    <td className="py-4">


                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1
                          rounded-full
                          bg-[#2a4a2a]
                          text-[#a8d5a8]
                          text-xs
                        "
                      >

                        <ShieldCheck size={14}/>

                        {usuario.rol}


                      </span>


                    </td>




                    <td className="py-4">


                      {usuario.activo ? (

                        <span className="text-green-400">
                          🟢 Activo
                        </span>

                      ):(

                        <span className="text-red-400">
                          🔴 Inactivo
                        </span>

                      )}


                    </td>




                    <td className="py-4 text-right">


                      <div className="flex justify-end gap-2">


                        <button
                          onClick={()=>{

                            setUsuarioEditar(usuario);
                            setOpenModal(true);

                          }}
                          className="
                            p-2
                            rounded-lg
                            hover:bg-white/10
                            transition
                            text-white/70
                          "
                        >

                          <Pencil size={16}/>

                        </button>



                        <button
                          onClick={()=>eliminarUsuario(usuario)}
                          className="
                            p-2
                            rounded-lg
                            hover:bg-red-500/20
                            transition
                            text-red-400
                          "
                        >

                          <Trash2 size={16}/>

                        </button>


                      </div>


                    </td>


                  </tr>


                ))}



            </tbody>


          </table>


        </div>


      </div>





      <UserModal
        open={openModal}
        usuario={usuarioEditar}
        onClose={()=>{

          setUsuarioEditar(null);
          setOpenModal(false);

        }}
        onCreated={cargarUsuarios}
      />


    </>

  );

}