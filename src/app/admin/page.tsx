"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { AdminNavbar } from "@/components/admin-navbar";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Trophy,
  Award,
  TrendingUp,
  Activity,
  DollarSign,
  UserCheck
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalMentors: 0,
    totalCourses: 3, // Hardcoded for now
    totalOpportunities: 0,
    totalCoins: 0,
    activeUsers: 0
  });

  useEffect(() => {
    if (user && user.role === "admin") {
      loadStats();
    }
  }, [user]);

  const loadStats = () => {
    if (typeof window === "undefined") return;

    const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    const students = users.filter((u: any) => u.role === "student");
    const mentors = users.filter((u: any) => u.role === "mentor");
    const totalCoins = users.reduce((sum: number, u: any) => sum + (u.coins || 0), 0);

    // Count active users (those with progress)
    const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
    const activeUsers = users.filter((u: any) => {
      const userProgress = progress[u.id];
      return userProgress?.enrolledCourses?.length > 0;
    }).length;

    setStats({
      totalUsers: users.length,
      totalStudents: students.length,
      totalMentors: mentors.length,
      totalCourses: 3,
      totalOpportunities: 0,
      totalCoins,
      activeUsers
    });
  };

  return (
    <RequireRole role="admin">
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Панель администратора</h1>
              <p className="text-muted-foreground">
                Управление платформой Mentoria Hub
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold">{stats.totalUsers}</span>
                </div>
                <p className="text-sm text-muted-foreground">Всего пользователей</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <UserCheck className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold">{stats.totalStudents}</span>
                </div>
                <p className="text-sm text-muted-foreground">Студентов</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-purple-500" />
                  <span className="text-2xl font-bold">{stats.totalMentors}</span>
                </div>
                <p className="text-sm text-muted-foreground">Менторов</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span className="text-2xl font-bold">{stats.activeUsers}</span>
                </div>
                <p className="text-sm text-muted-foreground">Активных</p>
              </div>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{stats.totalCourses}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Курсов на платформе</p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => router.push("/admin/courses")}
                >
                  Управление курсами
                </Button>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{stats.totalOpportunities}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Возможностей</p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => router.push("/admin/opportunities")}
                >
                  Управление возможностями
                </Button>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{stats.totalCoins}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Коинов в системе</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/admin/analytics")}
                >
                  Подробная аналитика
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border/60 rounded-lg p-6">
              <h2 className="text-xl font-heading font-bold mb-4">Быстрые действия</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/courses")}
                  className="justify-start"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Добавить курс
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/opportunities")}
                  className="justify-start"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Добавить возможность
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/admin/users")}
                  className="justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Управление пользователями
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
