import category from "../models/category.mjs";


//controlador para insertar los datos de la tabla categoria

export const addCategory = async (req, res) => {
    try {
        const {
            name,
            description
        } = req.body
        if (!name || !description) {
            return res.status(400).json({
                msg: 'Todos los campos son obligatorios'
            })


        }
        //Verificar que la categoria existe

        const existingCategory = await category.findOne({
            where: {
                name: name
            }
        })
        if (existingCategory) {
            return res.status(400).json({
                msg: 'Esta categoria ya existe'
            })
        }

        const newCategory = await category.create({
            name,
            description
        })
        res.status(200).json({
            category: newCategory
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'Hubo un error en el server'
        })

    }

}

//Controlador para obtener todos los datos de la tabla categoria


export const getCategories = async (req, res) => {
    try {
        const allCategories = await category.findAll()
        if (allCategories.length <= 0) {
            return res.status(404).json({
                msg: 'No hay categorias registradas'
            })
        }
        res.status(200).json({
            category: allCategories
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'Hubo un error en el server'
        })

    }
}

//Controlador para obtener un dato de la tabla categoria por id

export const getCategoriesID = async (req, res) => {
    try {
        const idCategory = req.params.id
        const category = await category.findByPk(idCategory)

        if (!category) {
            return res.status(404).json({
                msg: 'Esta categoria no existe'
            })
        }

        res.status(200).json({
            category
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'Hubo un error en el server'
        })

    }
}

//controlador para actualizar los datos de una categoria

export const updateCategory = async (req, res) => {

    try {
        const idCategory = req.params.id
        const {
            name,
            description
        } = req.body

        if (!name || !description) {
            return res.status(400).json({
                msg: 'Todos los campos son obligatorios'
            })
        }
        const category = await category.findByPk(idCategory)

        if (category) {
            const newCategory = await category.update({
                name,
                description
            }, {
                where: {
                    idCategory
                }
            })
        } else {
            return res.status(404).json({
                msg: 'Esta categoria no existe'
            })
        }

        res.status(200).json({
            category
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
            msg: 'Hubo un error en el server'
        })

    }
}