import dotenv from 'dotenv';
import atob from 'atob';
import { vi, beforeAll } from 'vitest';

dotenv.config();

process.env.NODE_ENV = 'test';

(global as any).atob = atob;

// Mocking modul prisma
vi.mock('./prisma/__mock__/index.ts');

beforeAll(() => {
  console.log('🧪 Test Environment');
  console.log('📦 Database:', process.env.DATABASE_URL_TESTING);
  console.log('🔧 Node Env:', process.env.NODE_ENV);
});
