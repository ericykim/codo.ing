import { defineConfig } from 'drizzle-kit';
import { env } from './src/lib/env';

export default defineConfig({
  schema: '../../../lib/schema/src/models/index.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL || `postgresql://${env.POSTGRES_USER}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
  },
});