import { z } from "zod";

export const UserRegistrationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["ADMIN", "VIEWER", "ANALYST"]),
});

export const UserLoginSchema = UserRegistrationSchema.pick({
  email: true,
  password: true,
});

export const UpdateRoleSchema = z.object({
  id: z.string(),
  role: z.enum(["ADMIN", "VIEWER", "ANALYST"]),
});

export const RemoveUserSchema = UpdateRoleSchema.pick({
  id: true,
});

export type UserRegistrationInput = z.infer<typeof UserRegistrationSchema>;
export type UserLoginInput = z.infer<typeof UserLoginSchema>;
export type UpdateRoleInput = z.infer<typeof UpdateRoleSchema>;
export type RemoveUserInput = z.infer<typeof RemoveUserSchema>;
