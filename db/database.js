require('dotenv').config();

const { Pool } = require('pg');

const connectionString = process.env.PGURL;

const pool = new Pool({connectionString});

module.exports = {
  query: (text, params) => {
    return pool
        .query(text, params)
        .catch(err => {
          throw err;
        });
  }
};
