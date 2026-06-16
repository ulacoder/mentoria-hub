"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Send,
  User,
  Shield
} from "lucide-react";

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export default function StudentMessagesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    loadMentors();
  }, [user]);

  useEffect(() => {
    if (selectedMentor) {
      loadMessages(selectedMentor.userId);
    }
  }, [selectedMentor]);

  const loadMentors = () => {
    if (typeof window === "undefined") return;
    const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    const mentorUsers = users.filter((u: any) => u.role === "mentor");
    setMentors(mentorUsers);
    if (mentorUsers.length > 0 && !selectedMentor) {
      setSelectedMentor(mentorUsers[0]);
    }
  };

  const loadMessages = (mentorId: string) => {
    if (typeof window === "undefined") return;

    const allMessages = JSON.parse(localStorage.getItem("mentoria_messages") || "[]");
    const conversationMessages = allMessages.filter(
      (m: Message) =>
        (m.from === mentorId && m.to === user!.userId) ||
        (m.from === user!.userId && m.to === mentorId)
    );

    conversationMessages.sort(
      (a: Message, b: Message) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    setMessages(conversationMessages);

    // Mark messages as read
    const updatedMessages = allMessages.map((m: Message) =>
      m.from === mentorId && m.to === user!.userId ? { ...m, read: true } : m
    );
    localStorage.setItem("mentoria_messages", JSON.stringify(updatedMessages));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedMentor) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      from: user!.userId,
      to: selectedMentor.userId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    const allMessages = JSON.parse(localStorage.getItem("mentoria_messages") || "[]");
    allMessages.push(message);
    localStorage.setItem("mentoria_messages", JSON.stringify(allMessages));

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const getUnreadCount = (mentorId: string) => {
    if (typeof window === "undefined") return 0;
    const allMessages = JSON.parse(localStorage.getItem("mentoria_messages") || "[]");
    return allMessages.filter(
      (m: Message) => m.from === mentorId && m.to === user!.userId && !m.read
    ).length;
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Сообщения с ментором</h1>
            <p className="text-muted-foreground">
              Задавай вопросы и получай поддержку от менторов
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mentors List */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Менторы</h3>
                </div>

                <div className="overflow-y-auto max-h-[600px]">
                  {mentors.map((mentor) => {
                    const unread = getUnreadCount(mentor.userId);
                    return (
                      <div
                        key={mentor.userId}
                        onClick={() => setSelectedMentor(mentor)}
                        className={`p-4 cursor-pointer transition-all border-b ${
                          selectedMentor?.userId === mentor.userId
                            ? "bg-primary/10"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-blue-500" />
                            <h3 className="font-semibold">{mentor.name}</h3>
                          </div>
                          {unread > 0 && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                              {unread}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {mentors.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      <Shield className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Пока нет менторов</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-3">
              {selectedMentor ? (
                <div className="bg-card border border-border/60 rounded-lg overflow-hidden flex flex-col h-[700px]">
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <h3 className="font-heading font-bold">{selectedMentor.name}</h3>
                      <span className="text-sm text-muted-foreground">• Ментор</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => {
                      const isFromStudent = msg.from === user.userId;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isFromStudent ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isFromStudent
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {messages.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Начни разговор с ментором</p>
                        <p className="text-sm mt-2">Задай вопрос или попроси совета</p>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Напиши сообщение..."
                        className="flex-1 px-4 py-2 bg-background border border-border rounded-lg"
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border/60 rounded-lg p-12 text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Выбери ментора чтобы начать общение</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
