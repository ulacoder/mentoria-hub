"use client";

import { useEffect, useState } from "react";
import { Flame, Coins } from "lucide-react";
import { getStreak, updateStreak, type StreakData } from "@/lib/store";

export function StreakWidget() {
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [showReward, setShowReward] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);

  useEffect(() => {
    const { coinsEarned: earned, streak: newStreak } = updateStreak();
    setStreak(newStreak);

    if (earned > 0) {
      setCoinsEarned(earned);
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }
  }, []);

  if (!streak) return null;

  return (
    <>
      {/* Streak Display */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/30">
        <Flame className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold">{streak.currentStreak} дней</span>
      </div>

      {/* Reward Notification */}
      {showReward && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="bg-accent border-2 border-accent/50 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Coins className="w-6 h-6 text-white" />
              <div>
                <p className="font-semibold text-white">+{coinsEarned} коинов!</p>
                <p className="text-xs text-white/90">
                  {streak.currentStreak % 7 === 0 ? "🎉 Недельный бонус!" : "Продолжай в том же духе!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
