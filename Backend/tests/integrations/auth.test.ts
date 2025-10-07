import request from "supertest";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import app from "../../src/app.js";
import { userFixture } from "../fixtures/index.js";
import { tokenFixture } from "../fixtures/index.js";
import prisma from "../../prisma/client.js";
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { tokenservices } from "../../src/services/index.js";
import { generateRandomPassword } from "../../src/utils/randomPassword.js";
import { user } from "../fixtures/user.fixture.js";
import { v4 } from "uuid";
import bcrypt from 'bcryptjs';



describe("Auth routes", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
    await prisma.token.deleteMany();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
    await prisma.token.deleteMany();
  });

  describe("POST /v1/auth/register", () => {
    let newUser: {
      name: string;
      email: string;
      password: string;
    };

    beforeEach(() => {
      newUser = {
        name: faker.person.fullName(),
        email: faker.internet.email({ provider: 'gmail.com' }),
        password: generateRandomPassword(),
      };
    });

    test("should return 201 and successfully register user if request data is ok", async () => {
      const res = await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.CREATED);

      const userData = res.body.data.userCreated;

      expect(userData).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      const dbUser = await prisma.user.findUnique({
        where: { id: userData.id },
      });

      expect(dbUser).toBeDefined();
      expect(dbUser!.password).not.toBe(newUser.password);

      expect(dbUser).toMatchObject({
        id: expect.anything(),
        name: newUser.name,
        password: expect.anything(),
        email: newUser.email,
        createdAt: expect.anything(),
        updatedAt: expect.anything(),
      });

      expect(res.body.data.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() },
      });
    });

    test("should return 400 error if email is invalid", async () => {
      newUser.email = "invalid.yahoo.com";
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if email is already taken", async () => {
      await userFixture.insertUsers(user);
      newUser.email = user.email;
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password length is less than 8 characters", async () => {
      newUser.password = "pass";
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });

    test("should return 400 error if password does not contain at least 1 letter, 1 number, and 1 special character", async () => {
      newUser.password = "pasSword";
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);

      newUser.password = "11111111";
      await request(app)
        .post("/v1/auth/register")
        .send(newUser)
        .expect(httpStatus.BAD_REQUEST);
    });
  });

  describe('POST v1/auth/send-verification-email', async () => {
    test('should retrurn 200 ok if send verification email successfully', async () => {
      await userFixture.insertUsers(user);
      const accessToken = (await tokenservices.generateAuthTokens(user.id)).access.token;
      const res = await request(app).post('/v1/auth/send-verification-email')
      .set('Authorization', `Bearer ${accessToken}`)
      .send().expect(httpStatus.OK);

      expect(res.body).toEqual(
       expect.objectContaining({
        status: httpStatus.OK,
        message: expect.stringContaining(`Verify email link has been sent to ${user.email}`),
        tokens: expect.anything(),
      })
    );
  });

    test('should retrurn 401 error if user is not authenticated', async () => {
      await userFixture.insertUsers(user);
      await request(app).post('/v1/auth/send-verification-email')
      .send()
      .expect(httpStatus.UNAUTHORIZED);
    });
  });

  describe('GET v1/auth/verify-email', async () => {
    test('should return 200 ok if verify email successfully', async () => {
      await userFixture.insertUsers(user);

      const tokenData = await tokenFixture.generateVerifyEmailTokenFixture();
      await tokenFixture.insertToken(tokenData);

      const res = await request(app)
        .get('/v1/auth/verify-email')
        .query({ tokens: tokenData.token })
        .expect(httpStatus.OK);

    expect(res.body).toEqual(
      expect.objectContaining({
        status: httpStatus.OK,
        message: expect.stringContaining('Email has been verification!')
      })
    );
  });

    test('should return 401 error if token is not valid', async () => {
      await userFixture.insertUsers(user);
      const tokens = await tokenFixture.generateAccessTokenFixture();
      await tokenFixture.insertToken(tokens);

      await request(app).get('/v1/auth/verify-email').query({ tokens: tokens.token })
      .expect(httpStatus.UNAUTHORIZED);
    });
  });

 describe('POST v1/auth/login', async () => {
  const plainPassword = 'kipli123#';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  test('should return 200 OK if login successfully', async () => {
    await userFixture.insertUsers({ id: v4(), name: 'kipli kip', email: 'kipli@gmail.com', password: hashedPassword, isEmailVerified: true });
    const loginData = {
      email: 'kipli@gmail.com',
      password: plainPassword,
    };

    const res = await request(app)
      .post('/v1/auth/login')
      .send(loginData)
      .expect(httpStatus.OK);

    const userData = res.body.data.user;

    expect(userData).toEqual({
      id: expect.anything(),
      name: expect.anything(),
      email: 'kipli@gmail.com',
      isEmailVerified: true,
      createdAt: expect.anything(),
      updatedAt: expect.anything(),
      googleId: null
    });
    expect(userData.password).toBeUndefined();

    expect(res.body.data.tokens).toEqual({
      access: { token: expect.anything(), expires: expect.anything() },
      refresh: { token: expect.anything(), expires: expect.anything() },
    });

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
    expect(cookieArray.some((cookie: string) => cookie.includes('accessToken'))).toBe(true);
    expect(cookieArray.some((cookie: string) => cookie.includes('refreshToken'))).toBe(true);

    const dbUser = await prisma.user.findUnique({
      where: { id: userData.id },
    });
    expect(dbUser).toBeDefined();
    expect(dbUser!.password).not.toBe(loginData.password);
  });

  test('should return 401 error if user does not exist', async () => {
    const loginData = {
      email: 'nonexistent@gmail.com',
      password: plainPassword,
    };

    const res = await request(app)
      .post('/v1/auth/login')
      .send(loginData)
      .expect(httpStatus.UNAUTHORIZED);

    expect(res.body.message).toBe('wrong email or password!');
  });

  test('should return 401 error if password is wrong', async () => {
    await userFixture.insertUsers({ id: v4(), name: 'kipli kip', email: 'kipli@gmail.com', password: hashedPassword, isEmailVerified: true });
    const loginData = {
      email: 'kipli@gmail.com',
      password: 'wrongPw123#',
    };

    const res = await request(app)
      .post('/v1/auth/login')
      .send(loginData)
      .expect(httpStatus.UNAUTHORIZED);

    expect(res.body.message).toBe('wrong email or password!');
  });

  test('should return 401 error if email is not verified', async () => {
    await userFixture.insertUsers({ ...user, isEmailVerified: false });
    const loginData = {
      email: user.email,
      password: user.password,
    };

    const res = await request(app)
      .post('/v1/auth/login')
      .send(loginData)
      .expect(httpStatus.UNAUTHORIZED);

    expect(res.body.message).toBe('Email not verified, Please verify your email!');
  });
});

