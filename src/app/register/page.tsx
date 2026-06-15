"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GraduationCap, Mail, Lock, User, GraduationCapIcon, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { ThemeToggle } from "@/components/theme-toggle";

const gradeOptions = ["8 класс", "9 класс", "10 класс", "11 класс", "Выпускник"];
const interestOptions = ["STEM", "Математика", "Физика", "Программирование", "IT", "Бизнес", "Английский язык", "Наука", "Социальное влияние"];
const roleOptions = [
  { value: "student", label: "Студент" },
  { value: "mentor", label: "Ментор" },
  { value: "admin", label: "Администратор" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [role, setRole] = useState<"student" | "mentor" | "admin">("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError("Заполните все обязательные поля");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      setIsLoading(false);
      return;
    }

    if (role === "student" && !grade) {
      setError("Выберите класс");
      setIsLoading(false);
      return;
    }

    if (role === "student" && interests.length === 0) {
      setError("Выберите хотя бы один интерес");
      setIsLoading(false);
      return;
    }

    const success = await register(name, email, password, grade, interests, role);

    if (success) {
      router.push("/dashboard");
    } else {
      setError("Пользователь с таким email уже существует");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold">Mentoria Hub</span>
            </Link>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Вход
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex-1 px-4 py-12 bg-muted/20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card border border-border/60 rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-heading font-bold mb-2">Создать аккаунт</h1>
              <p className="text-sm text-muted-foreground">
                Присоединяйся к Mentoria Hub и начни развиваться
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Я регистрируюсь как
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {roleOptions.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value as any)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        role === r.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/40"
                      }`}
                      disabled={isLoading}
                    >
                      <span className="font-medium text-sm">{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Имя <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Ваше имя"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Пароль <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Минимум 6 символов"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Подтвердите пароль <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Повторите пароль"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Student-specific fields */}
              {role === "student" && (
                <>
                  {/* Grade */}
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium mb-2">
                      Класс <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCapIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        disabled={isLoading}
                      >
                        <option value="">Выберите класс</option>
                        {gradeOptions.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Интересы <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                            interests.includes(interest)
                              ? "bg-primary text-white"
                              : "bg-background border border-border hover:border-primary/40"
                          }`}
                          disabled={isLoading}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Создание аккаунта..." : "Создать аккаунт"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Уже есть аккаунт?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Mentoria Hub. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
