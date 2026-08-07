"use client";

import { useState } from "react";

import SidebarEmpleado from "./SidebarEmpleado";
import Navbar from "@/components/Navbar";
import { CartProvider } from "./CartContext";
import { SearchProvider } from "@/context/SearchContext";


export default function EmpleadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const [sidebarOpen, setSidebarOpen] =
    useState(false);



  return (

    <SearchProvider>

      <CartProvider>


        <div
          className="
            flex
            h-screen
            overflow-hidden
            bg-[#0f1a0f]
          "
        >



          <SidebarEmpleado
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />



          <div
            className="
              flex
              flex-col
              flex-1
              min-w-0
            "
          >



        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
        />



              <main
                className="
                  flex-1
                  overflow-y-auto
                  px-4
                  pb-6
                  pt-2
                  md:px-6
                "
              >

              {children}

            </main>



          </div>



        </div>



      </CartProvider>

    </SearchProvider>

  );

}