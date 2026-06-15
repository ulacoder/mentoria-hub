"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  Bookmark,
  ExternalLink,
  CheckCircle2,
  Building2,
} from "lucide-react";
import { getOpportunityById } from "@/lib/data";
import { saveOpportunity, unsaveOpportunity, isOpportunitySaved } from "@/lib/store";

export default function OpportunityDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const opportunity = getOpportunityById(id);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(isOpportunitySaved(id));
  }, [id]);

  const handleSave = () => {
    if (saved) {
      unsaveOpportunity(id);
      setSaved(false);
    } else {
      saveOpportunity(id);
      setSaved(true);
    }
  };

  if (!opportunity) {
    return (
      <div className="flex flex-col min-h-screen">
        <nav className="border-b border-border/40 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-heading font-bold">Mentoria Hub</span>
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold mb-2">Возможность не найдена</h1>
            <Link href="/opportunities">
              <Button>Вернуться к списку</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const daysLeft = Math.ceil((new Date(opportunity.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

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
              <Link href="/leaderboard" className="text-sm font-medium hover:text-primary transition-colors">
                Лидерборд
              </Link>
            </div>

            <Link href="/dashboard">
              <Button size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/opportunities">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к возможностям
            </Button>
          </Link>

          {/* Header */}
          <div className="bg-card border border-border/60 rounded-lg p-8 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg font-medium">
                  {opportunity.category}
                </span>
                <h1 className="text-3xl font-heading font-bold mt-4 mb-2">
                  {opportunity.title}
                </h1>
                <p className="text-muted-foreground">{opportunity.description}</p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Дедлайн</p>
                  <p className="font-medium">{new Date(opportunity.deadline).toLocaleDateString('ru-RU')}</p>
                  <p className="text-xs text-primary">{daysLeft} дней осталось</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Формат</p>
                  <p className="font-medium">{opportunity.format}</p>
                  <p className="text-xs">{opportunity.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Стоимость</p>
                  <p className="font-medium">{opportunity.cost}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Building2 className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-muted-foreground text-xs">Организатор</p>
                  <p className="font-medium">{opportunity.organizer}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {opportunity.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-muted text-sm rounded-lg">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {opportunity.applicationLink && (
                <a href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Подать заявку
                  </Button>
                </a>
              )}
              <Button
                size="lg"
                variant={saved ? "secondary" : "outline"}
                onClick={handleSave}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${saved ? "fill-current" : ""}`} />
                {saved ? "Сохранено" : "Сохранить"}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Full Description */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h2 className="text-xl font-heading font-bold mb-4">О программе</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {opportunity.fullDescription}
                </p>
              </div>

              {/* Requirements */}
              {opportunity.requirements && (
                <div className="bg-card border border-border/60 rounded-lg p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Требования</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {opportunity.requirements}
                  </p>
                </div>
              )}

              {/* Benefits */}
              {opportunity.benefits && opportunity.benefits.length > 0 && (
                <div className="bg-card border border-border/60 rounded-lg p-6">
                  <h2 className="text-xl font-heading font-bold mb-4">Что вы получите</h2>
                  <ul className="space-y-3">
                    {opportunity.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Organizer Info */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-3">Организатор</h3>
                <p className="font-medium mb-2">{opportunity.organizer}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {opportunity.organizerDescription}
                </p>
                {opportunity.applicationLink && (
                  <a href={opportunity.applicationLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Официальный сайт
                    </Button>
                  </a>
                )}
              </div>

              {/* Target Audience */}
              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-3">Целевая аудитория</h3>
                <div className="space-y-2">
                  {opportunity.grade.map((grade) => (
                    <div key={grade} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span>{grade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Dates */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-heading font-semibold mb-3">Важные даты</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Дедлайн заявки</p>
                    <p className="font-semibold">{new Date(opportunity.deadline).toLocaleDateString('ru-RU')}</p>
                  </div>
                  <div className="pt-3 border-t border-border/40">
                    <p className="text-sm font-medium text-primary">
                      Осталось {daysLeft} {daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дня' : 'дней'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
