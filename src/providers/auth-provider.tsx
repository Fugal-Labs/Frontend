"use client";

import { useEffect, useRef } from "react";
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initial user fetch
  useEffect(() => {
    if (!initialized) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  // Periodic token refresh (every 14 minutes if user is logged in)
  useEffect(() => {
    // Clear any existing interval first to prevent multiple intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only set up interval if user is logged in
    if (!user) return;

    const REFRESH_INTERVAL = 14 * 60 * 1000; // 14 minutes

    // Set up the interval with an initial delay since token is fresh after login
    intervalRef.current = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error("[AuthProvider] Token refresh failed:", error);
      }
    }, REFRESH_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user, refreshToken]);

  return <>{children}</>;
}
