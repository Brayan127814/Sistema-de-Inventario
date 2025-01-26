import {
    DataTypes
} from "sequelize";
import sequelize from "../config/db.mjs";





//Modelo de la tabla ventas

const ventas = sequelize.define('Ventas', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: true,

    },

    cantidadVendida:{
      type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0  
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        defaultValue: 0.00,
    },
    
    cliente:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    userID:{
        type: DataTypes.INTEGER,
        allowNull: false
        // references: {
        //     model: 'user',
        //     key: 'id'
        // }
    }

})

export default ventas
