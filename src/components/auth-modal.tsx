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
    role: "student" as "student",
    interests: [] as string[],
  });
  const [error, setError] = useState("");

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
    "Кино",
    "STEM",
    "Социальное влияние"
  ];

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
      if (formData.interests.length === 0) {
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
        setTimeout(() => router.push("/profile/setup"), 100);
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
                  <option>12 класс</option>
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
        </form>
        </div>
      </div>
    </div>
  );
}
