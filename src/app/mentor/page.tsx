"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { MentorNavbar } from "@/components/mentor-navbar";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageCircle,
  TrendingUp,
  Award,
  Brain,
  Mail,
  Activity
} from "lucide-react";

// Get all users from localStorage
function getAllUsers() {
  if (typeof window === "undefined") return [];
  const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
  return users.filter((u: any) => u.role === "student");
}

export default function MentorDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  useEffect(() => {
    if (user && user.role === "mentor") {
      const allStudents = getAllUsers();
      setStudents(allStudents);
    }
  }, [user]);

  return (
    <RequireRole role="mentor">
      <div className="flex flex-col min-h-screen">
        <MentorNavbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Панель ментора</h1>
              <p className="text-muted-foreground">
                Следи за активностью студентов, мотивируй и поддерживай их
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{students.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Всего студентов</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold">
                    {students.filter(s => {
                      // Active if has enrolled courses
                      const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
                      return progress[s.id]?.enrolledCourses?.length > 0;
                    }).length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Активных</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Brain className="w-5 h-5 text-purple-500" />
                  <span className="text-2xl font-bold">
                    {students.filter(s => s.mbti).length}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">С MBTI профилем</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold">
                    {students.reduce((sum, s) => sum + (s.coins || 0), 0)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Всего коинов</p>
              </div>
            </div>

            {/* Students List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-heading font-bold mb-4">Студенты</h2>
                <div className="space-y-3">
                  {students.map((student) => {
                    const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
                    const studentProgress = progress[student.id];
                    const enrolledCount = studentProgress?.enrolledCourses?.length || 0;

                    return (
                      <div
                        key={student.id}
                        className={`bg-card border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedStudent?.id === student.id
                            ? "border-primary"
                            : "border-border/60 hover:border-primary/50"
                        }`}
                        onClick={() => router.push(`/mentor/student/${student.id}`)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{student.name}</h3>
                              {student.mbti && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-semibold">
                                  {student.mbti}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {student.grade} • {student.interests?.join(", ")}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {student.coins || 0} коинов
                              </span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                {enrolledCount} курсов
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Написать
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  {students.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Пока нет студентов</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Student Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedStudent ? (
                  <div className="bg-card border border-border/60 rounded-lg p-6 sticky top-4">
                    <h3 className="font-heading font-bold mb-4">Профиль студента</h3>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Информация</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Имя:</span> {selectedStudent.name}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span> {selectedStudent.email}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Класс:</span> {selectedStudent.grade}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Коины:</span> {selectedStudent.coins || 0}
                        </div>
                      </div>
                    </div>

                    {selectedStudent.mbti && (
                      <div className="mb-4 p-4 bg-primary/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold">MBTI: {selectedStudent.mbti}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Используй особенности этого типа для эффективной работы со студентом
                        </p>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Интересы</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.interests?.map((interest: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-muted rounded text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Отправить сообщение
                    </Button>
                  </div>
                ) : (
                  <div className="bg-card border border-border/60 rounded-lg p-6">
                    <p className="text-sm text-muted-foreground text-center">
                      Выбери студента чтобы увидеть детали
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
