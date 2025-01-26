import user from "../models/users.mjs";
import role from '../models/role.mjs'
import { Op } from "sequelize";
import bcrypt from 'bcrypt'

// Registrar usuarios en  la base de datos

export const register = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            telefono,
            password,
            roleID
        } = req.body
        const incrypting = await bcrypt.hash(password, 10)

        const users = await user.create({
            name,
            username,
            email,
            telefono,
            password: incrypting,
            roleID
        })

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            users
        })
    } catch (error) {
        console.log("este es el errror")
        res.status(500).json({
            message: 'Hubo un error al registrar el usuario',
            error
        })

    }
}

//Obtener un usuario por su ID


export const getAlluserByID = async (req, res) => {
    try {
        const userID = req.params.id
        const users = await user.findByPk(userID)


        if (!users) {
            return res.status(404).json({
                message: 'El usuario no existe'
            })
        }

        res.status(200).json({
            message: 'Usuario encontrado',
            user: users
        })
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        })
    }
}

//Actualizar un usuario

export const updateUserById = async (req, res) => {
    try {
        const userID = req.params.id
        const {
            name,
            username,
            email,
            telefono,
            password,
            roleID
        } = req.body


        const users = await user.update({
            name,
            username,
            email,
            telefono,
            password,
            roleID
        }, {
            where: {
                id: userID
            }
        })

        if (!users) {
            return res.status(404).json({
                message: 'El usuario no existe'
            })
        }

        res.status(200).json({
            user: users
        })
    } catch (error) {
        console.error('Error ', error)
        res.status(500).json({
            message: 'Hubo un error en la actualización del usuario'
        })
    }
}

//Eliminar un usuario

export const deleteUserById = async (req, res) => {
    try {
        const idUser = req.params.id
        const users = await user.findByPk(idUser)

        if (!users) {
            return res.status(404).json({
                message: 'El usuario no existe'
            })
        }
        await user.destroy({
            where: {
                id: idUser
            }
        })

        res.status(200).json({
            message: 'El usuario ha sido eliminado'
        })
    } catch (error) {
        console.error('Error', error)
        res.status(500).json({
            message: 'Hubo un error al eliminar el usuario'
        })
    }
}

//Listar a todos los usuarios 
export const getAllUsers = async (req, res) => {
    try {
        const users = await user.findAll()
        if (!users || users.length == 0) {
            return res.status(404).json({
                message: 'No hay usuarios registrados'
            })
        }
        res.json(users)
    } catch (error) {
        consoler.error('Error ', error)
        res.status(500).json({
            mensaje: 'Error interno del servidor'
        })
    }
}


//consultar role de usuario

export const consultarRole = async (req, res) => {
    try {
        const idUser = req.params.id

        const userRole = await user.findOne({
            where: {
                id: {
                    [Op.eq]: idUser
                }
            },
            include: [{
                model: role,
                attributes: ['name']
            }]
        })
        if (!userRole) {
            return res.status(404).json({
                message: 'El usuario no existe'
            })
        }

        res.status(200).json({
            userRole
        })

    } catch (error) {
        console.log('Error', error)
        res.status(500).json({mensaje:'Error interno del servidor'})

    }

}