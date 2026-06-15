"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft, Plus, X } from "lucide-react";

export default function AddCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    level: "",
    duration: "",
    description: "",
    instructor: "",
    lessons: [] as { title: string; description: string }[],
  });

  const categories = ["Математика", "Английский язык", "Программирование", "Физика", "Биология", "Экономика", "Информатика", "Подготовка к тестам", "Карьера"];
  const levels = ["Начальный", "Средний", "Продвинутый"];

  const addLesson = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, { title: "", description: "" }],
    });
  };

  const removeLesson = (index: number) => {
    setFormData({
      ...formData,
      lessons: formData.lessons.filter((_, i) => i !== index),
    });
  };

  const updateLesson = (index: number, field: "title" | "description", value: string) => {
    const newLessons = [...formData.lessons];
    newLessons[index][field] = value;
    setFormData({ ...formData, lessons: newLessons });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Course submitted:", formData);
    alert("Курс добавлен! (В реальной версии сохранится в базу данных)");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-heading font-bold">Mentoria Hub</span>
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded">Admin</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1 bg-muted/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к панели
            </Button>
          </Link>

          <div className="bg-card border border-border/60 rounded-lg p-8">
            <h1 className="text-2xl font-heading font-bold mb-6">
              Добавить новый курс
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Название курса <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Например: Основы программирования на Python"
                />
              </div>

              {/* Category & Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Категория <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Уровень сложности <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Выберите уровень</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration & Instructor */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Длительность <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Например: 8 недель"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Преподаватель <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Имя преподавателя"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание курса <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Что изучат студенты в этом курсе..."
                />
              </div>

              {/* Lessons */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium">
                    Уроки
                  </label>
                  <Button type="button" variant="outline" size="sm" onClick={addLesson}>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить урок
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.lessons.length === 0 ? (
                    <div className="text-center py-8 bg-muted/30 border border-border/40 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        Пока нет уроков. Нажмите "Добавить урок" чтобы создать первый.
                      </p>
                    </div>
                  ) : (
                    formData.lessons.map((lesson, index) => (
                      <div key={index} className="bg-muted/30 border border-border/40 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            Урок {index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeLesson(index)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLesson(index, "title", e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                            placeholder="Название урока"
                          />
                          <textarea
                            rows={2}
                            value={lesson.description}
                            onChange={(e) => updateLesson(index, "description", e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                            placeholder="Краткое описание урока"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-4">
                <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Сохранить курс
                </Button>
                <Link href="/admin">
                  <Button type="button" variant="outline" size="lg">
                    Отмена
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
