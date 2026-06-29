import SidebarEmpleado from "./SidebarEmpleado";
import NavbarEmpleado from "./NavbarEmpleado";

export default function EmpleadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#0f1a0f]">

      <SidebarEmpleado />

      <div className="flex flex-col flex-1">

        <NavbarEmpleado />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
}