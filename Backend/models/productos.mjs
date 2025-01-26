import sequelize from "../config/db.mjs";
import {
    DataTypes
} from "sequelize";


//Modelo para productos

const product = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true


    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {

        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stop: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


export default product;