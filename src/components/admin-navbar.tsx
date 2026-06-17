"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Settings, BookOpen, Trophy, Users, BarChart3, LogOut } from "lucide-react";

export function AdminNavbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { href: "/admin", label: "Панель управления", icon: Settings },
    { href: "/admin/courses", label: "Курсы", icon: BookOpen },
    { href: "/admin/opportunities", label: "Возможности", icon: Trophy },
    { href: "/admin/users", label: "Пользователи", icon: Users },
    { href: "/admin/analytics", label: "Аналитика", icon: BarChart3 },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-right">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs text-red-500 font-semibold">АДМИНИСТРАТОР</p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
