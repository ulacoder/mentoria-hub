"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  BookOpen,
  Trophy,
  LogOut,
  Plus,
  Trash2,
  Edit,
  X,
} from "lucide-react";

type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  price: number;
};

type Opportunity = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  type: string;
  link: string;
};

export default function AdminPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"courses" | "opportunities">("courses");

  // Courses state
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    instructor: "",
    price: 0,
  });

  // Opportunities state
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [showOppForm, setShowOppForm] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [oppForm, setOppForm] = useState({
    title: "",
    description: "",
    deadline: "",
    type: "",
    link: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
    loadData();
  }, [user, router]);

  const loadData = async () => {
    try {
      const [coursesRes, oppsRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/opportunities"),
      ]);

      const coursesData = await coursesRes.json();
      const oppsData = await oppsRes.json();

      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setOpportunities(Array.isArray(oppsData) ? oppsData : []);
    } catch (error) {
      console.error("Failed to load data:", error);
      setCourses([]);
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  // Course handlers
  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await fetch("/api/courses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCourse.id, ...courseForm }),
        });
      } else {
        await fetch("/api/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseForm),
        });
      }
      resetCourseForm();
      loadData();
    } catch (error) {
      console.error("Failed to save course:", error);
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Удалить курс?")) return;
    try {
      await fetch(`/api/courses?id=${id}`, { method: "DELETE" });
      loadData();
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const editCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      duration: course.duration,
      instructor: course.instructor,
      price: course.price,
    });
    setShowCourseForm(true);
  };

  const resetCourseForm = () => {
    setShowCourseForm(false);
    setEditingCourse(null);
    setCourseForm({
      title: "",
      description: "",
      category: "",
      level: "",
      duration: "",
      instructor: "",
      price: 0,
    });
  };

  // Opportunity handlers
  const handleOppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingOpp) {
        await fetch("/api/opportunities", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingOpp.id, ...oppForm }),
        });
      } else {
        await fetch("/api/opportunities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(oppForm),
        });
      }
      resetOppForm();
      loadData();
    } catch (error) {
      console.error("Failed to save opportunity:", error);
    }
  };

  const deleteOpp = async (id: string) => {
    if (!confirm("Удалить возможность?")) return;
    try {
      await fetch(`/api/opportunities?id=${id}`, { method: "DELETE" });
      loadData();
    } catch (error) {
      console.error("Failed to delete opportunity:", error);
    }
  };

  const editOpp = (opp: Opportunity) => {
    setEditingOpp(opp);
    setOppForm({
      title: opp.title,
      description: opp.description,
      deadline: opp.deadline,
      type: opp.type,
      link: opp.link,
    });
    setShowOppForm(true);
  };

  const resetOppForm = () => {
    setShowOppForm(false);
    setEditingOpp(null);
    setOppForm({
      title: "",
      description: "",
      deadline: "",
      type: "",
      link: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-red-500">ADMIN PANEL</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-3xl font-bold">{courses.length}</p>
                <p className="text-sm text-muted-foreground">Курсов</p>
              </div>
            </div>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-3xl font-bold">{opportunities.length}</p>
                <p className="text-sm text-muted-foreground">Возможностей</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "courses"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Курсы
          </button>
          <button
            onClick={() => setActiveTab("opportunities")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "opportunities"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Возможности
          </button>
        </div>

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Управление курсами</h2>
              <Button
                onClick={() => setShowCourseForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Добавить курс
              </Button>
            </div>

            {showCourseForm && (
              <div className="bg-card border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingCourse ? "Редактировать курс" : "Новый курс"}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={resetCourseForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <form onSubmit={handleCourseSubmit} className="space-y-4">
                  <Input
                    placeholder="Название курса"
                    value={courseForm.title}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, title: e.target.value })
                    }
                    required
                  />
                  <Textarea
                    placeholder="Описание"
                    value={courseForm.description}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, description: e.target.value })
                    }
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Категория"
                      value={courseForm.category}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, category: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Уровень"
                      value={courseForm.level}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, level: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Длительность"
                      value={courseForm.duration}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, duration: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Инструктор"
                      value={courseForm.instructor}
                      onChange={(e) =>
                        setCourseForm({ ...courseForm, instructor: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Цена"
                    value={courseForm.price}
                    onChange={(e) =>
                      setCourseForm({ ...courseForm, price: Number(e.target.value) })
                    }
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingCourse ? "Сохранить" : "Создать"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetCourseForm}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid gap-4">
              {courses.length === 0 ? (
                <div className="bg-card border rounded-lg p-12 text-center">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-muted-foreground">Курсов пока нет</p>
                </div>
              ) : (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="px-2 py-1 bg-blue-500/10 text-blue-500 rounded">
                            {course.category}
                          </span>
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded">
                            {course.level}
                          </span>
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded">
                            {course.duration}
                          </span>
                          <span className="px-2 py-1 bg-orange-500/10 text-orange-500 rounded">
                            {course.instructor}
                          </span>
                          <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded">
                            {course.price} ₸
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editCourse(course)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCourse(course.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Управление возможностями</h2>
              <Button
                onClick={() => setShowOppForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Добавить возможность
              </Button>
            </div>

            {showOppForm && (
              <div className="bg-card border rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingOpp ? "Редактировать возможность" : "Новая возможность"}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={resetOppForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <form onSubmit={handleOppSubmit} className="space-y-4">
                  <Input
                    placeholder="Название"
                    value={oppForm.title}
                    onChange={(e) =>
                      setOppForm({ ...oppForm, title: e.target.value })
                    }
                    required
                  />
                  <Textarea
                    placeholder="Описание"
                    value={oppForm.description}
                    onChange={(e) =>
                      setOppForm({ ...oppForm, description: e.target.value })
                    }
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Дедлайн (например: 31 декабря)"
                      value={oppForm.deadline}
                      onChange={(e) =>
                        setOppForm({ ...oppForm, deadline: e.target.value })
                      }
                      required
                    />
                    <Input
                      placeholder="Тип (например: Стипендия, Конкурс)"
                      value={oppForm.type}
                      onChange={(e) =>
                        setOppForm({ ...oppForm, type: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Input
                    placeholder="Ссылка"
                    value={oppForm.link}
                    onChange={(e) =>
                      setOppForm({ ...oppForm, link: e.target.value })
                    }
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingOpp ? "Сохранить" : "Создать"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetOppForm}
                    >
                      Отмена
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid gap-4">
              {opportunities.length === 0 ? (
                <div className="bg-card border rounded-lg p-12 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-muted-foreground">Возможностей пока нет</p>
                </div>
              ) : (
                opportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{opp.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {opp.description}
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs mb-2">
                          <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded">
                            {opp.type}
                          </span>
                          <span className="px-2 py-1 bg-red-500/10 text-red-500 rounded">
                            Дедлайн: {opp.deadline}
                          </span>
                        </div>
                        {opp.link && (
                          <a
                            href={opp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            {opp.link}
                          </a>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => editOpp(opp)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteOpp(opp.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
