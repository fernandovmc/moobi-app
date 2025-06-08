"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Wallet,
  PieChart,
  BarChart,
  Target,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Transações",
    href: "/dashboard/transactions",
    icon: Wallet,
  },
  {
    name: "Orçamentos",
    href: "/dashboard/budgets",
    icon: PieChart,
  },
  {
    name: "Relatórios",
    href: "/dashboard/reports",
    icon: BarChart,
  },
  {
    name: "Metas",
    href: "/dashboard/goals",
    icon: Target,
  },
  {
    name: "Notificações",
    href: "/dashboard/notifications",
    icon: Bell,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <div className="flex h-full w-25 flex-col border-r bg-background items-center">
      <div className="flex h-14 items-center border-b w-full justify-center">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 font-semibold"
        >
          <Wallet className="h-6 w-6" />
          <span className="text-xs">Moobi</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4 w-full">
        <nav className="flex flex-col items-center gap-4">
          {navigation.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "flex flex-col items-center gap-1 w-16 h-16 justify-center p-0",
                pathname === item.href && "bg-muted"
              )}
              asChild
            >
              <Link href={item.href} className="flex flex-col items-center">
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <Separator className="my-4" />
        <nav className="flex flex-col items-center gap-4">
          <Button variant="ghost" className="flex flex-col items-center gap-1 w-16 h-16 justify-center p-0" asChild>
            <Link href="/dashboard/settings" className="flex flex-col items-center">
              <Settings className="h-6 w-6" />
              <span className="text-xs mt-1">Configurações</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 w-16 h-16 justify-center p-0 text-destructive hover:text-destructive"
            onClick={signOut}
          >
            <LogOut className="h-6 w-6" />
            <span className="text-xs mt-1">Sair</span>
          </Button>
        </nav>
      </ScrollArea>
    </div>
  );
}
