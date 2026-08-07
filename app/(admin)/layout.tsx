"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SearchProvider } from "@/context/SearchContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SearchProvider>

      <main className="min-h-screen bg-[#111a11] text-white flex overflow-x-hidden">

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <section className="flex-1 min-w-0 p-3 sm:p-4 md:p-8">

          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
          />

          {children}

        </section>

      </main>

    </SearchProvider>
  );
}