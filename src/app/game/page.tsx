"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Trophy,
  Clock,
  Target,
  Star,
  Play,
  RotateCcw
} from "lucide-react";

type GameMode = "addition" | "subtraction" | "multiplication" | "division";

interface Question {
  num1: number;
  num2: number;
  operation: string;
  answer: number;
}

export default function MathGamePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("addition");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    // Load best score
    const saved = localStorage.getItem(`math_game_best_${user.id}`);
    if (saved) {
      setBestScore(parseInt(saved));
    }
  }, [user]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [gameStarted, timeLeft]);

  const generateQuestion = (): Question => {
    let num1, num2, answer;
    let operation = "";

    switch (gameMode) {
      case "addition":
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        operation = "+";
        break;
      case "subtraction":
        num1 = Math.floor(Math.random() * 50) + 20;
        num2 = Math.floor(Math.random() * 20) + 1;
        answer = num1 - num2;
        operation = "-";
        break;
      case "multiplication":
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        operation = "×";
        break;
      case "division":
        num2 = Math.floor(Math.random() * 10) + 2;
        answer = Math.floor(Math.random() * 12) + 1;
        num1 = num2 * answer;
        operation = "÷";
        break;
    }

    return { num1, num2, operation, answer };
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setCurrentQuestion(generateQuestion());
    setUserAnswer("");
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const userNum = parseInt(userAnswer);
    if (userNum === currentQuestion.answer) {
      // Correct!
      const points = streak >= 5 ? 15 : 10;
      setScore(score + points);
      setStreak(streak + 1);
      setIsCorrect(true);

      setTimeout(() => {
        setCurrentQuestion(generateQuestion());
        setUserAnswer("");
        setIsCorrect(null);
      }, 500);
    } else {
      // Wrong
      setStreak(0);
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);
    }
  };

  const endGame = () => {
    setGameStarted(false);

    // Calculate coins earned (1 coin per 10 points)
    const coinsEarned = Math.floor(score / 10);
    if (user && coinsEarned > 0) {
      updateUser({ coins: (user.coins || 0) + coinsEarned });
    }

    // Save best score
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem(`math_game_best_${user!.id}`, score.toString());
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!gameStarted ? (
            // Game Start Screen
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <Zap className="w-16 h-16 text-primary" />
                </div>
                <h1 className="text-4xl font-heading font-bold mb-3">Математическая молния</h1>
                <p className="text-lg text-muted-foreground">
                  Решай примеры на скорость и зарабатывай коины!
                </p>
              </div>

              {/* Game Mode Selection */}
              <div className="bg-card border border-border/60 rounded-lg p-8 mb-8">
                <h3 className="text-xl font-heading font-bold mb-6">Выбери режим</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    onClick={() => setGameMode("addition")}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      gameMode === "addition"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">➕</div>
                    <div className="font-semibold">Сложение</div>
                  </button>
                  <button
                    onClick={() => setGameMode("subtraction")}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      gameMode === "subtraction"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">➖</div>
                    <div className="font-semibold">Вычитание</div>
                  </button>
                  <button
                    onClick={() => setGameMode("multiplication")}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      gameMode === "multiplication"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">✖️</div>
                    <div className="font-semibold">Умножение</div>
                  </button>
                  <button
                    onClick={() => setGameMode("division")}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      gameMode === "division"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">➗</div>
                    <div className="font-semibold">Деление</div>
                  </button>
                </div>
              </div>

              {/* Rules */}
              <div className="bg-card border border-border/60 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-lg font-heading font-bold mb-4">Правила</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>У тебя есть 60 секунд</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>За каждый правильный ответ +10 очков</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Серия из 5+ правильных ответов дает +15 очков</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Получай 1 коин за каждые 10 очков</span>
                  </li>
                </ul>
              </div>

              {/* Best Score */}
              {bestScore > 0 && (
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">
                      Лучший результат: <span className="font-bold">{bestScore}</span>
                    </span>
                  </div>
                </div>
              )}

              <Button
                size="lg"
                onClick={startGame}
                className="bg-primary hover:bg-primary/90 text-lg px-8"
              >
                <Play className="w-5 h-5 mr-2" />
                Начать игру
              </Button>
            </div>
          ) : (
            // Game Screen
            <div>
              {/* Game Header */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-card border border-border/60 rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Очки</div>
                  <div className="text-2xl font-bold">{score}</div>
                </div>
                <div className="bg-card border border-border/60 rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Время</div>
                  <div className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : ""}`}>
                    {timeLeft}с
                  </div>
                </div>
                <div className="bg-card border border-border/60 rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Серия</div>
                  <div className="text-2xl font-bold">{streak} 🔥</div>
                </div>
              </div>

              {/* Question */}
              {currentQuestion && (
                <div className="bg-card border-2 border-primary/40 rounded-lg p-12 mb-8 text-center">
                  <div className="text-6xl font-bold mb-8">
                    {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = ?
                  </div>

                  <div className="max-w-md mx-auto">
                    <input
                      type="number"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                      autoFocus
                      className={`w-full text-center text-4xl font-bold py-4 px-6 bg-background border-2 rounded-lg ${
                        isCorrect === true
                          ? "border-green-500 bg-green-500/10"
                          : isCorrect === false
                          ? "border-red-500 bg-red-500/10"
                          : "border-border"
                      }`}
                      placeholder="?"
                    />
                  </div>

                  <Button
                    size="lg"
                    onClick={checkAnswer}
                    className="mt-6"
                    disabled={!userAnswer}
                  >
                    Ответить
                  </Button>

                  {isCorrect === true && (
                    <div className="mt-6 text-2xl text-green-500 font-bold animate-bounce">
                      ✓ Правильно!
                    </div>
                  )}
                  {isCorrect === false && (
                    <div className="mt-6 text-2xl text-red-500 font-bold">
                      ✗ Неправильно
                    </div>
                  )}
                </div>
              )}

              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={endGame}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Завершить игру
                </Button>
              </div>
            </div>
          )}

          {/* Game Over Screen */}
          {!gameStarted && score > 0 && (
            <div className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/40 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">Игра окончена!</h2>
              <div className="text-5xl font-bold mb-2">{score}</div>
              <div className="text-lg text-muted-foreground mb-6">очков</div>

              <div className="flex items-center justify-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-lg">
                  Заработано коинов: <span className="font-bold">{Math.floor(score / 10)}</span>
                </span>
              </div>

              {score > bestScore && (
                <div className="mb-6 text-yellow-500 font-bold text-xl">
                  🏆 Новый рекорд!
                </div>
              )}

              <Button onClick={startGame} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Играть снова
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
