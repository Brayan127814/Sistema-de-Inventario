import sequelize from "../config/db.mjs";
import {
    DataTypes,
    Sequelize
} from "sequelize";


//Modelado de la tabla usuario

const user = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: true,
            len: [7, 15]
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 8
        }
    },
    roleID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default user