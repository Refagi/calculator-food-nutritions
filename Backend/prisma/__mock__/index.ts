import { PrismaClient } from "../../src/generated/prisma/client";;
import prisma from "../client";
import { PrismaPg } from "@prisma/adapter-pg";
import { execSync } from "child_process";
import { join } from "path";
import { describe, test, expect, beforeEach, beforeAll, afterAll, vi } from 'vitest';

const generateDatabaseURL = (): string => {
  if (!process.env.DATABASE_URL_TESTING) {
    throw new Error("Please provide a database URL (DATABASE_URL_TESTING).");
  }

  let url = process.env.DATABASE_URL_TESTING;
  url = url.replace(/\/postgres(\?|$)/, "/testingDb$1");

  return url;
};

const prismaBinary = join(__dirname, "..", "..", "node_modules", ".bin", "prisma");
const url = generateDatabaseURL();
console.log('Test url: ', url);

process.env.DATABASE_URL = url;

const adapter = new PrismaClient({
  adapter: new PrismaPg({ connectionString: url }),
});

beforeAll(async () => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL_TESTING: url,
    },
    stdio: "inherit",
  });
});

beforeEach(async () => {
  await adapter.token.deleteMany();
  await adapter.user.deleteMany();
});

afterAll(async () => {
  await adapter.$executeRawUnsafe(`DROP SCHEMA IF EXISTS testingDb CASCADE`);
  await adapter.$disconnect();
});
