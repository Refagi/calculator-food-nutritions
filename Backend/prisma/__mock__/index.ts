import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import { join } from "path";

const generateDatabaseURL = (): string => {
  if (!process.env.DATABASE_URL_TESTING) {
    throw new Error("Please provide a database URL.");
  }

  let url = process.env.DATABASE_URL_TESTING;
  return url;
};

const prismaBinary = join(__dirname, "..", "..", "node_modules", "dist", "prisma");

const url = generateDatabaseURL();

// set ulang env var untuk prisma
process.env.DATABASE_URL_TESTING = url;

const prisma = new PrismaClient({
  datasources: { db: { url } },
});

// Hook Jest
beforeAll(async () => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL_TESTING: url,
    },
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

export default prisma;
