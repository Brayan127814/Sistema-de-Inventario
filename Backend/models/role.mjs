import sequelize from "../config/db.mjs";
import { DataTypes } from "sequelize";

const  role = sequelize.define("role",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

export default role;