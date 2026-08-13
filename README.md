# 🌱 Vivero HJ

> Sistema web multiplataforma para la gestión de inventario, productos, ventas y operaciones internas de Vivero HJ.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?logo=vercel)
![Electron](https://img.shields.io/badge/Electron-Desktop-47848F?logo=electron)

---

## 📋 Descripción

**Vivero HJ** es un sistema de control de inventario desarrollado para digitalizar y centralizar las operaciones administrativas y operativas de un vivero.

El sistema surge a partir de la necesidad de mejorar el control de productos, entradas y salidas de inventario, ventas, clientes y demás procesos relacionados con la administración del vivero.

Anteriormente, parte de la información era gestionada mediante registros manuales y hojas de cálculo, lo que podía ocasionar dificultades para mantener actualizadas las existencias, consultar información y dar seguimiento a las operaciones realizadas.

La solución desarrollada permite centralizar la información en una plataforma web, facilitando el registro, consulta y actualización de los datos utilizados por el personal de Vivero HJ.

El sistema fue diseñado para funcionar desde equipos de escritorio y dispositivos móviles, permitiendo que los usuarios autorizados puedan acceder a las diferentes funcionalidades de acuerdo con su rol.

---

## 🎯 Objetivo

Desarrollar un sistema de control de inventario para Vivero HJ mediante el registro y monitoreo automatizado de las operaciones relacionadas con los productos, con el propósito de mejorar la administración, trazabilidad y control del inventario.

### Objetivos específicos

- 🔐 Implementar un módulo de autenticación para administradores y empleados.
- 📦 Gestionar el inventario de productos.
- 🔄 Registrar entradas, salidas y movimientos de inventario.
- 💰 Registrar y administrar ventas.
- 👥 Gestionar la información de clientes.
- 🧾 Administrar productos apartados.
- 🌱 Dar seguimiento a plantas en proceso de rehabilitación.
- 📋 Gestionar pedidos y recepción de mercancía.
- 📊 Generar reportes e indicadores para apoyar la toma de decisiones.

---

# ✨ Características principales

## 🔐 Autenticación

El sistema cuenta con un módulo de inicio de sesión que permite controlar el acceso a la aplicación mediante credenciales.

Los usuarios son identificados de acuerdo con el rol asignado, permitiendo diferenciar las funcionalidades disponibles para administradores y empleados.

---

## 👥 Administración de usuarios

El sistema permite administrar los usuarios autorizados para utilizar la aplicación.

Cada usuario cuenta con un rol que determina las funciones disponibles dentro del sistema.

### Roles principales

| Rol | Descripción |
|---|---|
| 👑 Administrador | Cuenta con acceso a las funciones administrativas y de gestión del sistema. |
| 👤 Empleado | Cuenta con acceso a las funciones necesarias para realizar las operaciones asignadas. |

---

# 📦 Inventario

El módulo de inventario permite administrar los productos manejados por Vivero HJ.

Entre las operaciones principales se encuentran:

- Registrar productos.
- Consultar productos.
- Editar productos.
- Eliminar productos.
- Consultar existencias.
- Administrar categorías.
- Controlar precios.
- Registrar información de productos.
- Consultar productos con bajo inventario.

La información de los productos se encuentra centralizada en la base de datos para que pueda ser utilizada por los diferentes módulos del sistema.

---

# 🔄 Movimientos de inventario

El módulo de movimientos permite mantener un historial de las operaciones que afectan las existencias de los productos.

Los movimientos permiten identificar operaciones como:

- Entradas.
- Salidas.
- Ajustes.
- Apartados.
- Pedidos.

Esto permite mantener una trazabilidad de los cambios realizados sobre el inventario y facilitar la consulta del historial de operaciones.

---

# 💰 Ventas

El módulo de ventas permite registrar las operaciones comerciales realizadas dentro del vivero.

Durante una venta se relacionan los productos involucrados, las cantidades, el importe de la operación, el cliente y el usuario responsable.

Una vez registrada una venta, las existencias de los productos involucrados son actualizadas de acuerdo con la operación realizada.

El registro de ventas permite mantener un historial de las operaciones comerciales realizadas.

---

# 🧾 Apartados

El módulo de apartados permite registrar productos reservados por los clientes antes de completar una compra.

La información relacionada con un apartado incluye:

- Cliente.
- Productos.
- Cantidad.
- Total.
- Anticipo.
- Saldo pendiente.
- Fecha de entrega.
- Estado del apartado.

Esto permite identificar los productos que se encuentran comprometidos y mantener un seguimiento de las reservas realizadas.

---

# 📋 Pedidos

El módulo de pedidos permite gestionar las solicitudes de productos necesarias para abastecer el inventario del vivero.

Los pedidos permiten mantener información relacionada con:

- Proveedor.
- Productos solicitados.
- Cantidades.
- Estado del pedido.
- Fecha.
- Información relacionada con la recepción.

El objetivo es facilitar el seguimiento de los productos solicitados y mantener un mejor control del abastecimiento.

---

# 🚚 Recepción de mercancía

El sistema contempla el registro de la mercancía recibida por parte de los proveedores.

La recepción permite relacionar los productos recibidos con los registros correspondientes del inventario.

De esta manera se puede mantener un historial de las entradas de mercancía y actualizar las existencias de los productos.

---

# 🌱 Rehabilitación de plantas

El módulo de rehabilitación permite dar seguimiento a las plantas que requieren cuidados especiales antes de regresar al inventario disponible para venta.

La información registrada puede incluir:

- Estado de la planta.
- Responsable.
- Fecha del próximo cuidado.
- Observaciones.
- Historial de seguimiento.

Esto permite conocer el proceso de recuperación de las plantas y determinar su situación dentro del sistema.

---

# 👥 Clientes

El sistema permite administrar la información de los clientes que realizan compras o apartados.

La información de clientes puede relacionarse con diferentes operaciones del sistema, como:

- Ventas.
- Apartados.
- Historial de operaciones.

Esto permite mantener centralizada la información y facilitar la consulta de los clientes relacionados con las operaciones comerciales.

---

# 📊 Reportes

El sistema incorpora un módulo de reportes e indicadores para facilitar la consulta de información relevante para la administración.

Los reportes permiten analizar información relacionada con:

- Ventas.
- Productos.
- Inventario.
- Existencias.
- Productos con bajo stock.
- Actividad reciente.
- Operaciones realizadas.

La información generada sirve como apoyo para la toma de decisiones administrativas.

---

# 📜 Historial de ventas

El historial de ventas permite consultar las operaciones comerciales realizadas anteriormente.

Esta información permite mantener un registro de las ventas y facilitar su consulta posterior.

El historial puede utilizarse como referencia para revisar operaciones realizadas, productos vendidos y datos relacionados con las transacciones.

---

# ⚙️ Configuración

El módulo de configuración concentra diferentes opciones administrativas del sistema.

Su finalidad es permitir la administración de determinados elementos necesarios para el funcionamiento de la aplicación.

---

# 🏗️ Arquitectura del sistema

El sistema utiliza una arquitectura cliente-servidor organizada en diferentes capas.

```text
┌──────────────────────────────────────────┐
│              USUARIO                     │
│      Administrador / Empleado            │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│          CAPA DE PRESENTACIÓN             │
│                                           │
│      Next.js + React + Tailwind CSS      │
│                                           │
│  Login │ Dashboard │ Inventario │ Ventas │
│  Movimientos │ Pedidos │ Reportes        │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│          LÓGICA DE APLICACIÓN             │
│                                           │
│      Validaciones y operaciones           │
│      de los diferentes módulos            │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│              CAPA DE DATOS                │
│                                           │
│             Supabase                     │
│                │                          │
│                ▼                          │
│            PostgreSQL                     │
└──────────────────────────────────────────┘