describe('POST v1/auth/refresh-token', async () => {
    const plainPassword = 'kipli123#';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
  test('should return 200 OK and new tokens if refresh token is valid', async () => {
    const insertedUSer = await userFixture.insertUsers({
      id: v4(),
      name: 'kipli kip',
      email: 'kipli@gmail.com',
      password: hashedPassword,
      isEmailVerified: true,
    });

    const loginData = {
      email: 'kipli@gmail.com',
      password: plainPassword,
    };

    const resLogin = await request(app)
      .post('/v1/auth/login')
      .send(loginData)
      .expect(httpStatus.OK);

    const oldRefreshToken = resLogin.body.data.tokens.refresh.token;
    const cookies = resLogin.headers['set-cookie'];

    const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
    const refreshTokenCookie = cookieArray.find((cookie: string) =>
      cookie.includes('refreshToken')
    );

    const res = await request(app)
      .post('/v1/auth/refresh-token')
      .set('Cookie', refreshTokenCookie!)
      .expect(httpStatus.OK);

    expect(res.body.message).toBe('Refresh Token is successfully');
    expect(res.body.tokens).toEqual({
      access: { token: expect.anything(), expires: expect.anything() },
      refresh: { token: expect.anything(), expires: expect.anything() },
    });

    expect(res.body.tokens.refresh.token).not.toBe(oldRefreshToken);

    const newCookies = res.headers['set-cookie'];
    expect(newCookies).toBeDefined();
    const newCookieArray = Array.isArray(cookies) ? cookies : [cookies];
    expect(newCookieArray.some((cookie: string) => cookie.includes('accessToken'))).toBe(true);
    expect(newCookieArray.some((cookie: string) => cookie.includes('refreshToken'))).toBe(true);

    const oldTokenInDb = await prisma.token.findFirst({
      where: { token: oldRefreshToken },
    });
    expect(oldTokenInDb).toBeNull();

    const newTokenInDb = await prisma.token.findFirst({
      where: { token: res.body.tokens.refresh.token },
    });
    expect(newTokenInDb).toBeDefined();
    expect(newTokenInDb!.userId).toBe(insertedUSer.id);
  });

  test('should return 400 error if refresh token is not provided', async () => {
    const res = await request(app)
      .post('/v1/auth/refresh-token')
      .expect(httpStatus.BAD_REQUEST);

    expect(res.body.message).toBe('No refresh token provided!');
  });

  test('should return 401 error if refresh token is invalid', async () => {
    const invalidToken = 'invalid.refresh.token';

    const res = await request(app)
      .post('/v1/auth/refresh-token')
      .set('Cookie', `refreshToken=${invalidToken}`)
      .expect(httpStatus.UNAUTHORIZED);

    expect(res.body.message).toBe('Please authenticate!');
  });
});

