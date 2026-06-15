"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  BookOpen,
  Trophy,
  BarChart,
} from "lucide-react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("opportunities");

  // Mock stats
  const stats = {
    totalOpportunities: 8,
    totalCourses: 8,
    totalUsers: 2143,
    activeUsers: 1256,
  };

  // Mock opportunities data
  const opportunities = [
    {
      id: 1,
      title: "Международная олимпиада по математике IMO",
      category: "Олимпиада",
      deadline: "2026-08-15",
      status: "Активна",
    },
    {
      id: 2,
      title: "Летняя школа MIT по программированию",
      category: "Летняя программа",
      deadline: "2026-07-01",
      status: "Активна",
    },
    {
      id: 3,
      title: "Стипендия Болашак для обучения за рубежом",
      category: "Стипендия",
      deadline: "2026-09-30",
      status: "Активна",
    },
  ];

  // Mock courses data
  const courses = [
    {
      id: 1,
      title: "Основы математики для олимпиад",
      category: "Математика",
      lessons: 36,
      enrolled: 245,
      status: "Опубликован",
    },
    {
      id: 2,
      title: "Английский для академического успеха",
      category: "Английский язык",
      lessons: 30,
      enrolled: 512,
      status: "Опубликован",
    },
    {
      id: 3,
      title: "Подготовка к SAT",
      category: "Подготовка к тестам",
      lessons: 48,
      enrolled: 389,
      status: "Опубликован",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-heading font-bold">Mentoria Hub</span>
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">Admin</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  На сайт
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                Выход
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">
              Панель администратора
            </h1>
            <p className="text-muted-foreground">
              Управление контентом платформы
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{stats.totalOpportunities}</span>
              </div>
              <p className="text-sm text-muted-foreground">Возможностей</p>
            </div>

            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{stats.totalCourses}</span>
              </div>
              <p className="text-sm text-muted-foreground">Курсов</p>
            </div>

            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{stats.totalUsers}</span>
              </div>
              <p className="text-sm text-muted-foreground">Всего пользователей</p>
            </div>

            <div className="bg-card border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <BarChart className="w-5 h-5 text-primary" />
                <span className="text-2xl font-heading font-bold">{stats.activeUsers}</span>
              </div>
              <p className="text-sm text-muted-foreground">Активных пользователей</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
            <div className="border-b border-border/40">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("opportunities")}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === "opportunities"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Возможности
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === "courses"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Курсы
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-6 py-3 font-medium text-sm transition-colors ${
                    activeTab === "users"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Пользователи
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Opportunities Tab */}
              {activeTab === "opportunities" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Поиск возможностей..."
                          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                      <Link href="/admin/opportunities/add">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить возможность
                      </Link>
                    </Button>
                  </div>

                  <div className="border border-border/40 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Название
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Категория
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Дедлайн
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Статус
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Действия
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {opportunities.map((opp) => (
                          <tr key={opp.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium">{opp.title}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                {opp.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">
                              {new Date(opp.deadline).toLocaleDateString('ru-RU')}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded">
                                {opp.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Courses Tab */}
              {activeTab === "courses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Поиск курсов..."
                          className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                      <Link href="/admin/courses/add">
                        <Plus className="w-4 h-4 mr-2" />
                        Добавить курс
                      </Link>
                    </Button>
                  </div>

                  <div className="border border-border/40 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Название
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Категория
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Уроков
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Учеников
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Статус
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Действия
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {courses.map((course) => (
                          <tr key={course.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium">{course.title}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                {course.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">
                              {course.lessons}
                            </td>
                            <td className="px-6 py-4 text-sm text-muted-foreground">
                              {course.enrolled}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded">
                                {course.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div>
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Список пользователей</h3>
                    <p className="text-muted-foreground mb-6">
                      Здесь будет отображаться список всех пользователей платформы
                    </p>
                    <div className="bg-muted/50 border border-border/40 rounded-lg p-8 max-w-2xl mx-auto">
                      <p className="text-sm text-muted-foreground">
                        В MVP версии: базовая статистика по пользователям. В полной версии:
                        просмотр профилей, активность, управление доступом.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Mentoria Hub Admin Panel</p>
        </div>
      </footer>
    </div>
  );
}
