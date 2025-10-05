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
        email: faker.internet.email({ provider: 'gmail.com' }).toLowerCase(),
        password: generateRandomPassword(),
      };
    });

    test("should return 201 and successfully register user if request data is ok", async () => {
      const res = await request(app)
        .post("/v1/auth/register/")
        .send(newUser)
        .expect(httpStatus.CREATED);

      const userData = res.body.data.userCreated;

      expect(userData).toEqual({
        id: expect.anything(),
        name: newUser.name,
        password: expect.anything(),
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
});
