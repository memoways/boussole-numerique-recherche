import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { getPool, closePool } from "./db.js";

const schemaPath = fileURLToPath(new URL("./schema.sql", import.meta.url));

async function migrate() {
  const schema = await readFile(schemaPath, "utf8");
  await getPool().query(schema);
  console.log("Migration partenaire appliquée.");
}

migrate().finally(closePool);
