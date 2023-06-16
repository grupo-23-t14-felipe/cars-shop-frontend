import z from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Deve ter no mínimo 3 caracteres")
    .max(20, "Deve ter no máximo 30 caracteres"),
  password: z
    .string()
    .min(8, "Deve ter no mínimo 8 caracteres")
    .max(50)
    .refine(
      (value) => /[a-z]/.test(value),
      "Deve conter ao menos uma letra minúscula"
    )
    .refine(
      (value) => /[A-Z]/.test(value),
      "Deve conter ao menos uma letra maiúscula"
    )
    .refine(
      (value) => /[$*&@#]/.test(value),
      "Deve conter ao menos um caractere especial"
    ),
  email: z.string().email("Insira um email válido").max(40),
  telephone: z
    .string()
    .min(8, "Deve ter no mínimo 8 caracteres")
    .max(16, "Deve ter no máximo 16 caracteres"),
});

export type RegisterData = z.infer<typeof registerSchema>;
export default registerSchema;