import { DataTypes } from "sequelize";
import sequelize from "../config/db.mjs";



const category = sequelize.define('categorias',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps:true
    }
)
export default category