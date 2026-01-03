import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCurrentUser,
  logoutUser,
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  refreshToken as refreshTokenApi,
  logoutAllSessions as logoutAllSessionsApi,
} from "@/lib/api/users.api";
import { LoginData, RegisterData, User } from "@/types/user";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  initialized: boolean;
  registerUser: (userData: RegisterData) => Promise<void>;
  loginUser: (userData: LoginData) => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  logoutAll: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      initialized: false,

      fetchUser: async () => {
        try {
          set({ isLoading: true });

          const user = await getCurrentUser();
          set({ user, initialized: true });
        } catch (error: unknown) {
          // Always set user to null and mark as initialized on any error during fetchUser
          set({ user: null, initialized: true });
          console.log(
            "[AuthStore] fetchUser failed:",
            error instanceof Error && "response" in error
              ? (error as { response?: { status?: number } }).response?.status
              : "Unknown error"
          );
        } finally {
          set({ isLoading: false });
        }
      },

      registerUser: async (userData: RegisterData) => {
        try {
          set({ isLoading: true });

          const user = await registerUserApi(userData);
          set({ user, initialized: true });
        } catch (error) {
          console.error("Registration failed:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      loginUser: async (userData: LoginData) => {
        try {
          set({ isLoading: true });
          const user = await loginUserApi(userData);
          set({ user, initialized: true });
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        await logoutUser();
        set({ user: null, initialized: true });
      },

      refreshToken: async () => {
        try {
          await refreshTokenApi();
        } catch (error) {
          console.error("[AuthStore] refreshToken failed:", error);
          set({ user: null, initialized: true });
          throw error;
        }
      },

      logoutAll: async () => {
        await logoutAllSessionsApi();
        set({ user: null, initialized: true });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        initialized: state.initialized,
      }),
    }
  )
);
