"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function AddOpportunityPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    format: "",
    location: "",
    deadline: "",
    cost: "",
    grades: [] as string[],
    fields: [] as string[],
    description: "",
    requirements: "",
    organizer: "",
    applicationLink: "",
  });

  const categories = ["Олимпиада", "Конкурс", "Стипендия", "Летняя программа", "Хакатон", "Конференция", "Исследовательская программа"];
  const formats = ["Онлайн", "Очная", "Гибрид"];
  const grades = ["8 класс", "9 класс", "10 класс", "11 класс", "Выпускники"];
  const fields = ["STEM", "Бизнес", "IT", "Программирование", "Социальное влияние", "Наука", "Математика", "Физика", "Финансы", "Предпринимательство"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here would be API call to save data
    alert("Возможность добавлена! (В реальной версии сохранится в базу данных)");
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
              Добавить новую возможность
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Название <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Например: Международная олимпиада по математике"
                />
              </div>

              {/* Category & Format */}
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
                    Формат <span className="text-destructive">*</span>
                  </label>
                  <select
                    required
                    value={formData.format}
                    onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Выберите формат</option>
                    {formats.map((format) => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location & Cost */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Локация <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Например: Онлайн или Алматы, Казахстан"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Стоимость <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Например: Бесплатно или Платно: $500"
                  />
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Дедлайн <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Grades */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Целевая аудитория (классы)
                </label>
                <div className="flex flex-wrap gap-2">
                  {grades.map((grade) => (
                    <label key={grade} className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg cursor-pointer hover:border-primary/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.grades.includes(grade)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, grades: [...formData.grades, grade] });
                          } else {
                            setFormData({ ...formData, grades: formData.grades.filter(g => g !== grade) });
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{grade}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Направления
                </label>
                <div className="flex flex-wrap gap-2">
                  {fields.map((field) => (
                    <label key={field} className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg cursor-pointer hover:border-primary/40 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.fields.includes(field)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, fields: [...formData.fields, field] });
                          } else {
                            setFormData({ ...formData, fields: formData.fields.filter(f => f !== field) });
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{field}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание <span className="text-destructive">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Краткое описание возможности..."
                />
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Требования
                </label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Требования к участникам (необязательно)..."
                />
              </div>

              {/* Organizer & Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Организатор <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Название организации"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ссылка на заявку
                  </label>
                  <input
                    type="url"
                    value={formData.applicationLink}
                    onChange={(e) => setFormData({ ...formData, applicationLink: e.target.value })}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4 pt-4">
                <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Сохранить возможность
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
