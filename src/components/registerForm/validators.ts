import z from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Deve ter no mínimo 3 caracteres")
    .max(20, "Deve ter no máximo 30 caracteres"),
  email: z.string().email("Insira um email válido").max(40),
  cpf: z.string().min(11).max(11),
  phone: z
    .string()
    .min(8, "Deve ter no mínimo 8 caracteres")
    .max(16, "Deve ter no máximo 16 caracteres"),
  birthday: z.string().max(8),
  description: z.string().min(10),

  CEP: z.string().max(8),
  state: z.string().max(20),
  city: z.string().max(20),
  street: z.string().max(30),
  number: z.string().max(5),
  comprement: z.string().max(10),
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


});

export type RegisterData = z.infer<typeof registerSchema>;
export default registerSchema;