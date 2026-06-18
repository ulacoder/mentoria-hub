"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  Trophy,
  Settings,
  Trash2,
  Plus,
  LogOut
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/");
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      // Load users
      const res = await fetch('/api/users');
      const userData = await res.json();
      setUsers(userData || []);

      // Load opportunities
      if (typeof window !== "undefined") {
        const opps = JSON.parse(localStorage.getItem("mentoria_opportunities") || "[]");
        setOpportunities(opps);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      setUsers([]);
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Удалить этого пользователя?")) return;
    try {
      await fetch(`/api/users?id=${userId}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const deleteOpportunity = (oppId: string) => {
    if (!confirm("Удалить эту возможность?")) return;
    const updated = opportunities.filter(o => o.id !== oppId);
    localStorage.setItem("mentoria_opportunities", JSON.stringify(updated));
    setOpportunities(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Admin Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-bold text-red-500">ADMIN PANEL</h1>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 bg-muted/20 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Пользователей</p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{opportunities.length}</p>
                  <p className="text-sm text-muted-foreground">Возможностей</p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Курсов</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              onClick={() => router.push("/admin/opportunities")}
              className="h-24 text-lg"
              variant="outline"
            >
              <Trophy className="w-6 h-6 mr-3" />
              Управление возможностями
            </Button>

            <Button
              onClick={() => router.push("/admin/courses")}
              className="h-24 text-lg"
              variant="outline"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              Управление курсами
            </Button>
          </div>

          {/* Users Table */}
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Пользователи</h2>
            </div>

            {users.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Нет пользователей</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Имя</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Email</th>
                      <th className="text-left px-6 py-3 text-sm font-semibold">Роль</th>
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
                        <td className="px-6 py-4 text-sm">{u.coins || 0}</td>
                        <td className="px-6 py-4 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteUser(u.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Opportunities */}
          <div className="bg-card border rounded-lg overflow-hidden">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Последние возможности</h2>
              <Button
                size="sm"
                onClick={() => router.push("/admin/opportunities")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить
              </Button>
            </div>

            {opportunities.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Нет возможностей</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {opportunities.slice(0, 5).map((opp) => (
                  <div key={opp.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h3 className="font-semibold">{opp.title}</h3>
                      <p className="text-sm text-muted-foreground">Дедлайн: {opp.deadline}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteOpportunity(opp.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
