import { z } from 'zod';

export const getNutritions = {
  query: z.object({
    foodName: z.string().optional(),
})}

export const createDetailNutritions = {
  body: z.object({
    foodName: z.string(),
    portion: z.number().or(z.string()),
    ingredients: z.string().array()
  })
};

