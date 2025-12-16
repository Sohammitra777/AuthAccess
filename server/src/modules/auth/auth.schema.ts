import z from "zod";

export const emailSchema = z.email();
export const passwordSchema = z.string().min(16).max(32);
export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

const authSchema = {
    email: emailSchema,
    password: passwordSchema,
    register: registerSchema,
};

export default authSchema;
