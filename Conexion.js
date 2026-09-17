import mysql from "mysql2/promise"
import "dotenv/config"

const DB_HOST = process.env.DB_HOST
const DB_USUARIO = process.env.DB_USUARIO
const DB_NOMBRE = process.env.DB_NOMBRE
const DB_PASS = process.env.DB_PASS
const DB_PORT = process.env.DB_PORT

const conexion = mysql.createPool({
    host: DB_HOST,
    user: DB_USUARIO,
    port: DB_PORT,
    password: DB_PASS,
    database: DB_NOMBRE,
    waitForConnections: true,
    connectionLimit: 10
})


conexion.getConnection()
    .then(connection => {
        console.log('Conexión a la base de datos exitosa');
        connection.release();
    })
    .catch(err => {
        console.error('Error conectando a la base de datos:', err.message);
    });

export default conexion