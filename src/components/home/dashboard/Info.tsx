"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const { user, logoutAll } = useAuthStore();
  const router = useRouter();

  const handleLogoutAll = async () => {
    try {
      await logoutAll();
      router.push("/login");
    } catch (error) {
      console.error("Logout from all sessions failed:", error);
    }
  };

  return (
    <div className="p-4 bg-background rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Welcome to Your Dashboard</h2>
      {user ? (
        <div>
          <p className="mb-2">
            Hello, <span className="font-bold">{user.name}</span>!
          </p>
          <p className="mb-2">Email: {user.email}</p>
          <p className="mb-2">
            Member since: {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <Button variant="destructive" onClick={handleLogoutAll}>
            Logout from All Sessions
          </Button>
        </div>
      ) : (
        <p>Please log in to see your information.</p>
      )}
    </div>
  );
}
