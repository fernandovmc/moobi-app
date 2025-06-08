"use client";

import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { AppLayout } from "@/components/layout/app-layout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="moobi-theme"
    >
      <QueryProvider>
        <AuthProvider>
          <AppLayout>
            {children}
          </AppLayout>
          <Toaster 
            richColors 
            position="top-right"
            closeButton
            theme="system"
          />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
} 