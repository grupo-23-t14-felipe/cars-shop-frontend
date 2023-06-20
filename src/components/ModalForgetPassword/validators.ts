import z from "zod";

export const modalForgetPassSchema = z.object({
  email: z.string().email("Insira um email valido")
});

export type TModalForget = z.infer<typeof modalForgetPassSchema>;
