"use client";

import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  const isAuthPage = pathname.startsWith("/auth");
  const isDashboardPage = pathname.startsWith("/dashboard");
  const isMarketingPage = !isAuthPage && !isDashboardPage;

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until after mount to prevent hydration issues
  if (!mounted) {
    return null;
  }

  // Show loading state while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // For auth pages, show only the content without any layout
  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // For marketing pages, show only the content without dashboard layout
  if (isMarketingPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // For dashboard pages
  if (isDashboardPage) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    );
  }

  // Fallback for any other case
  return <div className="min-h-screen bg-background">{children}</div>;
}
