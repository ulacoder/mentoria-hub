"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function StartPage() {
  const router = useRouter();
  const { user, setShowAuthModal } = useAuth();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisText, setAnalysisText] = useState("Initializing AI...");

  const [formData, setFormData] = useState({
    // Step 1: Background
    grade: "",
    curriculum: "",
    intendedMajor: "",
    financialAid: false,

    // Step 2: Academics
    gpa: "",
    sat: "",
    act: "",
    toefl: "",
    ielts: "",

    // Step 3: Extracurriculars
    activities: [
      { type: "", title: "", description: "" },
      { type: "", title: "", description: "" },
      { type: "", title: "", description: "" },
    ],
  });

  // Fake AI analysis animation
  useEffect(() => {
    if (isAnalyzing) {
      const stages = [
        { progress: 15, text: "Analyzing academic profile..." },
        { progress: 34, text: "Evaluating extracurriculars..." },
        { progress: 58, text: "Comparing with 400+ historical profiles..." },
        { progress: 73, text: "Calculating admission chances..." },
        { progress: 87, text: "Generating personalized roadmap..." },
        { progress: 100, text: "Analysis complete!" },
      ];

      let currentStage = 0;
      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setAnalysisProgress(stages[currentStage].progress);
          setAnalysisText(stages[currentStage].text);
          currentStage++;
        } else {
          clearInterval(interval);
          // Show registration modal after 500ms
          setTimeout(() => {
            if (!user) {
              setShowAuthModal(true);
            } else {
              router.push("/dashboard");
            }
          }, 500);
        }
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing, user, router, setShowAuthModal]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Start AI analysis
      setIsAnalyzing(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.grade && formData.curriculum && formData.intendedMajor;
    }
    if (step === 2) {
      return formData.gpa && (formData.sat || formData.act);
    }
    if (step === 3) {
      return formData.activities[0].title && formData.activities[0].description;
    }
    return false;
  };

  const updateActivity = (index: number, field: string, value: string) => {
    const newActivities = [...formData.activities];
    newActivities[index] = { ...newActivities[index], [field]: value };
    setFormData({ ...formData, activities: newActivities });
  };

  // AI Analysis Screen
  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-6" />

          <h2 className="text-2xl font-heading font-bold mb-4">
            AI is analyzing your profile
          </h2>

          <div className="mb-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>

          <p className="text-muted-foreground mb-2">{analysisText}</p>
          <p className="text-sm text-muted-foreground">{analysisProgress}%</p>

          {analysisProgress === 100 && (
            <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-xl">
              <p className="text-lg font-medium mb-2">
                Your personalized admissions report is ready!
              </p>
              <p className="text-sm text-muted-foreground">
                {user ? "Redirecting to dashboard..." : "Create an account to view it."}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of 3</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Background */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Personal Background</h2>
              <p className="text-muted-foreground">Tell us about yourself</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Current Grade *
              </label>
              <select
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select grade</option>
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
                <option value="gap">Gap Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Curriculum *
              </label>
              <select
                value={formData.curriculum}
                onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
                className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select curriculum</option>
                <option value="us">US High School</option>
                <option value="ib">International Baccalaureate (IB)</option>
                <option value="alevels">A-Levels</option>
                <option value="national">National Curriculum</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Intended Major *
              </label>
              <Input
                placeholder="e.g., Computer Science, Biology, Economics"
                value={formData.intendedMajor}
                onChange={(e) => setFormData({ ...formData, intendedMajor: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="financialAid"
                checked={formData.financialAid}
                onChange={(e) => setFormData({ ...formData, financialAid: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="financialAid" className="text-sm">
                I will apply for financial aid
              </label>
            </div>
          </div>
        )}

        {/* Step 2: Academics */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Academic Profile</h2>
              <p className="text-muted-foreground">Your grades and test scores</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                GPA (out of 4.0) *
              </label>
              <Input
                type="number"
                step="0.01"
                max="4.00"
                placeholder="3.85"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="h-12"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  SAT Score
                </label>
                <Input
                  type="number"
                  max="1600"
                  placeholder="1450"
                  value={formData.sat}
                  onChange={(e) => setFormData({ ...formData, sat: e.target.value })}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  ACT Score
                </label>
                <Input
                  type="number"
                  max="36"
                  placeholder="32"
                  value={formData.act}
                  onChange={(e) => setFormData({ ...formData, act: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  TOEFL Score (Optional)
                </label>
                <Input
                  type="number"
                  max="120"
                  placeholder="110"
                  value={formData.toefl}
                  onChange={(e) => setFormData({ ...formData, toefl: e.target.value })}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  IELTS Score (Optional)
                </label>
                <Input
                  type="number"
                  step="0.5"
                  max="9.0"
                  placeholder="7.5"
                  value={formData.ielts}
                  onChange={(e) => setFormData({ ...formData, ielts: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              * At least one standardized test score (SAT or ACT) is required
            </p>
          </div>
        )}

        {/* Step 3: Extracurriculars */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Extracurriculars</h2>
              <p className="text-muted-foreground">Tell us about your top 3 activities</p>
            </div>

            {formData.activities.map((activity, index) => (
              <div key={index} className="p-6 border border-border rounded-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Activity {index + 1}</span>
                  {index === 0 && <span className="text-xs text-primary">Required</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Activity Type
                  </label>
                  <select
                    value={activity.type}
                    onChange={(e) => updateActivity(index, "type", e.target.value)}
                    className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select type</option>
                    <option value="athletics">Athletics / Sports</option>
                    <option value="research">Research / Science</option>
                    <option value="community">Community Service</option>
                    <option value="robotics">Robotics / Engineering</option>
                    <option value="arts">Arts / Music</option>
                    <option value="debate">Debate / Public Speaking</option>
                    <option value="leadership">Leadership / Club President</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title / Position
                  </label>
                  <Input
                    placeholder="e.g., Robotics Team Captain"
                    value={activity.title}
                    onChange={(e) => updateActivity(index, "title", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description / Impact
                  </label>
                  <Textarea
                    placeholder="Describe your role, achievements, and impact (max 150 words)"
                    value={activity.description}
                    onChange={(e) => updateActivity(index, "description", e.target.value)}
                    className="min-h-24"
                    maxLength={750}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            size="lg"
          >
            {step === 3 ? "Analyze My Profile" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
