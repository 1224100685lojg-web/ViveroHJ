"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase";


type UserData = {
  name: string;
  role: string;
  email?: string;
};


export default function UserMenu() {

  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<UserData>({
    name: "Usuario",
    role: "",
    email: "",
  });



  useEffect(() => {


    const cargarUsuario = async () => {


      const {
        data: {
          user: authUser
        }
      } = await supabase.auth.getUser();



      if (!authUser) {

        router.push("/");
        return;

      }



      let nombre =
        authUser.user_metadata?.name ||
        authUser.email?.split("@")[0] ||
        "Usuario";


      let rol = "empleado";

      let correo = authUser.email || "";



      const { data: usuario } = await supabase

        .from("usuarios")

        .select(`
          nombre,
          rol,
          correo
        `)

        .eq("auth_user_id", authUser.id)

        .single();



      if (usuario) {


        nombre = usuario.nombre;

        rol = usuario.rol;

        correo = usuario.correo || correo;


      }



      let rolTexto = "Empleado";


      if (rol === "administrador") {

        rolTexto = "Administrador";

      } 
      else if (rol === "supervisor") {

        rolTexto = "Supervisor";

      }



      setUser({

        name: nombre,

        role: rolTexto,

        email: correo,

      });



    };



    cargarUsuario();



  }, [router]);




  const logout = async () => {


    await supabase.auth.signOut();


    router.push("/");


  };




  return (

    <div className="relative">


      <button

        onClick={() => setOpen(!open)}

        className="
          flex items-center gap-3
          hover:bg-white/5
          rounded-xl
          px-2 py-1
          transition
        "

      >


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


      </button>





      {open && (


        <div

          className="
            absolute right-0 mt-3
            w-60
            rounded-xl
            bg-[#132013]
            border border-white/10
            shadow-xl
            overflow-hidden
            z-50
          "

        >



          <div className="px-4 py-3 border-b border-white/10">


            <p className="text-sm text-white">

              {user.name}

            </p>



            <p className="text-xs text-white/40">

              {user.email}

            </p>



            <p className="text-[11px] text-[#6db56d] mt-1 uppercase">

              {user.role}

            </p>


          </div>







{user.role === "Administrador" && (
  <button
    onClick={() => router.push("/configuracion")}
    className="
      w-full flex items-center gap-3
      px-4 py-3
      text-sm text-white/80
      hover:bg-white/5
    "
  >
    <Settings size={16} />
    Configuración
  </button>
)}







          <button

            onClick={logout}

            className="
              w-full flex items-center gap-3
              px-4 py-3
              text-sm text-red-400
              hover:bg-red-500/10
            "

          >

            <LogOut size={16}/>

            Cerrar sesión


          </button>





        </div>


      )}



    </div>

  );

}