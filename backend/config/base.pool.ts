import mysql, { type Pool } from "mysql2/promise";

const getEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`La variable ${name} est manquante dans le fichier .env`);
  }

  return value;
};

const getPool = (): Pool => {
  return mysql.createPool({
    host: getEnv("MYSQL_HOST"),
    user: getEnv("MYSQL_USER"),
    password: getEnv("MYSQL_PASSWORD"),
    database: getEnv("MYSQL_DB"),

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

export default getPool;