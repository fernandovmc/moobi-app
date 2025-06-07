export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Welcome to Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            This is your main dashboard page. You are successfully authenticated.
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Quick Stats</h3>
          <p className="text-sm text-muted-foreground">
            Your dashboard statistics will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}