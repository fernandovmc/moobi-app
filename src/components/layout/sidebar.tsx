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
    <div className="flex h-full w-[240px] flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <Wallet className="h-6 w-6" />
          <span>Moobi</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="grid gap-1">
          {navigation.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "justify-start gap-2",
                pathname === item.href && "bg-muted"
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
        <Separator className="my-4" />
        <nav className="grid gap-1">
          <Button variant="ghost" className="justify-start gap-2" asChild>
            <Link href="/dashboard/settings">
              <Settings className="h-4 w-4" />
              Configurações
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 text-destructive hover:text-destructive"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </nav>
      </ScrollArea>
    </div>
  );
}
