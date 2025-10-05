import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './models';

// Database connection for the schema package
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/codoing';

// Create postgres client
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client, { schema });

export { schema };