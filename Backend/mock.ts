import dotenv from "dotenv";

dotenv.config();
(global as any).atob = atob;

jest.mock("groq-sdk", () => ({
  Groq: jest.fn(() => ({
    query: jest.fn(),
  })),
}));

jest.mock("./prisma/__mock__/index.ts");
jest.setTimeout(30_000);
