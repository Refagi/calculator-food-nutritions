import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiErrors.js';
import { catchAsync } from '../utils/catchAsync.js';
import { userServices, aiServices, foodServices } from '../services/index.js';
import { Response, Request, NextFunction } from 'express';
import { AuthRequest } from '../models/index.js';

export const createDetailNutritions = catchAsync(async (req: AuthRequest, res: Response) => {
    const { name, portion, ingredients } = req.body;
    if (!name) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'name food is required');
    }
    const food = await foodServices.getNutritions({ name });

    if (!food) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Food is not found');
    }
    let dataFood = {
      name: food.name,
      calories: food.calories,
      carbs: food.carbs,
      fat: food.fat,
      protein: food.protein,
      portion,
      ingredients,
    };
    let detailNutritions = await foodServices.getDetailNutritions(food.id);
    let aiResponse = await aiServices.geminiApiRequest(dataFood);
    if (!aiResponse) {
      aiResponse = await aiServices.grokApiRequest(dataFood);
    }

    if (!aiResponse) {
      throw new ApiError(
        httpStatus.SERVICE_UNAVAILABLE, 'Failed to get nutrition details from AI services');
      }

    if (!detailNutritions) {
      await foodServices.createDetailNutritions(food.id, aiResponse);
    } else {
      await foodServices.updateDetailNutritions(food.id, aiResponse);
    }

    const updatedDetail = await foodServices.getDetailNutritions(food.id);

    res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get food with details successfully',
    data: {
      name: food.name,
      portion,
      ingredients,
      image_url: food.image_url,
      details: updatedDetail,
    },
  });
  }
);
