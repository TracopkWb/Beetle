import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const tableCreation = async function connect2DB(){

};

const test = async function testDBConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('✅ Database is up and responding');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
    }
}

export default {
    conn: pool,
    testConnection :test,
    table : tableCreation
};