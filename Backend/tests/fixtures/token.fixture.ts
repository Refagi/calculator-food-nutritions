import moment from 'moment';
import prisma from '../../prisma/client.js';
import config from '../../src/config/config.js';
import { tokenTypes } from '../../src/config/token.js';
import { tokenservices } from '../../src/services/index.js';
import { user } from './user.fixture.js';
import { Token } from "@prisma/client";

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
export const userAccessToken = await tokenservices.generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
export const userRefreshToken = await tokenservices.generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);

const verifyEmailTokenExpires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
export const userVerifyEmailToken = await tokenservices.generateToken(user.id, verifyEmailTokenExpires, tokenTypes.VERIFY_EMAIL);


// Fixtures
export const verifyEmailTokenFixture: Omit<Token, "id"> = {
  token: userVerifyEmailToken,
  userId: user.id,
  expires: verifyEmailTokenExpires.toDate(),
  type: tokenTypes.VERIFY_EMAIL,
  blacklisted: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const refreshTokeFixture: Omit<Token, "id"> = {
  token: userRefreshToken,
  userId: user.id,
  expires: refreshTokenExpires.toDate(),
  type: tokenTypes.REFRESH,
  blacklisted: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const insertToken = async (tokens: Omit<Token, "id">[]) => {
  try {
    const result = await prisma.token.createMany({
      data: tokens,
      skipDuplicates: true,
    });
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
