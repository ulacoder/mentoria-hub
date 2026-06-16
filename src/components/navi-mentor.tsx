"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Minimize2, Maximize2, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useTranslations } from "next-intl";

interface Message {
  role: "user" | "navi";
  content: string;
  timestamp: Date;
}

export function NaviMentor() {
  const { user } = useAuth();
  const t = useTranslations("navi");
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "navi",
      content: t("greeting"),
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role === "navi" ? "assistant" : "user",
        content: msg.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory,
          userContext: user ? {
            name: user.name,
            level: user.grade,
            interests: user.interests
          } : undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const naviMessage: Message = {
        role: "navi",
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, naviMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      const errorMessage: Message = {
        role: "navi",
        content: "Упс, что-то пошло не так 😅 Попробуй спросить ещё раз или напиши 'помощь' чтобы узнать что я умею!",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Character Image with floating animation */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(true)}
            className="relative group"
          >
            {/* Character */}
            <div className="w-32 h-32 animate-float">
              <img
                src="/navi-character.png"
                alt="Navi AI Mentor"
                className="w-full h-full object-contain drop-shadow-2xl transition-transform group-hover:scale-110"
              />
            </div>

            {/* Online indicator */}
            <span className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></span>

            {/* Sparkles effect */}
            <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-primary animate-pulse" />
          </button>

          {/* Tip bubble */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-card border-2 border-primary/40 rounded-lg p-3 shadow-xl max-w-xs">
              <p className="text-sm font-medium whitespace-pre-line">
                {t("click_to_chat")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-card border-2 border-primary/40 rounded-lg shadow-2xl z-50 flex flex-col transition-all ${
        isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/60 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <img
              src="/navi-character.png"
              alt="Navi"
              className="w-full h-full object-contain"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse"></span>
          </div>
          <div>
            <h3 className="font-heading font-bold">Navi</h3>
            <p className="text-xs text-muted-foreground">{t("ai_mentor")} • {t("online")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-background/80 p-1 rounded transition-colors"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" />
            ) : (
              <Minimize2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-background/80 p-1 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">{t("thinking")}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/60">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                placeholder={t("placeholder")}
                disabled={isLoading}
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm disabled:opacity-50"
              />
              <Button
                size="sm"
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t("hint")}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
