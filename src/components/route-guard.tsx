"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

const publicRoutes = ["/", "/login", "/register", "/about", "/features", "/about-us"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Check if current route is public
    const isPublicRoute = publicRoutes.includes(pathname);

    // Redirect to login if trying to access protected route without auth
    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }

    // Redirect to dashboard if already logged in and trying to access login/register
    if (isAuthenticated && (pathname === "/login" || pathname === "/register")) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
