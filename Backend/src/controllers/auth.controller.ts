import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiErrors.js';
import { catchAsync } from '../utils/catchAsync.js';
import {
  tokenservices,
  emailServices,
  userServices,
  authServices,
} from '../services/index.js';
import { Response, Request, NextFunction } from 'express';
import prisma from '../../prisma/client.js';
import { AuthRequest } from '../models/index.js';
import { tokenTypes } from '../config/token.js';

export const register = catchAsync(async (req: AuthRequest, res: Response) => {
  const existingUser = await userServices.getUserByEmail(req.body.email);

  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  const userCreated = await userServices.createUser(req.body);
  const tokens = await tokenservices.generateAuthTokens(userCreated.id);

  res.cookie('accessToken', tokens.access.token, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Prevent CSRF
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie('refreshToken', tokens.refresh.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(httpStatus.CREATED).send({
    status: httpStatus.CREATED,
    message: 'Register is successfully',
    data: { userCreated, tokens },
  });
});

export const login = catchAsync(async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await userServices.getUserByEmail(req.body.email);
  if (!existingUser) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You dont have an account yet, please register!'
    );
  }

  const user = await authServices.login(email, password);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to login!');
  }
  const existingLoginUser = await prisma.token.findFirst({
    where: { userId: user.id, type: tokenTypes.REFRESH },
    orderBy: { createdAt: 'desc' },
  });

  if (existingLoginUser) {
    await prisma.token.delete({
      where: {
        id: existingLoginUser.id,
      },
    });
  }
  const tokens = await tokenservices.generateAuthTokens(user.id);

  res.cookie('accessToken', tokens.access.token, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Prevent CSRF
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie('refreshToken', tokens.refresh.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.send({
    status: httpStatus.OK,
    message: 'Login is successfully',
    data: { user, tokens },
  });
});

export const googleCallback = catchAsync(
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.user || !req.user.id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Google login failed');
      }
      const existingUser = await userServices.getUserById(req.user.id);

      if (!existingUser) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You dont have an account yet, please register!'
        );
      }

      const tokens = await tokenservices.generateAuthTokens(existingUser.id);
      res.cookie('accessToken', tokens.access.token, {
        httpOnly: true, // Prevent XSS attacks
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // Prevent CSRF
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.cookie('refreshToken', tokens.refresh.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      res.send({
        status: httpStatus.OK,
        message: 'Login google is successfully',
        data: { existingUser, tokens },
      });
    } catch (err) {
      console.log('error login google', err);
      throw new ApiError(httpStatus.UNAUTHORIZED, 'failed login google!');
    }
  }
);

export const logout = catchAsync(async (req: AuthRequest, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No refresh token provided!');
  }
  await authServices.logout(refreshToken);
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.clearCookie('name');
  res.send({
    status: httpStatus.NO_CONTENT,
    message: 'Logout is successfully'
  });
});

export const refreshToken = catchAsync(async (req: AuthRequest, res: Response) => {
  console.log('refreshToken: ', req.cookies)
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No refresh token provided!');
  }
  const token = await authServices.refreshToken(refreshToken);
  res.cookie('accessToken', token.access.token, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Prevent CSRF
    maxAge: 60 * 60 * 1000 // 1 hour
  });
  res.cookie('refreshToken', token.refresh.token, {
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // Prevent CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000 // 1 hour
  });
  res.send({
    status: httpStatus.OK,
    message: 'Refresh Token is successfully',
    tokens: token
  });
});

export const sendVerificationEmail = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
  const verifyTokenDoc = await tokenservices.generateVerifyEmailToken(req.user);

  await emailServices.sendVerificationEmail(req.user.email, verifyTokenDoc);
  // res.cookie('verifyEmail', verifyTokenDoc, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'lax',
  //   maxAge: 15 * 60 * 1000 // 15 menit
  // });
  res.send({
    status: httpStatus.OK,
    message: `Verify email link has been sent to ${req.user.email}`,
    tokens: verifyTokenDoc
  });
});

export const verifyEmail = catchAsync(async (req: AuthRequest, res: Response) => {
  const tokens = req.query.tokens as string;
  await authServices.verifyEmail(tokens);
  res.send({
    status: httpStatus.OK,
    message: 'Email has been verification!'
  });
});
