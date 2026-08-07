import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      correo,
      password,
      rol,
    } = body;

    if (!nombre || !correo || !password || !rol) {
      return NextResponse.json(
        {
          error: "Faltan datos obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      ![
        "administrador",
        "empleado",
        "supervisor",
      ].includes(rol)
    ) {
      return NextResponse.json(
        {
          error: "Rol inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // Crear usuario en Auth

    const {
      data: authData,
      error: authError,
    } = await supabaseAdmin.auth.admin.createUser({
      email: correo,
      password,
      email_confirm: true,
      user_metadata: {
        name: nombre,
      },
    });

    if (authError) {
      return NextResponse.json(
        {
          error: authError.message,
        },
        {
          status: 400,
        }
      );
    }

    const authUser = authData.user;

    // Insertar en tabla usuarios

    const {
      error: usuarioError,
    } = await supabaseAdmin
      .from("usuarios")
      .insert({
        auth_user_id: authUser.id,
        nombre,
        correo,
        rol,
        activo: true,
      });

    if (usuarioError) {
      // Si falla la inserción eliminamos el usuario creado
      await supabaseAdmin.auth.admin.deleteUser(
        authUser.id
      );

      return NextResponse.json(
        {
          error: usuarioError.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      usuario: {
        id: authUser.id,
        nombre,
        correo,
        rol,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      nombre,
      rol,
      activo,
    } = body;

    if (!id || !nombre || !rol) {
      return NextResponse.json(
        {
          error: "Faltan datos obligatorios.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      ![
        "administrador",
        "empleado",
        "supervisor",
      ].includes(rol)
    ) {
      return NextResponse.json(
        {
          error: "Rol inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } = await supabaseAdmin
      .from("usuarios")
      .update({
        nombre,
        rol,
        activo,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Error interno del servidor.",
      },
      {
        status: 500,
      }
    );
  }
}