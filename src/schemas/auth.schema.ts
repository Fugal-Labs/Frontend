import { z } from "zod";

export const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or Username is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Schema for multi-step signup form
export const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(
      /^(?![._])(?!.*[._]{2})[a-z0-9._]{3,20}(?<![._])$/,
      "Username must be 3-20 characters, lowercase letters, numbers, dots, underscores. No consecutive or edge dots/underscores."
    ),
  email: z.email("Invalid email address"),
});

export const step2Schema = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const step3Schema = z.object({
  otp: z.string().length(6),
});

export const signupSchema = step1Schema
  .extend(step2Schema.shape)
  .extend(step3Schema.shape);

export type SignupSchema = z.infer<typeof signupSchema>;
