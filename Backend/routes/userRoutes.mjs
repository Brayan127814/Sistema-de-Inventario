import {
    Router
} from 'express'

import {
    consultarRole,
    deleteUserById,
    getAlluserByID,
    getAllUsers,
    register,
    updateUserById
} from '../controller/userController.mjs'
import {
    login
} from '../meddelware/login.mjs'



const routeUser = Router()

// Rutas
routeUser.post('/register', register)
routeUser.post('/login', login)
routeUser.get('/role/:id',consultarRole)
routeUser.get('/getAllUsers', getAllUsers)
routeUser.get('/getUserById/:id', getAlluserByID)
routeUser.put('/updateUser/:id', updateUserById)
routeUser.delete('/deleteUser/:id', deleteUserById)


export default routeUser