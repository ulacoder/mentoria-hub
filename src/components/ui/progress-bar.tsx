import React from "react";

interface ProgressBarProps {
  progress: number; // 0-100
  height?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  progress,
  height = "h-8",
  showPercentage = true,
  animated = true
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  // Determine color based on progress
  let colorClass = "";
  let bgColorClass = "";
  let textColor = "text-white";

  if (clampedProgress < 40) {
    // Red for low progress (0-39%)
    colorClass = "bg-gradient-to-r from-red-600 to-red-500";
    bgColorClass = "bg-red-100 dark:bg-red-950";
  } else if (clampedProgress < 70) {
    // Orange for medium progress (40-69%)
    colorClass = "bg-gradient-to-r from-orange-600 to-orange-500";
    bgColorClass = "bg-orange-100 dark:bg-orange-950";
  } else {
    // Green for high progress (70-100%)
    colorClass = "bg-gradient-to-r from-green-600 to-green-500";
    bgColorClass = "bg-green-100 dark:bg-green-950";
  }

  // Status text
  let statusText = "";
  if (clampedProgress < 40) {
    statusText = "Начало пути";
  } else if (clampedProgress < 70) {
    statusText = "Половина пути";
  } else if (clampedProgress < 100) {
    statusText = "Почти готово!";
  } else {
    statusText = "Завершено! 🎉";
  }

  return (
    <div className="w-full">
      <div className={`flex items-center justify-between mb-2`}>
        {showPercentage && (
          <span className="text-sm font-semibold text-muted-foreground">
            {statusText}
          </span>
        )}
        {showPercentage && (
          <span className="text-2xl font-bold">
            {clampedProgress}%
          </span>
        )}
      </div>

      <div className={`w-full ${height} ${bgColorClass} rounded-lg overflow-hidden relative shadow-inner`}>
        <div
          className={`${height} ${colorClass} ${animated ? 'transition-all duration-700 ease-out' : ''} relative flex items-center justify-center`}
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Shine effect */}
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          )}

          {/* Progress text inside bar (only if wide enough) */}
          {clampedProgress > 15 && showPercentage && (
            <span className={`text-sm font-bold ${textColor} relative z-10`}>
              {clampedProgress}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
