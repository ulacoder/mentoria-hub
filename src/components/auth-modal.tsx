"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Mail, Lock, User, GraduationCap, BookOpen, Award } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

const interestOptions = [
  "Программирование",
  "IT",
  "Математика",
  "Физика",
  "Биология",
  "Химия",
  "Дизайн",
  "Искусство",
  "Музыка",
  "Спорт",
  "Языки",
  "Бизнес",
  "Маркетинг",
  "Робототехника",
  "Игры",
  "Кино"
];

export function AuthModal({ isOpen, onClose, redirectTo }: AuthModalProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as "student" | "mentor" | "admin",
    interests: [] as string[],
  });
  const [error, setError] = useState("");

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "login") {
      const success = await login(formData.email, formData.password);
      if (success) {
        onClose();
        if (redirectTo) {
          setTimeout(() => router.push(redirectTo), 100);
        } else {
          router.refresh();
        }
      } else {
        setError("Неверный email или пароль");
      }
    } else {
      if (formData.role === "student" && formData.interests.length === 0) {
        setError("Пожалуйста, выберите хотя бы один интерес");
        return;
      }
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        "—",
        formData.interests,
        formData.role
      );
      if (success) {
        onClose();
        if (redirectTo) {
          setTimeout(() => router.push(redirectTo), 100);
        } else {
          router.refresh();
        }
      } else {
        setError("Ошибка регистрации");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center p-4 pt-16">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-900 rounded-2xl border-4 border-red-500">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <GraduationCap className="w-8 h-8 text-purple-500" />
              <h2 className="text-2xl font-bold">Mentoria</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              {mode === "login" ? "Войти в систему" : "Создать аккаунт"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium mb-2">Роль</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "student" as const, label: "Студент", icon: BookOpen },
                      { value: "mentor" as const, label: "Ментор", icon: Award },
                      { value: "admin" as const, label: "Админ", icon: GraduationCap },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setFormData({ ...formData, role: value })}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          formData.role === value
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                            : "border-zinc-200 dark:border-zinc-700 hover:border-purple-300"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1 ${
                          formData.role === value ? "text-purple-500" : "text-zinc-400"
                        }`} />
                        <div className="text-xs font-medium">{label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests (только для студентов) */}
                {formData.role === "student" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Интересы (минимум 1)</label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            formData.interests.includes(interest)
                              ? "bg-purple-500 text-white shadow-md"
                              : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium shadow-lg shadow-purple-500/30 transition-all"
            >
              {mode === "login" ? "Войти" : "Зарегистрироваться"}
            </Button>

            {/* Toggle mode */}
            <div className="text-center text-sm">
              {mode === "login" ? (
                <p>
                  Нет аккаунта?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setError("");
                    }}
                    className="text-purple-500 hover:text-purple-600 font-medium"
                  >
                    Зарегистрироваться
                  </button>
                </p>
              ) : (
                <p>
                  Уже есть аккаунт?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setError("");
                    }}
                    className="text-purple-500 hover:text-purple-600 font-medium"
                  >
                    Войти
                  </button>
                </p>
              )}
            </div>

            {/* Test accounts (только в режиме логина) */}
            {mode === "login" && (
              <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm space-y-3">
                <h3 className="font-semibold text-center mb-2">📋 Тестовые аккаунты</h3>
                <div className="space-y-2">
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                    <div className="font-medium text-purple-500 mb-1">👨‍🏫 Ментор</div>
                    <div className="text-xs text-zinc-500 space-y-0.5">
                      <div>Email: <span className="font-mono text-zinc-900 dark:text-zinc-100">mentor@mentoria.kz</span></div>
                      <div>Пароль: <span className="font-mono text-zinc-900 dark:text-zinc-100">mentor123</span></div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg">
                    <div className="font-medium text-purple-500 mb-1">⚙️ Администратор</div>
                    <div className="text-xs text-zinc-500 space-y-0.5">
                      <div>Email: <span className="font-mono text-zinc-900 dark:text-zinc-100">admin@mentoria.kz</span></div>
                      <div>Пароль: <span className="font-mono text-zinc-900 dark:text-zinc-100">admin123</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg">
                  <div className="text-xs text-blue-700 dark:text-blue-300">
                    💡 <strong>Для студентов:</strong> Создавайте аккаунт самостоятельно через "Регистрацию", чтобы указать свои уникальные интересы и пройти тест на тип личности для персонализированных рекомендаций.
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
