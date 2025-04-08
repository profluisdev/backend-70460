import { z } from "zod";

// Crear

// editar

export const editProductSchema = {
  // params: z.object({
  //   pid: z.string().regex(/^[a-fA-F0-9]{24}$/, "Debe ser un ObjectId"),
  // }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    thumbnail: z.array().optional(),
    code: z.string().optional(),
    stock: z.number().optional(),
    category: z.string().optional(),
  }),
  query: z.object({
    name: z.string().min(5),
    price: z.string()
  })
};

// eliminar
