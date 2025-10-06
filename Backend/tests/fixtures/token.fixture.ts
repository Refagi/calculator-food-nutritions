import prisma from '../../prisma/client.js';
import { tokenservices } from '../../src/services/index.js';
import config from '../../src/config/config.js';
import { tokenTypes } from '../../src/config/token.js';
import { user } from './user.fixture.js';
import { Token } from "@prisma/client";
import moment, { Moment } from 'moment';

// const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
// export const userAccessToken = await tokenservices.generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

// const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
// export const userRefreshToken = await tokenservices.generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);

// const verifyEmailTokenExpires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
// export const userVerifyEmailToken = await tokenservices.generateToken(user.id, verifyEmailTokenExpires, tokenTypes.VERIFY_EMAIL);


// // Fixtures
// export const verifyEmailTokenFixture: Omit<Token, "id"> = {
//   token: userVerifyEmailToken,
//   userId: user.id,
//   expires: verifyEmailTokenExpires.toDate(),
//   type: tokenTypes.VERIFY_EMAIL,
//   blacklisted: false,
//   createdAt: new Date(),
//   updatedAt: new Date()
// };

// export const refreshTokeFixture: Omit<Token, "id"> = {
//   token: userRefreshToken,
//   userId: user.id,
//   expires: refreshTokenExpires.toDate(),
//   type: tokenTypes.REFRESH,
//   blacklisted: false,
//   createdAt: new Date(),
//   updatedAt: new Date()
// };

// export const accessTokeFixture: Omit<Token, "id"> = {
//   token: userAccessToken,
//   userId: user.id,
//   expires: accessTokenExpires.toDate(),
//   type: tokenTypes.ACCESS,
//   blacklisted: false,
//   createdAt: new Date(),
//   updatedAt: new Date()
// };

type TokenFixtureData = {
  token: string;
  userId: string;
  expires: Moment; // ← Moment object
  type: string;
  blacklisted: boolean;
};

export const generateVerifyEmailTokenFixture = async (): Promise<TokenFixtureData> => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const token = await tokenservices.generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);

  return {
    token,
    userId: user.id,
    expires: expires,
    type: tokenTypes.VERIFY_EMAIL,
    blacklisted: false,
  };
};

export const generateAccessTokenFixture = async (): Promise<TokenFixtureData> => {
  const expires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const token = await tokenservices.generateToken(user.id, expires, tokenTypes.ACCESS);

  return {
    token,
    userId: user.id,
    expires: expires,
    type: tokenTypes.ACCESS,
    blacklisted: false,
  };
};

export const generateRefreshTokenFixture = async (): Promise<TokenFixtureData> => {
  const expires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const token = await tokenservices.generateToken(user.id, expires, tokenTypes.REFRESH);

  return {
    token,
    userId: user.id,
    expires: expires,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  };
};


export const insertToken = async (tokenData: any): Promise<void> => {
  try {
    await tokenservices.saveToken(
      tokenData.token,
      tokenData.userId,
      tokenData.expires,
      tokenData.type,
      tokenData.blacklisted
    );
  } catch (err) {
    console.error('Error inserting token:', err);
    throw err;
  }
};

// export const insertToken = async (tokens: Omit<Token, "id">[]) => {
//   try {
//     const result = await prisma.token.createMany({
//       data: tokens,
//     });
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };
