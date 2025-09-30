import httpStatus from 'http-status';
import { tokenservices, emailServices, userServices } from './index.js';
import prisma from '../../prisma/client.js';
import { ApiError } from '../utils/ApiErrors.js';
import bcrypt from 'bcryptjs';
import { CreateDetailNutritions, RequestGetNutritions } from '../models/index.js';

export const getNutritions = async (option: RequestGetNutritions) => {
  const { name } = option;
  const food = await prisma.food.findUnique({
    where: {
      name
    }
  });
  return food;
};

export const getDetailNutritions = async (foodId: number) => {
  const food = await prisma.foodNutritionDetail.findUnique({
    where: {foodId},
    include: {food: true}
  })
  return food
};


export const createDetailNutritions = async (foodId: number, details: CreateDetailNutritions) => {
  return prisma.foodNutritionDetail.create({
    data: {
      foodId,
      ...details,
    },
    include: {food: true}
  });
};
