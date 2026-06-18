import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface MBTIAnalysisRequest {
  mbti: string;
  userName: string;
  grade: string;
  interests: string[];
}

interface MBTIAnalysisResponse {
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  mentorGuidance: string;
  learningStyle: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: MBTIAnalysisRequest = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
    });

    const prompt = `Ты эксперт по психологии и типологии MBTI, работающий с платформой Mentoria Hub для школьников.

**Профиль студента:**
- Имя: ${body.userName}
- Класс: ${body.grade}
- Интересы: ${body.interests.join(", ")}
- MBTI тип: ${body.mbti}

**Твоя задача:**
Создай детальный персонализированный анализ для этого студента на основе его MBTI типа. Используй знания о том, как ${body.mbti} учатся, общаются, принимают решения и работают.

Верни ТОЛЬКО валидный JSON в таком формате:
{
  "feedback": "Персональное приветствие и общий анализ личности студента (200-300 слов). Объясни что значит быть ${body.mbti}, как это проявляется в учебе и жизни. Будь теплым и мотивирующим.",
  "strengths": [
    "Сильная сторона 1 специфичная для ${body.mbti}",
    "Сильная сторона 2",
    "Сильная сторона 3",
    "Сильная сторона 4"
  ],
  "weaknesses": [
    "Область для развития 1 (формулируй позитивно, как возможность роста)",
    "Область для развития 2",
    "Область для развития 3"
  ],
  "mentorGuidance": "Конкретные рекомендации для менторов: как лучше общаться с ${body.mbti}, какой подход использовать, на что обратить внимание, как мотивировать (150-200 слов)",
  "learningStyle": "Как ${body.mbti} лучше всего усваивает информацию и какие методы обучения наиболее эффективны"
}

НЕ ПИШИ НИЧЕГО КРОМЕ JSON. Начинай ответ с {`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up response
    let cleanedResponse = responseText.trim();
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse.replace(/^```json\n/, "").replace(/\n```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse.replace(/^```\n/, "").replace(/\n```$/, "");
    }

    const analysis: MBTIAnalysisResponse = JSON.parse(cleanedResponse);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("MBTI analysis error:", error);
    return NextResponse.json(
      { error: "Failed to generate analysis", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
