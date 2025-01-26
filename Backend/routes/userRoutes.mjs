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
import autheticateToken from '../meddelware/autheticateToken.mjs'
import validateRole from '../meddelware/validarRol.mjs'



const routeUser = Router()

// Rutas
routeUser.post('/register', register)
routeUser.post('/login', login)
routeUser.get('/role/:id', autheticateToken, validateRole(['admin']), consultarRole)
routeUser.get('/getAllUsers', autheticateToken, validateRole(['admin']), getAllUsers)
routeUser.get('/getUserById/:id', autheticateToken, validateRole(['admin']), getAlluserByID)
routeUser.put('/updateUser/:id', autheticateToken, validateRole(['admin']), updateUserById)
routeUser.delete('/deleteUser/:id', autheticateToken, validateRole(['admin']), deleteUserById)


export default routeUser