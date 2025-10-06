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
});
