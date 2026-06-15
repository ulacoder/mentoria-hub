"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Search,
  Filter,
  MapPin,
  Clock,
  Bookmark,
  ExternalLink,
} from "lucide-react";

// Mock data для возможностей
const opportunities = [
  {
    id: 1,
    title: "Международная олимпиада по математике IMO",
    category: "Олимпиада",
    format: "Онлайн",
    location: "Международная",
    deadline: "2026-08-15",
    cost: "Бесплатно",
    grades: ["10 класс", "11 класс"],
    fields: ["STEM", "Математика"],
    description: "Престижная математическая олимпиада для старшеклассников со всего мира.",
    organizer: "International Mathematical Olympiad",
  },
  {
    id: 2,
    title: "Летняя школа MIT по программированию",
    category: "Летняя программа",
    format: "Очная",
    location: "США, Бостон",
    deadline: "2026-07-01",
    cost: "Платно: $5000",
    grades: ["9 класс", "10 класс", "11 класс"],
    fields: ["STEM", "Программирование", "IT"],
    description: "Интенсивная двухнедельная программа по CS и AI в MIT.",
    organizer: "Massachusetts Institute of Technology",
  },
  {
    id: 3,
    title: "Стипендия Болашак для обучения за рубежом",
    category: "Стипендия",
    format: "Онлайн подача",
    location: "Казахстан",
    deadline: "2026-09-30",
    cost: "Бесплатно",
    grades: ["11 класс", "Выпускники"],
    fields: ["Все направления"],
    description: "Государственная стипендия для обучения в лучших университетах мира.",
    organizer: "Центр международных программ",
  },
  {
    id: 4,
    title: "Global Startup Competition",
    category: "Конкурс",
    format: "Гибрид",
    location: "Онлайн + Финал в Алматы",
    deadline: "2026-07-20",
    cost: "Бесплатно",
    grades: ["9 класс", "10 класс", "11 класс"],
    fields: ["Бизнес", "Предпринимательство"],
    description: "Питч стартап-идеи перед инвесторами. Призовой фонд $10,000.",
    organizer: "Kazakhstan Startup Foundation",
  },
  {
    id: 5,
    title: "Научно-исследовательская программа в МФТИ",
    category: "Исследовательская программа",
    format: "Очная",
    location: "Россия, Москва",
    deadline: "2026-08-10",
    cost: "Бесплатно",
    grades: ["10 класс", "11 класс"],
    fields: ["STEM", "Физика", "Наука"],
    description: "Месячная программа работы в лабораториях МФТИ под руководством учёных.",
    organizer: "МФТИ",
  },
  {
    id: 6,
    title: "Хакатон AI for Good",
    category: "Хакатон",
    format: "Онлайн",
    location: "Международная",
    deadline: "2026-06-30",
    cost: "Бесплатно",
    grades: ["9 класс", "10 класс", "11 класс"],
    fields: ["IT", "Программирование", "Социальное влияние"],
    description: "48-часовой хакатон по созданию AI-решений для социальных проблем.",
    organizer: "Tech For Good Foundation",
  },
  {
    id: 7,
    title: "Стипендия на курс SAT Prep",
    category: "Стипендия",
    format: "Онлайн",
    location: "Онлайн",
    deadline: "2026-07-15",
    cost: "Бесплатно",
    grades: ["10 класс", "11 класс"],
    fields: ["Подготовка к тестам"],
    description: "Полная стипендия на 3-месячный курс подготовки к SAT.",
    organizer: "Mentoria Education",
  },
  {
    id: 8,
    title: "Международная конференция Model UN",
    category: "Конференция",
    format: "Очная",
    location: "Нур-Султан",
    deadline: "2026-08-01",
    cost: "Платно: 15,000₸",
    grades: ["9 класс", "10 класс", "11 класс"],
    fields: ["Социальное влияние", "Политика"],
    description: "Трёхдневная модель ООН с участием школьников из 15 стран.",
    organizer: "Kazakhstan Model UN Society",
  },
];

const categories = ["Все", "Олимпиада", "Конкурс", "Стипендия", "Летняя программа", "Хакатон", "Конференция"];
const fields = ["Все", "STEM", "Бизнес", "IT", "Программирование", "Социальное влияние", "Наука"];
const grades = ["Все", "9 класс", "10 класс", "11 класс"];

export default function OpportunitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedField, setSelectedField] = useState("Все");
  const [selectedGrade, setSelectedGrade] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = selectedCategory === "Все" || opp.category === selectedCategory;
    const matchesField = selectedField === "Все" || opp.fields.includes(selectedField);
    const matchesGrade = selectedGrade === "Все" || opp.grades.includes(selectedGrade);
    const matchesSearch = searchQuery === "" ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesField && matchesGrade && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">Mentoria Hub</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/opportunities" className="text-sm font-medium text-primary">
                Возможности
              </Link>
              <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Курсы
              </Link>
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
                Функционал
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                О платформе
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Вход
              </Button>
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Регистрация
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="flex-1">
        {/* Hero */}
        <div className="border-b border-border/40 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Каталог возможностей
            </h1>
            <p className="text-muted-foreground">
              Находи стипендии, конкурсы, олимпиады и программы для своего развития
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск возможностей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Фильтры
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="bg-muted/20 border border-border/40 rounded-lg p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Категория</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedCategory === cat
                            ? "bg-primary text-white"
                            : "bg-background border border-border hover:border-primary/40"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Направление</h3>
                  <div className="flex flex-wrap gap-2">
                    {fields.map((field) => (
                      <button
                        key={field}
                        onClick={() => setSelectedField(field)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedField === field
                            ? "bg-primary text-white"
                            : "bg-background border border-border hover:border-primary/40"
                        }`}
                      >
                        {field}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Класс</h3>
                  <div className="flex flex-wrap gap-2">
                    {grades.map((grade) => (
                      <button
                        key={grade}
                        onClick={() => setSelectedGrade(grade)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          selectedGrade === grade
                            ? "bg-primary text-white"
                            : "bg-background border border-border hover:border-primary/40"
                        }`}
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              Найдено возможностей: <span className="font-semibold text-foreground">{filteredOpportunities.length}</span>
            </p>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                    {opp.category}
                  </span>
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {opp.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {opp.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Дедлайн: {new Date(opp.deadline).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {opp.cost}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {opp.grades.slice(0, 2).map((grade, idx) => (
                    <span key={idx} className="px-2 py-1 bg-muted text-xs rounded">
                      {grade}
                    </span>
                  ))}
                  {opp.fields.slice(0, 2).map((field, idx) => (
                    <span key={idx} className="px-2 py-1 bg-muted text-xs rounded">
                      {field}
                    </span>
                  ))}
                </div>

                <Link href={`/opportunities/${opp.id}`}>
                  <Button variant="outline" size="sm" className="w-full group-hover:border-primary/60">
                    Подробнее
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Mentoria Hub. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
