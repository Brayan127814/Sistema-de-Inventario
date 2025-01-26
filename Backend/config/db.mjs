import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Cargar las variables de entorno
dotenv.config();

// Crear instancia de Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,        // Nombre de la base de datos
    process.env.DB_USER,        // Usuario
    process.env.DB_PASSWORD,    // Contraseña
    {
        dialect: 'mysql',
        host: process.env.DB_HOST
    }
);

// Validar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

export default sequelize;
