import { Pool } from "pg";
import { getConfig } from "./config.js";

let pool: Pool | undefined;

export function getPool() {
  if (!pool) {
    const config = getConfig();
    pool = new Pool({ connectionString: config.DATABASE_URL, max: 8 });
  }
  return pool;
}

export async function closePool() {
  await pool?.end();
  pool = undefined;
}
