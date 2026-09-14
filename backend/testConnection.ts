import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import getPool from "../backend/config/base.pool.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});
const testDatabaseConnection = async (): Promise<void> => {
  const pool = getPool();

  try {
    const connection = await pool.getConnection();

    console.log("✅ Connexion à MariaDB réussie");

    connection.release();
    await pool.end();
  } catch (error: unknown) {
    console.error("❌ Échec de la connexion à MariaDB");

    if (error instanceof Error) {
      console.error(error.message);
    }

    process.exit(1);
  }
};

testDatabaseConnection();