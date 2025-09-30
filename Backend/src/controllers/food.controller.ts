import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiErrors.js';
import { catchAsync } from '../utils/catchAsync.js';
import { userServices, aiServices, foodServices } from '../services/index.js';
import { Response, Request, NextFunction } from 'express';
import prisma from '../../prisma/client.js';
import { AuthRequest } from '../models/index.js';

export const createDetailNutritions = catchAsync(async (req: AuthRequest, res: Response) => {
    // const accessToken = req.cookies.accessCookie;
    const name = req.body.name;
    if (!name) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'name food is required');
    }
    const food = await foodServices.getNutritions({ name });

    if (!food) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Food is not found');
    }
    let detailNutritions = await foodServices.getDetailNutritions(food.id);

    if (!detailNutritions) {
      const dataFood = {
        name: food.name,
        calories: food.calories,
        carbs: food.carbs,
        fat: food.fat,
        protein: food.protein,
        porsi: req.body.porsi,
        ingridient: req.body.ingridient,
      };
      let aiResponse = await aiServices.geminiApiRequest(dataFood);
      if(!aiResponse) {
        aiResponse = await aiServices.grokApiRequest(dataFood);
      }

      detailNutritions = await foodServices.createDetailNutritions(food.id, aiResponse);
    }

    res.status(httpStatus.OK).send({
    status: httpStatus.OK,
    message: 'Get food with details successfully',
    data: {
      ...food,
      details: detailNutritions ,
    },
  });
  }
);
