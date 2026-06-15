// Client-side storage utilities for Mentoria Hub

export interface Opportunity {
  id: number;
  title: string;
  category: string;
  format: string;
  location: string;
  deadline: string;
  cost: string;
  tags: string[];
  description: string;
  requirements?: string;
  organizer: string;
  applicationLink?: string;
  grade: string[];
}

export interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  description: string;
  instructor: string;
  image?: string;
}

// Saved opportunities
export function getSavedOpportunities(): number[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('mentoria_saved_opportunities');
  return saved ? JSON.parse(saved) : [];
}

export function saveOpportunity(id: number): void {
  const saved = getSavedOpportunities();
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem('mentoria_saved_opportunities', JSON.stringify(saved));
  }
}

export function unsaveOpportunity(id: number): void {
  const saved = getSavedOpportunities();
  const filtered = saved.filter(oppId => oppId !== id);
  localStorage.setItem('mentoria_saved_opportunities', JSON.stringify(filtered));
}

export function isOpportunitySaved(id: number): boolean {
  return getSavedOpportunities().includes(id);
}

// Enrolled courses
export function getEnrolledCourses(): number[] {
  if (typeof window === 'undefined') return [];
  const enrolled = localStorage.getItem('mentoria_enrolled_courses');
  return enrolled ? JSON.parse(enrolled) : [];
}

export function enrollCourse(id: number): void {
  const enrolled = getEnrolledCourses();
  if (!enrolled.includes(id)) {
    enrolled.push(id);
    localStorage.setItem('mentoria_enrolled_courses', JSON.stringify(enrolled));
  }
}

export function unenrollCourse(id: number): void {
  const enrolled = getEnrolledCourses();
  const filtered = enrolled.filter(courseId => courseId !== id);
  localStorage.setItem('mentoria_enrolled_courses', JSON.stringify(filtered));
}

export function isCourseEnrolled(id: number): boolean {
  return getEnrolledCourses().includes(id);
}

// User coins
export function getUserCoins(): number {
  if (typeof window === 'undefined') return 0;
  const coins = localStorage.getItem('mentoria_user_coins');
  return coins ? parseInt(coins) : 350; // Default 350
}

export function setUserCoins(amount: number): void {
  localStorage.setItem('mentoria_user_coins', amount.toString());
}

export function addCoins(amount: number): void {
  const current = getUserCoins();
  setUserCoins(current + amount);
}

// Streak system
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastVisit: string; // ISO date
  totalVisits: number;
}

export function getStreak(): StreakData {
  if (typeof window === 'undefined') {
    return { currentStreak: 0, longestStreak: 0, lastVisit: '', totalVisits: 0 };
  }
  const data = localStorage.getItem('mentoria_streak');
  if (!data) {
    return { currentStreak: 0, longestStreak: 0, lastVisit: '', totalVisits: 0 };
  }
  return JSON.parse(data);
}

export function updateStreak(): { coinsEarned: number; streak: StreakData } {
  const today = new Date().toISOString().split('T')[0];
  const streak = getStreak();

  // First visit ever
  if (!streak.lastVisit) {
    const newStreak: StreakData = {
      currentStreak: 1,
      longestStreak: 1,
      lastVisit: today,
      totalVisits: 1
    };
    localStorage.setItem('mentoria_streak', JSON.stringify(newStreak));
    addCoins(10); // Award 10 coins for first visit
    return { coinsEarned: 10, streak: newStreak };
  }

  // Already visited today
  if (streak.lastVisit === today) {
    return { coinsEarned: 0, streak };
  }

  const lastVisitDate = new Date(streak.lastVisit);
  const todayDate = new Date(today);
  const dayDiff = Math.floor((todayDate.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24));

  let coinsEarned = 0;

  if (dayDiff === 1) {
    // Consecutive day - continue streak
    streak.currentStreak += 1;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);

    // Award coins based on streak milestones
    coinsEarned = 10; // Base daily reward
    if (streak.currentStreak % 7 === 0) coinsEarned += 50; // Weekly bonus
    if (streak.currentStreak % 30 === 0) coinsEarned += 200; // Monthly bonus

  } else {
    // Streak broken
    streak.currentStreak = 1;
    coinsEarned = 10;
  }

  streak.lastVisit = today;
  streak.totalVisits += 1;

  localStorage.setItem('mentoria_streak', JSON.stringify(streak));
  addCoins(coinsEarned);

  return { coinsEarned, streak };
}
