import z from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Deve ter no mínimo 3 caracteres")
    .max(20, "Deve ter no máximo 30 caracteres"),
  email: z.string().email("Insira um email válido").max(40),
  cpf: z.string().optional(),
  cellphone: z.string().optional(),
  birthday: z.string(),
  description: z.string().optional(),
});

export type TEditProfile = z.infer<typeof editProfileSchema>;
