import httpStatus from 'http-status';
import { tokenservices, emailServices, userServices } from './index.js';
import prisma from '../../prisma/client.js';
import { ApiError } from '../utils/ApiErrors.js';
import CryptoJS from 'crypto-js';
import { CreateDetailNutritions, RequestGetNutritions } from '../models/index.js';

export const getNutritions = async (option: RequestGetNutritions) => {
  const { name } = option;
  const food = await prisma.food.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });
  return food;
};

export const getDetailNutritions = async (inputHash: string) => {
  const food = await prisma.foodNutritionDetail.findUnique({
    where: {inputHash},
  })
  return food
};


export const createDetailNutritions = async (foodId: number, foodName: string, portion: string, inputHash: string, ingredients: string[], details: CreateDetailNutritions) => {
  return prisma.foodNutritionDetail.create({
    data: {
      foodId,
      foodName,
      portion,
      ingredients,
      inputHash,
      ...details,
    },
  });
};

export const generateFoodRequestHash = (foodName: string, ingredients: string[], portion: number) => {
  const normalizedIngredients = JSON.stringify({
    foodName: foodName.trim().toLocaleLowerCase(),
    ingredients: ingredients.map(ingr => ingr.trim().toLowerCase()).sort().join(','),
    portion
  });
  let hashed = CryptoJS.SHA256(normalizedIngredients)
  return hashed.toString(CryptoJS.enc.Hex);
}
