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

    const rawText = await result.response.text();

    const cleanedText = rawText
      .replace(/```json\s*/gi, '')
      .replace(/```/g, '')
      .trim();

    try {
      const res = JSON.parse(cleanedText);
      console.log('result AI Gemini: ', res.foodNutritionDetail);
      return res.foodNutritionDetail;
    } catch (err) {
      console.error('Gemini - Invalid JSON response:', rawText);
      return null;
    }
  } catch (error: unknown) {
    console.log('Gemini request failed:', error);
    return null;
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
  try {
    const rawText = result.choices[0]?.message?.content || '';
    const cleanedText = rawText
    .replace(/```json\s*/gi, '')
    .replace(/```/g, '')
    .trim();
    const res = JSON.parse(cleanedText);
    console.log('result AI Groq: ', res.foodNutritionDetail);
    return res.foodNutritionDetail;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Response AI Groq is not valid JSON.');
  }
};

const promptText = (dataNutritions: FormatDataNutrition) => {
const baseInfo = `Saya memiliki informasi makanan berikut:
Nama makanan: ${dataNutritions.foodName}
Kalori: ${dataNutritions.calories} kcal
Karbohidrat: ${dataNutritions.carbs} g
Lemak: ${dataNutritions.fat} g
Protein: ${dataNutritions.protein} g
sebanyak ${dataNutritions.portion}
jumlah kalori, karbohidrat, lemak, protein adalah hasil dari per 100 gram makanan
`;

const ingredientInfo = `\nMakanan ini dibuat dengan bahan - bahan: ${
  Array.isArray(dataNutritions.ingredients)
    ? dataNutritions.ingredients.join(', ')
    : String(dataNutritions.ingredients)
}`;

return `${baseInfo}${ingredientInfo}
hitung ulang jumlah ${dataNutritions.calories}, ${dataNutritions.carbs}, ${dataNutritions.fat}, ${dataNutritions.protein},
sesuai dengan bahan - bahan ${dataNutritions.ingredients}
perthitungan di hitung per porsi dari jumlah porsi yaitu ${dataNutritions.portion}
Buatkan detail nutrisi lengkap untuk makanan ini sesuai schema Prisma berikut:

model FoodNutritionDetail {
  foodName   String
  ingredients String[]
  portion    Int
  calories   Float? (kcal)
  protein    Float? (g)
  carbs      Float? (g)
  fat        Float? (g)
  fiber      Float? (g)
  sugar      Float? (g)
  cholesterol Float? (mg)
  sodium     Float? (mg)
  calcium    Float? (mg)
  iron       Float? (mg)
  potassium  Float? (mg)
  magnesium  Float? (mg)
  vitaminA   Float? (mikrogram)
  vitaminC   Float? (mg)
  vitaminD   Float? (mikrogram)
  vitaminB12 Float? (mikrogram)
}

Kamu hanya boleh membalas dengan JSON valid sesuai contoh ini, tanpa tambahan teks, tanpa markdown, tanpa penjelasan:
{
  "foodNutritionDetail": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
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

Isi nilai-nilai nutrisi dengan perkiraan yang realistis sesuai makanan tersebut dan sesuai satuan dari masing-masing nutrisi makanan tersebut.
Semua angka gunakan tipe number, boleh desimal.`;
};
