"use client";
import { Navbar } from "@/components/navbar";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Play,
  CheckCircle,
} from "lucide-react";
import { getAllCourses } from "@/lib/data";
import {
  enrollCourse,
  unenrollCourse,
  isCourseEnrolled,
  getEnrolledCourses,
} from "@/lib/database";
import { getDifficultyColor } from "@/lib/utils-colors";
import { ThemeToggle } from "@/components/theme-toggle";
import { StreakWidget } from "@/components/streak-widget";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";

const categories = ["Все", "Математика", "Английский язык", "Программирование", "Физика", "Экономика", "Подготовка к тестам", "Карьера", "Информатика"];
const levels = ["Все", "Начальный", "Средний", "Продвинутый"];

export default function CoursesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedLevel, setSelectedLevel] = useState("Все");
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  const courses = getAllCourses();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setEnrolledCourses(getEnrolledCourses(user.id));
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleEnroll = (id: number) => {
    if (!user) return;

    if (enrolledCourses.includes(id)) {
      unenrollCourse(user.id, id);
      setEnrolledCourses(enrolledCourses.filter(courseId => courseId !== id));
    } else {
      enrollCourse(user.id, id);
      setEnrolledCourses([...enrolledCourses, id]);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "Все" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "Все" || course.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

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
              <Link href="/courses" className="text-sm font-medium text-primary">
                Курсы
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
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
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Каталог курсов
            </h1>
            <p className="text-muted-foreground">
              Учись в своём темпе: от основ до продвинутого уровня
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="mb-8 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Категория</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-white"
                        : "bg-background border border-border hover:border-primary/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Уровень сложности</h3>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedLevel === level
                        ? "bg-primary text-white"
                        : "bg-background border border-border hover:border-primary/40"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Найдено курсов: <span className="font-semibold text-foreground">{filteredCourses.length}</span>
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);

              return (
                <div
                  key={course.id}
                  className="bg-card border-2 border-accent/20 rounded-lg overflow-hidden hover:border-accent/50 transition-all group hover:shadow-lg hover:shadow-accent/10"
                >
                  {/* Course Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-b-2 border-accent/20">
                    <Play className="w-12 h-12 text-primary" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/30">
                        {course.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getDifficultyColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} уроков</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/courses/${course.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full border-accent/30 hover:bg-accent/10">
                          Подробнее
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => handleEnroll(course.id)}
                        className={isEnrolled ? "bg-accent hover:bg-accent/90" : "border-accent/30"}
                        variant={isEnrolled ? "default" : "outline"}
                      >
                        {isEnrolled ? <CheckCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
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
