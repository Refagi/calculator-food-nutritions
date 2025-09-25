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
