import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Target,
  Users,
  Globe,
  Lightbulb,
  Heart,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AboutPage() {
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
              <Link href="/features" className="text-sm font-medium hover:text-primary transition-colors">
                Функционал
              </Link>
              <Link href="/about" className="text-sm font-medium text-primary">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                О Mentoria Hub
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Цифровая платформа для поиска образовательных возможностей и асинхронного обучения.
                Помогаем ученикам 8-11 классов развиваться и достигать академических целей.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Problem Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">Проблема которую мы решаем</h2>
            <div className="bg-card border border-border/60 rounded-lg p-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Сегодня информация о стипендиях, конкурсах, олимпиадах, летних школах и исследовательских
                программах разбросана по разным сайтам, каналам и чатам. Ученикам сложно понять, какие
                возможности подходят их возрасту, интересам и уровню подготовки.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Не каждый ученик может посещать живые занятия из-за школы, экзаменов, разницы в часовых
                поясах или доступа к интернету.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Mentoria Hub</strong> объединяет всё в одном месте:
                каталог возможностей с фильтрами и персонализированные асинхронные курсы.
              </p>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-border/60 rounded-lg p-8">
                <Target className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Наша миссия</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Сделать образовательные возможности доступными для каждого ученика, независимо от
                  локации и расписания. Помочь учиться в своём темпе и достигать амбициозных целей.
                </p>
              </div>

              <div className="border border-border/60 rounded-lg p-8">
                <Lightbulb className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-semibold mb-3">Наше видение</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Стать главной образовательной платформой для учеников СНГ, где каждый может найти
                  возможность для роста и получить качественное образование онлайн.
                </p>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">Наши ценности</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold mb-2">Доступность</h3>
                <p className="text-sm text-muted-foreground">
                  Образование должно быть доступно каждому, независимо от локации и финансов
                </p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <Globe className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold mb-2">Масштабируемость</h3>
                <p className="text-sm text-muted-foreground">
                  Платформа должна расти вместе с учениками и их потребностями
                </p>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold mb-2">Персонализация</h3>
                <p className="text-sm text-muted-foreground">
                  Каждый ученик уникален. Рекомендации адаптируются под интересы и цели
                </p>
              </div>
            </div>
          </section>

          {/* About Mentoria */}
          <section className="mb-16">
            <h2 className="text-2xl font-heading font-bold mb-6">О Mentoria Organization</h2>
            <div className="bg-card border border-border/60 rounded-lg p-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mentoria — международная образовательная организация, которая помогает ученикам развиваться
                через наставничество, онлайн-уроки и доступ к ценным возможностям.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Сегодня большая часть деятельности проходит через Telegram и живые занятия. По мере роста
                организации мы поняли необходимость масштабируемой цифровой системы.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Mentoria Hub</strong> — это следующий шаг в развитии
                организации, который позволит поддерживать больше учеников без зависимости от ручных
                обновлений в Telegram.
              </p>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Возможностей</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Курсов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">2000+</div>
                <div className="text-sm text-muted-foreground">Учеников</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Стран</div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-heading font-bold mb-3">
                Присоединяйся к Mentoria Hub
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Начни искать возможности и учиться уже сегодня. Это бесплатно и займёт меньше минуты.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  Создать аккаунт
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
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
                <li><Link href="/opportunities" className="hover:text-foreground transition-colors">Возможности</Link></li>
                <li><Link href="/courses" className="hover:text-foreground transition-colors">Курсы</Link></li>
                <li><Link href="/features" className="hover:text-foreground transition-colors">Функционал</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: info@mentoriahub.kz</li>
                <li>Telegram: @mentoria_hub</li>
                <li>Алматы, Казахстан</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Mentoria Hub. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
