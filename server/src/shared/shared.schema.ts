import z from "zod";

export const emailSchema = z.email();
export const passwordSchema = z.string().min(6).max(32);
export const role = z.enum(["user", "admin"]).default("user");
export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    role: role,
});

export const updateUserSchema = registerSchema
    .pick({ email: true, role: true })
    .partial();

const sharedSchema = {
    email: emailSchema,
    password: passwordSchema,
    register: registerSchema,
    updateUser: updateUserSchema,
};

export default sharedSchema;
