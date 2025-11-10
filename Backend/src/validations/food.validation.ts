import { z } from 'zod';

export const getNutritions = {
  query: z.object({
    name: z.string().optional(),
})}

export const createDetailNutritions = {
  body: z.object({
    name: z.string(),
    portion: z.number().or(z.string()),
    ingredients: z.string().array().optional()
  })
};

