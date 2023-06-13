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
    value: z
      .string()
      .max(10)
      .min(1)
      .transform((value) => parseInt(value)),
    description: z.string()
  })
  .required();

export type TCreateAnnoucement = z.infer<typeof createAnnoucementSchema>;
