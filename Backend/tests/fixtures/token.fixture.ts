import prisma from '../../prisma/client.js';
import { tokenservices } from '../../src/services/index.js';
import config from '../../src/config/config.js';
import { tokenTypes } from '../../src/config/token.js';
import { user } from './user.fixture.js';
import { Token } from "@prisma/client";
import moment, { Moment } from 'moment';

type TokenFixtureData = {
  token: string;
  userId: string;
  expires: Moment;
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
