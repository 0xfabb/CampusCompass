import { z } from "zod";

export const classCoordinatorSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  department: z.string().min(1, "Department is required"),
  section: z.string().min(1, "Section is required"),
  teacherEmail: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
