require('mysql2/promise');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'SAOanime37*',
    database: 'notes'
});

module.exports = pool;
