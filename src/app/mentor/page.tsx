"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageCircle,
  Brain
} from "lucide-react";

export default function MentorDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role === "mentor") {
      fetchStudents();
    }
  }, [user]);

  const fetchStudents = async () => {
    // Add demo student Ula for presentation FIRST
    const demoStudent = {
      id: "demo-ula",
      name: "Ula",
      email: "ula@mentoria.com",
      grade: "11 класс",
      role: "student",
      mbti: "INTJ",
      interests: ["Математика", "STEM", "IT", "Программирование"],
      mbtiAnalysis: "INTJ — «Стратег». Обладает глубоким интеллектом, стратегическим видением и целеустремленностью. Системное мышление, интуитивное понимание сложных концепций и способность превращать идеи в работающие решения. Идеально подходит для STEM и IT."
    };

    try {
      const res = await fetch('/api/users');
      const users = await res.json();
      const studentsOnly = users.filter((u: any) => u.role === "student");
      setStudents([demoStudent, ...studentsOnly]);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      // Even if API fails, show demo student
      setStudents([demoStudent]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireRole role="mentor">
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Ученики</h1>
              <p className="text-muted-foreground">
                Все студенты которые учатся на платформе
              </p>
            </div>

            {/* Simple Students List */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка студентов...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map((student) => {
                  return (
                    <div
                      key={student.id}
                      className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{student.name}</h3>
                            {student.mbti && (
                              <span className="px-3 py-1 bg-primary/20 text-primary rounded-md text-sm font-semibold">
                                {student.mbti}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {student.email} • {student.grade}
                          </p>
                          {student.mbtiAnalysis && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-md">
                              <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                                <Brain className="w-3 h-3" />
                                AI Анализ личности:
                              </p>
                              <p className="text-sm text-muted-foreground">{student.mbtiAnalysis}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/mentor/student/${student.id}`)}
                          >
                            <Brain className="w-4 h-4 mr-2" />
                            Полный профиль
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => router.push(`/mentor/student/${student.id}`)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Написать
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {students.length === 0 && !loading && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Пока нет студентов</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
