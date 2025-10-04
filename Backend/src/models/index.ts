import { Request } from 'express';
import { User } from '@prisma/client';

export type BaseUserInput = Pick<User, "name" | "email" | "password">;

export interface JwtPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string
}

export interface AuthRequest extends Request {
  user?: User | any;
  tokens?: unknown;
  cookies: Record<string, any>;
}

export interface RequestCreateUser extends BaseUserInput {}

export type RequestUpdateUser =
Partial< Omit<User, 'id' | 'createdAt' | 'updatedAt'>> & {updatedAt?: Date;};

export interface RequestLoginUser {
  email: string;
  password?: string;
  googleId?: string;
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
  portion: number | string;
  ingredients: string | string[];
}

export interface CreateDetailNutritions {
  fiber?: number | null;
  sugar?: number | null;
  cholesterol?: number | null;
  sodium?: number | null;
  calcium?: number | null;
  iron?: number | null;
  potassium?: number | null;
  magnesium?: number | null;
  vitaminA?: number | null;
  vitaminC?: number | null;
  vitaminD?: number | null;
  vitaminB12?: number | null;
}

export interface UserFaker extends BaseUserInput{
  id: string
}
