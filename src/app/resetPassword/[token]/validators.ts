import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Deve ter no mínimo 8 caracteres")
      .max(50)
      .refine((value) => /[a-z]/.test(value), "Deve conter ao menos uma letra minúscula")
      .refine((value) => /[A-Z]/.test(value), "Deve conter ao menos uma letra maiúscula")
      .refine((value) => /[$*&@#]/.test(value), "Deve conter ao menos um caractere especial"),
    confirm: z.string().min(1, "A Confirmação de senha é obrigatório")
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "As senhas não correspondem",
    path: ["confirm"]
  });

export type TResetPassword = z.infer<typeof resetPasswordSchema>;
