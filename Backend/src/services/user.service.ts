import httpStatus from 'http-status';
import prisma from '../../prisma/client.js';
import { ApiError } from '../utils/ApiErrors.js';
import bcrypt from 'bcryptjs';
import { RequestCreateUser, RequestUpdateUser } from '../models/index.js';
import { Prisma } from '../generated/prisma/client';
import config from '../config/config.js';

type User = Prisma.UserGetPayload<{}>;
type Token = Prisma.TokenGetPayload<{}>;

export const createUser = async (userBody: RequestCreateUser) => {
  userBody.password = await bcrypt.hash(userBody.password, 8);

  return prisma.user.create({
    data: {
      name: userBody.name,
      email: userBody.email,
      password: userBody.password
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

export const getUserById = async (userId: string) => {
  const user: User | null = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
   }
  return user;
};

export const getUserByEmail = async (email: string) => {
  const user: User | null = await prisma.user.findUnique({
    where: { email }
  });

  return user;
};

export const updateUserById = async (userId: string, updateBody: RequestUpdateUser) => {
  const getUser = await getUserById(userId);

  if (updateBody.email) {
    const isEmailTaken = await getUserByEmail(updateBody.email);
    if (isEmailTaken) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken!');
    }
  }

  if (updateBody.password) {
    const matchPassword = await bcrypt.compare(updateBody.password, getUser.password);
    if (matchPassword) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Password is not correct!');
    }
    updateBody.password = await bcrypt.hash(updateBody.password, 8);
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: updateBody
  });
  return updateUser;
};


export const CheckRequest = async (userId: string) => {
   const getUser = await getUserById(userId);
   const now = new Date();

   if (!getUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
   }

   if (!getUser.resetRequestAt || now > getUser.resetRequestAt) {
    await prisma.user.update({
      where: {id: getUser.id},
      data: {
        aiRequestCount: 0,
        resetRequestAt: new Date(now.getTime() + 24 * 60 * 60 * 1000)
      }
    })
    getUser.aiRequestCount = 0;
   }

   if (getUser.aiRequestCount >= config.maxRequestAI) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have reached the maximum number of requests for today.');
   }
 }


 export const incrementRequest = async (userId: string) => {
  await prisma.user.update({
    where: {id: userId},
    data: {
      aiRequestCount: {increment: 1}
    }
  })
 }
