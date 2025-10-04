import httpStatus from 'http-status';
import prisma from '../../prisma/client.js';
import { ApiError } from '../utils/ApiErrors.js';
import bcrypt from 'bcryptjs';
import { RequestCreateUser, RequestUpdateUser } from '../models/index.js';
import { User } from '@prisma/client';

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

  if (!getUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

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
