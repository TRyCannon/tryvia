// server/db.ts

import pg from 'pg';
const { Pool } = pg;

import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

// Ensure DATABASE_URL is provided via environment variables
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error(
    'Missing DATABASE_URL environment variable. Did you forget to set it in Render?'
  );
}

// Create a new Postgres connection pool, pointing at the Supabase transaction pooler
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Supabase pooler uses a self-signed cert
});

// Initialize Drizzle ORM with the Postgres pool and your shared schema
export const db = drizzle(pool, { schema });
