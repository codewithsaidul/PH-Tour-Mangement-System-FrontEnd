import z from "zod";






export const registerSchema = z.object({
  name: z.string().min(3, { error: "name is to short" }).max(50),
  email: z.email(),
  password: z
    .string()
    .min(8, { error: "password must be at least 8 character long" }),
  confirmPassword: z
    .string()
    .min(8, { error: "password must be at least 8 character long" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password do not match",
  path: ["confirmPassword"]
});
