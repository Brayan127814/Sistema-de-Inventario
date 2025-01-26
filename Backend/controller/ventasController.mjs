import ventas from "../models/ventas.mjs";
import product from "../models/productos.mjs";
import ventaProducto from '../models/ventaProducto.mjs'



export const registerVentas = async (req, res) => {
    try {
        const {
            fecha,
            total,
            cliente,
            productos
        } = req.body
        const userID = req.user.id
        if (!userID) {
            return res.status(401).json({
                message: 'No se ha iniciado sesión'
            })
        }

        const venta = await ventas.create({
            fecha,
            total,
            cliente,
            userID: userID
        })


        //Crear los registros de los productos asociados a la venta

        let cantidadVendida = 0
        let totalVentas = 0
        
        for (const producto of productos) {
            const {
                productID,
                cantidad,


            } = producto

            const idProduct = await product.findOne({
                where: {
                    id: productID
                }
            })

            if (!idProduct) {
                console.error(`El producto con ID ${productID} no existe`);
                continue; // Salta al siguiente producto si no se encuentra

            }
            if(idProduct.stop < cantidad){
                return res.status(400).json({
                    message: 'No hay stock suficiente para la venta'
                })
            }
            //crear el registro de la ventaProducto
            const precioUnitario = idProduct.precio
            await ventaProducto.create({
                cantidad,
                precioUnitario,
                ventaID: venta.id,
                productID,


            })

            idProduct.stop -= cantidad
            idProduct.save()
           
            cantidadVendida += cantidad
            
            totalVentas = cantidadVendida * precioUnitario
        }
        await venta.update({


            cantidadVendida: cantidadVendida,
            total: totalVentas
        })
        


        res.status(201).json({
            message: 'Venta registrada correctamente',
            venta
        })
    } catch (error) {
        console.error('Error ', error)


        res.status(500).json({
            message: 'Error interno del servidor'

        })
    }
}



// Consultar una venta especifica

export const getAllVentaId = async (req, res) => {
    try {
        const idVentaProducto = req.params.id

        const venta = await ventas.findByPk(idVentaProducto, {
            include: [{
                model: product,
                through: {
                    attributes: []
                }
            }]
        })

        if (!venta) {

            return res.status(404).json({
                mensaje: 'Venta no encontrada'
            })
        }


        res.status(200).json({
            venta: venta
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        })
    }
}

// consultar todas las ventas 


export const getAllVentas = async (req, res) => {
    try {
        const idUser = req.user.id
        const venta = await ventas.findAll({
            where: {
                userID: idUser
            },
            include:[{
                model: product,
                through: {
                    attributes: []
                }
            }]
        })

        res.status(200).json({
            venta,idUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        })
    }
}



