import httpStatus from 'http-status';
import { tokenservices, emailServices, userServices } from './index.js';
import prisma from '../../prisma/client.js';
import { ApiError } from '../utils/ApiErrors.js';
import bcrypt from 'bcryptjs';
import { tokenTypes } from '../config/token.js';

export const login = async (email: string, password: string) => {
  const user = await userServices.getUserByEmail(email);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'wrong email or password!');
  }

  if (user.isEmailVerified === false) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Email not verified, Please verify your email!'
    );
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'wrong email or password!');
  }
  return user;
};


export const logout = async (tokens: string) => {
  const refreshToken = await prisma.token.findFirst({
    where: { token: tokens, type: tokenTypes.REFRESH, blacklisted: false }
  });
  if (!refreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found, you are logged out!');
  }
  await prisma.token.delete({ where: { id: refreshToken.id } });
};


export const refreshToken = async (tokens: string) => {
  try {
    const refreshTokenDoc = await tokenservices.verifyToken(tokens, tokenTypes.REFRESH);

    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Token!');
    }

    await prisma.token.delete({
      where: { id: refreshTokenDoc.id }
    });

    const newToken = await tokenservices.generateAuthTokens(refreshTokenDoc.userId);
    return newToken;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate!');
  }
};

export const verifyEmail = async (tokens: string) => {
  const verifyEmailTokenDoc = await tokenservices.verifyToken(tokens, tokenTypes.VERIFY_EMAIL);
  if (!verifyEmailTokenDoc) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Token!');
  }

  const getUser = await userServices.getUserById(verifyEmailTokenDoc.userId);

  if (!getUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  await prisma.token.deleteMany({
    where: { userId: getUser.id, type: tokenTypes.VERIFY_EMAIL }
  });
  await userServices.updateUserById(getUser.id, { isEmailVerified: true, updatedAt: new Date() });
};
