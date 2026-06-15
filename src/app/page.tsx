import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Trophy,
  BookOpen,
  Target,
  Users,
  Calendar,
  Award,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">Mentoria Hub</span>
            </div>

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
              <ThemeToggle />
              <Link href="/dashboard">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Начать
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 mb-6">
              <span className="text-sm font-medium text-primary">Образовательная платформа</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
              Находи возможности<br />
              и развивайся в своём темпе
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Единая платформа для поиска стипендий, конкурсов, олимпиад и летних программ.
              Проходи курсы онлайн когда удобно — без привязки к расписанию.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/opportunities">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Найти возможности
                </Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline">
                  Посмотреть курсы
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-border/40">
              <div>
                <div className="text-2xl font-heading font-semibold">500+</div>
                <div className="text-sm text-muted-foreground">Возможностей</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-semibold">50+</div>
                <div className="text-sm text-muted-foreground">Курсов</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-semibold">2000+</div>
                <div className="text-sm text-muted-foreground">Учеников</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold mb-3">
              Что есть на платформе
            </h2>
            <p className="text-muted-foreground">
              Возможности и курсы в одном месте
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Trophy className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Конкурсы и олимпиады</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Бизнес-конкурсы, научные олимпиады, хакатоны и международные соревнования
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Стипендии и гранты</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Стипендии, гранты на обучение и финансирование проектов
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Летние программы</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Международные летние школы, лагеря и исследовательские программы
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Асинхронные курсы</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Математика, английский, SAT/IELTS, программирование — учись в своём темпе
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Персональные рекомендации</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Платформа подбирает возможности под твои интересы и цели
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">Трекинг прогресса</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Следи за дедлайнами, сохраняй возможности и отслеживай прогресс по курсам
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              Начни искать возможности сегодня
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Регистрация займёт меньше минуты. Получи доступ ко всем возможностям и курсам.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Создать аккаунт бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-heading font-bold">Mentoria Hub</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm">
                Платформа для поиска образовательных возможностей и асинхронного обучения для учеников 8-11 классов.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Платформа</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Возможности</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Курсы</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Лидерборд</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">О нас</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">О Mentoria</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Контакты</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Поддержка</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Mentoria Hub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
