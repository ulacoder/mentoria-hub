"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Settings,
  Trash2,
  Edit
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"users" | "courses" | "moderation">("users");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (user && user.role === "admin") {
      loadUsers();
    }
  }, [user]);

  const loadUsers = () => {
    if (typeof window === "undefined") return;
    const allUsers = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    setUsers(allUsers);
  };

  const deleteUser = (userId: string) => {
    if (confirm("Удалить этого пользователя?")) {
      const filtered = users.filter(u => u.id !== userId);
      localStorage.setItem("mentoria_users", JSON.stringify(filtered));
      loadUsers();
    }
  };

  return (
    <RequireRole role="admin">
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Админ панель</h1>
              <p className="text-muted-foreground">
                Управление платформой Mentoria Hub
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-border">
              <button
                onClick={() => setActiveTab("users")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "users"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Пользователи
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "courses"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Курсы
              </button>
              <button
                onClick={() => setActiveTab("moderation")}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === "moderation"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Модерация
              </button>
            </div>

            {/* Users Table */}
            {activeTab === "users" && (
              <div className="bg-card border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Имя</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Email</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Роль</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Класс</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Коины</th>
                      <th className="text-right px-6 py-3 text-sm font-semibold">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-muted/20">
                        <td className="px-6 py-4 text-sm">{u.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            u.role === "admin" ? "bg-red-500/20 text-red-500" :
                            u.role === "mentor" ? "bg-blue-500/20 text-blue-500" :
                            "bg-green-500/20 text-green-500"
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{u.grade || "—"}</td>
                        <td className="px-6 py-4 text-sm">{u.coins || 0}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteUser(u.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Пока нет пользователей</p>
                  </div>
                )}
              </div>
            )}

            {/* Courses Placeholder */}
            {activeTab === "courses" && (
              <div className="bg-card border rounded-lg p-12 text-center text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Управление курсами скоро будет доступно</p>
              </div>
            )}

            {/* Moderation Placeholder */}
            {activeTab === "moderation" && (
              <div className="bg-card border rounded-lg p-12 text-center text-muted-foreground">
                <Settings className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Модерация скоро будет доступна</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </RequireRole>
  );
}
