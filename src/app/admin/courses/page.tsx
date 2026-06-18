"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { AdminNavbar } from "@/components/admin-navbar";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Clock,
  CheckCircle
} from "lucide-react";

// Import existing courses
import { getCourses, Course } from "@/lib/courses-enhanced";

export default function AdminCoursesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (user && user.role === "admin") {
      loadCourses();
    }
  }, [user]);

  const loadCourses = () => {
    const allCourses = getCourses();
    const customCourses = JSON.parse(localStorage.getItem("mentoria_custom_courses") || "[]");
    setCourses([...allCourses, ...customCourses]);
  };

  const deleteCourse = (courseId: number) => {
    if (!confirm("Точно удалить этот курс?")) return;

    // Remove from custom courses
    const customCourses = JSON.parse(localStorage.getItem("mentoria_custom_courses") || "[]");
    const updated = customCourses.filter((c: any) => c.id !== courseId);
    localStorage.setItem("mentoria_custom_courses", JSON.stringify(updated));

    // Reload courses
    loadCourses();
    if (selectedCourse?.id === courseId) {
      setSelectedCourse(null);
    }
  };

  const getEnrollmentCount = (courseId: number) => {
    if (typeof window === "undefined") return 0;
    const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
    let count = 0;
    Object.values(progress).forEach((userProgress: any) => {
      if (userProgress.enrolledCourses?.includes(courseId)) {
        count++;
      }
    });
    return count;
  };

  return (
    <RequireRole role="admin">
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">Управление курсами</h1>
                <p className="text-muted-foreground">
                  Добавляй, редактируй и управляй курсами на платформе
                </p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => router.push("/admin/courses/add")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить курс
              </Button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {courses.map((course) => {
                    const enrollmentCount = getEnrollmentCount(course.id);

                    return (
                      <div
                        key={course.id}
                        className={`bg-card border-2 rounded-lg overflow-hidden transition-all ${
                          selectedCourse?.id === course.id
                            ? "border-primary"
                            : "border-border/60 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex">
                          {/* Course Image */}
                          {course.image && (
                            <div className="w-48 flex-shrink-0">
                              <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Course Info */}
                          <div className="flex-1 p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="text-xl font-heading font-bold mb-2">{course.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {course.description}
                                </p>
                                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {enrollmentCount} студентов
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" />
                                    {course.lessons.length} уроков
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {course.duration}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedCourse(course)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Просмотр
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => router.push(`/courses/${course.id}`)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Редактировать
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Course Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedCourse ? (
                  <div className="bg-card border border-border/60 rounded-lg p-6 sticky top-4">
                    <h3 className="font-heading font-bold mb-4">Детали курса</h3>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Информация</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Название:</span>
                          <p className="font-semibold">{selectedCourse.title}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Преподаватель:</span>
                          <p>{selectedCourse.instructor}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Длительность:</span>
                          <p>{selectedCourse.duration}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Уровень:</span>
                          <p className="capitalize">{selectedCourse.level}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Студентов:</span>
                          <p>{getEnrollmentCount(selectedCourse.id)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2">Уроки ({selectedCourse.lessons.length})</h4>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {selectedCourse.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-muted rounded text-xs"
                          >
                            <div className="font-semibold mb-1">{lesson.title}</div>
                            <div className="text-muted-foreground">{lesson.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push(`/courses/${selectedCourse.id}`)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Редактировать курс
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full"
                        onClick={() => deleteCourse(selectedCourse.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Удалить курс
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-card border border-border/60 rounded-lg p-6">
                    <p className="text-sm text-muted-foreground text-center">
                      Выбери курс для просмотра деталей
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
