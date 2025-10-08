import { PrismaClient } from "@prisma/client";
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

export const prisma = new PrismaClient({
  datasources: { db: { url } },
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
  await prisma.token.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS testingDb CASCADE`);
  await prisma.$disconnect();
});
