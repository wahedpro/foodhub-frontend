export default function ProviderDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">
        Provider Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat title="Total Meals" value="12" />
        <Stat title="Pending Orders" value="5" />
        <Stat title="Completed Orders" value="48" />
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded border bg-white p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
