"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { X, Calendar as CalendarIcon, Clock, Tag } from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "course" | "opportunity" | "deadline" | "activity";
  color: string;
}

export function CalendarWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadEvents();
    }
  }, [isOpen]);

  const loadEvents = () => {
    if (typeof window === "undefined") return;

    const allEvents: CalendarEvent[] = [];

    // Load opportunities
    const opportunities = JSON.parse(localStorage.getItem("mentoria_opportunities") || "[]");
    opportunities.forEach((opp: any) => {
      if (opp.deadline) {
        allEvents.push({
          id: `opp_${opp.id}`,
          title: opp.title,
          description: opp.description,
          date: opp.deadline,
          type: "opportunity",
          color: "bg-yellow-500"
        });
      }
    });

    // Load user progress for course deadlines
    if (user) {
      const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
      const userProgress = progress[user.id];

      if (userProgress?.enrolledCourses) {
        userProgress.enrolledCourses.forEach((courseId: number) => {
          const daysEnrolled = Math.floor(Math.random() * 30) + 1;
          const deadline = new Date();
          deadline.setDate(deadline.getDate() + (30 - daysEnrolled));

          allEvents.push({
            id: `course_${courseId}`,
            title: `Курс #${courseId} - дедлайн`,
            description: "Завершить курс",
            date: deadline.toISOString().split('T')[0],
            type: "course",
            color: "bg-blue-500"
          });
        });
      }
    }

    // Add some activity deadlines
    const today = new Date();
    for (let i = 1; i <= 3; i++) {
      const activityDate = new Date(today);
      activityDate.setDate(today.getDate() + (i * 5));

      allEvents.push({
        id: `activity_${i}`,
        title: `Активность ${i}`,
        description: "Завершить задание",
        date: activityDate.toISOString().split('T')[0],
        type: "activity",
        color: "bg-green-500"
      });
    }

    setEvents(allEvents);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(e => e.date === dateStr);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isCurrentDay = isToday(date);

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`p-2 min-h-[60px] border border-border/30 cursor-pointer hover:bg-muted/50 transition-colors relative ${
            isCurrentDay ? "bg-primary/10 border-primary" : ""
          }`}
        >
          <div className={`text-sm font-semibold mb-1 ${isCurrentDay ? "text-primary" : ""}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs ${event.color} text-white px-1 py-0.5 rounded truncate`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">+{dayEvents.length - 2}</div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* Month/Year Header */}
        <div className="flex items-center justify-between mb-4">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            ←
          </Button>
          <h3 className="font-heading font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            →
          </Button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(name => (
            <div key={name} className="text-center text-sm font-semibold text-muted-foreground p-2">
              {name}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  const renderEventDetails = () => {
    if (!selectedDate) return null;

    const dayEvents = getEventsForDate(selectedDate);

    return (
      <div className="mt-6 border-t pt-6">
        <h4 className="font-heading font-bold mb-4">
          События на {selectedDate.toLocaleDateString('ru-RU')}
        </h4>

        {dayEvents.length === 0 ? (
          <p className="text-sm text-muted-foreground">Нет событий на эту дату</p>
        ) : (
          <div className="space-y-3">
            {dayEvents.map(event => (
              <div key={event.id} className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <div className={`w-3 h-3 ${event.color} rounded-full mt-1 flex-shrink-0`}></div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm">{event.title}</h5>
                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 bg-background rounded capitalize">
                        {event.type === "course" ? "Курс" :
                         event.type === "opportunity" ? "Возможность" :
                         event.type === "deadline" ? "Дедлайн" : "Активность"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
        title="Открыть календарь"
      >
        <CalendarIcon className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-heading font-bold">Календарь дедлайнов</h2>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Today Indicator */}
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">
                Сегодня: {new Date().toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="mb-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Курсы</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Возможности</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Активности</span>
            </div>
          </div>

          {/* Calendar */}
          {renderCalendar()}

          {/* Event Details */}
          {renderEventDetails()}
        </div>
      </div>
    </div>
  );
}
