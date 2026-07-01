"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  Send,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { StreakWidget } from "@/components/streak-widget";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";
import { getFullUserProgress, getUserStats } from "@/lib/database";
import { getAllOpportunities, getAllCourses } from "@/lib/data";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLocale } from "@/contexts/locale-context";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { t } = useLocale();
  const [userProgress, setUserProgress] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      const progress = getFullUserProgress(user.id);
      const userStats = getUserStats(user.id);
      setUserProgress(progress);
      setStats(userStats);
    }
  }, [user, router]);

  if (!user || !userProgress || !stats) {
    return null;
  }

  const allOpportunities = getAllOpportunities();
  const allCourses = getAllCourses();

  // Get saved opportunities with details
  const savedOpportunities = userProgress.savedOpportunities
    .map((id: number) => allOpportunities.find(o => o.id === id))
    .filter(Boolean)
    .slice(0, 3);

  // Get enrolled courses with progress
  const enrolledCoursesWithProgress = userProgress.enrolledCourses
    .map((enrollment: any) => {
      const course = allCourses.find(c => c.id === enrollment.courseId);
      if (!course) return null;
      return {
        ...course,
        progress: enrollment.progress,
        completedLessons: enrollment.completedLessons,
        nextLesson: `Урок ${enrollment.completedLessons + 1}`,
      };
    })
    .filter(Boolean)
    .slice(0, 2);

  // Generate recommendations based on user interests
  const recommendations = user.interests
    .flatMap((interest: string) => {
      const relatedOpps = allOpportunities.filter(o =>
        o.tags.includes(interest) && !userProgress.savedOpportunities.includes(o.id)
      ).slice(0, 1);
      const relatedCourses = allCourses.filter(c =>
        c.category === interest && !userProgress.enrolledCourses.some((e: any) => e.courseId === c.id)
      ).slice(0, 1);
      return [
        ...relatedOpps.map(o => ({ ...o, type: 'opportunity', matchScore: 90 })),
        ...relatedCourses.map(c => ({ ...c, type: 'course', matchScore: 85 }))
      ];
    })
    .slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
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
                <span className="text-2xl font-heading font-bold">{stats.savedCount}</span>
              </div>
              <p className="text-sm text-muted-foreground">Сохранено</p>
            </div>

            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{stats.enrolledCount}</span>
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
                <span className="text-2xl font-heading font-bold">#{user.rank || 0}</span>
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
                  {savedOpportunities.length > 0 ? (
                    savedOpportunities.map((opp: any) => {
                      const deadline = new Date(opp.deadline);
                      const today = new Date();
                      const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

                      return (
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
                                {daysLeft} дней
                              </span>
                            </div>
                          </div>
                          <Link href={`/opportunities/${opp.id}`}>
                            <Button variant="outline" size="sm">
                              Открыть
                            </Button>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Нет сохраненных возможностей</p>
                      <Link href="/opportunities">
                        <Button variant="outline" size="sm" className="mt-4">
                          Найти возможности
                        </Button>
                      </Link>
                    </div>
                  )}
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
                  {enrolledCoursesWithProgress.length > 0 ? (
                    enrolledCoursesWithProgress.map((course: any) => (
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
                            {course.completedLessons} / {course.lessons} уроков
                          </span>
                          <Link href={`/courses/${course.id}`}>
                            <Button size="sm">Продолжить</Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Нет активных курсов</p>
                      <Link href="/courses">
                        <Button variant="outline" size="sm" className="mt-4">
                          Найти курсы
                        </Button>
                      </Link>
                    </div>
                  )}
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
                  {recommendations.length > 0 ? (
                    recommendations.map((rec: any) => (
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
                          Подходит твоим интересам: {user.interests.join(", ")}
                        </p>
                        <Link href={rec.type === "opportunity" ? `/opportunities/${rec.id}` : `/courses/${rec.id}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Посмотреть
                          </Button>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      Пока нет рекомендаций
                    </div>
                  )}
                </div>
              </section>

              {/* Quick Actions */}
              <section>
                <h2 className="text-xl font-heading font-bold mb-4">Быстрые действия</h2>
                <div className="space-y-2">
                  <Link href="/profile/telegram">
                    <Button variant="outline" className="w-full justify-start">
                      <Send className="w-4 h-4 mr-2" />
                      Настроить Telegram
                    </Button>
                  </Link>
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
