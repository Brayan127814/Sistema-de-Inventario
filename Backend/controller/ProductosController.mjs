import productos from "../models/productos.mjs";


// Crear un nuevo producto

export const registerProduct = async (req, res) => {
    try {
        const {
            name,
            descripcion,
            precio,
            stop
        } = req.body
        if(precio <= 0 || stop <=0){
            return res.status(400).json({
                message: 'El precio y el stock del producto debe ser mayor a 0'
            })
        }

        const product = await productos.create({
            name,
            descripcion,
            precio,
            stop
        })

        res.status(201).json({
            message: 'Producto registrado correctamente',
            product
        })
    } catch (error) {
        console.log('Error:', error.message)
        res.status(500).json({
            message: 'Hubo un error al crear el producto'
        })
    }
}

//Obetenr todos los productos

export const getAllProducts = async (req, res) => {
    try {
        const products = await productos.findAll()

        if (!products) {
            return res.status(404).json({
                message: 'No hay productos registrados'
            })
        }
        res.json({
            message: 'Productos obtenidos correctamente',
            products
        })


    } catch (error) {
        console.error('Error', error)
        res.status(500).json({
            message: 'Hubo un error al obtener los productos'
        })
    }
}

//Obtener un producto por su ID

 export const getProductById = async (req, res) => {
    try {
        const product = await productos.findByPk(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }
        res.json({
            message: 'Producto obtenido correctamente',
            product
        })
    } catch (error) {
        console.error('Error:', error.message)
        res.status(500).json({
            message: 'Hubo un error al obtener el producto'
        })
    }
}

//Actualizar un producto
export const updateProductsByID = async (req, res) => {
    try {
        const {
            name,
            descripcion,
            precio,
            stop
        } = req.body

        const idProuducts = req.params.id

        const product = await productos.update(
            {
                name,
                descripcion,
                precio,
                stop
            },
            {
                where: {
                    id: idProuducts
                }
            }
        )

        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }

        res.json({
            message: 'Producto actualizado correctamente',
            product
        })
    } catch (error) {
        console.error('Error',error)
        res.status(500).json({
            message: 'Hubo un error al actualizar el producto'
        })
    }
}