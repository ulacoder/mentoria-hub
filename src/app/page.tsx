"use client";

import { useState } from "react";
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
  Zap,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { useLocale } from "@/contexts/locale-context";

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useLocale();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | undefined>();

  const handleProtectedClick = (e: React.MouseEvent, path: string) => {
    if (!user) {
      e.preventDefault();
      setRedirectTo(path);
      setShowAuthModal(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        redirectTo={redirectTo}
      />

      {/* Hero Section */}
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 mb-6">
              <span className="text-sm font-medium text-primary">{t("home.platform_badge")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight whitespace-pre-line">
              {t("home.hero_title")}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t("home.hero_subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link
                href="/opportunities"
                onClick={(e) => handleProtectedClick(e, "/opportunities")}
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                  {t("home.find_opportunities")}
                </Button>
              </Link>
              <Link
                href="/courses"
                onClick={(e) => handleProtectedClick(e, "/courses")}
              >
                <Button size="lg" variant="outline">
                  {t("home.view_courses")}
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-12 pt-8 border-t border-border/40">
              <div>
                <div className="text-2xl font-heading font-semibold">500+</div>
                <div className="text-sm text-muted-foreground">{t("home.stats.opportunities")}</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-semibold">50+</div>
                <div className="text-sm text-muted-foreground">{t("home.stats.courses")}</div>
              </div>
              <div>
                <div className="text-2xl font-heading font-semibold">2000+</div>
                <div className="text-sm text-muted-foreground">{t("home.stats.students")}</div>
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
              {t("home.features_title")}
            </h2>
            <p className="text-muted-foreground">
              {t("home.features_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Trophy className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">{t("features.competitions")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.competitions_desc")}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Award className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">{t("features.scholarships")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.scholarships_desc")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">{t("features.summer_programs")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.summer_programs_desc")}
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">{t("features.async_courses")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.async_courses_desc")}
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">{t("features.recommendations")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.recommendations_desc")}
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-card border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-colors">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-heading font-semibold mb-2">{t("features.progress_tracking")}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("features.progress_tracking_desc")}
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
              {t("home.cta_title")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t("home.cta_subtitle")}
            </p>
            <Link href="/register">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={(e) => {
                  if (!user) {
                    e.preventDefault();
                    setShowAuthModal(true);
                  }
                }}
              >
                {t("home.cta_button")}
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
                {t("footer.description")}
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
