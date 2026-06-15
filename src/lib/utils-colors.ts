// Utility functions for color coding

export function getDifficultyColor(level: string): string {
  switch (level.toLowerCase()) {
    case "начальный":
    case "easy":
      return "bg-green-500/10 text-green-600 border-green-500/30";
    case "средний":
    case "medium":
      return "bg-orange-500/10 text-orange-600 border-orange-500/30";
    case "продвинутый":
    case "hard":
      return "bg-red-500/10 text-red-600 border-red-500/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function getDeadlineColor(deadline: string): string {
  const now = new Date().getTime();
  const deadlineDate = new Date(deadline).getTime();
  const daysLeft = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return "bg-muted text-muted-foreground border-border"; // Past deadline
  } else if (daysLeft <= 7) {
    return "bg-red-500/10 text-red-600 border-red-500/30"; // Urgent
  } else if (daysLeft <= 30) {
    return "bg-orange-500/10 text-orange-600 border-orange-500/30"; // Soon
  } else {
    return "bg-green-500/10 text-green-600 border-green-500/30"; // Plenty of time
  }
}

export function getDeadlineDays(deadline: string): number {
  const now = new Date().getTime();
  const deadlineDate = new Date(deadline).getTime();
  return Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
}
