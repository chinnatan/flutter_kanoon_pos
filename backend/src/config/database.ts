import pg from "pg";
const { Pool } = pg;

const dbHost = process.env.DB_HOST || "localhost";
const dbName = process.env.DB_NAME || "";
const dbUsername = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";

const pool = new Pool({
  user: dbUsername,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: 5432,
});

export default pool;
