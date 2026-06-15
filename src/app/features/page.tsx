import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Target,
  Users,
  Zap,
  Award,
  Calendar,
  TrendingUp,
  Bell,
  Globe,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function FeaturesPage() {
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
              <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors">
                О нас
              </Link>
              <Link href="/features" className="text-sm font-medium text-primary">
                Функционал
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                О платформе
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/dashboard">
                <Button size="sm">Начать</Button>
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
              Функционал платформы
            </h1>
            <p className="text-muted-foreground">
              Всё что нужно для поиска возможностей и развития навыков
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Core Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-8">Основные функции</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-border/60 rounded-lg p-6">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Персонализированные рекомендации</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Во время регистрации укажи свой класс, интересы и цели. Платформа автоматически подберёт
                  возможности и курсы, которые подходят именно тебе. AI-алгоритм учитывает твой профиль и
                  предлагает релевантные стипендии, конкурсы и программы.
                </p>
              </div>

              <div className="border border-border/60 rounded-lg p-6">
                <Calendar className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Календарь дедлайнов</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Не пропускай важные даты. Сохраняй интересные возможности в избранное и отслеживай
                  приближающиеся дедлайны в личном календаре. Получай напоминания и планируй заявки заранее.
                </p>
              </div>

              <div className="border border-border/60 rounded-lg p-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Трекинг прогресса</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Следи за своим обучением: прогресс по курсам, завершённые уроки, выполненные задания.
                  Визуализация роста мотивирует продолжать учиться и достигать целей.
                </p>
              </div>

              <div className="border border-border/60 rounded-lg p-6">
                <Award className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Лидерборд и достижения</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Соревнуйся с другими учениками в лидерборде. Зарабатывай баллы за прохождение курсов,
                  выполнение заданий и активность на платформе. Получай значки за достижения.
                </p>
              </div>

              <div className="border border-border/60 rounded-lg p-6">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Система коинов</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Играй в мини-игры и зарабатывай коины. Обменивай их на премиум курсы, дополнительные
                  материалы и эксклюзивный контент. Gamification делает обучение увлекательным.
                </p>
              </div>

              <div className="border border-border/60 rounded-lg p-6">
                <Bell className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Умные уведомления</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Получай напоминания о дедлайнах, новых возможностях по твоим интересам и обновлениях
                  курсов. Настрой уведомления по email или Telegram.
                </p>
              </div>
            </div>
          </section>

          {/* Advanced Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-8">Дополнительные возможности</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <Globe className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold mb-2">Мультиязычность</h3>
                <p className="text-sm text-muted-foreground">
                  Интерфейс на русском, английском и казахском языках
                </p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold mb-2">Безопасность данных</h3>
                <p className="text-sm text-muted-foreground">
                  Твои данные защищены. Мы не передаём информацию третьим лицам
                </p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold mb-2">Админ-панель</h3>
                <p className="text-sm text-muted-foreground">
                  Администраторы могут легко добавлять новые курсы и возможности
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-heading font-bold mb-3">
                Попробуй все функции бесплатно
              </h2>
              <p className="text-muted-foreground mb-6">
                Создай аккаунт и начни пользоваться всеми возможностями платформы уже сегодня
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Начать бесплатно
                </Button>
              </Link>
            </div>
          </section>
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
