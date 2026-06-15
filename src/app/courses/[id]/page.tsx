"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Play,
  Award,
  Users,
} from "lucide-react";
import { getCourseById } from "@/lib/data";
import { enrollCourse, unenrollCourse, isCourseEnrolled } from "@/lib/store";

export default function CourseDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const course = getCourseById(id);

  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    setEnrolled(isCourseEnrolled(id));
  }, [id]);

  const handleEnroll = () => {
    if (enrolled) {
      unenrollCourse(id);
      setEnrolled(false);
    } else {
      enrollCourse(id);
      setEnrolled(true);
    }
  };

  if (!course) {
    return (
      <div className="flex flex-col min-h-screen">
        <nav className="border-b border-border/40 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-heading font-bold">Mentoria Hub</span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold mb-2">Курс не найден</h1>
            <Link href="/courses">
              <Button>Вернуться к списку</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Лидерборд
              </Link>
            </div>

            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/courses">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к курсам
            </Button>
          </Link>

          {/* Header */}
          <div className="bg-card border border-border/60 rounded-lg p-8 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg font-medium">
                  {course.category}
                </span>
                <h1 className="text-3xl font-heading font-bold mt-4 mb-2">
                  {course.title}
                </h1>
                <p className="text-muted-foreground mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} уроков</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              size="lg"
              onClick={handleEnroll}
              className={enrolled ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"}
            >
              {enrolled ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Записан
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Записаться на курс
                </>
              )}
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">О курсе</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {course.fullDescription}
                </p>
              </div>

              {/* Learning Objectives */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Что вы изучите</h2>
                <ul className="space-y-3">
                  {course.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Syllabus */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">Программа курса</h2>
                <div className="space-y-4">
                  {course.syllabus.map((module, idx) => (
                    <div key={idx} className="border border-border/40 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{module.title}</h3>
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Instructor */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Преподаватель
                </h3>
                <p className="font-medium mb-2">{course.instructor}</p>
                <p className="text-sm text-muted-foreground">
                  {course.instructorBio}
                </p>
              </div>

              {/* Course Info */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-4">Информация о курсе</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Уровень</p>
                    <p className="font-medium">{course.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Длительность</p>
                    <p className="font-medium">{course.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Уроков</p>
                    <p className="font-medium">{course.lessons}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Формат</p>
                    <p className="font-medium">Онлайн, самостоятельно</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              {!enrolled && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-heading font-semibold mb-2">
                    Готов начать?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Запишись на курс и начни обучение прямо сейчас
                  </p>
                  <Button onClick={handleEnroll} className="w-full">
                    Записаться
                  </Button>
                </div>
              )}

              {enrolled && (
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-accent mx-auto mb-3" />
                  <h3 className="font-heading font-semibold mb-2">
                    Вы записаны!
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Курс доступен в вашем Dashboard
                  </p>
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                      Перейти к обучению
                    </Button>
                  </Link>
                </div>
              )}
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
