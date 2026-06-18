import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface RoadmapRequest {
  targetUniversity: string;
  currentGrade: string;
  currentLocation: string;
  achievements: string[];
  competitions: string[];
  research: string[];
  leadership: string[];
  volunteering: string[];
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

interface RoadmapResponse {
  progress: number;
  feedback: string;
  milestones: Milestone[];
  recommendations: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RoadmapRequest = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });

    const prompt = `Ты эксперт по поступлению в топовые университеты мира. Проанализируй профиль студента и создай детальный роадмап.

**Профиль студента:**
- Целевой университет: ${body.targetUniversity}
- Текущий класс: ${body.currentGrade}
- Локация: ${body.currentLocation}
- Олимпиады и конкурсы: ${body.competitions.join(", ") || "нет"}
- Исследования и проекты: ${body.research.join(", ") || "нет"}
- Лидерство: ${body.leadership.join(", ") || "нет"}
- Волонтерство: ${body.volunteering.join(", ") || "нет"}
- Другие достижения: ${body.achievements.join(", ") || "нет"}

**Твоя задача:**

1. **Оцени прогресс (0-100%)** - насколько студент готов к поступлению в ${body.targetUniversity}. Учитывай: достижения, соответствие требованиям университета, глубину портфолио.

2. **Дай развернутый фидбек (200-300 слов):**
   - Сильные стороны профиля
   - Слабые места и пробелы
   - Что выделяет студента
   - Над чем нужно работать
   - Реалистичны ли шансы поступления

3. **Создай роадмап из 8-12 milestones (станций):**
   Каждый milestone должен быть конкретным действием с указанием:
   - В каком классе выполнить (9, 10, 11, 12)
   - Категория: competition/research/leadership/volunteering/academic
   - Приоритет: high/medium/low
   - Конкретное название и описание

**Верни ТОЛЬКО валидный JSON в таком формате:**
{
  "progress": 45,
  "feedback": "Твой профиль показывает...",
  "milestones": [
    {
      "id": 1,
      "title": "Выиграть международную олимпиаду по математике",
      "description": "Участвуй в IMO или regional competitions. Цель: золото или серебро.",
      "grade": "10 класс",
      "category": "competition",
      "completed": false,
      "priority": "high"
    }
  ],
  "recommendations": [
    "Фокусируйся на глубине, а не ширине - лучше 2-3 серьезных проекта чем 10 поверхностных",
    "Для ${body.targetUniversity} критически важны исследования - начни работу с научным руководителем"
  ]
}

НЕ ПИШИ НИЧЕГО КРОМЕ JSON. Начинай ответ с {`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up response - remove markdown code blocks if present
    let cleanedResponse = responseText.trim();
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse.replace(/^```json\n/, "").replace(/\n```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse.replace(/^```\n/, "").replace(/\n```$/, "");
    }

    const roadmap: RoadmapResponse = JSON.parse(cleanedResponse);

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("Roadmap generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
