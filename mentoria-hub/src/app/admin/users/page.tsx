"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { AdminNavbar } from "@/components/admin-navbar";
import { Button } from "@/components/ui/button";
import {
  Users,
  Search,
  Award,
  Brain,
  Mail,
  Shield,
  UserCheck,
  UserX,
  Crown
} from "lucide-react";

export default function AdminUsersPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    if (user && user.role === "admin") {
      loadUsers();
    }
  }, [user]);

  const loadUsers = () => {
    if (typeof window === "undefined") return;
    const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    setAllUsers(users);
  };

  const filteredUsers = allUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleChangeRole = (userId: string, newRole: "student" | "mentor" | "admin") => {
    const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    const updatedUsers = users.map((u: any) =>
      u.userId === userId ? { ...u, role: newRole } : u
    );
    localStorage.setItem("mentoria_users", JSON.stringify(updatedUsers));
    loadUsers();
    if (selectedUser?.userId === userId) {
      setSelectedUser({ ...selectedUser, role: newRole });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (!confirm("Точно удалить этого пользователя?")) return;

    const users = JSON.parse(localStorage.getItem("mentoria_users") || "[]");
    const updatedUsers = users.filter((u: any) => u.userId !== userId);
    localStorage.setItem("mentoria_users", JSON.stringify(updatedUsers));
    loadUsers();
    if (selectedUser?.userId === userId) {
      setSelectedUser(null);
    }
  };

  return (
    <RequireRole role="admin">
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-heading font-bold mb-2">Управление пользователями</h1>
              <p className="text-muted-foreground">
                Просмотр и редактирование всех пользователей платформы
              </p>
            </div>

            {/* Search and Filter */}
            <div className="bg-card border border-border/60 rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Поиск по имени или email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-sm"
                >
                  <option value="all">Все роли</option>
                  <option value="student">Студенты</option>
                  <option value="mentor">Менторы</option>
                  <option value="admin">Администраторы</option>
                </select>
              </div>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-3">
                  {filteredUsers.map((u) => {
                    const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
                    const userProgress = progress[u.userId];
                    const enrolledCount = userProgress?.enrolledCourses?.length || 0;

                    return (
                      <div
                        key={u.userId}
                        className={`bg-card border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedUser?.userId === u.userId
                            ? "border-primary"
                            : "border-border/60 hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedUser(u)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{u.name}</h3>
                              {u.role === "admin" && (
                                <Crown className="w-4 h-4 text-red-500" />
                              )}
                              {u.role === "mentor" && (
                                <Shield className="w-4 h-4 text-blue-500" />
                              )}
                              {u.mbti && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-semibold">
                                  {u.mbti}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {u.email}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="capitalize px-2 py-1 bg-muted rounded">
                                {u.role}
                              </span>
                              <span className="flex items-center gap-1">
                                <Award className="w-3 h-3" />
                                {u.coins || 0} коинов
                              </span>
                              {u.role === "student" && (
                                <span className="flex items-center gap-1">
                                  📚 {enrolledCount} курсов
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Пользователи не найдены</p>
                    </div>
                  )}
                </div>
              </div>

              {/* User Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedUser ? (
                  <div className="bg-card border border-border/60 rounded-lg p-6 sticky top-4">
                    <h3 className="font-heading font-bold mb-4">Управление пользователем</h3>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3">Информация</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Имя:</span> {selectedUser.name}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span> {selectedUser.email}
                        </div>
                        {selectedUser.grade && (
                          <div>
                            <span className="text-muted-foreground">Класс:</span> {selectedUser.grade}
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Коины:</span> {selectedUser.coins || 0}
                        </div>
                        <div>
                          <span className="text-muted-foreground">ID:</span> <span className="text-xs font-mono">{selectedUser.userId}</span>
                        </div>
                      </div>
                    </div>

                    {selectedUser.mbti && (
                      <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold">MBTI: {selectedUser.mbti}</h4>
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-3">Изменить роль</h4>
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant={selectedUser.role === "student" ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handleChangeRole(selectedUser.userId, "student")}
                        >
                          <UserCheck className="w-4 h-4 mr-2" />
                          Студент
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedUser.role === "mentor" ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handleChangeRole(selectedUser.userId, "mentor")}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Ментор
                        </Button>
                        <Button
                          size="sm"
                          variant={selectedUser.role === "admin" ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handleChangeRole(selectedUser.userId, "admin")}
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          Администратор
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDeleteUser(selectedUser.userId)}
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Удалить пользователя
                    </Button>
                  </div>
                ) : (
                  <div className="bg-card border border-border/60 rounded-lg p-6">
                    <p className="text-sm text-muted-foreground text-center">
                      Выбери пользователя для управления
                    </p>
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
