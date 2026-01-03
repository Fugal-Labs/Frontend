"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  signupSchema,
  type SignupSchema,
  step1Schema,
  step2Schema,
} from "@/schemas/auth.schema";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import StepIndicator from "./StepIndicator";
import OtpLoader from "./OtpLoader";
import PasswordChecklist from "./passwordCheck";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendOtp } from "@/lib/api/otp.api";
import { useAuthStore } from "@/store/auth-store";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-secondary"
      >
        {label}
      </label>
      <input
        {...props}
        aria-invalid={!!error}
        className={clsx(
          "w-full rounded-md border bg-input-bg px-3 py-2 transition focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500/60"
            : "border-input focus:ring-primary-red"
        )}
      />
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}

export default function SignupForm() {
  const router = useRouter();
  const registerUser = useAuthStore((s) => s.registerUser);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResent, setIsResent] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const passwordValue = watch("password", "");

  // Start resend timer only when step 3 is reached
  useEffect(() => {
    if (step === 3 && resendTimer === 0) {
      setResendTimer(30);
    }
  }, [step]);

  // Handle the countdown
  useEffect(() => {
    if (resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resendTimer]);

  // Resend OTP handler
  const handleResendOtp = (email: string) => {
    if (resendTimer === 0) {
      setResendTimer(30);
      sendOtp(email);
      setTimeout(() => {
        setIsResent(true);
      }, 500);
    }
  };

  const nextStep = async () => {
    let schema;

    if (step === 1) schema = step1Schema;
    if (step === 2) schema = step2Schema;
    if (!schema) return;

    const values = watch();
    const result = schema.safeParse(values);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        setError(issue.path[0] as keyof SignupSchema, {
          type: "manual",
          message: issue.message,
        });
      });
      return;
    }

    if (step === 1) {
      clearErrors(["name", "username", "email"]);
      setStep(2);
      return;
    }

    if (step === 2) {
      clearErrors(["password", "confirmPassword"]);
      setSendingOtp(true);

      const email = watch("email");
      const otpSent = await sendOtp(email);

      setSendingOtp(false);

      if (otpSent) {
        setStep(3);
      } else {
        setError("email", {
          type: "manual",
          message: "Failed to send OTP. Please try again.",
        });
      }

      return;
    }
  };

  const prevStep = () => {
    setStep((s) => (s - 1) as 1 | 2 | 3);
  };

  const onSubmit = async (data: SignupSchema) => {
    try {
      const result = signupSchema.safeParse(data);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          setError(issue.path[0] as keyof SignupSchema, {
            message: issue.message,
          });
        });
        return;
      }

      await registerUser(result.data);
      router.push("/");
    } catch (error) {
      setError("otp", {
        type: "manual",
        message: "Failed to verify OTP. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-card/80 p-4 sm:p-8 shadow-xl mx-auto">
      <h2 className="mb-6 text-center text-lg sm:text-2xl font-bold">
        Create your Fugal<span className="text-primary-red">Labs</span> account
      </h2>

      {/* Step indicator */}
      <StepIndicator step={step} />

      {/* OTP SENDING LOADER */}
      {sendingOtp && <OtpLoader />}

      {isResent && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800 border border-green-200">
          OTP has been resent to your email.
        </div>
      )}

      {!sendingOtp && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <>
              <Input
                label="Name"
                placeholder="John Doe"
                id="name"
                {...register("name")}
                error={errors.name?.message}
              />
              <Input
                label="Username"
                placeholder="john_doe"
                id="username"
                {...register("username")}
                error={errors.username?.message}
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                id="email"
                {...register("email")}
                error={errors.email?.message}
              />

              <Button
                type="button"
                disabled={isSubmitting}
                onClick={nextStep}
                className="w-full"
              >
                Continue
              </Button>

              <div className="mt-6 text-center text-sm text-secondary">
                Already have an account?{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="cursor-pointer text-primary-red hover:underline"
                >
                  Log in
                </span>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                id="password"
                {...register("password")}
              />
              <PasswordChecklist password={passwordValue} />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                id="confirm-password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
              />

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm text-center text-secondary">
                Enter the 6-digit code sent to your email.
              </p>

              <Input
                label="OTP"
                placeholder="6-digit code"
                id="otp"
                autoComplete="one-time-code"
                {...register("otp")}
                error={errors.otp?.message}
              />

              <div className="flex mt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Verifying…" : "Verify & Create Account"}
                </Button>
              </div>

              <button
                type="button"
                disabled={resendTimer > 0}
                onClick={() => handleResendOtp(watch("email"))}
                className="mt-6 text-right text-sm text-secondary hover:underline cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Resend OTP{resendTimer > 0 ? ` (${resendTimer})` : ""}
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
