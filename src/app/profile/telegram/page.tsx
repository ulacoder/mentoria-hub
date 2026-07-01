"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle, XCircle } from "lucide-react";

export default function TelegramSettingsPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [chatId, setChatId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/telegram", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          telegramChatId: chatId,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Telegram успешно привязан!");
        if (updateUser) {
          updateUser({ ...user, telegramChatId: chatId });
        }
      } else {
        setStatus("error");
        setMessage("Ошибка привязки. Проверь код.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Ошибка сервера.");
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    setLoading(true);
    try {
      await fetch("/api/telegram", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          message: "🎉 Тестовое уведомление! Всё работает!",
          type: "test",
        }),
      });
      setStatus("success");
      setMessage("Тестовое сообщение отправлено!");
    } catch (error) {
      setStatus("error");
      setMessage("Ошибка отправки.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-card border rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Настройки Telegram</h1>

          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h3 className="font-semibold text-blue-500 mb-2">📱 Как подключить:</h3>
              <ol className="text-sm space-y-2 text-muted-foreground">
                <li>1. Открой Telegram и найди бота: <span className="font-mono bg-muted px-2 py-1 rounded">@mentoriaa_hub_bot</span></li>
                <li>2. Отправь команду <span className="font-mono bg-muted px-2 py-1 rounded">/start</span></li>
                <li>3. Скопируй полученный код</li>
                <li>4. Вставь код ниже и нажми "Привязать"</li>
              </ol>
            </div>

            {/* Link Form */}
            {!(user as any).telegramChatId ? (
              <form onSubmit={handleLink} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Код из Telegram бота
                  </label>
                  <Input
                    type="text"
                    placeholder="Например: 123456789"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Привязываю..." : "Привязать Telegram"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-semibold text-green-500">Telegram привязан!</p>
                    <p className="text-sm text-muted-foreground">
                      ID: {(user as any).telegramChatId}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleTest}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Отправляю..." : "Отправить тестовое уведомление"}
                </Button>
              </div>
            )}

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-500">{message}</p>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500" />
                <p className="text-sm text-red-500">{message}</p>
              </div>
            )}

            {/* What notifications */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Ты будешь получать уведомления о:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📚 Новых курсах на платформе</li>
                <li>🏆 Новых возможностях (стипендии, конкурсы)</li>
                <li>📊 Изменениях в твоём рейтинге</li>
                <li>💬 Сообщениях от менторов</li>
              </ul>
            </div>

            <Button
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Назад в дашборд
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
