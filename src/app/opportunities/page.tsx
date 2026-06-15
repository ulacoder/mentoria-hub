"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { getAllOpportunities } from "@/lib/data";
import {
  saveOpportunity,
  unsaveOpportunity,
  isOpportunitySaved,
  getSavedOpportunities,
} from "@/lib/database";
import { getDeadlineColor, getDeadlineDays } from "@/lib/utils-colors";
import { ThemeToggle } from "@/components/theme-toggle";
import { StreakWidget } from "@/components/streak-widget";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/auth-context";

const categories = ["Все", "Олимпиада", "Конкурс", "Стипендия", "Летняя программа", "Хакатон", "Конференция", "Исследовательская программа"];
const fields = ["Все", "STEM", "Бизнес", "IT", "Программирование", "Социальное влияние", "Наука", "Математика", "Физика"];
const grades = ["Все", "8 класс", "9 класс", "10 класс", "11 класс", "Выпускники"];

export default function OpportunitiesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [selectedField, setSelectedField] = useState("Все");
  const [selectedGrade, setSelectedGrade] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [savedItems, setSavedItems] = useState<number[]>([]);

  const opportunities = getAllOpportunities();

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      setSavedItems(getSavedOpportunities(user.id));
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSave = (id: number) => {
    if (!user) return;

    if (savedItems.includes(id)) {
      unsaveOpportunity(user.id, id);
      setSavedItems(savedItems.filter(item => item !== id));
    } else {
      saveOpportunity(user.id, id);
      setSavedItems([...savedItems, id]);
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = selectedCategory === "Все" || opp.category === selectedCategory;
    const matchesField = selectedField === "Все" || opp.tags.includes(selectedField);
    const matchesGrade = selectedGrade === "Все" || opp.grade.includes(selectedGrade);
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
            <Logo />

            <div className="hidden md:flex items-center gap-6">
              <Link href="/opportunities" className="text-sm font-medium text-primary">
                Возможности
              </Link>
              <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Курсы
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Лидерборд
              </Link>
              <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors">
                О нас
              </Link>
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
                Функционал
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                О платформе
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <StreakWidget />
              <ThemeToggle />
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Dashboard
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
            {filteredOpportunities.map((opp) => {
              const daysLeft = Math.ceil((new Date(opp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const isSaved = savedItems.includes(opp.id);

              return (
                <div
                  key={opp.id}
                  className="bg-card border-2 border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all group hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md border border-primary/30">
                      {opp.category}
                    </span>
                    <button
                      onClick={() => handleSave(opp.id)}
                      className={`transition-colors ${
                        isSaved ? "text-accent" : "text-muted-foreground hover:text-accent"
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
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
                      <span className="text-muted-foreground">
                        {new Date(opp.deadline).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    {daysLeft > 0 && (
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getDeadlineColor(opp.deadline)}`}>
                        <Clock className="w-3 h-3" />
                        Осталось {daysLeft} {daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дня' : 'дней'}
                      </div>
                    )}
                    <div className="text-sm font-medium text-foreground">
                      {opp.cost}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {opp.grade.slice(0, 2).map((grade, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted text-xs rounded border border-border">
                        {grade}
                      </span>
                    ))}
                  </div>

                  <Link href={`/opportunities/${opp.id}`}>
                    <Button size="sm" variant="outline" className="w-full border-primary/30 hover:bg-primary/10">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              );
            })}
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
