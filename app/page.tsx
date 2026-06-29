"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // Usuarios simulados
  const users = [
    {
      usuario: "admin",
      password: "123",
      role: "admin",
    },
    {
      usuario: "empleado",
      password: "123",
      role: "empleado",
    },
  ];

  const handleLogin = () => {
    console.log("Intentando login...");

    const foundUser = users.find(
      (u) =>
        u.usuario === usuario.trim() &&
        u.password === password.trim()
    );

    if (!foundUser) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    // Guardar sesión simulada
    localStorage.setItem(
      "flora-user",
      JSON.stringify({
        user: foundUser.usuario,
        role: foundUser.role,
      })
    );

    alert(`Bienvenido ${foundUser.usuario}`);

    // Redirección por rol
    if (foundUser.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/ventas");
    }
  };

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

          {/* Usuario */}
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#132217] text-white outline-none"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#132217] text-white outline-none"
          />

          {/* Botón */}
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-green-700 hover:bg-green-600 p-3 rounded-lg text-white transition"
          >
            Iniciar sesión
          </button>

        </div>
      </div>
    </div>
  );
}