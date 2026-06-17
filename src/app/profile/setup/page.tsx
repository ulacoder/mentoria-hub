"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Brain, Target, CheckCircle2, Sparkles } from "lucide-react";

const MBTI_TYPES = [
  { code: "INTJ", name: "Архитектор", description: "Стратегический мыслитель с жаждой знаний" },
  { code: "INTP", name: "Логик", description: "Инновационные изобретатели с неутолимой жаждой знаний" },
  { code: "ENTJ", name: "Командир", description: "Смелые, образные и волевые лидеры" },
  { code: "ENTP", name: "Полемист", description: "Умные и любопытные мыслители" },
  { code: "INFJ", name: "Активист", description: "Тихие и мистические идеалисты" },
  { code: "INFP", name: "Посредник", description: "Поэтические, добрые и альтруистичные личности" },
  { code: "ENFJ", name: "Тренер", description: "Харизматичные и вдохновляющие лидеры" },
  { code: "ENFP", name: "Борец", description: "Энтузиасты, креативные и общительные" },
  { code: "ISTJ", name: "Администратор", description: "Практичные и ориентированные на факты" },
  { code: "ISFJ", name: "Защитник", description: "Очень преданные и теплые защитники" },
  { code: "ESTJ", name: "Менеджер", description: "Превосходные администраторы" },
  { code: "ESFJ", name: "Консул", description: "Заботливые, общительные и популярные" },
  { code: "ISTP", name: "Виртуоз", description: "Смелые и практичные экспериментаторы" },
  { code: "ISFP", name: "Артист", description: "Гибкие и очаровательные художники" },
  { code: "ESTP", name: "Предприниматель", description: "Умные, энергичные и перцептивные" },
  { code: "ESFP", name: "Развлекатель", description: "Спонтанные, энергичные и энтузиасты" }
];

const INTEREST_OPTIONS = [
  "STEM",
  "Программирование",
  "Бизнес",
  "IT",
  "Математика",
  "Физика",
  "Социальное влияние",
  "Искусство",
  "Медицина",
  "Инженерия"
];

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState<"interests" | "mbti">("interests");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedMBTI, setSelectedMBTI] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (user.role !== "student") {
      router.push("/dashboard");
    } else if (user.interests && user.interests.length > 0 && user.mbti) {
      // Profile already completed
      router.push("/dashboard");
    } else if (user.interests && user.interests.length > 0) {
      setStep("mbti");
      setSelectedInterests(user.interests);
    }
  }, [user, router]);

  if (!user || user.role !== "student") return null;

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleInterestsNext = () => {
    if (selectedInterests.length === 0) {
      alert("Выбери хотя бы один интерес");
      return;
    }
    updateUser({ interests: selectedInterests });
    setStep("mbti");
  };

  const handleMBTIComplete = async () => {
    if (!selectedMBTI) {
      alert("Выбери свой тип личности");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate AI analysis
      const response = await fetch("/api/mbti-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbti: selectedMBTI,
          userName: user.name,
          grade: user.grade,
          interests: selectedInterests
        })
      });

      if (response.ok) {
        const data = await response.json();
        const analysisKey = `mbti_analysis_${user.id}`;
        localStorage.setItem(analysisKey, JSON.stringify(data));
      }
    } catch (error) {
      console.error("MBTI analysis error:", error);
    }

    updateUser({ mbti: selectedMBTI });
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  const selectedType = MBTI_TYPES.find(t => t.code === selectedMBTI);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold mb-2">
              Давай настроим твой профиль!
            </h1>
            <p className="text-muted-foreground">
              Это поможет нам персонализировать твой опыт на платформе
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              step === "interests" ? "bg-primary text-white" : "bg-muted"
            }`}>
              <Target className="w-4 h-4" />
              <span className="text-sm font-medium">Интересы</span>
            </div>
            <div className="w-12 h-0.5 bg-border"></div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              step === "mbti" ? "bg-primary text-white" : "bg-muted"
            }`}>
              <Brain className="w-4 h-4" />
              <span className="text-sm font-medium">Личность</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-card border border-border/60 rounded-lg p-8">
            {step === "interests" ? (
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Выбери свои интересы
                </h2>
                <p className="text-muted-foreground mb-6">
                  Это поможет AI ментору Navi давать тебе персонализированные рекомендации
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {INTEREST_OPTIONS.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        selectedInterests.includes(interest)
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>

                {selectedInterests.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="font-semibold">Выбрано: {selectedInterests.length}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedInterests.join(", ")}
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleInterestsNext}
                  disabled={selectedInterests.length === 0}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Далее: Тип личности
                </Button>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-primary" />
                  Выбери свой MBTI тип
                </h2>
                <p className="text-muted-foreground mb-6">
                  Это поможет менторам лучше понимать как с тобой работать, а AI даст более точные советы
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {MBTI_TYPES.map((type) => (
                    <button
                      key={type.code}
                      onClick={() => setSelectedMBTI(type.code)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        selectedMBTI === type.code
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-lg font-bold">{type.code}</span>
                        {selectedMBTI === type.code && (
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="text-xs font-semibold mb-1">{type.name}</div>
                      <div className="text-[10px] text-muted-foreground leading-tight">
                        {type.description}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedMBTI && selectedType && (
                  <div className="bg-primary/10 border border-primary/40 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold mb-1">
                      Ты выбрал: {selectedType.code} - {selectedType.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{selectedType.description}</p>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-4 mb-6 text-sm">
                  <p className="mb-2">
                    <strong>Не знаешь свой MBTI?</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Пройди бесплатный тест на{" "}
                    <a
                      href="https://www.16personalities.com/ru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      16personalities.com
                    </a>
                    {" "}— это займет 10 минут
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep("interests")}
                    className="flex-1"
                  >
                    Назад
                  </Button>
                  <Button
                    onClick={handleMBTIComplete}
                    disabled={!selectedMBTI || isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Сохраняю..." : "Завершить настройку"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
