"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Mail, Lock, User, GraduationCapIcon } from "lucide-react";
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
        // Redirect students to profile setup
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
    <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="bg-card border border-border/60 rounded-lg w-full max-w-md my-8 max-h-[calc(100vh-4rem)] shadow-2xl">
        <div className="sticky top-0 bg-card border-b border-border/40 p-4 flex items-center justify-between z-10 rounded-t-lg">
          <h2 className="text-xl font-heading font-bold">
            {mode === "login" ? "Вход в аккаунт" : "Регистрация"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {mode === "register" && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">Имя</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ваше имя"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Роль</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "student" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "student"
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <div className="text-2xl mb-1">🎓</div>
                    <div className="text-xs font-medium">Студент</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Учусь и развиваюсь</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "mentor" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "mentor"
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <div className="text-2xl mb-1">👨‍🏫</div>
                    <div className="text-xs font-medium">Ментор</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Помогаю студентам</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "admin" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "admin"
                        ? "border-primary bg-primary/10"
                        : "border-border/60 hover:border-primary/40"
                    }`}
                  >
                    <div className="text-2xl mb-1">⚙️</div>
                    <div className="text-xs font-medium">Админ</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Управляю платформой</div>
                  </button>
                </div>
              </div>

              {formData.role === "student" && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Класс</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option>8 класс</option>
                      <option>9 класс</option>
                      <option>10 класс</option>
                      <option>11 класс</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Интересы (выберите минимум 1)</label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1 rounded-full text-sm transition-all ${
                            formData.interests.includes(interest)
                              ? "bg-primary text-white"
                              : "bg-muted hover:bg-muted/80"
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
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
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
                  className="text-primary hover:underline font-medium"
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
                  className="text-primary hover:underline font-medium"
                >
                  Войти
                </button>
              </p>
            )}
          </div>

          {mode === "login" && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border/40 text-sm space-y-3">
              <h3 className="font-semibold text-center mb-2">📋 Тестовые аккаунты</h3>

              <div className="space-y-2">
                <div className="bg-background/80 p-3 rounded-md">
                  <div className="font-medium text-primary mb-1">👨‍🏫 Ментор</div>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Email: <span className="font-mono text-foreground">mentor@mentoria.kz</span></div>
                    <div>Пароль: <span className="font-mono text-foreground">mentor123</span></div>
                  </div>
                </div>

                <div className="bg-background/80 p-3 rounded-md">
                  <div className="font-medium text-primary mb-1">⚙️ Администратор</div>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    <div>Email: <span className="font-mono text-foreground">admin@mentoria.kz</span></div>
                    <div>Пароль: <span className="font-mono text-foreground">admin123</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === "register" && formData.role === "student" && (
            <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-sm">
              <div className="flex gap-2 items-start">
                <div className="text-lg">💡</div>
                <div>
                  <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Для студентов</div>
                  <div className="text-xs text-muted-foreground">
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
  );
}
