import httpStatus from 'http-status';
import { tokenservices, emailServices, userServices } from './index.js';
import prisma from '../../prisma/client.js';
import { ApiError } from '../utils/ApiErrors.js';
import bcrypt from 'bcryptjs';
import { CreateDetailNutritions, RequestGetNutritions } from '../models/index.js';
import { equal } from 'assert';

interface dataNutritions {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  cholesterol: number;
  sodium: number;
  calcium: number;
  iron: number;
  potassium: number;
  magnesium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminB12: number;
}

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

export const getDetailNutritions = async (foodId: number) => {
  const food = await prisma.foodNutritionDetail.findUnique({
    where: {foodId},
  })
  return food
};


export const createDetailNutritions = async (foodId: number, details: CreateDetailNutritions) => {
  return prisma.foodNutritionDetail.create({
    data: {
      foodId,
      ...details,
    },
  });
};


export const updateDetailNutritions = async (foodId: number, dataNutritions: dataNutritions) => {
  await prisma.foodNutritionDetail.update({
    where: {
      foodId
    },
    data: {
      calories: dataNutritions.calories,
      protein: dataNutritions.protein,
      carbs: dataNutritions.carbs,
      fat: dataNutritions.fat,
      fiber: dataNutritions.fiber,
      sugar: dataNutritions.sugar,
      cholesterol: dataNutritions.cholesterol,
      sodium: dataNutritions.sodium,
      calcium: dataNutritions.calcium,
      iron: dataNutritions.iron,
      potassium: dataNutritions.potassium,
      magnesium: dataNutritions.magnesium,
      vitaminA: dataNutritions.vitaminA,
      vitaminC: dataNutritions.vitaminC,
      vitaminD: dataNutritions.vitaminD,
      vitaminB12: dataNutritions.vitaminB12
    }
  })
}
