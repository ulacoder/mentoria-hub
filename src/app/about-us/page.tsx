"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, Quote, TrendingUp, Users } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { StreakWidget } from "@/components/streak-widget";

const successStories = [
  {
    name: "Таир Жанибеков",
    achievement: "Поступил в Harvard University",
    story: "Благодаря Mentoria Hub нашел 5 летних программ и выиграл международную олимпиаду по математике. Все это помогло мне поступить в Harvard на полную стипендию!",
    image: "👨‍🎓",
    tags: ["Harvard", "IMO Gold", "Стипендия"],
    year: "2025"
  },
  {
    name: "Улагат Нурсултан",
    achievement: "1 место на международной олимпиаде",
    story: "Занял первое место на Международной олимпиаде по математике и информатике. Курсы Mentoria помогли мне систематизировать знания и подготовиться на высшем уровне.",
    image: "🏆",
    tags: ["IMO", "IOI", "Золотая медаль"],
    year: "2025"
  },
  {
    name: "Айгерим Касымова",
    achievement: "Победитель Google Science Fair",
    story: "Нашла свой исследовательский проект через возможности на платформе. Выиграла Google Science Fair и получила приглашения от MIT и Stanford!",
    image: "👩‍🔬",
    tags: ["Google Science Fair", "MIT", "Stanford"],
    year: "2024"
  },
  {
    name: "Ернар Абдиров",
    achievement: "Основатель стартапа с инвестициями",
    story: "Участвовал в хакатонах, которые нашел на Mentoria Hub. Основал EdTech стартап и привлек $500k seed инвестиций от казахстанских фондов.",
    image: "💡",
    tags: ["Startup", "Seed $500k", "EdTech"],
    year: "2025"
  },
  {
    name: "Дана Смагулова",
    achievement: "Стипендия Болашак",
    story: "С помощью курсов SAT и английского от Mentoria набрала 1520 на SAT и получила стипендию Болашак для обучения в University of Cambridge.",
    image: "📚",
    tags: ["Болашак", "Cambridge", "SAT 1520"],
    year: "2024"
  },
  {
    name: "Асель Нурбекова",
    achievement: "Серебряный призер IPhO",
    story: "Прошла курс физики для олимпиад и завоевала серебряную медаль на Международной физической олимпиаде. Сейчас учусь в MIT на полной стипендии.",
    image: "⚡",
    tags: ["IPhO Silver", "MIT", "Физика"],
    year: "2025"
  }
];

const testimonials = [
  {
    name: "Марат Султанов",
    role: "11 класс, НИШ Астана",
    text: "Mentoria Hub — это не просто платформа, это мой личный навигатор в мире возможностей. Нашел 10+ конкурсов и стипендий за месяц!",
    rating: 5
  },
  {
    name: "Алина Ибраева",
    role: "10 класс, Гимназия №1",
    text: "Курсы структурированные и понятные. За 2 месяца подготовилась к SAT и набрала 1480 баллов. Рекомендую всем!",
    rating: 5
  },
  {
    name: "Бекзат Қуатов",
    role: "9 класс, КТЛ",
    text: "Раньше не знал, куда двигаться. Mentoria показала все возможности и помогла составить план развития на 3 года вперед.",
    rating: 5
  },
  {
    name: "Самат Касымов",
    role: "11 класс, BIL",
    text: "Лучшая платформа для казахстанских школьников! Все возможности в одном месте, плюс качественные курсы. Реально работает.",
    rating: 5
  }
];

const stats = [
  { icon: Users, value: "2,000+", label: "Активных учеников" },
  { icon: Award, value: "500+", label: "Поступлений в топ-вузы" },
  { icon: TrendingUp, value: "95%", label: "Достигли своих целей" },
  { icon: GraduationCap, value: "1,200+", label: "Завершенных курсов" }
];

export default function AboutUsPage() {
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

            <div className="hidden md:flex items-center gap-6">
              <Link href="/opportunities" className="text-sm font-medium hover:text-primary transition-colors">
                Возможности
              </Link>
              <Link href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
                Курсы
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Лидерборд
              </Link>
              <Link href="/about-us" className="text-sm font-medium text-primary">
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
                <Button size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="border-b border-border/40 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Успехи наших учеников
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Истории студентов, которые достигли невероятных результатов благодаря возможностям и курсам Mentoria Hub
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-heading font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-3">Истории успеха</h2>
          <p className="text-muted-foreground">Реальные достижения реальных учеников</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {successStories.map((story, idx) => (
            <div
              key={idx}
              className="bg-card border-2 border-primary/20 rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="text-5xl mb-4">{story.image}</div>
              <h3 className="font-heading font-bold text-lg mb-1">{story.name}</h3>
              <p className="text-sm text-primary font-semibold mb-3">{story.achievement}</p>
              <p className="text-sm text-muted-foreground mb-4">{story.story}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {story.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded border border-accent/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">{story.year}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-muted/20 border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-3">Отзывы учеников</h2>
            <p className="text-muted-foreground">Что говорят о нас студенты</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card border-2 border-accent/20 rounded-lg p-6 hover:border-accent/50 transition-all"
              >
                <Quote className="w-8 h-8 text-primary mb-3" />
                <p className="text-muted-foreground mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-primary">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-lg p-12">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Стань следующей историей успеха!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Присоединяйся к Mentoria Hub и начни свой путь к достижениям уже сегодня
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/opportunities">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Найти возможности
              </Button>
            </Link>
            <Link href="/courses">
              <Button size="lg" variant="outline" className="border-accent/30 hover:bg-accent/10">
                Начать обучение
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Mentoria Hub. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
