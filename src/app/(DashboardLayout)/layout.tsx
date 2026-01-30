export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Dashboard Navbar / Sidebar later */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}
