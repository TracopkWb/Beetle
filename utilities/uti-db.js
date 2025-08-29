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


const test = async function testDBConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        // console.log(rows);
        return{
            success: true,
            data:'Everything is ok',
            type: 'notification',
            error:null,
            origin: 'testDBConnection()',
            show: false,
        }
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        return{
            success: false,
            data:'Make sure XAMPP is started',
            type: 'error',
            origin: 'testDBConnection()',
            show: true,
            error: 'Database NOT FOUND',
        }
    }
}

export default {
    conn: pool,
    testConnection: test,
};