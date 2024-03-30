import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Insira um email válido").min(5),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres e é obrigatória"),
});

export type FormData = z.infer<typeof schema>;
