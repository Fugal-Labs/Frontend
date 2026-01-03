"use client";

import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

export default function LoginForm() {
  const router = useRouter();
  const loginUser = useAuthStore((s) => s.loginUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await loginUser({
        credential: data.emailOrUsername,
        password: data.password,
      });
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., show notification)
    }
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-card/80 shadow-xl p-8">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-primary-foreground-elevated">
          Welcome back
        </h2>
        <p className="mt-1 text-sm text-secondary">
          Login to continue to Fugal
          <span className="text-primary-red">Labs</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-secondary">
            Email or Username
          </label>
          <input
            {...register("emailOrUsername")}
            type="text"
            autoComplete="username"
            placeholder="john@example.com or john_doe"
            className="mt-1 w-full rounded-md border border-input bg-input-bg px-3 py-2 text-input-text focus:outline-none focus:ring-2 focus:ring-primary-red"
          />
          {errors.emailOrUsername && (
            <p className="mt-1 text-xs text-red-500">
              {errors.emailOrUsername.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-secondary">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="mt-1 w-full rounded-md border border-input bg-input-bg px-3 py-2 text-input-text focus:outline-none focus:ring-2 focus:ring-primary-red"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <div className="text-right">
          <button
            type="button"
            className="text-xs text-primary-red hover:underline cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-md py-2 font-semibold shadow-glow-red disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-secondary">
        Don’t have an account?{" "}
        <span
          onClick={() => router.push("/signup")}
          className="cursor-pointer text-primary-red hover:underline"
        >
          Sign up
        </span>
      </div>
    </div>
  );
}
