import { z } from 'zod';

export const getNutritions = {
  query: z.object({
    name: z.string().optional(),
})}

export const createDetailNutritions = {
  body: z.object({
    name: z.string(),
    porsi: z.number().or(z.string()),
    ingridient: z.string().array().optional()
  })
};

