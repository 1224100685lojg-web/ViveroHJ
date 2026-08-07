import { supabase } from "./supabase";
import { actualizarStock, registrarMovimiento } from "./inventario";


export type ProductoVenta = {
  id: string;
  precio: number;
  cantidad: number;
  stock: number;
};



export async function finalizarVenta(
  carrito: ProductoVenta[],
  metodoPago: string = "Efectivo",
  clienteId?: string
) {

  console.log("========== INICIANDO VENTA ==========");


  // Obtener sesión

  const {
    data: sessionData,
    error: sessionError,
  } = await supabase.auth.getSession();



  console.log(
    "SESSION:",
    sessionData.session
  );


  console.log(
    "USER:",
    sessionData.session?.user
  );


  console.log(
    "TOKEN:",
    sessionData.session?.access_token
  );



  if(sessionError){

    console.error(
      "ERROR SESSION:",
      sessionError
    );

    throw sessionError;

  }



  const user = sessionData.session?.user;



  if(!user){

    throw new Error(
      "No hay usuario autenticado."
    );

  }



  // Buscar usuario interno


  const {
    data: usuario,
    error: usuarioError,
  } = await supabase

    .from("usuarios")

    .select("*")

    .eq(
      "auth_user_id",
      user.id
    )

    .single();



  console.log(
    "USUARIO TABLA:",
    usuario
  );


  console.log(
    "ERROR USUARIO:",
    usuarioError
  );



  if(usuarioError || !usuario){

    throw new Error(
      "No se encontró el empleado."
    );

  }



  // Calcular subtotal


  const subtotal = carrito.reduce(

    (total, producto)=>

      total +
      producto.precio *
      producto.cantidad,

    0

  );



  console.log(
    "SUBTOTAL:",
    subtotal
  );



const datosVenta = {
  cliente_id: clienteId ?? null,
  usuario_id: usuario.id,
  subtotal,
  total: subtotal,
  metodo_pago: metodoPago,
  estado: "completada",
};


  console.log(
    "DATOS A INSERTAR:",
    datosVenta
  );



const {
  data: venta,
  error: ventaError,
} = await supabase
  .from("ventas")
  .insert(datosVenta)
  .select("id, folio")
  .single();



  console.log(
    "VENTA:",
    venta
  );


  console.log(
    "ERROR VENTA:",
    ventaError
  );



  if(ventaError){

    throw ventaError;

  }



  // Guardar productos vendidos


  for(const producto of carrito){


    console.log(
      "INSERTANDO DETALLE:",
      producto
    );



    const {
      error: detalleError

    } = await supabase

      .from("detalle_ventas")

      .insert({

        venta_id:
          venta.id,

        producto_id:
          producto.id,

        cantidad:
          producto.cantidad,

        precio_unitario:
          producto.precio,

        subtotal:
          producto.precio *
          producto.cantidad,

      });



    console.log(
      "ERROR DETALLE:",
      detalleError
    );



    if(detalleError){

      throw detalleError;

    }



    // Actualizar inventario

    await actualizarStock(

      producto.id,

      producto.stock -
      producto.cantidad

    );



    // Registrar movimiento


await registrarMovimiento({
  producto_id: producto.id,
  usuario_id: usuario.id,
  tipo: "SALIDA",
  cantidad: producto.cantidad,
  motivo: "Venta",
  observaciones: `Venta ${venta.id}`,
});

  }

  console.log(
    "========== VENTA TERMINADA =========="
  );



  return venta;

}






// =====================================
// HISTORIAL DE VENTAS
// =====================================


export async function obtenerHistorialVentas(){


  console.log(
    "========== CARGANDO HISTORIAL =========="
  );



  const {
    data,
    error,

  } = await supabase

    .from("ventas")

    .select(`

      id,
      fecha,
      subtotal,
      total,
      metodo_pago,
      estado,


      usuarios(
        nombre
      ),


      clientes(
        nombre
      ),


      detalle_ventas(

        id,
        cantidad,
        precio_unitario,
        subtotal,


        productos(

          nombre

        )

      )

    `)

    .order(

      "fecha",

      {
        ascending:false
      }

    );



  console.log(
    "HISTORIAL:",
    data
  );


  console.log(
    "ERROR HISTORIAL:",
    error
  );



  if(error){

    throw error;

  }



  return data ?? [];

}

// =====================================
// REPORTES DE VENTAS
// =====================================

export async function obtenerVentas() {
  console.log(
    "========== CARGANDO VENTAS =========="
  );

  const {
    data,
    error,
  } = await supabase
    .from("ventas")
    .select(`
      id,
      fecha,
      subtotal,
      total,
      metodo_pago,
      estado,
      usuario_id,
      cliente_id
    `)
    .order("fecha", {
      ascending: true,
    });

  console.log(
    "VENTAS:",
    data
  );

  console.log(
    "ERROR:",
    error
  );

  if (error) {
    throw error;
  }

  return data ?? [];
}