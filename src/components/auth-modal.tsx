"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectTo?: string;
}

export function AuthModal({ isOpen, onClose, redirectTo }: AuthModalProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    grade: "9 класс",
    role: "student" as "student" | "mentor" | "admin",
    interests: [] as string[],
  });
  const [error, setError] = useState("");

  const interestOptions = ["STEM", "Программирование", "Бизнес", "IT", "Математика", "Физика", "Социальное влияние"];

  if (!isOpen) return null;

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
        setError("Выберите хотя бы один интерес");
        return;
      }
      const success = await register(
        formData.name,
        formData.email,
        formData.password,
        formData.grade,
        formData.interests,
        formData.role
      );
      if (success) {
        onClose();
        if (formData.role === "student") {
          setTimeout(() => router.push("/profile/setup"), 100);
        } else if (redirectTo) {
          setTimeout(() => router.push(redirectTo), 100);
        } else {
          setTimeout(() => router.push("/dashboard"), 100);
        }
      } else {
        setError("Пользователь с таким email уже существует");
      }
    }
  };

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({ ...formData, interests: formData.interests.filter(i => i !== interest) });
    } else {
      setFormData({ ...formData, interests: [...formData.interests, interest] });
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-[9999] w-[95vw] max-w-[420px] max-h-[80vh] overflow-hidden">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold">
              {mode === "login" ? "Вход" : "Регистрация"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(85vh-70px)]">
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              {error && (
                <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg border border-red-200 dark:border-red-900">
                  {error}
                </div>
              )}

              {mode === "register" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        placeholder="Ваше имя"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Роль</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "student", emoji: "🎓", label: "Студент" },
                        { value: "mentor", emoji: "👨‍🏫", label: "Ментор" },
                        { value: "admin", emoji: "⚙️", label: "Админ" }
                      ].map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, role: role.value as any })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.role === role.value
                              ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                              : "border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                          }`}
                        >
                          <div className="text-2xl mb-1">{role.emoji}</div>
                          <div className="text-xs font-medium">{role.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.role === "student" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Класс</label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {["8 класс", "9 класс", "10 класс", "11 класс"].map(grade => (
                            <option key={grade}>{grade}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Интересы (минимум 1)</label>
                        <div className="flex flex-wrap gap-2">
                          {interestOptions.map((interest) => (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                formData.interests.includes(interest)
                                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                                  : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                              }`}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Пароль</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium shadow-lg shadow-purple-500/30 transition-all"
              >
                {mode === "login" ? "Войти" : "Зарегистрироваться"}
              </Button>

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
                </div>
              )}

              {mode === "register" && formData.role === "student" && (
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-900 text-sm">
                  <div className="flex gap-2 items-start">
                    <div className="text-lg">💡</div>
                    <div>
                      <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Для студентов</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        Создавайте аккаунт самостоятельно, чтобы указать свои интересы и пройти тест на тип личности.
                        Это поможет платформе подобрать для вас персонализированные курсы и менторов!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
