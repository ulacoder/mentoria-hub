"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const faqData = [
  {
    category: "Общие вопросы",
    questions: [
      {
        q: "Что такое Mentoria Hub?",
        a: "Mentoria Hub — образовательная платформа для учеников 8-11 классов. Мы помогаем находить стипендии, конкурсы, олимпиады, летние программы и предлагаем асинхронные курсы для подготовки."
      },
      {
        q: "Для кого эта платформа?",
        a: "Платформа создана для школьников 8-11 классов из Казахстана и других стран, которые хотят развиваться, участвовать в конкурсах и готовиться к поступлению в топ-вузы."
      },
      {
        q: "Платформа бесплатная?",
        a: "Да, регистрация и большинство функций платформы абсолютно бесплатны. Некоторые премиум-курсы можно купить за коины, которые зарабатываются на платформе."
      }
    ]
  },
  {
    category: "Возможности",
    questions: [
      {
        q: "Какие возможности я могу найти?",
        a: "На платформе доступны: международные олимпиады, бизнес-конкурсы, хакатоны, летние школы и программы, стипендии, гранты на обучение и исследовательские проекты."
      },
      {
        q: "Как подобрать возможности под себя?",
        a: "Платформа автоматически рекомендует возможности на основе твоих интересов, навыков и целей, которые ты указываешь в профиле. Также можно использовать фильтры по дедлайнам, категориям и локации."
      },
      {
        q: "Как сохранить понравившуюся возможность?",
        a: "Нажми на кнопку 'Сохранить' на странице возможности. Все сохраненные возможности отображаются в твоем личном дашборде."
      }
    ]
  },
  {
    category: "Курсы",
    questions: [
      {
        q: "Что такое асинхронные курсы?",
        a: "Это курсы, которые можно проходить в любое удобное время без привязки к расписанию. Ты сам выбираешь темп обучения и можешь возвращаться к материалам когда угодно."
      },
      {
        q: "Какие курсы доступны?",
        a: "Математика, физика, программирование, английский язык, подготовка к SAT/IELTS, олимпиадные предметы и soft skills для участия в конкурсах."
      },
      {
        q: "Как получить сертификат?",
        a: "После завершения курса и прохождения финального теста ты автоматически получишь сертификат, который можно скачать из профиля."
      }
    ]
  },
  {
    category: "Коины и геймификация",
    questions: [
      {
        q: "Что такое коины?",
        a: "Коины — внутренняя валюта платформы. Их можно зарабатывать за активность: завершение курсов, участие в челленджах, достижения и ежедневный вход."
      },
      {
        q: "Где потратить коины?",
        a: "В магазине можно купить: мерч Mentoria Hub, прокачки профиля (badges, темы), платные премиум-курсы и дополнительные функции платформы."
      },
      {
        q: "Как заработать больше коинов?",
        a: "Проходи курсы, участвуй в конкурсах, поддерживай streak (заходи каждый день), выполняй челленджи и достигай новых уровней в лидерборде."
      }
    ]
  },
  {
    category: "AI-ментор Navi",
    questions: [
      {
        q: "Кто такой Navi?",
        a: "Navi — твой персональный AI-ассистент на платформе. Он помогает ориентироваться, отвечает на вопросы, подсказывает возможности и курсы, которые могут тебя заинтересовать."
      },
      {
        q: "Как использовать Navi?",
        a: "Просто кликни на иконку Navi в правом нижнем углу экрана и задай любой вопрос — он всегда готов помочь!"
      }
    ]
  },
  {
    category: "Техническая поддержка",
    questions: [
      {
        q: "Забыл пароль, что делать?",
        a: "На странице входа нажми 'Забыли пароль?', введи свой email — мы отправим ссылку для восстановления."
      },
      {
        q: "Не приходит письмо с подтверждением",
        a: "Проверь папку 'Спам'. Если письма нет, свяжись с поддержкой через форму на странице 'О нас' или напиши на support@mentoriahub.kz."
      },
      {
        q: "Как связаться с поддержкой?",
        a: "Напиши нам на support@mentoriahub.kz или используй форму обратной связи на странице 'О нас'. Мы отвечаем в течение 24 часов."
      }
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleQuestion = (categoryIdx: number, questionIdx: number) => {
    const key = `${categoryIdx}-${questionIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

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
              <Link href="/faq" className="text-sm font-medium text-primary">
                FAQ
              </Link>
              <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors">
                О нас
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 border-b border-border/40 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Часто задаваемые вопросы
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Ответы на популярные вопросы о платформе, курсах и возможностях
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              По вашему запросу ничего не найдено. Попробуйте другие ключевые слова.
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFAQ.map((category, catIdx) => (
                <div key={catIdx}>
                  <h2 className="text-2xl font-heading font-bold mb-4 text-primary">
                    {category.category}
                  </h2>
                  <div className="space-y-3">
                    {category.questions.map((item, qIdx) => {
                      const key = `${catIdx}-${qIdx}`;
                      const isOpen = openIndex === key;

                      return (
                        <div
                          key={qIdx}
                          className="bg-card border border-border/60 rounded-lg overflow-hidden hover:border-primary/40 transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(catIdx, qIdx)}
                            className="w-full flex items-center justify-between p-4 text-left"
                          >
                            <span className="font-semibold pr-4">{item.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/20 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold mb-3">
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="text-muted-foreground mb-6">
            Свяжись с нами — мы всегда рады помочь!
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/about-us">
              <Button size="lg" variant="outline">
                Контакты
              </Button>
            </Link>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Написать в поддержку
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Mentoria Hub. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
