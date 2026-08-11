"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Target, Calendar, Award } from "lucide-react";

export default function DashboardPage() {
  // Mock data - replace with real data from Supabase
  const profileScore = {
    overall: 78,
    academic: 85,
    extracurricular: 72,
    essay: 75,
    recommendation: 70,
  };

  const collegeList = {
    reach: ["Stanford", "MIT", "Harvard"],
    target: ["UC Berkeley", "Carnegie Mellon", "Cornell", "Georgia Tech"],
    safety: ["University of Washington", "UT Austin"],
  };

  const upcomingTasks = [
    {
      id: 1,
      title: "Register for SAT Subject Tests",
      deadline: "Sep 15, 2026",
      category: "Testing",
      completed: false,
    },
    {
      id: 2,
      title: "Start Personal Statement draft",
      deadline: "Oct 1, 2026",
      category: "Essays",
      completed: false,
    },
    {
      id: 3,
      title: "Request recommendation letters",
      deadline: "Oct 15, 2026",
      category: "Recommendations",
      completed: false,
    },
  ];

  const daysUntilEA = 92; // Mock days until Early Action deadline

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-heading font-bold mb-2">
            Welcome back, Student
          </h1>
          <p className="text-muted-foreground">
            {daysUntilEA} days until Early Action deadlines
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Widget 1: Profile Power Score */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold">Profile Score</h2>
                <Target className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Circular Progress */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${2 * Math.PI * 88 * (1 - profileScore.overall / 100)}`}
                      className="text-primary transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-heading font-bold">{profileScore.overall}</span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Academic</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${profileScore.academic}%` }}
                      />
                    </div>
                    <span className="font-medium w-8 text-right">{profileScore.academic}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Extracurricular</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${profileScore.extracurricular}%` }}
                      />
                    </div>
                    <span className="font-medium w-8 text-right">{profileScore.extracurricular}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Essays</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${profileScore.essay}%` }}
                      />
                    </div>
                    <span className="font-medium w-8 text-right">{profileScore.essay}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Recommendations</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${profileScore.recommendation}%` }}
                      />
                    </div>
                    <span className="font-medium w-8 text-right">{profileScore.recommendation}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6" variant="outline">
                Re-assess Profile
              </Button>
            </div>
          </div>

          {/* Widget 2: College List Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold">College List</h2>
                <Award className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                {/* Reach Schools */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Reach</span>
                    <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded-full">
                      {collegeList.reach.length} schools
                    </span>
                  </div>
                  <div className="space-y-2">
                    {collegeList.reach.map((school, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">{school}</span>
                        <span className="text-xs text-muted-foreground">15-20%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Target Schools */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Target</span>
                    <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">
                      {collegeList.target.length} schools
                    </span>
                  </div>
                  <div className="space-y-2">
                    {collegeList.target.slice(0, 2).map((school, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">{school}</span>
                        <span className="text-xs text-muted-foreground">40-60%</span>
                      </div>
                    ))}
                    {collegeList.target.length > 2 && (
                      <div className="text-center text-xs text-muted-foreground">
                        +{collegeList.target.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Safety Schools */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Safety</span>
                    <span className="text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
                      {collegeList.safety.length} schools
                    </span>
                  </div>
                  <div className="space-y-2">
                    {collegeList.safety.map((school, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">{school}</span>
                        <span className="text-xs text-muted-foreground">70-80%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/colleges">
                <Button className="w-full mt-6" variant="outline">
                  Manage College List
                </Button>
              </Link>
            </div>
          </div>

          {/* Widget 3: Upcoming Tasks */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold">This Week's Tasks</h2>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      className="mt-1 w-4 h-4"
                      onChange={() => {}}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">{task.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{task.category}</span>
                        <span>•</span>
                        <span>{task.deadline}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/roadmap">
                <Button className="w-full mt-6" variant="outline">
                  View Full Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-heading font-bold mb-1">
                Want to improve your score?
              </h3>
              <p className="text-sm text-muted-foreground">
                Check out personalized recommendations based on your profile
              </p>
            </div>
            <Link href="/roadmap">
              <Button size="lg">
                View Roadmap
                <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
