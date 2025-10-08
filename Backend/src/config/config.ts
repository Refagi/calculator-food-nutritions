import dotenv from 'dotenv';
import { z } from 'zod';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  PORT: z.coerce.number().default(5500),
  DATABASE_URL: z.string().trim().min(1, { message: 'DATABASE_URL is required' }),
  DIRECT_URL: z.string().trim().optional(),
  DATABASE_URL_TESTING: z.string().trim().optional(),
  JWT_SECRET: z.string().trim().min(1, { message: 'JWT_SECRET is required' }),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.number().default(30),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.number().default(30),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.coerce.number().default(10),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.coerce.number().default(10),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USERNAME: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GEMINI_KEY: z.string(),
  GROQ_KEY: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Environment variables validation failed:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

const envVars = parsedEnv.data;

const getDatabaseUrl = () => {
  if (envVars.NODE_ENV === 'test') {
    if (!envVars.DATABASE_URL_TESTING) {
      throw new Error('DATABASE_URL_TESTING is required for testing!');
    }
    // Replace /postgres dengan /testingDb
    const testUrl = envVars.DATABASE_URL_TESTING.replace(/\/postgres(\?|$)/, '/testingDb$1');
    console.log('🧪 Using test database:', testUrl);
    return testUrl;
  }

  console.log(`📦 Using ${envVars.NODE_ENV} database`);
  return envVars.DATABASE_URL;
};


export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    url: getDatabaseUrl()
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  },
  google: {
    credentialId: envVars.GOOGLE_CLIENT_ID,
    credentialSecret: envVars.GOOGLE_CLIENT_SECRET
  },
  gemini: {
    key: envVars.GEMINI_KEY
  },
  groq: {
    key: envVars.GROQ_KEY
  }
};
