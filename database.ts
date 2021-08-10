import mysql from 'mysql2';
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.HOST,
    port: 25060,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
});


pool.getConnection((err, con) => {
    console.log('-> ', err);
});

// pool.getConnection()
// .then(connection => {
//     pool.releaseConnection(connection);
//     console.log('DB is connected');
// });

// pool.getConnection((err, connection) => {
//     connection.release();
// });

export default pool;
