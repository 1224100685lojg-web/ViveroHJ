"use client";

import { X, ReceiptText, CalendarDays, User, CreditCard } from "lucide-react";

type Producto = {
  nombre: string;
  cantidad: number;
  precio: number;
};

type VentaDetalleModalProps = {
  open: boolean;
  onClose: () => void;
  venta: {
    folio: string;
    cliente: string;
    fecha: string;
    metodoPago: string;
    empleado: string;
    productos: Producto[];
    total: number;
  } | null;
};

export default function VentaDetalleModal({
  open,
  onClose,
  venta,
}: VentaDetalleModalProps) {
  if (!open || !venta) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">
      <div className="w-full max-w-2xl rounded-2xl bg-[#121212] border border-white/10">

        {/* Header */}

        <div className="flex items-center justify-between p-6 border-b border-white/10">

          <div>
            <div className="flex items-center gap-2">
              <ReceiptText className="text-[#a8d5a8]" size={22} />

              <h2 className="text-xl font-semibold text-white">
                Venta #{venta.folio}
              </h2>
            </div>

            <p className="text-white/40 text-sm mt-1">
              Información completa de la venta
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-white/40 hover:text-white"
          >
            <X />
          </button>

        </div>

        {/* Datos */}

        <div className="grid grid-cols-2 gap-4 p-6">

          <Info
            icon={<User size={16} />}
            title="Cliente"
            value={venta.cliente}
          />

          <Info
            icon={<CalendarDays size={16} />}
            title="Fecha"
            value={venta.fecha}
          />

          <Info
            icon={<CreditCard size={16} />}
            title="Método de pago"
            value={venta.metodoPago}
          />

          <Info
            icon={<User size={16} />}
            title="Empleado"
            value={venta.empleado}
          />

        </div>

        {/* Productos */}

        <div className="px-6">

          <h3 className="text-white font-medium mb-3">
            Productos vendidos
          </h3>

          <div className="space-y-3">

            {venta.productos.map((producto, index) => (

              <div
                key={index}
                className="flex justify-between rounded-lg bg-white/5 p-3"
              >
                <div>

                  <p className="text-white">
                    {producto.nombre}
                  </p>

                  <p className="text-white/40 text-sm">
                    Cantidad: {producto.cantidad}
                  </p>

                </div>

                <p className="text-[#a8d5a8] font-medium">
                  $
                  {(producto.precio * producto.cantidad).toFixed(2)}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Footer */}

        <div className="border-t border-white/10 mt-6 p-6">

          <div className="flex justify-between items-center">

            <span className="text-lg text-white">
              Total
            </span>

            <span className="text-2xl font-bold text-[#a8d5a8]">
              ${venta.total.toFixed(2)}
            </span>

          </div>

          <button
            onClick={onClose}
            className="
              w-full
              mt-5
              py-3
              rounded-lg
              bg-[#6db56d]/20
              text-[#a8d5a8]
              hover:bg-[#6db56d]/30
              transition
            "
          >
            Cerrar
          </button>

        </div>

      </div>
    </div>
  );
}

function Info({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white/5 p-4">

      <div className="flex items-center gap-2 text-white/40 text-sm">
        {icon}
        {title}
      </div>

      <p className="text-white mt-2">
        {value}
      </p>

    </div>
  );
}