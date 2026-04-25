import { z } from "zod";
import { User_Role } from "../utils/utils.constents";

const createUserSchema = z.object({
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: z.string("Email is required").email("Invalid email address"),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  address: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  status: z.enum(["active", "inactive"]).default("active").optional(),
  is_verified: z.boolean().default(false).optional(),
  is_block: z.boolean().default(false).optional(),
  profile_img: z.string().url("Invalid image URL").optional(),
  role: z.nativeEnum(User_Role).default(User_Role.user),
});

const updateUserSchema = createUserSchema.partial().omit({
  email: true,
});

export const UserValidation = {
  createUserSchema,
  updateUserSchema,
};
