import ventas from "../models/ventas.mjs";
import user from "../models/users.mjs";
import productos from "../models/productos.mjs";
import ventaProducto from "../models/ventaProducto.mjs";
import category from "../models/category.mjs";
import role from '../models/role.mjs'

user.hasMany(ventas, {
    foreignKey: 'userID'
}) //un usuario puede tener varias ventas
ventas.belongsTo(user, {
    foreignKey: 'userID'//una venta solo puede tener un
})



productos.belongsToMany(ventas,{
    through: ventaProducto,
    foreignKey: 'productID',
    otherKey: 'ventaID'
})

ventas.belongsToMany(productos,{
    through: ventaProducto,
    foreignKey: 'ventaID',
    otherKey: 'productID'
})



//Realcion de uno a muchos de producto y categorias

category.hasMany(productos, {
    foreignKey: 'categoryID'
})

productos.belongsTo(category, {
    foreignKey: 'categoryID'
})


//relacion entre usuario y rol
role.hasMany(user,{
    foreignKey: 'roleID'
})
user.belongsTo(role,{
    foreignKey: 'roleID'//un usuario solo puede tener un rol
})