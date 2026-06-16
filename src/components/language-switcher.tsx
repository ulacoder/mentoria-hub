"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { useLocale } from "@/contexts/locale-context";

const languages = [
  { code: "ru", name: "RU", flag: "🇷🇺" },
  { code: "en", name: "ENG", flag: "🇬🇧" },
  { code: "kz", name: "KZ", flag: "🇰🇿" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLocale();

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const switchLanguage = (langCode: "ru" | "en" | "kz") => {
    setLocale(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/60 hover:border-primary/40 transition-colors bg-background"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border/60 rounded-lg shadow-lg z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code as "ru" | "en" | "kz")}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left ${
                  lang.code === locale ? "bg-primary/10" : ""
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
