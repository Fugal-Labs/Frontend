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

  useEffect(() => {
    if (!initialized) {
      fetchUser();
    }
  }, [fetchUser, initialized]);

  return <>{children}</>;
}
