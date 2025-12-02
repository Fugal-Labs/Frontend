import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  college: z.string().min(2, "College name is required"),
  year: z.string().min(1, "Year of study is required"),
  github: z.string().url("Invalid URL").optional().or(z.literal("")),
  track: z.enum(["web", "mobile", "ai", "blockchain", "iot", "open"], {
    errorMap: () => ({ message: "Please select a valid track" }),
  }),
});

export type RegistrationData = z.infer<typeof registrationSchema>;
