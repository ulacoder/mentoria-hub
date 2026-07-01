"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Settings, Bell, Target, LogOut } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-card border rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">{user.grade}</p>
              </div>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.coins}</div>
              <div className="text-sm text-muted-foreground">Коинов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">#{user.rank || 0}</div>
              <div className="text-sm text-muted-foreground">Рейтинг</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{user.interests.length}</div>
              <div className="text-sm text-muted-foreground">Интересов</div>
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Настройки профиля</h2>
          <div className="space-y-2">
            <Link href="/profile/setup">
              <Button variant="outline" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Основные настройки
              </Button>
            </Link>
            <Link href="/profile/telegram">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="w-4 h-4 mr-2" />
                Настройки Telegram
              </Button>
            </Link>
            <Link href="/profile/mbti">
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                MBTI тест
              </Button>
            </Link>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-card border rounded-lg p-6 mt-6">
          <h2 className="text-xl font-bold mb-4">Мои интересы</h2>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-6">
          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              Вернуться в дашборд
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
