import ProviderSidebar from "@/src/components/provider/ProviderSidebar";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ProviderSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
