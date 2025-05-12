const pg = require('pg');
const { Pool } = pg;
 
const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'movie-site-project',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

const query = async (text, params) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', {text, duration, rows: res.rowCount});
    return res;
}

module.exports = { query };