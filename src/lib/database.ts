// Real database system using localStorage
// Stores user-specific data: saved opportunities, enrolled courses, course progress

export interface UserProgress {
  userId: string;
  savedOpportunities: number[];
  enrolledCourses: {
    courseId: number;
    enrolledAt: string;
    progress: number; // 0-100
    completedLessons: number;
    lastAccessedAt: string;
  }[];
  courseProgress: {
    [courseId: number]: {
      lessonsCompleted: number[];
      quizScores: { [lessonId: number]: number };
      notes: string;
    };
  };
  stats: {
    totalCoinsEarned: number;
    coursesCompleted: number;
    opportunitiesApplied: number[];
  };
}

const DB_KEY = "mentoria_user_progress";

function getDatabase(): { [userId: string]: UserProgress } {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : {};
}

function saveDatabase(db: { [userId: string]: UserProgress }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function getUserProgress(userId: string): UserProgress {
  const db = getDatabase();
  if (!db[userId]) {
    db[userId] = {
      userId,
      savedOpportunities: [],
      enrolledCourses: [],
      courseProgress: {},
      stats: {
        totalCoinsEarned: 0,
        coursesCompleted: 0,
        opportunitiesApplied: [],
      },
    };
    saveDatabase(db);
  }
  return db[userId];
}

// Opportunities
export function saveOpportunity(userId: string, opportunityId: number): void {
  const db = getDatabase();
  const progress = getUserProgress(userId);
  if (!progress.savedOpportunities.includes(opportunityId)) {
    progress.savedOpportunities.push(opportunityId);
    db[userId] = progress;
    saveDatabase(db);
  }
}

export function unsaveOpportunity(userId: string, opportunityId: number): void {
  const db = getDatabase();
  const progress = getUserProgress(userId);
  progress.savedOpportunities = progress.savedOpportunities.filter(id => id !== opportunityId);
  db[userId] = progress;
  saveDatabase(db);
}

export function isOpportunitySaved(userId: string, opportunityId: number): boolean {
  const progress = getUserProgress(userId);
  return progress.savedOpportunities.includes(opportunityId);
}

export function getSavedOpportunities(userId: string): number[] {
  const progress = getUserProgress(userId);
  return progress.savedOpportunities;
}

// Courses
export function enrollCourse(userId: string, courseId: number): void {
  const db = getDatabase();
  const progress = getUserProgress(userId);
  const alreadyEnrolled = progress.enrolledCourses.some(c => c.courseId === courseId);

  if (!alreadyEnrolled) {
    progress.enrolledCourses.push({
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completedLessons: 0,
      lastAccessedAt: new Date().toISOString(),
    });
    db[userId] = progress;
    saveDatabase(db);
  }
}

export function unenrollCourse(userId: string, courseId: number): void {
  const db = getDatabase();
  const progress = getUserProgress(userId);
  progress.enrolledCourses = progress.enrolledCourses.filter(c => c.courseId !== courseId);
  delete progress.courseProgress[courseId];
  db[userId] = progress;
  saveDatabase(db);
}

export function isCourseEnrolled(userId: string, courseId: number): boolean {
  const progress = getUserProgress(userId);
  return progress.enrolledCourses.some(c => c.courseId === courseId);
}

export function getEnrolledCourses(userId: string): number[] {
  const progress = getUserProgress(userId);
  return progress.enrolledCourses.map(c => c.courseId);
}

export function getCourseProgress(userId: string, courseId: number): number {
  const progress = getUserProgress(userId);
  const course = progress.enrolledCourses.find(c => c.courseId === courseId);
  return course?.progress || 0;
}

export function updateCourseProgress(
  userId: string,
  courseId: number,
  progressPercent: number,
  completedLessons: number
): void {
  const db = getDatabase();
  const progress = getUserProgress(userId);
  const courseIndex = progress.enrolledCourses.findIndex(c => c.courseId === courseId);

  if (courseIndex !== -1) {
    progress.enrolledCourses[courseIndex].progress = progressPercent;
    progress.enrolledCourses[courseIndex].completedLessons = completedLessons;
    progress.enrolledCourses[courseIndex].lastAccessedAt = new Date().toISOString();

    // Check if course completed (100%)
    if (progressPercent === 100 && progress.enrolledCourses[courseIndex].completedLessons > 0) {
      progress.stats.coursesCompleted += 1;
    }

    db[userId] = progress;
    saveDatabase(db);
  }
}

export function completeLesson(userId: string, courseId: number, lessonId: number, score?: number): void {
  const db = getDatabase();
  const progress = getUserProgress(userId);

  if (!progress.courseProgress[courseId]) {
    progress.courseProgress[courseId] = {
      lessonsCompleted: [],
      quizScores: {},
      notes: "",
    };
  }

  if (!progress.courseProgress[courseId].lessonsCompleted.includes(lessonId)) {
    progress.courseProgress[courseId].lessonsCompleted.push(lessonId);
  }

  if (score !== undefined) {
    progress.courseProgress[courseId].quizScores[lessonId] = score;
  }

  db[userId] = progress;
  saveDatabase(db);
}

// Stats
export function addCoins(userId: string, amount: number): void {
  const db = getDatabase();
  const progress = getUserProgress(userId);
  progress.stats.totalCoinsEarned += amount;
  db[userId] = progress;
  saveDatabase(db);
}

export function getUserStats(userId: string) {
  const progress = getUserProgress(userId);
  return {
    savedCount: progress.savedOpportunities.length,
    enrolledCount: progress.enrolledCourses.length,
    completedCount: progress.stats.coursesCompleted,
    totalCoins: progress.stats.totalCoinsEarned,
  };
}

// Get full user progress data
export function getFullUserProgress(userId: string): UserProgress {
  return getUserProgress(userId);
}
