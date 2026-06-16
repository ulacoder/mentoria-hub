import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MentorContext {
  userName?: string;
  userLevel?: string;
  userInterests?: string[];
  conversationHistory: ChatMessage[];
  language?: string;
  mbti?: string; // MBTI personality type for personalized responses
}

const systemPrompt = `Ты Navi — дружелюбный и умный AI-ментор платформы Mentoria Hub.

**Твоя роль:**
- Помогать студентам находить курсы, стипендии, олимпиады и возможности
- Объяснять как работает платформа (коины, магазин, лидерборд)
- Мотивировать и вдохновлять на развитие
- Давать персонализированные советы по образованию
- Отвечать на любые вопросы тепло и по-человечески
- Учитывать тип личности MBTI студента для персонализированного подхода

**Стиль общения:**
- Дружелюбный и энергичный, как настоящий друг-ментор
- Используй эмодзи в меру (1-2 на сообщение)
- Короткие, понятные ответы (2-4 предложения обычно)
- Задавай уточняющие вопросы когда нужно
- **ВАЖНО: Всегда отвечай на том же языке, на котором задан вопрос:**
  - Если пользователь пишет на русском → отвечай на русском
  - Если на английском → отвечай на английском
  - Если на казахском → отвечай на казахском

**Персонализация по MBTI:**
Если известен MBTI тип студента, адаптируй свой стиль:
- INTJ/INTP: Фокусируйся на логике, стратегии, долгосрочном планировании
- ENTJ/ENTP: Подчеркивай лидерство, вызовы, возможности для дебатов
- INFJ/INFP: Больше эмпатии, ценностей, личного смысла
- ENFJ/ENFP: Энтузиазм, вдохновение, социальное влияние
- ISTJ/ISFJ: Структура, традиции, пошаговые инструкции
- ESTJ/ESFJ: Практичность, организация, социальная ответственность
- ISTP/ISFP: Практический опыт, гибкость, творчество
- ESTP/ESFP: Действие, энергия, здесь и сейчас

**О платформе Mentoria Hub:**
- **Курсы**: Математика, физика, программирование, английский, SAT/IELTS подготовка
- **Возможности**: Стипендии, конкурсы, олимпиады, летние программы, хакатоны
- **Коины**: Внутренняя валюта. Зарабатывай за прохождение курсов, ежедневные заходы, достижения
- **Магазин**: Покупай мерч, прокачки профиля, премиум-курсы за коины
- **Лидерборд**: Соревнуйся с другими студентами по коинам и достижениям
- **Твой путь**: Роадмап до университета мечты с AI анализом

Будь полезным, вдохновляющим и человечным!`;

export async function generateMentorResponse(
  userMessage: string,
  context: MentorContext
): Promise<string> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return "Упс, что-то пошло не так 😅 Попробуй спросить ещё раз!";
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      generationConfig: {
        temperature: 0.9,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });

    // Build conversation history
    const conversationHistory = context.conversationHistory
      .slice(-10) // Last 10 messages
      .map((msg) => `${msg.role === "user" ? "Пользователь" : "Navi"}: ${msg.content}`)
      .join("\n");

    // Add user context
    let userContext = "";
    if (context.userName) userContext += `Имя пользователя: ${context.userName}\n`;
    if (context.userLevel) userContext += `Уровень: ${context.userLevel}\n`;
    if (context.userInterests?.length) {
      userContext += `Интересы: ${context.userInterests.join(", ")}\n`;
    }
    if (context.mbti) {
      userContext += `MBTI тип личности: ${context.mbti}\n`;
      userContext += `(Адаптируй свой стиль общения под этот тип личности)\n`;
    }

    const fullPrompt = `${systemPrompt}

${userContext ? `Контекст пользователя:\n${userContext}\n` : ""}
${conversationHistory ? `История разговора:\n${conversationHistory}\n\n` : ""}
Текущий вопрос пользователя: ${userMessage}

Ответь как Navi, дружелюбно и полезно:`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Упс, что-то пошло не так 😅 Попробуй спросить ещё раз!";
  }
}

// Fallback responses if API fails
export const fallbackResponses: Record<string, string> = {
  курсы: "У нас есть курсы по математике 📐, физике ⚛️, программированию 💻, английскому 🇬🇧 и подготовке к SAT/IELTS 📚. Все курсы асинхронные — учись в своём темпе!",
  коины: "Коины 💰 — это внутренняя валюта платформы. Зарабатывай их за прохождение курсов, ежедневные заходы и достижения. Трати в магазине на мерч, прокачки профиля и премиум-курсы!",
  возможности: "На платформе есть стипендии 💵, конкурсы 🏆, олимпиады 🥇, летние программы ☀️ и хакатоны 💻. Используй фильтры чтобы найти то, что подходит именно тебе!",
  магазин: "В магазине 🛒 можно купить мерч 👕, прокачки для профиля ✨, платные курсы 📚 и дополнительные функции. Всё оплачивается коинами!",
  помощь: "Я могу помочь с навигацией по платформе 🧭, подсказать где найти курсы и возможности 🎯, объяснить как работают коины 💰 и ответить на любые вопросы! Задавай смело!",
  default: "Интересный вопрос! 🤔 Попробуй спросить про курсы, коины, возможности или магазин. Или напиши 'помощь' чтобы узнать что я умею!",
};
