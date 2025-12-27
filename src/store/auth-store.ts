import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getCurrentUser,
  logoutUser,
  registerUser as registerUserApi,
  loginUser as loginUserApi,
  refreshToken as refreshTokenApi,
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
          set({ user });
        } catch {
          set({ user: null });
        } finally {
          set({ isLoading: false, initialized: true });
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
          set({ user: null });
          throw error;
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
