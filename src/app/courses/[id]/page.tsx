"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Award,
  Loader2,
  ChevronRight,
  Trophy
} from "lucide-react";
import { getCourseById, Lesson, QuizQuestion } from "@/lib/courses-enhanced";

interface LessonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EnhancedCoursePage(props: LessonPageProps) {
  const params = await props.params;
  return <EnhancedCoursePageContent courseId={params.id} />;
}

function EnhancedCoursePageContent({ courseId }: { courseId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const courseIdNum = parseInt(courseId);
  const course = getCourseById(courseIdNum);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user || !course) {
    return null;
  }

  const currentLesson = course.lessons[currentLessonIndex];
  const progress = Math.round((completedLessons.length / course.lessons.length) * 100);
  const isLessonCompleted = completedLessons.includes(currentLesson.id);
  const isCourseCompleted = completedLessons.length === course.lessons.length;

  const handleCompleteLesson = () => {
    if (!isLessonCompleted) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
    setShowQuiz(true);
  };

  const handleQuizAnswer = (questionId: number, answer: string | number) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);

    const answers = currentLesson.quiz.map(q => ({
      questionId: q.id,
      question: q.question,
      userAnswer: quizAnswers[q.id] ?? "",
      correctAnswer: q.correctAnswer,
      type: q.type,
      explanation: q.explanation
    }));

    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.id,
          lessonId: currentLesson.id,
          courseName: course.title,
          lessonName: currentLesson.title,
          userName: user.name,
          answers
        })
      });

      if (!response.ok) throw new Error("Failed to check quiz");

      const result = await response.json();
      setQuizResult(result);
    } catch (error) {
      console.error("Quiz submission error:", error);
      alert("Произошла ошибка при проверке теста");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setShowQuiz(false);
      setQuizAnswers({});
      setQuizResult(null);
    }
  };

  const handleDownloadCertificate = () => {
    // Map course IDs to certificate files
    const certificateMap: Record<number, string> = {
      1: "/certmath.pdf",
      2: "/certeng.pdf",
      3: "/certsat.pdf"
    };

    const certificatePath = certificateMap[courseIdNum];
    if (certificatePath) {
      // Create download link
      const link = document.createElement('a');
      link.href = certificatePath;
      link.download = `Certificate_${course.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground mb-4">{course.description}</p>

            {/* Progress */}
            <ProgressBar progress={progress} />

            <div className="mt-2 text-sm text-muted-foreground">
              {completedLessons.length} из {course.lessons.length} уроков завершено
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Lessons List */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border/60 rounded-lg p-4 sticky top-4">
                <h3 className="font-heading font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Уроки курса
                </h3>
                <div className="space-y-2">
                  {course.lessons.map((lesson, idx) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    const isCurrent = idx === currentLessonIndex;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          setCurrentLessonIndex(idx);
                          setShowQuiz(false);
                          setQuizResult(null);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                          isCurrent
                            ? "bg-primary/10 border-2 border-primary"
                            : "hover:bg-muted border border-transparent"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{lesson.title}</div>
                          <div className="text-xs text-muted-foreground">{lesson.duration}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Certificate Button */}
                {isCourseCompleted && (
                  <div className="mt-6 pt-6 border-t">
                    <Button
                      onClick={handleDownloadCertificate}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Получить сертификат
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {!showQuiz && !quizResult ? (
                // Lesson Content
                <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-2xl font-heading font-bold mb-2">{currentLesson.title}</h2>
                    <p className="text-muted-foreground">{currentLesson.description}</p>
                  </div>

                  {/* Video */}
                  {currentLesson.videoUrl && (
                    <div className="aspect-video bg-black relative">
                      <iframe
                        src={currentLesson.videoUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title={currentLesson.title}
                      />
                    </div>
                  )}

                  {/* Lesson Content */}
                  <div className="p-6">
                    <div className="prose prose-sm max-w-none mb-6">
                      <p>{currentLesson.content}</p>
                    </div>

                    {/* Materials */}
                    {currentLesson.materials && currentLesson.materials.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Материалы урока
                        </h3>
                        <div className="space-y-2">
                          {currentLesson.materials.map((material, idx) => (
                            <a
                              key={idx}
                              href={material.url}
                              className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-colors"
                            >
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-sm">{material.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleCompleteLesson}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isLessonCompleted ? "Пройти тест еще раз" : "Завершить урок и пройти тест"}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ) : quizResult ? (
                // Quiz Results
                <div className="bg-card border border-border/60 rounded-lg p-6">
                  {/* Navi with feedback */}
                  <div className="flex items-start gap-4 mb-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <div className="w-16 h-16 flex-shrink-0">
                      <img src="/navi-character.png" alt="Navi" className="w-full h-full object-contain animate-float" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-2">Фидбек от Navi</h3>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{quizResult.feedback}</p>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-center mb-6 p-6 bg-muted/50 rounded-lg">
                    <div className="text-4xl font-bold mb-2">
                      {quizResult.score} / {quizResult.totalQuestions}
                    </div>
                    <div className="text-2xl font-semibold mb-2">
                      {quizResult.percentage}%
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      quizResult.passed ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
                    }`}>
                      {quizResult.passed ? (
                        <>
                          <Trophy className="w-5 h-5" />
                          <span className="font-semibold">Тест пройден!</span>
                        </>
                      ) : (
                        <span className="font-semibold">Попробуй еще раз</span>
                      )}
                    </div>
                  </div>

                  {/* Question Results */}
                  <div className="space-y-4 mb-6">
                    {quizResult.questionResults.map((result: any, idx: number) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-lg border-2 ${
                          result.correct ? "border-green-500 bg-green-500/5" : "border-red-500 bg-red-500/5"
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          {result.correct ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="font-semibold mb-1">{currentLesson.quiz[idx].question}</div>
                            <div className="text-sm text-muted-foreground mb-2">
                              Твой ответ: <span className={result.correct ? "text-green-600" : "text-red-600"}>
                                {result.userAnswer}
                              </span>
                              {!result.correct && (
                                <> • Правильный: <span className="text-green-600">{result.correctAnswer}</span></>
                              )}
                            </div>
                            <div className="text-sm bg-background/50 p-2 rounded">
                              {result.aiFeedback}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {currentLessonIndex < course.lessons.length - 1 && quizResult.passed && (
                      <Button onClick={handleNextLesson} className="flex-1">
                        Следующий урок
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    <Button
                      onClick={() => {
                        setShowQuiz(true);
                        setQuizResult(null);
                        setQuizAnswers({});
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Пройти тест еще раз
                    </Button>
                  </div>
                </div>
              ) : (
                // Quiz
                <div className="bg-card border border-border/60 rounded-lg p-6">
                  <h2 className="text-2xl font-heading font-bold mb-6">Тест по уроку: {currentLesson.title}</h2>

                  <div className="space-y-6">
                    {currentLesson.quiz.map((question, idx) => (
                      <div key={question.id} className="p-4 bg-muted/30 rounded-lg">
                        <div className="font-semibold mb-3">
                          {idx + 1}. {question.question}
                        </div>

                        {question.type === "multiple_choice" && question.options && (
                          <div className="space-y-2">
                            {question.options.map((option, optIdx) => (
                              <label
                                key={optIdx}
                                className="flex items-center gap-3 p-3 rounded hover:bg-background cursor-pointer border-2 transition-colors"
                                style={{
                                  borderColor: quizAnswers[question.id] === optIdx ? "var(--primary)" : "transparent"
                                }}
                              >
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={optIdx}
                                  checked={quizAnswers[question.id] === optIdx}
                                  onChange={() => handleQuizAnswer(question.id, optIdx)}
                                  className="w-4 h-4"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {question.type === "true_false" && (
                          <div className="flex gap-3">
                            <Button
                              variant={quizAnswers[question.id] === 0 ? "default" : "outline"}
                              onClick={() => handleQuizAnswer(question.id, 0)}
                              className="flex-1"
                            >
                              Да
                            </Button>
                            <Button
                              variant={quizAnswers[question.id] === 1 ? "default" : "outline"}
                              onClick={() => handleQuizAnswer(question.id, 1)}
                              className="flex-1"
                            >
                              Нет
                            </Button>
                          </div>
                        )}

                        {question.type === "short_answer" && (
                          <input
                            type="text"
                            value={quizAnswers[question.id] || ""}
                            onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                            placeholder="Введи ответ..."
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={isSubmitting || Object.keys(quizAnswers).length < currentLesson.quiz.length}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Проверяю...
                        </>
                      ) : (
                        "Отправить ответы"
                      )}
                    </Button>
                    <Button
                      onClick={() => setShowQuiz(false)}
                      variant="outline"
                    >
                      Вернуться к уроку
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
