import { z } from "zod";

export const customerSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100, "O nome é muito longo"),
  telefone: z
    .string()
    .min(15, "Telefone inválido")
    .max(15, "Telefone inválido"),
  cpf: z.string().min(14, "CPF inválido").max(14, "CPF inválido"),
  placa: z
    .string()
    .toUpperCase()
    .regex(
      /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/,
      "Formato de placa inválido (Use o padrão Mercosul ou antigo)",
    ),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
