"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  TrendingUp,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function HomePage() {
  const { user, setShowAuthModal, setAuthRedirectTo } = useAuth();
  const [gpa, setGpa] = useState("");
  const [sat, setSat] = useState("");
  const [showQuickScore, setShowQuickScore] = useState(false);

  const calculateQuickScore = () => {
    if (!gpa || !sat) return 0;
    const gpaScore = (parseFloat(gpa) / 4.0) * 40;
    const satScore = (parseInt(sat) / 1600) * 60;
    return Math.round(gpaScore + satScore);
  };

  const handleGetFullAnalysis = () => {
    if (!user) {
      setAuthRedirectTo("/profile/setup");
      setShowAuthModal(true);
    } else {
      window.location.href = "/profile/setup";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Interactive Scorer */}
      <section className="pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Value Prop */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-powered profile assessment</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                Узнай свои реальные шансы на топ вузы
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                AI оценивает твой профиль как admission officer и показывает, что нужно улучшить до дедлайнов.
              </p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>5 минут</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Персонализированно</span>
                </div>
              </div>
            </div>

            {/* Right: CTA Card */}
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-heading font-bold mb-2">
                    Получи полную оценку профиля
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    AI анализирует твои оценки, внеклассные активности, тесты и генерирует персонализированный план поступления
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Profile Score 0-100</div>
                      <div className="text-xs text-muted-foreground">Academic, Extracurricular, Essay, Recommendation scores</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">College List</div>
                      <div className="text-xs text-muted-foreground">Reach, Target, Safety schools под твой профиль</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm mb-1">Персонализированный Roadmap</div>
                      <div className="text-xs text-muted-foreground">Что улучшить, какие курсы взять, куда применить</div>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full h-12 text-base"
                  onClick={handleGetFullAnalysis}
                >
                  Начать оценку бесплатно
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              От оценки до поступления за 3 шага
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-8 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Шаг 1</div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Оцени свой профиль
                </h3>
                <p className="text-muted-foreground">
                  AI анализирует твои оценки, SAT/ACT, внеклассные активности и генерирует score 0-100
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
            </div>

            <div className="relative">
              <div className="bg-card border border-border rounded-xl p-8 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Шаг 2</div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Получи roadmap
                </h3>
                <p className="text-muted-foreground">
                  Персонализированный план: что улучшить, какие курсы взять, какие awards получить
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
            </div>

            <div>
              <div className="bg-card border border-border rounded-xl p-8 h-full">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Шаг 3</div>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Подай заявки
                </h3>
                <p className="text-muted-foreground">
                  Используй наш college list builder и трекер дедлайнов для организованной подачи
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Начни прямо сейчас
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Оцени свой профиль бесплатно и получи персонализированный roadmap
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-lg"
            onClick={handleGetFullAnalysis}
          >
            Оценить профиль бесплатно
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-heading font-bold">Applyze</span>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2026 Applyze. Know your chances before you apply.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
