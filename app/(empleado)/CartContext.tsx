"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// ============================
// Tipo de producto del carrito
// ============================F

export interface CartProduct {
  id: string;
  codigo?: string | null;
  nombre: string;
  nombre_cientifico?: string | null;
  precio: number;
  stock: number;
  imagen?: string | null;
  cantidad: number;
}

// ============================
// Tipo del Context
// ============================

interface CartContextType {
  carrito: CartProduct[];

  agregarProducto: (
  producto: Omit<CartProduct, "cantidad">,
  cantidad?: number
) => void;

eliminarProducto: (id: string) => void;

aumentarCantidad: (id: string) => void;

disminuirCantidad: (id: string) => void;

  vaciarCarrito: () => void;
}

// ============================
// Crear Context
// ============================

const CartContext = createContext<CartContextType | undefined>(undefined);

// ============================
// Provider
// ============================

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [carrito, setCarrito] = useState<CartProduct[]>([]);

  // ============================
  // Agregar producto
  // ============================

function agregarProducto(
  producto: Omit<CartProduct, "cantidad">,
  cantidad: number = 1
) {
  setCarrito((actual) => {
    const existe = actual.find(
      (item) => item.id === producto.id
    );

    if (existe) {
      const nuevaCantidad = Math.min(
        existe.cantidad + cantidad,
        existe.stock
      );

      return actual.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: nuevaCantidad,
            }
          : item
      );
    }

    return [
      ...actual,
      {
        ...producto,
        cantidad: Math.min(cantidad, producto.stock),
      },
    ];
  });
}
  // ============================
  // Aumentar cantidad
  // ============================

  function aumentarCantidad(id: string) {
    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad:
                item.cantidad < item.stock
                  ? item.cantidad + 1
                  : item.cantidad
            }
          : item
      )
    );
  }

  // ============================
  // Disminuir cantidad
  // ============================

  function disminuirCantidad(id: string) {
    setCarrito((actual) =>
      actual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  // ============================
  // Eliminar producto
  // ============================

  function eliminarProducto(id: string) {
    setCarrito((actual) =>
      actual.filter((item) => item.id !== id)
    );
  }

  // ============================
  // Vaciar carrito
  // ============================

  function vaciarCarrito() {
    setCarrito([]);
  }

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        aumentarCantidad,
        disminuirCantidad,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ============================
// Hook personalizado
// ============================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart debe utilizarse dentro de CartProvider"
    );
  }

  return context;
}