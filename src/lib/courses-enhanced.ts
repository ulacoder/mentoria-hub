// Enhanced course structure with lessons, videos, and quizzes

export interface QuizQuestion {
  id: number;
  question: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  options?: string[]; // For multiple choice
  correctAnswer: string | number; // Answer text or option index
  explanation: string; // AI will expand on this
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string; // YouTube embed URL
  materials?: { name: string; url: string }[]; // PDF, slides, etc.
  content: string; // Lesson text content
  quiz: QuizQuestion[];
  completed?: boolean;
}

export interface EnhancedCourse {
  id: number;
  title: string;
  category: string;
  level: "Начальный" | "Средний" | "Продвинутый";
  duration: string;
  totalLessons: number;
  cost: string;
  keywords: string[];
  description: string;
  fullDescription: string;
  instructor: string;
  instructorBio: string;
  image?: string;
  objectives: string[];
  lessons: Lesson[];
}

export const enhancedCoursesData: EnhancedCourse[] = [
  {
    id: 1,
    title: "Основы математики",
    category: "Математика",
    level: "Начальный",
    duration: "8 недель",
    totalLessons: 12,
    cost: "Бесплатно",
    keywords: ["математика", "алгебра", "геометрия", "начальный", "бесплатно"],
    description: "Фундаментальные концепции математики для учеников 9-10 классов",
    fullDescription: "Этот курс охватывает ключевые темы алгебры и геометрии, необходимые для успешного обучения в старших классах. Каждый урок включает видео-объяснения, практические задачи и мини-тесты с персональным фидбеком от AI ментора Navi.",
    instructor: "Арман Нұрланов",
    instructorBio: "Кандидат физико-математических наук, преподаватель с опытом 10+ лет",
    image: "/course-math.jpg",
    objectives: [
      "Освоить основы алгебры и геометрии",
      "Научиться решать типовые задачи",
      "Подготовиться к более сложным темам",
      "Развить математическое мышление"
    ],
    lessons: [
      {
        id: 1,
        title: "Введение в алгебру",
        description: "Основные понятия алгебры, переменные и уравнения",
        duration: "45 минут",
        videoUrl: "https://www.youtube.com/embed/c7USHklkK4w",
        content: "В этом уроке мы изучим основы алгебры: что такое переменные, как составлять и решать простые уравнения. Вы узнаете о математических операциях и их свойствах.",
        materials: [
          { name: "Конспект урока", url: "#" },
          { name: "Практические задачи", url: "#" }
        ],
        quiz: [
          {
            id: 1,
            question: "Что такое переменная в алгебре?",
            type: "multiple_choice",
            options: [
              "Постоянное число",
              "Символ, представляющий неизвестное значение",
              "Математическая операция",
              "Тип уравнения"
            ],
            correctAnswer: 1,
            explanation: "Переменная - это символ (обычно буква), который представляет неизвестное или изменяющееся значение."
          },
          {
            id: 2,
            question: "Решите уравнение: x + 5 = 12",
            type: "short_answer",
            correctAnswer: "7",
            explanation: "Чтобы найти x, вычитаем 5 из обеих сторон: x = 12 - 5 = 7"
          },
          {
            id: 3,
            question: "Верно ли, что 2x = x + x?",
            type: "true_false",
            options: ["Да", "Нет"],
            correctAnswer: 0,
            explanation: "Да, это верно! 2x означает 'два раза x', что равно x + x."
          }
        ]
      },
      {
        id: 2,
        title: "Линейные уравнения",
        description: "Решение линейных уравнений с одной переменной",
        duration: "50 минут",
        videoUrl: "https://www.youtube.com/embed/tpQMzkVR9BM",
        content: "Линейные уравнения - это уравнения первой степени. Научимся решать их пошагово и проверять ответы.",
        materials: [
          { name: "Методичка", url: "#" },
          { name: "Дополнительные задачи", url: "#" }
        ],
        quiz: [
          {
            id: 1,
            question: "Решите уравнение: 3x - 7 = 14",
            type: "short_answer",
            correctAnswer: "7",
            explanation: "3x = 14 + 7 = 21, значит x = 21/3 = 7"
          },
          {
            id: 2,
            question: "Какой первый шаг при решении уравнения 5x + 3 = 18?",
            type: "multiple_choice",
            options: [
              "Разделить обе части на 5",
              "Вычесть 3 из обеих частей",
              "Умножить обе части на 5",
              "Прибавить 3 к обеим частям"
            ],
            correctAnswer: 1,
            explanation: "Сначала избавляемся от свободного члена, вычитая 3 из обеих частей."
          }
        ]
      },
      {
        id: 3,
        title: "Квадратные уравнения",
        description: "Введение в квадратные уравнения и методы их решения",
        duration: "60 минут",
        videoUrl: "https://www.youtube.com/embed/XMqp5p950jo",
        content: "Квадратные уравнения имеют вид ax² + bx + c = 0. Изучим формулу корней и дискриминант.",
        quiz: [
          {
            id: 1,
            question: "Сколько корней может иметь квадратное уравнение?",
            type: "multiple_choice",
            options: ["Только 1", "Только 2", "0, 1 или 2", "Бесконечно много"],
            correctAnswer: 2,
            explanation: "Квадратное уравнение может иметь 0 (нет действительных корней), 1 (один корень) или 2 корня."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Английский для академического успеха",
    category: "Английский",
    level: "Средний",
    duration: "10 недель",
    totalLessons: 15,
    cost: "Платно: 15,000 тг",
    keywords: ["английский", "язык", "IELTS", "TOEFL", "академический", "платно"],
    description: "Академический английский для поступления в зарубежные университеты",
    fullDescription: "Курс фокусируется на навыках, необходимых для успешного обучения на английском: академическое письмо, чтение научных текстов, презентации и участие в дискуссиях.",
    instructor: "Sarah Johnson",
    instructorBio: "Преподаватель английского языка с 15-летним опытом подготовки к IELTS и TOEFL",
    image: "/course-english.png",
    objectives: [
      "Развить навыки академического письма",
      "Научиться понимать научные тексты",
      "Улучшить разговорные навыки",
      "Подготовиться к IELTS/TOEFL"
    ],
    lessons: [
      {
        id: 1,
        title: "Academic Writing Basics",
        description: "Основы академического стиля письма",
        duration: "40 минут",
        videoUrl: "https://www.youtube.com/embed/-AFiwqpU9s0",
        content: "Learn the fundamental principles of academic writing: formal tone, structure, and citation.",
        quiz: [
          {
            id: 1,
            question: "Which sentence is more academic?",
            type: "multiple_choice",
            options: [
              "I think that this is really important",
              "This appears to be significant",
              "It's super important, you know",
              "Everyone knows this is important"
            ],
            correctAnswer: 1,
            explanation: "Academic writing uses formal language and avoids personal pronouns and colloquialisms."
          }
        ]
      },
      {
        id: 2,
        title: "Essay Structure",
        description: "Структура академического эссе",
        duration: "50 минут",
        videoUrl: "https://www.youtube.com/embed/7P4fzbzwwAg",
        content: "Introduction, body paragraphs, and conclusion - learn how to structure your essays effectively.",
        quiz: [
          {
            id: 1,
            question: "What should an introduction paragraph include?",
            type: "multiple_choice",
            options: [
              "Only the thesis statement",
              "Background information, thesis statement, and outline",
              "Detailed arguments",
              "The conclusion"
            ],
            correctAnswer: 1,
            explanation: "A good introduction provides context, states the thesis, and outlines the main points."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Подготовка к SAT",
    category: "SAT/IELTS",
    level: "Продвинутый",
    duration: "12 недель",
    totalLessons: 20,
    cost: "Платно: 25,000 тг",
    keywords: ["SAT", "тест", "экзамен", "подготовка", "университет", "платно"],
    description: "Полная подготовка к SAT: Math, Reading, Writing",
    fullDescription: "Comprehensive SAT preparation covering all sections with practice tests, strategies, and personalized feedback.",
    instructor: "Michael Chen",
    instructorBio: "SAT expert with 1500+ score, helped 200+ students achieve their target scores",
    image: "/course-sat.png",
    objectives: [
      "Master SAT Math concepts",
      "Improve Reading comprehension",
      "Excel in Writing and Language",
      "Learn test-taking strategies"
    ],
    lessons: [
      {
        id: 1,
        title: "SAT Overview and Strategy",
        description: "Understanding the SAT format and developing a winning strategy",
        duration: "45 минут",
        videoUrl: "https://www.youtube.com/embed/Px11RsQZWJI",
        content: "Learn about SAT structure, scoring, and time management strategies.",
        quiz: [
          {
            id: 1,
            question: "How many sections are on the SAT?",
            type: "multiple_choice",
            options: ["2", "3", "4", "5"],
            correctAnswer: 0,
            explanation: "The SAT has 2 main sections: Math and Evidence-Based Reading and Writing."
          }
        ]
      }
    ]
  }
];

export function getCourseById(id: number): EnhancedCourse | undefined {
  return enhancedCoursesData.find(course => course.id === id);
}

export function getAllEnhancedCourses(): EnhancedCourse[] {
  return enhancedCoursesData;
}

// Alias for compatibility
export function getCourses(): EnhancedCourse[] {
  return enhancedCoursesData;
}

// Type alias for compatibility
export type Course = EnhancedCourse;
