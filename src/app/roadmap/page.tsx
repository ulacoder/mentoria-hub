"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { useAuth } from "@/contexts/auth-context";
import { useLocale } from "@/contexts/locale-context";
import { Target, MapPin, Award, TrendingUp, Loader2, CheckCircle2, Circle, Star, Trophy, Lightbulb } from "lucide-react";

interface RoadmapProfile {
  currentGrade: string;
  targetUniversity: string;
  achievements: string[];
  competitions: string[];
  research: string[];
  leadership: string[];
  volunteering: string[];
  currentLocation: string;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  grade: string;
  category: "competition" | "research" | "leadership" | "volunteering" | "academic";
  completed: boolean;
  priority: "high" | "medium" | "low";
}

interface RoadmapData {
  progress: number;
  feedback: string;
  milestones: Milestone[];
  recommendations: string[];
}

export default function RoadmapPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useLocale();
  const [step, setStep] = useState<"form" | "roadmap">("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [error, setError] = useState<string>("");

  const [profile, setProfile] = useState<RoadmapProfile>({
    currentGrade: user?.grade || "9 класс",
    targetUniversity: "",
    achievements: [],
    competitions: [],
    research: [],
    leadership: [],
    volunteering: [],
    currentLocation: "Казахстан"
  });

  const [formData, setFormData] = useState({
    targetUniversity: "",
    achievements: "",
    competitions: "",
    research: "",
    leadership: "",
    volunteering: ""
  });

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError("");

    const updatedProfile: RoadmapProfile = {
      ...profile,
      targetUniversity: formData.targetUniversity,
      achievements: formData.achievements.split(",").map(s => s.trim()).filter(Boolean),
      competitions: formData.competitions.split(",").map(s => s.trim()).filter(Boolean),
      research: formData.research.split(",").map(s => s.trim()).filter(Boolean),
      leadership: formData.leadership.split(",").map(s => s.trim()).filter(Boolean),
      volunteering: formData.volunteering.split(",").map(s => s.trim()).filter(Boolean),
    };

    setProfile(updatedProfile);

    try {
      const response = await fetch("/api/roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile)
      });

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const data: RoadmapData = await response.json();
      setRoadmapData(data);
      setStep("roadmap");
    } catch (err) {
      console.error("Roadmap generation error:", err);
      setError("Не удалось сгенерировать роадмап. Попробуй еще раз.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (step === "form") {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-heading font-bold">Мой путь к мечте</h1>
              </div>
              <p className="text-muted-foreground">
                Расскажи о своих целях и достижениях — AI создаст персональный роадмап до университета мечты
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border/60 rounded-lg p-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/40 rounded-lg p-4 text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Целевой университет *
                </label>
                <Input
                  required
                  placeholder="Например: Harvard, MIT, Stanford, Oxford..."
                  value={formData.targetUniversity}
                  onChange={(e) => setFormData({ ...formData, targetUniversity: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Текущий класс
                </label>
                <Input
                  disabled
                  value={user.grade}
                  className="w-full bg-muted"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Текущая локация
                </label>
                <Input
                  value={profile.currentLocation}
                  onChange={(e) => setProfile({ ...profile, currentLocation: e.target.value })}
                  placeholder="Например: Казахстан, Алматы"
                  className="w-full"
                />
              </div>

              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-heading font-bold mb-4">Твоё портфолио</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Укажи свои достижения через запятую. Это поможет AI оценить твой текущий уровень.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      🏆 Олимпиады и конкурсы
                    </label>
                    <Input
                      placeholder="Например: WRO 2023 победитель, Математическая олимпиада..."
                      value={formData.competitions}
                      onChange={(e) => setFormData({ ...formData, competitions: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      🔬 Исследования и проекты
                    </label>
                    <Input
                      placeholder="Например: Подводный дрон, KozbenSal очки..."
                      value={formData.research}
                      onChange={(e) => setFormData({ ...formData, research: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      👥 Лидерство и организация
                    </label>
                    <Input
                      placeholder="Например: Основатель стартапа, организатор мероприятий..."
                      value={formData.leadership}
                      onChange={(e) => setFormData({ ...formData, leadership: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      ❤️ Волонтерство и социальные проекты
                    </label>
                    <Input
                      placeholder="Например: Помощь детям с инвалидностью..."
                      value={formData.volunteering}
                      onChange={(e) => setFormData({ ...formData, volunteering: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      ⭐ Другие достижения
                    </label>
                    <Input
                      placeholder="Например: Сертификаты, награды, публикации..."
                      value={formData.achievements}
                      onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  type="submit"
                  disabled={isGenerating || !formData.targetUniversity}
                  className="bg-primary hover:bg-primary/90 flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      AI анализирует твой профиль...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Сгенерировать мой роадмап
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Roadmap view
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header with character */}
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl font-heading font-bold mb-2">
                Твой путь к {profile.targetUniversity}
              </h1>
              <p className="text-muted-foreground">
                {profile.currentLocation} → {profile.targetUniversity}
              </p>
            </div>

            {/* Navi Character */}
            <div className="relative">
              <div className="w-24 h-24 animate-float">
                <img
                  src="/navi-character.png"
                  alt="Navi"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
              <Star className="absolute -top-1 -right-1 w-5 h-5 text-yellow-500 animate-pulse" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-card border-2 border-primary/40 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-heading font-bold">Прогресс готовности</h2>
              <span className="text-3xl font-bold text-primary">{roadmapData?.progress}%</span>
            </div>
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-1000 relative"
                style={{ width: `${roadmapData?.progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-primary shadow-lg"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{profile.currentLocation}</span>
              <span>{profile.targetUniversity}</span>
            </div>
          </div>

          {/* Feedback from Navi */}
          <div className="bg-card border-2 border-accent/40 rounded-lg p-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full -mr-16 -mt-16"></div>
            <div className="flex items-start gap-4 relative">
              <div className="w-12 h-12 flex-shrink-0">
                <img src="/navi-character.png" alt="Navi" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  Анализ от Navi
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{roadmapData?.feedback}</p>
              </div>
            </div>
          </div>

          {/* Milestones timeline */}
          <div className="bg-card border border-border/60 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              Станции на твоем пути
            </h3>

            <div className="space-y-4">
              {roadmapData?.milestones.map((milestone, idx) => {
                const isCompleted = milestone.completed;
                const categoryColors = {
                  competition: "border-yellow-500 bg-yellow-500/10",
                  research: "border-blue-500 bg-blue-500/10",
                  leadership: "border-purple-500 bg-purple-500/10",
                  volunteering: "border-green-500 bg-green-500/10",
                  academic: "border-orange-500 bg-orange-500/10"
                };
                const priorityBadge = {
                  high: "bg-red-500/20 text-red-500",
                  medium: "bg-yellow-500/20 text-yellow-500",
                  low: "bg-gray-500/20 text-gray-500"
                };

                return (
                  <div
                    key={milestone.id}
                    className={`border-2 rounded-lg p-4 transition-all hover:shadow-lg ${
                      isCompleted ? "border-green-500 bg-green-500/5" : categoryColors[milestone.category]
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded ${priorityBadge[milestone.priority]}`}>
                              {milestone.priority === "high" ? "Высокий" : milestone.priority === "medium" ? "Средний" : "Низкий"}
                            </span>
                            <span className="text-xs px-2 py-1 bg-muted rounded">
                              {milestone.grade}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          {roadmapData?.recommendations && roadmapData.recommendations.length > 0 && (
            <div className="bg-card border border-border/60 rounded-lg p-6">
              <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-accent" />
                Рекомендации
              </h3>
              <ul className="space-y-2">
                {roadmapData.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <span className="text-accent mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Button onClick={() => setStep("form")} variant="outline">
              Изменить профиль
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
