"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Target, TrendingUp, Users, Database } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">✨ AI-Powered Admissions</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.05] tracking-tight">
            Your journey to top universities, simplified
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            Applyze scores your profile like an admissions officer would, builds your personalized admissions roadmap, and shows you where you really stand against 400+ historical applicants to top US universities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/start">
              <Button size="lg" className="h-14 px-8 text-base">
                Get your free AI profile evaluation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Link href="/login">
              <Button size="lg" variant="ghost" className="h-14 px-8 text-base">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From profile analysis to acceptance — powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">
                Tell us about yourself
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Share your GPA, test scores, activities, and academic interests through our simple questionnaire.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">
                AI Analysis
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our algorithm evaluates your profile using the same criteria as Ivy League admission officers.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">
                Get Your Score
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Receive an objective assessment of your admission chances with detailed breakdown by category.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">
                Follow the Roadmap
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Get a step-by-step personalized plan with deadlines and milestones to maximize your chances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Data Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Learn from 400+ real admission cases
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Compare your profile against historical applicants to Stanford, MIT, Harvard, and other top universities. See what worked and what didn't — learn from real success stories and rejections.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">400+</div>
                  <div className="text-sm text-muted-foreground">Real profiles</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Universities</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">3 years</div>
                  <div className="text-sm text-muted-foreground">Of data</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Anonymous</div>
                </div>
              </div>

              <Link href="/start">
                <Button size="lg" className="h-12 px-8">
                  Start your evaluation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-foreground text-lg">Applyze</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="mailto:info@applyze.gg" className="hover:text-foreground transition-colors">
                info@applyze.gg
              </a>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>

            <div>
              <span>© 2026 Applyze. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
