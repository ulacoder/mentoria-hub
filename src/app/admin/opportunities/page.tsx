"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { RequireRole } from "@/components/require-role";
import { AdminNavbar } from "@/components/admin-navbar";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  DollarSign,
  MapPin,
  Tag
} from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: "scholarship" | "competition" | "summer_program" | "hackathon" | "internship";
  amount?: string;
  deadline: string;
  location: string;
  requirements: string[];
  link: string;
  createdAt: string;
}

export default function AdminOpportunitiesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Partial<Opportunity>>({
    title: "",
    description: "",
    type: "scholarship",
    amount: "",
    deadline: "",
    location: "",
    requirements: [],
    link: ""
  });

  useEffect(() => {
    if (user && user.role === "admin") {
      loadOpportunities();
    }
  }, [user]);

  const loadOpportunities = () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("mentoria_opportunities");
    if (saved) {
      setOpportunities(JSON.parse(saved));
    }
  };

  const saveOpportunities = (opps: Opportunity[]) => {
    localStorage.setItem("mentoria_opportunities", JSON.stringify(opps));
    setOpportunities(opps);
  };

  const handleAddOpportunity = () => {
    if (!formData.title || !formData.description || !formData.deadline) {
      alert("Заполни обязательные поля: название, описание, дедлайн");
      return;
    }

    const newOpp: Opportunity = {
      id: `opp_${Date.now()}`,
      title: formData.title!,
      description: formData.description!,
      type: formData.type || "scholarship",
      amount: formData.amount,
      deadline: formData.deadline!,
      location: formData.location || "Online",
      requirements: formData.requirements || [],
      link: formData.link || "#",
      createdAt: new Date().toISOString()
    };

    const updated = [...opportunities, newOpp];
    saveOpportunities(updated);

    // Reset form
    setFormData({
      title: "",
      description: "",
      type: "scholarship",
      amount: "",
      deadline: "",
      location: "",
      requirements: [],
      link: ""
    });
    setIsAddingNew(false);
  };

  const handleDeleteOpportunity = (id: string) => {
    if (!confirm("Точно удалить эту возможность?")) return;
    const updated = opportunities.filter(o => o.id !== id);
    saveOpportunities(updated);
    if (selectedOpp?.id === id) {
      setSelectedOpp(null);
    }
  };

  const typeLabels = {
    scholarship: "Стипендия",
    competition: "Конкурс",
    summer_program: "Летняя программа",
    hackathon: "Хакатон",
    internship: "Стажировка"
  };

  return (
    <RequireRole role="admin">
      <div className="flex flex-col min-h-screen">
        <AdminNavbar />

        <div className="flex-1 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold mb-2">Управление возможностями</h1>
                <p className="text-muted-foreground">
                  Добавляй стипендии, конкурсы, летние программы и хакатоны
                </p>
              </div>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => setIsAddingNew(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить возможность
              </Button>
            </div>

            {/* Add New Form */}
            {isAddingNew && (
              <div className="bg-card border border-border/60 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-heading font-bold mb-4">Новая возможность</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Название *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                      placeholder="Например: Стипендия Bolashak 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Описание *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                      rows={3}
                      placeholder="Краткое описание возможности"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Тип</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                      >
                        <option value="scholarship">Стипендия</option>
                        <option value="competition">Конкурс</option>
                        <option value="summer_program">Летняя программа</option>
                        <option value="hackathon">Хакатон</option>
                        <option value="internship">Стажировка</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Сумма (необязательно)</label>
                      <input
                        type="text"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                        placeholder="$5000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Дедлайн *</label>
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Локация</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                        placeholder="Online / Almaty / USA"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Ссылка</label>
                    <input
                      type="url"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleAddOpportunity}>
                      Добавить
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {opportunities.map((opp) => (
                    <div
                      key={opp.id}
                      className={`bg-card border-2 rounded-lg p-6 transition-all ${
                        selectedOpp?.id === opp.id
                          ? "border-primary"
                          : "border-border/60 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-heading font-bold">{opp.title}</h3>
                            <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">
                              {typeLabels[opp.type]}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {opp.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {opp.deadline}
                            </span>
                            {opp.amount && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                {opp.amount}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {opp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOpp(opp)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Просмотр
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteOpportunity(opp.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}

                  {opportunities.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Пока нет возможностей</p>
                      <p className="text-sm mt-2">Добавь первую стипендию или конкурс</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Sidebar */}
              <div className="lg:col-span-1">
                {selectedOpp ? (
                  <div className="bg-card border border-border/60 rounded-lg p-6 sticky top-4">
                    <h3 className="font-heading font-bold mb-4">Детали</h3>

                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Название:</span>
                        <p className="font-semibold">{selectedOpp.title}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Тип:</span>
                        <p>{typeLabels[selectedOpp.type]}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Дедлайн:</span>
                        <p>{selectedOpp.deadline}</p>
                      </div>
                      {selectedOpp.amount && (
                        <div>
                          <span className="text-muted-foreground">Сумма:</span>
                          <p>{selectedOpp.amount}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-muted-foreground">Локация:</span>
                        <p>{selectedOpp.location}</p>
                      </div>
                      {selectedOpp.link && (
                        <div>
                          <span className="text-muted-foreground">Ссылка:</span>
                          <p className="truncate">
                            <a href={selectedOpp.link} target="_blank" className="text-primary hover:underline">
                              {selectedOpp.link}
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-card border border-border/60 rounded-lg p-6">
                    <p className="text-sm text-muted-foreground text-center">
                      Выбери возможность для просмотра деталей
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
