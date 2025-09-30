import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';


export interface PayloadType {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
}

export interface AuthRequest extends Request {
  user?: User | any;
  tokens?: unknown;
  cookies: Record<string, any>;
}


export interface RequestCreateUser {
  name: string;
  email: string;
  password: string;
}

export interface ResquestUpdateUser {
  username?: string;
  email?: string;
  password?: string;
  age?: number;
  isEmailVerified?: boolean;
  updatedAt?: Date;
}

export interface RequestLoginUser {
  email: string;
  name: string;
  password?: string;
  googleID: string;
}

export interface RequestGetNutritions {
  name: string;
}

export interface FormatDataNutrition {
  name: string;
  calories: number | null;
  carbs: number | null;
  fat: number | null;
  protein: number | null;
  porsi: number | string;
  ingridient: string | string[];
}

export interface CreateDetailNutritions {
  fiber: number | null;
  sugar: number | null;
  cholesterol: number | null;
  sodium: number | null;
  calcium: number | null;
  iron: number | null;
  potassium: number | null;
  magnesium: number | null;
  vitaminA: number | null;
  vitaminC: number | null;
  vitaminD: number | null;
  vitaminB12: number | null;
}
