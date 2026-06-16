import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface QuizAnswer {
  questionId: number;
  question: string;
  userAnswer: string | number;
  correctAnswer: string | number;
  type: "multiple_choice" | "true_false" | "short_answer";
  explanation: string;
}

interface QuizSubmission {
  courseId: number;
  lessonId: number;
  courseName: string;
  lessonName: string;
  userName: string;
  answers: QuizAnswer[];
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  feedback: string; // Personalized feedback from Navi
  questionResults: {
    questionId: number;
    correct: boolean;
    userAnswer: string | number;
    correctAnswer: string | number;
    explanation: string;
    aiFeedback: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const submission: QuizSubmission = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Calculate score
    let correctCount = 0;
    const questionResults = submission.answers.map(answer => {
      let isCorrect = false;

      if (answer.type === "short_answer") {
        // Normalize answers for comparison
        const userAns = String(answer.userAnswer).trim().toLowerCase();
        const correctAns = String(answer.correctAnswer).trim().toLowerCase();
        isCorrect = userAns === correctAns;
      } else {
        isCorrect = answer.userAnswer === answer.correctAnswer;
      }

      if (isCorrect) correctCount++;

      return {
        questionId: answer.questionId,
        correct: isCorrect,
        userAnswer: answer.userAnswer,
        correctAnswer: answer.correctAnswer,
        explanation: answer.explanation,
        aiFeedback: "" // Will be filled by AI
      };
    });

    const totalQuestions = submission.answers.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= 70;

    // Generate AI feedback from Navi
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
      },
    });

    const questionsInfo = submission.answers.map((a, idx) =>
      `Вопрос ${idx + 1}: ${a.question}
       Ответ студента: ${a.userAnswer}
       Правильный ответ: ${a.correctAnswer}
       Результат: ${questionResults[idx].correct ? "✓ Верно" : "✗ Неверно"}`
    ).join("\n\n");

    const prompt = `Ты Navi, дружелюбный AI-ментор платформы Mentoria Hub. Студент ${submission.userName} только что прошел тест по уроку "${submission.lessonName}" из курса "${submission.courseName}".

**Результаты теста:**
- Правильных ответов: ${correctCount} из ${totalQuestions}
- Процент: ${percentage}%
- Статус: ${passed ? "Тест пройден ✓" : "Тест не пройден"}

**Детали по вопросам:**
${questionsInfo}

**Твоя задача:**
Напиши теплый, мотивирующий и персональный фидбек для студента (150-250 слов). Включи:

1. **Поздравление или подбадривание** (в зависимости от результата)
   - Если >= 90%: отметь отличный результат, похвали
   - Если 70-89%: хороший результат, но есть над чем работать
   - Если < 70%: не расстраивайся, это нормально, попробуй еще раз

2. **Анализ ошибок**: если были неправильные ответы, объясни что именно студент не понял и как это исправить

3. **Конкретные советы**: что повторить, на что обратить внимание

4. **Мотивация**: вдохнови продолжать учиться

Пиши на русском, дружелюбно, с легким использованием эмодзи (1-2). Будь как настоящий ментор который заботится об успехе студента!`;

    const result = await model.generateContent(prompt);
    const naviFeedback = result.response.text();

    // Generate individual feedback for wrong answers
    for (let i = 0; i < questionResults.length; i++) {
      if (!questionResults[i].correct) {
        const detailPrompt = `Студент неправильно ответил на вопрос: "${submission.answers[i].question}"
Его ответ: ${submission.answers[i].userAnswer}
Правильный ответ: ${submission.answers[i].correctAnswer}

Объясни коротко (1-2 предложения), почему его ответ неверен и как правильно думать об этом. Будь поддерживающим и конструктивным.`;

        const detailResult = await model.generateContent(detailPrompt);
        questionResults[i].aiFeedback = detailResult.response.text();
      } else {
        questionResults[i].aiFeedback = "Отлично! Ты правильно понял эту концепцию 🎉";
      }
    }

    const quizResult: QuizResult = {
      score: correctCount,
      totalQuestions,
      percentage,
      passed,
      feedback: naviFeedback,
      questionResults
    };

    return NextResponse.json(quizResult);
  } catch (error) {
    console.error("Quiz check error:", error);
    return NextResponse.json(
      { error: "Failed to check quiz", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
