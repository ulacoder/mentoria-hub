"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  Clock,
  BarChart,
  Play,
  CheckCircle,
} from "lucide-react";

// Mock data для курсов
const courses = [
  {
    id: 1,
    title: "Основы математики для олимпиад",
    description: "Углубленный курс по алгебре, геометрии и комбинаторике для подготовки к математическим олимпиадам.",
    level: "Средний",
    duration: "12 недель",
    lessons: 36,
    enrolled: 245,
    progress: 0,
    category: "Математика",
    instructor: "Айжан Сералиева",
  },
  {
    id: 2,
    title: "Английский для академического успеха",
    description: "Развитие навыков Academic English: чтение научных текстов, написание эссе, презентации.",
    level: "Средний",
    duration: "10 недель",
    lessons: 30,
    enrolled: 512,
    progress: 0,
    category: "Английский язык",
    instructor: "Michael Thompson",
  },
  {
    id: 3,
    title: "Подготовка к SAT",
    description: "Комплексный курс подготовки к SAT: Math, Reading, Writing. Разбор реальных тестов.",
    level: "Продвинутый",
    duration: "16 недель",
    lessons: 48,
    enrolled: 389,
    progress: 0,
    category: "Подготовка к тестам",
    instructor: "Дана Ахметова",
  },
  {
    id: 4,
    title: "Основы программирования на Python",
    description: "Изучи основы Python с нуля: переменные, циклы, функции, ООП. Практические проекты.",
    level: "Начальный",
    duration: "8 недель",
    lessons: 24,
    enrolled: 678,
    progress: 0,
    category: "Программирование",
    instructor: "Арман Қуатов",
  },
  {
    id: 5,
    title: "Физика: Механика и динамика",
    description: "Классическая механика для олимпиад и поступления в технические вузы.",
    level: "Средний",
    duration: "14 недель",
    lessons: 42,
    enrolled: 156,
    progress: 0,
    category: "Физика",
    instructor: "Ербол Жанабаев",
  },
  {
    id: 6,
    title: "Введение в экономику",
    description: "Микро и макроэкономика, основы финансовой грамотности и бизнес-мышления.",
    level: "Начальный",
    duration: "10 недель",
    lessons: 30,
    enrolled: 298,
    progress: 0,
    category: "Экономика",
    instructor: "Алия Нурланова",
  },
  {
    id: 7,
    title: "Основы поступления в университет",
    description: "Как выбрать вуз, написать мотивационное письмо, подготовить портфолио и пройти интервью.",
    level: "Начальный",
    duration: "6 недель",
    lessons: 18,
    enrolled: 823,
    progress: 0,
    category: "Карьера",
    instructor: "Самат Касымов",
  },
  {
    id: 8,
    title: "IELTS Writing & Speaking",
    description: "Целенаправленная подготовка к письменной и устной частям IELTS. Band 7.0+",
    level: "Продвинутый",
    duration: "12 недель",
    lessons: 36,
    enrolled: 445,
    progress: 0,
    category: "Подготовка к тестам",
    instructor: "Sarah Wilson",
  },
];

const categories = ["Все", "Математика", "Английский язык", "Программирование", "Физика", "Экономика", "Подготовка к тестам", "Карьера"];
const levels = ["Все", "Начальный", "Средний", "Продвинутый"];

export default function CoursesPage() {
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
              <Link href="/courses" className="text-sm font-medium text-primary">
                Курсы
              </Link>
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
                Функционал
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                О платформе
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Вход
              </Button>
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Регистрация
                </Button>
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
              Курсы Mentoria
            </h1>
            <p className="text-muted-foreground">
              Учись в своём темпе через структурированные асинхронные курсы
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Категория</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-background border border-border hover:border-primary/40 transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Уровень</h3>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-background border border-border hover:border-primary/40 transition-colors"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-card border border-border/60 rounded-lg overflow-hidden hover:border-primary/40 transition-colors group"
              >
                {/* Course Image Placeholder */}
                <div className="aspect-video bg-muted/50 flex items-center justify-center border-b border-border/40">
                  <Play className="w-12 h-12 text-muted-foreground" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                      {course.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{course.level}</span>
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

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="text-sm text-muted-foreground">
                      {course.enrolled} учеников
                    </div>
                    <Link href={`/courses/${course.id}`}>
                      <Button size="sm" variant="outline" className="group-hover:border-primary/60">
                        Начать
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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
