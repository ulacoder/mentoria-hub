"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.05] tracking-tight">
            Your journey to top universities, simplified
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Applyze scores your profile like an admissions officer would, builds your personalized roadmap, and shows you where you really stand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={user ? "/start" : "/start"}>
              <Button size="lg" className="h-12 px-8 text-base">
                Get your free AI profile evaluation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            {!user && (
              <Link href="/auth">
                <Button size="lg" variant="ghost" className="h-12 px-8 text-base">
                  Sign in
                </Button>
              </Link>
            )}
          </div>

          <div className="mt-16 pt-8 border-t border-border/40">
            <p className="text-sm text-muted-foreground">
              Free tier available · Pro plans from $9/month
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-foreground">Applyze</span>
            </div>

            <div className="flex items-center gap-6">
              <span>© 2026 Applyze</span>
              <a href="mailto:support@applyze.gg" className="hover:text-foreground transition-colors">
                support@applyze.gg
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
