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

export function Navbar() {
  const { user, logout, setShowAuthModal, setAuthRedirectTo } = useAuth();
  const { t } = useLocale();

  const handleProtectedClick = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      setAuthRedirectTo(path);
      setShowAuthModal(true);
    }
  };

  const handleAuthClick = (redirectTo?: string) => {
    if (redirectTo) {
      setAuthRedirectTo(redirectTo);
    }
    setShowAuthModal(true);
  };

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/profile/setup"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e) => handleProtectedClick(e, "/profile/setup")}
            >
              Оценить профиль
            </Link>
            <Link
              href="/roadmap"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e) => handleProtectedClick(e, "/roadmap")}
            >
              Твой roadmap
            </Link>
            <Link
              href="/opportunities"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={(e) => handleProtectedClick(e, "/opportunities")}
            >
              Возможности
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    {user.name}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => handleAuthClick()}>
                  Вход
                </Button>
                <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => handleAuthClick()}>
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
