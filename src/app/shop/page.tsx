"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Zap,
  Crown,
  Palette,
  BookOpen,
  Gift,
  Award,
  Sparkles,
  Check
} from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: "merch" | "profile" | "courses" | "extras";
  icon: any;
  image?: string;
}

const shopItems: ShopItem[] = [
  // Merch
  {
    id: 1,
    name: "Mentoria Hub Футболка",
    description: "Фирменная футболка с логотипом платформы. Размеры S-XXL.",
    price: 5000,
    category: "merch",
    icon: Gift,
  },
  {
    id: 2,
    name: "Mentoria Hub Худи",
    description: "Стильное худи с вышивкой. Комфорт и качество.",
    price: 8000,
    category: "merch",
    icon: Gift,
  },
  {
    id: 3,
    name: "Стикерпак Mentoria",
    description: "Набор из 20 стикеров для ноутбука.",
    price: 1500,
    category: "merch",
    icon: Gift,
  },

  // Profile upgrades
  {
    id: 4,
    name: "Значок 'Легенда'",
    description: "Эксклюзивный значок на профиль. Выделись среди других!",
    price: 2000,
    category: "profile",
    icon: Crown,
  },
  {
    id: 5,
    name: "Значок 'Чемпион'",
    description: "Золотой значок для победителей.",
    price: 3000,
    category: "profile",
    icon: Award,
  },
  {
    id: 6,
    name: "Тема профиля 'Неон'",
    description: "Яркая неоновая тема для твоего профиля.",
    price: 1000,
    category: "profile",
    icon: Palette,
  },
  {
    id: 7,
    name: "Тема профиля 'Минимал'",
    description: "Элегантная минималистичная тема.",
    price: 1000,
    category: "profile",
    icon: Palette,
  },
  {
    id: 8,
    name: "Premium Аватар Рамка",
    description: "Анимированная рамка вокруг аватара.",
    price: 2500,
    category: "profile",
    icon: Sparkles,
  },

  // Courses
  {
    id: 9,
    name: "Курс: Advanced SAT Math",
    description: "Продвинутый курс для набора 800 на SAT Math.",
    price: 4000,
    category: "courses",
    icon: BookOpen,
  },
  {
    id: 10,
    name: "Курс: IELTS Speaking 7.5+",
    description: "Интенсив для Speaking секции IELTS.",
    price: 4500,
    category: "courses",
    icon: BookOpen,
  },
  {
    id: 11,
    name: "Курс: Олимпиадная Физика",
    description: "Подготовка к IPhO и национальным олимпиадам.",
    price: 5000,
    category: "courses",
    icon: BookOpen,
  },

  // Extras
  {
    id: 12,
    name: "Личная консультация с ментором",
    description: "1 час личного созвона с ментором платформы.",
    price: 6000,
    category: "extras",
    icon: Sparkles,
  },
  {
    id: 13,
    name: "Персональный план развития",
    description: "AI составит индивидуальный roadmap на год.",
    price: 3500,
    category: "extras",
    icon: Sparkles,
  },
  {
    id: 14,
    name: "Priority Support",
    description: "Приоритетная поддержка на 3 месяца.",
    price: 2000,
    category: "extras",
    icon: Sparkles,
  },
];

const categories = [
  { id: "all", name: "Всё", icon: ShoppingBag },
  { id: "merch", name: "Мерч", icon: Gift },
  { id: "profile", name: "Профиль", icon: Crown },
  { id: "courses", name: "Курсы", icon: BookOpen },
  { id: "extras", name: "Дополнения", icon: Sparkles },
];

export default function ShopPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]);

  const filteredItems = selectedCategory === "all"
    ? shopItems
    : shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    if (!user) {
      alert("Войдите в аккаунт чтобы совершать покупки");
      return;
    }

    if (user.coins < item.price) {
      alert("Недостаточно коинов!");
      return;
    }

    // Simulate purchase
    setPurchasedItems(prev => [...prev, item.id]);
    alert(`Куплено: ${item.name}!\n\nТвой баланс: ${user.coins - item.price} коинов`);
  };

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
              <Link href="/shop" className="text-sm font-medium text-primary">
                Магазин
              </Link>
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Лидерборд
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              {user && (
                <Link href="/dashboard">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold">{user.coins}</span>
                  </div>
                </Link>
              )}
              <Link href="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-16 pb-12 border-b border-border/40 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Магазин коинов
              </h1>
              <p className="text-lg text-muted-foreground">
                Трать коины на мерч, прокачки профиля и премиум-курсы
              </p>
            </div>
            {user && (
              <div className="hidden md:flex flex-col items-end gap-2">
                <div className="text-sm text-muted-foreground">Твой баланс</div>
                <div className="flex items-center gap-2 text-3xl font-heading font-bold text-primary">
                  <Zap className="w-8 h-8" />
                  {user.coins}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border/60 hover:border-primary/40"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Items */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isPurchased = purchasedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-card border-2 border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    {isPurchased && (
                      <div className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Куплено
                      </div>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold">
                      <Zap className="w-5 h-5" />
                      <span className="text-xl">{item.price}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePurchase(item)}
                      disabled={isPurchased}
                      className={isPurchased ? "opacity-50 cursor-not-allowed" : ""}
                    >
                      {isPurchased ? "Куплено" : "Купить"}
                    </Button>
                  </div>
                </div>
              );
            })}
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
