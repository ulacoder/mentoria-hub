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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === "login" ? "Вход" : "Регистрация"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {mode === "register" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
                        className={`p-3 rounded-lg border-2 transition-all ${
                          formData.role === role.value
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : "border-gray-300 dark:border-gray-700 hover:border-purple-300"
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
                        className="w-full px-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
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
                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                              formData.interests.includes(interest)
                                ? "bg-purple-500 text-white"
                                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
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
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2.5 rounded-lg font-medium transition-colors"
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
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm space-y-2">
                <h3 className="font-semibold text-center mb-2">📋 Тестовые аккаунты</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="font-medium text-purple-500 mb-1">👨‍🏫 Ментор</div>
                    <div className="text-xs text-gray-500">
                      <div>Email: <span className="font-mono">mentor@mentoria.kz</span></div>
                      <div>Пароль: <span className="font-mono">mentor123</span></div>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                    <div className="font-medium text-purple-500 mb-1">⚙️ Администратор</div>
                    <div className="text-xs text-gray-500">
                      <div>Email: <span className="font-mono">admin@mentoria.kz</span></div>
                      <div>Пароль: <span className="font-mono">admin123</span></div>
                    </div>
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
