import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiErrors.js';
import { catchAsync } from '../utils/catchAsync.js';
import { userServices, aiServices, foodServices } from '../services/index.js';
import { Response, Request, NextFunction } from 'express';
import { AuthRequest } from '../models/index.js';

export const createDetailNutritions = catchAsync(async (req: AuthRequest, res: Response) => {
    await userServices.CheckRequest(req.user.id);
    const { foodName, portion, ingredients } = req.body;
    if (!foodName) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'name food is required');
    }
    const food = await foodServices.getNutritions({ name: foodName });

    if (!food) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Food is not found');
    }

    let createHashInput = foodServices.generateFoodRequestHash(foodName, ingredients, portion)
    let detailNutritions = await foodServices.getDetailNutritions(createHashInput);

    if(!detailNutritions) {
        let dataFood = {
          foodName: food.name,
          calories: food.calories,
          carbs: food.carbs,
          fat: food.fat,
          protein: food.protein,
          portion,
          ingredients,
        };

      let  aiResponse = await aiServices.geminiApiRequest(dataFood) ?? await aiServices.grokApiRequest(dataFood);

      if (!aiResponse) {
      throw new ApiError(
        httpStatus.SERVICE_UNAVAILABLE, 'Failed to get nutrition details from AI services');
      }

      detailNutritions = await foodServices.createDetailNutritions(food.id, foodName, portion, createHashInput, ingredients, aiResponse);
    }

    await Promise.all([
      foodServices.createFoodDetailRequest(req.user.id, detailNutritions.id),
      userServices.incrementRequest(req.user.id)
    ])

    res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get food with details successfully',
    data: {
      name: food.name,
      portion,
      ingredients,
      image_url: food.image_url,
      details: detailNutritions,
    },
  });
  }
);
