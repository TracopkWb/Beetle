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


const test = async function testDBConnection(req,res) {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('✅ Database is up and responding');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        res.json({
            success: false,
            type: 'error',
        })
    }
}

    // (async () => {
    //     try {
    //         const connection = await pool.getConnection();
    //         console.log('✅ Database connection established');
    //         connection.release();
    //     } catch (err) {
    //         console.error('❌ Failed to connect to the database.');
    //         console.error('Reason:', err.code || err.message);
    //         process.exit(1); // Exit the app
    //     }
    // });

export default {
    conn: pool,
    testConnection: test,
};