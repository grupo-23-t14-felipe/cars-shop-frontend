import z from "zod";

const loginSchema = z.object({
  password: z.string(),
  email: z.string().email(),
});

export type LoginData = z.infer<typeof loginSchema>;
export default loginSchema;