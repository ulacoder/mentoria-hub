"use client";

import { useState } from "react";
import { X, Send, Minimize2, Maximize2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "navi";
  content: string;
  timestamp: Date;
}

const naviResponses: Record<string, string> = {
  привет: "Привет! Я Navi, твой AI-помощник на Mentoria Hub. Чем могу помочь?",
  курсы: "У нас есть курсы по математике, физике, программированию, английскому и подготовке к SAT/IELTS. Все курсы асинхронные — учись в своём темпе!",
  коины: "Коины — это внутренняя валюта платформы. Зарабатывай их за прохождение курсов, ежедневные заходы и достижения. Трать в магазине на мерч, прокачки профиля и премиум-курсы!",
  возможности: "На платформе есть стипендии, конкурсы, олимпиады, летние программы и хакатоны. Используй фильтры чтобы найти то, что подходит именно тебе!",
  помощь: "Я могу помочь с навигацией по платформе, подсказать где найти курсы и возможности, объяснить как работают коины и ответить на любые вопросы!",
  магазин: "В магазине можно купить мерч, прокачки для профиля, платные курсы и дополнительные функции. Всё оплачивается коинами, которые ты зарабатываешь на платформе!",
  default: "Интересный вопрос! Попробуй спросить про курсы, коины, возможности или магазин. Или напиши 'помощь' чтобы узнать что я умею!"
};

export function NaviMentor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "navi",
      content: "Привет! Я Navi — твой персональный AI-ментор. Задавай любые вопросы о платформе!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate Navi response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = naviResponses.default;

      for (const [key, value] of Object.entries(naviResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const naviMessage: Message = {
        role: "navi",
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, naviMessage]);
    }, 500);

    setInputValue("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center z-50 group"
      >
        <Sparkles className="w-7 h-7 text-white animate-pulse" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
      </button>
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
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold">Navi</h3>
            <p className="text-xs text-muted-foreground">AI-ментор</p>
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
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/60">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Спроси что-нибудь..."
                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              <Button
                size="sm"
                onClick={handleSend}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Попробуй спросить про курсы, коины или возможности!
            </p>
          </div>
        </>
      )}
    </div>
  );
}
