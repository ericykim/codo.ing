import { z } from 'zod';

// Environment schema validation
const envSchema = z.object({
  POSTGRES_DB: z.string().min(1, 'Database name is required'),
  POSTGRES_USER: z.string().min(1, 'Database user is required'),
  POSTGRES_PASSWORD: z.string().min(1, 'Database password is required'),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z
    .string()
    .regex(/^\d+$/, 'Port must be a number')
    .transform(Number)
    .default('5432'),
  DATABASE_URL: z.string().url('Invalid database URL').optional(),
});

// Parse and validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Environment validation failed:');
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
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
