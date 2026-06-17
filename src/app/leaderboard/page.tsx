"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { StreakWidget } from "@/components/streak-widget";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";

// Mock leaderboard data
const leaderboardData = [
  {
    rank: 1,
    name: "Асель Нурбекова",
    grade: "11 класс",
    points: 2450,
    coursesCompleted: 8,
    badges: 12,
    streak: 45,
  },
  {
    rank: 2,
    name: "Тимур Жанатов",
    grade: "10 класс",
    points: 2280,
    coursesCompleted: 7,
    badges: 10,
    streak: 38,
  },
  {
    rank: 3,
    name: "Дана Смагулова",
    grade: "11 класс",
    points: 2150,
    coursesCompleted: 6,
    badges: 11,
    streak: 42,
  },
  {
    rank: 4,
    name: "Ернар Абдиров",
    grade: "10 класс",
    points: 1980,
    coursesCompleted: 6,
    badges: 9,
    streak: 30,
  },
  {
    rank: 5,
    name: "Айгерим Касымова",
    grade: "9 класс",
    points: 1850,
    coursesCompleted: 5,
    badges: 8,
    streak: 28,
  },
  {
    rank: 6,
    name: "Марат Султанов",
    grade: "11 класс",
    points: 1720,
    coursesCompleted: 5,
    badges: 7,
    streak: 25,
  },
  {
    rank: 7,
    name: "Алина Ибраева",
    grade: "10 класс",
    points: 1650,
    coursesCompleted: 4,
    badges: 7,
    streak: 22,
  },
  {
    rank: 8,
    name: "Арман Темирбаев",
    grade: "9 класс",
    points: 1520,
    coursesCompleted: 4,
    badges: 6,
    streak: 20,
  },
  {
    rank: 9,
    name: "Сауле Нұрланова",
    grade: "11 класс",
    points: 1480,
    coursesCompleted: 4,
    badges: 6,
    streak: 18,
  },
  {
    rank: 10,
    name: "Бекзат Қуатов",
    grade: "10 класс",
    points: 1350,
    coursesCompleted: 3,
    badges: 5,
    streak: 15,
  },
];

const badges = [
  { name: "Первые шаги", icon: "🌱", description: "Зарегистрировался на платформе" },
  { name: "Любитель учиться", icon: "📚", description: "Завершил первый курс" },
  { name: "Мастер Python", icon: "🐍", description: "Завершил курс по Python" },
  { name: "Математик", icon: "🧮", description: "Завершил курс математики" },
  { name: "Полиглот", icon: "🌍", description: "Завершил курс английского" },
  { name: "Марафонец", icon: "🏃", description: "Учился 30 дней подряд" },
  { name: "Исследователь", icon: "🔍", description: "Сохранил 10 возможностей" },
  { name: "Победитель", icon: "🏆", description: "Занял топ-10 в лидерборде" },
];

export default function LeaderboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const currentUser = {
    rank: user.rank || 42,
    name: user.name,
    points: 850,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
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
              <Link href="/leaderboard" className="text-sm font-medium text-primary">
                Лидерборд
              </Link>
              <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors">
                О нас
              </Link>
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
                Функционал
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                О платформе
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <StreakWidget />
              <ThemeToggle />
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1">
        {/* Hero */}
        <div className="border-b border-border/40 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-heading font-bold">
                Лидерборд
              </h1>
            </div>
            <p className="text-muted-foreground">
              Соревнуйся с другими учениками и получай награды за активность
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Leaderboard */}
            <div className="lg:col-span-2">
              {/* Your Rank */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold">
                      #{currentUser.rank}
                    </div>
                    <div>
                      <p className="font-semibold">{currentUser.name} (Вы)</p>
                      <p className="text-sm text-muted-foreground">{currentUser.points} баллов</p>
                    </div>
                  </div>
                  <Link href="/dashboard">
                    <Button size="sm" variant="outline">
                      Мой профиль
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Top 3 Podium */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {/* 2nd Place */}
                <div className="flex flex-col items-center pt-8">
                  <div className="w-16 h-16 bg-muted border-2 border-muted-foreground/30 rounded-full flex items-center justify-center mb-2">
                    <Medal className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="text-4xl font-heading font-bold text-muted-foreground mb-1">2</div>
                  <p className="font-semibold text-sm text-center">{leaderboardData[1].name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardData[1].points} pts</p>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-primary border-2 border-primary rounded-full flex items-center justify-center mb-2">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl font-heading font-bold text-primary mb-1">1</div>
                  <p className="font-semibold text-sm text-center">{leaderboardData[0].name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardData[0].points} pts</p>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center pt-12">
                  <div className="w-14 h-14 bg-muted border-2 border-muted-foreground/20 rounded-full flex items-center justify-center mb-2">
                    <Award className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div className="text-3xl font-heading font-bold text-muted-foreground mb-1">3</div>
                  <p className="font-semibold text-xs text-center">{leaderboardData[2].name}</p>
                  <p className="text-xs text-muted-foreground">{leaderboardData[2].points} pts</p>
                </div>
              </div>

              {/* Full Rankings */}
              <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
                <div className="bg-muted/50 px-6 py-3 border-b border-border/60">
                  <h2 className="font-heading font-semibold">Топ-10 учеников</h2>
                </div>
                <div className="divide-y divide-border/40">
                  {leaderboardData.map((user) => (
                    <div
                      key={user.rank}
                      className="px-6 py-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold ${
                            user.rank <= 3
                              ? "bg-primary text-white"
                              : "bg-muted text-foreground"
                          }`}>
                            {user.rank}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{user.name}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{user.grade}</span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {user.streak} дней подряд
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-heading font-bold text-primary">{user.points}</p>
                          <p className="text-xs text-muted-foreground">{user.coursesCompleted} курсов</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* How to earn points */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Как зарабатывать баллы
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>+50</strong> — Завершение урока</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>+200</strong> — Завершение курса</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>+100</strong> — Выполнение теста</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>+20</strong> — Ежедневная активность</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>+10</strong> — Сохранение возможности</span>
                  </li>
                </ul>
              </div>

              {/* Badges */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-4">Достижения</h3>
                <div className="grid grid-cols-4 gap-3">
                  {badges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="aspect-square bg-muted rounded-lg flex items-center justify-center text-2xl hover:bg-muted/70 transition-colors cursor-pointer"
                      title={`${badge.name}: ${badge.description}`}
                    >
                      {badge.icon}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Зарабатывай значки за активность и достижения
                </p>
              </div>

              {/* CTA */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-semibold mb-2">
                  Поднимайся в рейтинге!
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Проходи курсы и зарабатывай баллы
                </p>
                <Link href="/courses">
                  <Button size="sm" className="w-full">
                    Начать учиться
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Mentoria Hub. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
