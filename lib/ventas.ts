import { supabase } from "./supabase";
import { actualizarStock, registrarMovimiento } from "./inventario";


export type ProductoVenta = {
  id: string;
  precio: number;
  cantidad: number;
  stock: number;
};


// =====================================
// FINALIZAR VENTA
// =====================================

export async function finalizarVenta(
  carrito: ProductoVenta[],
  metodoPago: string = "Efectivo",
  clienteId?: string
) {

  console.log("========== INICIANDO VENTA ==========");


  // =====================================
  // OBTENER SESIÓN
  // =====================================

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


  if (sessionError) {

    console.error(
      "ERROR SESSION:",
      sessionError
    );

    throw sessionError;

  }


  const user = sessionData.session?.user;


  if (!user) {

    throw new Error(
      "No hay usuario autenticado."
    );

  }


  // =====================================
  // BUSCAR USUARIO INTERNO
  // =====================================

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


  if (usuarioError || !usuario) {

    throw new Error(
      "No se encontró el empleado."
    );

  }


  // =====================================
  // CALCULAR SUBTOTAL
  // =====================================

  const subtotal = carrito.reduce(
    (total, producto) =>
      total +
      producto.precio *
      producto.cantidad,
    0
  );


  console.log(
    "SUBTOTAL:",
    subtotal
  );


  // =====================================
  // CREAR VENTA
  // =====================================

  const datosVenta = {

    cliente_id:
      clienteId ?? null,

    usuario_id:
      usuario.id,

    subtotal,

    total:
      subtotal,

    metodo_pago:
      metodoPago,

    estado:
      "completada",

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
    .select("id, folio, fecha")
    .single();


  console.log(
    "VENTA:",
    venta
  );


  console.log(
    "ERROR VENTA:",
    ventaError
  );


  if (ventaError) {

    throw ventaError;

  }


  // =====================================
  // GUARDAR PRODUCTOS VENDIDOS
  // =====================================

  for (const producto of carrito) {

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


    if (detalleError) {

      throw detalleError;

    }


    // =====================================
    // ACTUALIZAR INVENTARIO
    // =====================================

    await actualizarStock(

      producto.id,

      producto.stock -
      producto.cantidad

    );


    // =====================================
    // REGISTRAR MOVIMIENTO
    // =====================================

    await registrarMovimiento({

      producto_id:
        producto.id,

      usuario_id:
        usuario.id,

      tipo:
        "SALIDA",

      cantidad:
        producto.cantidad,

      motivo:
        "Venta",

      observaciones:
        `Venta ${venta.id}`,

    });

  }


  // =====================================
  // OBTENER NOMBRES DE LOS PRODUCTOS
  // PARA EL TICKET
  // =====================================

  const idsProductos =
    carrito.map(
      producto => producto.id
    );


  const {
    data: productosTicket,
    error: productosError,
  } = await supabase
    .from("productos")
    .select(`
      id,
      nombre
    `)
    .in(
      "id",
      idsProductos
    );


  console.log(
    "PRODUCTOS PARA TICKET:",
    productosTicket
  );


  if (productosError) {

    console.error(
      "ERROR OBTENIENDO PRODUCTOS PARA TICKET:",
      productosError
    );

  }


  // =====================================
  // PREPARAR PRODUCTOS DEL TICKET
  // =====================================

  const productosTicketFinal =
    carrito.map(producto => {

      const productoDB =
        productosTicket?.find(
          item =>
            item.id === producto.id
        );


      return {

        id:
          producto.id,

        nombre:
          productoDB?.nombre ??
          "Producto",

        cantidad:
          producto.cantidad,

        precio:
          producto.precio,

        subtotal:
          producto.precio *
          producto.cantidad,

      };

    });


  // =====================================
  // DATOS COMPLETOS DE LA VENTA
  // =====================================

  const ticket = {

    id:
      venta.id,

    folio:
      venta.folio,

    fecha:
      venta.fecha,

    subtotal,

    total:
      subtotal,

    metodoPago,

    usuario:
      usuario.nombre,

    productos:
      productosTicketFinal,

  };


  console.log(
    "========== TICKET =========="
  );


  console.log(
    ticket
  );


  console.log(
    "========== VENTA TERMINADA =========="
  );


  return ticket;

}






// =====================================
// HISTORIAL DE VENTAS
// =====================================


export async function obtenerHistorialVentas() {

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
        ascending: false
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


  if (error) {

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

    .order(
      "fecha",
      {
        ascending: true,
      }
    );


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