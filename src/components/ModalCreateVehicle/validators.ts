import z from "zod";

export const createAnnoucementSchema = z
  .object({
    brand: z.string(),
    model: z.string(),
    mileage: z
      .string()
      .min(1)
      .transform((value) => parseInt(value)),
    color: z.string().max(30).min(3),
    description: z.string()
  })
  .required();

export const checkCharactersSchema = z.string().regex(/^[A-Za-z]+$/);

export type TCreateAnnoucement = z.infer<typeof createAnnoucementSchema>;
