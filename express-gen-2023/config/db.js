const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  connectionLimit: 5,
  database: "express_checkout",
});

module.exports = pool;
