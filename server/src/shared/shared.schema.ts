import z from "zod";

const emailSchema = z.email();
const passwordSchema = z.string().min(6).max(32);
const role = z.enum(["user", "admin"]).default("user");
const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    role: role,
});

const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

const updateUserSchema = signupSchema
    .pick({ email: true, role: true })
    .partial();

const sharedSchema = {
    email: emailSchema,
    password: passwordSchema,
    signup: signupSchema,
    login: loginSchema,
    updateUser: updateUserSchema,
};

export default sharedSchema;
