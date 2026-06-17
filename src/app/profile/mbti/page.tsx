"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Brain, Lightbulb, Users, Target, CheckCircle2 } from "lucide-react";

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

export default function MBTIProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [selectedMBTI, setSelectedMBTI] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else if (user.mbti) {
      setSelectedMBTI(user.mbti);
      // Load existing analysis if user already has MBTI
      loadExistingAnalysis(user.mbti);
    }
  }, [user, router]);

  const loadExistingAnalysis = async (mbti: string) => {
    // Try to load from localStorage first
    const analysisKey = `mbti_analysis_${user!.id}`;
    const savedAnalysis = localStorage.getItem(analysisKey);

    if (savedAnalysis) {
      try {
        const data = JSON.parse(savedAnalysis);
        setAnalysis(data);
        return;
      } catch (e) {
        console.error("Failed to parse saved analysis:", e);
      }
    }

    // If not in localStorage, fetch from API
    try {
      const response = await fetch("/api/mbti-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbti: mbti,
          userName: user!.name,
          grade: user!.grade,
          interests: user!.interests
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);
        localStorage.setItem(analysisKey, JSON.stringify(data));
      }
    } catch (error) {
      console.error("Failed to load MBTI analysis:", error);
    }
  };

  if (!user) return null;

  const handleSelectMBTI = (code: string) => {
    setSelectedMBTI(code);
  };

  const handleSave = async () => {
    if (!selectedMBTI) return;

    setIsAnalyzing(true);

    // Generate AI analysis based on MBTI
    try {
      const response = await fetch("/api/mbti-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mbti: selectedMBTI,
          userName: user.name,
          grade: user.grade,
          interests: user.interests
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data);

        // Save analysis to localStorage
        const analysisKey = `mbti_analysis_${user.id}`;
        localStorage.setItem(analysisKey, JSON.stringify(data));
      }
    } catch (error) {
      console.error("MBTI analysis error:", error);
    }

    // Update user profile
    updateUser({ mbti: selectedMBTI });
    setIsAnalyzing(false);
  };

  const selectedType = MBTI_TYPES.find(t => t.code === selectedMBTI);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-muted/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-heading font-bold">Твой MBTI профиль</h1>
            </div>
            <p className="text-muted-foreground">
              Выбери свой тип личности MBTI. Это поможет AI ментору Navi давать персонализированные советы,
              а менторам - лучше понимать как с тобой работать.
            </p>
          </div>

          {!analysis ? (
            <>
              {/* MBTI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {MBTI_TYPES.map((type) => (
                  <button
                    key={type.code}
                    onClick={() => handleSelectMBTI(type.code)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
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
                    <div className="text-sm font-semibold mb-1">{type.name}</div>
                    <div className="text-xs text-muted-foreground">{type.description}</div>
                  </button>
                ))}
              </div>

              {selectedMBTI && (
                <div className="bg-card border border-border/60 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-heading font-bold mb-2">
                    Ты выбрал: {selectedType?.code} - {selectedType?.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{selectedType?.description}</p>
                  <Button
                    onClick={handleSave}
                    disabled={isAnalyzing}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isAnalyzing ? "Анализирую..." : "Сохранить и получить анализ"}
                  </Button>
                </div>
              )}

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <h3 className="font-heading font-bold mb-3">Не знаешь свой MBTI?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Пройди бесплатный тест на <a href="https://www.16personalities.com/ru" target="_blank" className="text-primary hover:underline">16personalities.com</a>
                </p>
              </div>
            </>
          ) : (
            // Analysis Results
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/40 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16">
                    <img src="/navi-character.png" alt="Navi" className="w-full h-full object-contain animate-float" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold mb-2">
                      Анализ от Navi для {selectedType?.code}
                    </h3>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{analysis.feedback}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border border-border/60 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-green-500" />
                    <h3 className="font-heading font-bold">Сильные стороны</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysis.strengths?.map((strength: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card border border-border/60 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-orange-500" />
                    <h3 className="font-heading font-bold">Области роста</h3>
                  </div>
                  <ul className="space-y-2">
                    {analysis.weaknesses?.map((weakness: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-orange-500">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-card border border-border/60 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-heading font-bold">Рекомендации для менторов</h3>
                </div>
                <p className="text-sm leading-relaxed">{analysis.mentorGuidance}</p>
              </div>

              <Button onClick={() => router.push("/dashboard")} className="w-full">
                Вернуться в профиль
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
