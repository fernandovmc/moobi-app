"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Verifica o estado inicial
    checkAuth();

    // Adiciona um listener para mudanças no localStorage
    window.addEventListener("storage", checkAuth);

    // Verifica o usuário no Supabase
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("storage", checkAuth);
    };
  }, [supabase.auth]);

  const isActive = (path: string) => pathname === path;
  const isMarketingPage = pathname === '/' ||
                         pathname.startsWith('/features') ||
                         pathname.startsWith('/pricing') ||
                         pathname.startsWith('/about') ||
                         pathname === '/login' ||
                         pathname === '/register';

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-center">
        <div className="flex w-full max-w-5xl items-center">
          {/* Logo and Desktop Navigation */}
          <div className="flex flex-1 items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Icons.wallet className="h-6 w-6 text-primary" />
              <span className="font-bold">Moobi</span>
            </Link>

            {isMarketingPage && (
              <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                <Link
                  href="/features"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive("/features") ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  Recursos
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive("/pricing") ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  Preços
                </Link>
                <Link
                  href="/about"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    isActive("/about") ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  Sobre
                </Link>
              </nav>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-4 md:flex">
            <ThemeToggle />
            {!isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login?mode=login">Entrar</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/login?mode=register">Registrar</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Icons.menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <Icons.wallet className="h-6 w-6 text-foreground" />
                      <span className="font-bold">Moobi</span>
                    </Link>
                  </div>
                  {!isLoggedIn ? (
                    <>
                      <nav className="flex flex-col space-y-4">
                        <Link
                          href="/features"
                          className={cn(
                            "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                            isActive("/features") ? "text-primary" : "text-foreground/60"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          Recursos
                        </Link>
                        <Link
                          href="/pricing"
                          className={cn(
                            "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                            isActive("/pricing") ? "text-primary" : "text-foreground/60"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          Preços
                        </Link>
                        <Link
                          href="/about"
                          className={cn(
                            "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                            isActive("/about") ? "text-primary" : "text-foreground/60"
                          )}
                          onClick={() => setIsOpen(false)}
                        >
                          Sobre
                        </Link>
                      </nav>
                      <div className="flex flex-col space-y-2 mt-auto pt-4 border-t">
                        <Button variant="ghost" asChild className="justify-start">
                          <Link href="/auth/login?mode=login" onClick={() => setIsOpen(false)}>
                            Entrar
                          </Link>
                        </Button>
                        <Button asChild className="justify-start">
                          <Link href="/auth/login?mode=register" onClick={() => setIsOpen(false)}>
                            Registrar
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 mt-auto pt-4 border-t">
                      <Button variant="ghost" asChild className="justify-start">
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          Dashboard
                        </Link>
                      </Button>
                      <Button variant="ghost" className="justify-start" onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}>
                        Sair
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 