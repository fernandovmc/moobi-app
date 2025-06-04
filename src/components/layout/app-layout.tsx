"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/hooks/useAuth";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  
  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isMarketingPage = !isAuthPage && !isDashboardPage;

  // For auth pages, show only the content without any layout
  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // For marketing pages, show only the content without dashboard layout
  if (isMarketingPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // For dashboard pages, show the full layout with sidebar and header
  if (isDashboardPage && isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    );
  }

  // Fallback for any other case
  return <div className="min-h-screen bg-background">{children}</div>;
}
