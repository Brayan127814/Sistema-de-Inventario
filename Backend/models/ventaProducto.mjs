import sequelize from '../config/db.mjs'
import { DataTypes } from 'sequelize'


// Modelo de tabla intermedio para la relacion entre ventas y productos

const ventaProducto = sequelize.define('ventaProducto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    ventaID :{
        type: DataTypes.INTEGER,
        references: {
            model: 'Ventas',
            key: 'id'
        },
        allowNull: false
    },
    productID: {
        type:DataTypes.INTEGER,
        references: {
            model: 'Products',
            key: 'id'
        },
        allowNull: false
    }
})

export default ventaProducto