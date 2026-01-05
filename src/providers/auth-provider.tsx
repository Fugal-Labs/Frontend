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
    // fetchUser is a stable action from the auth store and does not need to be in the deps array
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
    let isMounted = true;

    // setInterval waits 14 minutes before the first refresh, which is appropriate
    // since the token is fresh after login/registration
    intervalRef.current = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        if (!isMounted) {
          return;
        }
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
