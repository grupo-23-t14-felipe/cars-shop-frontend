import z from "zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Deve ter no mínimo 3 caracteres")
      .max(20, "Deve ter no máximo 30 caracteres"),

    email: z.string().email("Insira um email válido").max(40),
    birthday: z.string(),
    description: z.string().optional(),
    cep: z.string().optional(),
    number: z.string().max(8).min(1, "Digite o número do endereço"),
    complement: z.string().optional(),
    cpf: z.string().optional(),
    cellphone: z.string().optional(),
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

export type RegisterData = z.infer<typeof registerSchema>;
export default registerSchema;
