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
    description: z.string(),
    is_active: z.string().transform((val) => {
      if (val === "true") {
        return true;
      } else {
        return false;
      }
    }),
    img: z.any().optional()
  })
  .required();

export type TCreateAnnoucement = z.infer<typeof createAnnoucementSchema>;
