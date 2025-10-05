import { z } from 'zod';

// Environment schema validation
const envSchema = z.object({
  // Database configuration
  POSTGRES_DB: z.string().min(1, 'Database name is required'),
  POSTGRES_USER: z.string().min(1, 'Database user is required'),
  POSTGRES_PASSWORD: z.string().min(1, 'Database password is required'),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z
    .string()
    .regex(/^\d+$/, 'Port must be a number')
    .default('5432')
    .transform(Number),
  DATABASE_URL: z.string().url('Invalid database URL').optional(),
  
  // Server configuration
  PORT: z.string().regex(/^\d+$/, 'Port must be a number').default('3000').transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Better-auth configuration
  BETTER_AUTH_SECRET: z.string().min(32, 'Better-auth secret must be at least 32 characters'),
  BETTER_AUTH_URL: z.string().url('Better-auth URL must be a valid URL').default('http://localhost:3000'),
  
  // OAuth providers
  GOOGLE_CLIENT_ID: z.string().min(1, 'Google client ID is required'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'Google client secret is required'),
  
  // Web client URL for CORS
  WEB_URL: z.string().url('Web URL must be a valid URL').default('http://localhost:4200'),
});

// Parse and validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Environment validation failed:');
    if (error instanceof z.ZodError) {
      error.issues.forEach((err: any) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    process.exit(1);
  }
}

export const env = validateEnv();

// Generate DATABASE_URL if not provided
export const DATABASE_URL =
  env.DATABASE_URL ||
  `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`;