describe('POST v1/auth/logout', async () => {
  const plainPassword = 'kipli123#';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  test('should return 200 OK and clear cookies if logout successfully', async () => {
    await userFixture.insertUsers({
      id: v4(),
      name: 'kipli kip',
      email: 'kipli@gmail.com',
      password: hashedPassword,
      isEmailVerified: true,
    });

    const loginRes = await request(app)
      .post('/v1/auth/login')
      .send({
        email: 'kipli@gmail.com',
        password: plainPassword,
      })
      .expect(httpStatus.OK);

    const refreshToken = loginRes.body.data.tokens.refresh.token;
    const cookies = loginRes.headers['set-cookie'];
    const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
    const refreshTokenCookie = cookieArray.find((cookie: string) =>
      cookie.includes('refreshToken')
    );

    const res = await request(app)
      .post('/v1/auth/logout')
      .set('Cookie', refreshTokenCookie!)
      .expect(httpStatus.OK);

    expect(res.body.message).toBe('Logout is successfully');

    const logoutCookies = res.headers['set-cookie'];
    expect(logoutCookies).toBeDefined();
    const cookieArrayLogout = Array.isArray(cookies) ? cookies : [cookies];
    const accessTokenCleared = cookieArrayLogout.some((cookie: string) =>
      cookie.includes('accessToken') && (cookie.includes('Max-Age=0') || cookie.includes('Expires='))
    );
    const refreshTokenCleared = cookieArrayLogout.some((cookie: string) =>
      cookie.includes('refreshToken') && (cookie.includes('Max-Age=0') || cookie.includes('Expires='))
    );

    expect(accessTokenCleared).toBe(true);
    expect(refreshTokenCleared).toBe(true);

    const tokenInDb = await prisma.token.findFirst({
      where: { token: refreshToken },
    });
    expect(tokenInDb).toBeNull();
  });

  test('should return 400 error if no refresh token provided', async () => {
    const res = await request(app)
      .post('/v1/auth/logout')
      .expect(httpStatus.BAD_REQUEST);

    expect(res.body.message).toBe('No refresh token provided!');
  });

  test('should not be able to use refresh token after logout', async () => {
    await userFixture.insertUsers({
      id: v4(),
      name: 'Test User',
      email: 'noreuse@gmail.com',
      password: hashedPassword,
      isEmailVerified: true,
    });

    const loginRes = await request(app)
      .post('/v1/auth/login')
      .send({
        email: 'noreuse@gmail.com',
        password: plainPassword,
      })
      .expect(httpStatus.OK);

    const cookies = loginRes.headers['set-cookie'];
    const cookieArray = Array.isArray(cookies) ? cookies : [cookies];
    const refreshCookie = cookieArray.find((c: string) => c.includes('refreshToken'));

    await request(app)
      .post('/v1/auth/logout')
      .set('Cookie', refreshCookie!)
      .expect(httpStatus.OK);

    await request(app)
      .post('/v1/auth/refresh-token')
      .set('Cookie', refreshCookie!)
      .expect(httpStatus.UNAUTHORIZED);
  });
});
});
