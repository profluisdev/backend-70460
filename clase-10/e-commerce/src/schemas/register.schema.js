import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().nonempty().min(3),
  last_name: z.string().nonempty().min(3),
  email: z.string().email(),
  age: z.number(),
  role: z.enum(["user", "admin"]).optional(),
});
