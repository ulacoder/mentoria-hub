"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageCircle,
  Brain
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
        <Navbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Ученики</h1>
              <p className="text-muted-foreground">
                Все студенты которые учатся на платформе
              </p>
            </div>

            {/* Simple Students List */}
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
                        <p className="text-sm text-muted-foreground">
                          {student.email} • {student.grade}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/profile/mbti`)}
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Личность
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => router.push(`/messages`)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Написать
                        </Button>
                      </div>
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
        </div>
      </div>
    </RequireRole>
  );
}
