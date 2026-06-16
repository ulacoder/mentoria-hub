"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/contexts/locale-context";

export function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLocale();

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="hidden md:flex items-center gap-6">
            <Link href="/opportunities" className="text-sm font-medium hover:text-primary transition-colors">
              Возможности
            </Link>
            <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
              Курсы
            </Link>
            <Link href="/roadmap" className="text-sm font-medium hover:text-primary transition-colors">
              Твой путь
            </Link>
            <Link href="/profile/mbti" className="text-sm font-medium hover:text-primary transition-colors">
              Личность
            </Link>
            <Link href="/messages" className="text-sm font-medium hover:text-primary transition-colors">
              Сообщения
            </Link>
            <Link href="/game" className="text-sm font-medium hover:text-primary transition-colors">
              🎮 Игра
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Магазин
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
              Лидерборд
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            {user && (
              <>
                <Link href="/dashboard">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">{user.coins}</span>
                  </div>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  {user.name}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
