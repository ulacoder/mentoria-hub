"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function StartPage() {
  const router = useRouter();
  const { user, setShowAuthModal } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Academic
    gpa: "",
    sat: "",
    act: "",
    apCourses: [] as string[],

    // Extracurriculars
    activities: "",
    awards: "",

    // Personal
    intendedMajor: "",
    location: "",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save to database and redirect to dashboard
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // TODO: Save profile data to Supabase
    console.log("Profile data:", formData);

    // Redirect to dashboard
    router.push("/dashboard");
  };

  const isStepValid = () => {
    if (step === 1) {
      return formData.gpa && (formData.sat || formData.act);
    }
    if (step === 2) {
      return formData.activities.length > 0;
    }
    if (step === 3) {
      return formData.intendedMajor.length > 0;
    }
    return false;
  };

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

        {/* Step 1: Academic */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Academic Profile</h2>
              <p className="text-muted-foreground">Tell us about your academic performance</p>
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

            <p className="text-sm text-muted-foreground">* At least one test score (SAT or ACT) is required</p>
          </div>
        )}

        {/* Step 2: Extracurriculars */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">Extracurriculars</h2>
              <p className="text-muted-foreground">What activities and achievements define you?</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Activities & Leadership *
              </label>
              <Textarea
                placeholder="E.g., Robotics Club Captain (3 years), Debate Team, Volunteer tutor..."
                value={formData.activities}
                onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                className="min-h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Awards & Honors
              </label>
              <Textarea
                placeholder="E.g., National Merit Scholar, Math Olympiad Gold, Science Fair 1st place..."
                value={formData.awards}
                onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                className="min-h-32"
              />
            </div>
          </div>
        )}

        {/* Step 3: Personal */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">About You</h2>
              <p className="text-muted-foreground">Help us personalize your recommendations</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Intended Major *
              </label>
              <Input
                placeholder="E.g., Computer Science, Biology, Economics..."
                value={formData.intendedMajor}
                onChange={(e) => setFormData({ ...formData, intendedMajor: e.target.value })}
                className="h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>
              <Input
                placeholder="E.g., California, USA or Almaty, Kazakhstan..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-12"
              />
            </div>
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
            {step === 3 ? "Get My Profile Score" : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
