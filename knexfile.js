// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// Import dotenv to process environment variables from `.env` file.
require("dotenv").config();

module.exports = {
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT,
    charset: "utf8",
  },
};