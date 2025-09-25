import { query } from 'winston';
import { z } from 'zod';

export const register = {
  body: z.object({
    name: z.string().min(5, { message: 'Name is required must contain at least 5 characters' }),
    email: z
      .string()
      .email({ message: 'Email must be a valid email address' })
      .refine((email) => email.endsWith('@gmail.com'), { message: 'Email must end with @gmail.com' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .refine(
        (password) => /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password),
        {
          message: 'Password must contain at least 1 letter, 1 number, and 1 special character'
        }
      )
  })
};

export const login = {
  body: z.object({
    email: z
      .string()
      .email({ message: 'Email must be a valid email address' })
      .refine((email) => email.endsWith('@gmail.com'), { message: 'Email must end with @gmail.com' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .refine(
        (password) => /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password),
        {
          message: 'Password must contain at least 1 letter, 1 number, and 1 special character'
        }
      )
  })
};

export const logout = {
  cookies: z.object({
    tokens: z.string().min(1, { message: 'refresh token must exist!' })
  })
};

export const refreshToken = {
  cookies: z.object({
    refreshToken: z.string().min(1, { message: 'refresh token must exist!' })
  })
};

export const forgotPassword = {
  body: z.object({
    email: z
      .string()
      .email({ message: 'Email must be a valid email address' })
      .refine((email) => email.endsWith('@gmail.com'), { message: 'Email must end with @gmail.com' })
  })
};

export const resetPassword = {
  query: z.object({
    tokens: z.string().min(1, { message: 'refresh token must exist!' })
  }),
  body: z.object({
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .refine(
        (password) => /[A-Za-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password),
        {
          message: 'Password must contain at least 1 letter, 1 number, and 1 special character'
        }
      )
  })
};

export const verifyEmail = {
  query: z.object({
    tokens: z.string().min(1, { message: 'verify token must exist!' })
  })
};
