import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "@codoing/schema";

/**
 * Database connection utility for the codo.ing application
 * 
 * Provides a configured Drizzle ORM instance with:
 * - PostgreSQL connection via pg Pool
 * - Auto-imported schema from @codoing/schema
 * - Environment-based connection string
 * - Configurable connection pooling
 */

// Get connection string from environment or use default
const connectionString = 
  process.env.DATABASE_URL || 
  "postgresql://postgres:postgres@localhost:5432/codoing";

// Create connection pool with optimal configuration
const pool = new Pool({
  connectionString,
  max: 20,
  min: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  statement_timeout: 30000,
  query_timeout: 30000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Create and export Drizzle instance
export const db = drizzle(pool, { 
  schema,
  logger: process.env.NODE_ENV === 'development' ? true : false, // Enable query logging in dev
});

// Export the pool for advanced usage
export { pool };

// Export connection string for debugging
export { connectionString };


// Types
export type Database = typeof db;