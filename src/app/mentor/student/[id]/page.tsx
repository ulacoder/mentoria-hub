"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { MentorNavbar } from "@/components/mentor-navbar";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Target,
  Lightbulb,
  Users,
  ArrowLeft,
  Award,
  TrendingUp,
  BookOpen
} from "lucide-react";

interface StudentDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function StudentDetailPage({ params }: StudentDetailPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const resolvedParams = use(params);
  const studentId = resolvedParams.id;

  const [student, setStudent] = useState<any>(null);
  const [mbtiAnalysis, setMbtiAnalysis] = useState<any>(null);

  useEffect(() => {
    if (user && user.role === "mentor") {
      loadStudent();
    }
  }, [user, studentId]);

  const loadStudent = () => {
    if (typeof window === "undefined") return;

    const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    const foundStudent = users.find((u: any) => u.userId === studentId);

    if (foundStudent) {
      setStudent(foundStudent);

      // Load MBTI analysis if exists
      if (foundStudent.mbti) {
        const analysisKey = `mbti_analysis_${foundStudent.userId}`;
        const savedAnalysis = localStorage.getItem(analysisKey);
        if (savedAnalysis) {
          try {
            setMbtiAnalysis(JSON.parse(savedAnalysis));
          } catch (e) {
            console.error("Failed to parse MBTI analysis:", e);
          }
        }
      }
    }
  };

  if (!student) {
    return (
      <RequireRole role="mentor">
        <div className="flex flex-col min-h-screen">
          <MentorNavbar />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Студент не найден</p>
          </div>
        </div>
      </RequireRole>
    );
  }

  return (
    <RequireRole role="mentor">
      <div className="flex flex-col min-h-screen">
        <MentorNavbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Button
              variant="ghost"
              onClick={() => router.push("/mentor")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к списку
            </Button>

            {/* Student Header */}
            <div className="bg-card border border-border/60 rounded-lg p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-heading font-bold mb-2">{student.name}</h1>
                  <p className="text-muted-foreground mb-4">
                    {student.grade} • {student.email}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {student.interests?.map((interest: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                {student.mbti && (
                  <div className="px-4 py-2 bg-primary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">MBTI тип</p>
                    <p className="text-2xl font-bold text-primary">{student.mbti}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-2xl font-bold">{student.coins || 0}</span>
                </div>
                <p className="text-sm text-muted-foreground">Коинов заработано</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span className="text-2xl font-bold">
                    {(() => {
                      const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
                      return progress[student.userId]?.enrolledCourses?.length || 0;
                    })()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Записан на курсов</p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-2xl font-bold">{student.rank || "-"}</span>
                </div>
                <p className="text-sm text-muted-foreground">Место в рейтинге</p>
              </div>
            </div>

            {/* MBTI Analysis */}
            {mbtiAnalysis ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/40 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Brain className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-heading font-bold mb-2">
                        Анализ личности от Navi
                      </h3>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{mbtiAnalysis.feedback}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border border-border/60 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-green-500" />
                      <h3 className="font-heading font-bold">Сильные стороны в обучении</h3>
                    </div>
                    <ul className="space-y-2">
                      {mbtiAnalysis.strengths?.map((strength: string, idx: number) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-card border border-border/60 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-orange-500" />
                      <h3 className="font-heading font-bold">Области для развития</h3>
                    </div>
                    <ul className="space-y-2">
                      {mbtiAnalysis.weaknesses?.map((weakness: string, idx: number) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-orange-500 flex-shrink-0">•</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-card border-2 border-primary/40 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-primary" />
                    <h3 className="font-heading font-bold">Как работать с этим студентом</h3>
                  </div>
                  <p className="text-sm leading-relaxed">{mbtiAnalysis.mentorGuidance}</p>
                </div>
              </div>
            ) : student.mbti ? (
              <div className="bg-card border border-border/60 rounded-lg p-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  Студент указал MBTI тип ({student.mbti}), но анализ еще не был сгенерирован
                </p>
              </div>
            ) : (
              <div className="bg-card border border-border/60 rounded-lg p-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">
                  Студент еще не заполнил MBTI профиль
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
