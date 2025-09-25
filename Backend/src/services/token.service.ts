import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import httpStatus from 'http-status';
import config from '../config/config.js';
import { PayloadType } from '../models/index.js';
import { tokenTypes } from '../config/token.js';
import prisma from '../../prisma/client.js';
import { Token, User } from '@prisma/client';
import { ApiError } from '../utils/ApiErrors.js';
import { AuthRequest } from '../models/index.js';

const generateToken = async (userId: string, expires: Moment, type: string, secret: string = config.jwt.secret) => {
  const payload: PayloadType = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: string,
  blacklisted: boolean = false
): Promise<Token> => {
  const tokenDoc: Token = await prisma.token.create({
    data: {
      token,
      userId: userId,
      expires: expires.toDate(),
      type,
      blacklisted
    }
  });
  return tokenDoc;
};

export const verifyToken = async (token: string, type: string) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;
    const tokenDoc = await prisma.token.findFirst({
      where: {
        token,
        type,
        userId: payload.sub as string,
        blacklisted: false
      }
    });
    if (!tokenDoc) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not found!');
    }
    return tokenDoc;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token!');
  }
};

export const verifyTokenProtectAuth = async (token: string, type: string) => {
  const payload = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;
  const tokenDoc = await prisma.token.findFirst({
    where: {
      token,
      type,
      userId: payload.sub as string,
      blacklisted: false
    }
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Token not found!');
  }
  return payload;
};

export const generateAuthTokens = async (userId: string) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = await generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = await generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, userId, refreshTokenExpires, tokenTypes.REFRESH);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};

export const generateVerifyEmailToken = async (users: User) => {
  const userId = users.id;
  if (!userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this id!');
  }
  await prisma.token.deleteMany({
    where: {
      userId,
      type: tokenTypes.VERIFY_EMAIL
    }
  });
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = await generateToken(userId, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, userId, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

