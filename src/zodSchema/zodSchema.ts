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





export const tourSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(3, "title must be contain at least 3 characters minimum"),
  description: z
    .string()
    .nonempty("Description is required")
    .min(20, "Description must be contain at least 20 characters minimum"),
  startDate: z.date({ message: "Start Date is required" }),
  endDate: z.date({ message: "End Date is required" }),
  division: z.string().min(1, "Division is required"),
  tourType: z.string().min(1, "Tour Types is requird"),
});