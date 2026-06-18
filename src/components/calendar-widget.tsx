"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { X, Calendar as CalendarIcon, Clock } from "lucide-react";
import { getCourses } from "@/lib/courses-enhanced";

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
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

    // Load opportunities with full names
    const opportunities = JSON.parse(localStorage.getItem("mentoria_opportunities") || "[]");
    opportunities.forEach((opp: any) => {
      if (opp.deadline) {
        allEvents.push({
          id: `opp_${opp.id}`,
          title: opp.title,
          date: opp.deadline,
        });
      }
    });

    // Load user's enrolled courses with full names
    if (user) {
      const progress = JSON.parse(localStorage.getItem("mentoria_user_progress") || "{}");
      const userProgress = progress[user.id];

      if (userProgress?.enrolledCourses) {
        const allCourses = getCourses();
        userProgress.enrolledCourses.forEach((courseId: number) => {
          const course = allCourses.find(c => c.id === courseId);
          if (course) {
            const deadline = new Date();
            deadline.setDate(deadline.getDate() + 30);

            allEvents.push({
              id: `course_${courseId}`,
              title: course.title,
              date: deadline.toISOString().split('T')[0],
            });
          }
        });
      }
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
          onClick={() => {
            setSelectedDate(date);
          }}
          className={`p-2 min-h-[70px] border border-border/30 cursor-pointer hover:bg-muted/50 transition-colors relative ${
            isCurrentDay ? "bg-primary/10 border-primary" : ""
          } ${dayEvents.length > 0 ? "bg-accent/5" : ""}`}
        >
          <div className={`text-sm font-semibold mb-1 ${isCurrentDay ? "text-primary" : ""}`}>
            {day}
          </div>
          {dayEvents.length > 0 && (
            <div className="text-xs text-center mt-2">
              <span className="px-2 py-1 bg-primary/20 text-primary rounded-full font-semibold">
                {dayEvents.length}
              </span>
            </div>
          )}
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
          <h3 className="font-heading font-bold text-lg">
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

    if (dayEvents.length === 0) return null;

    return (
      <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4" onClick={() => setSelectedDate(null)}>
        <div className="bg-background border-2 border-primary rounded-lg max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading font-bold text-lg">
              {selectedDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h4>
            <Button size="sm" variant="ghost" onClick={() => setSelectedDate(null)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {dayEvents.map((event, idx) => (
              <div key={event.id} className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold">{event.title}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-br from-primary to-accent hover:scale-110 text-white rounded-full shadow-lg flex items-center justify-center transition-all z-40"
        title="Открыть календарь"
      >
        <CalendarIcon className="w-6 h-6" />
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
        <div className="bg-background border-2 border-primary/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary to-accent text-white p-6 flex items-center justify-between rounded-t-xl">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6" />
              <h2 className="text-2xl font-heading font-bold">Мой календарь</h2>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
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

            {/* Calendar */}
            {renderCalendar()}

            <p className="text-sm text-muted-foreground text-center mt-6">
              Кликни на дату чтобы увидеть все события
            </p>
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {renderEventDetails()}
    </>
  );
}
