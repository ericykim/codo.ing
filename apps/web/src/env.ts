import { z } from 'zod';

// Environment schema validation for web app
const envSchema = z.object({
  VITE_CLERK_PUBLISHABLE_KEY: z.string().min(1, 'Clerk publishable key is required'),
  VITE_API_URL: z.string().url('API URL must be a valid URL').default('http://localhost:3001'),
});

// Parse and validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    console.error('❌ Environment validation failed:');
    if (error instanceof z.ZodError) {
      error.issues.forEach((err: any) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    throw new Error('Invalid environment configuration');
  }
}

export const env = validateEnv();