"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Bookmark,
  BookOpen,
  Calendar,
  TrendingUp,
  Award,
  Target,
  Clock,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  // Mock user data
  const user = {
    name: "Алия",
    grade: "10 класс",
    interests: ["STEM", "Программирование", "Бизнес"],
    coins: 350,
    rank: 42,
  };

  const savedOpportunities = [
    {
      id: 1,
      title: "Международная олимпиада по математике IMO",
      category: "Олимпиада",
      deadline: "2026-08-15",
      daysLeft: 61,
    },
    {
      id: 2,
      title: "Global Startup Competition",
      category: "Конкурс",
      deadline: "2026-07-20",
      daysLeft: 35,
    },
    {
      id: 4,
      title: "Хакатон AI for Good",
      category: "Хакатон",
      deadline: "2026-06-30",
      daysLeft: 15,
    },
  ];

  const enrolledCourses = [
    {
      id: 4,
      title: "Основы программирования на Python",
      progress: 65,
      nextLesson: "Урок 16: Работа с файлами",
      totalLessons: 24,
      completedLessons: 15,
    },
    {
      id: 2,
      title: "Английский для академического успеха",
      progress: 30,
      nextLesson: "Урок 10: Academic Writing",
      totalLessons: 30,
      completedLessons: 9,
    },
  ];

  const recommendations = [
    {
      id: 5,
      title: "Научно-исследовательская программа в МФТИ",
      type: "opportunity",
      matchScore: 92,
      reason: "Подходит твоим интересам: STEM, Физика",
    },
    {
      id: 6,
      title: "Введение в экономику",
      type: "course",
      matchScore: 85,
      reason: "Связано с твоим интересом: Бизнес",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">Mentoria Hub</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/opportunities" className="text-sm font-medium hover:text-primary transition-colors">
                Возможности
              </Link>
              <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Курсы
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Лидерборд
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">{user.coins}</span>
              </div>
              <Button variant="ghost" size="sm">
                {user.name}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">
              Привет, {user.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              {user.grade} • {user.interests.join(", ")}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Bookmark className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{savedOpportunities.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Сохранено</p>
            </div>

            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{enrolledCourses.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Активных курсов</p>
            </div>

            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{user.coins}</span>
              </div>
              <p className="text-sm text-muted-foreground">Коинов</p>
            </div>

            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">#{user.rank}</span>
              </div>
              <p className="text-sm text-muted-foreground">Место в рейтинге</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Upcoming Deadlines */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-bold">Ближайшие дедлайны</h2>
                  <Link href="/opportunities">
                    <Button variant="ghost" size="sm">Все</Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  {savedOpportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className="bg-card border border-border/60 rounded-lg p-4 flex items-center justify-between hover:border-primary/40 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{opp.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs">
                            {opp.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {opp.daysLeft} дней
                          </span>
                        </div>
                      </div>
                      <Link href={`/opportunities/${opp.id}`}>
                        <Button variant="outline" size="sm">
                          Открыть
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Course Progress */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-bold">Мои курсы</h2>
                  <Link href="/courses">
                    <Button variant="ghost" size="sm">Все курсы</Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {course.nextLesson}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-primary">
                          {course.progress}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {course.completedLessons} / {course.totalLessons} уроков
                        </span>
                        <Link href={`/courses/${course.id}`}>
                          <Button size="sm">Продолжить</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Recommendations */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-heading font-bold">Рекомендации</h2>
                </div>
                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="bg-card border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{rec.title}</h3>
                        <span className="text-xs font-semibold text-primary px-2 py-0.5 bg-primary/10 rounded">
                          {rec.matchScore}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {rec.reason}
                      </p>
                      <Link href={rec.type === "opportunity" ? `/opportunities/${rec.id}` : `/courses/${rec.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Посмотреть
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Actions */}
              <section>
                <h2 className="text-xl font-heading font-bold mb-4">Быстрые действия</h2>
                <div className="space-y-2">
                  <Link href="/opportunities">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Найти возможности
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Посмотреть курсы
                    </Button>
                  </Link>
                  <Link href="/leaderboard">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Лидерборд
                    </Button>
                  </Link>
                </div>
              </section>
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
