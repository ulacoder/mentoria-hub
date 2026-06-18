"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Trophy,
  Clock,
  Target,
  Star,
  Play,
  RotateCcw,
  BookOpen,
  Calculator
} from "lucide-react";

type GameType = "math" | "english";
type GameMode = "addition" | "subtraction" | "multiplication" | "division";
type EnglishMode = "vocabulary" | "grammar" | "reading";

interface Question {
  num1: number;
  num2: number;
  operation: string;
  answer: number;
}

interface EnglishQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export default function GamePage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [gameType, setGameType] = useState<GameType | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>("addition");
  const [englishMode, setEnglishMode] = useState<EnglishMode>("vocabulary");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentEnglishQuestion, setCurrentEnglishQuestion] = useState<EnglishQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
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

  const generateEnglishQuestion = (): EnglishQuestion => {
    const vocabularyQuestions = [
      { question: "What does 'amazing' mean?", options: ["Удивительный", "Скучный", "Грустный", "Злой"], correctAnswer: 0 },
      { question: "Choose the correct word: I ___ to school every day.", options: ["go", "goes", "going", "went"], correctAnswer: 0 },
      { question: "What is the opposite of 'hot'?", options: ["Cold", "Warm", "Cool", "Big"], correctAnswer: 0 },
      { question: "Complete: She ___ a book right now.", options: ["is reading", "read", "reads", "reading"], correctAnswer: 0 },
      { question: "What does 'library' mean?", options: ["Библиотека", "Магазин", "Школа", "Парк"], correctAnswer: 0 },
      { question: "Choose correct: They ___ playing football.", options: ["are", "is", "am", "be"], correctAnswer: 0 },
      { question: "What is 'beautiful' in Russian?", options: ["Красивый", "Большой", "Маленький", "Быстрый"], correctAnswer: 0 },
      { question: "Past tense of 'go':", options: ["went", "goed", "go", "going"], correctAnswer: 0 },
      { question: "What does 'excited' mean?", options: ["Взволнованный", "Усталый", "Голодный", "Сонный"], correctAnswer: 0 },
      { question: "Choose: I ___ English every day.", options: ["study", "studies", "studying", "studied"], correctAnswer: 0 },
    ];

    const grammarQuestions = [
      { question: "Which is correct?", options: ["He is a teacher", "He are a teacher", "He am a teacher", "He be a teacher"], correctAnswer: 0 },
      { question: "Complete: I have ___ apples.", options: ["three", "tree", "free", "thee"], correctAnswer: 0 },
      { question: "Which is correct?", options: ["She doesn't like", "She don't like", "She not like", "She no like"], correctAnswer: 0 },
      { question: "Choose: ___ you like pizza?", options: ["Do", "Does", "Is", "Are"], correctAnswer: 0 },
      { question: "Complete: He ___ to school yesterday.", options: ["went", "go", "goes", "going"], correctAnswer: 0 },
      { question: "Which is correct?", options: ["I am happy", "I is happy", "I are happy", "I be happy"], correctAnswer: 0 },
      { question: "Choose: They ___ play football on Sundays.", options: ["usually", "usual", "usualry", "usualy"], correctAnswer: 0 },
      { question: "Complete: She ___ a student.", options: ["is", "am", "are", "be"], correctAnswer: 0 },
      { question: "Which is correct?", options: ["I can swim", "I cans swim", "I can swims", "I can swimming"], correctAnswer: 0 },
      { question: "Choose: ___ is your name?", options: ["What", "Who", "Where", "When"], correctAnswer: 0 },
    ];

    const readingQuestions = [
      {
        question: "Read: 'Tom has a dog. The dog is brown.' What color is the dog?",
        options: ["Brown", "Black", "White", "Yellow"],
        correctAnswer: 0
      },
      {
        question: "Read: 'Mary likes to read books.' What does Mary like?",
        options: ["Reading books", "Playing games", "Watching TV", "Swimming"],
        correctAnswer: 0
      },
      {
        question: "Read: 'It is sunny today.' What is the weather?",
        options: ["Sunny", "Rainy", "Cloudy", "Snowy"],
        correctAnswer: 0
      },
      {
        question: "Read: 'I have two cats and one dog.' How many pets?",
        options: ["Three", "Two", "One", "Four"],
        correctAnswer: 0
      },
      {
        question: "Read: 'She goes to school by bus.' How does she go to school?",
        options: ["By bus", "By car", "By bike", "On foot"],
        correctAnswer: 0
      },
    ];

    let questions = vocabularyQuestions;
    if (englishMode === "grammar") questions = grammarQuestions;
    if (englishMode === "reading") questions = readingQuestions;

    return questions[Math.floor(Math.random() * questions.length)];
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setUserAnswer("");
    setSelectedOption(null);
    setIsCorrect(null);

    if (gameType === "math") {
      setCurrentQuestion(generateQuestion());
    } else {
      setCurrentEnglishQuestion(generateEnglishQuestion());
    }
  };

  const checkAnswer = () => {
    if (gameType === "math" && currentQuestion) {
      const userNum = parseInt(userAnswer);
      if (userNum === currentQuestion.answer) {
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
        setStreak(0);
        setIsCorrect(false);
        setTimeout(() => {
          setIsCorrect(null);
        }, 1000);
      }
    } else if (gameType === "english" && currentEnglishQuestion && selectedOption !== null) {
      if (selectedOption === currentEnglishQuestion.correctAnswer) {
        const points = streak >= 5 ? 15 : 10;
        setScore(score + points);
        setStreak(streak + 1);
        setIsCorrect(true);

        setTimeout(() => {
          setCurrentEnglishQuestion(generateEnglishQuestion());
          setSelectedOption(null);
          setIsCorrect(null);
        }, 1000);
      } else {
        setStreak(0);
        setIsCorrect(false);
        setTimeout(() => {
          setIsCorrect(null);
          setSelectedOption(null);
        }, 1500);
      }
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
      <div className="flex-1 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!gameType ? (
            // Game Type Selection
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  <Zap className="w-16 h-16 text-primary" />
                </div>
                <h1 className="text-4xl font-heading font-bold mb-3">Образовательные игры</h1>
                <p className="text-lg text-muted-foreground">
                  Выбери игру и зарабатывай коины!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button
                  onClick={() => setGameType("math")}
                  className="bg-card border-2 border-border hover:border-primary rounded-lg p-8 transition-all hover:scale-105"
                >
                  <Calculator className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-2">Математика</h3>
                  <p className="text-muted-foreground">Решай примеры на скорость</p>
                </button>

                <button
                  onClick={() => setGameType("english")}
                  className="bg-card border-2 border-border hover:border-primary rounded-lg p-8 transition-all hover:scale-105"
                >
                  <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-2">Английский</h3>
                  <p className="text-muted-foreground">Проверь свои знания языка</p>
                </button>
              </div>
            </div>
          ) : !gameStarted ? (
            // Game Start Screen
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                  {gameType === "math" ? <Calculator className="w-16 h-16 text-primary" /> : <BookOpen className="w-16 h-16 text-primary" />}
                </div>
                <h1 className="text-4xl font-heading font-bold mb-3">
                  {gameType === "math" ? "Математическая молния" : "Английский квиз"}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {gameType === "math" ? "Решай примеры на скорость и зарабатывай коины!" : "Отвечай на вопросы и улучшай английский!"}
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={() => setGameType(null)}
                className="mb-6"
              >
                ← Назад к выбору игры
              </Button>

              {/* Game Mode Selection */}
              {gameType === "math" ? (
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
              ) : (
                <div className="bg-card border border-border/60 rounded-lg p-8 mb-8">
                  <h3 className="text-xl font-heading font-bold mb-6">Выбери тип вопросов</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setEnglishMode("vocabulary")}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        englishMode === "vocabulary"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">📚</div>
                      <div className="font-semibold">Словарный запас</div>
                    </button>
                    <button
                      onClick={() => setEnglishMode("grammar")}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        englishMode === "grammar"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">✏️</div>
                      <div className="font-semibold">Грамматика</div>
                    </button>
                    <button
                      onClick={() => setEnglishMode("reading")}
                      className={`p-6 rounded-lg border-2 transition-all ${
                        englishMode === "reading"
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-3xl mb-2">📖</div>
                      <div className="font-semibold">Чтение</div>
                    </button>
                  </div>
                </div>
              )}

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
              {gameType === "math" && currentQuestion && (
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

              {gameType === "english" && currentEnglishQuestion && (
                <div className="bg-card border-2 border-primary/40 rounded-lg p-8 mb-8">
                  <div className="text-2xl font-bold mb-8 text-center">
                    {currentEnglishQuestion.question}
                  </div>

                  <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
                    {currentEnglishQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedOption(index);
                          setTimeout(() => checkAnswer(), 100);
                        }}
                        disabled={isCorrect !== null}
                        className={`p-4 rounded-lg border-2 text-lg font-semibold transition-all ${
                          selectedOption === index && isCorrect === true
                            ? "border-green-500 bg-green-500/20"
                            : selectedOption === index && isCorrect === false
                            ? "border-red-500 bg-red-500/20"
                            : selectedOption === index
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {isCorrect === true && (
                    <div className="mt-6 text-2xl text-green-500 font-bold animate-bounce text-center">
                      ✓ Правильно!
                    </div>
                  )}
                  {isCorrect === false && (
                    <div className="mt-6 text-center">
                      <div className="text-2xl text-red-500 font-bold mb-2">
                        ✗ Неправильно
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Правильный ответ: {currentEnglishQuestion.options[currentEnglishQuestion.correctAnswer]}
                      </div>
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
