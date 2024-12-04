// dbConfig.js
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = knex({
  client: "mysql2",
  connection: process.env.JAWSDB_URL
    ? (() => {
        // Parse JAWSDB_URL to extract host, user, password, and database
        const dbUrl = new URL(process.env.JAWSDB_URL);
        return {
          host: dbUrl.hostname,
          user: dbUrl.username,
          password: dbUrl.password,
          database: dbUrl.pathname.slice(1), // Remove leading slash
          port: dbUrl.port || 3306,
        };
      })()
    : {
        // Fallback to manual environment variables if JAWSDB_URL is not present
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT || 3306, // Default port for MySQL
      },
  pool: { min: 0, max: 10 }, // Optional connection pooling
});

export default dbConfig;
