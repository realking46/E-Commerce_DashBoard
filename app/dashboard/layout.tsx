export const runtime = "nodejs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav className="p-4 bg-grey-950 text-gray-50">
        Admin Dashboard
      </nav>
      {children}
    </div>
  );
}
