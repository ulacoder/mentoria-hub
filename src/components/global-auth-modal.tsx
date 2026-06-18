"use client";

import { useAuth } from "@/contexts/auth-context";
import { AuthModal } from "@/components/auth-modal";

export function GlobalAuthModal() {
  const { showAuthModal, setShowAuthModal, authRedirectTo } = useAuth();

  return (
    <AuthModal
      isOpen={showAuthModal}
      onClose={() => setShowAuthModal(false)}
      redirectTo={authRedirectTo || undefined}
    />
  );
}
