"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);


  async function handleLogin() {

    if (!usuario || !password) {
      alert("Completa todos los campos");
      return;
    }


    try {

      setCargando(true);


const usuarioLimpio = usuario.trim();

const correo = usuarioLimpio.includes("@")
  ? usuarioLimpio
  : `${usuarioLimpio}@viverohj.com`;



      // LOGIN SUPABASE AUTH

      const {
        data,
        error
      } = await supabase.auth.signInWithPassword({

        email: correo,

        password: password.trim(),

      });



      if(error){

        console.error("Error login:", error);

        alert(
          "Usuario o contraseña incorrectos"
        );

        return;

      }



      const authUser = data.user;



      console.log(
        "AUTH USER:",
        authUser.id
      );



      // Confirmar que existe sesión

      const {
        data: sessionData
      } = await supabase.auth.getSession();



      console.log(
        "SESSION:",
        sessionData.session
      );



      if(!sessionData.session){

        alert(
          "No se pudo crear la sesión."
        );

        return;

      }



      // Buscar perfil del usuario

      const {
        data: perfil,
        error: perfilError
      } = await supabase

        .from("usuarios")

        .select("*")

        .eq(
          "auth_user_id",
          authUser.id
        )

        .single();



      if(perfilError || !perfil){

        console.error(
          "Error perfil:",
          perfilError
        );


        await supabase.auth.signOut();


        alert(
          "El usuario existe pero no tiene perfil configurado."
        );

        return;

      }



      console.log(
        "PERFIL:",
        perfil
      );



      if(!perfil.activo){

        await supabase.auth.signOut();


        alert(
          "Este usuario está desactivado."
        );

        return;

      }



      // Guardar usuario local

      localStorage.setItem(

        "flora-user",

        JSON.stringify({

          id: perfil.id,

          nombre: perfil.nombre,

          rol: perfil.rol,

        })

      );



      alert(
        `Bienvenido ${perfil.nombre}`
      );



      // REDIRECCIÓN POR ROL

      if(perfil.rol === "administrador"){

        router.push("/dashboard");

      }

      else if(perfil.rol === "empleado"){

        router.push("/ventas");

      }

      else {

        router.push("/ventas");

      }



    }

    catch(error){

      console.error(
        "Error inesperado:",
        error
      );


      alert(
        "Ocurrió un error al iniciar sesión"
      );

    }


    finally{

      setCargando(false);

    }

  }



  return (

    <div className="min-h-screen flex items-center justify-center bg-[#07120b]">

      <div className="w-full max-w-md bg-[#0d1c11] border border-green-900 rounded-xl p-8">


        <h1 className="text-3xl font-bold text-white text-center mb-2">

          Vivero HJ

        </h1>


        <p className="text-center text-white/50 mb-6">

          Iniciar sesión

        </p>



        <div className="space-y-4">


          <input

  type="text"
  autoComplete="username"
  placeholder="Usuario o correo"
  value={usuario}
  onChange={(e)=>setUsuario(e.target.value)}

            className="
              w-full
              p-3
              rounded-lg
              bg-[#132217]
              text-white
              outline-none
            "

          />



          <input

  type="password"
            autoComplete="current-password"
            placeholder="Contraseña"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}

            className="
              w-full
              p-3
              rounded-lg
              bg-[#132217]
              text-white
              outline-none
            "

          />



          <button

            type="button"

            onClick={handleLogin}

            disabled={cargando}

            className="
              w-full
              bg-green-700
              hover:bg-green-600
              disabled:opacity-50
              p-3
              rounded-lg
              text-white
              transition
            "

          >

            {
              cargando
                ? "Ingresando..."
                : "Iniciar sesión"
            }


          </button>


        </div>


      </div>


    </div>

  );

}