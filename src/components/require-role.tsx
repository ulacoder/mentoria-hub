import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RequireRoleProps {
  children: React.ReactNode;
  role: "student" | "mentor" | "admin" | "student" | "mentor" | "admin"[];
  fallback?: React.ReactNode;
}

export function RequireRole({ children, role, fallback }: RequireRoleProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const allowedRoles = Array.isArray(role) ? role : [role];
  const hasAccess = allowedRoles.includes(user.role);

  if (!hasAccess) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Доступ запрещен</h1>
        <p className="text-muted-foreground">У вас нет прав для просмотра этой страницы.</p>
      </div>
    );
  }

  return <>{children}</>;
}
