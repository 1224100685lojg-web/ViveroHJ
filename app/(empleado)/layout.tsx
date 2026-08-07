import EmpleadoLayoutClient from "./_components/EmpleadoLayoutClient";

export default function EmpleadoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EmpleadoLayoutClient>
      {children}
    </EmpleadoLayoutClient>
  );
}