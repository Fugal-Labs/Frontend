"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const initialized = useAuthStore((s) => s.initialized);
  const user = useAuthStore((s) => s.user);
  const refreshToken = useAuthStore((s) => s.refreshToken);

  // Initial user fetch
  useEffect(() => {
    if (!initialized) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  // Periodic token refresh (every 14 minutes if user is logged in)
  useEffect(() => {
    if (!user) return;

    const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes

    const intervalId = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error("[AuthProvider] Token refresh failed:", error);
      }
    }, REFRESH_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [user, refreshToken]);

  return <>{children}</>;
}
