# Mentoria Hub - Настройка базы данных

## Шаги для настройки Supabase

### 1. Создание проекта Supabase
1. Зайди на https://supabase.com
2. Создай новый проект
3. Скопируй **Project URL** и **Anon Key** из настроек проекта

### 2. Настройка переменных окружения
Открой файл `.env.local` и замени:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Инициализация базы данных
1. Зайди в свой проект Supabase
2. Перейди в раздел **SQL Editor**
3. Скопируй содержимое файла `supabase-init.sql`
4. Вставь в SQL Editor и выполни запрос

### 4. Тестовые аккаунты
После инициализации БД будут созданы:
- **Ментор**: `mentor@mentoria.kz` / `mentor123`
- **Админ**: `admin@mentoria.kz` / `admin123`

### 5. Функционал

#### Для ментора:
- ✅ Видит всех реальных студентов из БД
- ✅ Видит MBTI личность каждого студента
- ✅ Видит AI анализ личности
- ✅ Может писать студентам

#### Для админа:
- ✅ Добавление/редактирование/удаление курсов
- ✅ Добавление/редактирование/удаление возможностей
- ✅ Управление пользователями

### 6. API Endpoints

#### Users
- `GET /api/users` - Получить всех пользователей
- `POST /api/users` - Создать пользователя
- `DELETE /api/users?id={id}` - Удалить пользователя

#### Courses
- `GET /api/courses` - Получить все курсы
- `POST /api/courses` - Создать курс
- `PUT /api/courses` - Обновить курс
- `DELETE /api/courses?id={id}` - Удалить курс

#### Opportunities
- `GET /api/opportunities` - Получить все возможности
- `POST /api/opportunities` - Создать возможность
- `PUT /api/opportunities` - Обновить возможность
- `DELETE /api/opportunities?id={id}` - Удалить возможность

## Запуск проекта
```bash
npm run dev
```

Проект будет доступен на http://localhost:3000
