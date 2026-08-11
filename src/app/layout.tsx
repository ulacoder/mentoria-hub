import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { LocaleProvider } from "@/contexts/locale-context";
import { Navbar } from "@/components/navbar";
import { GlobalAuthModal } from "@/components/global-auth-modal";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Applyze - Know Your Chances Before You Apply",
  description: "AI-powered profile assessment for college admissions. Get your admission chances scored and personalized roadmap to top universities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <LocaleProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <GlobalAuthModal />
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
