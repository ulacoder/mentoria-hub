"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { MentorNavbar } from "@/components/mentor-navbar";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Send,
  Search,
  Brain,
  User
} from "lucide-react";

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  userId: string;
  userName: string;
  userMbti?: string;
  lastMessage?: Message;
  unreadCount: number;
}

export default function MentorMessagesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user && user.role === "mentor") {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation.userId);
    }
  }, [selectedConversation]);

  const loadConversations = () => {
    if (typeof window === "undefined") return;

    const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    const students = users.filter((u: any) => u.role === "student");
    const allMessages = JSON.parse(localStorage.getItem("mentoria_messages") || "[]");

    const convs: Conversation[] = students.map((student: any) => {
      const studentMessages = allMessages.filter(
        (m: Message) =>
          (m.from === student.id && m.to === user!.id) ||
          (m.from === user!.id && m.to === student.id)
      );

      const unread = studentMessages.filter(
        (m: Message) => m.from === student.id && !m.read
      ).length;

      const lastMsg = studentMessages.sort(
        (a: Message, b: Message) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0];

      return {
        userId: student.id,
        userName: student.name,
        userMbti: student.mbti,
        lastMessage: lastMsg,
        unreadCount: unread
      };
    });

    // Sort by last message time
    convs.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
    });

    setConversations(convs);
  };

  const loadMessages = (studentId: string) => {
    if (typeof window === "undefined") return;

    const allMessages = JSON.parse(localStorage.getItem("mentoria_messages") || "[]");
    const conversationMessages = allMessages.filter(
      (m: Message) =>
        (m.from === studentId && m.to === user!.id) ||
        (m.from === user!.id && m.to === studentId)
    );

    conversationMessages.sort(
      (a: Message, b: Message) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    setMessages(conversationMessages);

    // Mark messages as read
    const updatedMessages = allMessages.map((m: Message) =>
      m.from === studentId && m.to === user!.id ? { ...m, read: true } : m
    );
    localStorage.setItem("mentoria_messages", JSON.stringify(updatedMessages));
    loadConversations(); // Refresh unread counts
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      from: user!.id,
      to: selectedConversation.userId,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    const allMessages = JSON.parse(localStorage.getItem("mentoria_messages") || "[]");
    allMessages.push(message);
    localStorage.setItem("mentoria_messages", JSON.stringify(allMessages));

    setMessages([...messages, message]);
    setNewMessage("");
    loadConversations(); // Refresh conversations
  };

  const filteredConversations = conversations.filter(c =>
    c.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <RequireRole role="mentor">
      <div className="flex flex-col min-h-screen">
        <MentorNavbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Сообщения</h1>
              <p className="text-muted-foreground">
                Общайся со студентами и поддерживай их
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border/60 rounded-lg overflow-hidden">
                  {/* Search */}
                  <div className="p-4 border-b">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Поиск студента..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  {/* Conversations */}
                  <div className="overflow-y-auto max-h-[600px]">
                    {filteredConversations.map((conv) => (
                      <div
                        key={conv.userId}
                        onClick={() => setSelectedConversation(conv)}
                        className={`p-4 cursor-pointer transition-all border-b ${
                          selectedConversation?.userId === conv.userId
                            ? "bg-primary/10"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{conv.userName}</h3>
                            {conv.userMbti && (
                              <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-semibold">
                                {conv.userMbti}
                              </span>
                            )}
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        {conv.lastMessage && (
                          <p className="text-sm text-muted-foreground truncate">
                            {conv.lastMessage.content}
                          </p>
                        )}
                      </div>
                    ))}

                    {filteredConversations.length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Нет студентов</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Window */}
              <div className="lg:col-span-2">
                {selectedConversation ? (
                  <div className="bg-card border border-border/60 rounded-lg overflow-hidden flex flex-col h-[700px]">
                    {/* Chat Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-heading font-bold">{selectedConversation.userName}</h3>
                          {selectedConversation.userMbti && (
                            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-semibold">
                              {selectedConversation.userMbti}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/mentor/student/${selectedConversation.userId}`)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Профиль
                      </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((msg) => {
                        const isFromMentor = msg.from === user!.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isFromMentor ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                isFromMentor
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
                          <p>Начни разговор со студентом</p>
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
                    <p className="text-muted-foreground">Выбери студента чтобы начать общение</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
