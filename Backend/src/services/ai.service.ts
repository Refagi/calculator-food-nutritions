import httpStatus from 'http-status';
import { tokenservices, emailServices, userServices } from './index.js';
import prisma from '../../prisma/client.js';
import { ApiError } from '../utils/ApiErrors.js';
import bcrypt from 'bcryptjs';
import { FormatDataNutrition, RequestGetNutritions } from '../models/index.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Groq } from 'groq-sdk';
import config from '../config/config.js';


export const geminiApiRequest = async (dataNutritions: FormatDataNutrition) => {
  try {
    const genAI = new GoogleGenerativeAI(config.gemini.key);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = promptText(dataNutritions);

    const result = await model.generateContent(prompt);

    let res;
    try {
      const rawText = await result.response.text();
      res = JSON.parse(rawText);
      console.log('result AI: ', res.foodNutritionDetail);
      return res.foodNutritionDetail;
    } catch (err) {
      console.error('Raw response:', await result.response.text());
      throw new ApiError(httpStatus.BAD_REQUEST, 'Response AI is not valid JSON.');
    }

    return res.foodNutritionDetail;
  } catch (error: unknown) {
    console.log('error gemini request', error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to summon AI');
  }
};


export const grokApiRequest = async (dataNutritions: FormatDataNutrition) => {
  const groq = new Groq({
    apiKey: config.groq.key
  });
  const prompt = promptText(dataNutritions);

  const result = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ],
    model: 'meta-llama/llama-4-scout-17b-16e-instruct'
  });
  let res;
  try {
    res = JSON.parse(result.choices[0]?.message?.content || '');
    console.log('result AI: ', res.foodNutritionDetail);
    return res.foodNutritionDetail;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Response AI is not valid JSON.');
  }
};

const promptText = (dataNutritions: FormatDataNutrition) => {
  const baseInfo = `Saya memiliki informasi makanan berikut:
Nama makanan: ${dataNutritions.name}
Kalori: ${dataNutritions.calories} kcal
Karbohidrat: ${dataNutritions.carbs} g
Lemak: ${dataNutritions.fat} g
Protein: ${dataNutritions.protein} g
sebanyak ${dataNutritions.portion}`;

  const ingredientInfo = dataNutritions.ingredients && dataNutritions.ingredients.length > 0
    ? `\nMakanan ini dibuat dari: ${Array.isArray(dataNutritions.ingredients) ? dataNutritions.ingredients.join(', ') : dataNutritions.ingredients}`
    : '';

  return `${baseInfo}${ingredientInfo}

Buatkan detail nutrisi lengkap untuk makanan ini sesuai schema Prisma berikut:

model FoodNutritionDetail {
  fiber      Float?
  sugar      Float?
  cholesterol Float?
  sodium     Float?
  calcium    Float?
  iron       Float?
  potassium  Float?
  magnesium  Float?
  vitaminA   Float?
  vitaminC   Float?
  vitaminD   Float?
  vitaminB12 Float?
}

Kamu **hanya boleh membalas dengan JSON valid** sesuai contoh ini, tanpa tambahan teks, tanpa markdown, tanpa penjelasan:
{
  "foodNutritionDetail": {
    "fiber": number,
    "sugar": number,
    "cholesterol": number,
    "sodium": number,
    "calcium": number,
    "iron": number,
    "potassium": number,
    "magnesium": number,
    "vitaminA": number,
    "vitaminC": number,
    "vitaminD": number,
    "vitaminB12": number
  }
}

Isi nilai-nilai nutrisi dengan perkiraan yang realistis sesuai makanan tersebut.
Semua angka gunakan tipe number, boleh desimal.`;
};
