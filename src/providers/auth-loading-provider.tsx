"use client";

import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";

export default function AuthLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  if (typeof window !== "undefined" && !mounted) {
    setMounted(true);
  }

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">Authenticating…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
