import z from "zod";

export const editAddressSchema = z.object({
  cep: z.string().optional(),
  number: z.string().max(8, "Deve ter no máximo 8 digitos").min(1, "Digite o número do endereço"),
  complement: z.string().optional()
});

export type TEditAddress = z.infer<typeof editAddressSchema>;
