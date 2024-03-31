import { z } from "zod";

export const schema = z.object({
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  model: z.string().min(3, "O modelo deve ter no mínimo 3 caracteres"),
  year: z.number().int().min(1700, "O ano deve ser maior que 1700"),
  km: z.number().min(0, "A quilometragem deve ser maior ou igual a 0"),
  price: z.number().min(0, "O preço deve ser maior ou igual a 0"),
  city: z.string().min(1, "A cidade deve ter no mínimo 1 caracteres"),
  whatsapp: z
    .string()
    .min(8, "O número de WhatsApp deve ter no mínimo 8 caracteres")
    .max(15, "O número de WhatsApp deve ter no máximo 15 caracteres"),
  description: z.string().min(5, "A descrição deve ter no mínimo 5 caracteres"),
});

export type FormData = z.infer<typeof schema>;
