"use client";

import { useRef } from "react";
import { Printer, X } from "lucide-react";

// =====================================
// TIPOS
// =====================================

export type TicketProducto = {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  subtotal: number;
};

export type TicketData = {
  id: string;
  folio: number;
  fecha: string;
  subtotal: number;
  total: number;
  metodoPago: string;
  usuario: string;
  productos: TicketProducto[];
};

// =====================================
// PROPS
// =====================================

type TicketVentaProps = {
  ticket: TicketData | null;
  open: boolean;
  onClose: () => void;
};

// =====================================
// COMPONENTE
// =====================================

export default function TicketVenta({
  ticket,
  open,
  onClose,
}: TicketVentaProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  if (!open || !ticket) {
    return null;
  }

  // =====================================
  // FORMATO MONEDA
  // =====================================

  const formatoMoneda = (valor: number) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(valor);
  };

  // =====================================
  // FORMATO FECHA
  // =====================================

  const formatoFecha = (fecha: string) => {
    if (!fecha) {
      return "";
    }

    return new Date(fecha).toLocaleString("es-MX", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  // =====================================
  // IMPRESIÓN EN IPHONE / IPAD
  // =====================================

  const imprimirIOS = (contenido: HTMLDivElement) => {
    // Evitar copias anteriores
    document.getElementById("ticket-print-root")?.remove();
    document.getElementById("ticket-print-styles")?.remove();

    // Crear un contenedor independiente
    const raiz = document.createElement("div");
    raiz.id = "ticket-print-root";

    // Copiar únicamente el contenido del ticket
    const copia = contenido.cloneNode(true) as HTMLDivElement;

    raiz.appendChild(copia);
    document.body.appendChild(raiz);

    // Estilos exclusivos para la impresión en iOS
    const estilos = document.createElement("style");
    estilos.id = "ticket-print-styles";

    estilos.textContent = `
      @page {
        size: 80mm auto;
        margin: 0;
      }

      @media print {
        html,
        body {
          display: block !important;
          width: 80mm !important;
          height: auto !important;
          min-height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          overflow: visible !important;
        }

        /* Ocultar toda la aplicación */
        body > *:not(#ticket-print-root) {
          display: none !important;
        }

        /* Mostrar el contenedor independiente */
        #ticket-print-root {
          display: block !important;
          position: static !important;
          width: 80mm !important;
          height: auto !important;
          min-height: 0 !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible !important;
          background: white !important;
          visibility: visible !important;
        }

        #ticket-print-root,
        #ticket-print-root * {
          visibility: visible !important;
          box-sizing: border-box !important;
          color: black !important;
          box-shadow: none !important;
        }

        #ticket-print-root .ticket-print {
          display: block !important;
          position: static !important;
          width: 74mm !important;
          min-width: 74mm !important;
          max-width: 74mm !important;
          height: auto !important;
          min-height: 0 !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 3mm !important;
          overflow: visible !important;
          background: white !important;
          color: black !important;
          box-shadow: none !important;
          border: none !important;
          border-radius: 0 !important;
          font-family: Arial, sans-serif !important;
          font-size: 10px !important;
        }

        #ticket-print-root .ticket-print h1 {
          font-size: 18px !important;
        }

        #ticket-print-root .ticket-print p,
        #ticket-print-root .ticket-print span,
        #ticket-print-root .ticket-print strong {
          overflow-wrap: anywhere;
        }

        #ticket-print-root .ticket-print > div {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      }
    `;

    document.head.appendChild(estilos);

    // Limpiar la copia después de imprimir
    const limpiar = () => {
      raiz.remove();
      estilos.remove();

      window.removeEventListener("afterprint", limpiar);
    };

    window.addEventListener("afterprint", limpiar);

    // Abrir la vista previa nativa de Safari
    window.print();
  };

  // =====================================
  // IMPRIMIR
  // =====================================

  const imprimirTicket = () => {
    const contenido = ticketRef.current;

    if (!contenido) {
      console.error("No se encontró el contenido del ticket.");
      return;
    }

    // Detectar iPhone y iPad
    const esIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" &&
        navigator.maxTouchPoints > 1);

    // En iOS imprimir una copia independiente
    if (esIOS) {
      imprimirIOS(contenido);
      return;
    }

    // =====================================
    // IMPRESIÓN EN COMPUTADORA
    // =====================================

    const ventana = window.open(
      "",
      "_blank",
      "width=450,height=700"
    );

    if (!ventana) {
      alert("Permite las ventanas emergentes para imprimir el ticket.");
      return;
    }

    const estilos = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style')
    )
      .map((elemento) => elemento.outerHTML)
      .join("\n");

    ventana.document.open();

    ventana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Ticket de venta</title>
          ${estilos}

          <style>
            @page {
              size: 80mm auto;
              margin: 0;
            }

            html,
            body {
              width: 80mm !important;
              margin: 0 !important;
              padding: 0 !important;
              height: auto !important;
              background: white !important;
              overflow: visible !important;
            }

            .ticket-print {
              display: block !important;
              position: static !important;
              width: 74mm !important;
              max-width: 74mm !important;
              min-width: 74mm !important;
              height: auto !important;
              margin: 0 !important;
              padding: 3mm !important;
              box-sizing: border-box !important;
              overflow: visible !important;
              background: white !important;
              color: black !important;
              box-shadow: none !important;
              font-family: Arial, sans-serif !important;
              font-size: 10px !important;
            }

            .ticket-print * {
              box-sizing: border-box !important;
              color: black !important;
              box-shadow: none !important;
            }

            .ticket-print > div {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          </style>
        </head>

        <body>
          ${contenido.outerHTML}
        </body>
      </html>
    `);

    ventana.document.close();

    ventana.addEventListener("load", () => {
      ventana.focus();
      ventana.print();
    });
  };

  // =====================================
  // RENDER
  // =====================================

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-black/80
        backdrop-blur-sm
        p-4
      "
    >
      {/* CONTENEDOR */}

      <div
        className="
          relative
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          bg-[#111]
          border
          border-white/10
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            px-5
            py-4
            border-b
            border-white/10
          "
        >
          <div>
            <h2
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              Ticket de venta
            </h2>

            <p
              className="
                text-xs
                text-white/40
                mt-1
              "
            >
              Folio #
              {String(ticket.folio).padStart(6, "0")}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              items-center
              justify-center
              w-8
              h-8
              rounded-lg
              text-white/50
              hover:text-white
              hover:bg-white/10
              transition
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* TICKET */}

        <div
          ref={ticketRef}
          className="
            ticket-print
            mx-auto
            my-6
            w-[320px]
            bg-white
            text-black
            px-6
            py-7
            shadow-lg
          "
        >
          {/* EMPRESA */}

          <div
            className="
              text-center
              border-b
              border-dashed
              border-black/30
              pb-4
            "
          >
            <h1
              className="
                text-xl
                font-bold
                tracking-wide
              "
            >
              VIVERO HJ
            </h1>

            <p
              className="
                text-xs
                mt-1
                text-black/60
              "
            >
              Ticket de Venta
            </p>
          </div>

          {/* INFORMACIÓN */}

          <div
            className="
              py-4
              border-b
              border-dashed
              border-black/30
              text-xs
            "
          >
            <div
              className="
                flex
                justify-between
                mb-1
              "
            >
              <span>Folio:</span>

              <strong>
                {String(ticket.folio).padStart(6, "0")}
              </strong>
            </div>

            <div
              className="
                flex
                justify-between
                mb-1
              "
            >
              <span>Fecha:</span>

              <span>
                {formatoFecha(ticket.fecha)}
              </span>
            </div>

            <div
              className="
                flex
                justify-between
              "
            >
              <span>Empleado:</span>

              <span>
                {ticket.usuario}
              </span>
            </div>
          </div>

          {/* PRODUCTOS */}

          <div
            className="
              py-4
              border-b
              border-dashed
              border-black/30
            "
          >
            <div
              className="
                flex
                justify-between
                text-[10px]
                font-bold
                uppercase
                mb-3
              "
            >
              <span>Producto</span>
              <span>Importe</span>
            </div>

            <div className="space-y-3">
              {ticket.productos.map((producto) => (
                <div
                  key={producto.id}
                  className="text-xs"
                >
                  <div
                    className="
                      flex
                      justify-between
                      gap-3
                    "
                  >
                    <span
                      className="
                        font-medium
                        flex-1
                      "
                    >
                      {producto.nombre}
                    </span>

                    <span
                      className="
                        font-medium
                        whitespace-nowrap
                      "
                    >
                      {formatoMoneda(producto.subtotal)}
                    </span>
                  </div>

                  <div
                    className="
                      text-[10px]
                      text-black/50
                      mt-1
                    "
                  >
                    {producto.cantidad}
                    {" × "}
                    {formatoMoneda(producto.precio)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOTALES */}

          <div
            className="
              py-4
              border-b
              border-dashed
              border-black/30
              text-xs
            "
          >
            <div
              className="
                flex
                justify-between
                mb-2
              "
            >
              <span>Subtotal</span>

              <span>
                {formatoMoneda(ticket.subtotal)}
              </span>
            </div>

            <div
              className="
                flex
                justify-between
                text-base
                font-bold
              "
            >
              <span>TOTAL</span>

              <span>
                {formatoMoneda(ticket.total)}
              </span>
            </div>
          </div>

          {/* MÉTODO DE PAGO */}

          <div className="py-4 text-xs">
            <div className="flex justify-between">
              <span>Método de pago:</span>

              <strong>
                {ticket.metodoPago}
              </strong>
            </div>
          </div>

          {/* MENSAJE */}

          <div className="text-center pt-2">
            <p className="text-xs font-medium">
              ¡Gracias por su compra!
            </p>

            <p
              className="
                text-[10px]
                text-black/50
                mt-1
              "
            >
              VIVERO HJ
            </p>
          </div>
        </div>

        {/* BOTONES */}

        <div
          className="
            flex
            gap-3
            px-5
            pb-5
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              flex-1
              py-2.5
              rounded-lg
              border
              border-white/10
              text-sm
              text-white/70
              hover:bg-white/5
              transition
            "
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={imprimirTicket}
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-2.5
              rounded-lg
              bg-[#6db56d]
              text-black
              text-sm
              font-medium
              hover:bg-[#82c982]
              transition
            "
          >
            <Printer size={17} />
            Imprimir ticket
          </button>
        </div>
      </div>
    </div>
  );
}
