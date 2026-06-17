"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/contexts/locale-context";
import { AuthModal } from "@/components/auth-modal";

export function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLocale();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | undefined>();

  const handleProtectedClick = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      setRedirectTo(path);
      setShowAuthModal(true);
    }
  };

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectTo={redirectTo}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/opportunities"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e) => handleProtectedClick(e, "/opportunities")}
            >
              Возможности
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e) => handleProtectedClick(e, "/courses")}
            >
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
            {user?.role === "mentor" && (
              <Link href="/mentor" className="text-sm font-medium hover:text-primary transition-colors">
                Ученики
              </Link>
            )}
            {user?.role === "admin" && (
              <Link href="/admin" className="text-sm font-medium hover:text-primary transition-colors">
                Админ панель
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            {user ? (
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
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setShowAuthModal(true)}>
                  Вход
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => setShowAuthModal(true)}>
                  Регистрация
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
