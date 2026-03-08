import { execSync } from 'child_process';
import { resolve } from 'path';
import { config } from 'dotenv';
import pg from 'pg';

export default async function globalSetup() {
  config({ path: resolve(__dirname, '..', '.env.test') });
  config({ path: resolve(__dirname, '..', '.env') });

  console.log('Resetting and seeding database for e2e tests...');

  // Drop and recreate public schema to clear all tables
  const client = new pg.Client(process.env.DATABASE_URL);
  await client.connect();
  await client.query('DROP SCHEMA public CASCADE');
  await client.query('CREATE SCHEMA public');
  await client.end();

  // Sync schema and seed
  execSync('npx prisma db push', { stdio: 'inherit' });
  execSync('npx prisma db seed', { stdio: 'inherit' });

  console.log('Database ready for e2e tests.');
}
